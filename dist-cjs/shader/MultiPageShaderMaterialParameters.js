Object.defineProperty(exports,"__esModule",{value:!0}),exports.MultiPageShaderMaterialParameters=void 0;let tslib_1=require("tslib"),THREE=tslib_1.__importStar(require("three"));class MultiPageShaderMaterialParameters{constructor(e){var t="number"==typeof(e=e||{}).opacity?e.opacity:1,r=e.precision||"highp",a="number"==typeof e.alphaTest?e.alphaTest:1e-4;let i={};(l=e.textures||[]).forEach((e,t)=>{i["texture"+t]={type:"t",value:e}});var o=l.map(function(e,t){return"uniform sampler2D texture"+t+";"}).join("\n"),l=l.map(function(e,t){return[(0===t?"if":"else if")+" (vPage == "+t+".0) {","sampleColor = texture2D(texture"+t+", vUv);","}"].join("\n")}).join("\n"),n=e.color;delete e.textures,delete e.color,delete e.precision,delete e.opacity;let s={attributes:{page:{type:"f",value:0}}};72<=(0|(parseInt(THREE.REVISION,10)||0))&&(s=void 0),a=0===a?"":`if (gl_FragColor.a < ${a}) discard;`,t=Object.assign({uniforms:Object.assign({},i,{opacity:{type:"f",value:t},color:{type:"c",value:n}}),vertexShader:`
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
                ${o}
                varying float vPage;
                varying vec2 vUv;
                void main() {
                    vec4 sampleColor = vec4(0.0);
                    ${l}
                    gl_FragColor = sampleColor * vec4(color, opacity);
                    ${a}
                }
                `},s,e),this.uniforms=t.uniforms,this.vertexShader=t.vertexShader,this.fragmentShader=t.fragmentShader}}exports.MultiPageShaderMaterialParameters=MultiPageShaderMaterialParameters;