Object.defineProperty(exports,"__esModule",{value:!0});let tslib_1=require("tslib"),THREE=tslib_1.__importStar(require("three")),layout_1=require("./layout"),types_1=require("./types"),utils_1=require("./utils");class TextGeometry extends THREE.BufferGeometry{get option(){return{...this._opt}}set option(t){this._opt={...t},this.update(this._text,t)}get text(){return this._text}set text(t){this._text=t,this.update(t,this._opt)}get visibleGlyphs(){return this._visibleGlyphs}constructor(t,i={}){super(),this._opt={font:void 0,start:void 0,end:void 0,width:void 0,mode:void 0,align:void 0,letterSpacing:void 0,lineHeight:void 0,tabSize:void 0,flipY:!0,multipage:!1},this._text="",this._visibleGlyphs=[],console.log("[TextGeometry: constructor]",null==t?void 0:t.substring(0,30),i),void 0===i.font?console.debug("Must specify a `font` in options"):(this._text=t,this._opt.font=i.font,this._opt.start=void 0!==i.start?Math.max(0,i.start):0,this._opt.end=void 0!==i.end?i.end:this._text.length,this._opt.width=void 0!==i.width?i.width:void 0,this._opt.align=void 0!==i.align?i.align:types_1.TextAlign.Left,this._opt.mode=void 0!==i.mode?i.mode:void 0,this._opt.letterSpacing=void 0!==i.letterSpacing?i.letterSpacing:0,this._opt.lineHeight=(void 0!==i.lineHeight?i:this._opt.font.common).lineHeight,this._opt.tabSize=void 0!==i.tabSize?i.tabSize:4,this._opt.flipY=void 0===i.flipY||i.flipY,this._opt.multipage=void 0!==i.multipage&&i.multipage,this.update(this._text,this._opt))}copy(t){return super.copy(t),this.text=Object.assign({},t.text),this.option=Object.assign({},t.option),this}update(t,i){var e,o;void 0!==t&&(this._text=t),void 0!==i&&(void 0!==i.font&&(this._opt.font=i.font),this._opt.start=void 0!==i.start?Math.max(0,i.start):0,this._opt.end=void 0!==i.end?i.end:this._text.length,this._opt.width=void 0!==i.width?i.width:void 0,this._opt.align=(void 0!==i.align?i:this._opt).align,this._opt.mode=(void 0!==i.mode?i:this._opt).mode,this._opt.letterSpacing=(void 0!==i.letterSpacing?i:this._opt).letterSpacing,this._opt.lineHeight=(void 0!==i.lineHeight?i:this._opt).lineHeight,this._opt.tabSize=(void 0!==i.tabSize?i:this._opt).tabSize,this._opt.flipY=(void 0!==i.flipY?i:this._opt).flipY,this._opt.multipage=(void 0!==i.multipage?i:this._opt).multipage),void 0===this._opt.font?console.debug("Must specify a `font` in options"):(t=this._opt.font.common.scaleW,i=this._opt.font.common.scaleH,e=new layout_1.TextLayout(this._text,this._opt).glyphs.filter(t=>{t=t.data;return 0<t.width*t.height}),this._visibleGlyphs=e,o=(0,utils_1.extractPositions)(e),t=(0,utils_1.extractUVs)(e,t,i,this._opt.flipY),i=(0,utils_1.createIndices)([],{clockwise:!0,type:"uint16",count:e.length}),this.setIndex(i),this.setAttribute("position",new THREE.BufferAttribute(o,2)),this.setAttribute("uv",new THREE.BufferAttribute(t,2)),!this._opt.multipage&&"page"in this.attributes?this.deleteAttribute("page"):this._opt.multipage&&this.setAttribute("page",new THREE.BufferAttribute((0,utils_1.extractPages)(e),1)))}computeBoundingSphere(){var t,i;null===this.boundingSphere&&(this.boundingSphere=new THREE.Sphere),this.attributes.position&&(this.attributes.position.needsUpdate=!0,t=this.attributes.position.array,i=this.attributes.position.itemSize,!t||!i||t.length<2?(this.boundingSphere.radius=0,this.boundingSphere.center.set(0,0,0)):((0,utils_1.computeSphere)(t,this.boundingSphere),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.')))}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new THREE.Box3);var t,i,e=this.boundingBox;this.attributes.position&&(this.attributes.position.needsUpdate=!0,t=this.attributes.position.array,i=this.attributes.position.itemSize,!t||!i||t.length<2?e.makeEmpty():(0,utils_1.computeBox)(t,e))}}exports.default=TextGeometry;