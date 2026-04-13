import * as THREE from 'three';

/**
 * Options for basic, SDF, and single-texture text materials.
 *
 * @interface TextMaterialOption
 */
export interface TextMaterialOption {
  /** Material opacity. {@default 1} */
  opacity?: number;
  /** Alpha test threshold. Fragments with alpha below this are discarded. {@default 0.0001} */
  alphaTest?: number;
  /** Text color. {@default new THREE.Color()} */
  color?: THREE.Color;
  /** Font texture map. */
  map?: THREE.Texture;
  /** Enable transparency. {@default true} */
  transparent?: boolean;
}

/**
 * Options for MSDF (Multi-channel Signed Distance Field) text materials.
 *
 * @interface MSDFTextMaterialOption
 */
export interface MSDFTextMaterialOption extends TextMaterialOption {
  /** Invert the RGB channels of the MSDF texture. {@default true} */
  negate?: boolean;
}

/**
 * Options for multi-page text materials that use multiple texture atlases.
 *
 * @interface MultiPageTextMaterialOption
 */
export interface MultiPageTextMaterialOption {
  /** Material opacity. {@default 1} */
  opacity?: number;
  /** Alpha test threshold. Fragments with alpha below this are discarded. {@default 0.0001} */
  alphaTest?: number;
  /** Text color. {@default new THREE.Color()} */
  color?: THREE.Color;
  /** Array of font texture pages. */
  textures?: THREE.Texture[];
  /** Enable transparency. {@default true} */
  transparent?: boolean;
}
