Object.defineProperty(exports,"__esModule",{value:!0}),exports.MultiPageShaderMaterialParameters=void 0;class MultiPageShaderMaterialParameters{constructor(e){var e=e||{},t="number"==typeof e.opacity?e.opacity:1,a=e.precision||"highp",r="number"==typeof e.alphaTest?e.alphaTest:1e-4,o=e.textures||[];let i={};o.forEach((e,t)=>{i["texture"+t]={type:"t",value:e}});var l=o.map(function(e,t){return"uniform sampler2D texture"+t+";"}).join("\n"),o=o.map(function(e,t){return[(0===t?"if":"else if")+" (vPage == "+t+".0) {","sampleColor = texture2D(texture"+t+", vUv);","}"].join("\n")}).join("\n"),n=e.color,r=(delete e.textures,delete e.color,delete e.precision,delete e.opacity,0===r?"":`if (gl_FragColor.a < ${r}) discard;`),t=Object.assign({uniforms:Object.assign({},i,{opacity:{type:"f",value:t},color:{type:"c",value:n}}),vertexShader:`
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
                ${l}
                varying float vPage;
                varying vec2 vUv;
                void main() {
                    vec4 sampleColor = vec4(0.0);
                    ${o}
                    gl_FragColor = sampleColor * vec4(color, opacity);
                    ${r}
                }
                `},void 0,e);this.uniforms=t.uniforms,this.vertexShader=t.vertexShader,this.fragmentShader=t.fragmentShader}}exports.MultiPageShaderMaterialParameters=MultiPageShaderMaterialParameters;