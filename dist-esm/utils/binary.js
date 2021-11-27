/* eslint @typescript-eslint/unbound-method: 0 */
function dtype(dtype) {
    switch (dtype) {
        case 'int8':
            return Int8Array;
        case 'int16':
            return Int16Array;
        case 'int32':
            return Int32Array;
        case 'uint8':
            return Uint8Array;
        case 'uint16':
            return Uint16Array;
        case 'uint32':
            return Uint32Array;
        case 'float32':
            return Float32Array;
        case 'float64':
            return Float64Array;
        case 'uint8_clamped':
            return Uint8ClampedArray;
        case 'array':
            return Array;
    }
    return undefined;
}
export { dtype };
//# sourceMappingURL=binary.js.map