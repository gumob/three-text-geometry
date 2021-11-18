import { XMLParser } from 'fast-xml-parser';
import { BMFont, BMFontChar, BMFontCommon, BMFontInfo, BMFontKern } from '~/types';

/**
 * # How to create a json schema
 * npm install -g quicktype
 * quicktype ./src/types/BMFont.ts -o ./src/parser/BMFontJsonSchema.json --lang schema
 */

class BMFontXMLParser {
    public parse(xml: string): BMFont | null {
        try {
            const options = {
                ignoreAttributes: false,
                attributeNamePrefix: ''
            };
            const parser = new XMLParser(options);
            const json: any = parser.parse(xml);
            const font = json.font;
            if (!font) return null;
            // console.log('font.pages.page', font.pages.page);
            let pages: string[];
            if (Array.isArray(font.pages.page)) {
                pages = font.pages.page.map((element: any) => (element.file));
            } else {
                pages = [font.pages.page.file];
            }
            // console.log('pages', pages);
            const chars: BMFontChar[] = font.chars.char.map((element: object) => (element));
            // console.log('chars', chars);
            const info: BMFontInfo = {
                face: font.info.face,
                size: +font.info.size || 0,
                bold: +font.info.bold || 0,
                italic: +font.info.italic || 0,
                charset: font.info.charset.split(',').filter((element: any) => (element != '')),
                unicode: +font.info.unicode || 0,
                stretchH: +font.info.stretchH || 0,
                smooth: +font.info.smooth || 0,
                aa: +font.info.aa || 0,
                padding: font.info.padding.split(',').map((element: any) => (+element)),
                spacing: font.info.spacing.split(',').map((element: any) => (+element)),
                fixedHeight: +font.info.fixedHeight || 0,
                outline: +font.info.outline || 0,
            };
            // console.log('info', info);
            const common: BMFontCommon = {
                lineHeight: +font.common.lineHeight || 0,
                base: +font.common.base || 0,
                scaleW: +font.common.scaleW || 0,
                scaleH: +font.common.scaleH || 0,
                pages: +font.common.pages || 0,
                packed: +font.common.packed || 0,
                alphaChnl: +font.common.alphaChnl || 0,
                redChnl: +font.common.redChnl || 0,
                greenChnl: +font.common.greenChnl || 0,
                blueChnl: +font.common.blueChn || 0
            }
            // console.log('common', common);
            const kernings: BMFontKern[] = font.kernings.kerning
                .map((element: any) => ({
                    first: +element.first || 0,
                    second: +element.second || 0,
                    amount: +element.amount || 0
                } as BMFontKern));
            // console.log('kernings', kernings);
            const distanceField = {
                fieldType: font.distanceField.fieldType,
                distanceRange: +font.distanceField.distanceRange || 0,
            };
            // console.log('distanceField', distanceField);
            const bmFont: BMFont = {
                pages: pages,
                chars: chars,
                info: info,
                common: common,
                kernings: kernings,
                distanceField: distanceField,
            }
            return bmFont;
        } catch(error: any){
            console.error(error);
            return null;
        }
    }
}

export { BMFontXMLParser };
