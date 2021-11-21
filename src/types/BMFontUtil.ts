function isBMFont(value: any) {
    return 'chars' in value && 'info' in value && 'common' in value && 'kernings' in value
}

function DefaultBMFont() {
    return {
        pages: [],
        chars: [],
        info: DefaultBMFontInfo(),
        common: DefaultBMFontCommon(),
        distanceField: DefaultBMFontDistanceField(),
        kernings: [],
    }
}

function DefaultBMFontInfo() {
    return {
        face: '',
        size: 0,
        bold: 0,
        italic: 0,
        charset: [],
        unicode: 0,
        stretchH: 0,
        smooth: 0,
        aa: 0,
        padding: [],
        spacing: [],
        fixedHeight: 0,
        outline: 0,
    }
}
function DefaultBMFontCommon() {
    return {
        lineHeight: 0,
        base: 0,
        scaleW: 0,
        scaleH: 0,
        pages: 0,
        packed: 0,
        alphaChnl: 0,
        redChnl: 0,
        greenChnl: 0,
        blueChnl: 0,
    }
}

function DefaultBMFontKern() {
    return {
        first: 0,
        second: 0,
        amount: 0,
    }
}

function DefaultBMFontDistanceField() {
    return {
        fieldType: '',
        distanceRange: 0,
    }
}

export {
    DefaultBMFont,
    DefaultBMFontCommon,
    DefaultBMFontDistanceField,
    DefaultBMFontInfo,
    DefaultBMFontKern,
    isBMFont,
}
