import { BMFont } from './'

export interface IBMFontParser<T> {
  parse(data: T): BMFont
}
