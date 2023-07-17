import { expect, test } from 'vitest'
import { defaultDelayedLayerParameters, delayedLayer } from './delayed-layer.ts'
import { map } from './from.ts'
import { BasicManipulator } from '../karabiner/karabiner-config.ts'
import {
  fromOnlyKeyCodes,
  stickyModifierKeyCodes,
  toOnlyKeyCodes,
} from '../karabiner/key-code.ts'
import { ifVar } from './condition.ts'
import { complexModifications } from './complex-modifications.ts'
import { toKey } from './to.ts'
import { hyperLayer } from './layer.ts'
import { mouseMotionToScroll } from './mouse-motion-to-scroll.ts'
import { BuildContext } from '../utils/build-context.ts'

test('delayedLayer()', () => {
  const rule = delayedLayer('a', 'b-mode', 123, 2, -1)
    .manipulators([map('c').to('d')])
    .build()
  expect(rule.description).toBe(`DelayedLayer - b-mode`)

  const manipulators = rule.manipulators as BasicManipulator[]
  // One layer manipulator to set variable
  expect(manipulators.length).toBe(2)
  expect(manipulators[0]).toEqual({
    type: 'basic',
    from: { key_code: 'a', modifiers: { optional: ['any'] } },
    conditions: [{ type: 'variable_unless', name: 'b-mode', value: 2 }],
    to_if_held_down: [{ set_variable: { name: 'b-mode', value: 2 } }],
    to_after_key_up: [{ set_variable: { name: 'b-mode', value: -1 } }],
    to_if_alone: [{ key_code: 'a' }],
    to_delayed_action: {
      to_if_invoked: [],
      to_if_canceled: [
        { key_code: 'a' },
        { set_variable: { name: 'b-mode', value: -1 } },
      ],
    },
    parameters: {
      'basic.to_if_held_down_threshold_milliseconds': 123,
      'basic.to_delayed_action_delay_milliseconds': 123,
    },
  } satisfies BasicManipulator)
  // Add variable condition to manipulators
  expect(manipulators[1].conditions).toEqual([
    { type: 'variable_if', name: 'b-mode', value: 2 },
  ])
})

test('delayedLayer() default varName', () => {
  const rule = delayedLayer('a')
    .manipulators([map('c').to('d')])
    .build()
  expect(rule.description).toBe(`DelayedLayer - delayed-layer-a`)

  const manipulators = rule.manipulators as BasicManipulator[]
  expect(manipulators[1].conditions).toEqual([
    { type: 'variable_if', name: 'delayed-layer-a', value: 1 },
  ])
})

test('delayedLayer() with invalid key', () => {
  expect(() => delayedLayer('' as any, '')).toThrow('key_code')
  expect(() => delayedLayer(toOnlyKeyCodes[0] as any, '')).toThrow('layer key')
  expect(() => delayedLayer(fromOnlyKeyCodes[0] as any, '')).toThrow(
    'layer key',
  )
  expect(() => delayedLayer(stickyModifierKeyCodes[0] as any, '')).toThrow(
    'layer key',
  )
})

test('delayedLayer() with multiple keys', () => {
  const rule = delayedLayer(['a', 'b'], 'c')
    .manipulators([map(1).to(2)])
    .build()
  const manipulators = rule.manipulators as BasicManipulator[]
  expect(manipulators.length).toBe(3)
  const { from: fromB, to_if_alone: aloneB, ...restB } = manipulators[0]
  const { from: fromA, to_if_alone: aloneA, ...restA } = manipulators[1]
  expect(fromB).toEqual({ key_code: 'b', modifiers: { optional: ['any'] } })
  expect(aloneB).toEqual([{ key_code: 'b' }])
  expect(fromA).toEqual({ key_code: 'a', modifiers: { optional: ['any'] } })
  expect(aloneA).toEqual([{ key_code: 'a' }])

  expect(restB.to_delayed_action?.to_if_canceled?.[0]).toEqual({
    key_code: 'b',
  })
  restB.to_delayed_action!.to_if_canceled![0] = { key_code: 'a' }
  expect(restB).toEqual(restA)
})

test('delayedLayer() conditions', () => {
  const rule = delayedLayer('a', 'b')
    .condition(ifVar('c'))
    .manipulators([map(1).to(2)])
    .build()
  const manipulators = rule.manipulators as BasicManipulator[]
  expect(manipulators[0].conditions).toEqual([
    { type: 'variable_unless', name: 'b', value: 1 },
    { type: 'variable_if', name: 'c', value: 1 },
  ])
})

test('delayedLayer() allows empty manipulators', () => {
  expect(() => delayedLayer('a', '').manipulators([]).build()).not.toThrow(
    /manipulators.*empty/,
  )
})

test('multiple delayedLayer() by same key ', () => {
  const { rules } = complexModifications([
    delayedLayer('a', 'v1').manipulators([map(1).to(2)]),
    delayedLayer(['a', 'b'], 'v2').manipulators([map(1).to(2)]),
    delayedLayer('a', 'v3')
      .condition(ifVar('x'))
      .manipulators([map(1).to(2)]),
    delayedLayer('a', 'v4')
      .condition(ifVar('x'))
      .manipulators([map(1).to(2)]),
    delayedLayer('a', 'v1')
      .modifiers()
      .manipulators([map(1).to(2)]),
  ])
  expect(rules[0].manipulators.length).toBe(2)
  expect(rules[1].manipulators.length).toBe(2)

  const manipulator = rules[0].manipulators[0] as BasicManipulator
  expect(manipulator.to_if_held_down).toEqual([
    { set_variable: { name: 'v1', value: 1 } },
    { set_variable: { name: 'v2', value: 1 } },
  ])
  expect(manipulator.to_after_key_up).toEqual([
    { set_variable: { name: 'v1', value: 0 } },
    { set_variable: { name: 'v2', value: 0 } },
  ])
  expect(manipulator.to_delayed_action?.to_if_canceled).toEqual([
    { key_code: 'a' },
    { set_variable: { name: 'v1', value: 0 } },
    { set_variable: { name: 'v2', value: 0 } },
  ])

  expect(rules[2].manipulators.length).toBe(2)
  expect(rules[3].manipulators.length).toBe(1)

  // error on configKey()
  expect(() =>
    complexModifications([delayedLayer('a', 'v1'), delayedLayer('a', 'v1')]),
  ).not.toThrow()
  expect(() =>
    complexModifications([
      delayedLayer('a', 'v1'),
      delayedLayer('a', 'v1').configKey((v) => v.toIfAlone('b')),
    ]),
  ).toThrow('configKey')
})

test('delayedLayer().configKey()', () => {
  const rule = delayedLayer('a', 'v1')
    .configKey((v) =>
      v
        .to('b')
        .toIfHeldDown('c')
        .toAfterKeyUp('d')
        .toDelayedAction(toKey('x'), [toKey('y')]),
    )
    .build()
  const manipulators = rule.manipulators as BasicManipulator[]
  expect(manipulators.length).toBe(1)
  expect(manipulators[0]).toEqual({
    type: 'basic',
    from: { key_code: 'a', modifiers: { optional: ['any'] } },
    conditions: [{ type: 'variable_unless', name: 'v1', value: 1 }],
    to: [{ key_code: 'b' }],
    to_if_held_down: [
      { set_variable: { name: 'v1', value: 1 } },
      { key_code: 'c' },
    ],
    to_after_key_up: [
      { set_variable: { name: 'v1', value: 0 } },
      { key_code: 'd' },
    ],
    to_if_alone: [{ key_code: 'a' }],
    to_delayed_action: {
      to_if_invoked: [{ key_code: 'x' }],
      to_if_canceled: [
        { key_code: 'a' },
        { set_variable: { name: 'v1', value: 0 } },
        { key_code: 'y' },
      ],
    },
    parameters: {
      'basic.to_if_held_down_threshold_milliseconds': 200,
      'basic.to_delayed_action_delay_milliseconds': 200,
    },
  } satisfies BasicManipulator)
})

test('delayedLayer().configKey() replaceToIfAlone', () => {
  const rule = delayedLayer('⇪', 'v1')
    .configKey((v) => v.toIfAlone('b', '⌘'), true)
    .build()
  const manipulators = rule.manipulators as BasicManipulator[]
  expect(manipulators.length).toBe(1)
  expect(manipulators[0].to_if_alone).toEqual([
    { key_code: 'b', modifiers: ['command'] },
  ])
  expect(manipulators[0].to_delayed_action?.to_if_canceled).toEqual([
    { set_variable: { name: 'v1', value: 0 } },
    { key_code: 'b', modifiers: ['command'] },
  ])
})

test('delayedLayer().modifier()', () => {
  expect(
    (
      delayedLayer('a', 'v')
        .manipulators([map(1).to(2)])
        .build().manipulators[0] as BasicManipulator
    ).from.modifiers,
  ).toEqual({ optional: ['any'] })

  expect(
    (
      delayedLayer('a', 'v')
        .modifiers()
        .manipulators([map(1).to(2)])
        .build().manipulators[0] as BasicManipulator
    ).from.modifiers,
  ).toBeUndefined()

  expect(
    (
      delayedLayer('a', 'v')
        .modifiers('', '›⌥')
        .manipulators([map(1).to(2)])
        .build().manipulators[0] as BasicManipulator
    ).from.modifiers,
  ).toEqual({ optional: ['right_option'] })

  expect(
    delayedLayer('a', 'v')
      .modifiers('Hyper')
      .manipulators([map(1).to(2)])
      .build()
      .manipulators.map((v) => v.from?.modifiers),
  ).toEqual([
    { mandatory: ['command', 'option', 'control', 'shift'] },
    { mandatory: ['any'] },
  ])

  expect(
    hyperLayer('a')
      .manipulators([map(1).to(2)])
      .build()
      .manipulators.map((v) => v.from?.modifiers),
  ).toEqual([
    { mandatory: ['command', 'option', 'control', 'shift'] },
    { mandatory: ['any'] },
  ])

  expect(
    delayedLayer('a', 'v')
      .modifiers('⌘')
      .manipulators([
        map(1, {}).to(2),
        map(1, {}, {}).to(2),
        map(1, 'any').to(2),
        mouseMotionToScroll().modifiers('⌘'),
      ])
      .build()
      .manipulators.map((v) => v.from?.modifiers),
  ).toEqual([
    { mandatory: ['command'] },
    { mandatory: ['any'] },
    { mandatory: ['any'] },
    { mandatory: ['any'] },
    { mandatory: ['command'] },
  ])

  expect(() =>
    delayedLayer('a', 'v')
      .modifiers('⌘')
      .manipulators([map(1, '⌥').to(2)])
      .build(),
  ).toThrow()

  expect(() =>
    delayedLayer('a', 'v')
      .modifiers('⌘')
      .manipulators([map(1, '?⌘').to(2)])
      .build(),
  ).toThrow()
})

// https://github.com/evan-liu/karabiner.ts/issues/89
test('delayedLayer().modifier(??)', () => {
  expect(
    delayedLayer('a', 'v')
      .modifiers('??')
      .manipulators([map(1).to(2)])
      .build()
      .manipulators.map((v) => v.from?.modifiers),
  ).toEqual([{ optional: ['any'] }, { optional: ['any'] }])

  expect(
    delayedLayer('a', 'v')
      .modifiers('??')
      .manipulators([map(1, '??').to(2)])
      .build()
      .manipulators.map((v) => v.from?.modifiers),
  ).toEqual([{ optional: ['any'] }, { optional: ['any'] }])

  expect(
    delayedLayer('a', 'v')
      .modifiers('??')
      .manipulators([map(1, 'any').to(2)])
      .build()
      .manipulators.map((v) => v.from?.modifiers),
  ).toEqual([{ optional: ['any'] }, { mandatory: ['any'] }])

  expect(() =>
    delayedLayer('a', 'v')
      .modifiers('??')
      .manipulators([map(1, '⌘').to(2)])
      .build(),
  ).toThrow()
})

test('delayedLayer() notification', () => {
  const rule = delayedLayer('a').notification(true).build()
  const manipulators = rule.manipulators as BasicManipulator[]
  expect(manipulators.length).toBe(1)
  expect(manipulators[0].to_if_held_down?.[1]).toEqual({
    set_notification_message: {
      id: 'delayed-layer-delayed-layer-a',
      text: 'DelayedLayer - delayed-layer-a',
    },
  })
  expect(manipulators[0].to_after_key_up?.[1]).toEqual({
    set_notification_message: { id: 'delayed-layer-delayed-layer-a', text: '' },
  })
  expect(manipulators[0].to_delayed_action?.to_if_canceled?.[2]).toEqual({
    set_notification_message: { id: 'delayed-layer-delayed-layer-a', text: '' },
  })

  const ruleB = delayedLayer('b').notification('test-b').build()
  const manipulatorB = ruleB.manipulators[0] as BasicManipulator
  expect(manipulatorB.to_if_held_down?.[1]).toEqual({
    set_notification_message: {
      id: 'delayed-layer-delayed-layer-b',
      text: 'test-b',
    },
  })
})

test('delayedLayer() parameters', () => {
  defaultDelayedLayerParameters['delayed_layer.threshold_milliseconds'] = 12
  defaultDelayedLayerParameters['delayed_layer.notification'] = 'ab'

  const rule = delayedLayer('a').build()
  const manipulator = rule.manipulators[0] as BasicManipulator
  expect(manipulator.to_if_held_down?.[1]).toEqual({
    set_notification_message: {
      id: 'delayed-layer-delayed-layer-a',
      text: 'ab',
    },
  })
  expect(manipulator.parameters).toEqual({
    'basic.to_if_held_down_threshold_milliseconds': 12,
    'basic.to_delayed_action_delay_milliseconds': 12,
  })
})

test('delayedLayer() parameters in BuildContext', () => {
  const context = new BuildContext()
  context.setParameters<typeof defaultDelayedLayerParameters>({
    'delayed_layer.threshold_milliseconds': 23,
    'delayed_layer.notification': 'bc',
  })
  const rule = delayedLayer('a').build(context)
  const manipulator = rule.manipulators[0] as BasicManipulator
  expect(manipulator.to_if_held_down?.[1]).toEqual({
    set_notification_message: {
      id: 'delayed-layer-delayed-layer-a',
      text: 'bc',
    },
  })
  expect(manipulator.parameters).toEqual({
    'basic.to_if_held_down_threshold_milliseconds': 23,
    'basic.to_delayed_action_delay_milliseconds': 23,
  })
})
