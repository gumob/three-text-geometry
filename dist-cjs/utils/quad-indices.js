"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIndices = void 0;
const utils_1 = require("./");
function createIndices(array = null, opt = null) {
    /** if user didn't specify an output array */
    let arr = null;
    if (!array || !(Array.isArray(array) || Buffer.isBuffer(array))) {
        opt = array || {};
        arr = null;
    }
    else {
        arr = array;
    }
    if (typeof opt === 'number')
        opt = { count: opt };
    else
        opt = opt || {};
    const type = typeof opt.type === 'string' ? opt.type : 'uint16';
    const count = opt.count !== undefined ? opt.count : 1;
    const start = opt.start !== undefined ? opt.start : 0;
    const clockwise = typeof opt.clockwise === 'boolean' ? opt.clockwise : true;
    const dir = clockwise ? [0, 2, 3] : [2, 1, 3];
    const a = dir[0] || 0;
    const b = dir[1] || 0;
    const c = dir[2] || 0;
    const numIndices = count * 6;
    const indices = arr || new ((0, utils_1.dtype)(type) || Uint16Array)(numIndices);
    for (let i = 0, j = 0; i < numIndices; i += 6, j += 4) {
        const x = i + start;
        indices[x + 0] = j + 0;
        indices[x + 1] = j + 1;
        indices[x + 2] = j + 2;
        indices[x + 3] = j + a;
        indices[x + 4] = j + b;
        indices[x + 5] = j + c;
    }
    return indices;
}
exports.createIndices = createIndices;
//# sourceMappingURL=quad-indices.js.map