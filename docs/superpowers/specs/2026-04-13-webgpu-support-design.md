# WebGPU Support Design Spec

## Summary

Migrate three-text-geometry from GLSL/ShaderMaterial to TSL/NodeMaterial for WebGL+WebGPU dual support. This is a breaking change (v3.0.0).

## Approach

**TSL complete replacement (Approach A)**: Replace all internal GLSL shaders with TSL (Three Shading Language) node-based materials. TSL compiles to GLSL for WebGL and WGSL for WebGPU automatically, providing dual renderer support with a single codebase.

## Version

`feat!:` → major bump (3.0.0). The public API types change: `MultiPageShaderMaterial` (extends `ShaderMaterial`) is replaced by `MultiPageTextNodeMaterial` (extends `MeshBasicNodeMaterial`).

## Shader Migration

All 4 GLSL shaders become TSL NodeMaterial classes extending `MeshBasicNodeMaterial` (all shaders are unlit).

### Basic → BasicTextNodeMaterial

Current GLSL: `gl_FragColor = texture2D(map, vUv) * vec4(color, opacity)`

TSL equivalent:
- `colorNode` = `texture(map, uv()).rgb.mul(color(col))`
- `opacityNode` = `texture(map, uv()).a.mul(float(opacity))`
- `alphaTestNode` = `float(alphaTest)`

### SDF → SDFTextNodeMaterial

Current GLSL: Anti-aliased step function using `dFdx`/`dFdy` derivatives on texture alpha.

TSL equivalent:
- Custom `aastep` via `Fn()`: `vec2(dFdx(value), dFdy(value)).length().mul(0.7071...) → smoothstep`
- `opacityNode` = `aastep(texture(map, uv()).a).mul(float(opacity))`
- No `GL_OES_standard_derivatives` branching needed (TSL handles this automatically)

### MSDF → MSDFTextNodeMaterial

Current GLSL: Median of RGB channels → signed distance → `fwidth`-based anti-aliasing.

TSL equivalent:
- Custom `median` via `Fn()`: `max(min(r, g), min(max(r, g), b))`
- `sigDist = median(sample.r, sample.g, sample.b).sub(0.5)`
- `alpha = clamp(sigDist.div(fwidth(sigDist)).add(0.5), 0.0, 1.0)`
- `negate` option: conditionally invert texture RGB with `float(1.0).sub(sample)`

### Multipage → MultiPageTextNodeMaterial

Current GLSL: Dynamic `if/else if` chain selecting texture by `page` attribute.

TSL equivalent:
- `attribute('page', 'float')` for page buffer attribute
- `If/ElseIf` chain: `If(pageAttr.equal(float(0)), () => { sampleColor.assign(texture(textures[0], uv())) })`
- Dynamically generated based on `textures.length`

## File Structure

### New

```
src/materials/
  BasicTextNodeMaterial.ts
  SDFTextNodeMaterial.ts
  MSDFTextNodeMaterial.ts
  MultiPageTextNodeMaterial.ts
  types.ts                    ← shared option interfaces
  index.ts                    ← barrel export
```

### Deleted

```
src/shaders/                  ← GLSL shader generators (internal, not public API)
  basic.ts
  sdf.ts
  msdf.ts
  multipage.ts
  index.ts
src/shader/                   ← old ShaderMaterial classes (public API, replaced)
  MultiPageShaderMaterial.ts
  MultiPageShaderMaterialParameters.ts
  index.ts
```

## Public API

### Option Types

```typescript
interface TextMaterialOption {
  opacity?: number;          // default: 1
  alphaTest?: number;        // default: 0.0001
  color?: THREE.Color;       // default: new THREE.Color()
  map?: THREE.Texture;
  transparent?: boolean;     // default: true
}

interface MSDFTextMaterialOption extends TextMaterialOption {
  negate?: boolean;          // default: true
}

interface MultiPageTextMaterialOption {
  opacity?: number;          // default: 1
  alphaTest?: number;        // default: 0.0001
  color?: THREE.Color;       // default: new THREE.Color()
  textures?: THREE.Texture[];
  transparent?: boolean;     // default: true
}
```

### Material Classes

```typescript
class BasicTextNodeMaterial extends MeshBasicNodeMaterial {
  constructor(option?: TextMaterialOption);
}
class SDFTextNodeMaterial extends MeshBasicNodeMaterial {
  constructor(option?: TextMaterialOption);
}
class MSDFTextNodeMaterial extends MeshBasicNodeMaterial {
  constructor(option?: MSDFTextMaterialOption);
}
class MultiPageTextNodeMaterial extends MeshBasicNodeMaterial {
  constructor(option?: MultiPageTextMaterialOption);
}
```

### Exports (src/index.ts)

```typescript
// Added
export { BasicTextNodeMaterial, SDFTextNodeMaterial, MSDFTextNodeMaterial, MultiPageTextNodeMaterial } from './materials';
export type { TextMaterialOption, MSDFTextMaterialOption, MultiPageTextMaterialOption } from './materials';

// Removed
// export { MultiPageShaderMaterial, MultiPageShaderMaterialParameters } from './shader';
```

### Usage Change

Before (v2.x):
```typescript
const params = new MultiPageShaderMaterialParameters({ textures, color, opacity: 0.95 });
const material = new THREE.RawShaderMaterial(params);
```

After (v3.0.0):
```typescript
const material = new MultiPageTextNodeMaterial({ textures, color, opacity: 0.95 });
```

## Demo Project Migration

### DemoPage.tsx — WebGPURenderer

```tsx
import * as THREE from 'three/webgpu';
import { extend } from '@react-three/fiber';
extend(THREE as any);

<Canvas
  gl={async (props) => {
    const renderer = new THREE.WebGPURenderer(props as any);
    await renderer.init();
    return renderer;
  }}
>
```

### SceneSetup.tsx

No changes needed. `useThree().gl.domElement` works with both renderers.

### demo/src/shaders/effect.ts → TSL

Simplex noise via `wgslFn()` (WGSL embed). Remaining logic (aastep, main composition) via TSL nodes.

### ShaderScene.tsx / ShuffleShaderScene.tsx

`RawShaderMaterial` → `MeshBasicNodeMaterial` with TSL nodes. Uniform updates via `uniform()` node references.

### MultipageScene.tsx

`MultiPageShaderMaterialParameters` + `RawShaderMaterial` → `MultiPageTextNodeMaterial`.

### SimpleScene.tsx / ShuffleScene.tsx

`three/webgpu` extend handles automatic NodeMaterial mapping. Minimal changes.

## Testing Strategy

### Existing Test Updates

`tests/textgeometry.spec.ts`: Replace `MultiPageShaderMaterialParameters` + `RawShaderMaterial` with `MultiPageTextNodeMaterial`.

### New Tests

`tests/materials.spec.ts`:
- Instantiation with default and custom options
- Correct `colorNode`, `opacityNode`, `alphaTestNode` setup
- Multipage: conditional branching built for N textures
- MSDF: `negate` option inverts texture sample

### Mock Limitations

TSL node graph construction works without GPU. Node compilation (GLSL/WGSL generation) requires a renderer — rendering verification deferred to E2E tests (Playwright).

### Deleted

`tests/shader2.ts` — alternative multipage shader implementation, no longer needed.

## Branch & Release

- Branch: `feature/webgpu-support` from `develop`
- Commit: `feat!: add WebGPU support with TSL-based node materials`
- feature → develop: squash merge (PR)
- develop → main: merge commit (PR, triggers semantic-release → 3.0.0)
