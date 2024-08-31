import { BMFont } from '~/types'

export interface IBMFontParser<T> {
  parse(data: T): BMFont
}
