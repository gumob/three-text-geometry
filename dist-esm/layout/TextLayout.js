import{WordWrap}from"~/layout";import{TextAlign}from"~/types";class TextLayout{static X_HEIGHTS=["x","e","a","o","n","s","r","c","u","m","v","w","z"];static M_WIDTHS=["m","w"];static CAP_HEIGHTS=["H","I","N","E","F","K","L","T","U","V","W","X","Y","Z"];static TAB_ID="\t".charCodeAt(0);static SPACE_ID=" ".charCodeAt(0);_opt={font:void 0,letterSpacing:void 0,tabSize:void 0,lineHeight:void 0,align:void 0,start:void 0,end:void 0,width:void 0,mode:void 0,measure:void 0};_fallbackSpaceGlyph=null;_fallbackTabGlyph=null;_glyphs;_width;_height;_descender;_ascender;_xHeight;_baseline;_capHeight;_lineHeight;get option(){return{...this._opt}}get glyphs(){return this._glyphs??[]}get width(){return this._width??0}get height(){return this._height??0}get descender(){return this._descender??0}get ascender(){return this._ascender??0}get xHeight(){return this._xHeight??0}get baseline(){return this._baseline??0}get capHeight(){return this._capHeight??0}get lineHeight(){return this._lineHeight??0}toString(){return`{
  glyphs: ${this.glyphs.length}
  width: ${this.width}
  height: ${this.height}
  descender: ${this.descender}
  ascender: ${this.ascender}
  xHeight: ${this.xHeight}
  baseline: ${this.baseline}
  capHeight: ${this.capHeight}
  lineHeight: ${this.lineHeight}
}`}constructor(t,e={}){if(void 0===e.font)throw new TypeError("Must specify a `font` in options");this._opt.font=e.font,this.update(t,e)}update(t,e={}){this._glyphs=[],this._width=0,this._height=0,this._descender=0,this._ascender=0,this._xHeight=0,this._baseline=0,this._capHeight=0,void(this._lineHeight=0)!==e.font&&(this._opt.font=e.font),this._opt.start=void 0!==e.start?Math.max(0,e.start):0,this._opt.end=void 0!==e.end?e.end:t.length,void 0!==e.width&&(this._opt.width=e.width),this._opt.align=void 0!==e.align?e.align:TextAlign.Left,void 0!==e.mode&&(this._opt.mode=e.mode),this._opt.letterSpacing=void 0!==e.letterSpacing?e.letterSpacing:0,this._opt.lineHeight=(void 0!==e.lineHeight?e:this._opt.font.common).lineHeight,this._opt.tabSize=void 0!==e.tabSize?e.tabSize:4,this._opt.measure=this.computeMetrics.bind(this),this._setupSpaceGlyphs(this._opt.font,this._opt.tabSize);var s=this._opt.font,a=(new WordWrap).lines(t,this._opt);let i=this._opt.width||0;var r=a.reduce((t,e)=>Math.max(t,e.width,i),0);let n=0,o=0;var l=this._opt.lineHeight,e=s.common.base,h=l-e,g=this._opt.letterSpacing,d=l*a.length-h,p=this._opt.align;this._width=r,this._height=d,this._descender=l-e,this._baseline=e,this._xHeight=this.getXHeight(s),this._capHeight=this.getCapHeight(s),this._lineHeight=l,this._ascender=l-h-this._xHeight;for(let h=0;h<a.length;h++){var c=a[h],_=c.start,u=c.end,f=c.width;let i=void 0;for(let e=_;e<u;e++){var H=t.charCodeAt(e),H=this.getGlyph(s,H);if(H){i&&(n+=this.getKerning(s,i.id,H.id));let t=n;p===TextAlign.Center?t+=(r-f)/2:p===TextAlign.Right&&(t+=r-f),this._glyphs.push({position:[t,o],data:H,index:e,line:h}),n+=H.xadvance+g,i=H}}o+=l,n=0}}_setupSpaceGlyphs(t,e){this._fallbackSpaceGlyph=null,this._fallbackTabGlyph=null,t.chars&&0!==t.chars.length&&(t=this.getGlyphById(t,TextLayout.SPACE_ID)||this.getMGlyph(t)||t.chars[0])&&(e=e*t.xadvance,this._fallbackSpaceGlyph={...t},this._fallbackTabGlyph=Object.assign({...t},{x:0,y:0,xadvance:e,id:TextLayout.TAB_ID,xoffset:0,yoffset:0,width:0,height:0}))}getGlyph(t,e){t=this.getGlyphById(t,e);return t||(e===TextLayout.TAB_ID?this._fallbackTabGlyph:e===TextLayout.SPACE_ID?this._fallbackSpaceGlyph:null)}computeMetrics(e,i,h,s){var a=this._opt.letterSpacing||0,r=this._opt.font;let n=0,o=0,l=0;if(!r||!r.chars||0===r.chars.length)return{start:i,end:i,width:0};h=Math.min(e.length,h);let g;for(let t=i;t<h;t++){var d=e.charCodeAt(t),d=this.getGlyph(r,d);if(d){var p=g?this.getKerning(r,g.id,d.id):0,p=(n+=p)+d.xadvance+a,c=n+d.width;if(s<=c||s<=p)break;n=p,o=c,g=d}l++}return g&&(o+=g.xoffset),{start:i,end:i+l,width:o}}getGlyphById(t,e){return t.chars&&0!==t.chars.length&&0<=(e=this.findChar(t.chars,e))?t.chars[e]:void 0}getXHeight(e){for(let t=0;t<TextLayout.X_HEIGHTS.length;t++){var i=TextLayout.X_HEIGHTS[t].charCodeAt(0),i=this.findChar(e.chars,i);if(0<=i)return e.chars[i].height}return 0}getMGlyph(e){for(let t=0;t<TextLayout.M_WIDTHS.length;t++){var i=TextLayout.M_WIDTHS[t].charCodeAt(0),i=this.findChar(e.chars,i);if(0<=i)return e.chars[i]}}getCapHeight(e){for(let t=0;t<TextLayout.CAP_HEIGHTS.length;t++){var i=TextLayout.CAP_HEIGHTS[t].charCodeAt(0),i=this.findChar(e.chars,i);if(0<=i)return e.chars[i].height}return 0}getKerning(t,e,i){if(t.kernings&&0!==t.kernings.length){var h=t.kernings;for(let t=0;t<h.length;t++){var s=h[t];if(s.first===e&&s.second===i)return s.amount}}return 0}findChar(e,i){for(let t=0;t<e.length;t++)if(e[t].id===i)return t;return-1}}export{TextLayout};