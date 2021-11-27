"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiPageShaderMaterialParameters = exports.WordWrapMode = exports.TextAlign = exports.BMFontLoader = void 0;
const tslib_1 = require("tslib");
const loader_1 = require("./loader");
Object.defineProperty(exports, "BMFontLoader", { enumerable: true, get: function () { return loader_1.BMFontLoader; } });
const shader_1 = require("./shader");
Object.defineProperty(exports, "MultiPageShaderMaterialParameters", { enumerable: true, get: function () { return shader_1.MultiPageShaderMaterialParameters; } });
const TextGeometry_1 = (0, tslib_1.__importDefault)(require("./TextGeometry"));
const types_1 = require("./types");
Object.defineProperty(exports, "TextAlign", { enumerable: true, get: function () { return types_1.TextAlign; } });
Object.defineProperty(exports, "WordWrapMode", { enumerable: true, get: function () { return types_1.WordWrapMode; } });
exports.default = TextGeometry_1.default;
//# sourceMappingURL=index.js.map