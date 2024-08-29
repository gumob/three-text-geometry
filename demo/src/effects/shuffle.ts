// import { nextPowerOfTwo } from 'three/src/math/MathUtils'

import Easing from './easing'

function randFloat(min: number, max: number) {
  return min + Math.random() * (max - min)
}

class ShuffleTextError extends Error {
  constructor(message: string | undefined = undefined) {
    const msg: string = message ? message : 'Failed to parse data'
    super(msg)
    this.name = 'BMFontError'
    Object.setPrototypeOf(this, ShuffleTextError.prototype)
  }
}

export enum ShuffleState {
  Idle = 0,
  Updating,
  Cancelled,
  Completed,
}

interface ShuffleCharCallback {
  (index: number, state: ShuffleState): void
}

export interface ShuffleTextCallback {
  (text: string, state: ShuffleState): void
}

export interface ShuffleRange {
  min: number
  max: number
}

export interface ShuffleOption {
  shuffleText: string
  ignoreRegex?: RegExp
  delay: ShuffleRange
  fadeDuration: ShuffleRange
  shuffleDuration: ShuffleRange
  interval: ShuffleRange
}

class ShuffleChar {
  index: number

  originalChar: string
  currentChar: string

  shuffleText: string
  ignoreRegex?: RegExp

  delay: number
  shuffleDuration: number
  fadeDuration: number
  interval: number

  timeUpdated: number = 0

  opacity: number = 0
  state: ShuffleState = ShuffleState.Idle

  onCharStateChanged: ShuffleCharCallback

  constructor(index: number, char: string, option: ShuffleOption, callback: ShuffleCharCallback) {
    this.index = index
    this.originalChar = char
    this.shuffleText =
      char === char.toLowerCase() ? option.shuffleText.toLocaleLowerCase() : option.shuffleText.toUpperCase()
    this.ignoreRegex = option.ignoreRegex || /\s|\t|\n|\r|(\n\r)/
    this.delay = randFloat(option.delay.min, option.delay.max)
    this.fadeDuration = randFloat(option.fadeDuration.min, option.fadeDuration.max)
    this.shuffleDuration = randFloat(option.shuffleDuration.min, option.shuffleDuration.max)
    this.interval = randFloat(option.interval.min, option.interval.max)
    this.onCharStateChanged = callback
    if (this.ignoreRegex!.test(this.originalChar)) {
      this.currentChar = this.originalChar
    } else {
      this.currentChar = this.shuffleText.charAt(Math.floor(Math.random() * this.shuffleText.length))
    }
  }

  public start(time: number) {
    this.state = ShuffleState.Updating
    this.update(time)
  }

  public update(time: number) {
    if (time < this.delay) {
      return
    }
    if (time - this.timeUpdated < this.interval) return
    const localTime = time - this.delay
    switch (this.state) {
      case ShuffleState.Idle:
        break
      case ShuffleState.Updating:
        if (this.ignoreRegex!.test(this.originalChar)) {
          this.currentChar = this.originalChar
          return
        }
        if (localTime < this.shuffleDuration) {
          this.currentChar = this.shuffleText.charAt(Math.floor(Math.random() * this.shuffleText.length))
        } else {
          this.currentChar = this.originalChar
        }
        if (localTime < this.fadeDuration) {
          this.opacity = Easing.linear(localTime, 0, 1, this.fadeDuration)
        }
        /** If both effect is completed */
        if (localTime >= this.fadeDuration && localTime >= this.fadeDuration) {
          this.state = ShuffleState.Completed
        } else {
          this.onCharStateChanged(this.index, this.state)
        }
        break
      case ShuffleState.Cancelled:
        break
      case ShuffleState.Completed:
        this.currentChar = this.originalChar
        this.opacity = 1.0
        this.onCharStateChanged(this.index, this.state)
        break
      default:
        break
    }
    this.timeUpdated = time
  }

  public cancel() {
    this.state = ShuffleState.Cancelled
    this.onCharStateChanged(this.index, this.state)
  }
}

export default class ShuffleText {
  private _originalText: string = ''
  private _currentText: string = ''

  public get originalText(): string {
    return this._originalText
  }
  public get currentText(): string {
    return this._currentText
  }

  private _chars: Array<ShuffleChar> = []

  // private _option: ShuffleOption | undefined

  private _timeStart: number | undefined

  private _numCompleted: number = 0
  private _animationFrame: number = -1

  private _state: ShuffleState = ShuffleState.Idle
  public get state(): ShuffleState {
    return this._state
  }

  private _textStateHandler: ShuffleTextCallback

  constructor(text: string, option: ShuffleOption, textStateHandler: ShuffleTextCallback) {
    if (text.length === 0) throw new ShuffleTextError('The `text` argument must not be empty.')
    if (option.shuffleText.length === 0)
      throw new ShuffleTextError('The `option.delay.shuffleText` must not be empty.')
    if (option.delay.min > option.delay.max)
      throw new ShuffleTextError(
        'The `option.delay.max` must be greater than or equal to `option.delay.min`.'
      )
    if (option.fadeDuration.min > option.fadeDuration.max)
      throw new ShuffleTextError(
        'The `option.fadeDuration.max` must be greater than or equal to `option.fadeDuration.min`.'
      )
    if (option.shuffleDuration.min > option.shuffleDuration.max)
      throw new ShuffleTextError(
        'The `option.shuffleDuration.max` must be greater than or equal to `option.shuffleDuration.min`.'
      )
    if (option.interval.min > option.interval.max)
      throw new ShuffleTextError(
        'The `option.interval.max` must be greater than or equal to `option.interval.min`.'
      )
    /* Set variables */
    this._originalText = text
    this._currentText = ''
    option.shuffleText = option.shuffleText
      .split('')
      .filter((char: string, index: number, arr: string[]) => arr.indexOf(char) === index)
      .join('')
      .replaceAll(/\s|\t|\n|\r|(\n\r)/gi, '')
    this._textStateHandler = textStateHandler
    /* Create character set */
    const letters: Array<string> = this._originalText.split('')
    for (let i = 0; i < letters.length; i++) {
      const letter = letters[i]
      const char: ShuffleChar = new ShuffleChar(i, letter, option, this._onCharStateChanged.bind(this))
      this._chars.push(char)
    }
  }

  public start() {
    if (this._state !== ShuffleState.Idle) return
    this._state = ShuffleState.Updating
    this._timeStart = performance.now()
    const timeDiff = 0
    for (let i = 0; i < this._chars.length; i++) this._chars[i].start(timeDiff)
    this._update()
  }

  private _update() {
    if (this._state !== ShuffleState.Updating) return
    const timeDiff = performance.now() - this._timeStart!
    for (let i = 0; i < this._chars.length; i++) this._chars[i].update(timeDiff)
    this._currentText = this._chars.map((char: ShuffleChar) => char.currentChar).join('')
    if (this._state !== ShuffleState.Updating) return
    this._textStateHandler(this.currentText, this._state)
    this._animationFrame = requestAnimationFrame(this._update.bind(this))
  }

  public cancel() {
    if (this._state !== ShuffleState.Updating) return
    this._state = ShuffleState.Cancelled
    for (let i = 0; i < this._chars.length; i++) this._chars[i].cancel()
    this._currentText = this._chars.map((char: ShuffleChar) => char.currentChar).join('')
    this._textStateHandler(this.currentText, this._state)
    cancelAnimationFrame(this._animationFrame)
  }

  private _onCharStateChanged(index: number, state: ShuffleState) {
    switch (state) {
      case ShuffleState.Idle:
      case ShuffleState.Updating:
      case ShuffleState.Cancelled:
        break
      case ShuffleState.Completed:
        if (this._state !== ShuffleState.Updating) return
        this._numCompleted++
        if (this._chars.length <= this._numCompleted) {
          cancelAnimationFrame(this._animationFrame)
          this._chars = []
          this._currentText = this._originalText
          this._state = ShuffleState.Completed
          this._textStateHandler(this.currentText, this._state)
        }
        break
      default:
        break
    }
  }
}
