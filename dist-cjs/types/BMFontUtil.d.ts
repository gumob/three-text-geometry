declare function isBMFont(value: any): boolean;
declare function DefaultBMFont(): {
    pages: never[];
    chars: never[];
    info: {
        face: string;
        size: number;
        bold: number;
        italic: number;
        charset: never[];
        unicode: number;
        stretchH: number;
        smooth: number;
        aa: number;
        padding: never[];
        spacing: never[];
        fixedHeight: number;
        outline: number;
    };
    common: {
        lineHeight: number;
        base: number;
        scaleW: number;
        scaleH: number;
        pages: number;
        packed: number;
        alphaChnl: number;
        redChnl: number;
        greenChnl: number;
        blueChnl: number;
    };
    distanceField: {
        fieldType: string;
        distanceRange: number;
    };
    kernings: never[];
};
declare function DefaultBMFontInfo(): {
    face: string;
    size: number;
    bold: number;
    italic: number;
    charset: never[];
    unicode: number;
    stretchH: number;
    smooth: number;
    aa: number;
    padding: never[];
    spacing: never[];
    fixedHeight: number;
    outline: number;
};
declare function DefaultBMFontCommon(): {
    lineHeight: number;
    base: number;
    scaleW: number;
    scaleH: number;
    pages: number;
    packed: number;
    alphaChnl: number;
    redChnl: number;
    greenChnl: number;
    blueChnl: number;
};
declare function DefaultBMFontKern(): {
    first: number;
    second: number;
    amount: number;
};
declare function DefaultBMFontDistanceField(): {
    fieldType: string;
    distanceRange: number;
};
export { DefaultBMFont, DefaultBMFontCommon, DefaultBMFontDistanceField, DefaultBMFontInfo, DefaultBMFontKern, isBMFont, };
//# sourceMappingURL=BMFontUtil.d.ts.map