Object.defineProperty(exports,"__esModule",{value:!0}),exports.BMFontJsonParser=void 0;let tslib_1=require("tslib"),ajv_1=tslib_1.__importDefault(require("ajv")),error_1=require("../error"),BMFontJsonSchema_json_1=tslib_1.__importDefault(require("./BMFontJsonSchema.json"));class BMFontJsonParser{parse(r){try{if("string"==typeof r&&(r=JSON.parse(r)),(new ajv_1.default).compile(BMFontJsonSchema_json_1.default)(r))return r;throw new error_1.BMFontError("Invalid json data")}catch(r){throw new error_1.BMFontError(r.message)}}}exports.BMFontJsonParser=BMFontJsonParser;