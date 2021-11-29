import React from 'react'
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {
  BMFont,
  BMFontAsciiParser,
  BMFontBinaryParser,
  BMFontJsonParser,
  BMFontXMLParser,
  TextGeometryOption,
} from 'three-text-geometry'
import './Demo.css'
import axios from 'axios'

export class DemoBase extends React.Component {
  stats?: Stats | undefined
  controls?: OrbitControls | undefined

  divID: string = 'Demo'

  renderer?: THREE.WebGLRenderer
  scene?: THREE.Scene
  camera?: THREE.PerspectiveCamera

  textIndex: number = 0
  textList: string[] = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nNulla enim odio, tincidunt sed fringilla sed, placerat vel lectus.\nDuis non sapien nulla.\nIn convallis nulla nec nulla varius rutrum.\nNunc augue augue, ornare in cursus egestas, cursus vel magna.\nFusce at felis vel tortor sagittis tincidunt nec vitae nisl.\nSed efficitur nibh consequat tortor pulvinar, dignissim tincidunt risus hendrerit.\nSuspendisse quis commodo nulla.\nUt orci urna, mollis non nisl id, molestie tristique purus.\nPhasellus efficitur laoreet eros vehicula convallis.\nSed imperdiet, lectus a facilisis tempus, elit orci varius ante, at lacinia odio massa et quam.\nQuisque vulputate nulla vitae feugiat aliquam.\nVivamus vel mauris sit amet est rhoncus molestie at quis neque.\nDuis faucibus laoreet tempus.\nMaecenas metus velit, lobortis sit amet mauris at, vehicula condimentum velit.\nVestibulum ornare eu turpis vel laoreet.\nNunc ac cursus nunc, non porttitor arcu.`,
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nFusce dapibus vehicula semper.\nAliquam pulvinar enim quis tristique tincidunt.\nSed faucibus turpis ipsum, non ultrices odio varius et.\nDonec eget vulputate enim.\nAenean posuere, dolor quis dapibus interdum, ipsum dolor molestie nunc, consequat tincidunt ex leo eu lectus.\nInteger a risus iaculis, facilisis orci ac, maximus augue.\nDonec at feugiat leo, at sollicitudin sapien.\nNullam quis lacus consequat, sodales mi eleifend, efficitur tortor.\nVivamus bibendum ante eu dolor convallis, id blandit felis placerat.\nAliquam maximus at dolor eget facilisis.\nMaecenas aliquam consequat urna eget ullamcorper.`,
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nPraesent ac magna id tortor consectetur mattis.\nMauris vel felis a urna suscipit dapibus.\nSuspendisse nec tincidunt nulla.\nCurabitur diam nisl, convallis eu porta id, tristique a nulla.\nVestibulum ultrices rhoncus placerat.\nLorem ipsum dolor sit amet, consectetur adipiscing elit.\nCurabitur egestas, libero id luctus placerat, enim erat sodales ipsum, sed pretium urna ante nec mi.\nMauris justo nulla, vulputate id dui id, molestie fermentum neque.\nNam cursus enim sit amet semper auctor.\nPraesent ultricies tempor fringilla.\nDuis libero eros, dictum at ligula quis, placerat consequat velit.\nEtiam id fringilla neque.`,
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nDonec diam odio, efficitur sed efficitur vel, vestibulum vitae odio.\nAliquam semper, sem eget placerat ultricies, ligula sem faucibus magna, ut convallis est purus ac lectus.\nNam quis quam eget augue tristique efficitur nec nec quam.\nQuisque id turpis non magna mattis sagittis.\nInteger efficitur elementum congue.\nCurabitur ullamcorper rutrum orci a volutpat.\nIn quam est, hendrerit id lorem sed, semper eleifend purus.\nCras id sem mauris.`,
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nVivamus eu mauris pretium, pellentesque justo at, sodales ligula.\nPraesent vitae dolor porttitor, laoreet metus ut, posuere ligula.\nMauris dolor ante, consectetur eu vulputate eget, tempus in nunc.\nMaecenas bibendum eleifend lacus in sodales.\nAenean mollis lorem a sem ultrices, nec lobortis erat eleifend.\nCurabitur ante eros, porta eget mi a, bibendum luctus ante.\nNulla est purus, posuere at rutrum sit amet, bibendum condimentum elit.\nNunc nec sem enim.`,
  ]

  private _staticIndex = Math.floor(Math.random() * this.textList.length)
  staticText(): string {
    return this.textList[this._staticIndex]
  }
  randomText(): string {
    const index = Math.floor(Math.random() * this.textList.length)
    return this.textList[index]
  }

  fontUri: string =
    'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/OdudoMono-Regular-64.json'
  textureUri: string[] = [
    'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/OdudoMono-Regular-64.png',
  ]
  font?: BMFont
  textures: THREE.Texture[] = []

  textOption?: TextGeometryOption
  textMesh?: THREE.Mesh

  animationFrameID?: any

  componentDidMount() {
    // this.loadFont()
    const self = this
    this.loadAssets(this.fontUri, this.textureUri)
      .then((values: (BMFont | THREE.Texture)[]) => {
        values.forEach((value: BMFont | THREE.Texture) => {
          if (value instanceof THREE.Texture) {
            self.textures.push(value as THREE.Texture)
          } else {
            self.font = value as BMFont
          }
        })
        self.assetsDidLoad()
      })
      .catch((e) => {
        console.error(e)
      })
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.animationFrameID)
  }

  loadAssets(fontUri: string, textureUri: string[]): Promise<(BMFont | THREE.Texture)[]> {
    let fontLoader: Promise<BMFont>
    if (fontUri.endsWith('.fnt')) {
      fontLoader = axios.get(fontUri).then((res) => new BMFontAsciiParser().parse(res.data))
    } else if (fontUri.endsWith('.json')) {
      fontLoader = axios.get(fontUri).then((res) => new BMFontJsonParser().parse(res.data))
    } else if (fontUri.endsWith('.xml')) {
      fontLoader = axios.get(fontUri).then((res) => new BMFontXMLParser().parse(res.data))
    } else {
      fontLoader = axios
        .get(fontUri)
        .then((res) =>
          new BMFontBinaryParser().parse(
            typeof res.data === 'string' ? Buffer.from(res.data, 'binary') : (res.data as Buffer)
          )
        )
    }
    const textureLoaders: Promise<THREE.Texture>[] = textureUri.map((uri: string) => {
      return new THREE.TextureLoader().loadAsync(uri)
    })
    const loaders: Promise<BMFont | THREE.Texture>[] = []
    loaders.push(fontLoader)
    loaders.push(...textureLoaders)
    return Promise.all(loaders)
  }

  assetsDidLoad() {
    this.initBaseScene()
    this.initScene()
    this.updateScene()
  }

  private initBaseScene() {
    /** Renderer */
    this.renderer = new THREE.WebGLRenderer({ alpha: true })
    this.renderer.setClearColor(0x000000, 0)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    const container = document.querySelector(`#${this.divID}`)
    container?.append(this.renderer.domElement)

    /** Stats Panel */
    this.stats = Stats()
    this.stats?.showPanel(0)
    document.body.appendChild(this.stats.dom)

    /** Scene */
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x000000)
    this.scene.fog = new THREE.FogExp2(0x000104, 0.00035)

    /** Camera */
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100000)
    this.camera.position.set(1000, 1000, 2000)
    this.camera.lookAt(0, 0, 0)

    /** Control */
    this.controls = new OrbitControls(this.camera!, this.renderer.domElement!)
    this.controls.target.set(0, 0, 0)
    this.controls.autoRotate = true
    this.controls.update()

    /** AxesHelper */
    // const axes = new THREE.AxesHelper(1000)
    //   .setColors(
    //     new THREE.Color(0.3, 0.2, 0.2),
    //     new THREE.Color(0.2, 0.3, 0.2),
    //     new THREE.Color(0.2, 0.2, 0.3)
    //   )
    // this.scene?.add(axes)

    window.addEventListener('resize', this.onWindowResize.bind(this))
    window.addEventListener('click', this.onClicked.bind(this))
  }

  initScene() { }

  updateScene() {
    this.controls?.update()
    this.renderer?.render(this.scene!, this.camera!)
    this.stats?.update()
    this.animationFrameID = requestAnimationFrame(this.updateScene.bind(this))
  }

  onWindowResize(e: any) {
    this.camera!.aspect = window.innerWidth / window.innerHeight
    this.camera?.updateProjectionMatrix()
    this.renderer?.setSize(window.innerWidth, window.innerHeight)
  }

  onClicked(e: any) {
    this.controls!.autoRotate = false
  }

  render() {
    return <div id={this.divID} className="Demo"></div>
  }
}

export default DemoBase
