export type ComputeMetrics = (text: string, start: number, end: number, width: number) => WordMetrics;
export interface WordMetrics {
    start: number;
    end: number;
    width: number;
}
export declare enum WordWrapMode {
    Pre = "pre",
    NoWrap = "nowrap"
}
export interface WordWrapOption {
    start?: number;
    end?: number;
    width?: number;
    mode?: WordWrapMode;
    measure?: ComputeMetrics;
}
//# sourceMappingURL=WordWrap.d.ts.map