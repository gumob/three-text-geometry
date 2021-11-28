interface QuadOptions {
    count?: number;
    type?: string;
    clockwise?: boolean;
    start?: number;
}
declare type QuadIndices = Array<number> | Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Float32Array | Float64Array | Uint8ClampedArray;
declare function createIndices(array?: QuadIndices | QuadOptions | null, opt?: QuadOptions | null): QuadIndices;
export { createIndices };
//# sourceMappingURL=quad-indices.d.ts.map