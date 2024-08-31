import { BMFont } from '@three-text-geometry/types'

export interface IBMFontParser<T> {
  parse(data: T): BMFont
}
