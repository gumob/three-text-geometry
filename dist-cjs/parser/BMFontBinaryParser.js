Object.defineProperty(exports,"__esModule",{value:!0}),exports.BMFontBinaryParser=void 0;let error_1=require("../error"),types_1=require("../types");class BMFontBinaryParser{parse(t){if(t.length<6)throw new error_1.BMFontError("Invalid buffer length");if(!BMFontBinaryParser.HEADER.every((e,r)=>t.readUInt8(r)===e))throw new error_1.BMFontError("Missing BMF byte header");let r=3;if(3<t.readUInt8(r++))throw new error_1.BMFontError("Only supports bitmap font binary v3");var a=(0,types_1.DefaultBMFont)();try{for(let e=0;e<5;e++)r+=this.readBlock(a,t,r)}catch(e){throw new error_1.BMFontError(e.message)}return a}readBlock(e,r,t){if(t>r.length-1)return 0;var a=r.readUInt8(t++),n=r.readInt32LE(t);switch(t+=4,a){case 1:e.info=this.readInfo(r,t);break;case 2:e.common=this.readCommon(r,t);break;case 3:e.pages=this.readPages(r,t,n);break;case 4:e.chars=this.readChars(r,t,n);break;case 5:e.kernings=this.readKernings(r,t,n)}return 5+n}readInfo(e,r){var t=(0,types_1.DefaultBMFontInfo)(),a=(t.size=e.readInt16LE(r),e.readUInt8(r+2));return t.smooth=a>>7&1,t.unicode=a>>6&1,t.italic=a>>5&1,t.bold=a>>4&1,a>>3&1&&(t.fixedHeight=1),t.stretchH=e.readUInt16LE(r+4),t.aa=e.readUInt8(r+6),t.padding=[e.readInt8(r+7),e.readInt8(r+8),e.readInt8(r+9),e.readInt8(r+10)],t.spacing=[e.readInt8(r+11),e.readInt8(r+12)],t.outline=e.readUInt8(r+13),t.face=this.readStringNT(e,r+14),t}readCommon(e,r){var t=(0,types_1.DefaultBMFontCommon)();return t.lineHeight=e.readUInt16LE(r),t.base=e.readUInt16LE(r+2),t.scaleW=e.readUInt16LE(r+4),t.scaleH=e.readUInt16LE(r+6),t.pages=e.readUInt16LE(r+8),t.packed=0,t.alphaChnl=e.readUInt8(r+11),t.redChnl=e.readUInt8(r+12),t.greenChnl=e.readUInt8(r+13),t.blueChnl=e.readUInt8(r+14),t}readPages(r,t,e){var a=[],n=this.readNameNT(r,t),d=n.length+1,o=e/d;for(let e=0;e<o;e++)a[e]=r.slice(t,t+n.length).toString("utf8"),t+=d;return a}readChars(r,t,e){var a=[],n=e/20;for(let e=0;e<n;e++){var d={id:0,index:0,char:"",width:0,height:0,xoffset:0,yoffset:0,xadvance:0,chnl:0,x:0,y:0,page:0},o=20*e;d.id=r.readUInt32LE(t+0+o),d.x=r.readUInt16LE(t+4+o),d.y=r.readUInt16LE(t+6+o),d.width=r.readUInt16LE(t+8+o),d.height=r.readUInt16LE(t+10+o),d.xoffset=r.readInt16LE(t+12+o),d.yoffset=r.readInt16LE(t+14+o),d.xadvance=r.readInt16LE(t+16+o),d.page=r.readUInt8(t+18+o),d.chnl=r.readUInt8(t+19+o),a[e]=d}return a}readKernings(r,t,e){var a=[],n=e/10;for(let e=0;e<n;e++){var d=(0,types_1.DefaultBMFontKern)(),o=10*e;d.first=r.readUInt32LE(t+0+o),d.second=r.readUInt32LE(t+4+o),d.amount=r.readInt16LE(t+8+o),a[e]=d}return a}readStringNT(e,r){return this.readNameNT(e,r).toString("utf8")}readNameNT(e,r){let t=r;for(;t<e.length&&0!==e[t];t++);return e.slice(r,t)}}(exports.BMFontBinaryParser=BMFontBinaryParser).HEADER=[66,77,70];