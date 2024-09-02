Object.defineProperty(exports,"__esModule",{value:!0}),exports.WordWrap=void 0;let types_1=require("../types");class WordWrap{wrap(r,e={}){return this.lines(r,e).map(e=>r.substring(e.start,e.end)).join("\n")}lines(e,r={}){var t={start:void 0,end:void 0,width:void 0,mode:void 0,measure:void 0};return e=e||"",void 0!==r.start?t.start=Math.max(0,r.start):t.start=0,t.end=void 0!==r.end?r.end:e.length,t.width=void 0!==r.width?r.width:Number.MAX_VALUE,void 0!==r.mode&&(t.mode=r.mode),t.measure=r.measure||this.monospace,0===t.width&&t.mode!==types_1.WordWrapMode.NoWrap?[]:r.mode===types_1.WordWrapMode.Pre?this.pre(t.measure,e,t.start,t.end,t.width):this.greedy(t.measure,e,t.start,t.end,t.width,t.mode)}idxOf(e,r,t,a){e=e.indexOf(r,t);return-1===e||a<e?a:e}isWhitespace(e){return WordWrap.whitespaceRegexp.test(e)}pre(r,t,a,d,s){var i=[];let o=a;for(let e=a;e<d&&e<t.length;e++){var n=t.charAt(e),n=WordWrap.newlineRegexp.test(n);!n&&e!==d-1||(n=n?e:e+1,n=r(t,o,n,s),i.push(n),o=e+1)}return i}greedy(t,a,d,s,e,r){var i=[];let o=e;for(r===types_1.WordWrapMode.NoWrap&&(o=Number.MAX_VALUE);d<s&&d<a.length;){for(var n=this.idxOf(a,WordWrap.newlineChar,d,s);d<n&&this.isWhitespace(a.charAt(d));)d++;var p=t(a,d,n,o);let e=d+(p.end-p.start),r=e+WordWrap.newlineChar.length;if(e<n){for(;e>d&&!this.isWhitespace(a.charAt(e));)e--;if(e===d)r>d+WordWrap.newlineChar.length&&r--,e=r;else for(r=e;e>d&&this.isWhitespace(a.charAt(e-WordWrap.newlineChar.length));)e--}e>=d&&i.push(t(a,d,e,o)),d=r}return i}monospace(e,r,t,a){return{start:r,end:r+Math.min(a,t-r),width:0}}}(exports.WordWrap=WordWrap).newlineRegexp=/\n/,WordWrap.whitespaceRegexp=/\s/,WordWrap.newlineChar="\n";