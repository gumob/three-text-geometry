Object.defineProperty(exports,"__esModule",{value:!0}),exports.createIndices=createIndices;let utils_1=require("@three-text-geometry/utils");function createIndices(e=null,t=null){let r=null;r=e&&(Array.isArray(e)||Buffer.isBuffer(e))?e:(t=e||{},null);var e="string"==typeof(t=t||{}).type?t.type:"uint16",l=void 0!==t.count?t.count:1,i=void 0!==t.start?t.start:0,t="boolean"!=typeof t.clockwise||t.clockwise?[0,2,3]:[2,1,3],n=t[0]||0,o=t[1]||0,u=t[2]||0,s=6*l,c=r||new((0,utils_1.dtype)(e)||Uint16Array)(s);for(let e=0,t=0;e<s;e+=6,t+=4){var a=e+i;c[a+0]=t+0,c[a+1]=t+1,c[a+2]=t+2,c[a+3]=t+n,c[a+4]=t+o,c[a+5]=t+u}return c}