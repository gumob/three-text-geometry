import * as THREE from 'three';
import { BMFontLoader } from '~/loader';
import { BMFontLoaderErrorType } from '~/error';
import { BMFont, isBMFont, TextGeometryOption } from '~/types';
import TextGeometry from '~/index';

const config = {
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
  }
}

describe('TextGeometry', () => {

  test('XML / Cache / Valid Single Page', async () => {
    const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fnt/Roboto-Regular.xml';
    const loader = new BMFontLoader();
    const font = await loader.loadXML(uri);
    expect(isBMFont(font)).toEqual(true);
    const option: TextGeometryOption = {
      font: font,
    }
    const geometry = new TextGeometry(option);
    geometry.update('Hello World');
  });
});