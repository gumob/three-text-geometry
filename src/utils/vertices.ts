import { TextGlyph } from '~/types'

function extractPages(glyphs: TextGlyph[]): Float32Array {
  const pages = new Float32Array(glyphs.length * 4 * 1)
  let idx = 0
  for (let i = 0, len = glyphs.length; i < len; i++) {
    const glyph: TextGlyph = glyphs[i]!
    const id = glyph.data.page || 0
    pages[idx++] = id
    pages[idx++] = id
    pages[idx++] = id
    pages[idx++] = id
  }
  return pages
}

function extractUVs(glyphs: TextGlyph[], texWidth: number, texHeight: number, flipY: boolean): Float32Array {
  const uvs = new Float32Array(glyphs.length * 4 * 2)
  let idx = 0
  for (let i = 0, len = glyphs.length; i < len; i++) {
    const glyph: TextGlyph = glyphs[i]!
    const bitmap = glyph.data
    const bw = bitmap.x + bitmap.width
    const bh = bitmap.y + bitmap.height

    /** top left position */
    const u0 = bitmap.x / texWidth
    let v1 = bitmap.y / texHeight
    const u1 = bw / texWidth
    let v0 = bh / texHeight

    if (flipY) {
      v1 = (texHeight - bitmap.y) / texHeight
      v0 = (texHeight - bh) / texHeight
    }

    /** BL */
    uvs[idx++] = u0
    uvs[idx++] = v1
    /** TL */
    uvs[idx++] = u0
    uvs[idx++] = v0
    /** TR */
    uvs[idx++] = u1
    uvs[idx++] = v0
    /** BR */
    uvs[idx++] = u1
    uvs[idx++] = v1
  }
  return uvs
}

function extractPositions(glyphs: TextGlyph[]): Float32Array {
  const positions = new Float32Array(glyphs.length * 4 * 2)
  let idx = 0
  for (let i = 0, len = glyphs.length; i < len; i++) {
    const glyph: TextGlyph = glyphs[i]!
    const bitmap = glyph.data

    /** bottom left position */
    const x = glyph.position[0] + bitmap.xoffset
    const y = glyph.position[1] + bitmap.yoffset

    /** quad size */
    const w = bitmap.width
    const h = bitmap.height

    /** BL */
    positions[idx++] = x
    positions[idx++] = y
    /** TL */
    positions[idx++] = x
    positions[idx++] = y + h
    /** TR */
    positions[idx++] = x + w
    positions[idx++] = y + h
    /** BR */
    positions[idx++] = x + w
    positions[idx++] = y
  }
  return positions
}

export { extractPages, extractPositions, extractUVs }
