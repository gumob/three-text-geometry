Object.defineProperty(exports,"__esModule",{value:!0}),exports.WordWrapMode=exports.TextAlign=exports.MultiPageShaderMaterialParameters=exports.MultiPageShaderMaterial=exports.BMFontXMLParser=exports.BMFontJsonParser=exports.BMFontError=exports.BMFontBinaryParser=exports.BMFontAsciiParser=void 0;let tslib_1=require("tslib"),error_1=require("./error"),parser_1=(Object.defineProperty(exports,"BMFontError",{enumerable:!0,get:function(){return error_1.BMFontError}}),require("./parser")),shader_1=(Object.defineProperty(exports,"BMFontAsciiParser",{enumerable:!0,get:function(){return parser_1.BMFontAsciiParser}}),Object.defineProperty(exports,"BMFontBinaryParser",{enumerable:!0,get:function(){return parser_1.BMFontBinaryParser}}),Object.defineProperty(exports,"BMFontJsonParser",{enumerable:!0,get:function(){return parser_1.BMFontJsonParser}}),Object.defineProperty(exports,"BMFontXMLParser",{enumerable:!0,get:function(){return parser_1.BMFontXMLParser}}),require("./shader")),TextGeometry_1=(Object.defineProperty(exports,"MultiPageShaderMaterial",{enumerable:!0,get:function(){return shader_1.MultiPageShaderMaterial}}),Object.defineProperty(exports,"MultiPageShaderMaterialParameters",{enumerable:!0,get:function(){return shader_1.MultiPageShaderMaterialParameters}}),tslib_1.__importDefault(require("./TextGeometry"))),types_1=require("./types");Object.defineProperty(exports,"TextAlign",{enumerable:!0,get:function(){return types_1.TextAlign}}),Object.defineProperty(exports,"WordWrapMode",{enumerable:!0,get:function(){return types_1.WordWrapMode}}),exports.default=TextGeometry_1.default;