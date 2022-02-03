import*as THREE from"three";class MultiPageShaderMaterialParameters{constructor(e){const t=e||{};var e="number"==typeof t.opacity?t.opacity:1,a=t.precision||"highp",r="number"==typeof t.alphaTest?t.alphaTest:1e-4;const o=t.textures||[],i={};o.forEach((e,t)=>{i["texture"+t]={type:"t",value:e}});var n=o.map(function(e,t){return"uniform sampler2D texture"+t+";"}).join("\n"),l=o.map(function(e,t){return[(0===t?"if":"else if")+" (vPage == "+t+".0) {","sampleColor = texture2D(texture"+t+", vUv);","}"].join("\n")}).join("\n"),v=t.color;delete t.textures,delete t.color,delete t.precision,delete t.opacity;let c={attributes:{page:{type:"f",value:0}}};72<=(0|(parseInt(THREE.REVISION,10)||0))&&(c=void 0);r=0===r?"":`if (gl_FragColor.a < ${r}) discard;`,e=Object.assign({uniforms:Object.assign({},i,{opacity:{type:"f",value:e},color:{type:"c",value:v}}),vertexShader:`
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
                    ${l}
                    gl_FragColor = sampleColor * vec4(color, opacity);
                    ${r}
                }
                `},c,t);this.uniforms=e.uniforms,this.vertexShader=e.vertexShader,this.fragmentShader=e.fragmentShader}}export{MultiPageShaderMaterialParameters};