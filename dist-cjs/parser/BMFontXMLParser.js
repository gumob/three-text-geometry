"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BMFontXMLParser = void 0;
const fast_xml_parser_1 = require("fast-xml-parser");
const error_1 = require("~/error");
class BMFontXMLParser {
    parse(xml) {
        try {
            const options = {
                ignoreAttributes: false,
                attributeNamePrefix: '',
            };
            const parser = new fast_xml_parser_1.XMLParser(options);
            const json = parser.parse(xml);
            const font = json.font;
            if (!font)
                throw new error_1.BMFontError('No font data in BMFont file');
            if (!font.pages)
                throw new error_1.BMFontError('No font data in BMFont file');
            if (!font.chars)
                throw new error_1.BMFontError('No chars data in BMFont file');
            if (!font.info)
                throw new error_1.BMFontError('No info data in BMFont file');
            if (!font.common)
                throw new error_1.BMFontError('No common data in BMFont file');
            let pages;
            if (Array.isArray(font.pages.page)) {
                pages = font.pages.page.map((element) => element.file);
            }
            else {
                pages = [font.pages.page.file];
            }
            const chars = font.chars.char.map((element) => element);
            const info = {
                face: font.info.face,
                size: +font.info.size || 0,
                bold: +font.info.bold || 0,
                italic: +font.info.italic || 0,
                charset: font.info.charset.split(',').filter((element) => element != ''),
                unicode: +font.info.unicode || 0,
                stretchH: +font.info.stretchH || 0,
                smooth: +font.info.smooth || 0,
                aa: +font.info.aa || 0,
                padding: font.info.padding.split(',').map((element) => +element),
                spacing: font.info.spacing.split(',').map((element) => +element),
                fixedHeight: +font.info.fixedHeight || 0,
                outline: +font.info.outline || 0,
            };
            const common = {
                lineHeight: +font.common.lineHeight || 0,
                base: +font.common.base || 0,
                scaleW: +font.common.scaleW || 0,
                scaleH: +font.common.scaleH || 0,
                pages: +font.common.pages || 0,
                packed: +font.common.packed || 0,
                alphaChnl: +font.common.alphaChnl || 0,
                redChnl: +font.common.redChnl || 0,
                greenChnl: +font.common.greenChnl || 0,
                blueChnl: +font.common.blueChn || 0,
            };
            const kernings = font.kernings.kerning.map((element) => ({
                first: +element.first || 0,
                second: +element.second || 0,
                amount: +element.amount || 0,
            }));
            const distanceField = {
                fieldType: font.distanceField.fieldType,
                distanceRange: +font.distanceField.distanceRange || 0,
            };
            const bmFont = {
                pages: pages,
                chars: chars,
                info: info,
                common: common,
                kernings: kernings,
                distanceField: distanceField,
            };
            return bmFont;
        }
        catch (error) {
            throw new error_1.BMFontError(error.message);
        }
    }
}
exports.BMFontXMLParser = BMFontXMLParser;
//# sourceMappingURL=BMFontXMLParser.js.map