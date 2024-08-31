"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const THREE = tslib_1.__importStar(require("three"));
const layout_1 = require("~/layout");
const types_1 = require("~/types");
const utils_1 = require("~/utils");
class TextGeometry extends THREE.BufferGeometry {
    _opt = {
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
    _visibleGlyphs = [];
    get option() {
        return { ...this._opt };
    }
    get visibleGlyphs() {
        return this._visibleGlyphs;
    }
    constructor(text, option = {}) {
        super();
        if (option.font === undefined)
            throw new TypeError('Must specify a `font` in options');
        this._opt.font = option.font;
        if (option.start !== undefined)
            this._opt.start = Math.max(0, option.start);
        else
            this._opt.start = 0;
        if (option.end !== undefined)
            this._opt.end = option.end;
        else
            this._opt.end = text.length;
        if (option.width !== undefined)
            this._opt.width = option.width;
        if (option.align !== undefined)
            this._opt.align = option.align;
        else
            this._opt.align = types_1.TextAlign.Left;
        if (option.mode !== undefined)
            this._opt.mode = option.mode;
        if (option.letterSpacing !== undefined)
            this._opt.letterSpacing = option.letterSpacing;
        else
            this._opt.letterSpacing = 0;
        if (option.lineHeight !== undefined)
            this._opt.lineHeight = option.lineHeight;
        else
            this._opt.lineHeight = this._opt.font.common.lineHeight;
        if (option.tabSize !== undefined)
            this._opt.tabSize = option.tabSize;
        else
            this._opt.tabSize = 4;
        if (option.flipY !== undefined)
            this._opt.flipY = option.flipY;
        else
            this._opt.flipY = true;
        if (option.multipage !== undefined)
            this._opt.multipage = option.multipage;
        else
            this._opt.multipage = false;
        this.update(text, option);
    }
    update(text, option = {}) {
        if (option.font !== undefined)
            this._opt.font = option.font;
        if (option.start !== undefined)
            this._opt.start = Math.max(0, option.start);
        else
            this._opt.start = 0;
        if (option.end !== undefined)
            this._opt.end = option.end;
        else
            this._opt.end = text.length;
        if (option.width !== undefined)
            this._opt.width = option.width;
        if (option.align !== undefined)
            this._opt.align = option.align;
        if (option.mode !== undefined)
            this._opt.mode = option.mode;
        if (option.letterSpacing !== undefined)
            this._opt.letterSpacing = option.letterSpacing;
        if (option.lineHeight !== undefined)
            this._opt.lineHeight = option.lineHeight;
        if (option.tabSize !== undefined)
            this._opt.tabSize = option.tabSize;
        if (option.flipY !== undefined)
            this._opt.flipY = option.flipY;
        if (option.multipage !== undefined)
            this._opt.multipage = option.multipage;
        const texWidth = this._opt.font.common.scaleW;
        const texHeight = this._opt.font.common.scaleH;
        const layout = new layout_1.TextLayout(text, this._opt);
        const glyphs = layout.glyphs.filter(function (glyph) {
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
            console.error('THREE.BufferGeometry.computeBoundingSphere(): ' +
                'Computed radius is NaN. The ' +
                '"position" attribute is likely to have NaN values.');
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