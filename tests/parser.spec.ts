import axios, { AxiosResponse } from 'axios'
import { BMFontErrorType } from '~/error'
import { BMFontAsciiParser, BMFontBinaryParser, BMFontJsonParser, BMFontXMLParser } from '~/parser'
import { isBMFont } from '~/types'

const config = {
  headers: {
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
  },
}

function fetchData(uri: string): Promise<AxiosResponse<any, any>> {
  return axios.get(uri, config)
}

describe('BMFontParser', () => {
  test('XML / Valid Single Page', async () => {
    const uri =
      'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/Roboto-Regular.xml'
    const res = await fetchData(uri)
    const font = new BMFontXMLParser().parse(res.data)
    expect(isBMFont(font)).toEqual(true)
  })

  test('XML / Valid Multiple Page', async () => {
    const uri =
      'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/Roboto-Regular-pages.xml'
    const res = await fetchData(uri)
    const font = new BMFontXMLParser().parse(res.data)
    expect(isBMFont(font)).toEqual(true)
  })

  test('XML / Invalid Single Page', async () => {
    try {
      const uri =
        'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/Roboto-Regular-invalid.xml'
      const res = await fetchData(uri)
      new BMFontXMLParser().parse(res.data)
    } catch (error: any) {
      expect(error.name).toBe(BMFontErrorType.ParseError)
    }
  })

  test('XML / Empty Single Page', async () => {
    try {
      const uri =
        'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/Roboto-Regular-empty.xml'
      const res = await fetchData(uri)
      new BMFontXMLParser().parse(res.data)
    } catch (error: any) {
      expect(error.name).toBe(BMFontErrorType.ParseError)
    }
  })

  test('Json / Valid', async () => {
    const uri =
      'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/Roboto-Regular.json'
    const res = await fetchData(uri)
    const font = new BMFontJsonParser().parse(res.data)
    expect(isBMFont(font)).toEqual(true)
  })

  test('Json / Empty', async () => {
    try {
      const uri =
        'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/Roboto-Regular-empty.json'
      const res = await fetchData(uri)
      new BMFontJsonParser().parse(res.data)
    } catch (error: any) {
      expect(error.name).toBe(BMFontErrorType.ParseError)
    }
  })

  test('Json / Invalid', async () => {
    try {
      const uri =
        'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/Roboto-Regular-invalid.json'
      const res = await fetchData(uri)
      new BMFontJsonParser().parse(res.data)
    } catch (error: any) {
      expect(error.name).toBe(BMFontErrorType.ParseError)
    }
  })

  test('Ascii / Valid / DejaVu-sdf.fnt', async () => {
    const uri =
      'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/DejaVu-sdf.fnt'
    const res = await fetchData(uri)
    const font = new BMFontAsciiParser().parse(res.data)
    expect(isBMFont(font)).toEqual(true)
  })

  test('Ascii / Invalid / DejaVu-sdf.fnt', async () => {
    try {
      const uri =
        'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/DejaVu-sdf-invalid.fnt'
      const res = await fetchData(uri)
      new BMFontAsciiParser().parse(res.data)
    } catch (error: any) {
      expect(error.name).toBe(BMFontErrorType.ParseError)
    }
  })

  test('Ascii / Empty / DejaVu-sdf.fnt', async () => {
    try {
      const uri =
        'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/DejaVu-sdf-empty.fnt'
      const res = await fetchData(uri)
      new BMFontAsciiParser().parse(res.data)
    } catch (error: any) {
      expect(error.name).toBe(BMFontErrorType.ParseError)
    }
  })

  test('Ascii / Valid / Lato-Regular-16.fnt', async () => {
    const uri =
      'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/Lato-Regular-16.fnt'
    const res = await fetchData(uri)
    const font = new BMFontAsciiParser().parse(res.data)
    expect(isBMFont(font)).toEqual(true)
  })

  test('Ascii / Valid / Lato-Regular-24.fnt', async () => {
    const uri =
      'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/Lato-Regular-24.fnt'
    const res = await fetchData(uri)
    const font = new BMFontAsciiParser().parse(res.data)
    expect(isBMFont(font)).toEqual(true)
  })

  test('Ascii / Valid / Lato-Regular-32.fnt', async () => {
    const uri =
      'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/Lato-Regular-32.fnt'
    const res = await fetchData(uri)
    const font = new BMFontAsciiParser().parse(res.data)
    expect(isBMFont(font)).toEqual(true)
  })

  test('Ascii / Valid / Lato-Regular-64.fnt', async () => {
    const uri =
      'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/Lato-Regular-64.fnt'
    const res = await fetchData(uri)
    const font = new BMFontAsciiParser().parse(res.data)
    expect(isBMFont(font)).toEqual(true)
  })

  test('Ascii / Valid / Norwester-Multi-32.fnt', async () => {
    const uri =
      'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/Norwester-Multi-32.fnt'
    const res = await fetchData(uri)
    const font = new BMFontAsciiParser().parse(res.data)
    expect(isBMFont(font)).toEqual(true)
  })

  test('Ascii / Valid / Norwester-Multi-64.fnt', async () => {
    const uri =
      'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/Norwester-Multi-64.fnt'
    const res = await fetchData(uri)
    const font = new BMFontAsciiParser().parse(res.data)
    expect(isBMFont(font)).toEqual(true)
  })

  test('Binary / Valid', async () => {
    const uri = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/Arial.bin'
    const res = await fetchData(uri)
    const data = typeof res.data === 'string' ? Buffer.from(res.data, 'binary') : (res.data as Buffer)
    const font = new BMFontBinaryParser().parse(data)
    expect(isBMFont(font)).toEqual(true)
  })

  test('Binary / Invalid', async () => {
    try {
      const uri =
        'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/Arial-invalid.bin'
      const res = await fetchData(uri)
      const data = typeof res.data === 'string' ? Buffer.from(res.data, 'binary') : (res.data as Buffer)
      new BMFontBinaryParser().parse(data)
    } catch (error: any) {
      expect(error.name).toBe(BMFontErrorType.ParseError)
    }
  })

  test('Binary / Empty', async () => {
    try {
      const uri =
        'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/Arial-empty.bin'
      const res = await fetchData(uri)
      const data = typeof res.data === 'string' ? Buffer.from(res.data, 'binary') : (res.data as Buffer)
      new BMFontBinaryParser().parse(data)
    } catch (error: any) {
      expect(error.name).toBe(BMFontErrorType.ParseError)
    }
  })
})
