import * as THREE from 'three';
import fs from 'fs';
import { BMFontLoader } from '~/loader';
import { BMFontLoaderErrorType } from '~/error';
import { BMFont, BMFontChar, createTextLayoutOption, DefaultTextGeometryOption, isBMFont, TextGeometryOption } from '~/types';
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
    const option = createTextLayoutOption(undefined, undefined, undefined, undefined, undefined, font, 'x');
    const layout = new TextLayout(option);
    test('line height matches', () => {
      expect(layout.height).toBe(lineHeight - descender);
    });
    test('width matches', () => {
      expect(layout.width).toBe(xGlyph.width + xGlyph.xoffset);
    });
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
    //   expect(layout.baseline).toBe(baseline);
    // });
  });

  // test('XML / Cache / Valid Single Page', async () => {

  //   const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Roboto-Regular.xml';
  //   const loader = new BMFontLoader();
  //   const font = await loader.loadXML(uri);
  //   expect(isBMFont(font)).toEqual(true);
  //   // const option: TextGeometryOption = DefaultTextGeometryOption();
  //   // option.font = font;
  //   // const geometry = new TextGeometry(option);
  //   // geometry.update('Hello World');
  // });
});
