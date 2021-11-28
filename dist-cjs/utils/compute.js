"use strict";function bounds(e){const t={min:[0,0],max:[0,0]};if(!e[0]||!e[1])return t;var n=e.length/2;t.min[0]=e[0],t.min[1]=e[1],t.max[0]=e[0],t.max[1]=e[1];for(let m=0;m<n;m++){var a=e[2*m+0],o=e[2*m+1];a&&o&&(t.min[0]=Math.min(a,t.min[0]),t.min[1]=Math.min(o,t.min[1]),t.max[0]=Math.max(a,t.max[0]),t.max[1]=Math.max(o,t.max[1]))}return t}function computeBox(m,e){m=bounds(m);m.min[0]&&m.min[1]&&m.max[0]&&m.max[1]&&(e.min.set(m.min[0],m.min[1],0),e.max.set(m.max[0],m.max[1],0))}function computeSphere(m,e){var t,n,a,o=bounds(m);o.min[0]&&o.min[1]&&o.max[0]&&o.max[1]&&(t=o.min[0],n=o.min[1],a=o.max[0]-t,m=o.max[1]-n,o=Math.sqrt(a*a+m*m),e.center.set(t+a/2,n+m/2,0),e.radius=o/2)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.computeSphere=exports.computeBox=void 0,exports.computeBox=computeBox,exports.computeSphere=computeSphere;