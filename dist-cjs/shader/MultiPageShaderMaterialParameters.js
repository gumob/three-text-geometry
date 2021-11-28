"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.MultiPageShaderMaterialParameters=void 0;const tslib_1=require("tslib"),THREE=(0,tslib_1.__importStar)(require("three"));class MultiPageShaderMaterialParameters{constructor(e){const t=e||{};var r="number"==typeof t.opacity?t.opacity:1,a=t.precision||"highp",i="number"==typeof t.alphaTest?t.alphaTest:1e-4;const o=t.textures||[],l={};o.forEach((e,t)=>{l["texture"+t]={type:"t",value:e}});var n=o.map(function(e,t){return"uniform sampler2D texture"+t+";"}).join("\n"),s=o.map(function(e,t){return[(0===t?"if":"else if")+" (vPage == "+t+".0) {","sampleColor = texture2D(texture"+t+", vUv);","}"].join("\n")}).join("\n"),e=t.color;delete t.textures,delete t.color,delete t.precision,delete t.opacity;let u={attributes:{page:{type:"f",value:0}}};72<=(0|(parseInt(THREE.REVISION,10)||0))&&(u=void 0);i=0===i?"":`if (gl_FragColor.a < ${i}) discard;`,i=Object.assign({uniforms:Object.assign({},l,{opacity:{type:"f",value:r},color:{type:"c",value:e}}),vertexShader:`
                attribute vec4 position;
                attribute vec2 uv;
                attribute float page;
                uniform mat4 projectionMatrix;
                uniform mat4 modelViewMatrix;
                varying vec2 vUv;
                varying float vPage;
                void main() {
                    vUv = uv;
                    vPage = page;
                    gl_Position = projectionMatrix * modelViewMatrix * position;
                }
                `,fragmentShader:`
                precision ${a} float;
                uniform float opacity;
                uniform vec3 color;
                ${n}
                varying float vPage;
                varying vec2 vUv;
                void main() {
                    vec4 sampleColor = vec4(0.0);
                    ${s}
                    gl_FragColor = sampleColor * vec4(color, opacity);
                    ${i}
                }
                `},u,t);this.uniforms=i.uniforms,this.vertexShader=i.vertexShader,this.fragmentShader=i.fragmentShader}}exports.MultiPageShaderMaterialParameters=MultiPageShaderMaterialParameters;