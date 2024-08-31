"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordWrapMode = exports.TextAlign = exports.MultiPageShaderMaterialParameters = exports.MultiPageShaderMaterial = exports.BMFontXMLParser = exports.BMFontJsonParser = exports.BMFontError = exports.BMFontBinaryParser = exports.BMFontAsciiParser = void 0;
const tslib_1 = require("tslib");
const error_1 = require("~/error");
Object.defineProperty(exports, "BMFontError", { enumerable: true, get: function () { return error_1.BMFontError; } });
const parser_1 = require("~/parser");
Object.defineProperty(exports, "BMFontAsciiParser", { enumerable: true, get: function () { return parser_1.BMFontAsciiParser; } });
Object.defineProperty(exports, "BMFontBinaryParser", { enumerable: true, get: function () { return parser_1.BMFontBinaryParser; } });
Object.defineProperty(exports, "BMFontJsonParser", { enumerable: true, get: function () { return parser_1.BMFontJsonParser; } });
Object.defineProperty(exports, "BMFontXMLParser", { enumerable: true, get: function () { return parser_1.BMFontXMLParser; } });
const shader_1 = require("~/shader");
Object.defineProperty(exports, "MultiPageShaderMaterial", { enumerable: true, get: function () { return shader_1.MultiPageShaderMaterial; } });
Object.defineProperty(exports, "MultiPageShaderMaterialParameters", { enumerable: true, get: function () { return shader_1.MultiPageShaderMaterialParameters; } });
const TextGeometry_1 = tslib_1.__importDefault(require("~/TextGeometry"));
const types_1 = require("~/types");
Object.defineProperty(exports, "TextAlign", { enumerable: true, get: function () { return types_1.TextAlign; } });
Object.defineProperty(exports, "WordWrapMode", { enumerable: true, get: function () { return types_1.WordWrapMode; } });
exports.default = TextGeometry_1.default;
//# sourceMappingURL=index.js.map