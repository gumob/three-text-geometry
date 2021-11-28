import { BMFontLoaderError, BMFontLoaderErrorType } from '~/error'
import {
  BMFont,
  BMFontChar,
  BMFontCommon,
  BMFontDistanceField,
  BMFontInfo,
  BMFontKern,
  DefaultBMFont,
  DefaultBMFontCommon,
  DefaultBMFontInfo,
  IBMFontParser,
} from '~/types'

/**
 * The class for parsing font data in ASCII format.
 *
 * @class BMFontAsciiParser
 */
class BMFontAsciiParser implements IBMFontParser<string> {
  /**
   * The function that parses font data from an ASCII string.
   *
   * ```typescript
   * import { BMFontAsciiParser } from 'three-text-geometry'
   *
   * const data: string = ...ascii data...
   * const parser = new BMFontAsciiParser();
   * const font: BMFont = parser.parse(data)
   * ```
   *
   * @param {string} data  `string` that contains font data.
   * @returns {BMFont} Parsed data that conforms to the `BMFont` interface.
   * @memberof BMFontAsciiParser
   */
  parse(data: string): BMFont {
    data = data.trim()

    const lines: string[] = data.split(/\r\n?|\n/g)
    if (lines.length === 0)
      throw new BMFontLoaderError(BMFontLoaderErrorType.ParseError, 'No data in BMFont file')

    const result: BMFont = DefaultBMFont()

    lines.forEach((line: string, idx: number) => {
      line = line.replace(/[\s\t]+/g, ' ').trim()
      if (!line) return

      const space = line.indexOf(' ')
      if (space === -1) throw new BMFontLoaderError(BMFontLoaderErrorType.ParseError, 'No page data')

      const rootKey = line.substring(0, space)
      const keyValues: any = {}
      line
        .substring(space + 1)
        .replace(/[\s\t]+/g, ' ')
        .split(' ')
        .forEach((str: string) => {
          const arr = str.split('=')
          const key: string = arr[0] as string
          const value: string = arr[1] as string
          if (/^-?\d+\.?\d*$/.test(value)) keyValues[key] = +value
          else if (/^[\d,]+/.test(value)) keyValues[key] = value.split(',').map((value) => +value)
          else if (/^("|').*("|')$/.test(value)) keyValues[key] = value.replace(/^("|')(.*)("|')$/g, '$2')
          else keyValues[key] = value
        })
      switch (rootKey) {
        case 'info':
          result.info = keyValues as BMFontInfo
          break
        case 'common':
          result.common = keyValues as BMFontCommon
          break
        case 'distanceField':
          result.distanceField = keyValues as BMFontDistanceField
          break
        case 'page':
          result.pages.push(keyValues.file)
          break
        case 'chars':
          break
        case 'char':
          result.chars.push(keyValues as BMFontChar)
          break
        case 'kernings':
          break
        case 'kerning':
          result.kernings.push(keyValues as BMFontKern)
          break
        default:
          break
      }
    })
    if (JSON.stringify(result.info) === JSON.stringify(DefaultBMFontInfo()))
      throw new BMFontLoaderError(
        BMFontLoaderErrorType.ParseError,
        `No info data. \n${JSON.stringify(result)}`
      )
    if (JSON.stringify(result.common) === JSON.stringify(DefaultBMFontCommon()))
      throw new BMFontLoaderError(
        BMFontLoaderErrorType.ParseError,
        `No common data. \n${JSON.stringify(result)}`
      )
    if (result.pages.length == 0)
      throw new BMFontLoaderError(
        BMFontLoaderErrorType.ParseError,
        `No page data. \n${JSON.stringify(result)}`
      )
    if (result.chars.length == 0)
      throw new BMFontLoaderError(
        BMFontLoaderErrorType.ParseError,
        `No char data. \n${JSON.stringify(result)}`
      )
    // if (result.kernings.length == 0)
    //     throw new BMFontLoaderError(BMFontLoaderErrorType.ParseError, `No kernings data. \n${JSON.stringify(result)}`);
    // console.log(result);
    return result
  }
}

export { BMFontAsciiParser }
