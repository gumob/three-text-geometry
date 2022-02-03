"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.MultiPageShaderMaterialParameters=void 0;const tslib_1=require("tslib"),THREE=(0,tslib_1.__importStar)(require("three"));class MultiPageShaderMaterialParameters{constructor(e){const t=e||{};var e="number"==typeof t.opacity?t.opacity:1,r=t.precision||"highp",a="number"==typeof t.alphaTest?t.alphaTest:1e-4;const i=t.textures||[],o={};i.forEach((e,t)=>{o["texture"+t]={type:"t",value:e}});var l=i.map(function(e,t){return"uniform sampler2D texture"+t+";"}).join("\n"),n=i.map(function(e,t){return[(0===t?"if":"else if")+" (vPage == "+t+".0) {","sampleColor = texture2D(texture"+t+", vUv);","}"].join("\n")}).join("\n"),s=t.color;delete t.textures,delete t.color,delete t.precision,delete t.opacity;let u={attributes:{page:{type:"f",value:0}}};72<=(0|(parseInt(THREE.REVISION,10)||0))&&(u=void 0);a=0===a?"":`if (gl_FragColor.a < ${a}) discard;`,e=Object.assign({uniforms:Object.assign({},o,{opacity:{type:"f",value:e},color:{type:"c",value:s}}),vertexShader:`
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
                precision ${r} float;
                uniform float opacity;
                uniform vec3 color;
                ${l}
                varying float vPage;
                varying vec2 vUv;
                void main() {
                    vec4 sampleColor = vec4(0.0);
                    ${n}
                    gl_FragColor = sampleColor * vec4(color, opacity);
                    ${a}
                }
                `},u,t);this.uniforms=e.uniforms,this.vertexShader=e.vertexShader,this.fragmentShader=e.fragmentShader}}exports.MultiPageShaderMaterialParameters=MultiPageShaderMaterialParameters;