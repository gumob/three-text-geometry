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
    try {
      const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Roboto-Regular-invalid.xml';
      const loader = new BMFontLoader();
      const font = await loader.loadXML(uri, config);
    } catch (error: any) {
      expect(error.name).toBe(BMFontLoaderErrorType.LoadError);
    }
  });

  test('XML / No-Cache / Empty Single Page', async () => {
    try {
      const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Roboto-Regular-empty.xml';
      const loader = new BMFontLoader();
      await loader.loadXML(uri, config);
    } catch (error: any) {
      expect(error.name).toBe(BMFontLoaderErrorType.LoadError);
    }
  });

  test('XML / No-Cache / Not Found', async () => {
    try {
      const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Roboto-Regular-notfound.xml';
      const loader = new BMFontLoader();
      await loader.loadXML(uri, config);
    } catch (error: any) {
      expect(error.name).toBe(BMFontLoaderErrorType.LoadError);
    }
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

  test('Ascii / Cache / Valid / DejaVu-sdf.fnt', async () => {
    try {
      const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/DejaVu-sdf.fnt';
      const loader = new BMFontLoader();
      const font = await loader.loadAscii(uri);
      expect(isBMFont(font)).toEqual(true);
    } catch (error: any) {
      console.error(error);
    }
  });

  test('Ascii / No-Cache / Valid / DejaVu-sdf.fnt', async () => {
    const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/DejaVu-sdf.fnt';
    const loader = new BMFontLoader();
    const font = await loader.loadAscii(uri, config);
    expect(isBMFont(font)).toEqual(true);
  });

  test('Ascii / No-Cache / Invalid / DejaVu-sdf.fnt', async () => {
    try {
      const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/DejaVu-sdf-invalid.fnt';
      const loader = new BMFontLoader();
      const font = await loader.loadAscii(uri, config);
      expect(isBMFont(font)).toEqual(true);
    } catch (error: any) {
      expect(error.name).toBe(BMFontLoaderErrorType.ParseError);
    }
  });

  test('Ascii / No-Cache / Empty / DejaVu-sdf.fnt', async () => {
    try {
      const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/DejaVu-sdf-empty.fnt';
      const loader = new BMFontLoader();
      const font = await loader.loadAscii(uri, config);
      expect(isBMFont(font)).toEqual(true);
    } catch (error: any) {
      expect(error.name).toBe(BMFontLoaderErrorType.LoadError);
    }
  });

  test('Ascii / No-Cache / Not Found / DejaVu-sdf.fnt', async () => {
    try {
      const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/DejaVu-sdf-notfound.fnt';
      const loader = new BMFontLoader();
      const font = await loader.loadAscii(uri, config);
      expect(isBMFont(font)).toEqual(true);
    } catch (error: any) {
      expect(error.name).toBe(BMFontLoaderErrorType.LoadError);
    }
  });

  test('Ascii / No-Cache / Valid / Lato-Regular-16.fnt', async () => {
    try {
      const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Lato-Regular-16.fnt';
      const loader = new BMFontLoader();
      const font = await loader.loadAscii(uri, config);
      expect(isBMFont(font)).toEqual(true);
    } catch (error: any) {
      console.error(error);
    }
  });

  test('Ascii / No-Cache / Valid / Lato-Regular-24.fnt', async () => {
    try {
      const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Lato-Regular-24.fnt';
      const loader = new BMFontLoader();
      const font = await loader.loadAscii(uri, config);
      expect(isBMFont(font)).toEqual(true);
    } catch (error: any) {
      console.error(error);
    }
  });

  test('Ascii / No-Cache / Valid / Lato-Regular-32.fnt', async () => {
    try {
      const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Lato-Regular-32.fnt';
      const loader = new BMFontLoader();
      const font = await loader.loadAscii(uri, config);
      expect(isBMFont(font)).toEqual(true);
    } catch (error: any) {
      console.error(error);
    }
  });

  test('Ascii / No-Cache / Valid / Lato-Regular-64.fnt', async () => {
    try {
      const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Lato-Regular-64.fnt';
      const loader = new BMFontLoader();
      const font = await loader.loadAscii(uri, config);
      expect(isBMFont(font)).toEqual(true);
    } catch (error: any) {
      console.error(error);
    }
  });

  test('Ascii / No-Cache / Valid / Norwester-Multi-32.fnt', async () => {
    try {
      const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Norwester-Multi-32.fnt';
      const loader = new BMFontLoader();
      const font = await loader.loadAscii(uri, config);
      expect(isBMFont(font)).toEqual(true);
    } catch (error: any) {
      console.error(error);
    }
  });

  test('Ascii / No-Cache / Valid / Norwester-Multi-64.fnt', async () => {
    try {
      const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Norwester-Multi-64.fnt';
      const loader = new BMFontLoader();
      const font = await loader.loadAscii(uri, config);
      expect(isBMFont(font)).toEqual(true);
    } catch (error: any) {
      console.error(error);
    }
  });

  test('Binary / Valid / Cache', async () => {
    const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Arial.bin';
    const loader = new BMFontLoader();
    const font = await loader.loadBinary(uri);
    expect(isBMFont(font)).toEqual(true);
  });

  test('Binary / Invalid / No-Cache', async () => {
    try {
      const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Arial-invalid.bin';
      const loader = new BMFontLoader();
      await loader.loadBinary(uri, config);
    } catch (error: any) {
      expect(error.name).toBe(BMFontLoaderErrorType.LoadError);
    }
  });

  test('Binary / Empty / No-Cache', async () => {
    try {
      const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Arial-empty.bin';
      const loader = new BMFontLoader();
      await loader.loadBinary(uri, config);
    } catch (error: any) {
      expect(error.name).toBe(BMFontLoaderErrorType.LoadError);
    }
  });

  test('Binary / Not Found / No-Cache', async () => {
    try {
      const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Arial-notfound.bin';
      const loader = new BMFontLoader();
      await loader.loadBinary(uri, config);
    } catch (error: any) {
      expect(error.name).toBe(BMFontLoaderErrorType.LoadError);
    }
  });

});