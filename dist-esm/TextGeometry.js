import*as THREE from"three";import{TextLayout}from"~/layout";import{TextAlign}from"~/types";import{computeBox,computeSphere,createIndices,extractPages,extractPositions,extractUVs}from"~/utils";class TextGeometry extends THREE.BufferGeometry{constructor(t,i={}){if(super(),this._opt={font:void 0,start:void 0,end:void 0,width:void 0,mode:void 0,align:void 0,letterSpacing:void 0,lineHeight:void 0,tabSize:void 0,flipY:!0,multipage:!1},this._visibleGlyphs=[],void 0===i.font)throw new TypeError("Must specify a `font` in options");this._opt.font=i.font,void 0!==i.start?this._opt.start=Math.max(0,i.start):this._opt.start=0,void 0!==i.end?this._opt.end=i.end:this._opt.end=t.length,void 0!==i.width&&(this._opt.width=i.width),void 0!==i.align?this._opt.align=i.align:this._opt.align=TextAlign.Left,void 0!==i.mode&&(this._opt.mode=i.mode),void 0!==i.letterSpacing?this._opt.letterSpacing=i.letterSpacing:this._opt.letterSpacing=0,void 0!==i.lineHeight?this._opt.lineHeight=i.lineHeight:this._opt.lineHeight=this._opt.font.common.lineHeight,void 0!==i.tabSize?this._opt.tabSize=i.tabSize:this._opt.tabSize=4,void 0!==i.flipY?this._opt.flipY=i.flipY:this._opt.flipY=!0,void 0!==i.multipage?this._opt.multipage=i.multipage:this._opt.multipage=!1,this.update(t,i)}get option(){return{...this._opt}}get visibleGlyphs(){return this._visibleGlyphs}update(t,i={}){void 0!==i.font&&(this._opt.font=i.font),void 0!==i.start?this._opt.start=Math.max(0,i.start):this._opt.start=0,void 0!==i.end?this._opt.end=i.end:this._opt.end=t.length,void 0!==i.width&&(this._opt.width=i.width),void 0!==i.align&&(this._opt.align=i.align),void 0!==i.mode&&(this._opt.mode=i.mode),void 0!==i.letterSpacing&&(this._opt.letterSpacing=i.letterSpacing),void 0!==i.lineHeight&&(this._opt.lineHeight=i.lineHeight),void 0!==i.tabSize&&(this._opt.tabSize=i.tabSize),void 0!==i.flipY&&(this._opt.flipY=i.flipY),void 0!==i.multipage&&(this._opt.multipage=i.multipage);var i=this._opt.font.common.scaleW,e=this._opt.font.common.scaleH;const o=new TextLayout(t,this._opt);var t=o.glyphs.filter(function(t){t=t.data;return 0<t.width*t.height}),s=(this._visibleGlyphs=t,extractPositions(t)),i=extractUVs(t,i,e,this._opt.flipY),e=createIndices([],{clockwise:!0,type:"uint16",count:t.length});this.setIndex(e),this.setAttribute("position",new THREE.BufferAttribute(s,2)),this.setAttribute("uv",new THREE.BufferAttribute(i,2)),!this._opt.multipage&&"page"in this.attributes?this.deleteAttribute("page"):this._opt.multipage&&this.setAttribute("page",new THREE.BufferAttribute(extractPages(t),1))}computeBoundingSphere(){if(null===this.boundingSphere&&(this.boundingSphere=new THREE.Sphere),this.attributes.position){this.attributes.position.needsUpdate=!0;var t=this.attributes.position.array,i=this.attributes.position.itemSize;if(!t||!i||t.length<2)return this.boundingSphere.radius=0,void this.boundingSphere.center.set(0,0,0);computeSphere(t,this.boundingSphere),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.')}}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new THREE.Box3);const t=this.boundingBox;var i,e;this.attributes.position&&(this.attributes.position.needsUpdate=!0,i=this.attributes.position.array,e=this.attributes.position.itemSize,!i||!e||i.length<2?t.makeEmpty():computeBox(i,t))}}export default TextGeometry;