import {
  ComplexModifications,
  ComplexModificationsParameters,
  Rule,
} from '../karabiner/karabiner-config.ts'
import { buildRule, RuleBuilder } from './rule.ts'
import { defaultDoubleTapParameters } from './double-tap.ts'
import { defaultSimlayerParameters } from './simlayer.ts'
import { BuildContext } from '../utils/build-context.ts'
import { defaultDuoLayerParameters } from './duo-layer.ts'
import { defaultDelayedLayerParameters } from './delayed-layer.ts'

export const defaultComplexModificationsParameters: ComplexModificationsParameters =
  {
    'basic.to_if_alone_timeout_milliseconds': 1000,
    'basic.to_if_held_down_threshold_milliseconds': 500,
    'basic.to_delayed_action_delay_milliseconds': 500,
    'basic.simultaneous_threshold_milliseconds': 50,
    'mouse_motion_to_scroll.speed': 100,
  }

export type ModificationParameters = ComplexModificationsParameters &
  Partial<typeof defaultDelayedLayerParameters> &
  Partial<typeof defaultDoubleTapParameters> &
  Partial<typeof defaultSimlayerParameters> &
  Partial<typeof defaultDuoLayerParameters>

export function complexModifications(
  rules: Array<Rule | RuleBuilder>,
  parameters: ModificationParameters = {},
): ComplexModifications {
  const {
    'delayed_layer.notification': delayedLayerNotification,
    'delayed_layer.threshold_milliseconds': delayedLayerThreshold,
    'duo_layer.threshold_milliseconds': duoLayerThreshold,
    'double_tap.delay_milliseconds': doubleTapDelay,
    'simlayer.threshold_milliseconds': simlayerThreshold,
    ...complexModificationsParameters
  } = parameters

  const context = new BuildContext()
  context.setParameters<typeof defaultDelayedLayerParameters>({
    'delayed_layer.notification': delayedLayerNotification,
    'delayed_layer.threshold_milliseconds': delayedLayerThreshold,
  })
  context.setParameters<typeof defaultDoubleTapParameters>({
    'double_tap.delay_milliseconds': doubleTapDelay,
  })
  context.setParameters<typeof defaultDuoLayerParameters>({
    'duo_layer.threshold_milliseconds': duoLayerThreshold,
  })
  context.setParameters<typeof defaultSimlayerParameters>({
    'simlayer.threshold_milliseconds': simlayerThreshold,
  })

  const builtRules = rules.map((v) => buildRule(v, context))
  const modifications: ComplexModifications = {
    rules: builtRules.filter((v) => v.manipulators.length),
    parameters: {
      ...defaultComplexModificationsParameters,
      ...complexModificationsParameters,
    },
  }

  if (modifications.rules.length === 0) {
    throw new Error(`complex_modifications "rules" is empty `)
  }

  if (modifications.rules.length < builtRules.length) {
    console.warn(`Rules with empty manipulators are ignored: 
${builtRules
  .filter((v) => v.manipulators.length === 0)
  .map((v) => '- ' + v.description)
  .join('\n')}
`)
  }

  return modifications
}
