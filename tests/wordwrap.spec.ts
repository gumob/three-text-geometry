import * as wordwrap from '~/layout'
import { createWordWrapOption, WordWrapMode } from '~/types';
// import pre from '../package.json'
// var pre = JSON.stringify(require('./package.json'), undefined, 2)

describe('wordwrap', () => {
  const text = 'lorem   ipsum \t dolor sit amet'
  const multi = 'lorem\nipsum dolor sit amet'
  // test('text with no width is unchanged', () => {
  //   expect(wordwrap.wrap(text)).toEqual(text);
  // });
  // test('text with newlines is multi-lined', () => {
  //   expect(wordwrap.wrap(multi)).toEqual(multi);
  // });
  test('word-wordwrap with N width', () => {
    const result = wordwrap.wrap(text, createWordWrapOption(undefined, undefined, 10));
    console.log(result);
    expect(result).toEqual('lorem\nipsum\ndolor sit\namet');
  });

  //   const text = 'lorem   ipsum \t dolor sit amet'
  //   const multi = 'lorem\nipsum dolor sit amet'
  //   t.equal(wordwrap(text), text, 'text with no width is unchanged');
  //   t.equal(wordwrap(multi), multi, 'text with newlines is multi-lined');
  //   t.equal(wordwrap(text, createWordWrapOption(undefined, undefined, 10)), 'lorem\nipsum\ndolor sit\namet', 'word-wordwrap with N width')

})

// test('wraps monospace glyphs by columns', function (t) {
//   const pre = 'lorem   ipsum \t dolor sit amet'
//   t.equal(wordwrap(pre, createWordWrapOption(undefined, undefined, undefined, WordWrapMode.Pre)),
//     pre, 'pre does not change text')
//   t.equal(wordwrap(pre, createWordWrapOption(undefined, undefined, 20, WordWrapMode.Pre)),
//     chop(pre, 20), 'pre with width will clip text')

//   const text = 'lorem   ipsum \t dolor sit amet'
//   const multi = 'lorem\nipsum dolor sit amet'
//   t.equal(wordwrap(text), text, 'text with no width is unchanged');
//   t.equal(wordwrap(multi), multi, 'text with newlines is multi-lined');
//   t.equal(wordwrap(text, createWordWrapOption(undefined, undefined, 10)), 'lorem\nipsum\ndolor sit\namet', 'word-wordwrap with N width')

//   const overflow = 'it overflows'
//   t.equal(wordwrap(overflow, createWordWrapOption(undefined, undefined, 5)), 'it\noverf\nlows', 'overflow text pushed to next line')

//   const nowrap = 'this text  \n  only wraps \nnewlines'
//   t.equal(wordwrap(nowrap, createWordWrapOption(undefined, undefined, undefined, WordWrapMode.NoWrap)), 'this text  \nonly wraps \nnewlines', 'eats starting whitespace')

//   // t.equal(wordwrap(''), '')
//   t.equal(wordwrap('this is not visible', { width: 0 }), '', 'zero width results in empty string')
//   t.equal(wordwrap('this is not visible', { width: 0, mode: 'pre' }), '', 'zero width results in empty string')
//   t.equal(wordwrap('this is not\nvisible', { width: 0, mode: 'nowrap' }), 'this is not\nvisible', 'zero width nowrap does not result in empty string')
//   t.equal(wordwrap('test some text'), 'test some text')

//   t.end()
// })

// test('wrap a sub-section', function(t) {
//     var str = 'the quick brown fox jumps over the lazy dog'

//     //word-wrap the entire sentence
//     var text = wordwrap(str, { width: 10 })

//     //bits at a time
//     var start = 20
//     var end = 30
//     var text0 = wordwrap(str, { width: 10, start: start, end: end })
//     var text1 = wordwrap(str, { width: 10, start: end })

//     t.equal(text0, 'jumps over', 'only word-wraps a sub-section of text')
//     t.equal(text1, 'the lazy\ndog', 'only word-wraps a sub-section of text')
//     t.end()
// })

// test('custom compute function', function(t) {
//     //a custom compute function that assumes pixel width instead of monospace char width
//     var word = 'words'
//     t.deepEqual(compute2(word, 0, word.length, 4), { end: 0, start: 0, width: 0 }, 'test compute')
//     t.deepEqual(compute2(word, 0, word.length, 5), { end: 1, start: 0, width: 5 }, 'test compute')

//     var text = 'some lines'
//     t.equal(wordwrap(text, { width: 20, measure: compute2 }), 'some\nline\ns', 'cuts text with variable glyph width')
//     t.end()
// })

// test('wraps text to a list of lines', function(t) {
//     var expected = [ { end: 9, start: 0 }, { end: 15, start: 10 } ]
//     t.deepEqual(lines('the quick brown', { width: 10 }), expected, 'returns a list of substring indices')
//     t.end()
// })

// function compute2(_text: string, start: number, end: number, width: number) {
//   //assume each glyph is Npx monospace
//   const pxWidth = 5
//   const availableGlyphs = Math.floor(width / pxWidth)
//   const totalGlyphs = Math.floor((end - start) * pxWidth)
//   const glyphs = Math.min((end - start), availableGlyphs, totalGlyphs)
//   return {
//     width: glyphs * pxWidth, //only used for unit test
//     start: start,
//     end: start + glyphs
//   }
// }

// function chop(text: string, width: number) {
//   return text.split(/\n/g).map(function (str: string) {
//     return str.substring(0, width)
//   }).join('\n')
// }