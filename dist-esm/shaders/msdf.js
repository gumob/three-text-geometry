import*as THREE from"three";function createMSDFShader(e){var a=void 0!==(e=e||{}).opacity?e.opacity:1,t=void 0!==e.alphaTest?e.alphaTest:1e-4,i=e.precision||"highp",o=e.color||new THREE.Color,r=e.map||new THREE.Texture,n="boolean"!=typeof e.negate||e.negate;return delete e.map,delete e.color,delete e.precision,delete e.opacity,delete e.negate,Object.assign({uniforms:{opacity:{type:"f",value:a},map:{type:"t",value:r},color:{type:"c",value:o}},vertexShader:["attribute vec2 uv;","attribute vec4 position;","uniform mat4 projectionMatrix;","uniform mat4 modelViewMatrix;","varying vec2 vUv;","void main() {","vUv = uv;","gl_Position = projectionMatrix * modelViewMatrix * position;","}"].join("\n"),fragmentShader:["#ifdef GL_OES_standard_derivatives","#extension GL_OES_standard_derivatives : enable","#endif",`precision ${i} float;`,"uniform float opacity;","uniform vec3 color;","uniform sampler2D map;","varying vec2 vUv;","float median(float r, float g, float b) {","  return max(min(r, g), min(max(r, g), b));","}","void main() {",`  vec3 sample = ${n?"1.0 - ":""} texture2D(map, vUv).rgb;`,"  float sigDist = median(sample.r, sample.g, sample.b) - 0.5;","  float alpha = clamp(sigDist/fwidth(sigDist) + 0.5, 0.0, 1.0);","  gl_FragColor = vec4(color.xyz, alpha * opacity);",0===t?"":`  if (gl_FragColor.a < ${t}) discard;`,"}"].join("\n")},e)}export{createMSDFShader};