import * as THREE from 'three';
import fs from 'fs';
import { BMFontLoader } from '~/loader';
import { BMFontLoaderErrorType } from '~/error';
import { BMFont, BMFontChar, createTextLayoutOption, createTextGeometryOption, isBMFont, TextGeometryOption, TextGlyph } from '~/types';
import TextGeometry from '~/index';
import { TextLayout } from '~/layout';
import { BMFontAsciiParser, BMFontXMLParser } from '~/parser';

const config = {
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
  }
}

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
    page: 0
  };
}


describe('TextLayout', () => {

  describe('Option', () => {
    test('No font option', () => {
      try {
        new TextLayout(createTextLayoutOption())
      } catch (e) {
        expect(e).toEqual(new TypeError('Must specify a `font` in options'));
      }
    });
  });

  describe('Dimension', () => {
    /** Load Font */
    // const ascii: string = fs.readFileSync('tests/fnt/Lato-Regular-16.fnt').toString();
    // const ascii: string = fs.readFileSync('tests/fnt/Lato-Regular-24.fnt').toString();
    const ascii: string = fs.readFileSync('tests/fnt/Lato-Regular-32.fnt').toString();
    // const ascii: string = fs.readFileSync('tests/fnt/Lato-Regular-64.fnt').toString();
    const font = new BMFontAsciiParser().parse(ascii);
    let xIdx: number | undefined;
    let xGlyph: BMFontChar = DefaultBMFontChar();
    font.chars.forEach((val: BMFontChar) => {
      if (val.char === 'x') {
        xIdx = val.id;
        xGlyph = val;
        return;
      };
    });
    const xHeight = 20;
    const baseline = 32;
    const lineHeight = 38;
    const descender = lineHeight - baseline;
    xGlyph.height = xHeight;
    xGlyph.width = 17;
    xGlyph.xoffset = 2;
    font.common.lineHeight = lineHeight;
    font.common.base = baseline;

    /** Load Font */
    const option0 = createTextLayoutOption({font: font, text: 'x'});
    const layout0 = new TextLayout(option0);
    test('line height matches', () => {
      expect(layout0.height).toBe(lineHeight - descender);
    });
    // test('width matches', () => {
    //   expect(layout.width).toBe(xGlyph.width + xGlyph.xoffset);
    // });
    // test('descender matches', () => {
    //   expect(layout.descender).toBe(lineHeight - baseline);
    // });
    // test('ascender matches', () => {
    //   expect(layout.ascender).toBe(lineHeight - descender - xHeight);
    // });
    // test('x-height matches', () => {
    //   expect(layout.xHeight).toBe(xHeight);
    // });
    // test('baseline matches', () => {
    //   expect(layout0.baseline).toBe(baseline);
    // });

    // const option1 = createTextLayoutOption(undefined, undefined, undefined, undefined, undefined, font, 'xx');
    // const layout1 = new TextLayout(option1);

    // test('calculates whole width', () => {
    //   expect(layout1.width).toBe(xGlyph.xadvance + xGlyph.width + xGlyph.xoffset);
    // });

    // const option2 = createTextLayoutOption(undefined, undefined, undefined, undefined, undefined, font, 'xx\nx');
    // const layout2 = new TextLayout(option2);

    // test('multi line width matches', () => {
    //   expect(layout2.width).toBe(xGlyph.xadvance + xGlyph.width + xGlyph.xoffset);
    // });

    const space = 4;
    const option3 = createTextLayoutOption({font: font, text: 'xx', letterSpacing: space});
    const layout3 = new TextLayout(option3);

    // test('letter spacing matches', () => {
    //   expect(layout3.width).toBe(xGlyph.xadvance + xGlyph.width + xGlyph.xoffset + space);
    // });

    // const option4 = createTextLayoutOption({font: font, text: 'hx\nab'});
    // const layout4 = new TextLayout(option4);

    // test('provides glyphs', () => {
    //   const result = layout4.glyphs.map((x: TextGlyph) => (String.fromCharCode(x.data.id))).join('');
    //   expect(result).toStrictEqual('hxab');
    // });

    // test('provides lines', () => {
    //   const result = layout4.glyphs.map((x: TextGlyph) => (x.line));
    //   expect(result).toStrictEqual([ 0, 0, 1, 1 ]);
    // });

    // test('provides indices', () => {
    //   const result = layout4.glyphs.map((x: TextGlyph) => (String.fromCharCode(x.index)));
    //   expect(result).toStrictEqual([ 0, 1, 3, 4 ]);
    // });

  });

});
