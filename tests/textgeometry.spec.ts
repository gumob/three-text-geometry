import * as THREE from 'three';
import TextGeometry from '~/index';
import { BMFontLoader } from '~/loader';
import { isBMFont } from '~/types';

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
    const geometry = new TextGeometry('Hello World', { font: font });
    geometry.update('Hello Universe');
  });
});