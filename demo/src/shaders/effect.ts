import { abs, color, dFdx, dFdy, float, Fn, pow, smoothstep, texture, uniform, uv, vec2, vec3, vec4, wgslFn } from 'three/tsl';
import * as THREE from 'three/webgpu';

/**
 * Simplex noise implemented in WGSL, ported from the classic Ashima Arts GLSL implementation.
 * Uses wgslFn to embed raw WGSL code in the TSL graph.
 */
const snoise3D = wgslFn(`
  fn snoise(v: vec3f) -> f32 {
    let C = vec2f(1.0 / 6.0, 1.0 / 3.0);
    let D = vec4f(0.0, 0.5, 1.0, 2.0);

    var i = floor(v + dot(v, vec3f(C.y, C.y, C.y)));
    let x0 = v - i + dot(i, vec3f(C.x, C.x, C.x));

    let g = step(vec3f(x0.y, x0.z, x0.x), x0);
    let l = 1.0 - g;
    let i1 = min(g, vec3f(l.z, l.x, l.y));
    let i2 = max(g, vec3f(l.z, l.x, l.y));

    let x1 = x0 - i1 + vec3f(C.x, C.x, C.x);
    let x2 = x0 - i2 + vec3f(C.y, C.y, C.y);
    let x3 = x0 - vec3f(D.y, D.y, D.y);

    i = mod289_3(i);
    let p = permute(permute(permute(
      i.z + vec4f(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4f(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4f(0.0, i1.x, i2.x, 1.0));

    let n_ = 0.142857142857;
    let ns = n_ * vec3f(D.w, D.y, D.z) - vec3f(D.x, D.z, D.x);

    let j = p - 49.0 * floor(p * ns.z * ns.z);

    let x_ = floor(j * ns.z);
    let y_ = floor(j - 7.0 * x_);

    let x = x_ * ns.x + vec4f(ns.y, ns.y, ns.y, ns.y);
    let y = y_ * ns.x + vec4f(ns.y, ns.y, ns.y, ns.y);
    let h = 1.0 - abs(x) - abs(y);

    let b0 = vec4f(x.x, x.y, y.x, y.y);
    let b1 = vec4f(x.z, x.w, y.z, y.w);

    let s0 = floor(b0) * 2.0 + 1.0;
    let s1 = floor(b1) * 2.0 + 1.0;
    let sh = -step(h, vec4f(0.0, 0.0, 0.0, 0.0));

    let a0 = vec4f(b0.x, b0.z, b0.y, b0.w) + vec4f(s0.x, s0.z, s0.y, s0.w) * vec4f(sh.x, sh.x, sh.y, sh.y);
    let a1 = vec4f(b1.x, b1.z, b1.y, b1.w) + vec4f(s1.x, s1.z, s1.y, s1.w) * vec4f(sh.z, sh.z, sh.w, sh.w);

    let p0 = vec3f(a0.x, a0.y, h.x);
    let p1 = vec3f(a0.z, a0.w, h.y);
    let p2 = vec3f(a1.x, a1.y, h.z);
    let p3 = vec3f(a1.z, a1.w, h.w);

    let norm = taylorInvSqrt(vec4f(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    let np0 = p0 * norm.x;
    let np1 = p1 * norm.y;
    let np2 = p2 * norm.z;
    let np3 = p3 * norm.w;

    let m = max(0.6 - vec4f(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), vec4f(0.0));
    let m2 = m * m;
    return 42.0 * dot(m2 * m2, vec4f(dot(np0, x0), dot(np1, x1), dot(np2, x2), dot(np3, x3)));
  }
  fn mod289_3(x: vec3f) -> vec3f {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  fn mod289_4(x: vec4f) -> vec4f {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  fn permute(x: vec4f) -> vec4f {
    return mod289_4(((x * 34.0) + 1.0) * x);
  }
  fn taylorInvSqrt(r: vec4f) -> vec4f {
    return 1.79284291400159 - 0.85373472095314 * r;
  }
`);

export interface EffectMaterialUniforms {
  iGlobalTime: { value: number };
  animate: { value: number };
}

export function createEffectMaterial(opts: { map: THREE.Texture; color?: THREE.Color }): {
  material: THREE.MeshBasicNodeMaterial;
  uniforms: EffectMaterialUniforms;
} {
  const iGlobalTime = uniform(0) as any;
  const animate = uniform(0) as any;
  const col = color(opts.color ?? new THREE.Color(0x999999)) as any;
  const tex = texture(opts.map) as any;

  const uvNode = uv() as any;

  const colorOutput = Fn(() => {
    const sdf = tex.a;

    /* animated threshold driven by time and per-glyph line index */
    const animValue = pow(abs(animate.mul(2.0).sub(1.0)), float(12.0).sub(float(0)));
    const threshold = animValue.mul(0.5).add(0.5);

    /* aastep — anti-aliased threshold using screen-space derivatives */
    const aastep: any = Fn(([thresh, val]: any) => {
      const afwidth = vec2(dFdx(val), dFdy(val)).length().mul(0.70710678118654757);
      return smoothstep(thresh.sub(afwidth), thresh.add(afwidth), val);
    });

    const mult = float(3.0);

    /* layer 1: large-scale noise */
    const noise1 = snoise3D(vec3(uvNode.mul(10.0), iGlobalTime)) as any;
    const alpha1 = aastep(threshold, sdf.add(noise1.mul(0.4).mul(mult))).mul(0.15);

    /* layer 2: fine-scale noise */
    const noise2 = snoise3D(vec3(uvNode.mul(50.0), iGlobalTime)) as any;
    const alpha2 = aastep(threshold, sdf.add(noise2.mul(0.1).mul(mult))).mul(0.35);

    /* layer 3: clean SDF edge */
    const alpha3 = aastep(threshold, sdf).mul(0.15);

    const alpha = alpha1.add(alpha2).add(alpha3);

    return vec4(col, alpha);
  });

  const material = new THREE.MeshBasicNodeMaterial({
    transparent: true,
    side: THREE.DoubleSide,
    depthTest: false,
  });

  material.outputNode = colorOutput() as any;

  const uniforms: EffectMaterialUniforms = {
    iGlobalTime: iGlobalTime as any,
    animate: animate as any,
  };

  return { material, uniforms };
}
