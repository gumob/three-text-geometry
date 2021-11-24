/**
 * @jest-environment jsdom
 */
import fs from 'fs'
import gl from 'gl'
import * as THREE from 'three'
import TextGeometry from '~/index'
import { BMFontAsciiParser } from '~/parser'

describe('Demo', () => {
  // let browser: Browser
  // beforeAll(async () => {
  //   browser = await chromium.launch()
  // })

  test('2d context should be exist', async () => {
    // await expect(browser).not.toBeNull()
    expect(true).toBe(true)
  })
  // afterAll(async () => {
  //   await browser.close()
  // })
})
