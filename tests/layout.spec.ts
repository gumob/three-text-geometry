import fs from 'fs'
import { TextLayout } from '~/layout'
import { BMFontAsciiParser, BMFontJsonParser } from '~/parser'
import { BMFontChar, TextAlign, TextGlyph, TextLayoutOption, WordWrapMode } from '~/types'

function DefaultBMFontChar(): BMFontChar {
  return {
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
}

describe('TextLayout', () => {
    describe('Option', () => {
      test('No font option', () => {
        try {
          new TextLayout('')
        } catch (e) {
          expect(e).toEqual(new TypeError('Must specify a `font` in options'))
        }
      })

      test('Multiple option values', () => {
        const json = fs.readFileSync('tests/fonts/Lato-Regular-32.json').toString()
        const font = new BMFontJsonParser().parse(json)
        const option = {
          font: font,
          start: 1,
          end: 10,
          width: 3,
          align: TextAlign.Left,
          mode: WordWrapMode.Pre,
          letterSpacing: 1,
          lineHeight: font.common.lineHeight,
          tabSize: 1,
        }
        const layout = new TextLayout('Multiple option values', option)
        expect(layout.option.font).toStrictEqual(option.font)
        expect(layout.option.start).toStrictEqual(option.start)
        expect(layout.option.end).toStrictEqual(option.end)
        expect(layout.option.width).toStrictEqual(option.width)
        expect(layout.option.align).toStrictEqual(option.align)
        expect(layout.option.mode).toStrictEqual(option.mode)
        expect(layout.option.letterSpacing).toStrictEqual(option.letterSpacing)
        expect(layout.option.lineHeight).toStrictEqual(option.lineHeight)
        expect(layout.option.tabSize).toStrictEqual(option.tabSize)
      })
    })

    describe('Dimension', () => {
      /** Load Font */
      // const ascii: string = fs.readFileSync('tests/fonts/Lato-Regular-32.fnt').toString();
      // const font = new BMFontAsciiParser().parse(ascii);
      const json = fs.readFileSync('tests/fonts/Lato-Regular-32.json').toString()
      const font = new BMFontJsonParser().parse(json)
      let xIdx: number | undefined
      let xGlyph: BMFontChar = DefaultBMFontChar()
      font.chars.forEach((val: BMFontChar) => {
        if (val.id === 'x'.charCodeAt(0)) {
          xIdx = val.id
          xGlyph = val
          return
        }
      })
      const xHeight = 20
      const baseline = 32
      const lineHeight = 38
      const descender = lineHeight - baseline
      xGlyph.height = xHeight
      xGlyph.width = 17
      xGlyph.xoffset = 2
      font.common.lineHeight = lineHeight
      font.common.base = baseline

      /** Load Font */
      const layout0 = new TextLayout('x', { font: font })

      test('line height matches', () => {
        expect(layout0.height).toBe(lineHeight - descender)
      })

      test('width matches', () => {
        expect(layout0.width).toBe(xGlyph.width + xGlyph.xoffset)
      })

      test('descender matches', () => {
        expect(layout0.descender).toBe(lineHeight - baseline)
      })

      test('ascender matches', () => {
        expect(layout0.ascender).toBe(lineHeight - descender - xHeight)
      })

      test('x-height matches', () => {
        expect(layout0.xHeight).toBe(xHeight)
      })

      test('baseline matches', () => {
        expect(layout0.baseline).toBe(baseline)
      })

      const layout1 = new TextLayout('xx', { font: font })

      test('calculates whole width', () => {
        expect(layout1.width).toBe(xGlyph.xadvance + xGlyph.width + xGlyph.xoffset)
      })

      const layout2 = new TextLayout('xx\nx', { font: font })

      test('multi line width matches', () => {
        expect(layout2.width).toBe(xGlyph.xadvance + xGlyph.width + xGlyph.xoffset)
      })

      const letterSpacing = 4
      const layout3 = new TextLayout('xx', { font: font, letterSpacing: letterSpacing })

      test('letter spacing matches', () => {
        expect(layout3.width).toBe(xGlyph.xadvance + xGlyph.width + xGlyph.xoffset + letterSpacing)
      })

      const layout4 = new TextLayout('hx\nab', { font: font })

      test('provides glyphs', () => {
        const result = layout4.glyphs.map((x: TextGlyph) => String.fromCharCode(x.data.id)).join('')
        expect(result).toStrictEqual('hxab')
      })

      test('provides lines', () => {
        const result = layout4.glyphs.map((x: TextGlyph) => x.line)
        expect(result).toStrictEqual([0, 0, 1, 1])
      })

      test('provides indices', () => {
        const result = layout4.glyphs.map((x: TextGlyph) => x.index)
        expect(result).toStrictEqual([0, 1, 3, 4])
      })
    })

  describe('MultipleUpdateText', () => {
    const str = fs.readFileSync('tests/fonts/Lato-Regular-64.fnt').toString()
    const font = new BMFontAsciiParser().parse(str)
    const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nNulla enim odio, tincidunt sed fringilla sed, placerat vel lectus.`
    const option: TextLayoutOption = {
      font: font,
      align: TextAlign.Left,
      width: 1000,
    }
    const layout = new TextLayout(text, option)
    let prevOption = layout.option
    let prevHeight = layout.height
    for (let i = 1; i <= 10; i++) {
      layout.update(text)
      const curOption = layout.option
      const curHeight = layout.height
      test(`prevOption === curOption`, () => {
        expect(JSON.stringify(prevOption)).toEqual(JSON.stringify(curOption))
      })
      test(`prevHeight === curHeight`, () => {
        expect(prevHeight).toEqual(curHeight)
      })
      prevOption = curOption
      prevHeight = curHeight
    }
  })
})
