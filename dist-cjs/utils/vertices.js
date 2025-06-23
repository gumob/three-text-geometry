"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractPages = extractPages;
exports.extractPositions = extractPositions;
exports.extractUVs = extractUVs;
function extractPages(glyphs) {
    const pages = new Float32Array(glyphs.length * 4 * 1);
    let idx = 0;
    for (let i = 0, len = glyphs.length; i < len; i++) {
        const glyph = glyphs[i];
        const id = glyph.data.page || 0;
        pages[idx++] = id;
        pages[idx++] = id;
        pages[idx++] = id;
        pages[idx++] = id;
    }
    return pages;
}
function extractUVs(glyphs, texWidth, texHeight, flipY) {
    const uvs = new Float32Array(glyphs.length * 4 * 2);
    let idx = 0;
    for (let i = 0, len = glyphs.length; i < len; i++) {
        const glyph = glyphs[i];
        const bitmap = glyph.data;
        const bw = bitmap.x + bitmap.width;
        const bh = bitmap.y + bitmap.height;
        const u0 = bitmap.x / texWidth;
        let v1 = bitmap.y / texHeight;
        const u1 = bw / texWidth;
        let v0 = bh / texHeight;
        if (flipY) {
            v1 = (texHeight - bitmap.y) / texHeight;
            v0 = (texHeight - bh) / texHeight;
        }
        uvs[idx++] = u0;
        uvs[idx++] = v1;
        uvs[idx++] = u0;
        uvs[idx++] = v0;
        uvs[idx++] = u1;
        uvs[idx++] = v0;
        uvs[idx++] = u1;
        uvs[idx++] = v1;
    }
    return uvs;
}
function extractPositions(glyphs) {
    const positions = new Float32Array(glyphs.length * 4 * 2);
    let idx = 0;
    for (let i = 0, len = glyphs.length; i < len; i++) {
        const glyph = glyphs[i];
        const bitmap = glyph.data;
        const x = glyph.position[0] + bitmap.xoffset;
        const y = glyph.position[1] + bitmap.yoffset;
        const w = bitmap.width;
        const h = bitmap.height;
        positions[idx++] = x;
        positions[idx++] = y;
        positions[idx++] = x;
        positions[idx++] = y + h;
        positions[idx++] = x + w;
        positions[idx++] = y + h;
        positions[idx++] = x + w;
        positions[idx++] = y;
    }
    return positions;
}
//# sourceMappingURL=vertices.js.map