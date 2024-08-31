import * as fs from 'fs'
import { WordWrap } from '@three-text-geometry/layout'
import { WordMetrics, WordWrapMode } from '@three-text-geometry/types'

function compute2(_text: string, start: number, end: number, width: number): WordMetrics {
  /** assume each glyph is Npx monospace */
  const pxWidth = 5
  const availableGlyphs = Math.floor(width / pxWidth)
  const totalGlyphs = Math.floor((end - start) * pxWidth)
  const glyphs = Math.min(end - start, availableGlyphs, totalGlyphs)
  return {
    width: glyphs * pxWidth /** only used for unit test */,
    start: start,
    end: start + glyphs,
  }
}

function chop(text: string, width: number) {
  return text
    .split(/\n/g)
    .map(function (str: string) {
      return str.substring(0, width)
    })
    .join('\n')
}

describe('WordWrap', () => {
  describe('Wraps monospace glyphs by columns', () => {
    let json = fs.readFileSync('package.json', 'utf8')
    json = JSON.stringify(JSON.parse(json), undefined, 2)

    test('Pre does not change text', () => {
      expect(new WordWrap().wrap(json, { mode: WordWrapMode.Pre })).toEqual(json)
    })

    test('Pre with width will clip text', () => {
      expect(new WordWrap().wrap(json, { width: 20, mode: WordWrapMode.Pre })).toEqual(chop(json, 20))
    })

    const text = 'lorem   ipsum \t dolor sit amet'
    const multi = 'lorem\nipsum dolor sit amet'

    test('Text with no width is unchanged', () => {
      expect(new WordWrap().wrap(text)).toEqual(text)
    })

    test('Text with newlines is multi-lined', () => {
      expect(new WordWrap().wrap(multi)).toEqual(multi)
    })

    test('Word-new WordWrap() with N width', () => {
      expect(new WordWrap().wrap(text, { width: 10 })).toEqual('lorem\nipsum\ndolor sit\namet')
    })

    const overflow = 'it overflows'

    test('Overflow text pushed to next line', () => {
      expect(new WordWrap().wrap(overflow, { width: 5 })).toEqual('it\noverf\nlows')
    })

    const nowrap = 'this text  \n  only wraps \nnewlines'

    test('Eats starting whitespace', () => {
      expect(new WordWrap().wrap(nowrap, { mode: WordWrapMode.NoWrap })).toEqual(
        'this text  \nonly wraps \nnewlines'
      )
    })

    test('Zero width results in empty string', () => {
      expect(new WordWrap().wrap('this is not visible', { width: 0 })).toEqual('')
    })

    test('Zero width results in empty string', () => {
      expect(new WordWrap().wrap('this is not visible', { width: 0, mode: WordWrapMode.Pre })).toEqual('')
    })

    test('Zero width nowrap does not result in empty string', () => {
      expect(new WordWrap().wrap('this is not\nvisible', { width: 0, mode: WordWrapMode.NoWrap })).toEqual(
        'this is not\nvisible'
      )
    })

    test('Test some text', () => {
      expect(new WordWrap().wrap('test some text')).toEqual('test some text')
    })
  })

  describe('Wrap a sub-section', () => {
    const str = 'the quick brown fox jumps over the lazy dog'

    /** word-wrap the entire sentence */
    const text = new WordWrap().wrap(str, { width: 10 })

    /** bits at a time */
    const start = 20
    const end = 30

    const text0 = new WordWrap().wrap(str, { start: start, end: end, width: 10 })
    const text1 = new WordWrap().wrap(str, { start: end, width: 10 })

    test('Only word-wraps a sub-section of text', () => {
      expect(text0).toEqual('jumps over')
    })

    test('Only word-wraps a sub-section of text', () => {
      expect(text1).toEqual('the lazy\ndog')
    })
  })

  describe('Custom compute function', () => {
    /** a custom compute function that assumes pixel width instead of monospace char width */
    const word = 'words'

    test('Test compute', () => {
      expect(compute2(word, 0, word.length, 4)).toStrictEqual({ end: 0, start: 0, width: 0 })
    })

    test('Test compute', () => {
      expect(compute2(word, 0, word.length, 5)).toStrictEqual({ end: 1, start: 0, width: 5 })
    })

    test('Cuts text with variable glyph width', () => {
      const text = 'some lines'
      expect(new WordWrap().wrap(text, { width: 20, measure: compute2 })).toEqual('some\nline\ns')
    })
  })

  describe('Wraps text to a list of lines', () => {
    test('Cuts text with variable glyph width', () => {
      const expected = [
        { end: 9, start: 0, width: 0 },
        { end: 15, start: 10, width: 0 },
      ]
      expect(new WordWrap().lines('the quick brown', { width: 10 })).toEqual(expected)
    })
  })
})
