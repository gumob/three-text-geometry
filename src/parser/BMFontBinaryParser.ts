/**
 *
 * https://github.com/Jam3/parse-bmfont-binary
 *
 */

import { Buffer } from 'buffer'
import { BMFontError } from '@three-text-geometry/error'
import {
  BMFont,
  BMFontChar,
  BMFontCommon,
  BMFontInfo,
  BMFontKern,
  DefaultBMFont,
  DefaultBMFontCommon,
  DefaultBMFontInfo,
  DefaultBMFontKern,
  IBMFontParser,
} from '@three-text-geometry/types'

/**
 * The class for parsing font data in Binary format.
 *
 * @class BMFontBinaryParser
 */
class BMFontBinaryParser implements IBMFontParser<Buffer> {
  private static HEADER = [66, 77, 70]
  /**
   * The function that parses font data from `Buffer` data.
   *
   * ```typescript
   * import { BMFontBinaryParser } from 'three-text-geometry'
   *
   * const data: Binary = ...binary data...
   * const parser = new BMFontBinaryParser();
   * const font: BMFont = parser.parse(data)
   * ```
   *
   * @param {Buffer} buf  `Buffer` that contains font data.
   * @returns {BMFont} Parsed data that conforms to the `BMFont` interface.
   * @memberof BMFontBinaryParser
   */
  public parse(buf: Buffer): BMFont {
    if (buf.length < 6) throw new BMFontError('Invalid buffer length')
    const header = BMFontBinaryParser.HEADER.every((byte, i) => {
      return buf.readUInt8(i) === byte
    })
    if (!header) throw new BMFontError('Missing BMF byte header')
    let i = 3
    const vers = buf.readUInt8(i++)
    if (vers > 3) throw new BMFontError('Only supports bitmap font binary v3')
    const target: BMFont = DefaultBMFont()
    try {
      for (let b = 0; b < 5; b++) i += this.readBlock(target, buf, i)
    } catch (e: any) {
      throw new BMFontError(e.message)
    }
    return target
  }

  private readBlock(target: BMFont, buf: Buffer, i: number): number {
    if (i > buf.length - 1) return 0
    const blockID = buf.readUInt8(i++)
    const blockSize = buf.readInt32LE(i)
    i += 4
    switch (blockID) {
      case 1:
        target.info = this.readInfo(buf, i)
        break
      case 2:
        target.common = this.readCommon(buf, i)
        break
      case 3:
        target.pages = this.readPages(buf, i, blockSize)
        break
      case 4:
        target.chars = this.readChars(buf, i, blockSize)
        break
      case 5:
        target.kernings = this.readKernings(buf, i, blockSize)
        break
    }
    return 5 + blockSize
  }

  private readInfo(buf: Buffer, i: number): BMFontInfo {
    const info: BMFontInfo = DefaultBMFontInfo()
    info.size = buf.readInt16LE(i)

    const bitField = buf.readUInt8(i + 2)
    info.smooth = (bitField >> 7) & 1
    info.unicode = (bitField >> 6) & 1
    info.italic = (bitField >> 5) & 1
    info.bold = (bitField >> 4) & 1

    /** fixedHeight is only mentioned in binary spec */
    if ((bitField >> 3) & 1) info.fixedHeight = 1

    // info.charset = buf.readUInt8(i + 3) || ''; /** TODO: Array? or String? */
    info.stretchH = buf.readUInt16LE(i + 4)
    info.aa = buf.readUInt8(i + 6)
    info.padding = [buf.readInt8(i + 7), buf.readInt8(i + 8), buf.readInt8(i + 9), buf.readInt8(i + 10)]
    info.spacing = [buf.readInt8(i + 11), buf.readInt8(i + 12)]
    info.outline = buf.readUInt8(i + 13)
    info.face = this.readStringNT(buf, i + 14)
    return info
  }

  private readCommon(buf: Buffer, i: number): BMFontCommon {
    const common: BMFontCommon = DefaultBMFontCommon()
    common.lineHeight = buf.readUInt16LE(i)
    common.base = buf.readUInt16LE(i + 2)
    common.scaleW = buf.readUInt16LE(i + 4)
    common.scaleH = buf.readUInt16LE(i + 6)
    common.pages = buf.readUInt16LE(i + 8)
    // const bitField = buf.readUInt8(i + 10);
    common.packed = 0
    common.alphaChnl = buf.readUInt8(i + 11)
    common.redChnl = buf.readUInt8(i + 12)
    common.greenChnl = buf.readUInt8(i + 13)
    common.blueChnl = buf.readUInt8(i + 14)
    return common
  }

  private readPages(buf: Buffer, i: number, size: number): Array<string> {
    const pages: Array<string> = []
    const text = this.readNameNT(buf, i)
    const len = text.length + 1
    const count = size / len
    for (let c = 0; c < count; c++) {
      pages[c] = buf.slice(i, i + text.length).toString('utf8')
      i += len
    }
    return pages
  }

  private readChars(buf: Buffer, i: number, blockSize: number): Array<BMFontChar> {
    const chars: Array<BMFontChar> = []
    const count = blockSize / 20
    for (let c = 0; c < count; c++) {
      const char: BMFontChar = {
        id: 0,
        index: 0,
        char: '',
        width: 0,
        height: 0,
        xoffset: 0,
        yoffset: 0,
        xadvance: 0,
        chnl: 0,
        x: 0,
        y: 0,
        page: 0,
      }
      const off = c * 20
      char.id = buf.readUInt32LE(i + 0 + off)
      char.x = buf.readUInt16LE(i + 4 + off)
      char.y = buf.readUInt16LE(i + 6 + off)
      char.width = buf.readUInt16LE(i + 8 + off)
      char.height = buf.readUInt16LE(i + 10 + off)
      char.xoffset = buf.readInt16LE(i + 12 + off)
      char.yoffset = buf.readInt16LE(i + 14 + off)
      char.xadvance = buf.readInt16LE(i + 16 + off)
      char.page = buf.readUInt8(i + 18 + off)
      char.chnl = buf.readUInt8(i + 19 + off)
      chars[c] = char
    }
    return chars
  }

  private readKernings(buf: Buffer, i: number, blockSize: number): Array<BMFontKern> {
    const kernings: Array<BMFontKern> = []
    const count = blockSize / 10
    for (let c = 0; c < count; c++) {
      const kern: BMFontKern = DefaultBMFontKern()
      const off = c * 10
      kern.first = buf.readUInt32LE(i + 0 + off)
      kern.second = buf.readUInt32LE(i + 4 + off)
      kern.amount = buf.readInt16LE(i + 8 + off)
      kernings[c] = kern
    }
    return kernings
  }

  private readStringNT(buf: Buffer, offset: number): string {
    return this.readNameNT(buf, offset).toString('utf8')
  }

  private readNameNT(buf: Buffer, offset: number): Buffer {
    let pos = offset
    for (; pos < buf.length; pos++) {
      if (buf[pos] === 0x00) break
    }
    return buf.slice(offset, pos)
  }
}

export { BMFontBinaryParser }
