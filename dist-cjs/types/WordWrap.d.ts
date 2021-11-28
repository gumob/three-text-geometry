export declare type ComputeMetrics = (text: string, start: number, end: number, width: number) => WordMetrics;
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
    start?: number | undefined;
    end?: number | undefined;
    width?: number | undefined;
    mode?: WordWrapMode | undefined;
    measure?: ComputeMetrics | undefined;
}
//# sourceMappingURL=WordWrap.d.ts.map