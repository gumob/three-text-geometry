/* eslint @typescript-eslint/unbound-method: 0 */

/**
 * Determine if an object is a binary
 */
function isBinary(value: unknown): boolean {
    if (typeof value === 'string') return value.substring(0, 3) === 'BMF'
    const header = Buffer.from([66, 77, 70, 3])
    return value instanceof Buffer && value.length > 4 && header.equals(value.slice(0, 4))
}

/**
 * Check if the given value is an ArrayBuffer.
 *
 * @param {*} value  - The value to check.
 * @returns {boolean} Returns `true` if the given value is an ArrayBuffer, else `false`.
 * @example
 *
 *     isArrayBuffer(new ArrayBuffer())
 *     // => true
 *     isArrayBuffer([])
 *     // => false
 *
 */
const hasArrayBuffer = typeof ArrayBuffer === 'function'
const { toString } = Object.prototype
function isArrayBuffer(value: unknown): boolean {
    return hasArrayBuffer && (value instanceof ArrayBuffer || toString.call(value) === '[object ArrayBuffer]')
}

function dtype(
    dtype: string
):
    | ArrayConstructor
    | Int8ArrayConstructor
    | Int16ArrayConstructor
    | Int32ArrayConstructor
    | Uint8ArrayConstructor
    | Uint16ArrayConstructor
    | Uint32ArrayConstructor
    | Float32ArrayConstructor
    | Float64ArrayConstructor
    | Uint8ClampedArrayConstructor
    | undefined {
    switch (dtype) {
        case 'int8':
            return Int8Array
        case 'int16':
            return Int16Array
        case 'int32':
            return Int32Array
        case 'uint8':
            return Uint8Array
        case 'uint16':
            return Uint16Array
        case 'uint32':
            return Uint32Array
        case 'float32':
            return Float32Array
        case 'float64':
            return Float64Array
        case 'uint8_clamped':
            return Uint8ClampedArray
        case 'array':
            return Array
    }
    return undefined
}

// function ndarray(str: string) {
//     switch (dtype) {
//       case 'generic':
//       case 'data':
//       case 'dataview':
//         return ArrayBuffer
//       case 'buffer':
//         if (typeof Buffer === "undefined") {
//           return undefined
//         }
//         return Buffer
//       default:
//         return dtype(str)
//     }
//   }
export { dtype, isArrayBuffer, isBinary }
