import * as THREE from 'three';
import { BMFontLoader } from '~/loader';
import { BMFontLoaderErrorType } from '~/error';
import { BMFont, isBMFont } from '~/types';

const config = {
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
  }
}

describe('BMFontLoader', () => {

  test('XML / Cache / Valid Single Page', async () => {
    const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Roboto-Regular.xml';
    const loader = new BMFontLoader();
    const font = await loader.loadXML(uri);
    expect(isBMFont(font)).toEqual(true);
  });

  test('XML / No-Cache / Valid Single Page', async () => {
    const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Roboto-Regular.xml';
    const loader = new BMFontLoader();
    const font = await loader.loadXML(uri, config);
    expect(isBMFont(font)).toEqual(true);
  });

  test('XML / No-Cache / Valid Multiple Page', async () => {
    const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Roboto-Regular-pages.xml';
    const loader = new BMFontLoader();
    const font = await loader.loadXML(uri, config);
    expect(isBMFont(font)).toEqual(true);
  });

  test('XML / No-Cache / Invalid Single Page', async () => {
    const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Roboto-Regular-invalid.xml';
    const loader = new BMFontLoader();
    const font = await loader.loadXML(uri, config);
    expect(isBMFont(font)).toEqual(true);
  });

  test('XML / No-Cache / Empty Single Page', async () => {
    const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Roboto-Regular-empty.xml';
    const loader = new BMFontLoader();
    const font = await loader.loadXML(uri, config);
    expect(isBMFont(font)).toEqual(true);
  });

  test('XML / No-Cache / Not Found', async () => {
    const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Roboto-Regular-notfound.xml';
    const loader = new BMFontLoader();
    const font = await loader.loadXML(uri, config);
    expect(isBMFont(font)).toEqual(true);
  });

  test('Json / Cache / Valid', async () => {
    const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Roboto-Regular.json';
    const loader = new BMFontLoader();
    const font = await loader.loadJson(uri);
    expect(isBMFont(font)).toEqual(true);
  });

  test('Json / No-Cache / Valid', async () => {
    const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Roboto-Regular.json';
    const loader = new BMFontLoader();
    const font = await loader.loadJson(uri, config);
    expect(isBMFont(font)).toEqual(true);
  });

  test('Json / No-Cache / Empty', async () => {
    try {
      const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Roboto-Regular-empty.json';
      const loader = new BMFontLoader();
      await loader.loadJson(uri, config);
    } catch (error: any) {
      expect(error.name).toBe(BMFontLoaderErrorType.ParseError);
    }
  });

  test('Json / No-Cache / Invalid', async () => {
    try {
      const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Roboto-Regular-invalid.json';
      const loader = new BMFontLoader();
      await loader.loadJson(uri, config);
    } catch (error: any) {
      expect(error.name).toBe(BMFontLoaderErrorType.LoadError);
    }
  });

  test('Json / No-Cache / Not Fouind', async () => {
    try {
      const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Roboto-Regular-notfound.json';
      const loader = new BMFontLoader();
      await loader.loadJson(uri, config);
    } catch (error: any) {
      expect(error.name).toBe(BMFontLoaderErrorType.LoadError);
    }
  });

  test('Ascii / Cache / DejaVu-sdf.fnt', async () => {
    try {
      const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/DejaVu-sdf.fnt';
      const loader = new BMFontLoader();
      const font = await loader.loadAscii(uri);
      expect(isBMFont(font)).toEqual(true);
    } catch (error: any) {
      console.error(error);
    }
  });

  test('Ascii / No-Cache / DejaVu-sdf.fnt', async () => {
    try {
      const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/DejaVu-sdf.fnt';
      const loader = new BMFontLoader();
      const font = await loader.loadAscii(uri, config);
      expect(isBMFont(font)).toEqual(true);
    } catch (error: any) {
      console.error(error);
    }
  });

  test('Ascii / No-Cache / Lato-Regular-16.fnt', async () => {
    try {
      const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Lato-Regular-16.fnt';
      const loader = new BMFontLoader();
      const font = await loader.loadAscii(uri, config);
      expect(isBMFont(font)).toEqual(true);
    } catch (error: any) {
      console.error(error);
    }
  });

  test('Ascii / No-Cache / Lato-Regular-24.fnt', async () => {
    try {
      const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Lato-Regular-24.fnt';
      const loader = new BMFontLoader();
      const font = await loader.loadAscii(uri, config);
      expect(isBMFont(font)).toEqual(true);
    } catch (error: any) {
      console.error(error);
    }
  });

  test('Ascii / No-Cache / Lato-Regular-32.fnt', async () => {
    try {
      const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Lato-Regular-32.fnt';
      const loader = new BMFontLoader();
      const font = await loader.loadAscii(uri, config);
      expect(isBMFont(font)).toEqual(true);
    } catch (error: any) {
      console.error(error);
    }
  });

  test('Ascii / No-Cache / Lato-Regular-64.fnt', async () => {
    try {
      const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Lato-Regular-64.fnt';
      const loader = new BMFontLoader();
      const font = await loader.loadAscii(uri, config);
      expect(isBMFont(font)).toEqual(true);
    } catch (error: any) {
      console.error(error);
    }
  });

  test('Ascii / No-Cache / Norwester-Multi-32.fnt', async () => {
    try {
      const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Norwester-Multi-32.fnt';
      const loader = new BMFontLoader();
      const font = await loader.loadAscii(uri, config);
      expect(isBMFont(font)).toEqual(true);
    } catch (error: any) {
      console.error(error);
    }
  });

  test('Ascii / No-Cache / Norwester-Multi-64.fnt', async () => {
    try {
      const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Norwester-Multi-64.fnt';
      const loader = new BMFontLoader();
      const font = await loader.loadAscii(uri, config);
      expect(isBMFont(font)).toEqual(true);
    } catch (error: any) {
      console.error(error);
    }
  });

  test('Binary / Cache', async () => {
    const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Arial.bin';
    const loader = new BMFontLoader();
    const font = await loader.loadBinary(uri);
    expect(isBMFont(font)).toEqual(true);
  });

  test('Binary / No-Cache', async () => {
    const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Arial.bin';
    const loader = new BMFontLoader();
    const font = await loader.loadBinary(uri, config);
    expect(isBMFont(font)).toEqual(true);
  });

});