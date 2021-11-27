export type ComputeMetrics = (text: string, start: number, end: number, width: number) => WordMetrics

export interface WordMetrics {
  start: number
  end: number
  width: number
}
/**
 * The enums to specify word wrapping.
 *
 * @enum {number}
 */
export enum WordWrapMode {
  /** Wrap text to pre. */
  Pre = 'pre',
  /** No wrapping. */
  NoWrap = 'nowrap',
}

export interface WordWrapOption {
  start?: number | undefined

  end?: number | undefined
  width?: number | undefined
  mode?: WordWrapMode | undefined
  measure?: ComputeMetrics | undefined
}
