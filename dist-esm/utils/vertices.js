function extractPages(t){const e=new Float32Array(4*t.length*1);let n=0;return t.forEach(function(t){t=t.data.page||0;e[n++]=t,e[n++]=t,e[n++]=t,e[n++]=t}),e}function extractUVs(t,c,i,s){const f=new Float32Array(4*t.length*2);let h=0;return t.forEach(function(t){var e=t.data,n=e.x+e.width,a=e.y+e.height,t=e.x/c;let o=e.y/i;n/=c;let r=a/i;s&&(o=(i-e.y)/i,r=(i-a)/i),f[h++]=t,f[h++]=o,f[h++]=t,f[h++]=r,f[h++]=n,f[h++]=r,f[h++]=n,f[h++]=o}),f}function extractPositions(t){const o=new Float32Array(4*t.length*2);let r=0;return t.forEach(function(t){var e=t.data,n=t.position[0]+e.xoffset,a=t.position[1]+e.yoffset,t=e.width,e=e.height;o[r++]=n,o[r++]=a,o[r++]=n,o[r++]=a+e,o[r++]=n+t,o[r++]=a+e,o[r++]=n+t,o[r++]=a}),o}export{extractPages,extractPositions,extractUVs};