"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const THREE = tslib_1.__importStar(require("three"));
const layout_1 = require("./layout");
const types_1 = require("./types");
const utils_1 = require("./utils");
class TextGeometry extends THREE.BufferGeometry {
    get option() {
        return { ...this._opt };
    }
    set option(value) {
        this._opt = { ...value };
        this.update(this._text, value);
    }
    get text() {
        return this._text;
    }
    set text(value) {
        this._text = value;
        this.update(value, this._opt);
    }
    get visibleGlyphs() {
        return this._visibleGlyphs;
    }
    constructor(text, option = {}) {
        super();
        this._opt = {
            font: undefined,
            start: undefined,
            end: undefined,
            width: undefined,
            mode: undefined,
            align: undefined,
            letterSpacing: undefined,
            lineHeight: undefined,
            tabSize: undefined,
            flipY: true,
            multipage: false,
        };
        this._text = '';
        this._visibleGlyphs = [];
        if (option.font === undefined) {
            console.error('[TextGeometry:constructor]', text === null || text === void 0 ? void 0 : text.substring(0, 30), option);
            throw new TypeError('Must specify a `font` in options');
        }
        this._text = text;
        this._opt.font = option.font;
        this._opt.start = option.start !== undefined ? Math.max(0, option.start) : 0;
        this._opt.end = option.end !== undefined ? option.end : this._text.length;
        this._opt.width = option.width !== undefined ? option.width : undefined;
        this._opt.align = option.align !== undefined ? option.align : types_1.TextAlign.Left;
        this._opt.mode = option.mode !== undefined ? option.mode : undefined;
        this._opt.letterSpacing = option.letterSpacing !== undefined ? option.letterSpacing : 0;
        this._opt.lineHeight = option.lineHeight !== undefined ? option.lineHeight : this._opt.font.common.lineHeight;
        this._opt.tabSize = option.tabSize !== undefined ? option.tabSize : 4;
        this._opt.flipY = option.flipY !== undefined ? option.flipY : true;
        this._opt.multipage = option.multipage !== undefined ? option.multipage : false;
        this.update(this._text, this._opt);
    }
    copy(source) {
        super.copy(source);
        this.text = Object.assign({}, source.text);
        this.option = Object.assign({}, source.option);
        return this;
    }
    update(text, option) {
        if (text !== undefined)
            this._text = text;
        if (option !== undefined) {
            if (option.font !== undefined)
                this._opt.font = option.font;
            this._opt.start = option.start !== undefined ? Math.max(0, option.start) : 0;
            this._opt.end = option.end !== undefined ? option.end : this._text.length;
            this._opt.width = option.width !== undefined ? option.width : undefined;
            this._opt.align = option.align !== undefined ? option.align : this._opt.align;
            this._opt.mode = option.mode !== undefined ? option.mode : this._opt.mode;
            this._opt.letterSpacing = option.letterSpacing !== undefined ? option.letterSpacing : this._opt.letterSpacing;
            this._opt.lineHeight = option.lineHeight !== undefined ? option.lineHeight : this._opt.lineHeight;
            this._opt.tabSize = option.tabSize !== undefined ? option.tabSize : this._opt.tabSize;
            this._opt.flipY = option.flipY !== undefined ? option.flipY : this._opt.flipY;
            this._opt.multipage = option.multipage !== undefined ? option.multipage : this._opt.multipage;
        }
        if (this._opt.font === undefined) {
            console.error('[TextGeometry:update]', text === null || text === void 0 ? void 0 : text.substring(0, 30), option);
            throw new TypeError('Must specify a `font` in options');
        }
        const texWidth = this._opt.font.common.scaleW;
        const texHeight = this._opt.font.common.scaleH;
        const layout = new layout_1.TextLayout(this._text, this._opt);
        const glyphs = layout.glyphs.filter((glyph) => {
            const bitmap = glyph.data;
            return bitmap.width * bitmap.height > 0;
        });
        this._visibleGlyphs = glyphs;
        const positions = (0, utils_1.extractPositions)(glyphs);
        const uvs = (0, utils_1.extractUVs)(glyphs, texWidth, texHeight, this._opt.flipY);
        const indices = (0, utils_1.createIndices)([], {
            clockwise: true,
            type: 'uint16',
            count: glyphs.length,
        });
        this.setIndex(indices);
        this.setAttribute('position', new THREE.BufferAttribute(positions, 2));
        this.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
        if (!this._opt.multipage && 'page' in this.attributes) {
            this.deleteAttribute('page');
        }
        else if (this._opt.multipage) {
            this.setAttribute('page', new THREE.BufferAttribute((0, utils_1.extractPages)(glyphs), 1));
        }
    }
    computeBoundingSphere() {
        if (this.boundingSphere === null)
            this.boundingSphere = new THREE.Sphere();
        if (!this.attributes.position)
            return;
        this.attributes.position.needsUpdate = true;
        const positions = this.attributes.position.array;
        const itemSize = this.attributes.position.itemSize;
        if (!positions || !itemSize || positions.length < 2) {
            this.boundingSphere.radius = 0;
            this.boundingSphere.center.set(0, 0, 0);
            return;
        }
        (0, utils_1.computeSphere)(positions, this.boundingSphere);
        if (isNaN(this.boundingSphere.radius)) {
            console.error('THREE.BufferGeometry.computeBoundingSphere(): ' + 'Computed radius is NaN. The ' + '"position" attribute is likely to have NaN values.');
        }
    }
    computeBoundingBox() {
        if (this.boundingBox === null)
            this.boundingBox = new THREE.Box3();
        const bbox = this.boundingBox;
        if (!this.attributes.position)
            return;
        this.attributes.position.needsUpdate = true;
        const positions = this.attributes.position.array;
        const itemSize = this.attributes.position.itemSize;
        if (!positions || !itemSize || positions.length < 2) {
            bbox.makeEmpty();
            return;
        }
        (0, utils_1.computeBox)(positions, bbox);
    }
}
exports.default = TextGeometry;
//# sourceMappingURL=TextGeometry.js.map