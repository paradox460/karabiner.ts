import { expect, test } from 'vitest'
import {
  ConditionBuilder,
  ifApp,
  ifDevice,
  ifDeviceExists,
  ifVar,
  isConditionBuilder,
  ifKeyboardType,
  ifInputSource,
  ifEventChanged,
} from './condition.ts'
import { Condition } from '../karabiner/karabiner-config.ts'

test('ifVar()', () => {
  expect(ifVar('test-mode', 2).build()).toEqual({
    type: 'variable_if',
    name: 'test-mode',
    value: 2,
  })
})

test('ifApp()', () => {
  expect(ifApp('test').build()).toEqual({
    type: 'frontmost_application_if',
    bundle_identifiers: ['test'],
  })

  expect(ifApp(/^test\.app$/).build()).toEqual({
    type: 'frontmost_application_if',
    bundle_identifiers: ['^test\\.app$'],
  })

  expect(ifApp(['a', /b/]).build()).toEqual({
    type: 'frontmost_application_if',
    bundle_identifiers: ['a', 'b'],
  })

  expect(ifApp({ file_paths: ['a', /b/] }).build()).toEqual({
    type: 'frontmost_application_if',
    file_paths: ['a', 'b'],
  })
})

test('ifDevice()', () => {
  expect(ifDevice({ vendor_id: '1' }).build()).toEqual({
    type: 'device_if',
    identifiers: [{ vendor_id: '1' }],
  })

  expect(
    ifDevice([
      { vendor_id: '1', product_id: '2' },
      { location_id: '3' },
    ]).build(),
  ).toEqual({
    type: 'device_if',
    identifiers: [{ vendor_id: '1', product_id: '2' }, { location_id: '3' }],
  })
})

test('ifDeviceExists()', () => {
  expect(ifDeviceExists({ vendor_id: '1' }).build()).toEqual({
    type: 'device_exists_if',
    identifiers: [{ vendor_id: '1' }],
  })

  expect(
    ifDeviceExists([
      { vendor_id: '1', product_id: '2' },
      { location_id: '3' },
    ]).build(),
  ).toEqual({
    type: 'device_exists_if',
    identifiers: [{ vendor_id: '1', product_id: '2' }, { location_id: '3' }],
  })
})

test('ifKeyboardType()', () => {
  expect(ifKeyboardType('iso').build()).toEqual({
    type: 'keyboard_type_if',
    keyboard_types: ['iso'],
  })
  expect(ifKeyboardType(['jis', 'ansi']).build()).toEqual({
    type: 'keyboard_type_if',
    keyboard_types: ['jis', 'ansi'],
  })
})

test('ifInputSource()', () => {
  expect(ifInputSource({ language: 'en' }).build()).toEqual({
    type: 'input_source_if',
    input_sources: [{ language: 'en' }],
  })
  expect(
    ifInputSource([
      { language: 'en' },
      { language: 'cn', input_mode_id: 'zh' },
    ]).build(),
  ).toEqual({
    type: 'input_source_if',
    input_sources: [
      { language: 'en' },
      { language: 'cn', input_mode_id: 'zh' },
    ],
  })
})

test('ifEventChanged()', () => {
  expect(ifEventChanged(true).build()).toEqual({
    type: 'event_changed_if',
    value: true,
  })
  expect(ifEventChanged(false).build()).toEqual({
    type: 'event_changed_if',
    value: false,
  })
})

test('isConditionBuilder()', () => {
  const condition: Condition = { type: 'event_changed_if', value: false }
  expect(isConditionBuilder(condition)).toBe(false)
  expect(isConditionBuilder(new ConditionBuilder(condition))).toBe(true)
})