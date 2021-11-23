interface QuadOptions {
    count?: number; /** the number of quads to index, default 1 */
    type?: string; /** (string) the dtype of the returned array, default '"uint16"' */
    clockwise?: boolean; /** (boolean) the orientation of the indices, default true */
    start?: number; /** the starting index to place the data into the array, default 0 */
}
declare type QuadIndices = Array<number> | Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Float32Array | Float64Array | Uint8ClampedArray;
declare function createIndices(array?: QuadIndices | QuadOptions | null, opt?: QuadOptions | null): QuadIndices;
export { createIndices };
//# sourceMappingURL=quad-indices.d.ts.map