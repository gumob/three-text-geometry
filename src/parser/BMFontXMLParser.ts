import { XMLParser } from 'fast-xml-parser'
import { BMFontError, BMFontErrorType } from '~/error'
import { BMFont, BMFontChar, BMFontCommon, BMFontInfo, BMFontKern, IBMFontParser } from '~/types'

/**
 * The class for parsing font data in XML format.
 *
 * @class BMFontXMLParser
 */
class BMFontXMLParser implements IBMFontParser<string> {
  /**
   * The function that parses font data from a XML string.
   *
   * ```typescript
   * import { BMFontXMLParser } from 'three-text-geometry'
   *
   * const data: string = ...xml data...
   * const parser = new BMFontXMLParser();
   * const font: BMFont = parser.parse(data)
   * ```
   *
   * @param {string} xml  `string` that contains font data.
   * @returns {BMFont} Parsed data that conforms to the `BMFont` interface.
   * @memberof BMFontXMLParser
   */
  public parse(xml: string): BMFont {
    try {
      const options = {
        ignoreAttributes: false,
        attributeNamePrefix: '',
      }
      const parser = new XMLParser(options)
      const json: any = parser.parse(xml)
      const font = json.font
      if (!font) throw new BMFontError(BMFontErrorType.ParseError, 'No font data in BMFont file')
      if (!font.pages) throw new BMFontError(BMFontErrorType.ParseError, 'No font data in BMFont file')
      if (!font.chars) throw new BMFontError(BMFontErrorType.ParseError, 'No chars data in BMFont file')
      if (!font.info) throw new BMFontError(BMFontErrorType.ParseError, 'No info data in BMFont file')
      if (!font.common) throw new BMFontError(BMFontErrorType.ParseError, 'No common data in BMFont file')
      // console.log('font.pages.page', font.pages.page);
      let pages: string[]
      if (Array.isArray(font.pages.page)) {
        pages = font.pages.page.map((element: any) => element.file)
      } else {
        pages = [font.pages.page.file]
      }
      // console.log('pages', pages);
      const chars: BMFontChar[] = font.chars.char.map((element: object) => element)
      // console.log('chars', chars);
      const info: BMFontInfo = {
        face: font.info.face,
        size: +font.info.size || 0,
        bold: +font.info.bold || 0,
        italic: +font.info.italic || 0,
        charset: font.info.charset.split(',').filter((element: any) => element != ''),
        unicode: +font.info.unicode || 0,
        stretchH: +font.info.stretchH || 0,
        smooth: +font.info.smooth || 0,
        aa: +font.info.aa || 0,
        padding: font.info.padding.split(',').map((element: any) => +element),
        spacing: font.info.spacing.split(',').map((element: any) => +element),
        fixedHeight: +font.info.fixedHeight || 0,
        outline: +font.info.outline || 0,
      }
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
        blueChnl: +font.common.blueChn || 0,
      }
      // console.log('common', common);
      const kernings: BMFontKern[] = font.kernings.kerning.map(
        (element: any) =>
          ({
            first: +element.first || 0,
            second: +element.second || 0,
            amount: +element.amount || 0,
          } as BMFontKern)
      )
      // console.log('kernings', kernings);
      const distanceField = {
        fieldType: font.distanceField.fieldType,
        distanceRange: +font.distanceField.distanceRange || 0,
      }
      // console.log('distanceField', distanceField);
      const bmFont: BMFont = {
        pages: pages,
        chars: chars,
        info: info,
        common: common,
        kernings: kernings,
        distanceField: distanceField,
      }
      return bmFont
    } catch (error: any) {
      // console.error(error);
      throw new BMFontError(BMFontErrorType.ParseError, error.message)
    }
  }
}

export { BMFontXMLParser }
