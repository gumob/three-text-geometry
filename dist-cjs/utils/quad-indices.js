"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.createIndices=void 0;const utils_1=require("./");function createIndices(e=null,t=null){let r=null;r=e&&(Array.isArray(e)||Buffer.isBuffer(e))?e:(t=e||{},null);var n="string"==typeof(t=t||{}).type?t.type:"uint16",e=void 0!==t.count?t.count:1,s=void 0!==t.start?t.start:0,t="boolean"!=typeof t.clockwise||t.clockwise?[0,2,3]:[2,1,3],i=t[0]||0,o=t[1]||0,c=t[2]||0,l=6*e;const u=r||new((0,utils_1.dtype)(n)||Uint16Array)(l);for(let e=0,t=0;e<l;e+=6,t+=4){var a=e+s;u[a+0]=t+0,u[a+1]=t+1,u[a+2]=t+2,u[a+3]=t+i,u[a+4]=t+o,u[a+5]=t+c}return u}exports.createIndices=createIndices;