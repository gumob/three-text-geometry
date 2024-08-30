Object.defineProperty(exports,"__esModule",{value:!0}),exports.createMultipageShader=createMultipageShader;let tslib_1=require("tslib"),THREE=tslib_1.__importStar(require("three"));function createMultipageShader(e){var t=void 0!==(e=e||{}).opacity?e.opacity:1,r=e.precision||"highp",a=void 0!==e.alphaTest?e.alphaTest:1e-4,i=e.textures||[],i=Array.isArray(i)?i:[i];let o={};i.forEach((e,t)=>{o["texture"+t]={type:"t",value:e}});var l=i.map(function(e,t){return`uniform sampler2D texture${t};`}).join("\n"),i=i.map(function(e,t){return[(0===t?"if":"else if")+` (vPage == ${t}.0) {`,`sampleColor = texture2D(texture${t}, vUv);`,"}"].join("\n")}).join("\n"),n=e.color||new THREE.Color;delete e.textures,delete e.color,delete e.precision,delete e.opacity;let v={attributes:{page:{type:"f",value:0}}};return 72<=(0|(parseInt(THREE.REVISION,10)||0))&&(v=void 0),Object.assign({uniforms:Object.assign({},o,{opacity:{type:"f",value:t},color:{type:"c",value:n}}),vertexShader:["attribute vec4 position;","attribute vec2 uv;","attribute float page;","uniform mat4 projectionMatrix;","uniform mat4 modelViewMatrix;","varying vec2 vUv;","varying float vPage;","void main() {","vUv = uv;","vPage = page;","gl_Position = projectionMatrix * modelViewMatrix * position;","}"].join("\n"),fragmentShader:[`precision ${r} float;`,"uniform float opacity;","uniform vec3 color;",l,"varying float vPage;","varying vec2 vUv;","void main() {","vec4 sampleColor = vec4(0.0);",i,"gl_FragColor = sampleColor * vec4(color, opacity);",0===a?"":`  if (gl_FragColor.a < ${a}) discard;`,"}"].join("\n")},v,e)}