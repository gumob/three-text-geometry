"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.BMFontXMLParser=void 0;const fast_xml_parser_1=require("fast-xml-parser"),error_1=require("../error");class BMFontXMLParser{parse(e){try{var o={ignoreAttributes:!1,attributeNamePrefix:""};const c=new fast_xml_parser_1.XMLParser(o),d=c.parse(e).font;if(!d)throw new error_1.BMFontLoaderError(error_1.BMFontLoaderErrorType.ParseError,"No font data in BMFont file");if(!d.pages)throw new error_1.BMFontLoaderError(error_1.BMFontLoaderErrorType.ParseError,"No font data in BMFont file");if(!d.chars)throw new error_1.BMFontLoaderError(error_1.BMFontLoaderErrorType.ParseError,"No chars data in BMFont file");if(!d.info)throw new error_1.BMFontLoaderError(error_1.BMFontLoaderErrorType.ParseError,"No info data in BMFont file");if(!d.common)throw new error_1.BMFontLoaderError(error_1.BMFontLoaderErrorType.ParseError,"No common data in BMFont file");let r;r=Array.isArray(d.pages.page)?d.pages.page.map(r=>r.file):[d.pages.page.file];var n=d.chars.char.map(r=>r),a={face:d.info.face,size:+d.info.size||0,bold:+d.info.bold||0,italic:+d.info.italic||0,charset:d.info.charset.split(",").filter(r=>""!=r),unicode:+d.info.unicode||0,stretchH:+d.info.stretchH||0,smooth:+d.info.smooth||0,aa:+d.info.aa||0,padding:d.info.padding.split(",").map(r=>+r),spacing:d.info.spacing.split(",").map(r=>+r),fixedHeight:+d.info.fixedHeight||0,outline:+d.info.outline||0},t={lineHeight:+d.common.lineHeight||0,base:+d.common.base||0,scaleW:+d.common.scaleW||0,scaleH:+d.common.scaleH||0,pages:+d.common.pages||0,packed:+d.common.packed||0,alphaChnl:+d.common.alphaChnl||0,redChnl:+d.common.redChnl||0,greenChnl:+d.common.greenChnl||0,blueChnl:+d.common.blueChn||0},i=d.kernings.kerning.map(r=>({first:+r.first||0,second:+r.second||0,amount:+r.amount||0})),s={fieldType:d.distanceField.fieldType,distanceRange:+d.distanceField.distanceRange||0};return{pages:r,chars:n,info:a,common:t,kernings:i,distanceField:s}}catch(r){throw new error_1.BMFontLoaderError(error_1.BMFontLoaderErrorType.ParseError,r.message)}}}exports.BMFontXMLParser=BMFontXMLParser;