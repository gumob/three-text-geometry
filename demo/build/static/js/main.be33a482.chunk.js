;(this.webpackJsonpdemo = this.webpackJsonpdemo || []).push([
  [0],
  {
    117: function (t, e, n) {
      'use strict'
      ;(function (t) {
        n.d(e, 'a', function () {
          return a
        })
        var i = n(43)
        function a() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
            n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
            a = null
          e && (Array.isArray(e) || t.isBuffer(e)) ? (a = e) : ((n = e || {}), (a = null))
          for (
            var r = 'string' === typeof (n = n || {}).type ? n.type : 'uint16',
              o = void 0 !== n.count ? n.count : 1,
              s = void 0 !== n.start ? n.start : 0,
              u = 'boolean' !== typeof n.clockwise || n.clockwise,
              c = u ? [0, 2, 3] : [2, 1, 3],
              l = c[0] || 0,
              h = c[1] || 0,
              d = c[2] || 0,
              f = 6 * o,
              p = a || new (Object(i.d)(r) || Uint16Array)(f),
              m = 0,
              v = 0;
            m < f;
            m += 6, v += 4
          ) {
            var g = m + s
            ;(p[g + 0] = v + 0),
              (p[g + 1] = v + 1),
              (p[g + 2] = v + 2),
              (p[g + 3] = v + l),
              (p[g + 4] = v + h),
              (p[g + 5] = v + d)
          }
          return p
        }
      }.call(this, n(93).Buffer))
    },
    12: function (t, e, n) {
      'use strict'
      n.d(e, 'a', function () {
        return c
      }),
        n.d(e, 'b', function () {
          return i
        })
      var i,
        a = n(0),
        r = n(16),
        o = n(2),
        s = n(3),
        u = n(78)
      !(function (t) {
        ;(t.LoadError = 'LoadError'), (t.ParseError = 'ParseError')
      })(i || (i = {}))
      var c = (function (t) {
        Object(o.a)(n, t)
        var e = Object(s.a)(n)
        function n(t) {
          var o,
            s,
            u = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0
          switch ((Object(a.a)(this, n), t)) {
            case i.ParseError:
              s = u || 'Failed to parse data'
              break
            case i.LoadError:
              s = u || 'Failed to load data'
          }
          return ((o = e.call(this, s)).name = t), Object.setPrototypeOf(Object(r.a)(o), n.prototype), o
        }
        return n
      })(Object(u.a)(Error))
    },
    120: function (t) {
      t.exports = JSON.parse(
        '{"$schema":"http://json-schema.org/draft-07/schema#","definitions":{"BMFont":{"title":"BMFont","type":"object","properties":{"pages":{"type":"array","items":{"type":"string"},"title":"pages"},"chars":{"type":"array","items":{"$ref":"#/definitions/BMFontChar"},"title":"chars"},"info":{"$ref":"#/definitions/BMFontInfo","title":"info"},"common":{"$ref":"#/definitions/BMFontCommon","title":"common"},"distanceField":{"$ref":"#/definitions/BMFontDistanceField","title":"distanceField"},"kernings":{"type":"array","items":{"$ref":"#/definitions/BMFontKern"},"title":"kernings"}},"required":["chars","common","distanceField","info","kernings","pages"]},"BMFontChar":{"title":"BMFontChar","type":"object","properties":{"id":{"type":"number","title":"id"},"index":{"type":"number","title":"index"},"char":{"type":"string","title":"char"},"width":{"type":"number","title":"width"},"height":{"type":"number","title":"height"},"xoffset":{"type":"number","title":"xoffset"},"yoffset":{"type":"number","title":"yoffset"},"xadvance":{"type":"number","title":"xadvance"},"chnl":{"type":"number","title":"chnl"},"x":{"type":"number","title":"x"},"y":{"type":"number","title":"y"},"page":{"type":"number","title":"page"}},"required":["char","chnl","height","id","index","page","width","x","xadvance","xoffset","y","yoffset"]},"BMFontInfo":{"title":"BMFontInfo","type":"object","properties":{"face":{"type":"string","title":"face"},"size":{"type":"number","title":"size"},"bold":{"type":"number","title":"bold"},"italic":{"type":"number","title":"italic"},"charset":{"type":"array","items":{"type":"string"},"title":"charset"},"unicode":{"type":"number","title":"unicode"},"stretchH":{"type":"number","title":"stretchH"},"smooth":{"type":"number","title":"smooth"},"aa":{"type":"number","title":"aa"},"padding":{"type":"array","items":{"type":"number"},"title":"padding"},"spacing":{"type":"array","items":{"type":"number"},"title":"spacing"},"fixedHeight":{"type":"number","title":"fixedHeight"},"outline":{"type":"number","title":"outline"}},"required":["aa","bold","charset","face","fixedHeight","italic","outline","padding","size","smooth","spacing","stretchH","unicode"]},"BMFontCommon":{"title":"BMFontCommon","type":"object","properties":{"lineHeight":{"type":"number","title":"lineHeight"},"base":{"type":"number","title":"base"},"scaleW":{"type":"number","title":"scaleW"},"scaleH":{"type":"number","title":"scaleH"},"pages":{"type":"number","title":"pages"},"packed":{"type":"number","title":"packed"},"alphaChnl":{"type":"number","title":"alphaChnl"},"redChnl":{"type":"number","title":"redChnl"},"greenChnl":{"type":"number","title":"greenChnl"},"blueChnl":{"type":"number","title":"blueChnl"}},"required":["alphaChnl","base","blueChnl","greenChnl","lineHeight","packed","pages","redChnl","scaleH","scaleW"]},"BMFontDistanceField":{"title":"BMFontDistanceField","type":"object","properties":{"fieldType":{"type":"string","title":"fieldType"},"distanceRange":{"type":"number","title":"distanceRange"}},"required":["distanceRange","fieldType"]},"BMFontKern":{"title":"BMFontKern","type":"object","properties":{"first":{"type":"number","title":"first"},"second":{"type":"number","title":"second"},"amount":{"type":"number","title":"amount"}},"required":["amount","first","second"]}}}'
      )
    },
    130: function (t, e, n) {},
    20: function (t, e, n) {
      'use strict'
      function i() {
        return {
          pages: [],
          chars: [],
          info: {
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
          },
          common: {
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
          },
          distanceField: { fieldType: '', distanceRange: 0 },
          kernings: [],
        }
      }
      function a() {
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
      function r() {
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
      function o() {
        return { first: 0, second: 0, amount: 0 }
      }
      var s, u
      n.d(e, 'a', function () {
        return i
      }),
        n.d(e, 'b', function () {
          return r
        }),
        n.d(e, 'c', function () {
          return a
        }),
        n.d(e, 'd', function () {
          return o
        }),
        n.d(e, 'e', function () {
          return s
        }),
        n.d(e, 'f', function () {
          return u
        }),
        (function (t) {
          ;(t[(t.Left = 0)] = 'Left'), (t[(t.Center = 1)] = 'Center'), (t[(t.Right = 2)] = 'Right')
        })(s || (s = {})),
        (function (t) {
          ;(t.Pre = 'pre'), (t.NoWrap = 'nowrap')
        })(u || (u = {}))
    },
    226: function (t, e, n) {},
    227: function (t, e, n) {},
    228: function (t, e, n) {
      'use strict'
      n.r(e)
      var i = n(6),
        a = n.n(i),
        r = n(118),
        o = n.n(r),
        s = n(47),
        u = n(14),
        c = function (t) {
          t &&
            t instanceof Function &&
            n
              .e(3)
              .then(n.bind(null, 254))
              .then(function (e) {
                var n = e.getCLS,
                  i = e.getFID,
                  a = e.getFCP,
                  r = e.getLCP,
                  o = e.getTTFB
                n(t), i(t), a(t), r(t), o(t)
              })
        },
        l = n(0),
        h = n(1),
        d = n(2),
        f = n(3),
        p = n(253),
        m = n(251),
        v = n(250),
        g = (n(130), n(11)),
        y = (function (t) {
          Object(d.a)(n, t)
          var e = Object(f.a)(n)
          function n() {
            return Object(l.a)(this, n), e.apply(this, arguments)
          }
          return (
            Object(h.a)(n, [
              {
                key: 'render',
                value: function () {
                  return Object(g.jsx)(p.a, {
                    sx: { width: 160 },
                    className: 'Navigation',
                    children: Object(g.jsxs)(m.a, {
                      dense: !0,
                      children: [
                        Object(g.jsx)(v.a, { component: s.b, to: '/simple', children: 'Simple' }),
                        Object(g.jsx)(v.a, { component: s.b, to: '/shuffle', children: 'Shuffle' }),
                        Object(g.jsx)(v.a, { component: s.b, to: '/shader', children: 'Shader' }),
                        Object(g.jsx)(v.a, {
                          component: s.b,
                          to: '/shuffleshader',
                          children: 'Shuffle and Shader',
                        }),
                      ],
                    }),
                  })
                },
              },
            ]),
            n
          )
        })(a.a.Component),
        x = n(5),
        b = n(4),
        w = n(8),
        _ = n(92),
        k = n(35),
        O =
          (k.e,
          function t(e) {
            Object(l.a)(this, t)
            var n = e || {},
              i = 'number' === typeof n.opacity ? n.opacity : 1,
              a = n.precision || 'highp',
              r = 'number' === typeof n.alphaTest ? n.alphaTest : 1e-4,
              o = n.textures || [],
              s = {}
            o.forEach(function (t, e) {
              s['texture' + e] = { type: 't', value: t }
            })
            var u = o
                .map(function (t, e) {
                  return 'uniform sampler2D texture' + e + ';'
                })
                .join('\n'),
              c = o
                .map(function (t, e) {
                  return [
                    (0 === e ? 'if' : 'else if') + ' (vPage == ' + e + '.0) {',
                    'sampleColor = texture2D(texture' + e + ', vUv);',
                    '}',
                  ].join('\n')
                })
                .join('\n'),
              h = n.color
            delete n.textures, delete n.color, delete n.precision, delete n.opacity
            var d = { attributes: { page: { type: 'f', value: 0 } } }
            ;(0 | (parseInt(k.d, 10) || 0)) >= 72 && (d = void 0)
            var f = 0 === r ? '' : 'if (gl_FragColor.a < '.concat(r, ') discard;'),
              p = Object.assign(
                {
                  uniforms: Object.assign({}, s, {
                    opacity: { type: 'f', value: i },
                    color: { type: 'c', value: h },
                  }),
                  vertexShader:
                    '\n                attribute vec4 position;\n                attribute vec2 uv;\n                attribute float page;\n                uniform mat4 projectionMatrix;\n                uniform mat4 modelViewMatrix;\n                varying vec2 vUv;\n                varying float vPage;\n                void main() {\n                    vUv = uv;\n                    vPage = page;\n                    gl_Position = projectionMatrix * modelViewMatrix * position;\n                }\n                ',
                  fragmentShader: '\n                precision '
                    .concat(
                      a,
                      ' float;\n                uniform float opacity;\n                uniform vec3 color;\n                '
                    )
                    .concat(
                      u,
                      '\n                varying float vPage;\n                varying vec2 vUv;\n                void main() {\n                    vec4 sampleColor = vec4(0.0);\n                    '
                    )
                    .concat(
                      c,
                      '\n                    gl_FragColor = sampleColor * vec4(color, opacity);\n                    '
                    )
                    .concat(f, '\n                }\n                '),
                },
                d,
                n
              )
            ;(this.uniforms = p.uniforms),
              (this.vertexShader = p.vertexShader),
              (this.fragmentShader = p.fragmentShader)
          }),
        j = n(39),
        C = n(20),
        M = (function () {
          function t() {
            Object(l.a)(this, t)
          }
          return (
            Object(h.a)(t, [
              {
                key: 'wrap',
                value: function (t) {
                  var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                  return this.lines(t, e)
                    .map(function (e) {
                      return t.substring(e.start, e.end)
                    })
                    .join('\n')
                },
              },
              {
                key: 'lines',
                value: function (t) {
                  var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    n = { start: void 0, end: void 0, width: void 0, mode: void 0, measure: void 0 }
                  return (
                    (t = t || ''),
                    void 0 !== e.start ? (n.start = Math.max(0, e.start)) : (n.start = 0),
                    void 0 !== e.end ? (n.end = e.end) : (n.end = t.length),
                    void 0 !== e.width ? (n.width = e.width) : (n.width = Number.MAX_VALUE),
                    void 0 !== e.mode && (n.mode = e.mode),
                    (n.measure = e.measure || this.monospace),
                    0 === n.width && n.mode !== C.f.NoWrap
                      ? []
                      : e.mode === C.f.Pre
                      ? this.pre(n.measure, t, n.start, n.end, n.width)
                      : this.greedy(n.measure, t, n.start, n.end, n.width, n.mode)
                  )
                },
              },
              {
                key: 'idxOf',
                value: function (t, e, n, i) {
                  var a = t.indexOf(e, n)
                  return -1 === a || a > i ? i : a
                },
              },
              {
                key: 'isWhitespace',
                value: function (e) {
                  return t.whitespaceRegexp.test(e)
                },
              },
              {
                key: 'pre',
                value: function (e, n, i, a, r) {
                  for (var o = [], s = i, u = i; u < a && u < n.length; u++) {
                    var c = n.charAt(u),
                      l = t.newlineRegexp.test(c)
                    if (l || u === a - 1) {
                      var h = e(n, s, l ? u : u + 1, r)
                      o.push(h), (s = u + 1)
                    }
                  }
                  return o
                },
              },
              {
                key: 'greedy',
                value: function (e, n, i, a, r, o) {
                  var s = [],
                    u = r
                  for (o === C.f.NoWrap && (u = Number.MAX_VALUE); i < a && i < n.length; ) {
                    for (
                      var c = this.idxOf(n, t.newlineChar, i, a);
                      i < c && this.isWhitespace(n.charAt(i));

                    )
                      i++
                    var l = e(n, i, c, u),
                      h = i + (l.end - l.start),
                      d = h + t.newlineChar.length
                    if (h < c) {
                      for (; h > i && !this.isWhitespace(n.charAt(h)); ) h--
                      if (h === i) d > i + t.newlineChar.length && d--, (h = d)
                      else for (d = h; h > i && this.isWhitespace(n.charAt(h - t.newlineChar.length)); ) h--
                    }
                    h >= i && s.push(e(n, i, h, u)), (i = d)
                  }
                  return s
                },
              },
              {
                key: 'monospace',
                value: function (t, e, n, i) {
                  return { start: e, end: e + Math.min(i, n - e), width: 0 }
                },
              },
            ]),
            t
          )
        })()
      ;(M.newlineRegexp = /\n/), (M.whitespaceRegexp = /\s/), (M.newlineChar = '\n')
      var S = (function () {
        function t(e) {
          var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
          if (
            (Object(l.a)(this, t),
            (this._opt = {
              font: void 0,
              letterSpacing: void 0,
              tabSize: void 0,
              lineHeight: void 0,
              align: void 0,
              start: void 0,
              end: void 0,
              width: void 0,
              mode: void 0,
              measure: void 0,
            }),
            (this._fallbackSpaceGlyph = null),
            (this._fallbackTabGlyph = null),
            void 0 === n.font)
          )
            throw new TypeError('Must specify a `font` in options')
          ;(this._opt.font = n.font), this.update(e, n)
        }
        return (
          Object(h.a)(t, [
            {
              key: 'option',
              get: function () {
                return Object(j.a)({}, this._opt)
              },
            },
            {
              key: 'glyphs',
              get: function () {
                var t
                return null !== (t = this._glyphs) && void 0 !== t ? t : []
              },
            },
            {
              key: 'width',
              get: function () {
                var t
                return null !== (t = this._width) && void 0 !== t ? t : 0
              },
            },
            {
              key: 'height',
              get: function () {
                var t
                return null !== (t = this._height) && void 0 !== t ? t : 0
              },
            },
            {
              key: 'descender',
              get: function () {
                var t
                return null !== (t = this._descender) && void 0 !== t ? t : 0
              },
            },
            {
              key: 'ascender',
              get: function () {
                var t
                return null !== (t = this._ascender) && void 0 !== t ? t : 0
              },
            },
            {
              key: 'xHeight',
              get: function () {
                var t
                return null !== (t = this._xHeight) && void 0 !== t ? t : 0
              },
            },
            {
              key: 'baseline',
              get: function () {
                var t
                return null !== (t = this._baseline) && void 0 !== t ? t : 0
              },
            },
            {
              key: 'capHeight',
              get: function () {
                var t
                return null !== (t = this._capHeight) && void 0 !== t ? t : 0
              },
            },
            {
              key: 'lineHeight',
              get: function () {
                var t
                return null !== (t = this._lineHeight) && void 0 !== t ? t : 0
              },
            },
            {
              key: 'toString',
              value: function () {
                return '{\n  glyphs: '
                  .concat(this.glyphs.length, '\n  width: ')
                  .concat(this.width, '\n  height: ')
                  .concat(this.height, '\n  descender: ')
                  .concat(this.descender, '\n  ascender: ')
                  .concat(this.ascender, '\n  xHeight: ')
                  .concat(this.xHeight, '\n  baseline: ')
                  .concat(this.baseline, '\n  capHeight: ')
                  .concat(this.capHeight, '\n  lineHeight: ')
                  .concat(this.lineHeight, '\n}')
              },
            },
            {
              key: 'update',
              value: function (t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                ;(this._glyphs = []),
                  (this._width = 0),
                  (this._height = 0),
                  (this._descender = 0),
                  (this._ascender = 0),
                  (this._xHeight = 0),
                  (this._baseline = 0),
                  (this._capHeight = 0),
                  (this._lineHeight = 0),
                  void 0 !== e.font && (this._opt.font = e.font),
                  void 0 !== e.start ? (this._opt.start = Math.max(0, e.start)) : (this._opt.start = 0),
                  void 0 !== e.end ? (this._opt.end = e.end) : (this._opt.end = t.length),
                  void 0 !== e.width && (this._opt.width = e.width),
                  void 0 !== e.align ? (this._opt.align = e.align) : (this._opt.align = C.e.Left),
                  void 0 !== e.mode && (this._opt.mode = e.mode),
                  void 0 !== e.letterSpacing
                    ? (this._opt.letterSpacing = e.letterSpacing)
                    : (this._opt.letterSpacing = 0),
                  void 0 !== e.lineHeight
                    ? (this._opt.lineHeight = e.lineHeight)
                    : (this._opt.lineHeight = this._opt.font.common.lineHeight),
                  void 0 !== e.tabSize ? (this._opt.tabSize = e.tabSize) : (this._opt.tabSize = 4),
                  (this._opt.measure = this.computeMetrics.bind(this)),
                  this._setupSpaceGlyphs(this._opt.font, this._opt.tabSize)
                var n = this._opt.font,
                  i = new M().lines(t, this._opt),
                  a = this._opt.width || 0,
                  r = i.reduce(function (t, e) {
                    return Math.max(t, e.width, a)
                  }, 0),
                  o = 0,
                  s = 0,
                  u = this._opt.lineHeight,
                  c = n.common.base,
                  l = u - c,
                  h = this._opt.letterSpacing,
                  d = u * i.length - l,
                  f = this._opt.align
                ;(s -= d),
                  (this._width = r),
                  (this._height = d),
                  (this._descender = u - c),
                  (this._baseline = c),
                  (this._xHeight = this.getXHeight(n)),
                  (this._capHeight = this.getCapHeight(n)),
                  (this._lineHeight = u),
                  (this._ascender = u - l - this._xHeight)
                for (var p = 0; p < i.length; p++) {
                  for (var m = i[p], v = m.start, g = m.end, y = m.width, x = void 0, b = v; b < g; b++) {
                    var w = t.charCodeAt(b),
                      _ = this.getGlyph(n, w)
                    if (_) {
                      x && (o += this.getKerning(n, x.id, _.id))
                      var k = o
                      f === C.e.Center ? (k += (r - y) / 2) : f === C.e.Right && (k += r - y),
                        this._glyphs.push({ position: [k, s], data: _, index: b, line: p }),
                        (o += _.xadvance + h),
                        (x = _)
                    }
                  }
                  ;(s += u), (o = 0)
                }
              },
            },
            {
              key: '_setupSpaceGlyphs',
              value: function (e, n) {
                if (
                  ((this._fallbackSpaceGlyph = null),
                  (this._fallbackTabGlyph = null),
                  e.chars && 0 !== e.chars.length)
                ) {
                  var i = this.getGlyphById(e, t.SPACE_ID) || this.getMGlyph(e) || e.chars[0]
                  if (i) {
                    var a = n * i.xadvance
                    ;(this._fallbackSpaceGlyph = Object(j.a)({}, i)),
                      (this._fallbackTabGlyph = Object.assign(Object(j.a)({}, i), {
                        x: 0,
                        y: 0,
                        xadvance: a,
                        id: t.TAB_ID,
                        xoffset: 0,
                        yoffset: 0,
                        width: 0,
                        height: 0,
                      }))
                  }
                }
              },
            },
            {
              key: 'getGlyph',
              value: function (e, n) {
                var i = this.getGlyphById(e, n)
                return (
                  i ||
                  (n === t.TAB_ID
                    ? this._fallbackTabGlyph
                    : n === t.SPACE_ID
                    ? this._fallbackSpaceGlyph
                    : null)
                )
              },
            },
            {
              key: 'computeMetrics',
              value: function (t, e, n, i) {
                var a,
                  r = this._opt.letterSpacing || 0,
                  o = this._opt.font,
                  s = 0,
                  u = 0,
                  c = 0
                if (!o || !o.chars || 0 === o.chars.length) return { start: e, end: e, width: 0 }
                n = Math.min(t.length, n)
                for (var l = e; l < n; l++) {
                  var h = t.charCodeAt(l),
                    d = this.getGlyph(o, h)
                  if (d) {
                    var f = (s += a ? this.getKerning(o, a.id, d.id) : 0) + d.xadvance + r,
                      p = s + d.width
                    if (p >= i || f >= i) break
                    ;(s = f), (u = p), (a = d)
                  }
                  c++
                }
                return a && (u += a.xoffset), { start: e, end: e + c, width: u }
              },
            },
            {
              key: 'getGlyphById',
              value: function (t, e) {
                if (t.chars && 0 !== t.chars.length) {
                  var n = this.findChar(t.chars, e)
                  return n >= 0 ? t.chars[n] : void 0
                }
              },
            },
            {
              key: 'getXHeight',
              value: function (e) {
                for (var n = 0; n < t.X_HEIGHTS.length; n++) {
                  var i = t.X_HEIGHTS[n].charCodeAt(0),
                    a = this.findChar(e.chars, i)
                  if (a >= 0) return e.chars[a].height
                }
                return 0
              },
            },
            {
              key: 'getMGlyph',
              value: function (e) {
                for (var n = 0; n < t.M_WIDTHS.length; n++) {
                  var i = t.M_WIDTHS[n].charCodeAt(0),
                    a = this.findChar(e.chars, i)
                  if (a >= 0) return e.chars[a]
                }
              },
            },
            {
              key: 'getCapHeight',
              value: function (e) {
                for (var n = 0; n < t.CAP_HEIGHTS.length; n++) {
                  var i = t.CAP_HEIGHTS[n].charCodeAt(0),
                    a = this.findChar(e.chars, i)
                  if (a >= 0) return e.chars[a].height
                }
                return 0
              },
            },
            {
              key: 'getKerning',
              value: function (t, e, n) {
                if (!t.kernings || 0 === t.kernings.length) return 0
                for (var i = t.kernings, a = 0; a < i.length; a++) {
                  var r = i[a]
                  if (r.first === e && r.second === n) return r.amount
                }
                return 0
              },
            },
            {
              key: 'findChar',
              value: function (t, e) {
                for (var n = 0; n < t.length; n++) if (t[n].id === e) return n
                return -1
              },
            },
          ]),
          t
        )
      })()
      ;(S.X_HEIGHTS = ['x', 'e', 'a', 'o', 'n', 's', 'r', 'c', 'u', 'm', 'v', 'w', 'z']),
        (S.M_WIDTHS = ['m', 'w']),
        (S.CAP_HEIGHTS = ['H', 'I', 'N', 'E', 'F', 'K', 'L', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']),
        (S.TAB_ID = '\t'.charCodeAt(0)),
        (S.SPACE_ID = ' '.charCodeAt(0))
      var I = n(43),
        T = (function (t) {
          Object(d.a)(n, t)
          var e = Object(f.a)(n)
          function n(t) {
            var i,
              a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
            if (
              (Object(l.a)(this, n),
              ((i = e.call(this))._opt = {
                font: void 0,
                start: void 0,
                end: void 0,
                width: void 0,
                mode: void 0,
                align: void 0,
                letterSpacing: void 0,
                lineHeight: void 0,
                tabSize: void 0,
                flipY: !0,
                multipage: !1,
              }),
              (i._visibleGlyphs = []),
              void 0 === a.font)
            )
              throw new TypeError('Must specify a `font` in options')
            return (i._opt.font = a.font), i.update(t, a), i
          }
          return (
            Object(h.a)(n, [
              {
                key: 'option',
                get: function () {
                  return Object(j.a)({}, this._opt)
                },
              },
              {
                key: 'visibleGlyphs',
                get: function () {
                  return this._visibleGlyphs
                },
              },
              {
                key: 'update',
                value: function (t) {
                  var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                  void 0 !== e.font && (this._opt.font = e.font),
                    void 0 !== e.start ? (this._opt.start = Math.max(0, e.start)) : (this._opt.start = 0),
                    void 0 !== e.end ? (this._opt.end = e.end) : (this._opt.end = t.length),
                    void 0 !== e.width && (this._opt.width = e.width),
                    void 0 !== e.align ? (this._opt.align = e.align) : (this._opt.align = C.e.Left),
                    void 0 !== e.mode && (this._opt.mode = e.mode),
                    void 0 !== e.letterSpacing
                      ? (this._opt.letterSpacing = e.letterSpacing)
                      : (this._opt.letterSpacing = 0),
                    void 0 !== e.lineHeight
                      ? (this._opt.lineHeight = e.lineHeight)
                      : (this._opt.lineHeight = this._opt.font.common.lineHeight),
                    void 0 !== e.tabSize ? (this._opt.tabSize = e.tabSize) : (this._opt.tabSize = 4),
                    void 0 !== e.flipY && (this._opt.flipY = e.flipY),
                    void 0 !== e.multipage && (this._opt.multipage = e.multipage)
                  var n = this._opt.font.common.scaleW,
                    i = this._opt.font.common.scaleH,
                    a = new S(t, this._opt),
                    r = a.glyphs.filter(function (t) {
                      var e = t.data
                      return e.width * e.height > 0
                    })
                  this._visibleGlyphs = r
                  var o = Object(I.f)(r),
                    s = Object(I.g)(r, n, i, this._opt.flipY),
                    u = Object(I.c)([], { clockwise: !0, type: 'uint16', count: r.length })
                  this.setIndex(u),
                    this.setAttribute('position', new k.b(o, 2)),
                    this.setAttribute('uv', new k.b(s, 2)),
                    !this._opt.multipage && 'page' in this.attributes
                      ? this.deleteAttribute('page')
                      : this._opt.multipage && this.setAttribute('page', new k.b(Object(I.e)(r), 1))
                },
              },
              {
                key: 'computeBoundingSphere',
                value: function () {
                  if (
                    (null === this.boundingSphere && (this.boundingSphere = new k.f()),
                    this.attributes.position)
                  ) {
                    var t = this.attributes.position.array,
                      e = this.attributes.position.itemSize
                    if (!t || !e || t.length < 2)
                      return (this.boundingSphere.radius = 0), void this.boundingSphere.center.set(0, 0, 0)
                    Object(I.b)(t, this.boundingSphere),
                      isNaN(this.boundingSphere.radius) &&
                        console.error(
                          'THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.'
                        )
                  }
                },
              },
              {
                key: 'computeBoundingBox',
                value: function () {
                  null === this.boundingBox && (this.boundingBox = new k.a())
                  var t = this.boundingBox
                  if (this.attributes.position) {
                    var e = this.attributes.position.array,
                      n = this.attributes.position.itemSize
                    !e || !n || e.length < 2 ? t.makeEmpty() : Object(I.a)(e, t)
                  }
                },
              },
            ]),
            n
          )
        })(k.c),
        H = n(122),
        E = n(123),
        A =
          (n(226),
          (function (t) {
            Object(d.a)(n, t)
            var e = Object(f.a)(n)
            function n() {
              var t
              Object(l.a)(this, n)
              for (var i = arguments.length, a = new Array(i), r = 0; r < i; r++) a[r] = arguments[r]
              return (
                ((t = e.call.apply(e, [this].concat(a))).stats = void 0),
                (t.controls = void 0),
                (t.divID = 'Demo'),
                (t.renderer = void 0),
                (t.scene = void 0),
                (t.camera = void 0),
                (t.textIndex = 0),
                (t.textList = [
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nNulla enim odio, tincidunt sed fringilla sed, placerat vel lectus.\nDuis non sapien nulla.\nIn convallis nulla nec nulla varius rutrum.\nNunc augue augue, ornare in cursus egestas, cursus vel magna.\nFusce at felis vel tortor sagittis tincidunt nec vitae nisl.\nSed efficitur nibh consequat tortor pulvinar, dignissim tincidunt risus hendrerit.\nSuspendisse quis commodo nulla.\nUt orci urna, mollis non nisl id, molestie tristique purus.\nPhasellus efficitur laoreet eros vehicula convallis.\nSed imperdiet, lectus a facilisis tempus, elit orci varius ante, at lacinia odio massa et quam.\nQuisque vulputate nulla vitae feugiat aliquam.\nVivamus vel mauris sit amet est rhoncus molestie at quis neque.\nDuis faucibus laoreet tempus.\nMaecenas metus velit, lobortis sit amet mauris at, vehicula condimentum velit.\nVestibulum ornare eu turpis vel laoreet.\nNunc ac cursus nunc, non porttitor arcu.',
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nFusce dapibus vehicula semper.\nAliquam pulvinar enim quis tristique tincidunt.\nSed faucibus turpis ipsum, non ultrices odio varius et.\nDonec eget vulputate enim.\nAenean posuere, dolor quis dapibus interdum, ipsum dolor molestie nunc, consequat tincidunt ex leo eu lectus.\nInteger a risus iaculis, facilisis orci ac, maximus augue.\nDonec at feugiat leo, at sollicitudin sapien.\nNullam quis lacus consequat, sodales mi eleifend, efficitur tortor.\nVivamus bibendum ante eu dolor convallis, id blandit felis placerat.\nAliquam maximus at dolor eget facilisis.\nMaecenas aliquam consequat urna eget ullamcorper.',
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nPraesent ac magna id tortor consectetur mattis.\nMauris vel felis a urna suscipit dapibus.\nSuspendisse nec tincidunt nulla.\nCurabitur diam nisl, convallis eu porta id, tristique a nulla.\nVestibulum ultrices rhoncus placerat.\nLorem ipsum dolor sit amet, consectetur adipiscing elit.\nCurabitur egestas, libero id luctus placerat, enim erat sodales ipsum, sed pretium urna ante nec mi.\nMauris justo nulla, vulputate id dui id, molestie fermentum neque.\nNam cursus enim sit amet semper auctor.\nPraesent ultricies tempor fringilla.\nDuis libero eros, dictum at ligula quis, placerat consequat velit.\nEtiam id fringilla neque.',
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nDonec diam odio, efficitur sed efficitur vel, vestibulum vitae odio.\nAliquam semper, sem eget placerat ultricies, ligula sem faucibus magna, ut convallis est purus ac lectus.\nNam quis quam eget augue tristique efficitur nec nec quam.\nQuisque id turpis non magna mattis sagittis.\nInteger efficitur elementum congue.\nCurabitur ullamcorper rutrum orci a volutpat.\nIn quam est, hendrerit id lorem sed, semper eleifend purus.\nCras id sem mauris.',
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nVivamus eu mauris pretium, pellentesque justo at, sodales ligula.\nPraesent vitae dolor porttitor, laoreet metus ut, posuere ligula.\nMauris dolor ante, consectetur eu vulputate eget, tempus in nunc.\nMaecenas bibendum eleifend lacus in sodales.\nAenean mollis lorem a sem ultrices, nec lobortis erat eleifend.\nCurabitur ante eros, porta eget mi a, bibendum luctus ante.\nNulla est purus, posuere at rutrum sit amet, bibendum condimentum elit.\nNunc nec sem enim.',
                ]),
                (t._staticIndex = Math.floor(Math.random() * t.textList.length)),
                (t.fontUri =
                  'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/OdudoMono-Regular-64.json'),
                (t.textureUri = [
                  'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/OdudoMono-Regular-64.png',
                ]),
                (t.font = void 0),
                (t.textures = []),
                (t.textOption = void 0),
                (t.textMesh = void 0),
                (t.animationFrameID = void 0),
                t
              )
            }
            return (
              Object(h.a)(n, [
                {
                  key: 'staticText',
                  value: function () {
                    return this.textList[this._staticIndex]
                  },
                },
                {
                  key: 'randomText',
                  value: function () {
                    var t = Math.floor(Math.random() * this.textList.length)
                    return this.textList[t]
                  },
                },
                {
                  key: 'componentDidMount',
                  value: function () {
                    var t = this
                    this.loadAssets(this.fontUri, this.textureUri)
                      .then(function (e) {
                        e.forEach(function (e) {
                          e instanceof w.o ? t.textures.push(e) : (t.font = e)
                        }),
                          t.assetsDidLoad()
                      })
                      .catch(function (t) {
                        console.error(t)
                      })
                  },
                },
                {
                  key: 'componentWillUnmount',
                  value: function () {
                    cancelAnimationFrame(this.animationFrameID)
                  },
                },
                {
                  key: 'loadAssets',
                  value: function (t, e) {
                    var n,
                      i = e.map(function (t) {
                        return new w.p().loadAsync(t)
                      })
                    return (
                      i.push(
                        (n = t).endsWith('.fnt')
                          ? new _.a().loadAscii(n)
                          : n.endsWith('.json')
                          ? new _.a().loadJson(n)
                          : n.endsWith('.xml')
                          ? new _.a().loadXML(n)
                          : new _.a().loadBinary(n)
                      ),
                      Promise.all(i)
                    )
                  },
                },
                {
                  key: 'assetsDidLoad',
                  value: function () {
                    this.initBaseScene(), this.initScene(), this.updateScene()
                  },
                },
                {
                  key: 'initBaseScene',
                  value: function () {
                    var t
                    ;(this.renderer = new w.s({ alpha: !0 })),
                      this.renderer.setClearColor(0, 0),
                      this.renderer.setPixelRatio(window.devicePixelRatio),
                      this.renderer.setSize(window.innerWidth, window.innerHeight)
                    var e = document.querySelector('#'.concat(this.divID))
                    null === e || void 0 === e || e.append(this.renderer.domElement),
                      (this.stats = Object(H.a)()),
                      null === (t = this.stats) || void 0 === t || t.showPanel(0),
                      document.body.appendChild(this.stats.dom),
                      (this.scene = new w.l()),
                      (this.scene.background = new w.b(0)),
                      (this.scene.fog = new w.e(260, 35e-5)),
                      (this.camera = new w.i(45, window.innerWidth / window.innerHeight, 1, 1e5)),
                      this.camera.position.set(1e3, 1e3, 2e3),
                      this.camera.lookAt(0, 0, 0),
                      (this.controls = new E.a(this.camera, this.renderer.domElement)),
                      this.controls.target.set(0, 0, 0),
                      (this.controls.autoRotate = !0),
                      this.controls.update(),
                      window.addEventListener('resize', this.onWindowResize.bind(this)),
                      window.addEventListener('click', this.onClicked.bind(this))
                  },
                },
                { key: 'initScene', value: function () {} },
                {
                  key: 'updateScene',
                  value: function () {
                    var t, e, n
                    null === (t = this.controls) || void 0 === t || t.update(),
                      null === (e = this.renderer) || void 0 === e || e.render(this.scene, this.camera),
                      null === (n = this.stats) || void 0 === n || n.update(),
                      (this.animationFrameID = requestAnimationFrame(this.updateScene.bind(this)))
                  },
                },
                {
                  key: 'onWindowResize',
                  value: function (t) {
                    var e, n
                    ;(this.camera.aspect = window.innerWidth / window.innerHeight),
                      null === (e = this.camera) || void 0 === e || e.updateProjectionMatrix(),
                      null === (n = this.renderer) ||
                        void 0 === n ||
                        n.setSize(window.innerWidth, window.innerHeight)
                  },
                },
                {
                  key: 'onClicked',
                  value: function (t) {
                    this.controls.autoRotate = !1
                  },
                },
                {
                  key: 'render',
                  value: function () {
                    return Object(g.jsx)('div', { id: this.divID, className: 'Demo' })
                  },
                },
              ]),
              n
            )
          })(a.a.Component)),
        D = (function (t) {
          Object(d.a)(n, t)
          var e = Object(f.a)(n)
          function n() {
            var t
            Object(l.a)(this, n)
            for (var i = arguments.length, a = new Array(i), r = 0; r < i; r++) a[r] = arguments[r]
            return (
              ((t = e.call.apply(e, [this].concat(a))).fontUri =
                'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/OdudoMono-Regular-64-Multipage.json'),
              (t.textureUri = [
                'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/OdudoMono-Regular-64-Multipage-0.png',
                'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/OdudoMono-Regular-64-Multipage-1.png',
                'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/OdudoMono-Regular-64-Multipage-2.png',
              ]),
              t
            )
          }
          return (
            Object(h.a)(n, [
              {
                key: 'componentWillUnmount',
                value: function () {
                  cancelAnimationFrame(this.animationFrameID)
                },
              },
              {
                key: 'initScene',
                value: function () {
                  var t, e
                  Object(x.a)(Object(b.a)(n.prototype), 'initScene', this).call(this),
                    (this.textOption = {
                      font: this.font,
                      align: C.e.Left,
                      width: 1600,
                      flipY: this.textures[0].flipY,
                      multipage: !0,
                    })
                  var i = new T(this.staticText(), this.textOption),
                    a = new w.r()
                  i.computeBoundingBox(), null === (t = i.boundingBox) || void 0 === t || t.getSize(a)
                  var r = new O({
                      textures: this.textures,
                      transparent: !0,
                      opacity: 0.95,
                      alphaTest: 0.5,
                      color: new w.b(6710886),
                    }),
                    o = new w.k(r)
                  ;(o.side = w.c),
                    (this.textMesh = new w.g(i, o)),
                    this.textMesh.scale.multiply(new w.r(1, -1, 1)),
                    this.textMesh.position.set(-a.x / 2, -a.y / 2, 0),
                    null === (e = this.scene) || void 0 === e || e.add(this.textMesh)
                },
              },
            ]),
            n
          )
        })(A),
        F = (function (t) {
          Object(d.a)(n, t)
          var e = Object(f.a)(n)
          function n() {
            var t
            Object(l.a)(this, n)
            for (var i = arguments.length, a = new Array(i), r = 0; r < i; r++) a[r] = arguments[r]
            return (
              ((t = e.call.apply(e, [this].concat(a))).fontUri =
                'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/Lato-Regular-64.fnt'),
              (t.textureUri = [
                'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/lato.png',
              ]),
              t
            )
          }
          return (
            Object(h.a)(n, [
              {
                key: 'initScene',
                value: function () {
                  var t, e
                  Object(x.a)(Object(b.a)(n.prototype), 'initScene', this).call(this),
                    (this.textOption = {
                      font: this.font,
                      align: C.e.Left,
                      width: 1600,
                      flipY: this.textures[0].flipY,
                    })
                  var i = new T(this.randomText(), this.textOption),
                    a = new w.r()
                  i.computeBoundingBox(), null === (t = i.boundingBox) || void 0 === t || t.getSize(a)
                  var r = new w.h({ map: this.textures[0], side: w.c, transparent: !0, color: 6710886 })
                  ;(this.textMesh = new w.g(i, r)),
                    this.textMesh.scale.multiply(new w.r(1, -1, 1)),
                    this.textMesh.position.set(-a.x / 2, -a.y / 2, 0),
                    null === (e = this.scene) || void 0 === e || e.add(this.textMesh)
                },
              },
            ]),
            n
          )
        })(A),
        B = n(16),
        L = n(78),
        U = (function () {
          function t() {
            Object(l.a)(this, t)
          }
          return (
            Object(h.a)(t, null, [
              {
                key: 'linear',
                value: function (t, e, n, i) {
                  return e + ((n - e) / i) * t
                },
              },
              {
                key: 'easeInQuad',
                value: function (t, e, n, i) {
                  return (n - e) * (t /= i) + e
                },
              },
              {
                key: 'easeOutQuad',
                value: function (t, e, n, i) {
                  return -(n - e) * (t /= i) * (t - 2) + e
                },
              },
              {
                key: 'easeInOutQuad',
                value: function (t, e, n, i) {
                  var a = n - e
                  return (t /= i / 2) < 1 ? (a / 2) * t * t + e : (-a / 2) * (--t * (t - 2) - 1) + e
                },
              },
              {
                key: 'easeInCubic',
                value: function (t, e, n, i) {
                  return (n - e) * (t /= i) * t * t + e
                },
              },
              {
                key: 'easeOutCubic',
                value: function (t, e, n, i) {
                  return (n - e) * ((t = t / i - 1) * t * t + 1) + e
                },
              },
              {
                key: 'easeInOutCubic',
                value: function (t, e, n, i) {
                  var a = n - e
                  return (t /= i / 2) < 1 ? (a / 2) * t * t * t + e : (a / 2) * ((t -= 2) * t * t + 2) + e
                },
              },
              {
                key: 'easeInQuart',
                value: function (t, e, n, i) {
                  return (n - e) * (t /= i) * t * t * t + e
                },
              },
              {
                key: 'easeOutQuart',
                value: function (t, e, n, i) {
                  return -(n - e) * ((t = t / i - 1) * t * t * t - 1) + e
                },
              },
              {
                key: 'easeInOutQuart',
                value: function (t, e, n, i) {
                  var a = n - e
                  return (t /= i / 2) < 1
                    ? (a / 2) * t * t * t * t + e
                    : (-a / 2) * ((t -= 2) * t * t * t - 2) + e
                },
              },
              {
                key: 'easeInQuint',
                value: function (t, e, n, i) {
                  return (n - e) * (t /= i) * t * t * t * t + e
                },
              },
              {
                key: 'easeOutQuint',
                value: function (t, e, n, i) {
                  return (n - e) * ((t = t / i - 1) * t * t * t * t + 1) + e
                },
              },
              {
                key: 'easeInOutQuint',
                value: function (t, e, n, i) {
                  var a = n - e
                  return (t /= i / 2) < 1
                    ? (a / 2) * t * t * t * t * t + e
                    : (a / 2) * ((t -= 2) * t * t * t * t + 2) + e
                },
              },
              {
                key: 'easeInSine',
                value: function (t, e, n, i) {
                  var a = n - e
                  return -a * Math.cos((t / i) * (Math.PI / 2)) + a + e
                },
              },
              {
                key: 'easeOutSine',
                value: function (t, e, n, i) {
                  return (n - e) * Math.sin((t / i) * (Math.PI / 2)) + e
                },
              },
              {
                key: 'easeInOutSine',
                value: function (t, e, n, i) {
                  return (-(n - e) / 2) * (Math.cos((Math.PI * t) / i) - 1) + e
                },
              },
              {
                key: 'easeInExpo',
                value: function (t, e, n, i) {
                  return 0 === t ? e : (n - e) * Math.pow(2, 10 * (t / i - 1)) + e
                },
              },
              {
                key: 'easeOutExpo',
                value: function (t, e, n, i) {
                  var a = n - e
                  return t === i ? e + a : a * (1 - Math.pow(2, (-10 * t) / i)) + e
                },
              },
              {
                key: 'easeInOutExpo',
                value: function (t, e, n, i) {
                  var a = n - e
                  return 0 === t
                    ? e
                    : t === i
                    ? e + a
                    : (t /= i / 2) < 1
                    ? (a / 2) * Math.pow(2, 10 * (t - 1)) + e
                    : (a / 2) * (2 - Math.pow(2, -10 * --t)) + e
                },
              },
              {
                key: 'easeInCirc',
                value: function (t, e, n, i) {
                  return -(n - e) * (Math.sqrt(1 - (t /= i) * t) - 1) + e
                },
              },
              {
                key: 'easeOutCirc',
                value: function (t, e, n, i) {
                  return (n - e) * Math.sqrt(1 - (t = t / i - 1) * t) + e
                },
              },
              {
                key: 'easeInOutCirc',
                value: function (t, e, n, i) {
                  var a = n - e
                  return (t /= i / 2) < 1
                    ? (-a / 2) * (Math.sqrt(1 - t * t) - 1) + e
                    : (a / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + e
                },
              },
              {
                key: 'easeInElastic',
                value: function (t, e, n, i) {
                  var a = n - e,
                    r = 1.70158,
                    o = 0,
                    s = a
                  return 0 === t
                    ? e
                    : 1 === (t /= i)
                    ? e + a
                    : (o || (o = 0.3 * i),
                      s < Math.abs(a) ? ((s = a), (r = o / 4)) : (r = (o / (2 * Math.PI)) * Math.asin(a / s)),
                      -s * Math.pow(2, 10 * (t -= 1)) * Math.sin(((t * i - r) * (2 * Math.PI)) / o) + e)
                },
              },
              {
                key: 'easeOutElastic',
                value: function (t, e, n, i) {
                  var a = n - e,
                    r = 1.70158,
                    o = 0,
                    s = a
                  return 0 === t
                    ? e
                    : 1 === (t /= i)
                    ? e + a
                    : (o || (o = 0.3 * i),
                      s < Math.abs(a) ? ((s = a), (r = o / 4)) : (r = (o / (2 * Math.PI)) * Math.asin(a / s)),
                      s * Math.pow(2, -10 * t) * Math.sin(((t * i - r) * (2 * Math.PI)) / o) + a + e)
                },
              },
              {
                key: 'easeInOutElastic',
                value: function (t, e, n, i) {
                  var a = n - e,
                    r = 1.70158,
                    o = 0,
                    s = a
                  return 0 === t
                    ? e
                    : 2 === (t /= i / 2)
                    ? e + a
                    : (o || (o = i * (0.3 * 1.5)),
                      s < Math.abs(a) ? ((s = a), (r = o / 4)) : (r = (o / (2 * Math.PI)) * Math.asin(a / s)),
                      t < 1
                        ? s *
                            Math.pow(2, 10 * (t -= 1)) *
                            Math.sin(((t * i - r) * (2 * Math.PI)) / o) *
                            -0.5 +
                          e
                        : s *
                            Math.pow(2, -10 * (t -= 1)) *
                            Math.sin(((t * i - r) * (2 * Math.PI)) / o) *
                            0.5 +
                          a +
                          e)
                },
              },
              {
                key: 'easeInBounce',
                value: function (t, e, n, i) {
                  var a = n - e
                  return a - this.easeOutBounce(i - t, 0, a, i) + e
                },
              },
              {
                key: 'easeOutBounce',
                value: function (t, e, n, i) {
                  var a = n - e
                  return (t /= i) < 1 / 2.75
                    ? a * (7.5625 * t * t) + e
                    : t < 2 / 2.75
                    ? a * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + e
                    : t < 2.5 / 2.75
                    ? a * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + e
                    : a * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + e
                },
              },
              {
                key: 'easeInOutBounce',
                value: function (t, e, n, i) {
                  var a = n - e
                  return t < i / 2
                    ? 0.5 * this.easeInBounce(2 * t, 0, a, i) + e
                    : 0.5 * this.easeOutBounce(2 * t - i, 0, a, i) + 0.5 * a + e
                },
              },
            ]),
            t
          )
        })()
      function P(t, e) {
        return t + Math.random() * (e - t)
      }
      var z,
        N = (function (t) {
          Object(d.a)(n, t)
          var e = Object(f.a)(n)
          function n() {
            var t,
              i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0
            Object(l.a)(this, n)
            var a = i || 'Failed to parse data'
            return (
              ((t = e.call(this, a)).name = 'BMFontError'),
              Object.setPrototypeOf(Object(B.a)(t), n.prototype),
              t
            )
          }
          return n
        })(Object(L.a)(Error))
      !(function (t) {
        ;(t[(t.Idle = 0)] = 'Idle'),
          (t[(t.Updating = 1)] = 'Updating'),
          (t[(t.Cancelled = 2)] = 'Cancelled'),
          (t[(t.Completed = 3)] = 'Completed')
      })(z || (z = {}))
      var q = (function () {
          function t(e, n, i, a) {
            Object(l.a)(this, t),
              (this.index = void 0),
              (this.originalChar = void 0),
              (this.currentChar = void 0),
              (this.shuffleText = void 0),
              (this.ignoreRegex = void 0),
              (this.delay = void 0),
              (this.shuffleDuration = void 0),
              (this.fadeDuration = void 0),
              (this.interval = void 0),
              (this.timeUpdated = 0),
              (this.opacity = 0),
              (this.state = z.Idle),
              (this.onCharStateChanged = void 0),
              (this.index = e),
              (this.originalChar = n),
              (this.shuffleText =
                n === n.toLowerCase() ? i.shuffleText.toLocaleLowerCase() : i.shuffleText.toUpperCase()),
              (this.ignoreRegex = i.ignoreRegex || /\s|\t|\n|\r|(\n\r)/),
              (this.delay = P(i.delay.min, i.delay.max)),
              (this.fadeDuration = P(i.fadeDuration.min, i.fadeDuration.max)),
              (this.shuffleDuration = P(i.shuffleDuration.min, i.shuffleDuration.max)),
              (this.interval = P(i.interval.min, i.interval.max)),
              (this.onCharStateChanged = a),
              this.ignoreRegex.test(this.originalChar)
                ? (this.currentChar = this.originalChar)
                : (this.currentChar = this.shuffleText.charAt(
                    Math.floor(Math.random() * this.shuffleText.length)
                  ))
          }
          return (
            Object(h.a)(t, [
              {
                key: 'start',
                value: function (t) {
                  ;(this.state = z.Updating), this.update(t)
                },
              },
              {
                key: 'update',
                value: function (t) {
                  if (!(t < this.delay) && !(t - this.timeUpdated < this.interval)) {
                    var e = t - this.delay
                    switch (this.state) {
                      case z.Idle:
                        break
                      case z.Updating:
                        if (this.ignoreRegex.test(this.originalChar))
                          return void (this.currentChar = this.originalChar)
                        e < this.shuffleDuration
                          ? (this.currentChar = this.shuffleText.charAt(
                              Math.floor(Math.random() * this.shuffleText.length)
                            ))
                          : (this.currentChar = this.originalChar),
                          e < this.fadeDuration && (this.opacity = U.linear(e, 0, 1, this.fadeDuration)),
                          e >= this.fadeDuration && e >= this.fadeDuration
                            ? (this.state = z.Completed)
                            : this.onCharStateChanged(this.index, this.state)
                        break
                      case z.Cancelled:
                        break
                      case z.Completed:
                        ;(this.currentChar = this.originalChar),
                          (this.opacity = 1),
                          this.onCharStateChanged(this.index, this.state)
                    }
                    this.timeUpdated = t
                  }
                },
              },
              {
                key: 'cancel',
                value: function () {
                  ;(this.state = z.Cancelled), this.onCharStateChanged(this.index, this.state)
                },
              },
            ]),
            t
          )
        })(),
        G = (function () {
          function t(e, n, i) {
            if (
              (Object(l.a)(this, t),
              (this._originalText = ''),
              (this._currentText = ''),
              (this._chars = []),
              (this._timeStart = void 0),
              (this._numCompleted = 0),
              (this._animationFrame = -1),
              (this._state = z.Idle),
              (this._textStateHandler = void 0),
              0 === e.length)
            )
              throw new N('The `text` argument must not be empty.')
            if (0 === n.shuffleText.length) throw new N('The `option.delay.shuffleText` must not be empty.')
            if (n.delay.min > n.delay.max)
              throw new N('The `option.delay.max` must be greater than or equal to `option.delay.min`.')
            if (n.fadeDuration.min > n.fadeDuration.max)
              throw new N(
                'The `option.fadeDuration.max` must be greater than or equal to `option.fadeDuration.min`.'
              )
            if (n.shuffleDuration.min > n.shuffleDuration.max)
              throw new N(
                'The `option.shuffleDuration.max` must be greater than or equal to `option.shuffleDuration.min`.'
              )
            if (n.interval.min > n.interval.max)
              throw new N('The `option.interval.max` must be greater than or equal to `option.interval.min`.')
            ;(this._originalText = e),
              (this._currentText = ''),
              (n.shuffleText = n.shuffleText
                .split('')
                .filter(function (t, e, n) {
                  return n.indexOf(t) === e
                })
                .join('')
                .replaceAll(/\s|\t|\n|\r|(\n\r)/gi, '')),
              (this._textStateHandler = i)
            for (var a = this._originalText.split(''), r = 0; r < a.length; r++) {
              var o = a[r],
                s = new q(r, o, n, this._onCharStateChanged.bind(this))
              this._chars.push(s)
            }
          }
          return (
            Object(h.a)(t, [
              {
                key: 'originalText',
                get: function () {
                  return this._originalText
                },
              },
              {
                key: 'currentText',
                get: function () {
                  return this._currentText
                },
              },
              {
                key: 'state',
                get: function () {
                  return this._state
                },
              },
              {
                key: 'start',
                value: function () {
                  if (this._state === z.Idle) {
                    ;(this._state = z.Updating), (this._timeStart = performance.now())
                    for (var t = 0; t < this._chars.length; t++) this._chars[t].start(0)
                    this._update()
                  }
                },
              },
              {
                key: '_update',
                value: function () {
                  if (this._state === z.Updating) {
                    for (var t = performance.now() - this._timeStart, e = 0; e < this._chars.length; e++)
                      this._chars[e].update(t)
                    ;(this._currentText = this._chars
                      .map(function (t) {
                        return t.currentChar
                      })
                      .join('')),
                      this._state === z.Updating &&
                        (this._textStateHandler(this.currentText, this._state),
                        (this._animationFrame = requestAnimationFrame(this._update.bind(this))))
                  }
                },
              },
              {
                key: 'cancel',
                value: function () {
                  if (this._state === z.Updating) {
                    this._state = z.Cancelled
                    for (var t = 0; t < this._chars.length; t++) this._chars[t].cancel()
                    ;(this._currentText = this._chars
                      .map(function (t) {
                        return t.currentChar
                      })
                      .join('')),
                      this._textStateHandler(this.currentText, this._state),
                      cancelAnimationFrame(this._animationFrame)
                  }
                },
              },
              {
                key: '_onCharStateChanged',
                value: function (t, e) {
                  switch (e) {
                    case z.Idle:
                    case z.Updating:
                    case z.Cancelled:
                      break
                    case z.Completed:
                      if (this._state !== z.Updating) return
                      this._numCompleted++,
                        this._chars.length <= this._numCompleted &&
                          (cancelAnimationFrame(this._animationFrame),
                          (this._chars = []),
                          (this._currentText = this._originalText),
                          (this._state = z.Completed),
                          this._textStateHandler(this.currentText, this._state))
                  }
                },
              },
            ]),
            t
          )
        })(),
        R = (function (t) {
          Object(d.a)(n, t)
          var e = Object(f.a)(n)
          function n() {
            var t
            Object(l.a)(this, n)
            for (var i = arguments.length, a = new Array(i), r = 0; r < i; r++) a[r] = arguments[r]
            return (
              ((t = e.call.apply(e, [this].concat(a))).shuffleTimeoutID = void 0), (t.shuffle = void 0), t
            )
          }
          return (
            Object(h.a)(n, [
              {
                key: 'componentWillUnmount',
                value: function () {
                  var t
                  null === (t = this.shuffle) || void 0 === t || t.cancel(),
                    clearTimeout(this.shuffleTimeoutID),
                    cancelAnimationFrame(this.animationFrameID)
                },
              },
              {
                key: 'initScene',
                value: function () {
                  var t, e
                  Object(x.a)(Object(b.a)(n.prototype), 'initScene', this).call(this),
                    (this.textOption = {
                      font: this.font,
                      align: C.e.Left,
                      width: 1600,
                      flipY: this.textures[0].flipY,
                    })
                  var i = new T(this.staticText(), this.textOption),
                    a = new w.r()
                  i.computeBoundingBox(), null === (t = i.boundingBox) || void 0 === t || t.getSize(a)
                  var r = new w.h({ map: this.textures[0], side: w.c, transparent: !0, color: 6710886 })
                  ;(this.textMesh = new w.g(i, r)),
                    this.textMesh.scale.multiply(new w.r(1, -1, 1)),
                    this.textMesh.position.set(-a.x / 2, -a.y / 2, 0),
                    null === (e = this.scene) || void 0 === e || e.add(this.textMesh),
                    this.shuffleText(1e3)
                },
              },
              {
                key: 'shuffleText',
                value: function (t) {
                  var e,
                    n = this,
                    i = this
                  null === (e = this.shuffle) || void 0 === e || e.cancel(),
                    (this.shuffle = new G(
                      this.staticText(),
                      {
                        shuffleText: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
                        ignoreRegex: /\s|\t|\n|\r|(\n\r|\.|,)/,
                        delay: { min: 0, max: 0 },
                        fadeDuration: { min: 500, max: 700 },
                        shuffleDuration: { min: 1e3, max: 2e3 },
                        interval: { min: 20, max: 40 },
                      },
                      function (t, e) {
                        var a
                        ;(null === (a = n.textMesh) || void 0 === a ? void 0 : a.geometry).update(t),
                          e === z.Completed && i.shuffleText(3e3)
                      }
                    )),
                    clearTimeout(this.shuffleTimeoutID),
                    (this.shuffleTimeoutID = setTimeout(function () {
                      var t
                      null === (t = i.shuffle) || void 0 === t || t.start()
                    }, t))
                },
              },
            ]),
            n
          )
        })(A),
        W =
          '\n#extension GL_OES_standard_derivatives : enable\nprecision highp float;\n\nuniform float opacity;\nuniform vec3 color;\nuniform sampler2D map;\nuniform float iGlobalTime;\nuniform float animate;\nvarying vec2 vUv;\nvarying float vLine;\n\n'
            .concat(
              '\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x) {\n     return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g;\n  vec3 i1 = min( g.xyz, l.zxy );\n  vec3 i2 = max( g.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289(i);\n  vec4 p = permute( permute( permute(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D.wyz - D.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1.xy,h.z);\n  vec3 p3 = vec3(a1.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n\n',
              '\n'
            )
            .concat(
              '\nfloat aastep(float threshold, float value) {\n    #ifdef GL_OES_standard_derivatives\n    float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;\n    return smoothstep(threshold-afwidth, threshold+afwidth, value);\n    #else\n    return step(threshold, value);\n    #endif\n}\n',
              '\n\nvoid main() {\n  vec4 texColor = texture2D(map, vUv);\n  float sdf = texColor.a;\n  \n  float alpha = 0.0;\n  float animValue = pow(abs(animate * 2.0 - 1.0), 12.0 - vLine * 5.0);\n  float threshold = animValue * 0.5 + 0.5;\n  float mult = 3.0;\n  alpha += 0.15 * aastep(threshold, sdf + 0.4 * snoise(vec3(vUv * 10.0, iGlobalTime)) * mult);\n  alpha += 0.35 * aastep(threshold, sdf + 0.1 * snoise(vec3(vUv * 50.0, iGlobalTime)) * mult);\n  alpha += 0.15 * aastep(threshold, sdf);\n\n  gl_FragColor = vec4(color, alpha);\n}\n'
            ),
        Y =
          '\nattribute vec4 position;\nattribute vec2 uv;\nattribute float line;\nuniform mat4 projectionMatrix;\nuniform mat4 modelViewMatrix;\nvarying vec2 vUv;\nvarying float vLine;\n\nvoid main() {\n  vLine = line;\n  vUv = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * position;\n}\n',
        J = (function (t) {
          Object(d.a)(n, t)
          var e = Object(f.a)(n)
          function n() {
            var t
            Object(l.a)(this, n)
            for (var i = arguments.length, a = new Array(i), r = 0; r < i; r++) a[r] = arguments[r]
            return (
              ((t = e.call.apply(e, [this].concat(a))).swapTimeoutID = void 0),
              (t.time = 0),
              (t.textMaterial = void 0),
              (t.clock = new w.a()),
              t
            )
          }
          return (
            Object(h.a)(n, [
              {
                key: 'componentWillUnmount',
                value: function () {
                  var t
                  clearTimeout(this.swapTimeoutID),
                    cancelAnimationFrame(this.animationFrameID),
                    null === (t = this.clock) || void 0 === t || t.stop()
                },
              },
              {
                key: 'initScene',
                value: function () {
                  var t, e
                  Object(x.a)(Object(b.a)(n.prototype), 'initScene', this).call(this),
                    (this.textOption = {
                      font: this.font,
                      align: C.e.Left,
                      width: 1600,
                      flipY: this.textures[0].flipY,
                    })
                  var i = new T(this.staticText(), this.textOption),
                    a = new w.r()
                  i.computeBoundingBox(),
                    null === (t = i.boundingBox) || void 0 === t || t.getSize(a),
                    (this.textMaterial = new w.k({
                      vertexShader: Y,
                      fragmentShader: W,
                      uniforms: {
                        animate: { value: 1 },
                        iGlobalTime: { value: 0 },
                        map: { value: this.textures[0] },
                        color: { value: new w.b(6710886) },
                      },
                      transparent: !0,
                      side: w.c,
                      depthTest: !1,
                    })),
                    (this.textMaterial.side = w.c),
                    (this.textMesh = new w.g(i, this.textMaterial)),
                    this.textMesh.scale.multiply(new w.r(1, -1, 1)),
                    this.textMesh.position.set(-a.x / 2, -a.y / 2, 0),
                    null === (e = this.scene) || void 0 === e || e.add(this.textMesh),
                    this.clock.start()
                },
              },
              {
                key: 'updateScene',
                value: function () {
                  var t = this.clock.getDelta()
                  this.time += t
                  var e = this.textMaterial
                  ;(e.uniforms.iGlobalTime.value = this.time),
                    (e.uniforms.animate.value = this.time / 3),
                    (e.needsUpdate = !0),
                    this.time > 3 && ((this.time = 0), this.swapText()),
                    Object(x.a)(Object(b.a)(n.prototype), 'updateScene', this).call(this)
                },
              },
              {
                key: 'swapText',
                value: function () {
                  var t, e
                  ;(null === (t = this.textMesh) || void 0 === t ? void 0 : t.geometry).update(
                    this.randomText()
                  )
                  var n = new w.r()
                  this.textMesh.geometry.computeBoundingBox(),
                    null === (e = this.textMesh.geometry.boundingBox) || void 0 === e || e.getSize(n),
                    this.textMesh.position.set(-n.x / 2, -n.y / 2, 0)
                },
              },
            ]),
            n
          )
        })(A),
        V = (function (t) {
          Object(d.a)(n, t)
          var e = Object(f.a)(n)
          function n() {
            var t
            Object(l.a)(this, n)
            for (var i = arguments.length, a = new Array(i), r = 0; r < i; r++) a[r] = arguments[r]
            return (
              ((t = e.call.apply(e, [this].concat(a))).shuffle = void 0),
              (t.swapTimeoutID = void 0),
              (t.time = 0),
              (t.textMaterial = void 0),
              (t.clock = new w.a()),
              t
            )
          }
          return (
            Object(h.a)(n, [
              {
                key: 'componentWillUnmount',
                value: function () {
                  var t
                  null === (t = this.shuffle) || void 0 === t || t.cancel(),
                    cancelAnimationFrame(this.animationFrameID)
                },
              },
              {
                key: 'initScene',
                value: function () {
                  var t, e
                  Object(x.a)(Object(b.a)(n.prototype), 'initScene', this).call(this),
                    (this.textOption = {
                      font: this.font,
                      align: C.e.Left,
                      width: 1600,
                      flipY: this.textures[0].flipY,
                    })
                  var i = new T(this.staticText(), this.textOption),
                    a = new w.r()
                  i.computeBoundingBox(),
                    null === (t = i.boundingBox) || void 0 === t || t.getSize(a),
                    (this.textMaterial = new w.k({
                      vertexShader: Y,
                      fragmentShader: W,
                      uniforms: {
                        animate: { value: 1 },
                        iGlobalTime: { value: 0 },
                        map: { value: this.textures[0] },
                        color: { value: new w.b(6710886) },
                      },
                      transparent: !0,
                      side: w.c,
                      depthTest: !1,
                    })),
                    (this.textMaterial.side = w.c),
                    (this.textMesh = new w.g(i, this.textMaterial)),
                    this.textMesh.scale.multiply(new w.r(1, -1, 1)),
                    this.textMesh.position.set(-a.x / 2, -a.y / 2, 0),
                    null === (e = this.scene) || void 0 === e || e.add(this.textMesh),
                    this.clock.start()
                },
              },
              {
                key: 'updateScene',
                value: function () {
                  var t = this.clock.getDelta()
                  this.time += t
                  var e = this.textMaterial
                  ;(e.uniforms.iGlobalTime.value = this.time),
                    (e.uniforms.animate.value = this.time / 5),
                    (e.needsUpdate = !0),
                    this.time > 5 && ((this.time = 0), this.shuffleText()),
                    Object(x.a)(Object(b.a)(n.prototype), 'updateScene', this).call(this)
                },
              },
              {
                key: 'shuffleText',
                value: function () {
                  var t,
                    e,
                    n,
                    i = this
                  null === (t = this.shuffle) || void 0 === t || t.cancel(),
                    (this.shuffle = new G(
                      this.staticText(),
                      {
                        shuffleText: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
                        ignoreRegex: /\s|\t|\n|\r|(\n\r|\.|,)/,
                        delay: { min: 0, max: 0 },
                        fadeDuration: { min: 500, max: 700 },
                        shuffleDuration: { min: 1e3, max: 2500 },
                        interval: { min: 20, max: 60 },
                      },
                      function (t, e) {
                        var n
                        ;(null === (n = i.textMesh) || void 0 === n ? void 0 : n.geometry).update(t)
                      }
                    )),
                    null === (e = this.shuffle) || void 0 === e || e.cancel(),
                    null === (n = this.shuffle) || void 0 === n || n.start()
                },
              },
            ]),
            n
          )
        })(A)
      n(227)
      o.a.render(
        Object(g.jsx)(a.a.StrictMode, {
          children: Object(g.jsxs)(s.a, {
            children: [
              Object(g.jsx)(y, {}),
              Object(g.jsxs)(u.d, {
                children: [
                  Object(g.jsx)(u.b, { path: '*', element: Object(g.jsx)(u.a, { to: '/simple' }) }),
                  Object(g.jsx)(u.b, { path: '/simple', element: Object(g.jsx)(F, {}) }),
                  Object(g.jsx)(u.b, { path: '/multipage', element: Object(g.jsx)(D, {}) }),
                  Object(g.jsx)(u.b, { path: '/shuffle', element: Object(g.jsx)(R, {}) }),
                  Object(g.jsx)(u.b, { path: '/shader', element: Object(g.jsx)(J, {}) }),
                  Object(g.jsx)(u.b, { path: '/shuffleshader', element: Object(g.jsx)(V, {}) }),
                ],
              }),
            ],
          }),
        }),
        document.getElementById('root')
      ),
        c()
    },
    43: function (t, e, n) {
      'use strict'
      function i(t) {
        var e = { min: [0, 0], max: [0, 0] }
        if (!t[0] || !t[1]) return e
        var n = t.length / 2
        ;(e.min[0] = t[0]), (e.min[1] = t[1]), (e.max[0] = t[0]), (e.max[1] = t[1])
        for (var i = 0; i < n; i++) {
          var a = t[2 * i + 0],
            r = t[2 * i + 1]
          a &&
            r &&
            ((e.min[0] = Math.min(a, e.min[0])),
            (e.min[1] = Math.min(r, e.min[1])),
            (e.max[0] = Math.max(a, e.max[0])),
            (e.max[1] = Math.max(r, e.max[1])))
        }
        return e
      }
      function a(t, e) {
        var n = i(t)
        n.min[0] &&
          n.min[1] &&
          n.max[0] &&
          n.max[1] &&
          (e.min.set(n.min[0], n.min[1], 0), e.max.set(n.max[0], n.max[1], 0))
      }
      function r(t, e) {
        var n = i(t)
        if (n.min[0] && n.min[1] && n.max[0] && n.max[1]) {
          var a = n.min[0],
            r = n.min[1],
            o = n.max[0] - a,
            s = n.max[1] - r,
            u = Math.sqrt(o * o + s * s)
          e.center.set(a + o / 2, r + s / 2, 0), (e.radius = u / 2)
        }
      }
      function o(t) {
        var e = new Float32Array(4 * t.length * 1),
          n = 0
        return (
          t.forEach(function (t) {
            var i = t.data.page || 0
            ;(e[n++] = i), (e[n++] = i), (e[n++] = i), (e[n++] = i)
          }),
          e
        )
      }
      function s(t, e, n, i) {
        var a = new Float32Array(4 * t.length * 2),
          r = 0
        return (
          t.forEach(function (t) {
            var o = t.data,
              s = o.x + o.width,
              u = o.y + o.height,
              c = o.x / e,
              l = o.y / n,
              h = s / e,
              d = u / n
            i && ((l = (n - o.y) / n), (d = (n - u) / n)),
              (a[r++] = c),
              (a[r++] = l),
              (a[r++] = c),
              (a[r++] = d),
              (a[r++] = h),
              (a[r++] = d),
              (a[r++] = h),
              (a[r++] = l)
          }),
          a
        )
      }
      function u(t) {
        var e = new Float32Array(4 * t.length * 2),
          n = 0
        return (
          t.forEach(function (t) {
            var i = t.data,
              a = t.position[0] + i.xoffset,
              r = t.position[1] + i.yoffset,
              o = i.width,
              s = i.height
            ;(e[n++] = a),
              (e[n++] = r),
              (e[n++] = a),
              (e[n++] = r + s),
              (e[n++] = a + o),
              (e[n++] = r + s),
              (e[n++] = a + o),
              (e[n++] = r)
          }),
          e
        )
      }
      function c(t) {
        switch (t) {
          case 'int8':
            return Int8Array
          case 'int16':
            return Int16Array
          case 'int32':
            return Int32Array
          case 'uint8':
            return Uint8Array
          case 'uint16':
            return Uint16Array
          case 'uint32':
            return Uint32Array
          case 'float32':
            return Float32Array
          case 'float64':
            return Float64Array
          case 'uint8_clamped':
            return Uint8ClampedArray
          case 'array':
            return Array
        }
      }
      n.d(e, 'a', function () {
        return a
      }),
        n.d(e, 'b', function () {
          return r
        }),
        n.d(e, 'e', function () {
          return o
        }),
        n.d(e, 'f', function () {
          return u
        }),
        n.d(e, 'g', function () {
          return s
        }),
        n.d(e, 'd', function () {
          return c
        }),
        n.d(e, 'c', function () {
          return l.a
        })
      var l = n(117)
    },
    65: function (t, e, n) {
      'use strict'
      n.d(e, 'b', function () {
        return s
      }),
        n.d(e, 'c', function () {
          return h
        }),
        n.d(e, 'd', function () {
          return f
        }),
        n.d(e, 'a', function () {
          return p
        })
      var i = n(0),
        a = n(1),
        r = n(12),
        o = n(20),
        s = (function () {
          function t() {
            Object(i.a)(this, t)
          }
          return (
            Object(a.a)(t, [
              {
                key: 'parse',
                value: function (e) {
                  if (e.length < 6) throw new r.a(r.b.ParseError, 'Invalid buffer length for BMFont')
                  if (
                    !t.HEADER.every(function (t, n) {
                      return e.readUInt8(n) === t
                    })
                  )
                    throw new r.a(r.b.ParseError, 'BMFont missing BMF byte header')
                  var n = 3
                  if (e.readUInt8(n++) > 3)
                    throw new r.a(r.b.ParseError, 'Only supports BMFont Binary v3 (BMFont App v1.10)')
                  for (var i = Object(o.a)(), a = 0; a < 5; a++) n += this.readBlock(i, e, n)
                  return i
                },
              },
              {
                key: 'readBlock',
                value: function (t, e, n) {
                  if (n > e.length - 1) return 0
                  var i = e.readUInt8(n++),
                    a = e.readInt32LE(n)
                  switch (((n += 4), i)) {
                    case 1:
                      t.info = this.readInfo(e, n)
                      break
                    case 2:
                      t.common = this.readCommon(e, n)
                      break
                    case 3:
                      t.pages = this.readPages(e, n, a)
                      break
                    case 4:
                      t.chars = this.readChars(e, n, a)
                      break
                    case 5:
                      t.kernings = this.readKernings(e, n, a)
                  }
                  return 5 + a
                },
              },
              {
                key: 'readInfo',
                value: function (t, e) {
                  var n = Object(o.c)()
                  n.size = t.readInt16LE(e)
                  var i = t.readUInt8(e + 2)
                  return (
                    (n.smooth = (i >> 7) & 1),
                    (n.unicode = (i >> 6) & 1),
                    (n.italic = (i >> 5) & 1),
                    (n.bold = (i >> 4) & 1),
                    (i >> 3) & 1 && (n.fixedHeight = 1),
                    (n.stretchH = t.readUInt16LE(e + 4)),
                    (n.aa = t.readUInt8(e + 6)),
                    (n.padding = [
                      t.readInt8(e + 7),
                      t.readInt8(e + 8),
                      t.readInt8(e + 9),
                      t.readInt8(e + 10),
                    ]),
                    (n.spacing = [t.readInt8(e + 11), t.readInt8(e + 12)]),
                    (n.outline = t.readUInt8(e + 13)),
                    (n.face = this.readStringNT(t, e + 14)),
                    n
                  )
                },
              },
              {
                key: 'readCommon',
                value: function (t, e) {
                  var n = Object(o.b)()
                  return (
                    (n.lineHeight = t.readUInt16LE(e)),
                    (n.base = t.readUInt16LE(e + 2)),
                    (n.scaleW = t.readUInt16LE(e + 4)),
                    (n.scaleH = t.readUInt16LE(e + 6)),
                    (n.pages = t.readUInt16LE(e + 8)),
                    (n.packed = 0),
                    (n.alphaChnl = t.readUInt8(e + 11)),
                    (n.redChnl = t.readUInt8(e + 12)),
                    (n.greenChnl = t.readUInt8(e + 13)),
                    (n.blueChnl = t.readUInt8(e + 14)),
                    n
                  )
                },
              },
              {
                key: 'readPages',
                value: function (t, e, n) {
                  for (var i = [], a = this.readNameNT(t, e), r = a.length + 1, o = n / r, s = 0; s < o; s++)
                    (i[s] = t.slice(e, e + a.length).toString('utf8')), (e += r)
                  return i
                },
              },
              {
                key: 'readChars',
                value: function (t, e, n) {
                  for (var i = [], a = n / 20, r = 0; r < a; r++) {
                    var o = {
                        id: 0,
                        index: 0,
                        char: '',
                        width: 0,
                        height: 0,
                        xoffset: 0,
                        yoffset: 0,
                        xadvance: 0,
                        chnl: 0,
                        x: 0,
                        y: 0,
                        page: 0,
                      },
                      s = 20 * r
                    ;(o.id = t.readUInt32LE(e + 0 + s)),
                      (o.x = t.readUInt16LE(e + 4 + s)),
                      (o.y = t.readUInt16LE(e + 6 + s)),
                      (o.width = t.readUInt16LE(e + 8 + s)),
                      (o.height = t.readUInt16LE(e + 10 + s)),
                      (o.xoffset = t.readInt16LE(e + 12 + s)),
                      (o.yoffset = t.readInt16LE(e + 14 + s)),
                      (o.xadvance = t.readInt16LE(e + 16 + s)),
                      (o.page = t.readUInt8(e + 18 + s)),
                      (o.chnl = t.readUInt8(e + 19 + s)),
                      (i[r] = o)
                  }
                  return i
                },
              },
              {
                key: 'readKernings',
                value: function (t, e, n) {
                  for (var i = [], a = n / 10, r = 0; r < a; r++) {
                    var s = Object(o.d)(),
                      u = 10 * r
                    ;(s.first = t.readUInt32LE(e + 0 + u)),
                      (s.second = t.readUInt32LE(e + 4 + u)),
                      (s.amount = t.readInt16LE(e + 8 + u)),
                      (i[r] = s)
                  }
                  return i
                },
              },
              {
                key: 'readStringNT',
                value: function (t, e) {
                  return this.readNameNT(t, e).toString('utf8')
                },
              },
              {
                key: 'readNameNT',
                value: function (t, e) {
                  for (var n = e; n < t.length && 0 !== t[n]; n++);
                  return t.slice(e, n)
                },
              },
            ]),
            t
          )
        })()
      s.HEADER = [66, 77, 70]
      var u = n(119),
        c = n.n(u),
        l = n(120),
        h = (function () {
          function t() {
            Object(i.a)(this, t)
          }
          return (
            Object(a.a)(t, [
              {
                key: 'parse',
                value: function (t) {
                  try {
                    if (('string' === typeof t && (t = JSON.parse(t)), new c.a().compile(l)(t))) return t
                    throw new r.a(r.b.ParseError, 'Invalid json data')
                  } catch (e) {
                    throw new r.a(r.b.ParseError, e.message)
                  }
                },
              },
            ]),
            t
          )
        })(),
        d = n(121),
        f = (function () {
          function t() {
            Object(i.a)(this, t)
          }
          return (
            Object(a.a)(t, [
              {
                key: 'parse',
                value: function (t) {
                  try {
                    var e = new d.XMLParser({ ignoreAttributes: !1, attributeNamePrefix: '' }).parse(t).font
                    if (!e) throw new r.a(r.b.ParseError, 'No font data in BMFont file')
                    if (!e.pages) throw new r.a(r.b.ParseError, 'No font data in BMFont file')
                    if (!e.chars) throw new r.a(r.b.ParseError, 'No chars data in BMFont file')
                    if (!e.info) throw new r.a(r.b.ParseError, 'No info data in BMFont file')
                    if (!e.common) throw new r.a(r.b.ParseError, 'No common data in BMFont file')
                    return {
                      pages: Array.isArray(e.pages.page)
                        ? e.pages.page.map(function (t) {
                            return t.file
                          })
                        : [e.pages.page.file],
                      chars: e.chars.char.map(function (t) {
                        return t
                      }),
                      info: {
                        face: e.info.face,
                        size: +e.info.size || 0,
                        bold: +e.info.bold || 0,
                        italic: +e.info.italic || 0,
                        charset: e.info.charset.split(',').filter(function (t) {
                          return '' != t
                        }),
                        unicode: +e.info.unicode || 0,
                        stretchH: +e.info.stretchH || 0,
                        smooth: +e.info.smooth || 0,
                        aa: +e.info.aa || 0,
                        padding: e.info.padding.split(',').map(function (t) {
                          return +t
                        }),
                        spacing: e.info.spacing.split(',').map(function (t) {
                          return +t
                        }),
                        fixedHeight: +e.info.fixedHeight || 0,
                        outline: +e.info.outline || 0,
                      },
                      common: {
                        lineHeight: +e.common.lineHeight || 0,
                        base: +e.common.base || 0,
                        scaleW: +e.common.scaleW || 0,
                        scaleH: +e.common.scaleH || 0,
                        pages: +e.common.pages || 0,
                        packed: +e.common.packed || 0,
                        alphaChnl: +e.common.alphaChnl || 0,
                        redChnl: +e.common.redChnl || 0,
                        greenChnl: +e.common.greenChnl || 0,
                        blueChnl: +e.common.blueChn || 0,
                      },
                      kernings: e.kernings.kerning.map(function (t) {
                        return { first: +t.first || 0, second: +t.second || 0, amount: +t.amount || 0 }
                      }),
                      distanceField: {
                        fieldType: e.distanceField.fieldType,
                        distanceRange: +e.distanceField.distanceRange || 0,
                      },
                    }
                  } catch (n) {
                    throw new r.a(r.b.ParseError, n.message)
                  }
                },
              },
            ]),
            t
          )
        })(),
        p = (function () {
          function t() {
            Object(i.a)(this, t)
          }
          return (
            Object(a.a)(t, [
              {
                key: 'parse',
                value: function (t) {
                  var e = (t = t.trim()).split(/\r\n?|\n/g)
                  if (0 === e.length) throw new r.a(r.b.ParseError, 'No data in BMFont file')
                  var n = Object(o.a)()
                  if (
                    (e.forEach(function (t, e) {
                      if ((t = t.replace(/[\s\t]+/g, ' ').trim())) {
                        var i = t.indexOf(' ')
                        if (-1 === i) throw new r.a(r.b.ParseError, 'No page data')
                        var a = t.substring(0, i),
                          o = {}
                        switch (
                          (t
                            .substring(i + 1)
                            .replace(/[\s\t]+/g, ' ')
                            .split(' ')
                            .forEach(function (t) {
                              var e = t.split('='),
                                n = e[0],
                                i = e[1]
                              ;/^-?\d+\.?\d*$/.test(i)
                                ? (o[n] = +i)
                                : /^[\d,]+/.test(i)
                                ? (o[n] = i.split(',').map(function (t) {
                                    return +t
                                  }))
                                : /^("|').*("|')$/.test(i)
                                ? (o[n] = i.replace(/^("|')(.*)("|')$/g, '$2'))
                                : (o[n] = i)
                            }),
                          a)
                        ) {
                          case 'info':
                            n.info = o
                            break
                          case 'common':
                            n.common = o
                            break
                          case 'distanceField':
                            n.distanceField = o
                            break
                          case 'page':
                            n.pages.push(o.file)
                            break
                          case 'chars':
                            break
                          case 'char':
                            n.chars.push(o)
                            break
                          case 'kernings':
                            break
                          case 'kerning':
                            n.kernings.push(o)
                        }
                      }
                    }),
                    JSON.stringify(n.info) === JSON.stringify(Object(o.c)()))
                  )
                    throw new r.a(r.b.ParseError, 'No info data. \n'.concat(JSON.stringify(n)))
                  if (JSON.stringify(n.common) === JSON.stringify(Object(o.b)()))
                    throw new r.a(r.b.ParseError, 'No common data. \n'.concat(JSON.stringify(n)))
                  if (0 == n.pages.length)
                    throw new r.a(r.b.ParseError, 'No page data. \n'.concat(JSON.stringify(n)))
                  if (0 == n.chars.length)
                    throw new r.a(r.b.ParseError, 'No char data. \n'.concat(JSON.stringify(n)))
                  return n
                },
              },
            ]),
            t
          )
        })()
    },
    92: function (t, e, n) {
      'use strict'
      ;(function (t) {
        n.d(e, 'a', function () {
          return c
        })
        var i = n(0),
          a = n(1),
          r = n(64),
          o = n.n(r),
          s = n(12),
          u = n(65),
          c = (function () {
            function e() {
              Object(i.a)(this, e)
            }
            return (
              Object(a.a)(e, [
                {
                  key: 'loadJson',
                  value: function (t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0
                    return new Promise(function (n, i) {
                      o.a
                        .get(t, e)
                        .then(function (t) {
                          n(new u.c().parse(t.data))
                        })
                        .catch(function (t) {
                          i(new s.a(s.b.LoadError, t.message))
                        })
                    })
                  },
                },
                {
                  key: 'loadXML',
                  value: function (t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0
                    return new Promise(function (n, i) {
                      o.a
                        .get(t, e)
                        .then(function (t) {
                          n(new u.d().parse(t.data.toString()))
                        })
                        .catch(function (t) {
                          i(new s.a(s.b.LoadError, t.message))
                        })
                    })
                  },
                },
                {
                  key: 'loadAscii',
                  value: function (t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0
                    return new Promise(function (n, i) {
                      o.a
                        .get(t, e)
                        .then(function (t) {
                          n(new u.a().parse(t.data.toString()))
                        })
                        .catch(function (t) {
                          i(new s.a(s.b.LoadError, t.message))
                        })
                    })
                  },
                },
                {
                  key: 'loadBinary',
                  value: function (e) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0
                    return new Promise(function (i, a) {
                      o.a
                        .get(e, n)
                        .then(function (e) {
                          var n = 'string' === typeof e.data ? t.from(e.data, 'binary') : e.data
                          i(new u.b().parse(n))
                        })
                        .catch(function (t) {
                          a(new s.a(s.b.LoadError, t.message))
                        })
                    })
                  },
                },
              ]),
              e
            )
          })()
      }.call(this, n(93).Buffer))
    },
  },
  [[228, 1, 2]],
])
//# sourceMappingURL=main.be33a482.chunk.js.map
