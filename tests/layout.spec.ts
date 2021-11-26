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
//   describe('Option', () => {
//     test('No font option', () => {
//       try {
//         new TextLayout('')
//       } catch (e) {
//         expect(e).toEqual(new TypeError('Must specify a `font` in options'))
//       }
//     })

//     test('Multiple option values', () => {
//       const json = fs.readFileSync('tests/fonts/Lato-Regular-32.json').toString()
//       const font = new BMFontJsonParser().parse(json)
//       const option = {
//         font: font,
//         start: 1,
//         end: 10,
//         width: 3,
//         align: TextAlign.Left,
//         mode: WordWrapMode.Pre,
//         letterSpacing: 1,
//         lineHeight: font.common.lineHeight,
//         tabSize: 1,
//       }
//       const layout = new TextLayout('Multiple option values', option)
//       expect(layout.option.font).toStrictEqual(option.font)
//       expect(layout.option.start).toStrictEqual(option.start)
//       expect(layout.option.end).toStrictEqual(option.end)
//       expect(layout.option.width).toStrictEqual(option.width)
//       expect(layout.option.align).toStrictEqual(option.align)
//       expect(layout.option.mode).toStrictEqual(option.mode)
//       expect(layout.option.letterSpacing).toStrictEqual(option.letterSpacing)
//       expect(layout.option.lineHeight).toStrictEqual(option.lineHeight)
//       expect(layout.option.tabSize).toStrictEqual(option.tabSize)
//     })
//   })

//   describe('Dimension', () => {
//     /** Load Font */
//     // const ascii: string = fs.readFileSync('tests/fonts/Lato-Regular-32.fnt').toString();
//     // const font = new BMFontAsciiParser().parse(ascii);
//     const json = fs.readFileSync('tests/fonts/Lato-Regular-32.json').toString()
//     const font = new BMFontJsonParser().parse(json)
//     let xIdx: number | undefined
//     let xGlyph: BMFontChar = DefaultBMFontChar()
//     font.chars.forEach((val: BMFontChar) => {
//       if (val.id === 'x'.charCodeAt(0)) {
//         xIdx = val.id
//         xGlyph = val
//         return
//       }
//     })
//     const xHeight = 20
//     const baseline = 32
//     const lineHeight = 38
//     const descender = lineHeight - baseline
//     xGlyph.height = xHeight
//     xGlyph.width = 17
//     xGlyph.xoffset = 2
//     font.common.lineHeight = lineHeight
//     font.common.base = baseline

//     /** Load Font */
//     const layout0 = new TextLayout('x', { font: font })

//     test('line height matches', () => {
//       expect(layout0.height).toBe(lineHeight - descender)
//     })

//     test('width matches', () => {
//       expect(layout0.width).toBe(xGlyph.width + xGlyph.xoffset)
//     })

//     test('descender matches', () => {
//       expect(layout0.descender).toBe(lineHeight - baseline)
//     })

//     test('ascender matches', () => {
//       expect(layout0.ascender).toBe(lineHeight - descender - xHeight)
//     })

//     test('x-height matches', () => {
//       expect(layout0.xHeight).toBe(xHeight)
//     })

//     test('baseline matches', () => {
//       expect(layout0.baseline).toBe(baseline)
//     })

//     const layout1 = new TextLayout('xx', { font: font })

//     test('calculates whole width', () => {
//       expect(layout1.width).toBe(xGlyph.xadvance + xGlyph.width + xGlyph.xoffset)
//     })

//     const layout2 = new TextLayout('xx\nx', { font: font })

//     test('multi line width matches', () => {
//       expect(layout2.width).toBe(xGlyph.xadvance + xGlyph.width + xGlyph.xoffset)
//     })

//     const letterSpacing = 4
//     const layout3 = new TextLayout('xx', { font: font, letterSpacing: letterSpacing })

//     test('letter spacing matches', () => {
//       expect(layout3.width).toBe(xGlyph.xadvance + xGlyph.width + xGlyph.xoffset + letterSpacing)
//     })

//     const layout4 = new TextLayout('hx\nab', { font: font })

//     test('provides glyphs', () => {
//       const result = layout4.glyphs.map((x: TextGlyph) => String.fromCharCode(x.data.id)).join('')
//       expect(result).toStrictEqual('hxab')
//     })

//     test('provides lines', () => {
//       const result = layout4.glyphs.map((x: TextGlyph) => x.line)
//       expect(result).toStrictEqual([0, 0, 1, 1])
//     })

//     test('provides indices', () => {
//       const result = layout4.glyphs.map((x: TextGlyph) => x.index)
//       expect(result).toStrictEqual([0, 1, 3, 4])
//     })
//   })

  describe('MultipleUpdateText', () => {
    const str = fs.readFileSync('tests/fonts/Lato-Regular-64.fnt').toString()
    const font = new BMFontAsciiParser().parse(str)
    const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nNulla enim odio, tincidunt sed fringilla sed, placerat vel lectus.\nDuis non sapien nulla.\nIn convallis nulla nec nulla varius rutrum.\nNunc augue augue, ornare in cursus egestas, cursus vel magna.\nFusce at felis vel tortor sagittis tincidunt nec vitae nisl.\nSed efficitur nibh consequat tortor pulvinar, dignissim tincidunt risus hendrerit.\nSuspendisse quis commodo nulla.\nUt orci urna, mollis non nisl id, molestie tristique purus.\nPhasellus efficitur laoreet eros vehicula convallis.\nSed imperdiet, lectus a facilisis tempus, elit orci varius ante, at lacinia odio massa et quam.\nQuisque vulputate nulla vitae feugiat aliquam.\nVivamus vel mauris sit amet est rhoncus molestie at quis neque.\nDuis faucibus laoreet tempus.\nMaecenas metus velit, lobortis sit amet mauris at, vehicula condimentum velit.\nVestibulum ornare eu turpis vel laoreet.\nNunc ac cursus nunc, non porttitor arcu.`
    const option: TextLayoutOption = {
      font: font,
      align: TextAlign.Left,
      width: 1000,
    }
    const layout = new TextLayout(text, option)
    const option0 = layout.option
    const height0 = layout.height
    layout.update(text)
    const option1 = layout.option
    const height1 = layout.height
    layout.update(text)
    const option2 = layout.option
    const height2 = layout.height
    layout.update(text)
    const option3 = layout.option
    const height3 = layout.height
    layout.update(text)
    const option4 = layout.option
    const height4 = layout.height
    layout.update(text)
    const option5 = layout.option
    const height5 = layout.height
    layout.update(text)
    const option6 = layout.option
    const height6 = layout.height
    layout.update(text)
    const option7 = layout.option
    const height7 = layout.height
    test('option0 === option1', () => {
      expect(JSON.stringify(option0)).toEqual(JSON.stringify(option1))
    })
    test('option1 === option2', () => {
      expect(JSON.stringify(option1)).toEqual(JSON.stringify(option2))
    })
    test('option2 === option3', () => {
      expect(JSON.stringify(option2)).toEqual(JSON.stringify(option3))
    })
    // test('height0 === height1', () => {
    //   expect(height0).toEqual(height1)
    // })
    // test('height1 === height2', () => {
    //   expect(height1).toEqual(height2)
    // })
    // test('height2 === height3', () => {
    //   expect(height2).toEqual(height3)
    // })
    // test('height3 === height4', () => {
    //   expect(height3).toEqual(height4)
    // })
    // test('height4 === height5', () => {
    //   expect(height4).toEqual(height5)
    // })
  })
})
