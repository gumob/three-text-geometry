import*as THREE from"three";class MultiPageShaderMaterialParameters{constructor(e){const t=e||{};var a="number"==typeof t.opacity?t.opacity:1,r=t.precision||"highp",o="number"==typeof t.alphaTest?t.alphaTest:1e-4;const i=t.textures||[],n={};i.forEach((e,t)=>{n["texture"+t]={type:"t",value:e}});var l=i.map(function(e,t){return"uniform sampler2D texture"+t+";"}).join("\n"),v=i.map(function(e,t){return[(0===t?"if":"else if")+" (vPage == "+t+".0) {","sampleColor = texture2D(texture"+t+", vUv);","}"].join("\n")}).join("\n"),e=t.color;delete t.textures,delete t.color,delete t.precision,delete t.opacity;let c={attributes:{page:{type:"f",value:0}}};72<=(0|(parseInt(THREE.REVISION,10)||0))&&(c=void 0);o=0===o?"":`if (gl_FragColor.a < ${o}) discard;`,o=Object.assign({uniforms:Object.assign({},n,{opacity:{type:"f",value:a},color:{type:"c",value:e}}),vertexShader:`
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
                    ${v}
                    gl_FragColor = sampleColor * vec4(color, opacity);
                    ${o}
                }
                `},c,t);this.uniforms=o.uniforms,this.vertexShader=o.vertexShader,this.fragmentShader=o.fragmentShader}}export{MultiPageShaderMaterialParameters};