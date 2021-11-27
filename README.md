![Main Workflow](https://github.com/gumob/three-text-geometry/actions/workflows/main.yaml/badge.svg)
![Develop Workflow](https://github.com/gumob/three-text-geometry/actions/workflows/develop.yaml/badge.svg)
[![codecov](https://codecov.io/gh/gumob/three-text-geometry/branch/main/graph/badge.svg?token=CL35QZ32NY)](https://codecov.io/gh/gumob/three-text-geometry)

# three-text-geometry

<!-- ![demo.gif](README-assets/demo.gif) -->
<img src="README-assets/demo.gif" alt="demo.gif" style="width:1200px;"/>

The port of the JavaScript versions of [three-bmfont-text](https://github.com/Jam3/three-bmfont-text), [layout-bmfont-text](https://github.com/Jam3/layout-bmfont-text), [load-bmfont](https://github.com/Jam3/load-bmfont), and [word-wrapper](https://github.com/mattdesl/word-wrapper) to Pure Typescript, this library enables fast text rendering with Three.js and bitmap font.<br/>
The difference in rendering speed is noticeable when animations are enabled, and it runs 10x faster than canvas texture based text rendering.

## Requirements

- Three.js r134 or later

## Installation

#### Yarn

```
$ yarn add three-text-geometry
```

#### Node

```
$ node install three-text-geometry
```

## Usage

#### How to run the demo

The demo is written in TypeScript using React, so you will need to check out the repository to run the demo app.
The source code for the demo is available [here](https://github.com/gumob/three-text-geometry/tree/develop/demo).

```
$ git clone https://github.com/gumob/three-text-geometry.git
$ cd three-text-geometry/demo
$ yarn install
$ yarn start
```

#### The sample code using `TextGeometry`, `BMFontLoader`, and `THREE.TextureLoader`

- `BMFontLoader` and `THREE.TextureLoader` can be combined by using Promise.
- For detaild information, read the [documentation](https://github.com/gumob/three-text-geometry/docs).

```TypeScript
import * as THREE from 'three'
import TextGeometry, { BMFontLoader, BMFont, TextGeometryOption, TextAlign } from 'three-text-geometry'

class TextGeometryRendere extends React.Component {

    renderer?: THREE.WebGLRenderer
    scene?: THREE.Scene
    camera?: THREE.PerspectiveCamera

    componentDidMount() {
        const fontUri: string =
            'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/OdudoMono-Regular-64.json'
        const textureUri: string =
            'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/OdudoMono-Regular-64.png'
        Promise.all([
            new BMFontLoader().loadJson(fontUri), /** Load a font */
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
            multipage: true
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

#### Usage of `TextGeometryOption`

| key               |      type      | description                                                                                                                                                                                                                                                |        default         | required |
| ----------------- | :------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------: | :------: |
| **font**          |    `BMFont`    | The BMFont definition which holds chars, kernings, etc                                                                                                                                                                                                     |       undefined        |   true   |
| **width**         |    `number`    | The desired width of the text box, causes word-wrapping and clipping in `WordWrapMode` mode. Leave as undefined to remove word-wrapping (default behaviour)                                                                                                |       undefined        |  false   |
| **mode**          | `WordWrapMode` | A mode for word-wrapper; can be `WordWrapMode.Pre` (maintain spacing), or `WordWrapMode.NoWrap` (collapse whitespace but only break on newline characters), otherwise assumes normal word-wrap behaviour (collapse whitespace, break at width or newlines) |       undefined        |  false   |
| **align**         |  `TextAlign`   | This can be `TextAlign.left`, `TextAlign.center` or `TextAlign.right`                                                                                                                                                                                      |    `TextAlign.left`    |  false   |
| **letterSpacing** |    `number`    | The letter spacing in pixels                                                                                                                                                                                                                               |           0            |  false   |
| **lineHeight**    |    `number`    | The line height in pixels                                                                                                                                                                                                                                  | font.common.lineHeight |  false   |
| **tabSize**       |    `number`    | The number of spaces to use in a single tab                                                                                                                                                                                                                |           4            |  false   |
| **start**         |    `number`    | The starting index into the text to layout                                                                                                                                                                                                                 |           0            |  false   |
| **end**           |    `number`    | The ending index (exclusive) into the text to layout                                                                                                                                                                                                       |      text.length       |  false   |
| **flipY**         |   `boolean`    | Whether the texture will be Y-flipped                                                                                                                                                                                                                      |          true          |  false   |
| **multipage**     |   `boolean`    | Whether to construct this geometry with an extra buffer containing page IDs. This is necessary for multi-texture fonts                                                                                                                                     |         false          |  false   |

## Generate Bitmap Font

The following tools can be used to convert fonts to BMFont:

- [msdf-bmfont-web](https://msdf-bmfont.donmccurdy.com/) (Online Tool)
- [msdf-bmfont-xml](https://github.com/soimy/msdf-bmfont-xml) (Commandline Tool)
- [Hiero](https://github.com/libgdx/libgdx/wiki/Hiero) (Desktop App, Windows Only)

Read the [Three.js documentation](https://threejs.org/docs/index.html#manual/en/introduction/Creating-text) about BMFont.

#### Using msdf-bmfont-xml

Install [msdf-bmfont-xml](https://github.com/soimy/msdf-bmfont-xml)

```
npm install msdf-bmfont-xml -g
```

Generat a BMFont

```
msdf-bmfont \
    --output-type json \
    --filename 'OdudoMono-Regular-128' \
    --font-size 128 \
    --texture-size 1024,1024 \
    --field-type 'sdf' \
    'OdudoMono-Regular.otf'
```

## Copyright

Punycode is released under MIT license, which means you can modify it, redistribute it or use it however you like.
