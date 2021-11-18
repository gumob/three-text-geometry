import * as THREE from 'three';
// import { computeBox } from '~/utils';
import { BMFontLoader, BMFontLoaderErrorType } from '~/loader';
import TextGeometry from '~/index';
import { BMFont, isBMFont } from '~/types';

// test('BMFontLoader / Valid Json', async () => {
//   const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Roboto-msdf.json';
//   const loader = new BMFontLoader();
//   try {
//     const font = await loader.load(uri);
//     expect(isBMFont(font)).toEqual(true);
//   } catch (error: any) {
//   }
// });

// test('BMFontLoader / Empty Json', async () => {
//   const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Roboto-msdf-empty.json';
//   const loader = new BMFontLoader();
//   // expect(await loader.load(uri)).toThrow(BMFontLoaderErrorType.LoadError);
//   try {
//      await loader.load(uri);
//   } catch (error: any) {
//     expect(error.name).toBe(BMFontLoaderErrorType.ParseError);
//   }
// });

// test('BMFontLoader / Invalid Json', async () => {
//   const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Roboto-msdf-invalid.json';
//   const loader = new BMFontLoader();
//   try {
//      await loader.load(uri);
//   } catch (error: any) {
//     expect(error.name).toBe(BMFontLoaderErrorType.ParseError);
//   }
// });

// test('BMFontLoader / Not Fouind Json', async () => {
//   const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Roboto-msdf-notfound.json';
//   const loader = new BMFontLoader();
//   try {
//      await loader.load(uri);
//   } catch (error: any) {
//     expect(error.name).toBe(BMFontLoaderErrorType.LoadError);
//   }
// });

test('BMFontLoader / Binary', async () => {
  const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Lato-Regular-16.fnt';
  const loader = new BMFontLoader();
  const font = await loader.load(uri);
  expect(isBMFont(font)).toEqual(true);
});