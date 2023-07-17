import {
  BasicManipulator,
  FromModifiers,
  Rule,
  ToEvent,
  ToVariable,
} from '../karabiner/karabiner-config.ts'
import {
  addModifierAnyToManipulator,
  excludeFromLayerKeys,
  isModifiersAny,
  LayerKeyCode,
  LayerKeyParam,
} from './layer.ts'
import { BasicRuleBuilder } from './rule.ts'
import { toArray } from '../utils/to-array.ts'
import { getKeyWithAlias } from '../utils/key-alias.ts'
import { buildCondition, ConditionBuilder, ifVar } from './condition.ts'
import {
  FromModifierOverloadParam,
  parseFromModifierOverload,
} from '../utils/from-modifier-overload.ts'
import { FromModifierParam } from './modifier.ts'
import { FromOptionalModifierParam } from '../utils/optional-modifiers.ts'
import { BuildContext } from '../utils/build-context.ts'
import {
  toNotificationMessage,
  toRemoveNotificationMessage,
  toSetVar,
} from './to.ts'
import { BasicManipulatorBuilder } from './manipulator.ts'
import { map } from './from.ts'

export const defaultDelayedLayerParameters = {
  'delayed_layer.threshold_milliseconds': 200,
  'delayed_layer.notification': false as boolean | string,
}

export function delayedLayer(
  key: LayerKeyParam | LayerKeyParam[],
  varName?: string,
  threshold?: number,
  onValue: ToVariable['value'] = 1,
  offValue: ToVariable['value'] = 0,
) {
  return new DelayedLayerRuleBuilder(key, varName, threshold, onValue, offValue)
}

export class DelayedLayerRuleBuilder extends BasicRuleBuilder {
  private readonly keys: LayerKeyCode[]
  private readonly varName: string
  private readonly layerCondition: ConditionBuilder

  private layerModifiers?: FromModifiers = { optional: ['any'] }
  private layerKeyManipulator?: BasicManipulatorBuilder
  private replaceLayerKeyToIfAlone = false

  private layerNotification?: boolean | string

  constructor(
    key: LayerKeyParam | LayerKeyParam[],
    varName?: string,
    private readonly threshold?: number,
    private readonly onValue: ToVariable['value'] = 1,
    private readonly offValue: ToVariable['value'] = 0,
  ) {
    const keys = toArray(key).map((v) =>
      getKeyWithAlias<LayerKeyCode>(v, excludeFromLayerKeys, 'as layer key'),
    )
    if (!varName) {
      varName = `delayed-layer-${keys.join('-')}`
    }

    super(`DelayedLayer - ${varName}`)
    this.keys = keys
    this.varName = varName
    this.layerCondition = ifVar(this.varName, this.onValue)
    this.condition(this.layerCondition)
    this.allowEmptyManipulators = true
  }

  /** Set the notification when the layer is active. */
  public notification(v: boolean | string) {
    this.layerNotification = v
    return this
  }

  /** Set the delayedLayer modifiers. Default optionalAny. Set to null to remove. */
  public modifiers(
    mandatoryModifiers?: FromModifierOverloadParam,
    optionalModifiers?: FromModifierParam,
  ): this
  /** Set the delayedLayer modifiers to { optional: [...]} (default optionalAny) */
  public modifiers(modifiers: FromOptionalModifierParam): this
  public modifiers(
    mandatoryModifiers?: FromModifierOverloadParam,
    optionalModifiers?: FromModifierParam,
  ): this {
    this.layerModifiers =
      mandatoryModifiers || optionalModifiers
        ? parseFromModifierOverload(mandatoryModifiers, optionalModifiers)
        : undefined
    return this
  }

  /** Config the delayedLayer key. */
  public configKey(
    config: (
      manipulator: Omit<
        BasicManipulatorBuilder,
        'description' | 'condition' | 'parameters' | 'build'
      >,
    ) => void,
    replaceToIfAlone = false,
  ): this {
    if (!this.layerKeyManipulator) {
      this.layerKeyManipulator = map('fn')
    }
    config(this.layerKeyManipulator)
    this.replaceLayerKeyToIfAlone = replaceToIfAlone
    return this
  }

  public build(context?: BuildContext): Rule {
    const rule = super.build(context)

    const params =
      context?.getParameters(defaultDelayedLayerParameters) ??
      defaultDelayedLayerParameters
    const threshold =
      this.threshold || params['delayed_layer.threshold_milliseconds']
    const notification =
      this.layerNotification ?? params['delayed_layer.notification']

    const conditions =
      this.conditions.length > 1
        ? this.conditions
            .filter((v) => v !== this.layerCondition)
            .map(buildCondition)
        : undefined

    const { layerModifiers: modifiers, varName, onValue, offValue } = this
    const layerKeyConfig = this.layerKeyManipulator?.build()?.[0]

    if (modifiers?.mandatory?.length || modifiers?.optional?.length) {
      const isOptionalAny = isModifiersAny(modifiers) === 'optional'
      rule.manipulators.forEach((v) =>
        addModifierAnyToManipulator(v, isOptionalAny),
      )
    }

    for (const key_code of this.keys) {
      let cacheKey = ''
      if (context) {
        cacheKey = [
          `delayed_layer_${key_code}`,
          ...(modifiers ? [JSON.stringify(modifiers)] : []),
          ...(conditions || []).map((v) => JSON.stringify(v)).sort(),
        ].join('_')
        const exiting = context.getCache<BasicManipulator>(cacheKey)
        if (
          exiting?.to_if_held_down &&
          exiting.to_after_key_up &&
          exiting.to_delayed_action?.to_if_canceled
        ) {
          if (layerKeyConfig) {
            throw new Error(
              `delayedLayer.configKey() is not supported with same key for multiple layers`,
            )
          }
          const sameVar = exiting.to_if_held_down.find(
            (v) => 'set_variable' in v && v.set_variable.name === varName,
          )
          if (!sameVar) {
            exiting.to_if_held_down.push(toSetVar(varName, onValue))
            exiting.to_after_key_up.push(toSetVar(varName, offValue))
            exiting.to_delayed_action.to_if_canceled.push(
              toSetVar(varName, offValue),
            )
          }
          continue
        }
      }

      const toIfHeldDown = [toSetVar(varName, onValue)]
      const toAfterKeyUp = [toSetVar(varName, offValue)]
      const ifDelayedActionCanceled: ToEvent[] = [
        { key_code },
        toSetVar(varName, offValue),
      ]
      const toIfAlone: ToEvent[] = [{ key_code }]

      if (layerKeyConfig) {
        if (
          layerKeyConfig.to_if_alone?.length &&
          this.replaceLayerKeyToIfAlone
        ) {
          ifDelayedActionCanceled.shift()
          toIfAlone.shift()
        }
        layerKeyConfig.to_if_held_down?.forEach((v) => toIfHeldDown.push(v))
        layerKeyConfig.to_after_key_up?.forEach((v) => toAfterKeyUp.push(v))
        layerKeyConfig.to_if_alone?.forEach((v) => {
          toIfAlone.push(v)
          ifDelayedActionCanceled.push(v)
        })
        layerKeyConfig.to_delayed_action?.to_if_canceled?.forEach((v) =>
          ifDelayedActionCanceled.push(v),
        )
      }

      if (notification) {
        const id = `delayed-layer-${varName}`
        const message =
          notification === true ? this.ruleDescription : notification
        toIfHeldDown.push(toNotificationMessage(id, message))
        toAfterKeyUp.push(toRemoveNotificationMessage(id))
        ifDelayedActionCanceled.push(toRemoveNotificationMessage(id))
      }

      rule.manipulators.unshift({
        type: 'basic',
        from: { key_code, modifiers },
        conditions: [
          {
            type: 'variable_unless',
            name: varName,
            value: onValue,
          },
          ...(conditions || []),
        ],
        to: layerKeyConfig?.to,
        to_if_held_down: toIfHeldDown,
        to_after_key_up: toAfterKeyUp,
        to_if_alone: toIfAlone,
        to_delayed_action: {
          to_if_invoked: layerKeyConfig?.to_delayed_action?.to_if_invoked || [],
          to_if_canceled: ifDelayedActionCanceled,
        },
        parameters: {
          'basic.to_if_held_down_threshold_milliseconds': threshold,
          'basic.to_delayed_action_delay_milliseconds': threshold,
        },
      })
      context?.setCache(cacheKey, rule.manipulators[0])
    }

    return rule
  }
}
