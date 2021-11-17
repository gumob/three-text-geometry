import * as THREE from 'three';
import { computeBox } from '~/utils';
import { BMFontLoader } from '~/loader';
import TextGeometry from '~/index';
import { BMFont } from '~/types';

test('load font', async () => {
  computeBox(new Array<number>(), new THREE.Box3());
  const loader = new BMFontLoader();
  try {
    // const font = await loader.load('./src/fnt/Roboto-msdf.json');
    const font = await loader.load('/Users/kojirof/Documents/pj-github/three-bmfont-text-ts/tests/fnt/Roboto-msdf.json');
    console.log('font', font);
  } catch (error) {
    // console.error('error', error);
  }
  // const geom = new TextGeometry({});
});