import * as THREE from 'three';
import { BMFontLoader, BMFontLoaderErrorType } from '~/loader';
import { BMFont, isBMFont } from '~/types';

const config = {
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
  }
}

describe('BMFontLoader', () => {

  test('Valid  XML', async () => {
    const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Roboto-Regular.xml';
    // const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Roboto-Regular-pages.xml';
    const loader = new BMFontLoader();
    const font = await loader.loadXML(uri, config);
    expect(isBMFont(font)).toEqual(true);
  });

  test('Valid Json', async () => {
    const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Roboto-Regular.json';
    const loader = new BMFontLoader();
    const font = await loader.loadJson(uri, config);
    expect(isBMFont(font)).toEqual(true);
  });

  test('Empty Json', async () => {
    try {
      const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Roboto-Regular-empty.json';
      const loader = new BMFontLoader();
      await loader.loadJson(uri);
    } catch (error: any) {
      expect(error.name).toBe(BMFontLoaderErrorType.ParseError);
    }
  });

  test('Invalid Json', async () => {
    try {
      const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Roboto-Regular-invalid.json';
      const loader = new BMFontLoader();
      await loader.loadJson(uri);
    } catch (error: any) {
      expect(error.name).toBe(BMFontLoaderErrorType.LoadError);
    }
  });

  test('Not Fouind Json', async () => {
    try {
      const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Roboto-Regular-notfound.json';
      const loader = new BMFontLoader();
      await loader.loadJson(uri);
    } catch (error: any) {
      expect(error.name).toBe(BMFontLoaderErrorType.LoadError);
    }
  });

  test('Ascii', async () => {
    try {
      const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Lato-Regular-16.fnt';
      const loader = new BMFontLoader();
      const font = await loader.loadAscii(uri);
      expect(isBMFont(font)).toEqual(true);
    } catch (error: any) {
      console.error(error);
    }
  });

  // test('Binary', async () => {
  //   const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Lato-Regular-16.fnt';
  //   const loader = new BMFontLoader();
  //   const font = await loader.loadAscii(uri);
  //   expect(isBMFont(font)).toEqual(true);
  // });

});