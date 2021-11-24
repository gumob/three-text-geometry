/*
 * Adapted from EASING EQUATIONS by Robert Penner
 * @see https://easings.net
 * @see https://gist.github.com/Torthu/76793e41d11b972163823fd8967256c3
 *
 * TERMS OF USE - EASING EQUATIONS
 *
 * Open source under the BSD License.
 *
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 * GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 */

export default class Easing {
  static linear(currentTime: number, from: number, to: number, duration: number): number {
    const change = to - from
    return from + (change / duration) * currentTime
  }
  static easeInQuad(currentTime: number, from: number, to: number, duration: number): number {
    const change = to - from
    return change * (currentTime /= duration) + from
  }
  static easeOutQuad(currentTime: number, from: number, to: number, duration: number): number {
    const change = to - from
    return -change * (currentTime /= duration) * (currentTime - 2) + from
  }
  static easeInOutQuad(currentTime: number, from: number, to: number, duration: number): number {
    const change = to - from
    currentTime /= duration / 2
    if (currentTime < 1) {
      return (change / 2) * currentTime * currentTime + from
    }
    return (-change / 2) * (--currentTime * (currentTime - 2) - 1) + from
  }

  static easeInCubic(currentTime: number, from: number, to: number, duration: number): number {
    const change = to - from
    return change * (currentTime /= duration) * currentTime * currentTime + from
  }
  static easeOutCubic(currentTime: number, from: number, to: number, duration: number): number {
    const change = to - from
    return change * ((currentTime = currentTime / duration - 1) * currentTime * currentTime + 1) + from
  }
  static easeInOutCubic(currentTime: number, from: number, to: number, duration: number): number {
    const change = to - from
    currentTime /= duration / 2
    if (currentTime < 1) {
      return (change / 2) * currentTime * currentTime * currentTime + from
    }
    return (change / 2) * ((currentTime -= 2) * currentTime * currentTime + 2) + from
  }

  static easeInQuart(currentTime: number, from: number, to: number, duration: number): number {
    const change = to - from
    return change * (currentTime /= duration) * currentTime * currentTime * currentTime + from
  }
  static easeOutQuart(currentTime: number, from: number, to: number, duration: number): number {
    const change = to - from
    return (
      -change * ((currentTime = currentTime / duration - 1) * currentTime * currentTime * currentTime - 1) +
      from
    )
  }
  static easeInOutQuart(currentTime: number, from: number, to: number, duration: number): number {
    const change = to - from
    currentTime /= duration / 2
    if (currentTime < 1) {
      return (change / 2) * currentTime * currentTime * currentTime * currentTime + from
    }
    return (-change / 2) * ((currentTime -= 2) * currentTime * currentTime * currentTime - 2) + from
  }

  static easeInQuint(currentTime: number, from: number, to: number, duration: number): number {
    const change = to - from
    return change * (currentTime /= duration) * currentTime * currentTime * currentTime * currentTime + from
  }
  static easeOutQuint(currentTime: number, from: number, to: number, duration: number): number {
    const change = to - from
    return (
      change *
        ((currentTime = currentTime / duration - 1) * currentTime * currentTime * currentTime * currentTime +
          1) +
      from
    )
  }
  static easeInOutQuint(currentTime: number, from: number, to: number, duration: number): number {
    const change = to - from
    currentTime /= duration / 2
    if (currentTime < 1) {
      return (change / 2) * currentTime * currentTime * currentTime * currentTime * currentTime + from
    }
    return (
      (change / 2) * ((currentTime -= 2) * currentTime * currentTime * currentTime * currentTime + 2) + from
    )
  }

  static easeInSine(currentTime: number, from: number, to: number, duration: number): number {
    const change = to - from
    return -change * Math.cos((currentTime / duration) * (Math.PI / 2)) + change + from
  }
  static easeOutSine(currentTime: number, from: number, to: number, duration: number): number {
    const change = to - from
    return change * Math.sin((currentTime / duration) * (Math.PI / 2)) + from
  }
  static easeInOutSine(currentTime: number, from: number, to: number, duration: number): number {
    const change = to - from
    return (-change / 2) * (Math.cos((Math.PI * currentTime) / duration) - 1) + from
  }

  static easeInExpo(currentTime: number, from: number, to: number, duration: number): number {
    const change = to - from
    return currentTime === 0 ? from : change * Math.pow(2, 10 * (currentTime / duration - 1)) + from
  }
  static easeOutExpo(currentTime: number, from: number, to: number, duration: number): number {
    const change = to - from
    return currentTime === duration
      ? from + change
      : change * (-Math.pow(2, (-10 * currentTime) / duration) + 1) + from
  }
  static easeInOutExpo(currentTime: number, from: number, to: number, duration: number): number {
    const change = to - from
    if (currentTime === 0) return from
    if (currentTime === duration) return from + change
    currentTime /= duration / 2
    if (currentTime < 1) return (change / 2) * Math.pow(2, 10 * (currentTime - 1)) + from
    return (change / 2) * (-Math.pow(2, -10 * --currentTime) + 2) + from
  }

  static easeInCirc(currentTime: number, from: number, to: number, duration: number): number {
    const change = to - from
    return -change * (Math.sqrt(1 - (currentTime /= duration) * currentTime) - 1) + from
  }
  static easeOutCirc(currentTime: number, from: number, to: number, duration: number): number {
    const change = to - from
    return change * Math.sqrt(1 - (currentTime = currentTime / duration - 1) * currentTime) + from
  }
  static easeInOutCirc(currentTime: number, from: number, to: number, duration: number): number {
    const change = to - from
    currentTime /= duration / 2
    if (currentTime < 1) {
      return (-change / 2) * (Math.sqrt(1 - currentTime * currentTime) - 1) + from
    }
    return (change / 2) * (Math.sqrt(1 - (currentTime -= 2) * currentTime) + 1) + from
  }

  static easeInElastic(currentTime: number, from: number, to: number, duration: number): number {
    const change = to - from
    let s = 1.70158
    let p = 0
    let a = change

    if (currentTime === 0) return from

    currentTime /= duration
    if (currentTime === 1) return from + change
    if (!p) p = duration * 0.3
    if (a < Math.abs(change)) {
      a = change
      s = p / 4
    } else s = (p / (2 * Math.PI)) * Math.asin(change / a)
    return (
      -(
        a *
        Math.pow(2, 10 * (currentTime -= 1)) *
        Math.sin(((currentTime * duration - s) * (2 * Math.PI)) / p)
      ) + from
    )
  }
  static easeOutElastic(currentTime: number, from: number, to: number, duration: number): number {
    const change = to - from
    let s = 1.70158
    let p = 0
    let a = change
    if (currentTime === 0) return from

    currentTime /= duration
    if (currentTime === 1) return from + change
    if (!p) p = duration * 0.3
    if (a < Math.abs(change)) {
      a = change
      s = p / 4
    } else s = (p / (2 * Math.PI)) * Math.asin(change / a)
    return (
      a * Math.pow(2, -10 * currentTime) * Math.sin(((currentTime * duration - s) * (2 * Math.PI)) / p) +
      change +
      from
    )
  }
  static easeInOutElastic(currentTime: number, from: number, to: number, duration: number): number {
    const change = to - from
    let s = 1.70158
    let p = 0
    let a = change
    if (currentTime === 0) return from

    currentTime /= duration / 2
    if (currentTime === 2) return from + change
    if (!p) p = duration * (0.3 * 1.5)
    if (a < Math.abs(change)) {
      a = change
      s = p / 4
    } else {
      s = (p / (2 * Math.PI)) * Math.asin(change / a)
    }
    if (currentTime < 1)
      return (
        -0.5 *
          (a *
            Math.pow(2, 10 * (currentTime -= 1)) *
            Math.sin(((currentTime * duration - s) * (2 * Math.PI)) / p)) +
        from
      )
    return (
      a *
        Math.pow(2, -10 * (currentTime -= 1)) *
        Math.sin(((currentTime * duration - s) * (2 * Math.PI)) / p) *
        0.5 +
      change +
      from
    )
  }

  static easeInBounce(currentTime: number, from: number, to: number, duration: number): number {
    const change = to - from
    return change - this.easeOutBounce(duration - currentTime, 0, change, duration) + from
  }
  static easeOutBounce(currentTime: number, from: number, to: number, duration: number): number {
    const change = to - from
    currentTime /= duration
    if (currentTime < 1 / 2.75) {
      return change * (7.5625 * currentTime * currentTime) + from
    } else if (currentTime < 2 / 2.75) {
      return change * (7.5625 * (currentTime -= 1.5 / 2.75) * currentTime + 0.75) + from
    } else if (currentTime < 2.5 / 2.75) {
      return change * (7.5625 * (currentTime -= 2.25 / 2.75) * currentTime + 0.9375) + from
    } else {
      return change * (7.5625 * (currentTime -= 2.625 / 2.75) * currentTime + 0.984375) + from
    }
  }
  static easeInOutBounce(currentTime: number, from: number, to: number, duration: number): number {
    const change = to - from
    if (currentTime < duration / 2) {
      return this.easeInBounce(currentTime * 2, 0, change, duration) * 0.5 + from
    }
    return this.easeOutBounce(currentTime * 2 - duration, 0, change, duration) * 0.5 + change * 0.5 + from
  }
}

// export type EasingCurve =
//     | 'linear'
//     | 'easeInOutQuad'
//     | 'easeOutQuad'
//     | 'easeInCubic'
//     | 'easeOutCubic'
//     | 'easeInOutCubic'
//     | 'easeInQuart'
//     | 'easeOutQuart'
//     | 'easeInOutQuart'
//     | 'easeInQuint'
//     | 'easeOutQuint'
//     | 'easeInOutQuint'
//     | 'easeInSine'
//     | 'easeOutSine'
//     | 'easeInOutSine'
//     | 'easeInExpo'
//     | 'easeOutExpo'
//     | 'easeInOutExpo'
//     | 'easeInCirc'
//     | 'easeOutCirc'
//     | 'easeInOutCirc'
//     | 'easeInElastic'
//     | 'easeOutElastic'
//     | 'easeInOutElastic'
//     | 'easeInBounce'
//     | 'easeOutBounce'
//     | 'easeInOutBounce';
