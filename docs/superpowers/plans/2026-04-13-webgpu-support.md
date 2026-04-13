# WebGPU Support Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace GLSL/ShaderMaterial with TSL/NodeMaterial for WebGL+WebGPU dual support (v3.0.0 breaking change).

**Architecture:** All 4 GLSL shaders become TSL NodeMaterial classes extending `MeshBasicNodeMaterial`. A `.d.ts` augmentation file enables `three/webgpu` and `three/tsl` imports under CJS `moduleResolution: "node"`. Old `src/shaders/` and `src/shader/` directories are deleted, replaced by `src/materials/`.

**Tech Stack:** Three.js 0.183 TSL, `MeshBasicNodeMaterial`, `three/webgpu`, `three/tsl`, React Three Fiber v9 async `gl` prop

**Spec:** `docs/superpowers/specs/2026-04-13-webgpu-support-design.md`

---

## File Map

### Created

| File | Responsibility |
|------|---------------|
| `src/types/three-webgpu.d.ts` | Ambient module declarations for `three/webgpu` and `three/tsl` (CJS build type resolution) |
| `src/materials/types.ts` | Shared option interfaces (`TextMaterialOption`, `MSDFTextMaterialOption`, `MultiPageTextMaterialOption`) |
| `src/materials/BasicTextNodeMaterial.ts` | Basic texture text material |
| `src/materials/SDFTextNodeMaterial.ts` | SDF anti-aliased text material |
| `src/materials/MSDFTextNodeMaterial.ts` | MSDF multi-channel SDF text material |
| `src/materials/MultiPageTextNodeMaterial.ts` | Multi-texture-page text material |
| `src/materials/index.ts` | Barrel export |
| `tests/materials.spec.ts` | Unit tests for all 4 materials |

### Modified

| File | Change |
|------|--------|
| `src/index.ts` | Replace shader exports with material exports |
| `tests/textgeometry.spec.ts` | Replace `MultiPageShaderMaterialParameters` + `RawShaderMaterial` with `MultiPageTextNodeMaterial` |
| `demo/src/index.tsx` | Add `three/webgpu` extend for WebGPU catalog |
| `demo/src/pages/DemoPage.tsx` | Switch Canvas to async `gl` prop with `WebGPURenderer` |
| `demo/src/shaders/effect.ts` | Rewrite GLSL to TSL node functions |
| `demo/src/scenes/ShaderScene.tsx` | Replace `RawShaderMaterial` with TSL-based `MeshBasicNodeMaterial` |
| `demo/src/scenes/ShuffleShaderScene.tsx` | Same as ShaderScene |
| `demo/src/scenes/MultipageScene.tsx` | Replace `MultiPageShaderMaterialParameters` with `MultiPageTextNodeMaterial` |
| `demo/src/scenes/SimpleScene.tsx` | Update `three` import to `three/webgpu` |
| `demo/src/scenes/ShuffleScene.tsx` | Update `three` import to `three/webgpu` |
| `demo/src/components/SceneSetup.tsx` | Update `three` import to `three/webgpu` |

### Deleted

| File | Reason |
|------|--------|
| `src/shaders/basic.ts` | Replaced by `BasicTextNodeMaterial` |
| `src/shaders/sdf.ts` | Replaced by `SDFTextNodeMaterial` |
| `src/shaders/msdf.ts` | Replaced by `MSDFTextNodeMaterial` |
| `src/shaders/multipage.ts` | Replaced by `MultiPageTextNodeMaterial` |
| `src/shaders/index.ts` | Directory deleted |
| `src/shader/MultiPageShaderMaterial.ts` | Replaced by `MultiPageTextNodeMaterial` |
| `src/shader/MultiPageShaderMaterialParameters.ts` | Absorbed into `MultiPageTextNodeMaterial` constructor |
| `src/shader/index.ts` | Directory deleted |
| `tests/shader2.ts` | No longer needed |

---

## Task 1: Branch Creation

**Files:** None (git only)

- [ ] **Step 1: Create feature branch from develop**

```bash
git checkout develop
git pull origin develop
git checkout -b feature/webgpu-support
```

- [ ] **Step 2: Verify branch**

Run: `git branch --show-current`
Expected: `feature/webgpu-support`

---

## Task 2: Type Declarations for three/webgpu and three/tsl

The CJS build uses `moduleResolution: "node"` which does not resolve package.json `exports` field. The ESM build uses `moduleResolution: "bundler"` which does. This `.d.ts` file provides ambient module declarations so both builds can resolve `three/webgpu` and `three/tsl` types.

**Files:**
- Create: `src/types/three-webgpu.d.ts`

- [ ] **Step 1: Create type declaration file**

```typescript
/**
 * Ambient module declarations for Three.js WebGPU and TSL subpath imports.
 *
 * These are needed because tsconfig.cjs.json uses moduleResolution: "node"
 * which does not support package.json exports field. The ESM build uses
 * moduleResolution: "bundler" which resolves these natively; these
 * declarations are harmless there (native resolution takes precedence).
 *
 * @module three-webgpu
 */

declare module 'three/webgpu' {
  export * from '../../node_modules/@types/three/src/Three.WebGPU.js';
}

declare module 'three/tsl' {
  export * from '../../node_modules/@types/three/src/Three.TSL.js';
}
```

- [ ] **Step 2: Verify type resolution**

Run: `cd /Users/kojirof/Documents/Workspace/Projects/pj-github/three-text-geometry && npx tsc --noEmit --project tsconfig.cjs.json 2>&1 | head -20`

Create a temporary test file `src/_type_check.ts`:
```typescript
import { MeshBasicNodeMaterial, WebGPURenderer } from 'three/webgpu';
import { texture, uv, color, float, Fn, dFdx, dFdy, fwidth, smoothstep, clamp, max, min, vec2, vec4, attribute, If, Discard, uniform } from 'three/tsl';
const _m: MeshBasicNodeMaterial = new MeshBasicNodeMaterial();
```

Run: `npx tsc --noEmit --project tsconfig.cjs.json`
Expected: No errors (or only unrelated errors). If the `declare module` path resolution fails, fall back to manual type listing.

Delete `src/_type_check.ts` after verification.

- [ ] **Step 3: Commit**

```bash
git add src/types/three-webgpu.d.ts
git commit -m "chore: add ambient type declarations for three/webgpu and three/tsl"
```

---

## Task 3: Material Option Types

**Files:**
- Create: `src/materials/types.ts`

- [ ] **Step 1: Create option type interfaces**

```typescript
import * as THREE from 'three';

/**
 * Options for basic, SDF, and single-texture text materials.
 *
 * @interface TextMaterialOption
 */
export interface TextMaterialOption {
  /** Material opacity. @default 1 */
  opacity?: number;
  /** Alpha test threshold. Fragments with alpha below this are discarded. @default 0.0001 */
  alphaTest?: number;
  /** Text color. @default new THREE.Color() */
  color?: THREE.Color;
  /** Font texture map. */
  map?: THREE.Texture;
  /** Enable transparency. @default true */
  transparent?: boolean;
}

/**
 * Options for MSDF (Multi-channel Signed Distance Field) text materials.
 *
 * @interface MSDFTextMaterialOption
 */
export interface MSDFTextMaterialOption extends TextMaterialOption {
  /** Invert the RGB channels of the MSDF texture. @default true */
  negate?: boolean;
}

/**
 * Options for multi-page text materials that use multiple texture atlases.
 *
 * @interface MultiPageTextMaterialOption
 */
export interface MultiPageTextMaterialOption {
  /** Material opacity. @default 1 */
  opacity?: number;
  /** Alpha test threshold. Fragments with alpha below this are discarded. @default 0.0001 */
  alphaTest?: number;
  /** Text color. @default new THREE.Color() */
  color?: THREE.Color;
  /** Array of font texture pages. */
  textures?: THREE.Texture[];
  /** Enable transparency. @default true */
  transparent?: boolean;
}
```

- [ ] **Step 2: Verify compilation**

Run: `npx tsc --noEmit --project tsconfig.cjs.json`
Expected: No new errors.

- [ ] **Step 3: Commit**

```bash
git add src/materials/types.ts
git commit -m "feat: add material option type interfaces for WebGPU support"
```

---

## Task 4: BasicTextNodeMaterial

**Files:**
- Create: `src/materials/BasicTextNodeMaterial.ts`
- Modify: `tests/materials.spec.ts` (create)

- [ ] **Step 1: Write failing test**

Create `tests/materials.spec.ts`:

```typescript
/**
 * @jest-environment jsdom
 */
import * as THREE from 'three';

import { BasicTextNodeMaterial } from '@three-text-geometry/materials';

describe('BasicTextNodeMaterial', () => {
  test('creates with default options', () => {
    const material = new BasicTextNodeMaterial();
    expect(material).toBeDefined();
    expect(material.transparent).toBe(true);
  });

  test('creates with custom options', () => {
    const tex = new THREE.Texture();
    const col = new THREE.Color(0xff0000);
    const material = new BasicTextNodeMaterial({
      map: tex,
      color: col,
      opacity: 0.8,
      alphaTest: 0.5,
      transparent: true,
    });
    expect(material).toBeDefined();
    expect(material.transparent).toBe(true);
  });

  test('sets colorNode and opacityNode', () => {
    const material = new BasicTextNodeMaterial({ map: new THREE.Texture() });
    expect(material.colorNode).not.toBeNull();
    expect(material.opacityNode).not.toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm jest tests/materials.spec.ts --no-coverage 2>&1 | tail -20`
Expected: FAIL — module `@three-text-geometry/materials` not found.

- [ ] **Step 3: Create barrel export stub**

Create `src/materials/index.ts`:

```typescript
export * from './types';
export * from './BasicTextNodeMaterial';
```

- [ ] **Step 4: Implement BasicTextNodeMaterial**

```typescript
import * as THREE from 'three/webgpu';
import { color, float, texture, uv } from 'three/tsl';

import { TextMaterialOption } from './types';

/**
 * A node-based material for basic bitmap text rendering.
 * Samples a font texture and multiplies by color and opacity.
 * Works with both WebGL and WebGPU renderers via TSL.
 *
 * @class BasicTextNodeMaterial
 */
class BasicTextNodeMaterial extends THREE.MeshBasicNodeMaterial {
  /**
   * Creates an instance of BasicTextNodeMaterial.
   *
   * @param {TextMaterialOption} [option] - Material configuration options.
   */
  constructor(option?: TextMaterialOption) {
    super();
    const opt = option ?? {};
    const opacityVal = opt.opacity ?? 1;
    const alphaTestVal = opt.alphaTest ?? 0.0001;
    const col = opt.color ?? new THREE.Color();
    const map = opt.map ?? new THREE.Texture();

    const texSample = texture(map, uv());
    this.colorNode = texSample.rgb.mul(color(col));
    this.opacityNode = texSample.a.mul(float(opacityVal));
    this.alphaTestNode = float(alphaTestVal);
    this.transparent = opt.transparent ?? true;
  }
}

export { BasicTextNodeMaterial };
```

- [ ] **Step 5: Run test to verify it passes**

Run: `pnpm jest tests/materials.spec.ts --no-coverage 2>&1 | tail -20`
Expected: PASS. If `MeshBasicNodeMaterial` constructor fails in jsdom, mock `three/webgpu` in `tests/helpers/webgpu-mock.ts` and adjust.

- [ ] **Step 6: Commit**

```bash
git add src/materials/BasicTextNodeMaterial.ts src/materials/index.ts tests/materials.spec.ts
git commit -m "feat: add BasicTextNodeMaterial with TSL-based rendering"
```

---

## Task 5: SDFTextNodeMaterial

**Files:**
- Create: `src/materials/SDFTextNodeMaterial.ts`
- Modify: `tests/materials.spec.ts`
- Modify: `src/materials/index.ts`

- [ ] **Step 1: Add failing test to tests/materials.spec.ts**

Append to the test file:

```typescript
import { SDFTextNodeMaterial } from '@three-text-geometry/materials';

describe('SDFTextNodeMaterial', () => {
  test('creates with default options', () => {
    const material = new SDFTextNodeMaterial();
    expect(material).toBeDefined();
    expect(material.transparent).toBe(true);
  });

  test('creates with custom options', () => {
    const material = new SDFTextNodeMaterial({
      map: new THREE.Texture(),
      color: new THREE.Color(0x00ff00),
      opacity: 0.9,
      alphaTest: 0.01,
    });
    expect(material).toBeDefined();
  });

  test('sets colorNode and opacityNode for SDF rendering', () => {
    const material = new SDFTextNodeMaterial({ map: new THREE.Texture() });
    expect(material.colorNode).not.toBeNull();
    expect(material.opacityNode).not.toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm jest tests/materials.spec.ts --no-coverage 2>&1 | tail -20`
Expected: FAIL — `SDFTextNodeMaterial` not found.

- [ ] **Step 3: Implement SDFTextNodeMaterial**

```typescript
import * as THREE from 'three/webgpu';
import { Fn, color, dFdx, dFdy, float, smoothstep, texture, uv, vec2 } from 'three/tsl';

import { TextMaterialOption } from './types';

/**
 * Anti-aliased step function for SDF rendering.
 * Uses screen-space derivatives to calculate smooth edges.
 */
const aastep = Fn(([value_immutable]: [THREE.TSL.NodeRepresentation]) => {
  const value = float(value_immutable);
  const afwidth = vec2(dFdx(value), dFdy(value)).length().mul(0.70710678118654757);
  return smoothstep(float(0.5).sub(afwidth), float(0.5).add(afwidth), value);
});

/**
 * A node-based material for SDF (Signed Distance Field) text rendering.
 * Uses screen-space derivatives for anti-aliased edges.
 * Works with both WebGL and WebGPU renderers via TSL.
 *
 * @class SDFTextNodeMaterial
 */
class SDFTextNodeMaterial extends THREE.MeshBasicNodeMaterial {
  /**
   * Creates an instance of SDFTextNodeMaterial.
   *
   * @param {TextMaterialOption} [option] - Material configuration options.
   */
  constructor(option?: TextMaterialOption) {
    super();
    const opt = option ?? {};
    const opacityVal = opt.opacity ?? 1;
    const alphaTestVal = opt.alphaTest ?? 0.0001;
    const col = opt.color ?? new THREE.Color();
    const map = opt.map ?? new THREE.Texture();

    const texAlpha = texture(map, uv()).a;
    const alpha = aastep(texAlpha);

    this.colorNode = color(col);
    this.opacityNode = alpha.mul(float(opacityVal));
    this.alphaTestNode = float(alphaTestVal);
    this.transparent = opt.transparent ?? true;
  }
}

export { SDFTextNodeMaterial };
```

- [ ] **Step 4: Add export to src/materials/index.ts**

```typescript
export * from './types';
export * from './BasicTextNodeMaterial';
export * from './SDFTextNodeMaterial';
```

- [ ] **Step 5: Run test to verify it passes**

Run: `pnpm jest tests/materials.spec.ts --no-coverage 2>&1 | tail -20`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/materials/SDFTextNodeMaterial.ts src/materials/index.ts tests/materials.spec.ts
git commit -m "feat: add SDFTextNodeMaterial with TSL anti-aliased rendering"
```

---

## Task 6: MSDFTextNodeMaterial

**Files:**
- Create: `src/materials/MSDFTextNodeMaterial.ts`
- Modify: `tests/materials.spec.ts`
- Modify: `src/materials/index.ts`

- [ ] **Step 1: Add failing test to tests/materials.spec.ts**

Append:

```typescript
import { MSDFTextNodeMaterial } from '@three-text-geometry/materials';

describe('MSDFTextNodeMaterial', () => {
  test('creates with default options (negate=true)', () => {
    const material = new MSDFTextNodeMaterial();
    expect(material).toBeDefined();
    expect(material.transparent).toBe(true);
  });

  test('creates with negate=false', () => {
    const material = new MSDFTextNodeMaterial({
      map: new THREE.Texture(),
      negate: false,
    });
    expect(material).toBeDefined();
  });

  test('sets colorNode and opacityNode for MSDF rendering', () => {
    const material = new MSDFTextNodeMaterial({ map: new THREE.Texture() });
    expect(material.colorNode).not.toBeNull();
    expect(material.opacityNode).not.toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm jest tests/materials.spec.ts --no-coverage 2>&1 | tail -20`
Expected: FAIL — `MSDFTextNodeMaterial` not found.

- [ ] **Step 3: Implement MSDFTextNodeMaterial**

```typescript
import * as THREE from 'three/webgpu';
import { Fn, clamp, color, float, fwidth, max, min, texture, uv } from 'three/tsl';

import { MSDFTextMaterialOption } from './types';

/**
 * Computes the median of three float values.
 * Used to extract the signed distance from MSDF texture RGB channels.
 */
const median = Fn(([r_immutable, g_immutable, b_immutable]: [THREE.TSL.NodeRepresentation, THREE.TSL.NodeRepresentation, THREE.TSL.NodeRepresentation]) => {
  const r = float(r_immutable);
  const g = float(g_immutable);
  const b = float(b_immutable);
  return max(min(r, g), min(max(r, g), b));
});

/**
 * A node-based material for MSDF (Multi-channel Signed Distance Field) text rendering.
 * Computes signed distance from the median of RGB channels with fwidth-based anti-aliasing.
 * Works with both WebGL and WebGPU renderers via TSL.
 *
 * @class MSDFTextNodeMaterial
 */
class MSDFTextNodeMaterial extends THREE.MeshBasicNodeMaterial {
  /**
   * Creates an instance of MSDFTextNodeMaterial.
   *
   * @param {MSDFTextMaterialOption} [option] - Material configuration options.
   */
  constructor(option?: MSDFTextMaterialOption) {
    super();
    const opt = option ?? {};
    const opacityVal = opt.opacity ?? 1;
    const alphaTestVal = opt.alphaTest ?? 0.0001;
    const col = opt.color ?? new THREE.Color();
    const map = opt.map ?? new THREE.Texture();
    const negate = opt.negate ?? true;

    const texSample = texture(map, uv());
    const sample = negate ? float(1.0).sub(texSample.rgb) : texSample.rgb;
    const sigDist = median(sample.x, sample.y, sample.z).sub(0.5);
    const alpha = clamp(sigDist.div(fwidth(sigDist)).add(0.5), 0.0, 1.0);

    this.colorNode = color(col);
    this.opacityNode = alpha.mul(float(opacityVal));
    this.alphaTestNode = float(alphaTestVal);
    this.transparent = opt.transparent ?? true;
  }
}

export { MSDFTextNodeMaterial };
```

- [ ] **Step 4: Add export to src/materials/index.ts**

```typescript
export * from './types';
export * from './BasicTextNodeMaterial';
export * from './SDFTextNodeMaterial';
export * from './MSDFTextNodeMaterial';
```

- [ ] **Step 5: Run test to verify it passes**

Run: `pnpm jest tests/materials.spec.ts --no-coverage 2>&1 | tail -20`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/materials/MSDFTextNodeMaterial.ts src/materials/index.ts tests/materials.spec.ts
git commit -m "feat: add MSDFTextNodeMaterial with TSL median-based rendering"
```

---

## Task 7: MultiPageTextNodeMaterial

**Files:**
- Create: `src/materials/MultiPageTextNodeMaterial.ts`
- Modify: `tests/materials.spec.ts`
- Modify: `src/materials/index.ts`

- [ ] **Step 1: Add failing test to tests/materials.spec.ts**

Append:

```typescript
import { MultiPageTextNodeMaterial } from '@three-text-geometry/materials';

describe('MultiPageTextNodeMaterial', () => {
  test('creates with default options', () => {
    const material = new MultiPageTextNodeMaterial();
    expect(material).toBeDefined();
    expect(material.transparent).toBe(true);
  });

  test('creates with multiple textures', () => {
    const textures = [new THREE.Texture(), new THREE.Texture(), new THREE.Texture()];
    const material = new MultiPageTextNodeMaterial({
      textures,
      color: new THREE.Color(0xffffff),
      opacity: 0.95,
    });
    expect(material).toBeDefined();
  });

  test('sets colorNode and opacityNode', () => {
    const material = new MultiPageTextNodeMaterial({
      textures: [new THREE.Texture(), new THREE.Texture()],
    });
    expect(material.colorNode).not.toBeNull();
    expect(material.opacityNode).not.toBeNull();
  });

  test('works with TextGeometry in a Mesh', () => {
    const ascii = require('fs').readFileSync('tests/fonts/Norwester-Multi-64.fnt').toString();
    const { BMFontAsciiParser } = require('@three-text-geometry/parser');
    const font = new BMFontAsciiParser().parse(ascii);
    const textures = [new THREE.Texture(), new THREE.Texture(), new THREE.Texture(), new THREE.Texture()];
    const material = new MultiPageTextNodeMaterial({
      textures,
      transparent: true,
      opacity: 0.95,
      color: new THREE.Color('rgb(230, 230, 230)'),
    });
    const TextGeometry = require('@three-text-geometry/index').default;
    const geometry = new TextGeometry('Hello World', { font, multipage: true, width: 700 });
    const mesh = new THREE.Mesh(geometry, material);
    expect(mesh).toBeDefined();
    expect(geometry.attributes.position).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm jest tests/materials.spec.ts --no-coverage 2>&1 | tail -20`
Expected: FAIL — `MultiPageTextNodeMaterial` not found.

- [ ] **Step 3: Implement MultiPageTextNodeMaterial**

```typescript
import * as THREE from 'three/webgpu';
import { Fn, If, attribute, color, float, texture, uv, vec4 } from 'three/tsl';

import { MultiPageTextMaterialOption } from './types';

/**
 * A node-based material for rendering text spread across multiple texture pages.
 * Selects the correct texture based on a per-vertex page attribute.
 * Works with both WebGL and WebGPU renderers via TSL.
 *
 * @class MultiPageTextNodeMaterial
 */
class MultiPageTextNodeMaterial extends THREE.MeshBasicNodeMaterial {
  /**
   * Creates an instance of MultiPageTextNodeMaterial.
   *
   * @param {MultiPageTextMaterialOption} [option] - Material configuration options.
   */
  constructor(option?: MultiPageTextMaterialOption) {
    super();
    const opt = option ?? {};
    const opacityVal = opt.opacity ?? 1;
    const alphaTestVal = opt.alphaTest ?? 0.0001;
    const col = opt.color ?? new THREE.Color();
    const textures = opt.textures ?? [];

    if (textures.length === 0) {
      this.colorNode = color(col);
      this.opacityNode = float(opacityVal);
      this.transparent = opt.transparent ?? true;
      return;
    }

    const sampleFn = Fn(() => {
      const pageAttr = attribute('page', 'float');
      const result = vec4(0, 0, 0, 0).toVar();

      let chain = If(pageAttr.equal(float(0)), () => {
        result.assign(texture(textures[0]!, uv()));
      });
      for (let i = 1; i < textures.length; i++) {
        chain = chain.ElseIf(pageAttr.equal(float(i)), () => {
          result.assign(texture(textures[i]!, uv()));
        });
      }

      return result;
    });

    const sampled = sampleFn();
    this.colorNode = sampled.rgb.mul(color(col));
    this.opacityNode = sampled.a.mul(float(opacityVal));
    this.alphaTestNode = float(alphaTestVal);
    this.transparent = opt.transparent ?? true;
  }
}

export { MultiPageTextNodeMaterial };
```

- [ ] **Step 4: Add export to src/materials/index.ts**

Final `src/materials/index.ts`:

```typescript
export * from './types';
export * from './BasicTextNodeMaterial';
export * from './SDFTextNodeMaterial';
export * from './MSDFTextNodeMaterial';
export * from './MultiPageTextNodeMaterial';
```

- [ ] **Step 5: Run test to verify it passes**

Run: `pnpm jest tests/materials.spec.ts --no-coverage 2>&1 | tail -20`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/materials/MultiPageTextNodeMaterial.ts src/materials/index.ts tests/materials.spec.ts
git commit -m "feat: add MultiPageTextNodeMaterial with TSL conditional texture sampling"
```

---

## Task 8: Update Exports and Delete Old Files

**Files:**
- Modify: `src/index.ts`
- Delete: `src/shaders/basic.ts`, `src/shaders/sdf.ts`, `src/shaders/msdf.ts`, `src/shaders/multipage.ts`, `src/shaders/index.ts`
- Delete: `src/shader/MultiPageShaderMaterial.ts`, `src/shader/MultiPageShaderMaterialParameters.ts`, `src/shader/index.ts`
- Delete: `tests/shader2.ts`

- [ ] **Step 1: Update src/index.ts**

Replace the shader export line with materials:

```typescript
import TextGeometry from './TextGeometry';

export * from './helpers/fiber';
export * from './helpers/hook';
export { BMFontError } from './error';
export { BMFontAsciiParser, BMFontBinaryParser, BMFontJsonParser, BMFontXMLParser } from './parser';
export { BasicTextNodeMaterial, MSDFTextNodeMaterial, MultiPageTextNodeMaterial, SDFTextNodeMaterial } from './materials';
export type { MSDFTextMaterialOption, MultiPageTextMaterialOption, TextMaterialOption } from './materials';
export { BMFont, BMFontChar, BMFontCommon, BMFontDistanceField, BMFontInfo, BMFontKern, TextAlign, TextGeometryOption, TextGlyph, WordWrapMode } from './types';

export default TextGeometry;
```

- [ ] **Step 2: Delete old shader files**

```bash
rm -rf src/shaders src/shader
rm tests/shader2.ts
```

- [ ] **Step 3: Update tests/textgeometry.spec.ts**

Replace `MultiPageShaderMaterialParameters` + `RawShaderMaterial` usage (lines 7, 170-176):

Change import line 7 from:
```typescript
import { MultiPageShaderMaterialParameters } from '@three-text-geometry/shader';
```
to:
```typescript
import { MultiPageTextNodeMaterial } from '@three-text-geometry/materials';
```

Change lines 170-176 from:
```typescript
      const params: MultiPageShaderMaterialParameters = new MultiPageShaderMaterialParameters({
        textures: textures,
        transparent: true,
        opacity: 0.95,
        color: new THREE.Color('rgb(230, 230, 230)'),
      });
      const material = new THREE.RawShaderMaterial(params);
```
to:
```typescript
      const material = new MultiPageTextNodeMaterial({
        textures: textures,
        transparent: true,
        opacity: 0.95,
        color: new THREE.Color('rgb(230, 230, 230)'),
      });
```

- [ ] **Step 4: Run all tests**

Run: `pnpm jest --no-coverage 2>&1 | tail -30`
Expected: All tests pass.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat!: replace GLSL shaders with TSL node materials

BREAKING CHANGE: MultiPageShaderMaterial and MultiPageShaderMaterialParameters
have been removed. Use MultiPageTextNodeMaterial instead.
New materials: BasicTextNodeMaterial, SDFTextNodeMaterial,
MSDFTextNodeMaterial, MultiPageTextNodeMaterial."
```

---

## Task 9: Build and Lint Verification

**Files:** None (verification only)

- [ ] **Step 1: Run lint check**

Run: `pnpm lint-check 2>&1 | tail -20`
Expected: No errors. Fix any JSDoc or import issues if they appear.

- [ ] **Step 2: Run format check**

Run: `pnpm format-check 2>&1 | tail -10`
Expected: No issues. Run `pnpm format-fix` if needed.

- [ ] **Step 3: Run build**

Run: `pnpm build 2>&1 | tail -30`
Expected: Both CJS and ESM builds succeed.

- [ ] **Step 4: Run full test suite**

Run: `pnpm test 2>&1 | tail -30`
Expected: All tests pass.

- [ ] **Step 5: Commit any lint/format fixes**

```bash
git add -A
git commit -m "chore: fix lint and format issues"
```

(Skip if no fixes needed.)

---

## Task 10: Demo — WebGPU Canvas Setup

**Files:**
- Modify: `demo/src/index.tsx`
- Modify: `demo/src/pages/DemoPage.tsx`
- Modify: `demo/src/components/SceneSetup.tsx`

- [ ] **Step 1: Update demo/src/index.tsx**

Add `three/webgpu` extend at the top of the file:

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import * as THREE from 'three/webgpu';
import { extend } from '@react-three/fiber';
import 'three-text-geometry';

import DemoPage from '~/pages/DemoPage';
import MultipageScene from '~/scenes/MultipageScene';
import ShaderScene from '~/scenes/ShaderScene';
import ShuffleScene from '~/scenes/ShuffleScene';
import ShuffleShaderScene from '~/scenes/ShuffleShaderScene';
import SimpleScene from '~/scenes/SimpleScene';

import './index.css';

declare module '@react-three/fiber' {
  interface ThreeElements extends ThreeToJSXElements<typeof THREE> {}
}
extend(THREE as any);

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/simple" />} />
        <Route path="/simple" element={<DemoPage><SimpleScene /></DemoPage>} />
        <Route path="/multipage" element={<DemoPage><MultipageScene /></DemoPage>} />
        <Route path="/shuffle" element={<DemoPage><ShuffleScene /></DemoPage>} />
        <Route path="/shader" element={<DemoPage><ShaderScene /></DemoPage>} />
        <Route path="/shuffleshader" element={<DemoPage><ShuffleShaderScene /></DemoPage>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
```

- [ ] **Step 2: Update demo/src/pages/DemoPage.tsx**

Switch Canvas to use WebGPURenderer with async `gl` prop:

```tsx
import { ReactNode, Suspense } from 'react';
import * as THREE from 'three/webgpu';
import { Canvas } from '@react-three/fiber';

import SceneSetup from '~/components/SceneSetup';
import Navigation from '~/Navigation';

interface DemoPageProps {
  children: ReactNode;
}

export default function DemoPage({ children }: DemoPageProps) {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <Canvas
        camera={{ fov: 45, position: [1000, 1000, 2000], near: 1, far: 100000 }}
        gl={async (props) => {
          const renderer = new THREE.WebGPURenderer({ ...props, alpha: true } as any);
          await renderer.init();
          renderer.setClearColor(0x000000, 0);
          renderer.setPixelRatio(window.devicePixelRatio);
          return renderer;
        }}
      >
        <SceneSetup />
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
      <Navigation />
    </div>
  );
}
```

- [ ] **Step 3: Update demo/src/components/SceneSetup.tsx**

Change `three` import to `three/webgpu`:

```tsx
import { useEffect, useRef } from 'react';
import { OrbitControls, Stats } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three/webgpu';

export default function SceneSetup() {
  const controlsRef = useRef<React.ComponentRef<typeof OrbitControls>>(null);
  const { gl } = useThree();

  useEffect(() => {
    const handleClick = () => {
      if (controlsRef.current) {
        controlsRef.current.autoRotate = false;
      }
    };
    gl.domElement.addEventListener('click', handleClick, { once: true });
    return () => {
      gl.domElement.removeEventListener('click', handleClick);
    };
  }, [gl]);

  return (
    <>
      <color attach="background" args={[new THREE.Color(0x000000)]} />
      <fogExp2 attach="fog" args={[0x000104, 0.00035]} />
      <axesHelper args={[1000]} />
      <OrbitControls ref={controlsRef} autoRotate />
      <Stats />
    </>
  );
}
```

- [ ] **Step 4: Commit**

```bash
cd demo
git add src/index.tsx src/pages/DemoPage.tsx src/components/SceneSetup.tsx
git commit -m "feat: switch demo Canvas to WebGPURenderer"
```

---

## Task 11: Demo — Effect Shader TSL Migration

**Files:**
- Modify: `demo/src/shaders/effect.ts`

This is the most complex demo migration. The current GLSL shader uses 3D simplex noise and SDF anti-aliasing for animated text effects. We rewrite it as a TSL `Fn()` that returns a `MeshBasicNodeMaterial`.

- [ ] **Step 1: Rewrite demo/src/shaders/effect.ts**

Replace the entire file with a TSL implementation. The simplex noise is implemented in pure TSL using `Fn()` and math nodes for cross-renderer portability.

```typescript
import * as THREE from 'three/webgpu';
import { Fn, abs, attribute, clamp, color, dFdx, dFdy, dot, float, floor, fract, max, min, mul, smoothstep, step, texture, uniform, uv, vec2, vec3, vec4 } from 'three/tsl';

/* --- Simplex noise helpers (pure TSL, portable to WebGL and WebGPU) --- */

const mod289_3 = Fn(([x_immutable]: [THREE.TSL.NodeRepresentation]) => {
  const x = vec3(x_immutable);
  return x.sub(floor(x.mul(1.0 / 289.0)).mul(289.0));
});

const mod289_4 = Fn(([x_immutable]: [THREE.TSL.NodeRepresentation]) => {
  const x = vec4(x_immutable);
  return x.sub(floor(x.mul(1.0 / 289.0)).mul(289.0));
});

const permute = Fn(([x_immutable]: [THREE.TSL.NodeRepresentation]) => {
  const x = vec4(x_immutable);
  return mod289_4(x.mul(34.0).add(1.0).mul(x));
});

const taylorInvSqrt = Fn(([r_immutable]: [THREE.TSL.NodeRepresentation]) => {
  const r = vec4(r_immutable);
  return float(1.79284291400159).sub(float(0.85373472095314).mul(r));
});

const snoise = Fn(([v_immutable]: [THREE.TSL.NodeRepresentation]) => {
  const v = vec3(v_immutable);
  const C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const D = vec4(0.0, 0.5, 1.0, 2.0);

  const i = floor(v.add(dot(v, vec3(C.y, C.y, C.y)))).toVar();
  const x0 = v.sub(i).add(dot(i, vec3(C.x, C.x, C.x))).toVar();

  const g = step(x0.yzx, x0.xyz);
  const l = float(1.0).sub(g);
  const i1 = min(g.xyz, l.zxy);
  const i2 = max(g.xyz, l.zxy);

  const x1 = x0.sub(i1).add(vec3(C.x, C.x, C.x));
  const x2 = x0.sub(i2).add(vec3(C.y, C.y, C.y));
  const x3 = x0.sub(vec3(D.y, D.y, D.y));

  i.assign(mod289_3(i));
  const p = permute(
    permute(
      permute(i.z.add(vec4(0.0, i1.z, i2.z, 1.0))).add(i.y).add(vec4(0.0, i1.y, i2.y, 1.0)),
    )
      .add(i.x)
      .add(vec4(0.0, i1.x, i2.x, 1.0)),
  );

  const n_ = float(0.142857142857);
  const ns = n_.mul(vec3(D.w, D.y, D.z)).sub(vec3(D.x, D.z, D.x));

  const j = p.sub(floor(p.mul(ns.z).mul(ns.z)).mul(49.0));

  const x_ = floor(j.mul(ns.z));
  const y_ = floor(j.sub(x_.mul(7.0)));

  const px = x_.mul(ns.x).add(vec4(ns.y, ns.y, ns.y, ns.y));
  const py = y_.mul(ns.x).add(vec4(ns.y, ns.y, ns.y, ns.y));
  const h = float(1.0).sub(abs(px)).sub(abs(py));

  const b0 = vec4(px.x, px.y, py.x, py.y);
  const b1 = vec4(px.z, px.w, py.z, py.w);

  const s0 = floor(b0).mul(2.0).add(1.0);
  const s1 = floor(b1).mul(2.0).add(1.0);
  const sh = step(h, vec4(0.0)).negate();

  const a0 = b0.xzyw.add(s0.xzyw.mul(vec4(sh.x, sh.x, sh.y, sh.y)));
  const a1 = b1.xzyw.add(s1.xzyw.mul(vec4(sh.z, sh.z, sh.w, sh.w)));

  const p0 = vec3(a0.x, a0.y, h.x);
  const p1 = vec3(a0.z, a0.w, h.y);
  const p2 = vec3(a1.x, a1.y, h.z);
  const p3 = vec3(a1.z, a1.w, h.w);

  const norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  const p0n = p0.mul(norm.x);
  const p1n = p1.mul(norm.y);
  const p2n = p2.mul(norm.z);
  const p3n = p3.mul(norm.w);

  const m = max(
    float(0.6).sub(vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3))),
    vec4(0.0),
  );
  const m2 = m.mul(m);
  return float(42.0).mul(dot(m2.mul(m2), vec4(dot(p0n, x0), dot(p1n, x1), dot(p2n, x2), dot(p3n, x3))));
});

/* --- Anti-aliased step (SDF) --- */

const aastep = Fn(([threshold_immutable, value_immutable]: [THREE.TSL.NodeRepresentation, THREE.TSL.NodeRepresentation]) => {
  const threshold = float(threshold_immutable);
  const value = float(value_immutable);
  const afwidth = vec2(dFdx(value), dFdy(value)).length().mul(0.70710678118654757);
  return smoothstep(threshold.sub(afwidth), threshold.add(afwidth), value);
});

/* --- Public: create effect material --- */

export interface EffectMaterialOptions {
  map: THREE.Texture;
  color?: THREE.Color;
}

export interface EffectMaterialUniforms {
  iGlobalTime: THREE.TSL.Uniform<number>;
  animate: THREE.TSL.Uniform<number>;
}

export function createEffectMaterial(opts: EffectMaterialOptions): { material: THREE.MeshBasicNodeMaterial; uniforms: EffectMaterialUniforms } {
  const iGlobalTime = uniform(0);
  const animate = uniform(1);
  const col = opts.color ?? new THREE.Color(0x999999);

  const material = new THREE.MeshBasicNodeMaterial({
    transparent: true,
    side: THREE.DoubleSide,
    depthTest: false,
  });

  const lineAttr = attribute('line', 'float');
  const texAlpha = texture(opts.map, uv()).a;

  const outputFn = Fn(() => {
    const animValue = abs(animate.mul(2.0).sub(1.0)).pow(float(12.0).sub(lineAttr.mul(5.0)));
    const threshold = animValue.mul(0.5).add(0.5);
    const mult = float(3.0);
    const uvNode = uv();

    const alpha1 = aastep(threshold, texAlpha.add(snoise(vec3(uvNode.mul(10.0), iGlobalTime)).mul(0.4).mul(mult))).mul(0.15);
    const alpha2 = aastep(threshold, texAlpha.add(snoise(vec3(uvNode.mul(50.0), iGlobalTime)).mul(0.1).mul(mult))).mul(0.35);
    const alpha3 = aastep(threshold, texAlpha).mul(0.15);

    return vec4(color(col), alpha1.add(alpha2).add(alpha3));
  });

  material.colorNode = color(col);
  material.outputNode = outputFn();

  return { material, uniforms: { iGlobalTime, animate } };
}
```

**Note:** The simplex noise implementation in pure TSL is verbose but ensures portability across WebGL and WebGPU. The exact TSL API for swizzling, `toVar()`, and vector component access may need adjustment during implementation based on TypeScript type resolution. If specific operations don't compile, use `wgslFn()` as a fallback for the noise function (demo-only, WebGPU-only).

- [ ] **Step 2: Commit**

```bash
cd demo
git add src/shaders/effect.ts
git commit -m "feat: rewrite demo effect shader in TSL"
```

---

## Task 12: Demo — Scene Component Migrations

**Files:**
- Modify: `demo/src/scenes/ShaderScene.tsx`
- Modify: `demo/src/scenes/ShuffleShaderScene.tsx`
- Modify: `demo/src/scenes/MultipageScene.tsx`
- Modify: `demo/src/scenes/SimpleScene.tsx`
- Modify: `demo/src/scenes/ShuffleScene.tsx`

- [ ] **Step 1: Migrate ShaderScene.tsx**

```tsx
import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three/webgpu';
import TextGeometry, { TextAlign, useFont } from 'three-text-geometry';

import { useTextData } from '~/hooks/useTextData';
import { createEffectMaterial } from '~/shaders/effect';

const fontUrl = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/OdudoMono-Regular-64.json';
const textureUrl = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/OdudoMono-Regular-64.png';

const DURATION = 3;

export default function ShaderScene() {
  const { font, texture, isLoading } = useFont(fontUrl, textureUrl);
  const { staticText, randomText } = useTextData();
  const meshRef = useRef<THREE.Mesh>(null);
  const geometryRef = useRef<TextGeometry>(null);
  const timeRef = useRef(0);

  const effect = useMemo(() => {
    if (!texture) return null;
    return createEffectMaterial({ map: texture, color: new THREE.Color(0x999999) });
  }, [texture]);

  useEffect(() => {
    if (!meshRef.current || !geometryRef.current) return;
    const geom = geometryRef.current;
    geom.computeBoundingBox();
    const box = new THREE.Vector3();
    geom.boundingBox?.getSize(box);
    meshRef.current.position.set(-box.x / 2, box.y / 2, 0);
  }, [font, texture]);

  useFrame((_, delta) => {
    if (!effect || !geometryRef.current || !meshRef.current) return;
    timeRef.current += delta;
    effect.uniforms.iGlobalTime.value = timeRef.current;
    effect.uniforms.animate.value = timeRef.current / DURATION;
    if (timeRef.current > DURATION) {
      timeRef.current = 0;
      geometryRef.current.update(randomText());
      geometryRef.current.computeBoundingBox();
      const box = new THREE.Vector3();
      geometryRef.current.boundingBox?.getSize(box);
      meshRef.current.position.set(-box.x / 2, box.y / 2, 0);
    }
  });

  useEffect(() => {
    return () => {
      effect?.material.dispose();
    };
  }, [effect]);

  if (isLoading || !font || !texture || !effect) return null;

  return (
    <mesh ref={meshRef} rotation={[Math.PI, 0, 0]} material={effect.material}>
      <textGeometry ref={geometryRef} args={[staticText(), { font, align: TextAlign.Left, width: 1600, flipY: texture.flipY }]} />
    </mesh>
  );
}
```

- [ ] **Step 2: Migrate ShuffleShaderScene.tsx**

Same pattern as ShaderScene but with ShuffleText integration. Replace `RawShaderMaterial` with `createEffectMaterial()`, update uniform access:

```tsx
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three/webgpu';
import TextGeometry, { TextAlign, useFont } from 'three-text-geometry';

import ShuffleText, { ShuffleOption, ShuffleState } from '~/effects/shuffle';
import { useTextData } from '~/hooks/useTextData';
import { createEffectMaterial } from '~/shaders/effect';

const fontUrl = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/OdudoMono-Regular-64.json';
const textureUrl = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/OdudoMono-Regular-64.png';

const DURATION = 5;

const shuffleOption: ShuffleOption = {
  shuffleText: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  ignoreRegex: /\s|\t|\n|\r|(\n\r|\.|,)/,
  delay: { min: 0, max: 0 },
  fadeDuration: { min: 500, max: 700 },
  shuffleDuration: { min: 1000, max: 2500 },
  interval: { min: 20, max: 60 },
};

export default function ShuffleShaderScene() {
  const { font, texture, isLoading } = useFont(fontUrl, textureUrl);
  const { staticText } = useTextData();
  const meshRef = useRef<THREE.Mesh>(null);
  const geometryRef = useRef<TextGeometry>(null);
  const timeRef = useRef(0);
  const shuffleRef = useRef<ShuffleText | null>(null);

  const effect = useMemo(() => {
    if (!texture) return null;
    return createEffectMaterial({ map: texture, color: new THREE.Color(0x999999) });
  }, [texture]);

  const triggerShuffle = useCallback(() => {
    if (!geometryRef.current) return;
    shuffleRef.current?.cancel();
    shuffleRef.current = new ShuffleText(staticText(), shuffleOption, (text: string, _: ShuffleState) => {
      geometryRef.current?.update(text);
    });
    shuffleRef.current.start();
  }, [staticText]);

  useEffect(() => {
    if (!meshRef.current || !geometryRef.current) return;
    const geom = geometryRef.current;
    geom.computeBoundingBox();
    const box = new THREE.Vector3();
    geom.boundingBox?.getSize(box);
    meshRef.current.position.set(-box.x / 2, box.y / 2, 0);
  }, [font, texture]);

  useEffect(() => {
    return () => {
      shuffleRef.current?.cancel();
      effect?.material.dispose();
    };
  }, [effect]);

  useFrame((_, delta) => {
    if (!effect || !geometryRef.current || !meshRef.current) return;
    timeRef.current += delta;
    effect.uniforms.iGlobalTime.value = timeRef.current;
    effect.uniforms.animate.value = timeRef.current / DURATION;
    if (timeRef.current > DURATION) {
      timeRef.current = 0;
      triggerShuffle();
    }
  });

  if (isLoading || !font || !texture || !effect) return null;

  return (
    <mesh ref={meshRef} rotation={[Math.PI, 0, 0]} material={effect.material}>
      <textGeometry ref={geometryRef} args={[staticText(), { font, align: TextAlign.Left, width: 1600, flipY: texture.flipY }]} />
    </mesh>
  );
}
```

- [ ] **Step 3: Migrate MultipageScene.tsx**

```tsx
import { useEffect, useMemo, useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three/webgpu';
import TextGeometry, { MultiPageTextNodeMaterial, TextAlign, useFont } from 'three-text-geometry';

import { useTextData } from '~/hooks/useTextData';

const fontUrl = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/OdudoMono-Regular-64-Multipage.json';
const textureUrls = [
  'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/OdudoMono-Regular-64-Multipage-0.png',
  'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/OdudoMono-Regular-64-Multipage-1.png',
  'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/OdudoMono-Regular-64-Multipage-2.png',
];

export default function MultipageScene() {
  const { font, isLoading: isFontLoading } = useFont(fontUrl, null);
  const textures = useLoader(THREE.TextureLoader, textureUrls);
  const { staticText } = useTextData();
  const meshRef = useRef<THREE.Mesh>(null);

  const material = useMemo(() => {
    if (!textures || textures.length === 0) return null;
    return new MultiPageTextNodeMaterial({
      textures: textures,
      transparent: true,
      opacity: 0.95,
      alphaTest: 0.5,
      color: new THREE.Color(0x999999),
    });
  }, [textures]);

  useEffect(() => {
    if (!meshRef.current) return;
    const geom = meshRef.current.geometry as TextGeometry;
    geom.computeBoundingBox();
    const box = new THREE.Vector3();
    geom.boundingBox?.getSize(box);
    meshRef.current.position.set(-box.x / 2, box.y / 2, 0);
  }, [font, textures]);

  if (isFontLoading || !font || !textures || !material) return null;

  return (
    <mesh ref={meshRef} rotation={[Math.PI, 0, 0]} material={material}>
      <textGeometry args={[staticText(), { font, align: TextAlign.Left, width: 1600, flipY: textures[0].flipY, multipage: true }]} />
    </mesh>
  );
}
```

- [ ] **Step 4: Update SimpleScene.tsx**

Change `import * as THREE from 'three'` to `import * as THREE from 'three/webgpu'`. No other changes needed — `meshBasicMaterial` JSX element will resolve to `MeshBasicNodeMaterial` via the `extend(THREE)` in `index.tsx`.

- [ ] **Step 5: Update ShuffleScene.tsx**

Same as SimpleScene: change `import * as THREE from 'three'` to `import * as THREE from 'three/webgpu'`.

- [ ] **Step 6: Commit**

```bash
cd demo
git add src/scenes/
git commit -m "feat: migrate demo scenes to TSL/NodeMaterial"
```

---

## Task 13: Demo Build and Browser Verification

**Files:** None (verification only)

- [ ] **Step 1: Install demo dependencies**

```bash
cd demo
pnpm install
```

- [ ] **Step 2: Build demo**

Run: `cd demo && pnpm build 2>&1 | tail -20`
Expected: Build succeeds. Fix any TypeScript errors if they appear.

- [ ] **Step 3: Start dev server and verify in browser**

Run: `cd demo && pnpm dev`

Open in Chrome/Edge (WebGPU-capable browser) and verify each route:
- `/simple` — Basic text renders correctly
- `/multipage` — Multi-page text renders correctly
- `/shuffle` — Shuffle animation works
- `/shader` — SDF effect shader with noise animation works
- `/shuffleshader` — Shuffle + shader effect works

Check browser console for WebGPU initialization messages and absence of errors.

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve demo build and runtime issues"
```

(Skip if no fixes needed.)

---

## Task 14: Final Library Verification and Commit

**Files:**
- Modify: `package.json` (if peerDep minimum version needs updating)

- [ ] **Step 1: Verify peerDependencies**

Check if `three >= 0.172.0` supports `three/webgpu` and `MeshBasicNodeMaterial`. If a higher minimum is needed, update `package.json`.

- [ ] **Step 2: Run full library validation**

Run: `pnpm all 2>&1 | tail -40`

This runs: format-fix, lint-fix, typedoc, build, test-coverage.

Expected: All steps pass.

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat!: add WebGPU support with TSL-based node materials

BREAKING CHANGE: Replaced GLSL ShaderMaterial with TSL NodeMaterial.
- MultiPageShaderMaterial removed, use MultiPageTextNodeMaterial
- MultiPageShaderMaterialParameters removed, pass options directly
- New materials: BasicTextNodeMaterial, SDFTextNodeMaterial,
  MSDFTextNodeMaterial, MultiPageTextNodeMaterial
- Demo migrated to WebGPURenderer
- Requires three.js with TSL/NodeMaterial support"
```
