[![npm version](https://badge.fury.io/js/three-text-geometry.svg)](https://badge.fury.io/js/three-text-geometry)
![Main Workflow](https://github.com/gumob/three-text-geometry/actions/workflows/main.yaml/badge.svg)
![Develop Workflow](https://github.com/gumob/three-text-geometry/actions/workflows/develop.yaml/badge.svg)
[![codecov](https://codecov.io/gh/gumob/three-text-geometry/branch/main/graph/badge.svg?token=CL35QZ32NY)](https://codecov.io/gh/gumob/three-text-geometry)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# three-text-geometry

<img src="https://raw.githubusercontent.com/gumob/three-text-geometry/main/README-assets/demo.gif" alt="demo.gif" style="width:1200px;"/>

The port of the JavaScript versions of [three-bmfont-text](https://github.com/Jam3/three-bmfont-text), [layout-bmfont-text](https://github.com/Jam3/layout-bmfont-text), [load-bmfont](https://github.com/Jam3/load-bmfont), and [word-wrapper](https://github.com/mattdesl/word-wrapper) to Pure Typescript, this library enables fast text rendering with Three.js and bitmap font.<br/>
The difference in rendering speed is noticeable when animations are enabled, and it runs 10x faster than canvas texture based text rendering.

## Requirements

- Three.js r134 or later

## Installation

### Yarn

```
$ yarn add three-text-geometry
```

### Node

```
$ node install three-text-geometry
```

## Usage

For detailed information, read the [documentation](https://gumob.github.io/three-text-geometry/) and check the [demo](https://github.com/gumob/three-text-geometry/tree/develop/demo).

### How to run the demo

The demo is written in TypeScript using React, so you need to check out the repository and build sources to run the demo app.
The source code for the demo is available [here](https://github.com/gumob/three-text-geometry/tree/develop/demo).

```
$ git clone https://github.com/gumob/three-text-geometry.git
$ cd three-text-geometry/demo
$ yarn install
$ yarn start
```

### Sample code

1. Combine [`Axios`](https://github.com/axios/axios) and [`THREE.TextureLoader`](https://threejs.org/docs/#api/en/loaders/TextureLoader) to load assets asynchronously.
2. Instantiate [`TextGeometry`](https://gumob.github.io/three-text-geometry/classes/TextGeometry.html) using the loaded [`BMFont`](https://gumob.github.io/three-text-geometry/interfaces/BMFont.html) and [`THREE.Texture`](https://threejs.org/docs/#api/en/textures/Texture) data.

[`TextGeometry`](https://gumob.github.io/three-text-geometry/classes/TextGeometry.html) supports word wrapping, text aligning, letter spacing, kerning. see [the list](#option-list) to see how each option works.

```TypeScript
import * as THREE from 'three'
import axios from 'axios'
import TextGeometry, { BMFont, BMFontJsonParser, TextGeometryOption, TextAlign } from 'three-text-geometry'

class TextGeometryRenderer extends React.Component {

    renderer?: THREE.WebGLRenderer
    scene?: THREE.Scene
    camera?: THREE.PerspectiveCamera

    componentDidMount() {
        const fontUri: string =
            'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/OdudoMono-Regular-64.json'
        const textureUri: string =
            'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/OdudoMono-Regular-64.png'
        Promise.all([
            axios.get(fontUri)then(res => new BMFontJsonParser().parse(res.data)), /** Load a font */
            new THREE.TextureLoader().loadAsync(textureUri) /** Load a texture */
        ]).then((values: [BMFont, THREE.Texture]) => {
            let font: BMFont
            let texture: THREE.Texture
            values.forEach((value: BMFont | THREE.Texture) => {
                if (value instanceof THREE.Texture) texture = value as THREE.Texture
                else font = value as BMFont
            })
            this.initScene(font, texture)
        })
    }

    initScene(font: BMFont, texture: THREE.Texture) {
        /** Renderer */
        this.renderer = new THREE.WebGLRenderer({ alpha: true })
        this.renderer.setClearColor(0x000000, 0)
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(window.innerWidth, window.innerHeight)

        const container = document.querySelector('#demo')
        container?.append(this.renderer.domElement)

        /** Scene */
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color(0x000000)

        /** Camera */
        const aspect = window.innerWidth / window.innerHeight
        this.camera = new THREE.PerspectiveCamera(45, aspect, 1, 100000)
        this.camera.position.set(1000, 1000, 2000)
        this.camera.lookAt(0, 0, 0)

        /** Geometry */
        const text: string = 'Hollo World.\nHello Universe.' /** The text to layout. Newline characters `\n` will cause line breaks */
        const textOption: TextGeometryOption = {
            font: font,
            align: TextAlign.Left,
            width: 1600,
            flipY: textures.flipY,
            multipage: false
        }
        const textGeometry = new TextGeometry(text, textOption)

        /** Material */
        const textMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true,
            color: 0x666666,
        })

        /** Mesh */
        const mesth = new THREE.Mesh(textGeometry, textMaterial)
            .rotateY(Math.PI)
            .rotateZ(Math.PI)
            .translateX(-box.x / 2)
            .translateY(-box.y / 2)
        this.scene!.add(mesth)

        this.updateScene()
    }

    updateScene() {
        this.renderer?.render(this.scene!, this.camera!)
        this.stats?.update()
        requestAnimationFrame(this.updateScene.bind(this))
    }

    render() {
        return <div id='demo'></div>
    }
}

```

#### Screen coordinate system and Three.js coordinate system

TextGeometry places text based on the screen coordinate system.
Therefore, when [`THREE.Mesh`](https://threejs.org/docs/#api/en/objects/Mesh) is added to the scene, the text will be placed inverted when viewed from the positive direction of the Z axis.
To make the text visible from the positive z-axis, you need apply transformation.

![coord-conversion.webp](https://raw.githubusercontent.com/gumob/three-text-geometry/main/README-assets/coord-conversion.webp)

#### BMFontParser interface supports JSON, XML, ACII, and Binary fromat

Parse font data in JSON format

```TypeScript
import { BMFontJsonParser } from 'three-text-geometry'
const font: BMFont = new BMFontJsonParser().parse(/** `string` or `object` data JSON format */)
```

Parse font data in XML format

```TypeScript
import { BMFontXMLParser } from 'three-text-geometry'
const font: BMFont = new BMFontXMLParser().parse(/** `string` data in XML format */)
```

Parse font data in ASCII format

```TypeScript
import { BMFontAsciiParser } from 'three-text-geometry'
const font: BMFont = new BMFontAsciiParser().parse(/** `string` data in ASCII format */)
```

Parse font data in Binary format

```TypeScript
import { BMFontBinaryParser } from 'three-text-geometry'
const font: BMFont = new BMFontBinaryParser().parse(/** `string` data in ASCII Binary */)
```

### <a name="option-list"></a>The value list of `TextGeometryOption`

<!-- prettier-ignore-start -->
| key | type | description | default | required |
| ----------------- | :-----------------------------------------------------------------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------: | :------: |
| **font** | [`BMFont`](https://gumob.github.io/three-text-geometry/interfaces/BMFont.html) | The BMFont definition which holds chars, kernings, etc | undefined | ✔ |
| **width** | `number` | The desired width of the text box, causes word-wrapping and clipping in [`WordWrapMode`](https://gumob.github.io/three-text-geometry/enums/WordWrapMode.html) mode. Leave as undefined to remove word-wrapping (default behaviour) | undefined |  |
| **mode** | [`WordWrapMode`](https://gumob.github.io/three-text-geometry/enums/WordWrapMode.html) | A mode for word-wrapper; can be [`WordWrapMode.Pre`](https://gumob.github.io/three-text-geometry/enums/WordWrapMode.html#Pre) (maintain spacing), or [`WordWrapMode.NoWrap`](https://gumob.github.io/three-text-geometry/enums/WordWrapMode.html#NoWrap) (collapse whitespace but only break on newline characters), otherwise assumes normal word-wrap behaviour (collapse whitespace, break at width or newlines) | undefined |  |
| **align** | [`TextAlign`](https://gumob.github.io/three-text-geometry/enums/TextAlign.html) | This can be [`TextAlign.left`](https://gumob.github.io/three-text-geometry/enums/TextAlign.html#Left), [`TextAlign.center`](https://gumob.github.io/three-text-geometry/enums/TextAlign.html#Center) or [`TextAlign.right`](https://gumob.github.io/three-text-geometry/enums/TextAlign.html#Right) | [`TextAlign.left`](https://gumob.github.io/three-text-geometry/enums/TextAlign.html#Left) |  |
| **letterSpacing** | `number` | The letter spacing in pixels | 0 |  |
| **lineHeight** | `number` | The line height in pixels | [`font.common.lineHeight`](https://gumob.github.io/three-text-geometry/interfaces/BMFontCommon.html#lineHeight) |  |
| **tabSize** | `number` | The number of spaces to use in a single tab | 4 |  |
| **start** | `number` | The starting index into the text to layout | 0 |  |
| **end** | `number` | The ending index (exclusive) into the text to layout | [`text.length`](https://gumob.github.io/three-text-geometry/classes/TextGeometry.html#constructor) |  |
| **flipY** | `boolean` | Whether the texture will be Y-flipped | true |  |
| **multipage** | `boolean` | Whether to construct this geometry with an extra buffer containing page IDs. This is necessary for multi-texture fonts | false |  |
<!-- prettier-ignore-end -->

## Generate Bitmap Font

The following tools can be used to convert fonts to a bitmap font:

- [msdf-bmfont-web](https://msdf-bmfont.donmccurdy.com/) (Online Tool)
- [msdf-bmfont-xml](https://github.com/soimy/msdf-bmfont-xml) (Commandline Tool)
- [Hiero](https://github.com/libgdx/libgdx/wiki/Hiero) (Desktop App, Windows Only)

Read the [Three.js documentation](https://threejs.org/docs/index.html#manual/en/introduction/Creating-text) about a bitmap font.

### Using msdf-bmfont-xml

Install [msdf-bmfont-xml](https://github.com/soimy/msdf-bmfont-xml)

```
$ npm install msdf-bmfont-xml -g
```

Generate a bitmap font

```
$ msdf-bmfont \
    --output-type json \
    --filename 'OdudoMono-Regular-128' \
    --font-size 128 \
    --texture-size 1024,1024 \
    --field-type 'sdf' \
    'OdudoMono-Regular.otf'
```

## Copyright

Punycode is released under MIT license, which means you can modify it, redistribute it or use it however you like.
