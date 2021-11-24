import { dtype } from '~/utils'

describe('Binary', () => {
  describe('dtype', () => {
    test('int8', () => {
      const array = new (dtype('int8') || ArrayBuffer)(10)
      expect(array).toBeInstanceOf(Int8Array)
    })
    test('int16', () => {
      const array = new (dtype('int16') || ArrayBuffer)(10)
      expect(array).toBeInstanceOf(Int16Array)
    })
    test('int32', () => {
      const array = new (dtype('int32') || ArrayBuffer)(10)
      expect(array).toBeInstanceOf(Int32Array)
    })
    test('uint8', () => {
      const array = new (dtype('uint8') || ArrayBuffer)(10)
      expect(array).toBeInstanceOf(Uint8Array)
    })
    test('uint16', () => {
      const array = new (dtype('uint16') || ArrayBuffer)(10)
      expect(array).toBeInstanceOf(Uint16Array)
    })
    test('uint32', () => {
      const array = new (dtype('uint32') || ArrayBuffer)(10)
      expect(array).toBeInstanceOf(Uint32Array)
    })
    test('float32', () => {
      const array = new (dtype('float32') || ArrayBuffer)(10)
      expect(array).toBeInstanceOf(Float32Array)
    })
    test('float64', () => {
      const array = new (dtype('float64') || ArrayBuffer)(10)
      expect(array).toBeInstanceOf(Float64Array)
    })
    test('uint8_clamped', () => {
      const array = new (dtype('uint8_clamped') || ArrayBuffer)(10)
      expect(array).toBeInstanceOf(Uint8ClampedArray)
    })
    test('array', () => {
      const array = new (dtype('array') || ArrayBuffer)(10)
      expect(array).toBeInstanceOf(Array)
    })
    test('invalid', () => {
      const array = new (dtype('invalid') || ArrayBuffer)(10)
      expect(array).toBeInstanceOf(ArrayBuffer)
    })
  })
})
