(function () {
  var t,
    e,
    n,
    i,
    o,
    r,
    s,
    a,
    l,
    c,
    u,
    f,
    h,
    d,
    p,
    g,
    m,
    v,
    b,
    y,
    _,
    w,
    x,
    C,
    E,
    T,
    S,
    k,
    P,
    N,
    D,
    A,
    I,
    O,
    L,
    j,
    H,
    M,
    q,
    R,
    B,
    F,
    W,
    z,
    U,
    Y,
    V,
    X,
    Q = [].slice,
    $ = {}.hasOwnProperty,
    K = function (t, e) {
      for (var n in e) $.call(e, n) && (t[n] = e[n]);
      function i() {
        this.constructor = t;
      }
      return (
        (i.prototype = e.prototype),
        (t.prototype = new i()),
        (t.__super__ = e.prototype),
        t
      );
    },
    G =
      [].indexOf ||
      function (t) {
        for (var e = 0, n = this.length; e < n; e++)
          if (e in this && this[e] === t) return e;
        return -1;
      };
  for (
    _ = {
      catchupTime: 100,
      initialRate: 0.03,
      minTime: 250,
      ghostTime: 100,
      maxProgressPerFrame: 20,
      easeFactor: 1.25,
      startOnPageLoad: !0,
      restartOnPushState: !0,
      restartOnRequestAfter: 500,
      target: "body",
      elements: { checkInterval: 100, selectors: ["body"] },
      eventLag: { minSamples: 10, sampleCount: 3, lagThreshold: 3 },
      ajax: { trackMethods: ["GET"], trackWebSockets: !0, ignoreURLs: [] },
    },
      P = function () {
        var t;
        return null !=
          (t =
            "undefined" != typeof performance &&
            null !== performance &&
            "function" == typeof performance.now
              ? performance.now()
              : void 0)
          ? t
          : +new Date();
      },
      D =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame,
      y = window.cancelAnimationFrame || window.mozCancelAnimationFrame,
      null == D &&
        ((D = function (t) {
          return setTimeout(t, 50);
        }),
        (y = function (t) {
          return clearTimeout(t);
        })),
      I = function (t) {
        var e, n;
        return (
          (e = P()),
          (n = function () {
            var i;
            return (i = P() - e) >= 33
              ? ((e = P()),
                t(i, function () {
                  return D(n);
                }))
              : setTimeout(n, 33 - i);
          })()
        );
      },
      A = function () {
        var t, e, n;
        return (
          (n = arguments[0]),
          (e = arguments[1]),
          (t = 3 <= arguments.length ? Q.call(arguments, 2) : []),
          "function" == typeof n[e] ? n[e].apply(n, t) : n[e]
        );
      },
      w = function () {
        var t, e, n, i, o, r, s;
        for (
          e = arguments[0],
            r = 0,
            s = (i = 2 <= arguments.length ? Q.call(arguments, 1) : []).length;
          r < s;
          r++
        )
          if ((n = i[r]))
            for (t in n)
              $.call(n, t) &&
                ((o = n[t]),
                null != e[t] &&
                "object" == typeof e[t] &&
                null != o &&
                "object" == typeof o
                  ? w(e[t], o)
                  : (e[t] = o));
        return e;
      },
      m = function (t) {
        var e, n, i, o, r;
        for (n = e = 0, o = 0, r = t.length; o < r; o++)
          (i = t[o]), (n += Math.abs(i)), e++;
        return n / e;
      },
      C = function (t, e) {
        var n, i, o;
        if (
          (null == t && (t = "options"),
          null == e && (e = !0),
          (o = document.querySelector("[data-pace-" + t + "]")))
        ) {
          if (((n = o.getAttribute("data-pace-" + t)), !e)) return n;
          try {
            return JSON.parse(n);
          } catch (t) {
            return (
              (i = t),
              "undefined" != typeof console && null !== console
                ? console.error("Error parsing inline pace options", i)
                : void 0
            );
          }
        }
      },
      s = (function () {
        function t() {}
        return (
          (t.prototype.on = function (t, e, n, i) {
            var o;
            return (
              null == i && (i = !1),
              null == this.bindings && (this.bindings = {}),
              null == (o = this.bindings)[t] && (o[t] = []),
              this.bindings[t].push({ handler: e, ctx: n, once: i })
            );
          }),
          (t.prototype.once = function (t, e, n) {
            return this.on(t, e, n, !0);
          }),
          (t.prototype.off = function (t, e) {
            var n, i, o;
            if (null != (null != (i = this.bindings) ? i[t] : void 0)) {
              if (null == e) return delete this.bindings[t];
              for (n = 0, o = []; n < this.bindings[t].length; )
                this.bindings[t][n].handler === e
                  ? o.push(this.bindings[t].splice(n, 1))
                  : o.push(n++);
              return o;
            }
          }),
          (t.prototype.trigger = function () {
            var t, e, n, i, o, r, s, a, l;
            if (
              ((n = arguments[0]),
              (t = 2 <= arguments.length ? Q.call(arguments, 1) : []),
              null != (s = this.bindings) ? s[n] : void 0)
            ) {
              for (o = 0, l = []; o < this.bindings[n].length; )
                (i = (a = this.bindings[n][o]).handler),
                  (e = a.ctx),
                  (r = a.once),
                  i.apply(null != e ? e : this, t),
                  r ? l.push(this.bindings[n].splice(o, 1)) : l.push(o++);
              return l;
            }
          }),
          t
        );
      })(),
      c = window.Pace || {},
      window.Pace = c,
      w(c, s.prototype),
      N = c.options = w({}, _, window.paceOptions, C()),
      W = 0,
      U = (V = ["ajax", "document", "eventLag", "elements"]).length;
    W < U;
    W++
  )
    !0 === N[(H = V[W])] && (N[H] = _[H]);
  (l = (function (t) {
    function e() {
      return e.__super__.constructor.apply(this, arguments);
    }
    return K(e, t), e;
  })(Error)),
    (e = (function () {
      function t() {
        this.progress = 0;
      }
      return (
        (t.prototype.getElement = function () {
          var t;
          if (null == this.el) {
            if (!(t = document.querySelector(N.target))) throw new l();
            (this.el = document.createElement("div")),
              (this.el.className = "pace pace-active"),
              (document.body.className = document.body.className.replace(
                /pace-done/g,
                ""
              )),
              (document.body.className += " pace-running"),
              (this.el.innerHTML =
                '<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>'),
              null != t.firstChild
                ? t.insertBefore(this.el, t.firstChild)
                : t.appendChild(this.el);
          }
          return this.el;
        }),
        (t.prototype.finish = function () {
          var t;
          return (
            ((t = this.getElement()).className = t.className.replace(
              "pace-active",
              ""
            )),
            (t.className += " pace-inactive"),
            (document.body.className = document.body.className.replace(
              "pace-running",
              ""
            )),
            (document.body.className += " pace-done")
          );
        }),
        (t.prototype.update = function (t) {
          return (this.progress = t), this.render();
        }),
        (t.prototype.destroy = function () {
          try {
            this.getElement().parentNode.removeChild(this.getElement());
          } catch (t) {
            l = t;
          }
          return (this.el = void 0);
        }),
        (t.prototype.render = function () {
          var t, e, n, i, o, r, s;
          if (null == document.querySelector(N.target)) return !1;
          for (
            t = this.getElement(),
              i = "translate3d(" + this.progress + "%, 0, 0)",
              o = 0,
              r = (s = ["webkitTransform", "msTransform", "transform"]).length;
            o < r;
            o++
          )
            (e = s[o]), (t.children[0].style[e] = i);
          return (
            (!this.lastRenderedProgress ||
              this.lastRenderedProgress | (0 !== this.progress) | 0) &&
              (t.children[0].setAttribute(
                "data-progress-text",
                (0 | this.progress) + "%"
              ),
              this.progress >= 100
                ? (n = "99")
                : ((n = this.progress < 10 ? "0" : ""),
                  (n += 0 | this.progress)),
              t.children[0].setAttribute("data-progress", "" + n)),
            (this.lastRenderedProgress = this.progress)
          );
        }),
        (t.prototype.done = function () {
          return this.progress >= 100;
        }),
        t
      );
    })()),
    (a = (function () {
      function t() {
        this.bindings = {};
      }
      return (
        (t.prototype.trigger = function (t, e) {
          var n, i, o, r, s;
          if (null != this.bindings[t]) {
            for (s = [], i = 0, o = (r = this.bindings[t]).length; i < o; i++)
              (n = r[i]), s.push(n.call(this, e));
            return s;
          }
        }),
        (t.prototype.on = function (t, e) {
          var n;
          return (
            null == (n = this.bindings)[t] && (n[t] = []),
            this.bindings[t].push(e)
          );
        }),
        t
      );
    })()),
    (F = window.XMLHttpRequest),
    (B = window.XDomainRequest),
    (R = window.WebSocket),
    (x = function (t, e) {
      var n, i;
      for (n in ((i = []), e.prototype))
        try {
          null == t[n] && "function" != typeof e[n]
            ? "function" == typeof Object.defineProperty
              ? i.push(
                  Object.defineProperty(t, n, {
                    get: function () {
                      return e.prototype[n];
                    },
                    configurable: !0,
                    enumerable: !0,
                  })
                )
              : i.push((t[n] = e.prototype[n]))
            : i.push(void 0);
        } catch (t) {
          t;
        }
      return i;
    }),
    (S = []),
    (c.ignore = function () {
      var t, e, n;
      return (
        (e = arguments[0]),
        (t = 2 <= arguments.length ? Q.call(arguments, 1) : []),
        S.unshift("ignore"),
        (n = e.apply(null, t)),
        S.shift(),
        n
      );
    }),
    (c.track = function () {
      var t, e, n;
      return (
        (e = arguments[0]),
        (t = 2 <= arguments.length ? Q.call(arguments, 1) : []),
        S.unshift("track"),
        (n = e.apply(null, t)),
        S.shift(),
        n
      );
    }),
    (j = function (t) {
      var e;
      if ((null == t && (t = "GET"), "track" === S[0])) return "force";
      if (!S.length && N.ajax) {
        if ("socket" === t && N.ajax.trackWebSockets) return !0;
        if (((e = t.toUpperCase()), G.call(N.ajax.trackMethods, e) >= 0))
          return !0;
      }
      return !1;
    }),
    (u = (function (t) {
      function e() {
        var t,
          n = this;
        e.__super__.constructor.apply(this, arguments),
          (t = function (t) {
            var e;
            return (
              (e = t.open),
              (t.open = function (i, o, r) {
                return (
                  j(i) && n.trigger("request", { type: i, url: o, request: t }),
                  e.apply(t, arguments)
                );
              })
            );
          }),
          (window.XMLHttpRequest = function (e) {
            var n;
            return (n = new F(e)), t(n), n;
          });
        try {
          x(window.XMLHttpRequest, F);
        } catch (t) {}
        if (null != B) {
          window.XDomainRequest = function () {
            var e;
            return (e = new B()), t(e), e;
          };
          try {
            x(window.XDomainRequest, B);
          } catch (t) {}
        }
        if (null != R && N.ajax.trackWebSockets) {
          window.WebSocket = function (t, e) {
            var i;
            return (
              (i = null != e ? new R(t, e) : new R(t)),
              j("socket") &&
                n.trigger("request", {
                  type: "socket",
                  url: t,
                  protocols: e,
                  request: i,
                }),
              i
            );
          };
          try {
            x(window.WebSocket, R);
          } catch (t) {}
        }
      }
      return K(e, t), e;
    })(a)),
    (z = null),
    (L = function (t) {
      var e, n, i, o;
      for (n = 0, i = (o = N.ajax.ignoreURLs).length; n < i; n++)
        if ("string" == typeof (e = o[n])) {
          if (-1 !== t.indexOf(e)) return !0;
        } else if (e.test(t)) return !0;
      return !1;
    }),
    (E = function () {
      return null == z && (z = new u()), z;
    })().on("request", function (e) {
      var n, i, o, r, s;
      if (((r = e.type), (o = e.request), (s = e.url), !L(s)))
        return c.running || (!1 === N.restartOnRequestAfter && "force" !== j(r))
          ? void 0
          : ((i = arguments),
            "boolean" == typeof (n = N.restartOnRequestAfter || 0) && (n = 0),
            setTimeout(function () {
              var e, n, s, a, l;
              if (
                "socket" === r
                  ? o.readyState < 2
                  : 0 < (s = o.readyState) && s < 4
              ) {
                for (
                  c.restart(), l = [], e = 0, n = (a = c.sources).length;
                  e < n;
                  e++
                ) {
                  if ((H = a[e]) instanceof t) {
                    H.watch.apply(H, i);
                    break;
                  }
                  l.push(void 0);
                }
                return l;
              }
            }, n));
    }),
    (t = (function () {
      function t() {
        var t = this;
        (this.elements = []),
          E().on("request", function () {
            return t.watch.apply(t, arguments);
          });
      }
      return (
        (t.prototype.watch = function (t) {
          var e, n, i, o;
          if (((i = t.type), (e = t.request), (o = t.url), !L(o)))
            return (
              (n = "socket" === i ? new d(e) : new p(e)), this.elements.push(n)
            );
        }),
        t
      );
    })()),
    (p = function (t) {
      var e,
        n,
        i,
        o,
        r,
        s = this;
      if (((this.progress = 0), null != window.ProgressEvent))
        for (
          t.addEventListener(
            "progress",
            function (t) {
              return t.lengthComputable
                ? (s.progress = (100 * t.loaded) / t.total)
                : (s.progress = s.progress + (100 - s.progress) / 2);
            },
            !1
          ),
            n = 0,
            i = (r = ["load", "abort", "timeout", "error"]).length;
          n < i;
          n++
        )
          (e = r[n]),
            t.addEventListener(
              e,
              function () {
                return (s.progress = 100);
              },
              !1
            );
      else
        (o = t.onreadystatechange),
          (t.onreadystatechange = function () {
            var e;
            return (
              0 === (e = t.readyState) || 4 === e
                ? (s.progress = 100)
                : 3 === t.readyState && (s.progress = 50),
              "function" == typeof o ? o.apply(null, arguments) : void 0
            );
          });
    }),
    (d = function (t) {
      var e,
        n,
        i,
        o,
        r = this;
      for (
        this.progress = 0, n = 0, i = (o = ["error", "open"]).length;
        n < i;
        n++
      )
        (e = o[n]),
          t.addEventListener(
            e,
            function () {
              return (r.progress = 100);
            },
            !1
          );
    }),
    (i = function (t) {
      var e, n, i, r;
      for (
        null == t && (t = {}),
          this.elements = [],
          null == t.selectors && (t.selectors = []),
          n = 0,
          i = (r = t.selectors).length;
        n < i;
        n++
      )
        (e = r[n]), this.elements.push(new o(e));
    }),
    (o = (function () {
      function t(t) {
        (this.selector = t), (this.progress = 0), this.check();
      }
      return (
        (t.prototype.check = function () {
          var t = this;
          return document.querySelector(this.selector)
            ? this.done()
            : setTimeout(function () {
                return t.check();
              }, N.elements.checkInterval);
        }),
        (t.prototype.done = function () {
          return (this.progress = 100);
        }),
        t
      );
    })()),
    (n = (function () {
      function t() {
        var t,
          e,
          n = this;
        (this.progress =
          null != (e = this.states[document.readyState]) ? e : 100),
          (t = document.onreadystatechange),
          (document.onreadystatechange = function () {
            return (
              null != n.states[document.readyState] &&
                (n.progress = n.states[document.readyState]),
              "function" == typeof t ? t.apply(null, arguments) : void 0
            );
          });
      }
      return (
        (t.prototype.states = { loading: 0, interactive: 50, complete: 100 }), t
      );
    })()),
    (r = function () {
      var t,
        e,
        n,
        i,
        o,
        r = this;
      (this.progress = 0),
        (t = 0),
        (o = []),
        (i = 0),
        (n = P()),
        (e = setInterval(function () {
          var s;
          return (
            (s = P() - n - 50),
            (n = P()),
            o.push(s),
            o.length > N.eventLag.sampleCount && o.shift(),
            (t = m(o)),
            ++i >= N.eventLag.minSamples && t < N.eventLag.lagThreshold
              ? ((r.progress = 100), clearInterval(e))
              : (r.progress = (3 / (t + 3)) * 100)
          );
        }, 50));
    }),
    (h = (function () {
      function t(t) {
        (this.source = t),
          (this.last = this.sinceLastUpdate = 0),
          (this.rate = N.initialRate),
          (this.catchup = 0),
          (this.progress = this.lastProgress = 0),
          null != this.source && (this.progress = A(this.source, "progress"));
      }
      return (
        (t.prototype.tick = function (t, e) {
          var n;
          return (
            null == e && (e = A(this.source, "progress")),
            e >= 100 && (this.done = !0),
            e === this.last
              ? (this.sinceLastUpdate += t)
              : (this.sinceLastUpdate &&
                  (this.rate = (e - this.last) / this.sinceLastUpdate),
                (this.catchup = (e - this.progress) / N.catchupTime),
                (this.sinceLastUpdate = 0),
                (this.last = e)),
            e > this.progress && (this.progress += this.catchup * t),
            (n = 1 - Math.pow(this.progress / 100, N.easeFactor)),
            (this.progress += n * this.rate * t),
            (this.progress = Math.min(
              this.lastProgress + N.maxProgressPerFrame,
              this.progress
            )),
            (this.progress = Math.max(0, this.progress)),
            (this.progress = Math.min(100, this.progress)),
            (this.lastProgress = this.progress),
            this.progress
          );
        }),
        t
      );
    })()),
    (M = null),
    (O = null),
    (v = null),
    (q = null),
    (g = null),
    (b = null),
    (c.running = !1),
    (T = function () {
      if (N.restartOnPushState) return c.restart();
    }),
    null != window.history.pushState &&
      ((Y = window.history.pushState),
      (window.history.pushState = function () {
        return T(), Y.apply(window.history, arguments);
      })),
    null != window.history.replaceState &&
      ((X = window.history.replaceState),
      (window.history.replaceState = function () {
        return T(), X.apply(window.history, arguments);
      })),
    (f = { ajax: t, elements: i, document: n, eventLag: r }),
    (k = function () {
      var t, n, i, o, r, s, a, l;
      for (
        c.sources = M = [],
          n = 0,
          o = (s = ["ajax", "elements", "document", "eventLag"]).length;
        n < o;
        n++
      )
        !1 !== N[(t = s[n])] && M.push(new f[t](N[t]));
      for (
        i = 0, r = (l = null != (a = N.extraSources) ? a : []).length;
        i < r;
        i++
      )
        (H = l[i]), M.push(new H(N));
      return (c.bar = v = new e()), (O = []), (q = new h());
    })(),
    (c.stop = function () {
      return (
        c.trigger("stop"),
        (c.running = !1),
        v.destroy(),
        (b = !0),
        null != g && ("function" == typeof y && y(g), (g = null)),
        k()
      );
    }),
    (c.restart = function () {
      return c.trigger("restart"), c.stop(), c.start();
    }),
    (c.go = function () {
      var t;
      return (
        (c.running = !0),
        v.render(),
        (t = P()),
        (b = !1),
        (g = I(function (e, n) {
          var i, o, r, s, a, l, u, f, d, p, g, m, y, _, w;
          for (
            100 - v.progress, o = p = 0, r = !0, l = g = 0, y = M.length;
            g < y;
            l = ++g
          )
            for (
              H = M[l],
                d = null != O[l] ? O[l] : (O[l] = []),
                u = m = 0,
                _ = (a = null != (w = H.elements) ? w : [H]).length;
              m < _;
              u = ++m
            )
              (s = a[u]),
                (r &= (f = null != d[u] ? d[u] : (d[u] = new h(s))).done),
                f.done || (o++, (p += f.tick(e)));
          return (
            (i = p / o),
            v.update(q.tick(e, i)),
            v.done() || r || b
              ? (v.update(100),
                c.trigger("done"),
                setTimeout(function () {
                  return v.finish(), (c.running = !1), c.trigger("hide");
                }, Math.max(N.ghostTime, Math.max(N.minTime - (P() - t), 0))))
              : n()
          );
        }))
      );
    }),
    (c.start = function (t) {
      w(N, t), (c.running = !0);
      try {
        v.render();
      } catch (t) {
        l = t;
      }
      return document.querySelector(".pace")
        ? (c.trigger("start"), c.go())
        : setTimeout(c.start, 50);
    }),
    "function" == typeof define && define.amd
      ? define(["pace"], function () {
          return c;
        })
      : "object" == typeof exports
      ? (module.exports = c)
      : N.startOnPageLoad && c.start();
}).call(this),
  /*!
   * jQuery JavaScript Library v3.5.1
   * https://jquery.com/
   *
   * Includes Sizzle.js
   * https://sizzlejs.com/
   *
   * Copyright JS Foundation and other contributors
   * Released under the MIT license
   * https://jquery.org/license
   *
   * Date: 2020-05-04T22:49Z
   */
  (function (t, e) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports
      ? (module.exports = t.document
          ? e(t, !0)
          : function (t) {
              if (!t.document)
                throw new Error("jQuery requires a window with a document");
              return e(t);
            })
      : e(t);
  })("undefined" != typeof window ? window : this, function (t, e) {
    "use strict";
    var n = [],
      i = Object.getPrototypeOf,
      o = n.slice,
      r = n.flat
        ? function (t) {
            return n.flat.call(t);
          }
        : function (t) {
            return n.concat.apply([], t);
          },
      s = n.push,
      a = n.indexOf,
      l = {},
      c = l.toString,
      u = l.hasOwnProperty,
      f = u.toString,
      h = f.call(Object),
      d = {},
      p = function (t) {
        return "function" == typeof t && "number" != typeof t.nodeType;
      },
      g = function (t) {
        return null != t && t === t.window;
      },
      m = t.document,
      v = { type: !0, src: !0, nonce: !0, noModule: !0 };
    function b(t, e, n) {
      var i,
        o,
        r = (n = n || m).createElement("script");
      if (((r.text = t), e))
        for (i in v)
          (o = e[i] || (e.getAttribute && e.getAttribute(i))) &&
            r.setAttribute(i, o);
      n.head.appendChild(r).parentNode.removeChild(r);
    }
    function y(t) {
      return null == t
        ? t + ""
        : "object" == typeof t || "function" == typeof t
        ? l[c.call(t)] || "object"
        : typeof t;
    }
    var _ = "3.5.1",
      w = function (t, e) {
        return new w.fn.init(t, e);
      };
    function x(t) {
      var e = !!t && "length" in t && t.length,
        n = y(t);
      return (
        !p(t) &&
        !g(t) &&
        ("array" === n ||
          0 === e ||
          ("number" == typeof e && e > 0 && e - 1 in t))
      );
    }
    (w.fn = w.prototype =
      {
        jquery: _,
        constructor: w,
        length: 0,
        toArray: function () {
          return o.call(this);
        },
        get: function (t) {
          return null == t
            ? o.call(this)
            : t < 0
            ? this[t + this.length]
            : this[t];
        },
        pushStack: function (t) {
          var e = w.merge(this.constructor(), t);
          return (e.prevObject = this), e;
        },
        each: function (t) {
          return w.each(this, t);
        },
        map: function (t) {
          return this.pushStack(
            w.map(this, function (e, n) {
              return t.call(e, n, e);
            })
          );
        },
        slice: function () {
          return this.pushStack(o.apply(this, arguments));
        },
        first: function () {
          return this.eq(0);
        },
        last: function () {
          return this.eq(-1);
        },
        even: function () {
          return this.pushStack(
            w.grep(this, function (t, e) {
              return (e + 1) % 2;
            })
          );
        },
        odd: function () {
          return this.pushStack(
            w.grep(this, function (t, e) {
              return e % 2;
            })
          );
        },
        eq: function (t) {
          var e = this.length,
            n = +t + (t < 0 ? e : 0);
          return this.pushStack(n >= 0 && n < e ? [this[n]] : []);
        },
        end: function () {
          return this.prevObject || this.constructor();
        },
        push: s,
        sort: n.sort,
        splice: n.splice,
      }),
      (w.extend = w.fn.extend =
        function () {
          var t,
            e,
            n,
            i,
            o,
            r,
            s = arguments[0] || {},
            a = 1,
            l = arguments.length,
            c = !1;
          for (
            "boolean" == typeof s && ((c = s), (s = arguments[a] || {}), a++),
              "object" == typeof s || p(s) || (s = {}),
              a === l && ((s = this), a--);
            a < l;
            a++
          )
            if (null != (t = arguments[a]))
              for (e in t)
                (i = t[e]),
                  "__proto__" !== e &&
                    s !== i &&
                    (c && i && (w.isPlainObject(i) || (o = Array.isArray(i)))
                      ? ((n = s[e]),
                        (r =
                          o && !Array.isArray(n)
                            ? []
                            : o || w.isPlainObject(n)
                            ? n
                            : {}),
                        (o = !1),
                        (s[e] = w.extend(c, r, i)))
                      : void 0 !== i && (s[e] = i));
          return s;
        }),
      w.extend({
        expando: "jQuery" + (_ + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function (t) {
          throw new Error(t);
        },
        noop: function () {},
        isPlainObject: function (t) {
          var e, n;
          return (
            !(!t || "[object Object]" !== c.call(t)) &&
            (!(e = i(t)) ||
              ("function" ==
                typeof (n = u.call(e, "constructor") && e.constructor) &&
                f.call(n) === h))
          );
        },
        isEmptyObject: function (t) {
          var e;
          for (e in t) return !1;
          return !0;
        },
        globalEval: function (t, e, n) {
          b(t, { nonce: e && e.nonce }, n);
        },
        each: function (t, e) {
          var n,
            i = 0;
          if (x(t))
            for (n = t.length; i < n && !1 !== e.call(t[i], i, t[i]); i++);
          else for (i in t) if (!1 === e.call(t[i], i, t[i])) break;
          return t;
        },
        makeArray: function (t, e) {
          var n = e || [];
          return (
            null != t &&
              (x(Object(t))
                ? w.merge(n, "string" == typeof t ? [t] : t)
                : s.call(n, t)),
            n
          );
        },
        inArray: function (t, e, n) {
          return null == e ? -1 : a.call(e, t, n);
        },
        merge: function (t, e) {
          for (var n = +e.length, i = 0, o = t.length; i < n; i++)
            t[o++] = e[i];
          return (t.length = o), t;
        },
        grep: function (t, e, n) {
          for (var i = [], o = 0, r = t.length, s = !n; o < r; o++)
            !e(t[o], o) !== s && i.push(t[o]);
          return i;
        },
        map: function (t, e, n) {
          var i,
            o,
            s = 0,
            a = [];
          if (x(t))
            for (i = t.length; s < i; s++)
              null != (o = e(t[s], s, n)) && a.push(o);
          else for (s in t) null != (o = e(t[s], s, n)) && a.push(o);
          return r(a);
        },
        guid: 1,
        support: d,
      }),
      "function" == typeof Symbol &&
        (w.fn[Symbol.iterator] = n[Symbol.iterator]),
      w.each(
        "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
          " "
        ),
        function (t, e) {
          l["[object " + e + "]"] = e.toLowerCase();
        }
      );
    var C =
      /*!
       * Sizzle CSS Selector Engine v2.3.5
       * https://sizzlejs.com/
       *
       * Copyright JS Foundation and other contributors
       * Released under the MIT license
       * https://js.foundation/
       *
       * Date: 2020-03-14
       */
      (function (t) {
        var e,
          n,
          i,
          o,
          r,
          s,
          a,
          l,
          c,
          u,
          f,
          h,
          d,
          p,
          g,
          m,
          v,
          b,
          y,
          _ = "sizzle" + 1 * new Date(),
          w = t.document,
          x = 0,
          C = 0,
          E = lt(),
          T = lt(),
          S = lt(),
          k = lt(),
          P = function (t, e) {
            return t === e && (f = !0), 0;
          },
          N = {}.hasOwnProperty,
          D = [],
          A = D.pop,
          I = D.push,
          O = D.push,
          L = D.slice,
          j = function (t, e) {
            for (var n = 0, i = t.length; n < i; n++) if (t[n] === e) return n;
            return -1;
          },
          H =
            "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
          M = "[\\x20\\t\\r\\n\\f]",
          q =
            "(?:\\\\[\\da-fA-F]{1,6}" +
            M +
            "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
          R =
            "\\[" +
            M +
            "*(" +
            q +
            ")(?:" +
            M +
            "*([*^$|!~]?=)" +
            M +
            "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
            q +
            "))|)" +
            M +
            "*\\]",
          B =
            ":(" +
            q +
            ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
            R +
            ")*)|.*)\\)|)",
          F = new RegExp(M + "+", "g"),
          W = new RegExp(
            "^" + M + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M + "+$",
            "g"
          ),
          z = new RegExp("^" + M + "*," + M + "*"),
          U = new RegExp("^" + M + "*([>+~]|" + M + ")" + M + "*"),
          Y = new RegExp(M + "|>"),
          V = new RegExp(B),
          X = new RegExp("^" + q + "$"),
          Q = {
            ID: new RegExp("^#(" + q + ")"),
            CLASS: new RegExp("^\\.(" + q + ")"),
            TAG: new RegExp("^(" + q + "|[*])"),
            ATTR: new RegExp("^" + R),
            PSEUDO: new RegExp("^" + B),
            CHILD: new RegExp(
              "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
                M +
                "*(even|odd|(([+-]|)(\\d*)n|)" +
                M +
                "*(?:([+-]|)" +
                M +
                "*(\\d+)|))" +
                M +
                "*\\)|)",
              "i"
            ),
            bool: new RegExp("^(?:" + H + ")$", "i"),
            needsContext: new RegExp(
              "^" +
                M +
                "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                M +
                "*((?:-\\d)?\\d*)" +
                M +
                "*\\)|)(?=[^-]|$)",
              "i"
            ),
          },
          $ = /HTML$/i,
          K = /^(?:input|select|textarea|button)$/i,
          G = /^h\d$/i,
          J = /^[^{]+\{\s*\[native \w/,
          Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
          tt = /[+~]/,
          et = new RegExp(
            "\\\\[\\da-fA-F]{1,6}" + M + "?|\\\\([^\\r\\n\\f])",
            "g"
          ),
          nt = function (t, e) {
            var n = "0x" + t.slice(1) - 65536;
            return (
              e ||
              (n < 0
                ? String.fromCharCode(n + 65536)
                : String.fromCharCode((n >> 10) | 55296, (1023 & n) | 56320))
            );
          },
          it = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
          ot = function (t, e) {
            return e
              ? "\0" === t
                ? "ï¿½"
                : t.slice(0, -1) +
                  "\\" +
                  t.charCodeAt(t.length - 1).toString(16) +
                  " "
              : "\\" + t;
          },
          rt = function () {
            h();
          },
          st = _t(
            function (t) {
              return (
                !0 === t.disabled && "fieldset" === t.nodeName.toLowerCase()
              );
            },
            { dir: "parentNode", next: "legend" }
          );
        try {
          O.apply((D = L.call(w.childNodes)), w.childNodes),
            D[w.childNodes.length].nodeType;
        } catch (t) {
          O = {
            apply: D.length
              ? function (t, e) {
                  I.apply(t, L.call(e));
                }
              : function (t, e) {
                  for (var n = t.length, i = 0; (t[n++] = e[i++]); );
                  t.length = n - 1;
                },
          };
        }
        function at(t, e, i, o) {
          var r,
            a,
            c,
            u,
            f,
            p,
            v,
            b = e && e.ownerDocument,
            w = e ? e.nodeType : 9;
          if (
            ((i = i || []),
            "string" != typeof t || !t || (1 !== w && 9 !== w && 11 !== w))
          )
            return i;
          if (!o && (h(e), (e = e || d), g)) {
            if (11 !== w && (f = Z.exec(t)))
              if ((r = f[1])) {
                if (9 === w) {
                  if (!(c = e.getElementById(r))) return i;
                  if (c.id === r) return i.push(c), i;
                } else if (
                  b &&
                  (c = b.getElementById(r)) &&
                  y(e, c) &&
                  c.id === r
                )
                  return i.push(c), i;
              } else {
                if (f[2]) return O.apply(i, e.getElementsByTagName(t)), i;
                if (
                  (r = f[3]) &&
                  n.getElementsByClassName &&
                  e.getElementsByClassName
                )
                  return O.apply(i, e.getElementsByClassName(r)), i;
              }
            if (
              n.qsa &&
              !k[t + " "] &&
              (!m || !m.test(t)) &&
              (1 !== w || "object" !== e.nodeName.toLowerCase())
            ) {
              if (((v = t), (b = e), 1 === w && (Y.test(t) || U.test(t)))) {
                for (
                  ((b = (tt.test(t) && vt(e.parentNode)) || e) === e &&
                    n.scope) ||
                    ((u = e.getAttribute("id"))
                      ? (u = u.replace(it, ot))
                      : e.setAttribute("id", (u = _))),
                    a = (p = s(t)).length;
                  a--;

                )
                  p[a] = (u ? "#" + u : ":scope") + " " + yt(p[a]);
                v = p.join(",");
              }
              try {
                return O.apply(i, b.querySelectorAll(v)), i;
              } catch (e) {
                k(t, !0);
              } finally {
                u === _ && e.removeAttribute("id");
              }
            }
          }
          return l(t.replace(W, "$1"), e, i, o);
        }
        function lt() {
          var t = [];
          return function e(n, o) {
            return (
              t.push(n + " ") > i.cacheLength && delete e[t.shift()],
              (e[n + " "] = o)
            );
          };
        }
        function ct(t) {
          return (t[_] = !0), t;
        }
        function ut(t) {
          var e = d.createElement("fieldset");
          try {
            return !!t(e);
          } catch (t) {
            return !1;
          } finally {
            e.parentNode && e.parentNode.removeChild(e), (e = null);
          }
        }
        function ft(t, e) {
          for (var n = t.split("|"), o = n.length; o--; )
            i.attrHandle[n[o]] = e;
        }
        function ht(t, e) {
          var n = e && t,
            i =
              n &&
              1 === t.nodeType &&
              1 === e.nodeType &&
              t.sourceIndex - e.sourceIndex;
          if (i) return i;
          if (n) for (; (n = n.nextSibling); ) if (n === e) return -1;
          return t ? 1 : -1;
        }
        function dt(t) {
          return function (e) {
            return "input" === e.nodeName.toLowerCase() && e.type === t;
          };
        }
        function pt(t) {
          return function (e) {
            var n = e.nodeName.toLowerCase();
            return ("input" === n || "button" === n) && e.type === t;
          };
        }
        function gt(t) {
          return function (e) {
            return "form" in e
              ? e.parentNode && !1 === e.disabled
                ? "label" in e
                  ? "label" in e.parentNode
                    ? e.parentNode.disabled === t
                    : e.disabled === t
                  : e.isDisabled === t || (e.isDisabled !== !t && st(e) === t)
                : e.disabled === t
              : "label" in e && e.disabled === t;
          };
        }
        function mt(t) {
          return ct(function (e) {
            return (
              (e = +e),
              ct(function (n, i) {
                for (var o, r = t([], n.length, e), s = r.length; s--; )
                  n[(o = r[s])] && (n[o] = !(i[o] = n[o]));
              })
            );
          });
        }
        function vt(t) {
          return t && void 0 !== t.getElementsByTagName && t;
        }
        for (e in ((n = at.support = {}),
        (r = at.isXML =
          function (t) {
            var e = t.namespaceURI,
              n = (t.ownerDocument || t).documentElement;
            return !$.test(e || (n && n.nodeName) || "HTML");
          }),
        (h = at.setDocument =
          function (t) {
            var e,
              o,
              s = t ? t.ownerDocument || t : w;
            return s != d && 9 === s.nodeType && s.documentElement
              ? ((p = (d = s).documentElement),
                (g = !r(d)),
                w != d &&
                  (o = d.defaultView) &&
                  o.top !== o &&
                  (o.addEventListener
                    ? o.addEventListener("unload", rt, !1)
                    : o.attachEvent && o.attachEvent("onunload", rt)),
                (n.scope = ut(function (t) {
                  return (
                    p.appendChild(t).appendChild(d.createElement("div")),
                    void 0 !== t.querySelectorAll &&
                      !t.querySelectorAll(":scope fieldset div").length
                  );
                })),
                (n.attributes = ut(function (t) {
                  return (t.className = "i"), !t.getAttribute("className");
                })),
                (n.getElementsByTagName = ut(function (t) {
                  return (
                    t.appendChild(d.createComment("")),
                    !t.getElementsByTagName("*").length
                  );
                })),
                (n.getElementsByClassName = J.test(d.getElementsByClassName)),
                (n.getById = ut(function (t) {
                  return (
                    (p.appendChild(t).id = _),
                    !d.getElementsByName || !d.getElementsByName(_).length
                  );
                })),
                n.getById
                  ? ((i.filter.ID = function (t) {
                      var e = t.replace(et, nt);
                      return function (t) {
                        return t.getAttribute("id") === e;
                      };
                    }),
                    (i.find.ID = function (t, e) {
                      if (void 0 !== e.getElementById && g) {
                        var n = e.getElementById(t);
                        return n ? [n] : [];
                      }
                    }))
                  : ((i.filter.ID = function (t) {
                      var e = t.replace(et, nt);
                      return function (t) {
                        var n =
                          void 0 !== t.getAttributeNode &&
                          t.getAttributeNode("id");
                        return n && n.value === e;
                      };
                    }),
                    (i.find.ID = function (t, e) {
                      if (void 0 !== e.getElementById && g) {
                        var n,
                          i,
                          o,
                          r = e.getElementById(t);
                        if (r) {
                          if ((n = r.getAttributeNode("id")) && n.value === t)
                            return [r];
                          for (
                            o = e.getElementsByName(t), i = 0;
                            (r = o[i++]);

                          )
                            if ((n = r.getAttributeNode("id")) && n.value === t)
                              return [r];
                        }
                        return [];
                      }
                    })),
                (i.find.TAG = n.getElementsByTagName
                  ? function (t, e) {
                      return void 0 !== e.getElementsByTagName
                        ? e.getElementsByTagName(t)
                        : n.qsa
                        ? e.querySelectorAll(t)
                        : void 0;
                    }
                  : function (t, e) {
                      var n,
                        i = [],
                        o = 0,
                        r = e.getElementsByTagName(t);
                      if ("*" === t) {
                        for (; (n = r[o++]); ) 1 === n.nodeType && i.push(n);
                        return i;
                      }
                      return r;
                    }),
                (i.find.CLASS =
                  n.getElementsByClassName &&
                  function (t, e) {
                    if (void 0 !== e.getElementsByClassName && g)
                      return e.getElementsByClassName(t);
                  }),
                (v = []),
                (m = []),
                (n.qsa = J.test(d.querySelectorAll)) &&
                  (ut(function (t) {
                    var e;
                    (p.appendChild(t).innerHTML =
                      "<a id='" +
                      _ +
                      "'></a><select id='" +
                      _ +
                      "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                      t.querySelectorAll("[msallowcapture^='']").length &&
                        m.push("[*^$]=" + M + "*(?:''|\"\")"),
                      t.querySelectorAll("[selected]").length ||
                        m.push("\\[" + M + "*(?:value|" + H + ")"),
                      t.querySelectorAll("[id~=" + _ + "-]").length ||
                        m.push("~="),
                      (e = d.createElement("input")).setAttribute("name", ""),
                      t.appendChild(e),
                      t.querySelectorAll("[name='']").length ||
                        m.push(
                          "\\[" + M + "*name" + M + "*=" + M + "*(?:''|\"\")"
                        ),
                      t.querySelectorAll(":checked").length ||
                        m.push(":checked"),
                      t.querySelectorAll("a#" + _ + "+*").length ||
                        m.push(".#.+[+~]"),
                      t.querySelectorAll("\\\f"),
                      m.push("[\\r\\n\\f]");
                  }),
                  ut(function (t) {
                    t.innerHTML =
                      "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                    var e = d.createElement("input");
                    e.setAttribute("type", "hidden"),
                      t.appendChild(e).setAttribute("name", "D"),
                      t.querySelectorAll("[name=d]").length &&
                        m.push("name" + M + "*[*^$|!~]?="),
                      2 !== t.querySelectorAll(":enabled").length &&
                        m.push(":enabled", ":disabled"),
                      (p.appendChild(t).disabled = !0),
                      2 !== t.querySelectorAll(":disabled").length &&
                        m.push(":enabled", ":disabled"),
                      t.querySelectorAll("*,:x"),
                      m.push(",.*:");
                  })),
                (n.matchesSelector = J.test(
                  (b =
                    p.matches ||
                    p.webkitMatchesSelector ||
                    p.mozMatchesSelector ||
                    p.oMatchesSelector ||
                    p.msMatchesSelector)
                )) &&
                  ut(function (t) {
                    (n.disconnectedMatch = b.call(t, "*")),
                      b.call(t, "[s!='']:x"),
                      v.push("!=", B);
                  }),
                (m = m.length && new RegExp(m.join("|"))),
                (v = v.length && new RegExp(v.join("|"))),
                (e = J.test(p.compareDocumentPosition)),
                (y =
                  e || J.test(p.contains)
                    ? function (t, e) {
                        var n = 9 === t.nodeType ? t.documentElement : t,
                          i = e && e.parentNode;
                        return (
                          t === i ||
                          !(
                            !i ||
                            1 !== i.nodeType ||
                            !(n.contains
                              ? n.contains(i)
                              : t.compareDocumentPosition &&
                                16 & t.compareDocumentPosition(i))
                          )
                        );
                      }
                    : function (t, e) {
                        if (e)
                          for (; (e = e.parentNode); ) if (e === t) return !0;
                        return !1;
                      }),
                (P = e
                  ? function (t, e) {
                      if (t === e) return (f = !0), 0;
                      var i =
                        !t.compareDocumentPosition - !e.compareDocumentPosition;
                      return (
                        i ||
                        (1 &
                          (i =
                            (t.ownerDocument || t) == (e.ownerDocument || e)
                              ? t.compareDocumentPosition(e)
                              : 1) ||
                        (!n.sortDetached && e.compareDocumentPosition(t) === i)
                          ? t == d || (t.ownerDocument == w && y(w, t))
                            ? -1
                            : e == d || (e.ownerDocument == w && y(w, e))
                            ? 1
                            : u
                            ? j(u, t) - j(u, e)
                            : 0
                          : 4 & i
                          ? -1
                          : 1)
                      );
                    }
                  : function (t, e) {
                      if (t === e) return (f = !0), 0;
                      var n,
                        i = 0,
                        o = t.parentNode,
                        r = e.parentNode,
                        s = [t],
                        a = [e];
                      if (!o || !r)
                        return t == d
                          ? -1
                          : e == d
                          ? 1
                          : o
                          ? -1
                          : r
                          ? 1
                          : u
                          ? j(u, t) - j(u, e)
                          : 0;
                      if (o === r) return ht(t, e);
                      for (n = t; (n = n.parentNode); ) s.unshift(n);
                      for (n = e; (n = n.parentNode); ) a.unshift(n);
                      for (; s[i] === a[i]; ) i++;
                      return i
                        ? ht(s[i], a[i])
                        : s[i] == w
                        ? -1
                        : a[i] == w
                        ? 1
                        : 0;
                    }),
                d)
              : d;
          }),
        (at.matches = function (t, e) {
          return at(t, null, null, e);
        }),
        (at.matchesSelector = function (t, e) {
          if (
            (h(t),
            n.matchesSelector &&
              g &&
              !k[e + " "] &&
              (!v || !v.test(e)) &&
              (!m || !m.test(e)))
          )
            try {
              var i = b.call(t, e);
              if (
                i ||
                n.disconnectedMatch ||
                (t.document && 11 !== t.document.nodeType)
              )
                return i;
            } catch (t) {
              k(e, !0);
            }
          return at(e, d, null, [t]).length > 0;
        }),
        (at.contains = function (t, e) {
          return (t.ownerDocument || t) != d && h(t), y(t, e);
        }),
        (at.attr = function (t, e) {
          (t.ownerDocument || t) != d && h(t);
          var o = i.attrHandle[e.toLowerCase()],
            r =
              o && N.call(i.attrHandle, e.toLowerCase()) ? o(t, e, !g) : void 0;
          return void 0 !== r
            ? r
            : n.attributes || !g
            ? t.getAttribute(e)
            : (r = t.getAttributeNode(e)) && r.specified
            ? r.value
            : null;
        }),
        (at.escape = function (t) {
          return (t + "").replace(it, ot);
        }),
        (at.error = function (t) {
          throw new Error("Syntax error, unrecognized expression: " + t);
        }),
        (at.uniqueSort = function (t) {
          var e,
            i = [],
            o = 0,
            r = 0;
          if (
            ((f = !n.detectDuplicates),
            (u = !n.sortStable && t.slice(0)),
            t.sort(P),
            f)
          ) {
            for (; (e = t[r++]); ) e === t[r] && (o = i.push(r));
            for (; o--; ) t.splice(i[o], 1);
          }
          return (u = null), t;
        }),
        (o = at.getText =
          function (t) {
            var e,
              n = "",
              i = 0,
              r = t.nodeType;
            if (r) {
              if (1 === r || 9 === r || 11 === r) {
                if ("string" == typeof t.textContent) return t.textContent;
                for (t = t.firstChild; t; t = t.nextSibling) n += o(t);
              } else if (3 === r || 4 === r) return t.nodeValue;
            } else for (; (e = t[i++]); ) n += o(e);
            return n;
          }),
        (i = at.selectors =
          {
            cacheLength: 50,
            createPseudo: ct,
            match: Q,
            attrHandle: {},
            find: {},
            relative: {
              ">": { dir: "parentNode", first: !0 },
              " ": { dir: "parentNode" },
              "+": { dir: "previousSibling", first: !0 },
              "~": { dir: "previousSibling" },
            },
            preFilter: {
              ATTR: function (t) {
                return (
                  (t[1] = t[1].replace(et, nt)),
                  (t[3] = (t[3] || t[4] || t[5] || "").replace(et, nt)),
                  "~=" === t[2] && (t[3] = " " + t[3] + " "),
                  t.slice(0, 4)
                );
              },
              CHILD: function (t) {
                return (
                  (t[1] = t[1].toLowerCase()),
                  "nth" === t[1].slice(0, 3)
                    ? (t[3] || at.error(t[0]),
                      (t[4] = +(t[4]
                        ? t[5] + (t[6] || 1)
                        : 2 * ("even" === t[3] || "odd" === t[3]))),
                      (t[5] = +(t[7] + t[8] || "odd" === t[3])))
                    : t[3] && at.error(t[0]),
                  t
                );
              },
              PSEUDO: function (t) {
                var e,
                  n = !t[6] && t[2];
                return Q.CHILD.test(t[0])
                  ? null
                  : (t[3]
                      ? (t[2] = t[4] || t[5] || "")
                      : n &&
                        V.test(n) &&
                        (e = s(n, !0)) &&
                        (e = n.indexOf(")", n.length - e) - n.length) &&
                        ((t[0] = t[0].slice(0, e)), (t[2] = n.slice(0, e))),
                    t.slice(0, 3));
              },
            },
            filter: {
              TAG: function (t) {
                var e = t.replace(et, nt).toLowerCase();
                return "*" === t
                  ? function () {
                      return !0;
                    }
                  : function (t) {
                      return t.nodeName && t.nodeName.toLowerCase() === e;
                    };
              },
              CLASS: function (t) {
                var e = E[t + " "];
                return (
                  e ||
                  ((e = new RegExp("(^|" + M + ")" + t + "(" + M + "|$)")) &&
                    E(t, function (t) {
                      return e.test(
                        ("string" == typeof t.className && t.className) ||
                          (void 0 !== t.getAttribute &&
                            t.getAttribute("class")) ||
                          ""
                      );
                    }))
                );
              },
              ATTR: function (t, e, n) {
                return function (i) {
                  var o = at.attr(i, t);
                  return null == o
                    ? "!=" === e
                    : !e ||
                        ((o += ""),
                        "=" === e
                          ? o === n
                          : "!=" === e
                          ? o !== n
                          : "^=" === e
                          ? n && 0 === o.indexOf(n)
                          : "*=" === e
                          ? n && o.indexOf(n) > -1
                          : "$=" === e
                          ? n && o.slice(-n.length) === n
                          : "~=" === e
                          ? (" " + o.replace(F, " ") + " ").indexOf(n) > -1
                          : "|=" === e &&
                            (o === n || o.slice(0, n.length + 1) === n + "-"));
                };
              },
              CHILD: function (t, e, n, i, o) {
                var r = "nth" !== t.slice(0, 3),
                  s = "last" !== t.slice(-4),
                  a = "of-type" === e;
                return 1 === i && 0 === o
                  ? function (t) {
                      return !!t.parentNode;
                    }
                  : function (e, n, l) {
                      var c,
                        u,
                        f,
                        h,
                        d,
                        p,
                        g = r !== s ? "nextSibling" : "previousSibling",
                        m = e.parentNode,
                        v = a && e.nodeName.toLowerCase(),
                        b = !l && !a,
                        y = !1;
                      if (m) {
                        if (r) {
                          for (; g; ) {
                            for (h = e; (h = h[g]); )
                              if (
                                a
                                  ? h.nodeName.toLowerCase() === v
                                  : 1 === h.nodeType
                              )
                                return !1;
                            p = g = "only" === t && !p && "nextSibling";
                          }
                          return !0;
                        }
                        if (((p = [s ? m.firstChild : m.lastChild]), s && b)) {
                          for (
                            y =
                              (d =
                                (c =
                                  (u =
                                    (f = (h = m)[_] || (h[_] = {}))[
                                      h.uniqueID
                                    ] || (f[h.uniqueID] = {}))[t] || [])[0] ===
                                  x && c[1]) && c[2],
                              h = d && m.childNodes[d];
                            (h = (++d && h && h[g]) || (y = d = 0) || p.pop());

                          )
                            if (1 === h.nodeType && ++y && h === e) {
                              u[t] = [x, d, y];
                              break;
                            }
                        } else if (
                          (b &&
                            (y = d =
                              (c =
                                (u =
                                  (f = (h = e)[_] || (h[_] = {}))[h.uniqueID] ||
                                  (f[h.uniqueID] = {}))[t] || [])[0] === x &&
                              c[1]),
                          !1 === y)
                        )
                          for (
                            ;
                            (h =
                              (++d && h && h[g]) || (y = d = 0) || p.pop()) &&
                            ((a
                              ? h.nodeName.toLowerCase() !== v
                              : 1 !== h.nodeType) ||
                              !++y ||
                              (b &&
                                ((u =
                                  (f = h[_] || (h[_] = {}))[h.uniqueID] ||
                                  (f[h.uniqueID] = {}))[t] = [x, y]),
                              h !== e));

                          );
                        return (y -= o) === i || (y % i == 0 && y / i >= 0);
                      }
                    };
              },
              PSEUDO: function (t, e) {
                var n,
                  o =
                    i.pseudos[t] ||
                    i.setFilters[t.toLowerCase()] ||
                    at.error("unsupported pseudo: " + t);
                return o[_]
                  ? o(e)
                  : o.length > 1
                  ? ((n = [t, t, "", e]),
                    i.setFilters.hasOwnProperty(t.toLowerCase())
                      ? ct(function (t, n) {
                          for (var i, r = o(t, e), s = r.length; s--; )
                            t[(i = j(t, r[s]))] = !(n[i] = r[s]);
                        })
                      : function (t) {
                          return o(t, 0, n);
                        })
                  : o;
              },
            },
            pseudos: {
              not: ct(function (t) {
                var e = [],
                  n = [],
                  i = a(t.replace(W, "$1"));
                return i[_]
                  ? ct(function (t, e, n, o) {
                      for (var r, s = i(t, null, o, []), a = t.length; a--; )
                        (r = s[a]) && (t[a] = !(e[a] = r));
                    })
                  : function (t, o, r) {
                      return (
                        (e[0] = t), i(e, null, r, n), (e[0] = null), !n.pop()
                      );
                    };
              }),
              has: ct(function (t) {
                return function (e) {
                  return at(t, e).length > 0;
                };
              }),
              contains: ct(function (t) {
                return (
                  (t = t.replace(et, nt)),
                  function (e) {
                    return (e.textContent || o(e)).indexOf(t) > -1;
                  }
                );
              }),
              lang: ct(function (t) {
                return (
                  X.test(t || "") || at.error("unsupported lang: " + t),
                  (t = t.replace(et, nt).toLowerCase()),
                  function (e) {
                    var n;
                    do {
                      if (
                        (n = g
                          ? e.lang
                          : e.getAttribute("xml:lang") ||
                            e.getAttribute("lang"))
                      )
                        return (
                          (n = n.toLowerCase()) === t ||
                          0 === n.indexOf(t + "-")
                        );
                    } while ((e = e.parentNode) && 1 === e.nodeType);
                    return !1;
                  }
                );
              }),
              target: function (e) {
                var n = t.location && t.location.hash;
                return n && n.slice(1) === e.id;
              },
              root: function (t) {
                return t === p;
              },
              focus: function (t) {
                return (
                  t === d.activeElement &&
                  (!d.hasFocus || d.hasFocus()) &&
                  !!(t.type || t.href || ~t.tabIndex)
                );
              },
              enabled: gt(!1),
              disabled: gt(!0),
              checked: function (t) {
                var e = t.nodeName.toLowerCase();
                return (
                  ("input" === e && !!t.checked) ||
                  ("option" === e && !!t.selected)
                );
              },
              selected: function (t) {
                return (
                  t.parentNode && t.parentNode.selectedIndex, !0 === t.selected
                );
              },
              empty: function (t) {
                for (t = t.firstChild; t; t = t.nextSibling)
                  if (t.nodeType < 6) return !1;
                return !0;
              },
              parent: function (t) {
                return !i.pseudos.empty(t);
              },
              header: function (t) {
                return G.test(t.nodeName);
              },
              input: function (t) {
                return K.test(t.nodeName);
              },
              button: function (t) {
                var e = t.nodeName.toLowerCase();
                return ("input" === e && "button" === t.type) || "button" === e;
              },
              text: function (t) {
                var e;
                return (
                  "input" === t.nodeName.toLowerCase() &&
                  "text" === t.type &&
                  (null == (e = t.getAttribute("type")) ||
                    "text" === e.toLowerCase())
                );
              },
              first: mt(function () {
                return [0];
              }),
              last: mt(function (t, e) {
                return [e - 1];
              }),
              eq: mt(function (t, e, n) {
                return [n < 0 ? n + e : n];
              }),
              even: mt(function (t, e) {
                for (var n = 0; n < e; n += 2) t.push(n);
                return t;
              }),
              odd: mt(function (t, e) {
                for (var n = 1; n < e; n += 2) t.push(n);
                return t;
              }),
              lt: mt(function (t, e, n) {
                for (var i = n < 0 ? n + e : n > e ? e : n; --i >= 0; )
                  t.push(i);
                return t;
              }),
              gt: mt(function (t, e, n) {
                for (var i = n < 0 ? n + e : n; ++i < e; ) t.push(i);
                return t;
              }),
            },
          }),
        (i.pseudos.nth = i.pseudos.eq),
        { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
          i.pseudos[e] = dt(e);
        for (e in { submit: !0, reset: !0 }) i.pseudos[e] = pt(e);
        function bt() {}
        function yt(t) {
          for (var e = 0, n = t.length, i = ""; e < n; e++) i += t[e].value;
          return i;
        }
        function _t(t, e, n) {
          var i = e.dir,
            o = e.next,
            r = o || i,
            s = n && "parentNode" === r,
            a = C++;
          return e.first
            ? function (e, n, o) {
                for (; (e = e[i]); )
                  if (1 === e.nodeType || s) return t(e, n, o);
                return !1;
              }
            : function (e, n, l) {
                var c,
                  u,
                  f,
                  h = [x, a];
                if (l) {
                  for (; (e = e[i]); )
                    if ((1 === e.nodeType || s) && t(e, n, l)) return !0;
                } else
                  for (; (e = e[i]); )
                    if (1 === e.nodeType || s)
                      if (
                        ((u =
                          (f = e[_] || (e[_] = {}))[e.uniqueID] ||
                          (f[e.uniqueID] = {})),
                        o && o === e.nodeName.toLowerCase())
                      )
                        e = e[i] || e;
                      else {
                        if ((c = u[r]) && c[0] === x && c[1] === a)
                          return (h[2] = c[2]);
                        if (((u[r] = h), (h[2] = t(e, n, l)))) return !0;
                      }
                return !1;
              };
        }
        function wt(t) {
          return t.length > 1
            ? function (e, n, i) {
                for (var o = t.length; o--; ) if (!t[o](e, n, i)) return !1;
                return !0;
              }
            : t[0];
        }
        function xt(t, e, n, i, o) {
          for (var r, s = [], a = 0, l = t.length, c = null != e; a < l; a++)
            (r = t[a]) && ((n && !n(r, i, o)) || (s.push(r), c && e.push(a)));
          return s;
        }
        function Ct(t, e, n, i, o, r) {
          return (
            i && !i[_] && (i = Ct(i)),
            o && !o[_] && (o = Ct(o, r)),
            ct(function (r, s, a, l) {
              var c,
                u,
                f,
                h = [],
                d = [],
                p = s.length,
                g =
                  r ||
                  (function (t, e, n) {
                    for (var i = 0, o = e.length; i < o; i++) at(t, e[i], n);
                    return n;
                  })(e || "*", a.nodeType ? [a] : a, []),
                m = !t || (!r && e) ? g : xt(g, h, t, a, l),
                v = n ? (o || (r ? t : p || i) ? [] : s) : m;
              if ((n && n(m, v, a, l), i))
                for (c = xt(v, d), i(c, [], a, l), u = c.length; u--; )
                  (f = c[u]) && (v[d[u]] = !(m[d[u]] = f));
              if (r) {
                if (o || t) {
                  if (o) {
                    for (c = [], u = v.length; u--; )
                      (f = v[u]) && c.push((m[u] = f));
                    o(null, (v = []), c, l);
                  }
                  for (u = v.length; u--; )
                    (f = v[u]) &&
                      (c = o ? j(r, f) : h[u]) > -1 &&
                      (r[c] = !(s[c] = f));
                }
              } else (v = xt(v === s ? v.splice(p, v.length) : v)), o ? o(null, s, v, l) : O.apply(s, v);
            })
          );
        }
        function Et(t) {
          for (
            var e,
              n,
              o,
              r = t.length,
              s = i.relative[t[0].type],
              a = s || i.relative[" "],
              l = s ? 1 : 0,
              u = _t(
                function (t) {
                  return t === e;
                },
                a,
                !0
              ),
              f = _t(
                function (t) {
                  return j(e, t) > -1;
                },
                a,
                !0
              ),
              h = [
                function (t, n, i) {
                  var o =
                    (!s && (i || n !== c)) ||
                    ((e = n).nodeType ? u(t, n, i) : f(t, n, i));
                  return (e = null), o;
                },
              ];
            l < r;
            l++
          )
            if ((n = i.relative[t[l].type])) h = [_t(wt(h), n)];
            else {
              if ((n = i.filter[t[l].type].apply(null, t[l].matches))[_]) {
                for (o = ++l; o < r && !i.relative[t[o].type]; o++);
                return Ct(
                  l > 1 && wt(h),
                  l > 1 &&
                    yt(
                      t
                        .slice(0, l - 1)
                        .concat({ value: " " === t[l - 2].type ? "*" : "" })
                    ).replace(W, "$1"),
                  n,
                  l < o && Et(t.slice(l, o)),
                  o < r && Et((t = t.slice(o))),
                  o < r && yt(t)
                );
              }
              h.push(n);
            }
          return wt(h);
        }
        return (
          (bt.prototype = i.filters = i.pseudos),
          (i.setFilters = new bt()),
          (s = at.tokenize =
            function (t, e) {
              var n,
                o,
                r,
                s,
                a,
                l,
                c,
                u = T[t + " "];
              if (u) return e ? 0 : u.slice(0);
              for (a = t, l = [], c = i.preFilter; a; ) {
                for (s in ((n && !(o = z.exec(a))) ||
                  (o && (a = a.slice(o[0].length) || a), l.push((r = []))),
                (n = !1),
                (o = U.exec(a)) &&
                  ((n = o.shift()),
                  r.push({ value: n, type: o[0].replace(W, " ") }),
                  (a = a.slice(n.length))),
                i.filter))
                  !(o = Q[s].exec(a)) ||
                    (c[s] && !(o = c[s](o))) ||
                    ((n = o.shift()),
                    r.push({ value: n, type: s, matches: o }),
                    (a = a.slice(n.length)));
                if (!n) break;
              }
              return e ? a.length : a ? at.error(t) : T(t, l).slice(0);
            }),
          (a = at.compile =
            function (t, e) {
              var n,
                o = [],
                r = [],
                a = S[t + " "];
              if (!a) {
                for (e || (e = s(t)), n = e.length; n--; )
                  (a = Et(e[n]))[_] ? o.push(a) : r.push(a);
                (a = S(
                  t,
                  (function (t, e) {
                    var n = e.length > 0,
                      o = t.length > 0,
                      r = function (r, s, a, l, u) {
                        var f,
                          p,
                          m,
                          v = 0,
                          b = "0",
                          y = r && [],
                          _ = [],
                          w = c,
                          C = r || (o && i.find.TAG("*", u)),
                          E = (x += null == w ? 1 : Math.random() || 0.1),
                          T = C.length;
                        for (
                          u && (c = s == d || s || u);
                          b !== T && null != (f = C[b]);
                          b++
                        ) {
                          if (o && f) {
                            for (
                              p = 0,
                                s || f.ownerDocument == d || (h(f), (a = !g));
                              (m = t[p++]);

                            )
                              if (m(f, s || d, a)) {
                                l.push(f);
                                break;
                              }
                            u && (x = E);
                          }
                          n && ((f = !m && f) && v--, r && y.push(f));
                        }
                        if (((v += b), n && b !== v)) {
                          for (p = 0; (m = e[p++]); ) m(y, _, s, a);
                          if (r) {
                            if (v > 0)
                              for (; b--; ) y[b] || _[b] || (_[b] = A.call(l));
                            _ = xt(_);
                          }
                          O.apply(l, _),
                            u &&
                              !r &&
                              _.length > 0 &&
                              v + e.length > 1 &&
                              at.uniqueSort(l);
                        }
                        return u && ((x = E), (c = w)), y;
                      };
                    return n ? ct(r) : r;
                  })(r, o)
                )),
                  (a.selector = t);
              }
              return a;
            }),
          (l = at.select =
            function (t, e, n, o) {
              var r,
                l,
                c,
                u,
                f,
                h = "function" == typeof t && t,
                d = !o && s((t = h.selector || t));
              if (((n = n || []), 1 === d.length)) {
                if (
                  (l = d[0] = d[0].slice(0)).length > 2 &&
                  "ID" === (c = l[0]).type &&
                  9 === e.nodeType &&
                  g &&
                  i.relative[l[1].type]
                ) {
                  if (
                    !(e = (i.find.ID(c.matches[0].replace(et, nt), e) || [])[0])
                  )
                    return n;
                  h && (e = e.parentNode),
                    (t = t.slice(l.shift().value.length));
                }
                for (
                  r = Q.needsContext.test(t) ? 0 : l.length;
                  r-- && ((c = l[r]), !i.relative[(u = c.type)]);

                )
                  if (
                    (f = i.find[u]) &&
                    (o = f(
                      c.matches[0].replace(et, nt),
                      (tt.test(l[0].type) && vt(e.parentNode)) || e
                    ))
                  ) {
                    if ((l.splice(r, 1), !(t = o.length && yt(l))))
                      return O.apply(n, o), n;
                    break;
                  }
              }
              return (
                (h || a(t, d))(
                  o,
                  e,
                  !g,
                  n,
                  !e || (tt.test(t) && vt(e.parentNode)) || e
                ),
                n
              );
            }),
          (n.sortStable = _.split("").sort(P).join("") === _),
          (n.detectDuplicates = !!f),
          h(),
          (n.sortDetached = ut(function (t) {
            return 1 & t.compareDocumentPosition(d.createElement("fieldset"));
          })),
          ut(function (t) {
            return (
              (t.innerHTML = "<a href='#'></a>"),
              "#" === t.firstChild.getAttribute("href")
            );
          }) ||
            ft("type|href|height|width", function (t, e, n) {
              if (!n)
                return t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2);
            }),
          (n.attributes &&
            ut(function (t) {
              return (
                (t.innerHTML = "<input/>"),
                t.firstChild.setAttribute("value", ""),
                "" === t.firstChild.getAttribute("value")
              );
            })) ||
            ft("value", function (t, e, n) {
              if (!n && "input" === t.nodeName.toLowerCase())
                return t.defaultValue;
            }),
          ut(function (t) {
            return null == t.getAttribute("disabled");
          }) ||
            ft(H, function (t, e, n) {
              var i;
              if (!n)
                return !0 === t[e]
                  ? e.toLowerCase()
                  : (i = t.getAttributeNode(e)) && i.specified
                  ? i.value
                  : null;
            }),
          at
        );
      })(t);
    (w.find = C),
      (w.expr = C.selectors),
      (w.expr[":"] = w.expr.pseudos),
      (w.uniqueSort = w.unique = C.uniqueSort),
      (w.text = C.getText),
      (w.isXMLDoc = C.isXML),
      (w.contains = C.contains),
      (w.escapeSelector = C.escape);
    var E = function (t, e, n) {
        for (var i = [], o = void 0 !== n; (t = t[e]) && 9 !== t.nodeType; )
          if (1 === t.nodeType) {
            if (o && w(t).is(n)) break;
            i.push(t);
          }
        return i;
      },
      T = function (t, e) {
        for (var n = []; t; t = t.nextSibling)
          1 === t.nodeType && t !== e && n.push(t);
        return n;
      },
      S = w.expr.match.needsContext;
    function k(t, e) {
      return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase();
    }
    var P = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
    function N(t, e, n) {
      return p(e)
        ? w.grep(t, function (t, i) {
            return !!e.call(t, i, t) !== n;
          })
        : e.nodeType
        ? w.grep(t, function (t) {
            return (t === e) !== n;
          })
        : "string" != typeof e
        ? w.grep(t, function (t) {
            return a.call(e, t) > -1 !== n;
          })
        : w.filter(e, t, n);
    }
    (w.filter = function (t, e, n) {
      var i = e[0];
      return (
        n && (t = ":not(" + t + ")"),
        1 === e.length && 1 === i.nodeType
          ? w.find.matchesSelector(i, t)
            ? [i]
            : []
          : w.find.matches(
              t,
              w.grep(e, function (t) {
                return 1 === t.nodeType;
              })
            )
      );
    }),
      w.fn.extend({
        find: function (t) {
          var e,
            n,
            i = this.length,
            o = this;
          if ("string" != typeof t)
            return this.pushStack(
              w(t).filter(function () {
                for (e = 0; e < i; e++) if (w.contains(o[e], this)) return !0;
              })
            );
          for (n = this.pushStack([]), e = 0; e < i; e++) w.find(t, o[e], n);
          return i > 1 ? w.uniqueSort(n) : n;
        },
        filter: function (t) {
          return this.pushStack(N(this, t || [], !1));
        },
        not: function (t) {
          return this.pushStack(N(this, t || [], !0));
        },
        is: function (t) {
          return !!N(
            this,
            "string" == typeof t && S.test(t) ? w(t) : t || [],
            !1
          ).length;
        },
      });
    var D,
      A = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    ((w.fn.init = function (t, e, n) {
      var i, o;
      if (!t) return this;
      if (((n = n || D), "string" == typeof t)) {
        if (
          !(i =
            "<" === t[0] && ">" === t[t.length - 1] && t.length >= 3
              ? [null, t, null]
              : A.exec(t)) ||
          (!i[1] && e)
        )
          return !e || e.jquery
            ? (e || n).find(t)
            : this.constructor(e).find(t);
        if (i[1]) {
          if (
            ((e = e instanceof w ? e[0] : e),
            w.merge(
              this,
              w.parseHTML(i[1], e && e.nodeType ? e.ownerDocument || e : m, !0)
            ),
            P.test(i[1]) && w.isPlainObject(e))
          )
            for (i in e) p(this[i]) ? this[i](e[i]) : this.attr(i, e[i]);
          return this;
        }
        return (
          (o = m.getElementById(i[2])) && ((this[0] = o), (this.length = 1)),
          this
        );
      }
      return t.nodeType
        ? ((this[0] = t), (this.length = 1), this)
        : p(t)
        ? void 0 !== n.ready
          ? n.ready(t)
          : t(w)
        : w.makeArray(t, this);
    }).prototype = w.fn),
      (D = w(m));
    var I = /^(?:parents|prev(?:Until|All))/,
      O = { children: !0, contents: !0, next: !0, prev: !0 };
    function L(t, e) {
      for (; (t = t[e]) && 1 !== t.nodeType; );
      return t;
    }
    w.fn.extend({
      has: function (t) {
        var e = w(t, this),
          n = e.length;
        return this.filter(function () {
          for (var t = 0; t < n; t++) if (w.contains(this, e[t])) return !0;
        });
      },
      closest: function (t, e) {
        var n,
          i = 0,
          o = this.length,
          r = [],
          s = "string" != typeof t && w(t);
        if (!S.test(t))
          for (; i < o; i++)
            for (n = this[i]; n && n !== e; n = n.parentNode)
              if (
                n.nodeType < 11 &&
                (s
                  ? s.index(n) > -1
                  : 1 === n.nodeType && w.find.matchesSelector(n, t))
              ) {
                r.push(n);
                break;
              }
        return this.pushStack(r.length > 1 ? w.uniqueSort(r) : r);
      },
      index: function (t) {
        return t
          ? "string" == typeof t
            ? a.call(w(t), this[0])
            : a.call(this, t.jquery ? t[0] : t)
          : this[0] && this[0].parentNode
          ? this.first().prevAll().length
          : -1;
      },
      add: function (t, e) {
        return this.pushStack(w.uniqueSort(w.merge(this.get(), w(t, e))));
      },
      addBack: function (t) {
        return this.add(
          null == t ? this.prevObject : this.prevObject.filter(t)
        );
      },
    }),
      w.each(
        {
          parent: function (t) {
            var e = t.parentNode;
            return e && 11 !== e.nodeType ? e : null;
          },
          parents: function (t) {
            return E(t, "parentNode");
          },
          parentsUntil: function (t, e, n) {
            return E(t, "parentNode", n);
          },
          next: function (t) {
            return L(t, "nextSibling");
          },
          prev: function (t) {
            return L(t, "previousSibling");
          },
          nextAll: function (t) {
            return E(t, "nextSibling");
          },
          prevAll: function (t) {
            return E(t, "previousSibling");
          },
          nextUntil: function (t, e, n) {
            return E(t, "nextSibling", n);
          },
          prevUntil: function (t, e, n) {
            return E(t, "previousSibling", n);
          },
          siblings: function (t) {
            return T((t.parentNode || {}).firstChild, t);
          },
          children: function (t) {
            return T(t.firstChild);
          },
          contents: function (t) {
            return null != t.contentDocument && i(t.contentDocument)
              ? t.contentDocument
              : (k(t, "template") && (t = t.content || t),
                w.merge([], t.childNodes));
          },
        },
        function (t, e) {
          w.fn[t] = function (n, i) {
            var o = w.map(this, e, n);
            return (
              "Until" !== t.slice(-5) && (i = n),
              i && "string" == typeof i && (o = w.filter(i, o)),
              this.length > 1 &&
                (O[t] || w.uniqueSort(o), I.test(t) && o.reverse()),
              this.pushStack(o)
            );
          };
        }
      );
    var j = /[^\x20\t\r\n\f]+/g;
    function H(t) {
      return t;
    }
    function M(t) {
      throw t;
    }
    function q(t, e, n, i) {
      var o;
      try {
        t && p((o = t.promise))
          ? o.call(t).done(e).fail(n)
          : t && p((o = t.then))
          ? o.call(t, e, n)
          : e.apply(void 0, [t].slice(i));
      } catch (t) {
        n.apply(void 0, [t]);
      }
    }
    (w.Callbacks = function (t) {
      t =
        "string" == typeof t
          ? (function (t) {
              var e = {};
              return (
                w.each(t.match(j) || [], function (t, n) {
                  e[n] = !0;
                }),
                e
              );
            })(t)
          : w.extend({}, t);
      var e,
        n,
        i,
        o,
        r = [],
        s = [],
        a = -1,
        l = function () {
          for (o = o || t.once, i = e = !0; s.length; a = -1)
            for (n = s.shift(); ++a < r.length; )
              !1 === r[a].apply(n[0], n[1]) &&
                t.stopOnFalse &&
                ((a = r.length), (n = !1));
          t.memory || (n = !1), (e = !1), o && (r = n ? [] : "");
        },
        c = {
          add: function () {
            return (
              r &&
                (n && !e && ((a = r.length - 1), s.push(n)),
                (function e(n) {
                  w.each(n, function (n, i) {
                    p(i)
                      ? (t.unique && c.has(i)) || r.push(i)
                      : i && i.length && "string" !== y(i) && e(i);
                  });
                })(arguments),
                n && !e && l()),
              this
            );
          },
          remove: function () {
            return (
              w.each(arguments, function (t, e) {
                for (var n; (n = w.inArray(e, r, n)) > -1; )
                  r.splice(n, 1), n <= a && a--;
              }),
              this
            );
          },
          has: function (t) {
            return t ? w.inArray(t, r) > -1 : r.length > 0;
          },
          empty: function () {
            return r && (r = []), this;
          },
          disable: function () {
            return (o = s = []), (r = n = ""), this;
          },
          disabled: function () {
            return !r;
          },
          lock: function () {
            return (o = s = []), n || e || (r = n = ""), this;
          },
          locked: function () {
            return !!o;
          },
          fireWith: function (t, n) {
            return (
              o ||
                ((n = [t, (n = n || []).slice ? n.slice() : n]),
                s.push(n),
                e || l()),
              this
            );
          },
          fire: function () {
            return c.fireWith(this, arguments), this;
          },
          fired: function () {
            return !!i;
          },
        };
      return c;
    }),
      w.extend({
        Deferred: function (e) {
          var n = [
              [
                "notify",
                "progress",
                w.Callbacks("memory"),
                w.Callbacks("memory"),
                2,
              ],
              [
                "resolve",
                "done",
                w.Callbacks("once memory"),
                w.Callbacks("once memory"),
                0,
                "resolved",
              ],
              [
                "reject",
                "fail",
                w.Callbacks("once memory"),
                w.Callbacks("once memory"),
                1,
                "rejected",
              ],
            ],
            i = "pending",
            o = {
              state: function () {
                return i;
              },
              always: function () {
                return r.done(arguments).fail(arguments), this;
              },
              catch: function (t) {
                return o.then(null, t);
              },
              pipe: function () {
                var t = arguments;
                return w
                  .Deferred(function (e) {
                    w.each(n, function (n, i) {
                      var o = p(t[i[4]]) && t[i[4]];
                      r[i[1]](function () {
                        var t = o && o.apply(this, arguments);
                        t && p(t.promise)
                          ? t
                              .promise()
                              .progress(e.notify)
                              .done(e.resolve)
                              .fail(e.reject)
                          : e[i[0] + "With"](this, o ? [t] : arguments);
                      });
                    }),
                      (t = null);
                  })
                  .promise();
              },
              then: function (e, i, o) {
                var r = 0;
                function s(e, n, i, o) {
                  return function () {
                    var a = this,
                      l = arguments,
                      c = function () {
                        var t, c;
                        if (!(e < r)) {
                          if ((t = i.apply(a, l)) === n.promise())
                            throw new TypeError("Thenable self-resolution");
                          (c =
                            t &&
                            ("object" == typeof t || "function" == typeof t) &&
                            t.then),
                            p(c)
                              ? o
                                ? c.call(t, s(r, n, H, o), s(r, n, M, o))
                                : (r++,
                                  c.call(
                                    t,
                                    s(r, n, H, o),
                                    s(r, n, M, o),
                                    s(r, n, H, n.notifyWith)
                                  ))
                              : (i !== H && ((a = void 0), (l = [t])),
                                (o || n.resolveWith)(a, l));
                        }
                      },
                      u = o
                        ? c
                        : function () {
                            try {
                              c();
                            } catch (t) {
                              w.Deferred.exceptionHook &&
                                w.Deferred.exceptionHook(t, u.stackTrace),
                                e + 1 >= r &&
                                  (i !== M && ((a = void 0), (l = [t])),
                                  n.rejectWith(a, l));
                            }
                          };
                    e
                      ? u()
                      : (w.Deferred.getStackHook &&
                          (u.stackTrace = w.Deferred.getStackHook()),
                        t.setTimeout(u));
                  };
                }
                return w
                  .Deferred(function (t) {
                    n[0][3].add(s(0, t, p(o) ? o : H, t.notifyWith)),
                      n[1][3].add(s(0, t, p(e) ? e : H)),
                      n[2][3].add(s(0, t, p(i) ? i : M));
                  })
                  .promise();
              },
              promise: function (t) {
                return null != t ? w.extend(t, o) : o;
              },
            },
            r = {};
          return (
            w.each(n, function (t, e) {
              var s = e[2],
                a = e[5];
              (o[e[1]] = s.add),
                a &&
                  s.add(
                    function () {
                      i = a;
                    },
                    n[3 - t][2].disable,
                    n[3 - t][3].disable,
                    n[0][2].lock,
                    n[0][3].lock
                  ),
                s.add(e[3].fire),
                (r[e[0]] = function () {
                  return (
                    r[e[0] + "With"](this === r ? void 0 : this, arguments),
                    this
                  );
                }),
                (r[e[0] + "With"] = s.fireWith);
            }),
            o.promise(r),
            e && e.call(r, r),
            r
          );
        },
        when: function (t) {
          var e = arguments.length,
            n = e,
            i = Array(n),
            r = o.call(arguments),
            s = w.Deferred(),
            a = function (t) {
              return function (n) {
                (i[t] = this),
                  (r[t] = arguments.length > 1 ? o.call(arguments) : n),
                  --e || s.resolveWith(i, r);
              };
            };
          if (
            e <= 1 &&
            (q(t, s.done(a(n)).resolve, s.reject, !e),
            "pending" === s.state() || p(r[n] && r[n].then))
          )
            return s.then();
          for (; n--; ) q(r[n], a(n), s.reject);
          return s.promise();
        },
      });
    var R = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    (w.Deferred.exceptionHook = function (e, n) {
      t.console &&
        t.console.warn &&
        e &&
        R.test(e.name) &&
        t.console.warn("jQuery.Deferred exception: " + e.message, e.stack, n);
    }),
      (w.readyException = function (e) {
        t.setTimeout(function () {
          throw e;
        });
      });
    var B = w.Deferred();
    function F() {
      m.removeEventListener("DOMContentLoaded", F),
        t.removeEventListener("load", F),
        w.ready();
    }
    (w.fn.ready = function (t) {
      return (
        B.then(t).catch(function (t) {
          w.readyException(t);
        }),
        this
      );
    }),
      w.extend({
        isReady: !1,
        readyWait: 1,
        ready: function (t) {
          (!0 === t ? --w.readyWait : w.isReady) ||
            ((w.isReady = !0),
            (!0 !== t && --w.readyWait > 0) || B.resolveWith(m, [w]));
        },
      }),
      (w.ready.then = B.then),
      "complete" === m.readyState ||
      ("loading" !== m.readyState && !m.documentElement.doScroll)
        ? t.setTimeout(w.ready)
        : (m.addEventListener("DOMContentLoaded", F),
          t.addEventListener("load", F));
    var W = function (t, e, n, i, o, r, s) {
        var a = 0,
          l = t.length,
          c = null == n;
        if ("object" === y(n))
          for (a in ((o = !0), n)) W(t, e, a, n[a], !0, r, s);
        else if (
          void 0 !== i &&
          ((o = !0),
          p(i) || (s = !0),
          c &&
            (s
              ? (e.call(t, i), (e = null))
              : ((c = e),
                (e = function (t, e, n) {
                  return c.call(w(t), n);
                }))),
          e)
        )
          for (; a < l; a++) e(t[a], n, s ? i : i.call(t[a], a, e(t[a], n)));
        return o ? t : c ? e.call(t) : l ? e(t[0], n) : r;
      },
      z = /^-ms-/,
      U = /-([a-z])/g;
    function Y(t, e) {
      return e.toUpperCase();
    }
    function V(t) {
      return t.replace(z, "ms-").replace(U, Y);
    }
    var X = function (t) {
      return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType;
    };
    function Q() {
      this.expando = w.expando + Q.uid++;
    }
    (Q.uid = 1),
      (Q.prototype = {
        cache: function (t) {
          var e = t[this.expando];
          return (
            e ||
              ((e = {}),
              X(t) &&
                (t.nodeType
                  ? (t[this.expando] = e)
                  : Object.defineProperty(t, this.expando, {
                      value: e,
                      configurable: !0,
                    }))),
            e
          );
        },
        set: function (t, e, n) {
          var i,
            o = this.cache(t);
          if ("string" == typeof e) o[V(e)] = n;
          else for (i in e) o[V(i)] = e[i];
          return o;
        },
        get: function (t, e) {
          return void 0 === e
            ? this.cache(t)
            : t[this.expando] && t[this.expando][V(e)];
        },
        access: function (t, e, n) {
          return void 0 === e || (e && "string" == typeof e && void 0 === n)
            ? this.get(t, e)
            : (this.set(t, e, n), void 0 !== n ? n : e);
        },
        remove: function (t, e) {
          var n,
            i = t[this.expando];
          if (void 0 !== i) {
            if (void 0 !== e) {
              n = (e = Array.isArray(e)
                ? e.map(V)
                : (e = V(e)) in i
                ? [e]
                : e.match(j) || []).length;
              for (; n--; ) delete i[e[n]];
            }
            (void 0 === e || w.isEmptyObject(i)) &&
              (t.nodeType
                ? (t[this.expando] = void 0)
                : delete t[this.expando]);
          }
        },
        hasData: function (t) {
          var e = t[this.expando];
          return void 0 !== e && !w.isEmptyObject(e);
        },
      });
    var $ = new Q(),
      K = new Q(),
      G = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      J = /[A-Z]/g;
    function Z(t, e, n) {
      var i;
      if (void 0 === n && 1 === t.nodeType)
        if (
          ((i = "data-" + e.replace(J, "-$&").toLowerCase()),
          "string" == typeof (n = t.getAttribute(i)))
        ) {
          try {
            n = (function (t) {
              return (
                "true" === t ||
                ("false" !== t &&
                  ("null" === t
                    ? null
                    : t === +t + ""
                    ? +t
                    : G.test(t)
                    ? JSON.parse(t)
                    : t))
              );
            })(n);
          } catch (t) {}
          K.set(t, e, n);
        } else n = void 0;
      return n;
    }
    w.extend({
      hasData: function (t) {
        return K.hasData(t) || $.hasData(t);
      },
      data: function (t, e, n) {
        return K.access(t, e, n);
      },
      removeData: function (t, e) {
        K.remove(t, e);
      },
      _data: function (t, e, n) {
        return $.access(t, e, n);
      },
      _removeData: function (t, e) {
        $.remove(t, e);
      },
    }),
      w.fn.extend({
        data: function (t, e) {
          var n,
            i,
            o,
            r = this[0],
            s = r && r.attributes;
          if (void 0 === t) {
            if (
              this.length &&
              ((o = K.get(r)), 1 === r.nodeType && !$.get(r, "hasDataAttrs"))
            ) {
              for (n = s.length; n--; )
                s[n] &&
                  0 === (i = s[n].name).indexOf("data-") &&
                  ((i = V(i.slice(5))), Z(r, i, o[i]));
              $.set(r, "hasDataAttrs", !0);
            }
            return o;
          }
          return "object" == typeof t
            ? this.each(function () {
                K.set(this, t);
              })
            : W(
                this,
                function (e) {
                  var n;
                  if (r && void 0 === e)
                    return void 0 !== (n = K.get(r, t)) ||
                      void 0 !== (n = Z(r, t))
                      ? n
                      : void 0;
                  this.each(function () {
                    K.set(this, t, e);
                  });
                },
                null,
                e,
                arguments.length > 1,
                null,
                !0
              );
        },
        removeData: function (t) {
          return this.each(function () {
            K.remove(this, t);
          });
        },
      }),
      w.extend({
        queue: function (t, e, n) {
          var i;
          if (t)
            return (
              (e = (e || "fx") + "queue"),
              (i = $.get(t, e)),
              n &&
                (!i || Array.isArray(n)
                  ? (i = $.access(t, e, w.makeArray(n)))
                  : i.push(n)),
              i || []
            );
        },
        dequeue: function (t, e) {
          e = e || "fx";
          var n = w.queue(t, e),
            i = n.length,
            o = n.shift(),
            r = w._queueHooks(t, e);
          "inprogress" === o && ((o = n.shift()), i--),
            o &&
              ("fx" === e && n.unshift("inprogress"),
              delete r.stop,
              o.call(
                t,
                function () {
                  w.dequeue(t, e);
                },
                r
              )),
            !i && r && r.empty.fire();
        },
        _queueHooks: function (t, e) {
          var n = e + "queueHooks";
          return (
            $.get(t, n) ||
            $.access(t, n, {
              empty: w.Callbacks("once memory").add(function () {
                $.remove(t, [e + "queue", n]);
              }),
            })
          );
        },
      }),
      w.fn.extend({
        queue: function (t, e) {
          var n = 2;
          return (
            "string" != typeof t && ((e = t), (t = "fx"), n--),
            arguments.length < n
              ? w.queue(this[0], t)
              : void 0 === e
              ? this
              : this.each(function () {
                  var n = w.queue(this, t, e);
                  w._queueHooks(this, t),
                    "fx" === t && "inprogress" !== n[0] && w.dequeue(this, t);
                })
          );
        },
        dequeue: function (t) {
          return this.each(function () {
            w.dequeue(this, t);
          });
        },
        clearQueue: function (t) {
          return this.queue(t || "fx", []);
        },
        promise: function (t, e) {
          var n,
            i = 1,
            o = w.Deferred(),
            r = this,
            s = this.length,
            a = function () {
              --i || o.resolveWith(r, [r]);
            };
          for (
            "string" != typeof t && ((e = t), (t = void 0)), t = t || "fx";
            s--;

          )
            (n = $.get(r[s], t + "queueHooks")) &&
              n.empty &&
              (i++, n.empty.add(a));
          return a(), o.promise(e);
        },
      });
    var tt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
      et = new RegExp("^(?:([+-])=|)(" + tt + ")([a-z%]*)$", "i"),
      nt = ["Top", "Right", "Bottom", "Left"],
      it = m.documentElement,
      ot = function (t) {
        return w.contains(t.ownerDocument, t);
      },
      rt = { composed: !0 };
    it.getRootNode &&
      (ot = function (t) {
        return (
          w.contains(t.ownerDocument, t) ||
          t.getRootNode(rt) === t.ownerDocument
        );
      });
    var st = function (t, e) {
      return (
        "none" === (t = e || t).style.display ||
        ("" === t.style.display && ot(t) && "none" === w.css(t, "display"))
      );
    };
    function at(t, e, n, i) {
      var o,
        r,
        s = 20,
        a = i
          ? function () {
              return i.cur();
            }
          : function () {
              return w.css(t, e, "");
            },
        l = a(),
        c = (n && n[3]) || (w.cssNumber[e] ? "" : "px"),
        u =
          t.nodeType &&
          (w.cssNumber[e] || ("px" !== c && +l)) &&
          et.exec(w.css(t, e));
      if (u && u[3] !== c) {
        for (l /= 2, c = c || u[3], u = +l || 1; s--; )
          w.style(t, e, u + c),
            (1 - r) * (1 - (r = a() / l || 0.5)) <= 0 && (s = 0),
            (u /= r);
        (u *= 2), w.style(t, e, u + c), (n = n || []);
      }
      return (
        n &&
          ((u = +u || +l || 0),
          (o = n[1] ? u + (n[1] + 1) * n[2] : +n[2]),
          i && ((i.unit = c), (i.start = u), (i.end = o))),
        o
      );
    }
    var lt = {};
    function ct(t) {
      var e,
        n = t.ownerDocument,
        i = t.nodeName,
        o = lt[i];
      return (
        o ||
        ((e = n.body.appendChild(n.createElement(i))),
        (o = w.css(e, "display")),
        e.parentNode.removeChild(e),
        "none" === o && (o = "block"),
        (lt[i] = o),
        o)
      );
    }
    function ut(t, e) {
      for (var n, i, o = [], r = 0, s = t.length; r < s; r++)
        (i = t[r]).style &&
          ((n = i.style.display),
          e
            ? ("none" === n &&
                ((o[r] = $.get(i, "display") || null),
                o[r] || (i.style.display = "")),
              "" === i.style.display && st(i) && (o[r] = ct(i)))
            : "none" !== n && ((o[r] = "none"), $.set(i, "display", n)));
      for (r = 0; r < s; r++) null != o[r] && (t[r].style.display = o[r]);
      return t;
    }
    w.fn.extend({
      show: function () {
        return ut(this, !0);
      },
      hide: function () {
        return ut(this);
      },
      toggle: function (t) {
        return "boolean" == typeof t
          ? t
            ? this.show()
            : this.hide()
          : this.each(function () {
              st(this) ? w(this).show() : w(this).hide();
            });
      },
    });
    var ft,
      ht,
      dt = /^(?:checkbox|radio)$/i,
      pt = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
      gt = /^$|^module$|\/(?:java|ecma)script/i;
    (ft = m.createDocumentFragment().appendChild(m.createElement("div"))),
      (ht = m.createElement("input")).setAttribute("type", "radio"),
      ht.setAttribute("checked", "checked"),
      ht.setAttribute("name", "t"),
      ft.appendChild(ht),
      (d.checkClone = ft.cloneNode(!0).cloneNode(!0).lastChild.checked),
      (ft.innerHTML = "<textarea>x</textarea>"),
      (d.noCloneChecked = !!ft.cloneNode(!0).lastChild.defaultValue),
      (ft.innerHTML = "<option></option>"),
      (d.option = !!ft.lastChild);
    var mt = {
      thead: [1, "<table>", "</table>"],
      col: [2, "<table><colgroup>", "</colgroup></table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      _default: [0, "", ""],
    };
    function vt(t, e) {
      var n;
      return (
        (n =
          void 0 !== t.getElementsByTagName
            ? t.getElementsByTagName(e || "*")
            : void 0 !== t.querySelectorAll
            ? t.querySelectorAll(e || "*")
            : []),
        void 0 === e || (e && k(t, e)) ? w.merge([t], n) : n
      );
    }
    function bt(t, e) {
      for (var n = 0, i = t.length; n < i; n++)
        $.set(t[n], "globalEval", !e || $.get(e[n], "globalEval"));
    }
    (mt.tbody = mt.tfoot = mt.colgroup = mt.caption = mt.thead),
      (mt.th = mt.td),
      d.option ||
        (mt.optgroup = mt.option =
          [1, "<select multiple='multiple'>", "</select>"]);
    var yt = /<|&#?\w+;/;
    function _t(t, e, n, i, o) {
      for (
        var r,
          s,
          a,
          l,
          c,
          u,
          f = e.createDocumentFragment(),
          h = [],
          d = 0,
          p = t.length;
        d < p;
        d++
      )
        if ((r = t[d]) || 0 === r)
          if ("object" === y(r)) w.merge(h, r.nodeType ? [r] : r);
          else if (yt.test(r)) {
            for (
              s = s || f.appendChild(e.createElement("div")),
                a = (pt.exec(r) || ["", ""])[1].toLowerCase(),
                l = mt[a] || mt._default,
                s.innerHTML = l[1] + w.htmlPrefilter(r) + l[2],
                u = l[0];
              u--;

            )
              s = s.lastChild;
            w.merge(h, s.childNodes), ((s = f.firstChild).textContent = "");
          } else h.push(e.createTextNode(r));
      for (f.textContent = "", d = 0; (r = h[d++]); )
        if (i && w.inArray(r, i) > -1) o && o.push(r);
        else if (
          ((c = ot(r)), (s = vt(f.appendChild(r), "script")), c && bt(s), n)
        )
          for (u = 0; (r = s[u++]); ) gt.test(r.type || "") && n.push(r);
      return f;
    }
    var wt = /^key/,
      xt = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
      Ct = /^([^.]*)(?:\.(.+)|)/;
    function Et() {
      return !0;
    }
    function Tt() {
      return !1;
    }
    function St(t, e) {
      return (
        (t ===
          (function () {
            try {
              return m.activeElement;
            } catch (t) {}
          })()) ==
        ("focus" === e)
      );
    }
    function kt(t, e, n, i, o, r) {
      var s, a;
      if ("object" == typeof e) {
        for (a in ("string" != typeof n && ((i = i || n), (n = void 0)), e))
          kt(t, a, n, i, e[a], r);
        return t;
      }
      if (
        (null == i && null == o
          ? ((o = n), (i = n = void 0))
          : null == o &&
            ("string" == typeof n
              ? ((o = i), (i = void 0))
              : ((o = i), (i = n), (n = void 0))),
        !1 === o)
      )
        o = Tt;
      else if (!o) return t;
      return (
        1 === r &&
          ((s = o),
          (o = function (t) {
            return w().off(t), s.apply(this, arguments);
          }),
          (o.guid = s.guid || (s.guid = w.guid++))),
        t.each(function () {
          w.event.add(this, e, o, i, n);
        })
      );
    }
    function Pt(t, e, n) {
      n
        ? ($.set(t, e, !1),
          w.event.add(t, e, {
            namespace: !1,
            handler: function (t) {
              var i,
                r,
                s = $.get(this, e);
              if (1 & t.isTrigger && this[e]) {
                if (s.length)
                  (w.event.special[e] || {}).delegateType &&
                    t.stopPropagation();
                else if (
                  ((s = o.call(arguments)),
                  $.set(this, e, s),
                  (i = n(this, e)),
                  this[e](),
                  s !== (r = $.get(this, e)) || i
                    ? $.set(this, e, !1)
                    : (r = {}),
                  s !== r)
                )
                  return (
                    t.stopImmediatePropagation(), t.preventDefault(), r.value
                  );
              } else
                s.length &&
                  ($.set(this, e, {
                    value: w.event.trigger(
                      w.extend(s[0], w.Event.prototype),
                      s.slice(1),
                      this
                    ),
                  }),
                  t.stopImmediatePropagation());
            },
          }))
        : void 0 === $.get(t, e) && w.event.add(t, e, Et);
    }
    (w.event = {
      global: {},
      add: function (t, e, n, i, o) {
        var r,
          s,
          a,
          l,
          c,
          u,
          f,
          h,
          d,
          p,
          g,
          m = $.get(t);
        if (X(t))
          for (
            n.handler && ((n = (r = n).handler), (o = r.selector)),
              o && w.find.matchesSelector(it, o),
              n.guid || (n.guid = w.guid++),
              (l = m.events) || (l = m.events = Object.create(null)),
              (s = m.handle) ||
                (s = m.handle =
                  function (e) {
                    return void 0 !== w && w.event.triggered !== e.type
                      ? w.event.dispatch.apply(t, arguments)
                      : void 0;
                  }),
              c = (e = (e || "").match(j) || [""]).length;
            c--;

          )
            (d = g = (a = Ct.exec(e[c]) || [])[1]),
              (p = (a[2] || "").split(".").sort()),
              d &&
                ((f = w.event.special[d] || {}),
                (d = (o ? f.delegateType : f.bindType) || d),
                (f = w.event.special[d] || {}),
                (u = w.extend(
                  {
                    type: d,
                    origType: g,
                    data: i,
                    handler: n,
                    guid: n.guid,
                    selector: o,
                    needsContext: o && w.expr.match.needsContext.test(o),
                    namespace: p.join("."),
                  },
                  r
                )),
                (h = l[d]) ||
                  (((h = l[d] = []).delegateCount = 0),
                  (f.setup && !1 !== f.setup.call(t, i, p, s)) ||
                    (t.addEventListener && t.addEventListener(d, s))),
                f.add &&
                  (f.add.call(t, u),
                  u.handler.guid || (u.handler.guid = n.guid)),
                o ? h.splice(h.delegateCount++, 0, u) : h.push(u),
                (w.event.global[d] = !0));
      },
      remove: function (t, e, n, i, o) {
        var r,
          s,
          a,
          l,
          c,
          u,
          f,
          h,
          d,
          p,
          g,
          m = $.hasData(t) && $.get(t);
        if (m && (l = m.events)) {
          for (c = (e = (e || "").match(j) || [""]).length; c--; )
            if (
              ((d = g = (a = Ct.exec(e[c]) || [])[1]),
              (p = (a[2] || "").split(".").sort()),
              d)
            ) {
              for (
                f = w.event.special[d] || {},
                  h = l[(d = (i ? f.delegateType : f.bindType) || d)] || [],
                  a =
                    a[2] &&
                    new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                  s = r = h.length;
                r--;

              )
                (u = h[r]),
                  (!o && g !== u.origType) ||
                    (n && n.guid !== u.guid) ||
                    (a && !a.test(u.namespace)) ||
                    (i && i !== u.selector && ("**" !== i || !u.selector)) ||
                    (h.splice(r, 1),
                    u.selector && h.delegateCount--,
                    f.remove && f.remove.call(t, u));
              s &&
                !h.length &&
                ((f.teardown && !1 !== f.teardown.call(t, p, m.handle)) ||
                  w.removeEvent(t, d, m.handle),
                delete l[d]);
            } else for (d in l) w.event.remove(t, d + e[c], n, i, !0);
          w.isEmptyObject(l) && $.remove(t, "handle events");
        }
      },
      dispatch: function (t) {
        var e,
          n,
          i,
          o,
          r,
          s,
          a = new Array(arguments.length),
          l = w.event.fix(t),
          c = ($.get(this, "events") || Object.create(null))[l.type] || [],
          u = w.event.special[l.type] || {};
        for (a[0] = l, e = 1; e < arguments.length; e++) a[e] = arguments[e];
        if (
          ((l.delegateTarget = this),
          !u.preDispatch || !1 !== u.preDispatch.call(this, l))
        ) {
          for (
            s = w.event.handlers.call(this, l, c), e = 0;
            (o = s[e++]) && !l.isPropagationStopped();

          )
            for (
              l.currentTarget = o.elem, n = 0;
              (r = o.handlers[n++]) && !l.isImmediatePropagationStopped();

            )
              (l.rnamespace &&
                !1 !== r.namespace &&
                !l.rnamespace.test(r.namespace)) ||
                ((l.handleObj = r),
                (l.data = r.data),
                void 0 !==
                  (i = (
                    (w.event.special[r.origType] || {}).handle || r.handler
                  ).apply(o.elem, a)) &&
                  !1 === (l.result = i) &&
                  (l.preventDefault(), l.stopPropagation()));
          return u.postDispatch && u.postDispatch.call(this, l), l.result;
        }
      },
      handlers: function (t, e) {
        var n,
          i,
          o,
          r,
          s,
          a = [],
          l = e.delegateCount,
          c = t.target;
        if (l && c.nodeType && !("click" === t.type && t.button >= 1))
          for (; c !== this; c = c.parentNode || this)
            if (1 === c.nodeType && ("click" !== t.type || !0 !== c.disabled)) {
              for (r = [], s = {}, n = 0; n < l; n++)
                void 0 === s[(o = (i = e[n]).selector + " ")] &&
                  (s[o] = i.needsContext
                    ? w(o, this).index(c) > -1
                    : w.find(o, this, null, [c]).length),
                  s[o] && r.push(i);
              r.length && a.push({ elem: c, handlers: r });
            }
        return (
          (c = this),
          l < e.length && a.push({ elem: c, handlers: e.slice(l) }),
          a
        );
      },
      addProp: function (t, e) {
        Object.defineProperty(w.Event.prototype, t, {
          enumerable: !0,
          configurable: !0,
          get: p(e)
            ? function () {
                if (this.originalEvent) return e(this.originalEvent);
              }
            : function () {
                if (this.originalEvent) return this.originalEvent[t];
              },
          set: function (e) {
            Object.defineProperty(this, t, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: e,
            });
          },
        });
      },
      fix: function (t) {
        return t[w.expando] ? t : new w.Event(t);
      },
      special: {
        load: { noBubble: !0 },
        click: {
          setup: function (t) {
            var e = this || t;
            return (
              dt.test(e.type) && e.click && k(e, "input") && Pt(e, "click", Et),
              !1
            );
          },
          trigger: function (t) {
            var e = this || t;
            return (
              dt.test(e.type) && e.click && k(e, "input") && Pt(e, "click"), !0
            );
          },
          _default: function (t) {
            var e = t.target;
            return (
              (dt.test(e.type) &&
                e.click &&
                k(e, "input") &&
                $.get(e, "click")) ||
              k(e, "a")
            );
          },
        },
        beforeunload: {
          postDispatch: function (t) {
            void 0 !== t.result &&
              t.originalEvent &&
              (t.originalEvent.returnValue = t.result);
          },
        },
      },
    }),
      (w.removeEvent = function (t, e, n) {
        t.removeEventListener && t.removeEventListener(e, n);
      }),
      (w.Event = function (t, e) {
        if (!(this instanceof w.Event)) return new w.Event(t, e);
        t && t.type
          ? ((this.originalEvent = t),
            (this.type = t.type),
            (this.isDefaultPrevented =
              t.defaultPrevented ||
              (void 0 === t.defaultPrevented && !1 === t.returnValue)
                ? Et
                : Tt),
            (this.target =
              t.target && 3 === t.target.nodeType
                ? t.target.parentNode
                : t.target),
            (this.currentTarget = t.currentTarget),
            (this.relatedTarget = t.relatedTarget))
          : (this.type = t),
          e && w.extend(this, e),
          (this.timeStamp = (t && t.timeStamp) || Date.now()),
          (this[w.expando] = !0);
      }),
      (w.Event.prototype = {
        constructor: w.Event,
        isDefaultPrevented: Tt,
        isPropagationStopped: Tt,
        isImmediatePropagationStopped: Tt,
        isSimulated: !1,
        preventDefault: function () {
          var t = this.originalEvent;
          (this.isDefaultPrevented = Et),
            t && !this.isSimulated && t.preventDefault();
        },
        stopPropagation: function () {
          var t = this.originalEvent;
          (this.isPropagationStopped = Et),
            t && !this.isSimulated && t.stopPropagation();
        },
        stopImmediatePropagation: function () {
          var t = this.originalEvent;
          (this.isImmediatePropagationStopped = Et),
            t && !this.isSimulated && t.stopImmediatePropagation(),
            this.stopPropagation();
        },
      }),
      w.each(
        {
          altKey: !0,
          bubbles: !0,
          cancelable: !0,
          changedTouches: !0,
          ctrlKey: !0,
          detail: !0,
          eventPhase: !0,
          metaKey: !0,
          pageX: !0,
          pageY: !0,
          shiftKey: !0,
          view: !0,
          char: !0,
          code: !0,
          charCode: !0,
          key: !0,
          keyCode: !0,
          button: !0,
          buttons: !0,
          clientX: !0,
          clientY: !0,
          offsetX: !0,
          offsetY: !0,
          pointerId: !0,
          pointerType: !0,
          screenX: !0,
          screenY: !0,
          targetTouches: !0,
          toElement: !0,
          touches: !0,
          which: function (t) {
            var e = t.button;
            return null == t.which && wt.test(t.type)
              ? null != t.charCode
                ? t.charCode
                : t.keyCode
              : !t.which && void 0 !== e && xt.test(t.type)
              ? 1 & e
                ? 1
                : 2 & e
                ? 3
                : 4 & e
                ? 2
                : 0
              : t.which;
          },
        },
        w.event.addProp
      ),
      w.each({ focus: "focusin", blur: "focusout" }, function (t, e) {
        w.event.special[t] = {
          setup: function () {
            return Pt(this, t, St), !1;
          },
          trigger: function () {
            return Pt(this, t), !0;
          },
          delegateType: e,
        };
      }),
      w.each(
        {
          mouseenter: "mouseover",
          mouseleave: "mouseout",
          pointerenter: "pointerover",
          pointerleave: "pointerout",
        },
        function (t, e) {
          w.event.special[t] = {
            delegateType: e,
            bindType: e,
            handle: function (t) {
              var n,
                i = t.relatedTarget,
                o = t.handleObj;
              return (
                (i && (i === this || w.contains(this, i))) ||
                  ((t.type = o.origType),
                  (n = o.handler.apply(this, arguments)),
                  (t.type = e)),
                n
              );
            },
          };
        }
      ),
      w.fn.extend({
        on: function (t, e, n, i) {
          return kt(this, t, e, n, i);
        },
        one: function (t, e, n, i) {
          return kt(this, t, e, n, i, 1);
        },
        off: function (t, e, n) {
          var i, o;
          if (t && t.preventDefault && t.handleObj)
            return (
              (i = t.handleObj),
              w(t.delegateTarget).off(
                i.namespace ? i.origType + "." + i.namespace : i.origType,
                i.selector,
                i.handler
              ),
              this
            );
          if ("object" == typeof t) {
            for (o in t) this.off(o, e, t[o]);
            return this;
          }
          return (
            (!1 !== e && "function" != typeof e) || ((n = e), (e = void 0)),
            !1 === n && (n = Tt),
            this.each(function () {
              w.event.remove(this, t, n, e);
            })
          );
        },
      });
    var Nt = /<script|<style|<link/i,
      Dt = /checked\s*(?:[^=]|=\s*.checked.)/i,
      At = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    function It(t, e) {
      return (
        (k(t, "table") &&
          k(11 !== e.nodeType ? e : e.firstChild, "tr") &&
          w(t).children("tbody")[0]) ||
        t
      );
    }
    function Ot(t) {
      return (t.type = (null !== t.getAttribute("type")) + "/" + t.type), t;
    }
    function Lt(t) {
      return (
        "true/" === (t.type || "").slice(0, 5)
          ? (t.type = t.type.slice(5))
          : t.removeAttribute("type"),
        t
      );
    }
    function jt(t, e) {
      var n, i, o, r, s, a;
      if (1 === e.nodeType) {
        if ($.hasData(t) && (a = $.get(t).events))
          for (o in ($.remove(e, "handle events"), a))
            for (n = 0, i = a[o].length; n < i; n++) w.event.add(e, o, a[o][n]);
        K.hasData(t) && ((r = K.access(t)), (s = w.extend({}, r)), K.set(e, s));
      }
    }
    function Ht(t, e) {
      var n = e.nodeName.toLowerCase();
      "input" === n && dt.test(t.type)
        ? (e.checked = t.checked)
        : ("input" !== n && "textarea" !== n) ||
          (e.defaultValue = t.defaultValue);
    }
    function Mt(t, e, n, i) {
      e = r(e);
      var o,
        s,
        a,
        l,
        c,
        u,
        f = 0,
        h = t.length,
        g = h - 1,
        m = e[0],
        v = p(m);
      if (v || (h > 1 && "string" == typeof m && !d.checkClone && Dt.test(m)))
        return t.each(function (o) {
          var r = t.eq(o);
          v && (e[0] = m.call(this, o, r.html())), Mt(r, e, n, i);
        });
      if (
        h &&
        ((s = (o = _t(e, t[0].ownerDocument, !1, t, i)).firstChild),
        1 === o.childNodes.length && (o = s),
        s || i)
      ) {
        for (l = (a = w.map(vt(o, "script"), Ot)).length; f < h; f++)
          (c = o),
            f !== g &&
              ((c = w.clone(c, !0, !0)), l && w.merge(a, vt(c, "script"))),
            n.call(t[f], c, f);
        if (l)
          for (
            u = a[a.length - 1].ownerDocument, w.map(a, Lt), f = 0;
            f < l;
            f++
          )
            (c = a[f]),
              gt.test(c.type || "") &&
                !$.access(c, "globalEval") &&
                w.contains(u, c) &&
                (c.src && "module" !== (c.type || "").toLowerCase()
                  ? w._evalUrl &&
                    !c.noModule &&
                    w._evalUrl(
                      c.src,
                      { nonce: c.nonce || c.getAttribute("nonce") },
                      u
                    )
                  : b(c.textContent.replace(At, ""), c, u));
      }
      return t;
    }
    function qt(t, e, n) {
      for (var i, o = e ? w.filter(e, t) : t, r = 0; null != (i = o[r]); r++)
        n || 1 !== i.nodeType || w.cleanData(vt(i)),
          i.parentNode &&
            (n && ot(i) && bt(vt(i, "script")), i.parentNode.removeChild(i));
      return t;
    }
    w.extend({
      htmlPrefilter: function (t) {
        return t;
      },
      clone: function (t, e, n) {
        var i,
          o,
          r,
          s,
          a = t.cloneNode(!0),
          l = ot(t);
        if (
          !(
            d.noCloneChecked ||
            (1 !== t.nodeType && 11 !== t.nodeType) ||
            w.isXMLDoc(t)
          )
        )
          for (s = vt(a), i = 0, o = (r = vt(t)).length; i < o; i++)
            Ht(r[i], s[i]);
        if (e)
          if (n)
            for (
              r = r || vt(t), s = s || vt(a), i = 0, o = r.length;
              i < o;
              i++
            )
              jt(r[i], s[i]);
          else jt(t, a);
        return (
          (s = vt(a, "script")).length > 0 && bt(s, !l && vt(t, "script")), a
        );
      },
      cleanData: function (t) {
        for (
          var e, n, i, o = w.event.special, r = 0;
          void 0 !== (n = t[r]);
          r++
        )
          if (X(n)) {
            if ((e = n[$.expando])) {
              if (e.events)
                for (i in e.events)
                  o[i] ? w.event.remove(n, i) : w.removeEvent(n, i, e.handle);
              n[$.expando] = void 0;
            }
            n[K.expando] && (n[K.expando] = void 0);
          }
      },
    }),
      w.fn.extend({
        detach: function (t) {
          return qt(this, t, !0);
        },
        remove: function (t) {
          return qt(this, t);
        },
        text: function (t) {
          return W(
            this,
            function (t) {
              return void 0 === t
                ? w.text(this)
                : this.empty().each(function () {
                    (1 !== this.nodeType &&
                      11 !== this.nodeType &&
                      9 !== this.nodeType) ||
                      (this.textContent = t);
                  });
            },
            null,
            t,
            arguments.length
          );
        },
        append: function () {
          return Mt(this, arguments, function (t) {
            (1 !== this.nodeType &&
              11 !== this.nodeType &&
              9 !== this.nodeType) ||
              It(this, t).appendChild(t);
          });
        },
        prepend: function () {
          return Mt(this, arguments, function (t) {
            if (
              1 === this.nodeType ||
              11 === this.nodeType ||
              9 === this.nodeType
            ) {
              var e = It(this, t);
              e.insertBefore(t, e.firstChild);
            }
          });
        },
        before: function () {
          return Mt(this, arguments, function (t) {
            this.parentNode && this.parentNode.insertBefore(t, this);
          });
        },
        after: function () {
          return Mt(this, arguments, function (t) {
            this.parentNode &&
              this.parentNode.insertBefore(t, this.nextSibling);
          });
        },
        empty: function () {
          for (var t, e = 0; null != (t = this[e]); e++)
            1 === t.nodeType && (w.cleanData(vt(t, !1)), (t.textContent = ""));
          return this;
        },
        clone: function (t, e) {
          return (
            (t = null != t && t),
            (e = null == e ? t : e),
            this.map(function () {
              return w.clone(this, t, e);
            })
          );
        },
        html: function (t) {
          return W(
            this,
            function (t) {
              var e = this[0] || {},
                n = 0,
                i = this.length;
              if (void 0 === t && 1 === e.nodeType) return e.innerHTML;
              if (
                "string" == typeof t &&
                !Nt.test(t) &&
                !mt[(pt.exec(t) || ["", ""])[1].toLowerCase()]
              ) {
                t = w.htmlPrefilter(t);
                try {
                  for (; n < i; n++)
                    1 === (e = this[n] || {}).nodeType &&
                      (w.cleanData(vt(e, !1)), (e.innerHTML = t));
                  e = 0;
                } catch (t) {}
              }
              e && this.empty().append(t);
            },
            null,
            t,
            arguments.length
          );
        },
        replaceWith: function () {
          var t = [];
          return Mt(
            this,
            arguments,
            function (e) {
              var n = this.parentNode;
              w.inArray(this, t) < 0 &&
                (w.cleanData(vt(this)), n && n.replaceChild(e, this));
            },
            t
          );
        },
      }),
      w.each(
        {
          appendTo: "append",
          prependTo: "prepend",
          insertBefore: "before",
          insertAfter: "after",
          replaceAll: "replaceWith",
        },
        function (t, e) {
          w.fn[t] = function (t) {
            for (var n, i = [], o = w(t), r = o.length - 1, a = 0; a <= r; a++)
              (n = a === r ? this : this.clone(!0)),
                w(o[a])[e](n),
                s.apply(i, n.get());
            return this.pushStack(i);
          };
        }
      );
    var Rt = new RegExp("^(" + tt + ")(?!px)[a-z%]+$", "i"),
      Bt = function (e) {
        var n = e.ownerDocument.defaultView;
        return (n && n.opener) || (n = t), n.getComputedStyle(e);
      },
      Ft = function (t, e, n) {
        var i,
          o,
          r = {};
        for (o in e) (r[o] = t.style[o]), (t.style[o] = e[o]);
        for (o in ((i = n.call(t)), e)) t.style[o] = r[o];
        return i;
      },
      Wt = new RegExp(nt.join("|"), "i");
    function zt(t, e, n) {
      var i,
        o,
        r,
        s,
        a = t.style;
      return (
        (n = n || Bt(t)) &&
          ("" !== (s = n.getPropertyValue(e) || n[e]) ||
            ot(t) ||
            (s = w.style(t, e)),
          !d.pixelBoxStyles() &&
            Rt.test(s) &&
            Wt.test(e) &&
            ((i = a.width),
            (o = a.minWidth),
            (r = a.maxWidth),
            (a.minWidth = a.maxWidth = a.width = s),
            (s = n.width),
            (a.width = i),
            (a.minWidth = o),
            (a.maxWidth = r))),
        void 0 !== s ? s + "" : s
      );
    }
    function Ut(t, e) {
      return {
        get: function () {
          if (!t()) return (this.get = e).apply(this, arguments);
          delete this.get;
        },
      };
    }
    !(function () {
      function e() {
        if (u) {
          (c.style.cssText =
            "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0"),
            (u.style.cssText =
              "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%"),
            it.appendChild(c).appendChild(u);
          var e = t.getComputedStyle(u);
          (i = "1%" !== e.top),
            (l = 12 === n(e.marginLeft)),
            (u.style.right = "60%"),
            (s = 36 === n(e.right)),
            (o = 36 === n(e.width)),
            (u.style.position = "absolute"),
            (r = 12 === n(u.offsetWidth / 3)),
            it.removeChild(c),
            (u = null);
        }
      }
      function n(t) {
        return Math.round(parseFloat(t));
      }
      var i,
        o,
        r,
        s,
        a,
        l,
        c = m.createElement("div"),
        u = m.createElement("div");
      u.style &&
        ((u.style.backgroundClip = "content-box"),
        (u.cloneNode(!0).style.backgroundClip = ""),
        (d.clearCloneStyle = "content-box" === u.style.backgroundClip),
        w.extend(d, {
          boxSizingReliable: function () {
            return e(), o;
          },
          pixelBoxStyles: function () {
            return e(), s;
          },
          pixelPosition: function () {
            return e(), i;
          },
          reliableMarginLeft: function () {
            return e(), l;
          },
          scrollboxSize: function () {
            return e(), r;
          },
          reliableTrDimensions: function () {
            var e, n, i, o;
            return (
              null == a &&
                ((e = m.createElement("table")),
                (n = m.createElement("tr")),
                (i = m.createElement("div")),
                (e.style.cssText = "position:absolute;left:-11111px"),
                (n.style.height = "1px"),
                (i.style.height = "9px"),
                it.appendChild(e).appendChild(n).appendChild(i),
                (o = t.getComputedStyle(n)),
                (a = parseInt(o.height) > 3),
                it.removeChild(e)),
              a
            );
          },
        }));
    })();
    var Yt = ["Webkit", "Moz", "ms"],
      Vt = m.createElement("div").style,
      Xt = {};
    function Qt(t) {
      var e = w.cssProps[t] || Xt[t];
      return (
        e ||
        (t in Vt
          ? t
          : (Xt[t] =
              (function (t) {
                for (
                  var e = t[0].toUpperCase() + t.slice(1), n = Yt.length;
                  n--;

                )
                  if ((t = Yt[n] + e) in Vt) return t;
              })(t) || t))
      );
    }
    var $t = /^(none|table(?!-c[ea]).+)/,
      Kt = /^--/,
      Gt = { position: "absolute", visibility: "hidden", display: "block" },
      Jt = { letterSpacing: "0", fontWeight: "400" };
    function Zt(t, e, n) {
      var i = et.exec(e);
      return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || "px") : e;
    }
    function te(t, e, n, i, o, r) {
      var s = "width" === e ? 1 : 0,
        a = 0,
        l = 0;
      if (n === (i ? "border" : "content")) return 0;
      for (; s < 4; s += 2)
        "margin" === n && (l += w.css(t, n + nt[s], !0, o)),
          i
            ? ("content" === n && (l -= w.css(t, "padding" + nt[s], !0, o)),
              "margin" !== n &&
                (l -= w.css(t, "border" + nt[s] + "Width", !0, o)))
            : ((l += w.css(t, "padding" + nt[s], !0, o)),
              "padding" !== n
                ? (l += w.css(t, "border" + nt[s] + "Width", !0, o))
                : (a += w.css(t, "border" + nt[s] + "Width", !0, o)));
      return (
        !i &&
          r >= 0 &&
          (l +=
            Math.max(
              0,
              Math.ceil(
                t["offset" + e[0].toUpperCase() + e.slice(1)] - r - l - a - 0.5
              )
            ) || 0),
        l
      );
    }
    function ee(t, e, n) {
      var i = Bt(t),
        o =
          (!d.boxSizingReliable() || n) &&
          "border-box" === w.css(t, "boxSizing", !1, i),
        r = o,
        s = zt(t, e, i),
        a = "offset" + e[0].toUpperCase() + e.slice(1);
      if (Rt.test(s)) {
        if (!n) return s;
        s = "auto";
      }
      return (
        ((!d.boxSizingReliable() && o) ||
          (!d.reliableTrDimensions() && k(t, "tr")) ||
          "auto" === s ||
          (!parseFloat(s) && "inline" === w.css(t, "display", !1, i))) &&
          t.getClientRects().length &&
          ((o = "border-box" === w.css(t, "boxSizing", !1, i)),
          (r = a in t) && (s = t[a])),
        (s = parseFloat(s) || 0) +
          te(t, e, n || (o ? "border" : "content"), r, i, s) +
          "px"
      );
    }
    function ne(t, e, n, i, o) {
      return new ne.prototype.init(t, e, n, i, o);
    }
    w.extend({
      cssHooks: {
        opacity: {
          get: function (t, e) {
            if (e) {
              var n = zt(t, "opacity");
              return "" === n ? "1" : n;
            }
          },
        },
      },
      cssNumber: {
        animationIterationCount: !0,
        columnCount: !0,
        fillOpacity: !0,
        flexGrow: !0,
        flexShrink: !0,
        fontWeight: !0,
        gridArea: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnStart: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowStart: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
      },
      cssProps: {},
      style: function (t, e, n, i) {
        if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
          var o,
            r,
            s,
            a = V(e),
            l = Kt.test(e),
            c = t.style;
          if (
            (l || (e = Qt(a)),
            (s = w.cssHooks[e] || w.cssHooks[a]),
            void 0 === n)
          )
            return s && "get" in s && void 0 !== (o = s.get(t, !1, i))
              ? o
              : c[e];
          "string" === (r = typeof n) &&
            (o = et.exec(n)) &&
            o[1] &&
            ((n = at(t, e, o)), (r = "number")),
            null != n &&
              n == n &&
              ("number" !== r ||
                l ||
                (n += (o && o[3]) || (w.cssNumber[a] ? "" : "px")),
              d.clearCloneStyle ||
                "" !== n ||
                0 !== e.indexOf("background") ||
                (c[e] = "inherit"),
              (s && "set" in s && void 0 === (n = s.set(t, n, i))) ||
                (l ? c.setProperty(e, n) : (c[e] = n)));
        }
      },
      css: function (t, e, n, i) {
        var o,
          r,
          s,
          a = V(e);
        return (
          Kt.test(e) || (e = Qt(a)),
          (s = w.cssHooks[e] || w.cssHooks[a]) &&
            "get" in s &&
            (o = s.get(t, !0, n)),
          void 0 === o && (o = zt(t, e, i)),
          "normal" === o && e in Jt && (o = Jt[e]),
          "" === n || n
            ? ((r = parseFloat(o)), !0 === n || isFinite(r) ? r || 0 : o)
            : o
        );
      },
    }),
      w.each(["height", "width"], function (t, e) {
        w.cssHooks[e] = {
          get: function (t, n, i) {
            if (n)
              return !$t.test(w.css(t, "display")) ||
                (t.getClientRects().length && t.getBoundingClientRect().width)
                ? ee(t, e, i)
                : Ft(t, Gt, function () {
                    return ee(t, e, i);
                  });
          },
          set: function (t, n, i) {
            var o,
              r = Bt(t),
              s = !d.scrollboxSize() && "absolute" === r.position,
              a = (s || i) && "border-box" === w.css(t, "boxSizing", !1, r),
              l = i ? te(t, e, i, a, r) : 0;
            return (
              a &&
                s &&
                (l -= Math.ceil(
                  t["offset" + e[0].toUpperCase() + e.slice(1)] -
                    parseFloat(r[e]) -
                    te(t, e, "border", !1, r) -
                    0.5
                )),
              l &&
                (o = et.exec(n)) &&
                "px" !== (o[3] || "px") &&
                ((t.style[e] = n), (n = w.css(t, e))),
              Zt(0, n, l)
            );
          },
        };
      }),
      (w.cssHooks.marginLeft = Ut(d.reliableMarginLeft, function (t, e) {
        if (e)
          return (
            (parseFloat(zt(t, "marginLeft")) ||
              t.getBoundingClientRect().left -
                Ft(t, { marginLeft: 0 }, function () {
                  return t.getBoundingClientRect().left;
                })) + "px"
          );
      })),
      w.each({ margin: "", padding: "", border: "Width" }, function (t, e) {
        (w.cssHooks[t + e] = {
          expand: function (n) {
            for (
              var i = 0, o = {}, r = "string" == typeof n ? n.split(" ") : [n];
              i < 4;
              i++
            )
              o[t + nt[i] + e] = r[i] || r[i - 2] || r[0];
            return o;
          },
        }),
          "margin" !== t && (w.cssHooks[t + e].set = Zt);
      }),
      w.fn.extend({
        css: function (t, e) {
          return W(
            this,
            function (t, e, n) {
              var i,
                o,
                r = {},
                s = 0;
              if (Array.isArray(e)) {
                for (i = Bt(t), o = e.length; s < o; s++)
                  r[e[s]] = w.css(t, e[s], !1, i);
                return r;
              }
              return void 0 !== n ? w.style(t, e, n) : w.css(t, e);
            },
            t,
            e,
            arguments.length > 1
          );
        },
      }),
      (w.Tween = ne),
      (ne.prototype = {
        constructor: ne,
        init: function (t, e, n, i, o, r) {
          (this.elem = t),
            (this.prop = n),
            (this.easing = o || w.easing._default),
            (this.options = e),
            (this.start = this.now = this.cur()),
            (this.end = i),
            (this.unit = r || (w.cssNumber[n] ? "" : "px"));
        },
        cur: function () {
          var t = ne.propHooks[this.prop];
          return t && t.get ? t.get(this) : ne.propHooks._default.get(this);
        },
        run: function (t) {
          var e,
            n = ne.propHooks[this.prop];
          return (
            this.options.duration
              ? (this.pos = e =
                  w.easing[this.easing](
                    t,
                    this.options.duration * t,
                    0,
                    1,
                    this.options.duration
                  ))
              : (this.pos = e = t),
            (this.now = (this.end - this.start) * e + this.start),
            this.options.step &&
              this.options.step.call(this.elem, this.now, this),
            n && n.set ? n.set(this) : ne.propHooks._default.set(this),
            this
          );
        },
      }),
      (ne.prototype.init.prototype = ne.prototype),
      (ne.propHooks = {
        _default: {
          get: function (t) {
            var e;
            return 1 !== t.elem.nodeType ||
              (null != t.elem[t.prop] && null == t.elem.style[t.prop])
              ? t.elem[t.prop]
              : (e = w.css(t.elem, t.prop, "")) && "auto" !== e
              ? e
              : 0;
          },
          set: function (t) {
            w.fx.step[t.prop]
              ? w.fx.step[t.prop](t)
              : 1 !== t.elem.nodeType ||
                (!w.cssHooks[t.prop] && null == t.elem.style[Qt(t.prop)])
              ? (t.elem[t.prop] = t.now)
              : w.style(t.elem, t.prop, t.now + t.unit);
          },
        },
      }),
      (ne.propHooks.scrollTop = ne.propHooks.scrollLeft =
        {
          set: function (t) {
            t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now);
          },
        }),
      (w.easing = {
        linear: function (t) {
          return t;
        },
        swing: function (t) {
          return 0.5 - Math.cos(t * Math.PI) / 2;
        },
        _default: "swing",
      }),
      (w.fx = ne.prototype.init),
      (w.fx.step = {});
    var ie,
      oe,
      re = /^(?:toggle|show|hide)$/,
      se = /queueHooks$/;
    function ae() {
      oe &&
        (!1 === m.hidden && t.requestAnimationFrame
          ? t.requestAnimationFrame(ae)
          : t.setTimeout(ae, w.fx.interval),
        w.fx.tick());
    }
    function le() {
      return (
        t.setTimeout(function () {
          ie = void 0;
        }),
        (ie = Date.now())
      );
    }
    function ce(t, e) {
      var n,
        i = 0,
        o = { height: t };
      for (e = e ? 1 : 0; i < 4; i += 2 - e)
        o["margin" + (n = nt[i])] = o["padding" + n] = t;
      return e && (o.opacity = o.width = t), o;
    }
    function ue(t, e, n) {
      for (
        var i,
          o = (fe.tweeners[e] || []).concat(fe.tweeners["*"]),
          r = 0,
          s = o.length;
        r < s;
        r++
      )
        if ((i = o[r].call(n, e, t))) return i;
    }
    function fe(t, e, n) {
      var i,
        o,
        r = 0,
        s = fe.prefilters.length,
        a = w.Deferred().always(function () {
          delete l.elem;
        }),
        l = function () {
          if (o) return !1;
          for (
            var e = ie || le(),
              n = Math.max(0, c.startTime + c.duration - e),
              i = 1 - (n / c.duration || 0),
              r = 0,
              s = c.tweens.length;
            r < s;
            r++
          )
            c.tweens[r].run(i);
          return (
            a.notifyWith(t, [c, i, n]),
            i < 1 && s
              ? n
              : (s || a.notifyWith(t, [c, 1, 0]), a.resolveWith(t, [c]), !1)
          );
        },
        c = a.promise({
          elem: t,
          props: w.extend({}, e),
          opts: w.extend(
            !0,
            { specialEasing: {}, easing: w.easing._default },
            n
          ),
          originalProperties: e,
          originalOptions: n,
          startTime: ie || le(),
          duration: n.duration,
          tweens: [],
          createTween: function (e, n) {
            var i = w.Tween(
              t,
              c.opts,
              e,
              n,
              c.opts.specialEasing[e] || c.opts.easing
            );
            return c.tweens.push(i), i;
          },
          stop: function (e) {
            var n = 0,
              i = e ? c.tweens.length : 0;
            if (o) return this;
            for (o = !0; n < i; n++) c.tweens[n].run(1);
            return (
              e
                ? (a.notifyWith(t, [c, 1, 0]), a.resolveWith(t, [c, e]))
                : a.rejectWith(t, [c, e]),
              this
            );
          },
        }),
        u = c.props;
      for (
        !(function (t, e) {
          var n, i, o, r, s;
          for (n in t)
            if (
              ((o = e[(i = V(n))]),
              (r = t[n]),
              Array.isArray(r) && ((o = r[1]), (r = t[n] = r[0])),
              n !== i && ((t[i] = r), delete t[n]),
              (s = w.cssHooks[i]) && ("expand" in s))
            )
              for (n in ((r = s.expand(r)), delete t[i], r))
                (n in t) || ((t[n] = r[n]), (e[n] = o));
            else e[i] = o;
        })(u, c.opts.specialEasing);
        r < s;
        r++
      )
        if ((i = fe.prefilters[r].call(c, t, u, c.opts)))
          return (
            p(i.stop) &&
              (w._queueHooks(c.elem, c.opts.queue).stop = i.stop.bind(i)),
            i
          );
      return (
        w.map(u, ue, c),
        p(c.opts.start) && c.opts.start.call(t, c),
        c
          .progress(c.opts.progress)
          .done(c.opts.done, c.opts.complete)
          .fail(c.opts.fail)
          .always(c.opts.always),
        w.fx.timer(w.extend(l, { elem: t, anim: c, queue: c.opts.queue })),
        c
      );
    }
    (w.Animation = w.extend(fe, {
      tweeners: {
        "*": [
          function (t, e) {
            var n = this.createTween(t, e);
            return at(n.elem, t, et.exec(e), n), n;
          },
        ],
      },
      tweener: function (t, e) {
        p(t) ? ((e = t), (t = ["*"])) : (t = t.match(j));
        for (var n, i = 0, o = t.length; i < o; i++)
          (n = t[i]),
            (fe.tweeners[n] = fe.tweeners[n] || []),
            fe.tweeners[n].unshift(e);
      },
      prefilters: [
        function (t, e, n) {
          var i,
            o,
            r,
            s,
            a,
            l,
            c,
            u,
            f = "width" in e || "height" in e,
            h = this,
            d = {},
            p = t.style,
            g = t.nodeType && st(t),
            m = $.get(t, "fxshow");
          for (i in (n.queue ||
            (null == (s = w._queueHooks(t, "fx")).unqueued &&
              ((s.unqueued = 0),
              (a = s.empty.fire),
              (s.empty.fire = function () {
                s.unqueued || a();
              })),
            s.unqueued++,
            h.always(function () {
              h.always(function () {
                s.unqueued--, w.queue(t, "fx").length || s.empty.fire();
              });
            })),
          e))
            if (((o = e[i]), re.test(o))) {
              if (
                (delete e[i],
                (r = r || "toggle" === o),
                o === (g ? "hide" : "show"))
              ) {
                if ("show" !== o || !m || void 0 === m[i]) continue;
                g = !0;
              }
              d[i] = (m && m[i]) || w.style(t, i);
            }
          if ((l = !w.isEmptyObject(e)) || !w.isEmptyObject(d))
            for (i in (f &&
              1 === t.nodeType &&
              ((n.overflow = [p.overflow, p.overflowX, p.overflowY]),
              null == (c = m && m.display) && (c = $.get(t, "display")),
              "none" === (u = w.css(t, "display")) &&
                (c
                  ? (u = c)
                  : (ut([t], !0),
                    (c = t.style.display || c),
                    (u = w.css(t, "display")),
                    ut([t]))),
              ("inline" === u || ("inline-block" === u && null != c)) &&
                "none" === w.css(t, "float") &&
                (l ||
                  (h.done(function () {
                    p.display = c;
                  }),
                  null == c && ((u = p.display), (c = "none" === u ? "" : u))),
                (p.display = "inline-block"))),
            n.overflow &&
              ((p.overflow = "hidden"),
              h.always(function () {
                (p.overflow = n.overflow[0]),
                  (p.overflowX = n.overflow[1]),
                  (p.overflowY = n.overflow[2]);
              })),
            (l = !1),
            d))
              l ||
                (m
                  ? "hidden" in m && (g = m.hidden)
                  : (m = $.access(t, "fxshow", { display: c })),
                r && (m.hidden = !g),
                g && ut([t], !0),
                h.done(function () {
                  for (i in (g || ut([t]), $.remove(t, "fxshow"), d))
                    w.style(t, i, d[i]);
                })),
                (l = ue(g ? m[i] : 0, i, h)),
                i in m ||
                  ((m[i] = l.start), g && ((l.end = l.start), (l.start = 0)));
        },
      ],
      prefilter: function (t, e) {
        e ? fe.prefilters.unshift(t) : fe.prefilters.push(t);
      },
    })),
      (w.speed = function (t, e, n) {
        var i =
          t && "object" == typeof t
            ? w.extend({}, t)
            : {
                complete: n || (!n && e) || (p(t) && t),
                duration: t,
                easing: (n && e) || (e && !p(e) && e),
              };
        return (
          w.fx.off
            ? (i.duration = 0)
            : "number" != typeof i.duration &&
              (i.duration in w.fx.speeds
                ? (i.duration = w.fx.speeds[i.duration])
                : (i.duration = w.fx.speeds._default)),
          (null != i.queue && !0 !== i.queue) || (i.queue = "fx"),
          (i.old = i.complete),
          (i.complete = function () {
            p(i.old) && i.old.call(this), i.queue && w.dequeue(this, i.queue);
          }),
          i
        );
      }),
      w.fn.extend({
        fadeTo: function (t, e, n, i) {
          return this.filter(st)
            .css("opacity", 0)
            .show()
            .end()
            .animate({ opacity: e }, t, n, i);
        },
        animate: function (t, e, n, i) {
          var o = w.isEmptyObject(t),
            r = w.speed(e, n, i),
            s = function () {
              var e = fe(this, w.extend({}, t), r);
              (o || $.get(this, "finish")) && e.stop(!0);
            };
          return (
            (s.finish = s),
            o || !1 === r.queue ? this.each(s) : this.queue(r.queue, s)
          );
        },
        stop: function (t, e, n) {
          var i = function (t) {
            var e = t.stop;
            delete t.stop, e(n);
          };
          return (
            "string" != typeof t && ((n = e), (e = t), (t = void 0)),
            e && this.queue(t || "fx", []),
            this.each(function () {
              var e = !0,
                o = null != t && t + "queueHooks",
                r = w.timers,
                s = $.get(this);
              if (o) s[o] && s[o].stop && i(s[o]);
              else for (o in s) s[o] && s[o].stop && se.test(o) && i(s[o]);
              for (o = r.length; o--; )
                r[o].elem !== this ||
                  (null != t && r[o].queue !== t) ||
                  (r[o].anim.stop(n), (e = !1), r.splice(o, 1));
              (!e && n) || w.dequeue(this, t);
            })
          );
        },
        finish: function (t) {
          return (
            !1 !== t && (t = t || "fx"),
            this.each(function () {
              var e,
                n = $.get(this),
                i = n[t + "queue"],
                o = n[t + "queueHooks"],
                r = w.timers,
                s = i ? i.length : 0;
              for (
                n.finish = !0,
                  w.queue(this, t, []),
                  o && o.stop && o.stop.call(this, !0),
                  e = r.length;
                e--;

              )
                r[e].elem === this &&
                  r[e].queue === t &&
                  (r[e].anim.stop(!0), r.splice(e, 1));
              for (e = 0; e < s; e++)
                i[e] && i[e].finish && i[e].finish.call(this);
              delete n.finish;
            })
          );
        },
      }),
      w.each(["toggle", "show", "hide"], function (t, e) {
        var n = w.fn[e];
        w.fn[e] = function (t, i, o) {
          return null == t || "boolean" == typeof t
            ? n.apply(this, arguments)
            : this.animate(ce(e, !0), t, i, o);
        };
      }),
      w.each(
        {
          slideDown: ce("show"),
          slideUp: ce("hide"),
          slideToggle: ce("toggle"),
          fadeIn: { opacity: "show" },
          fadeOut: { opacity: "hide" },
          fadeToggle: { opacity: "toggle" },
        },
        function (t, e) {
          w.fn[t] = function (t, n, i) {
            return this.animate(e, t, n, i);
          };
        }
      ),
      (w.timers = []),
      (w.fx.tick = function () {
        var t,
          e = 0,
          n = w.timers;
        for (ie = Date.now(); e < n.length; e++)
          (t = n[e])() || n[e] !== t || n.splice(e--, 1);
        n.length || w.fx.stop(), (ie = void 0);
      }),
      (w.fx.timer = function (t) {
        w.timers.push(t), w.fx.start();
      }),
      (w.fx.interval = 13),
      (w.fx.start = function () {
        oe || ((oe = !0), ae());
      }),
      (w.fx.stop = function () {
        oe = null;
      }),
      (w.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
      (w.fn.delay = function (e, n) {
        return (
          (e = (w.fx && w.fx.speeds[e]) || e),
          (n = n || "fx"),
          this.queue(n, function (n, i) {
            var o = t.setTimeout(n, e);
            i.stop = function () {
              t.clearTimeout(o);
            };
          })
        );
      }),
      (function () {
        var t = m.createElement("input"),
          e = m.createElement("select").appendChild(m.createElement("option"));
        (t.type = "checkbox"),
          (d.checkOn = "" !== t.value),
          (d.optSelected = e.selected),
          ((t = m.createElement("input")).value = "t"),
          (t.type = "radio"),
          (d.radioValue = "t" === t.value);
      })();
    var he,
      de = w.expr.attrHandle;
    w.fn.extend({
      attr: function (t, e) {
        return W(this, w.attr, t, e, arguments.length > 1);
      },
      removeAttr: function (t) {
        return this.each(function () {
          w.removeAttr(this, t);
        });
      },
    }),
      w.extend({
        attr: function (t, e, n) {
          var i,
            o,
            r = t.nodeType;
          if (3 !== r && 8 !== r && 2 !== r)
            return void 0 === t.getAttribute
              ? w.prop(t, e, n)
              : ((1 === r && w.isXMLDoc(t)) ||
                  (o =
                    w.attrHooks[e.toLowerCase()] ||
                    (w.expr.match.bool.test(e) ? he : void 0)),
                void 0 !== n
                  ? null === n
                    ? void w.removeAttr(t, e)
                    : o && "set" in o && void 0 !== (i = o.set(t, n, e))
                    ? i
                    : (t.setAttribute(e, n + ""), n)
                  : o && "get" in o && null !== (i = o.get(t, e))
                  ? i
                  : null == (i = w.find.attr(t, e))
                  ? void 0
                  : i);
        },
        attrHooks: {
          type: {
            set: function (t, e) {
              if (!d.radioValue && "radio" === e && k(t, "input")) {
                var n = t.value;
                return t.setAttribute("type", e), n && (t.value = n), e;
              }
            },
          },
        },
        removeAttr: function (t, e) {
          var n,
            i = 0,
            o = e && e.match(j);
          if (o && 1 === t.nodeType)
            for (; (n = o[i++]); ) t.removeAttribute(n);
        },
      }),
      (he = {
        set: function (t, e, n) {
          return !1 === e ? w.removeAttr(t, n) : t.setAttribute(n, n), n;
        },
      }),
      w.each(w.expr.match.bool.source.match(/\w+/g), function (t, e) {
        var n = de[e] || w.find.attr;
        de[e] = function (t, e, i) {
          var o,
            r,
            s = e.toLowerCase();
          return (
            i ||
              ((r = de[s]),
              (de[s] = o),
              (o = null != n(t, e, i) ? s : null),
              (de[s] = r)),
            o
          );
        };
      });
    var pe = /^(?:input|select|textarea|button)$/i,
      ge = /^(?:a|area)$/i;
    function me(t) {
      return (t.match(j) || []).join(" ");
    }
    function ve(t) {
      return (t.getAttribute && t.getAttribute("class")) || "";
    }
    function be(t) {
      return Array.isArray(t) ? t : ("string" == typeof t && t.match(j)) || [];
    }
    w.fn.extend({
      prop: function (t, e) {
        return W(this, w.prop, t, e, arguments.length > 1);
      },
      removeProp: function (t) {
        return this.each(function () {
          delete this[w.propFix[t] || t];
        });
      },
    }),
      w.extend({
        prop: function (t, e, n) {
          var i,
            o,
            r = t.nodeType;
          if (3 !== r && 8 !== r && 2 !== r)
            return (
              (1 === r && w.isXMLDoc(t)) ||
                ((e = w.propFix[e] || e), (o = w.propHooks[e])),
              void 0 !== n
                ? o && "set" in o && void 0 !== (i = o.set(t, n, e))
                  ? i
                  : (t[e] = n)
                : o && "get" in o && null !== (i = o.get(t, e))
                ? i
                : t[e]
            );
        },
        propHooks: {
          tabIndex: {
            get: function (t) {
              var e = w.find.attr(t, "tabindex");
              return e
                ? parseInt(e, 10)
                : pe.test(t.nodeName) || (ge.test(t.nodeName) && t.href)
                ? 0
                : -1;
            },
          },
        },
        propFix: { for: "htmlFor", class: "className" },
      }),
      d.optSelected ||
        (w.propHooks.selected = {
          get: function (t) {
            var e = t.parentNode;
            return e && e.parentNode && e.parentNode.selectedIndex, null;
          },
          set: function (t) {
            var e = t.parentNode;
            e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex);
          },
        }),
      w.each(
        [
          "tabIndex",
          "readOnly",
          "maxLength",
          "cellSpacing",
          "cellPadding",
          "rowSpan",
          "colSpan",
          "useMap",
          "frameBorder",
          "contentEditable",
        ],
        function () {
          w.propFix[this.toLowerCase()] = this;
        }
      ),
      w.fn.extend({
        addClass: function (t) {
          var e,
            n,
            i,
            o,
            r,
            s,
            a,
            l = 0;
          if (p(t))
            return this.each(function (e) {
              w(this).addClass(t.call(this, e, ve(this)));
            });
          if ((e = be(t)).length)
            for (; (n = this[l++]); )
              if (((o = ve(n)), (i = 1 === n.nodeType && " " + me(o) + " "))) {
                for (s = 0; (r = e[s++]); )
                  i.indexOf(" " + r + " ") < 0 && (i += r + " ");
                o !== (a = me(i)) && n.setAttribute("class", a);
              }
          return this;
        },
        removeClass: function (t) {
          var e,
            n,
            i,
            o,
            r,
            s,
            a,
            l = 0;
          if (p(t))
            return this.each(function (e) {
              w(this).removeClass(t.call(this, e, ve(this)));
            });
          if (!arguments.length) return this.attr("class", "");
          if ((e = be(t)).length)
            for (; (n = this[l++]); )
              if (((o = ve(n)), (i = 1 === n.nodeType && " " + me(o) + " "))) {
                for (s = 0; (r = e[s++]); )
                  for (; i.indexOf(" " + r + " ") > -1; )
                    i = i.replace(" " + r + " ", " ");
                o !== (a = me(i)) && n.setAttribute("class", a);
              }
          return this;
        },
        toggleClass: function (t, e) {
          var n = typeof t,
            i = "string" === n || Array.isArray(t);
          return "boolean" == typeof e && i
            ? e
              ? this.addClass(t)
              : this.removeClass(t)
            : p(t)
            ? this.each(function (n) {
                w(this).toggleClass(t.call(this, n, ve(this), e), e);
              })
            : this.each(function () {
                var e, o, r, s;
                if (i)
                  for (o = 0, r = w(this), s = be(t); (e = s[o++]); )
                    r.hasClass(e) ? r.removeClass(e) : r.addClass(e);
                else
                  (void 0 !== t && "boolean" !== n) ||
                    ((e = ve(this)) && $.set(this, "__className__", e),
                    this.setAttribute &&
                      this.setAttribute(
                        "class",
                        e || !1 === t ? "" : $.get(this, "__className__") || ""
                      ));
              });
        },
        hasClass: function (t) {
          var e,
            n,
            i = 0;
          for (e = " " + t + " "; (n = this[i++]); )
            if (1 === n.nodeType && (" " + me(ve(n)) + " ").indexOf(e) > -1)
              return !0;
          return !1;
        },
      });
    var ye = /\r/g;
    w.fn.extend({
      val: function (t) {
        var e,
          n,
          i,
          o = this[0];
        return arguments.length
          ? ((i = p(t)),
            this.each(function (n) {
              var o;
              1 === this.nodeType &&
                (null == (o = i ? t.call(this, n, w(this).val()) : t)
                  ? (o = "")
                  : "number" == typeof o
                  ? (o += "")
                  : Array.isArray(o) &&
                    (o = w.map(o, function (t) {
                      return null == t ? "" : t + "";
                    })),
                ((e =
                  w.valHooks[this.type] ||
                  w.valHooks[this.nodeName.toLowerCase()]) &&
                  "set" in e &&
                  void 0 !== e.set(this, o, "value")) ||
                  (this.value = o));
            }))
          : o
          ? (e = w.valHooks[o.type] || w.valHooks[o.nodeName.toLowerCase()]) &&
            "get" in e &&
            void 0 !== (n = e.get(o, "value"))
            ? n
            : "string" == typeof (n = o.value)
            ? n.replace(ye, "")
            : null == n
            ? ""
            : n
          : void 0;
      },
    }),
      w.extend({
        valHooks: {
          option: {
            get: function (t) {
              var e = w.find.attr(t, "value");
              return null != e ? e : me(w.text(t));
            },
          },
          select: {
            get: function (t) {
              var e,
                n,
                i,
                o = t.options,
                r = t.selectedIndex,
                s = "select-one" === t.type,
                a = s ? null : [],
                l = s ? r + 1 : o.length;
              for (i = r < 0 ? l : s ? r : 0; i < l; i++)
                if (
                  ((n = o[i]).selected || i === r) &&
                  !n.disabled &&
                  (!n.parentNode.disabled || !k(n.parentNode, "optgroup"))
                ) {
                  if (((e = w(n).val()), s)) return e;
                  a.push(e);
                }
              return a;
            },
            set: function (t, e) {
              for (
                var n, i, o = t.options, r = w.makeArray(e), s = o.length;
                s--;

              )
                ((i = o[s]).selected =
                  w.inArray(w.valHooks.option.get(i), r) > -1) && (n = !0);
              return n || (t.selectedIndex = -1), r;
            },
          },
        },
      }),
      w.each(["radio", "checkbox"], function () {
        (w.valHooks[this] = {
          set: function (t, e) {
            if (Array.isArray(e))
              return (t.checked = w.inArray(w(t).val(), e) > -1);
          },
        }),
          d.checkOn ||
            (w.valHooks[this].get = function (t) {
              return null === t.getAttribute("value") ? "on" : t.value;
            });
      }),
      (d.focusin = "onfocusin" in t);
    var _e = /^(?:focusinfocus|focusoutblur)$/,
      we = function (t) {
        t.stopPropagation();
      };
    w.extend(w.event, {
      trigger: function (e, n, i, o) {
        var r,
          s,
          a,
          l,
          c,
          f,
          h,
          d,
          v = [i || m],
          b = u.call(e, "type") ? e.type : e,
          y = u.call(e, "namespace") ? e.namespace.split(".") : [];
        if (
          ((s = d = a = i = i || m),
          3 !== i.nodeType &&
            8 !== i.nodeType &&
            !_e.test(b + w.event.triggered) &&
            (b.indexOf(".") > -1 &&
              ((y = b.split(".")), (b = y.shift()), y.sort()),
            (c = b.indexOf(":") < 0 && "on" + b),
            ((e = e[w.expando]
              ? e
              : new w.Event(b, "object" == typeof e && e)).isTrigger = o
              ? 2
              : 3),
            (e.namespace = y.join(".")),
            (e.rnamespace = e.namespace
              ? new RegExp("(^|\\.)" + y.join("\\.(?:.*\\.|)") + "(\\.|$)")
              : null),
            (e.result = void 0),
            e.target || (e.target = i),
            (n = null == n ? [e] : w.makeArray(n, [e])),
            (h = w.event.special[b] || {}),
            o || !h.trigger || !1 !== h.trigger.apply(i, n)))
        ) {
          if (!o && !h.noBubble && !g(i)) {
            for (
              l = h.delegateType || b, _e.test(l + b) || (s = s.parentNode);
              s;
              s = s.parentNode
            )
              v.push(s), (a = s);
            a === (i.ownerDocument || m) &&
              v.push(a.defaultView || a.parentWindow || t);
          }
          for (r = 0; (s = v[r++]) && !e.isPropagationStopped(); )
            (d = s),
              (e.type = r > 1 ? l : h.bindType || b),
              (f =
                ($.get(s, "events") || Object.create(null))[e.type] &&
                $.get(s, "handle")) && f.apply(s, n),
              (f = c && s[c]) &&
                f.apply &&
                X(s) &&
                ((e.result = f.apply(s, n)),
                !1 === e.result && e.preventDefault());
          return (
            (e.type = b),
            o ||
              e.isDefaultPrevented() ||
              (h._default && !1 !== h._default.apply(v.pop(), n)) ||
              !X(i) ||
              (c &&
                p(i[b]) &&
                !g(i) &&
                ((a = i[c]) && (i[c] = null),
                (w.event.triggered = b),
                e.isPropagationStopped() && d.addEventListener(b, we),
                i[b](),
                e.isPropagationStopped() && d.removeEventListener(b, we),
                (w.event.triggered = void 0),
                a && (i[c] = a))),
            e.result
          );
        }
      },
      simulate: function (t, e, n) {
        var i = w.extend(new w.Event(), n, { type: t, isSimulated: !0 });
        w.event.trigger(i, null, e);
      },
    }),
      w.fn.extend({
        trigger: function (t, e) {
          return this.each(function () {
            w.event.trigger(t, e, this);
          });
        },
        triggerHandler: function (t, e) {
          var n = this[0];
          if (n) return w.event.trigger(t, e, n, !0);
        },
      }),
      d.focusin ||
        w.each({ focus: "focusin", blur: "focusout" }, function (t, e) {
          var n = function (t) {
            w.event.simulate(e, t.target, w.event.fix(t));
          };
          w.event.special[e] = {
            setup: function () {
              var i = this.ownerDocument || this.document || this,
                o = $.access(i, e);
              o || i.addEventListener(t, n, !0), $.access(i, e, (o || 0) + 1);
            },
            teardown: function () {
              var i = this.ownerDocument || this.document || this,
                o = $.access(i, e) - 1;
              o
                ? $.access(i, e, o)
                : (i.removeEventListener(t, n, !0), $.remove(i, e));
            },
          };
        });
    var xe = t.location,
      Ce = { guid: Date.now() },
      Ee = /\?/;
    w.parseXML = function (e) {
      var n;
      if (!e || "string" != typeof e) return null;
      try {
        n = new t.DOMParser().parseFromString(e, "text/xml");
      } catch (t) {
        n = void 0;
      }
      return (
        (n && !n.getElementsByTagName("parsererror").length) ||
          w.error("Invalid XML: " + e),
        n
      );
    };
    var Te = /\[\]$/,
      Se = /\r?\n/g,
      ke = /^(?:submit|button|image|reset|file)$/i,
      Pe = /^(?:input|select|textarea|keygen)/i;
    function Ne(t, e, n, i) {
      var o;
      if (Array.isArray(e))
        w.each(e, function (e, o) {
          n || Te.test(t)
            ? i(t, o)
            : Ne(
                t + "[" + ("object" == typeof o && null != o ? e : "") + "]",
                o,
                n,
                i
              );
        });
      else if (n || "object" !== y(e)) i(t, e);
      else for (o in e) Ne(t + "[" + o + "]", e[o], n, i);
    }
    (w.param = function (t, e) {
      var n,
        i = [],
        o = function (t, e) {
          var n = p(e) ? e() : e;
          i[i.length] =
            encodeURIComponent(t) +
            "=" +
            encodeURIComponent(null == n ? "" : n);
        };
      if (null == t) return "";
      if (Array.isArray(t) || (t.jquery && !w.isPlainObject(t)))
        w.each(t, function () {
          o(this.name, this.value);
        });
      else for (n in t) Ne(n, t[n], e, o);
      return i.join("&");
    }),
      w.fn.extend({
        serialize: function () {
          return w.param(this.serializeArray());
        },
        serializeArray: function () {
          return this.map(function () {
            var t = w.prop(this, "elements");
            return t ? w.makeArray(t) : this;
          })
            .filter(function () {
              var t = this.type;
              return (
                this.name &&
                !w(this).is(":disabled") &&
                Pe.test(this.nodeName) &&
                !ke.test(t) &&
                (this.checked || !dt.test(t))
              );
            })
            .map(function (t, e) {
              var n = w(this).val();
              return null == n
                ? null
                : Array.isArray(n)
                ? w.map(n, function (t) {
                    return { name: e.name, value: t.replace(Se, "\r\n") };
                  })
                : { name: e.name, value: n.replace(Se, "\r\n") };
            })
            .get();
        },
      });
    var De = /%20/g,
      Ae = /#.*$/,
      Ie = /([?&])_=[^&]*/,
      Oe = /^(.*?):[ \t]*([^\r\n]*)$/gm,
      Le = /^(?:GET|HEAD)$/,
      je = /^\/\//,
      He = {},
      Me = {},
      qe = "*/".concat("*"),
      Re = m.createElement("a");
    function Be(t) {
      return function (e, n) {
        "string" != typeof e && ((n = e), (e = "*"));
        var i,
          o = 0,
          r = e.toLowerCase().match(j) || [];
        if (p(n))
          for (; (i = r[o++]); )
            "+" === i[0]
              ? ((i = i.slice(1) || "*"), (t[i] = t[i] || []).unshift(n))
              : (t[i] = t[i] || []).push(n);
      };
    }
    function Fe(t, e, n, i) {
      var o = {},
        r = t === Me;
      function s(a) {
        var l;
        return (
          (o[a] = !0),
          w.each(t[a] || [], function (t, a) {
            var c = a(e, n, i);
            return "string" != typeof c || r || o[c]
              ? r
                ? !(l = c)
                : void 0
              : (e.dataTypes.unshift(c), s(c), !1);
          }),
          l
        );
      }
      return s(e.dataTypes[0]) || (!o["*"] && s("*"));
    }
    function We(t, e) {
      var n,
        i,
        o = w.ajaxSettings.flatOptions || {};
      for (n in e) void 0 !== e[n] && ((o[n] ? t : i || (i = {}))[n] = e[n]);
      return i && w.extend(!0, t, i), t;
    }
    (Re.href = xe.href),
      w.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
          url: xe.href,
          type: "GET",
          isLocal:
            /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(
              xe.protocol
            ),
          global: !0,
          processData: !0,
          async: !0,
          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
          accepts: {
            "*": qe,
            text: "text/plain",
            html: "text/html",
            xml: "application/xml, text/xml",
            json: "application/json, text/javascript",
          },
          contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
          responseFields: {
            xml: "responseXML",
            text: "responseText",
            json: "responseJSON",
          },
          converters: {
            "* text": String,
            "text html": !0,
            "text json": JSON.parse,
            "text xml": w.parseXML,
          },
          flatOptions: { url: !0, context: !0 },
        },
        ajaxSetup: function (t, e) {
          return e ? We(We(t, w.ajaxSettings), e) : We(w.ajaxSettings, t);
        },
        ajaxPrefilter: Be(He),
        ajaxTransport: Be(Me),
        ajax: function (e, n) {
          "object" == typeof e && ((n = e), (e = void 0)), (n = n || {});
          var i,
            o,
            r,
            s,
            a,
            l,
            c,
            u,
            f,
            h,
            d = w.ajaxSetup({}, n),
            p = d.context || d,
            g = d.context && (p.nodeType || p.jquery) ? w(p) : w.event,
            v = w.Deferred(),
            b = w.Callbacks("once memory"),
            y = d.statusCode || {},
            _ = {},
            x = {},
            C = "canceled",
            E = {
              readyState: 0,
              getResponseHeader: function (t) {
                var e;
                if (c) {
                  if (!s)
                    for (s = {}; (e = Oe.exec(r)); )
                      s[e[1].toLowerCase() + " "] = (
                        s[e[1].toLowerCase() + " "] || []
                      ).concat(e[2]);
                  e = s[t.toLowerCase() + " "];
                }
                return null == e ? null : e.join(", ");
              },
              getAllResponseHeaders: function () {
                return c ? r : null;
              },
              setRequestHeader: function (t, e) {
                return (
                  null == c &&
                    ((t = x[t.toLowerCase()] = x[t.toLowerCase()] || t),
                    (_[t] = e)),
                  this
                );
              },
              overrideMimeType: function (t) {
                return null == c && (d.mimeType = t), this;
              },
              statusCode: function (t) {
                var e;
                if (t)
                  if (c) E.always(t[E.status]);
                  else for (e in t) y[e] = [y[e], t[e]];
                return this;
              },
              abort: function (t) {
                var e = t || C;
                return i && i.abort(e), T(0, e), this;
              },
            };
          if (
            (v.promise(E),
            (d.url = ((e || d.url || xe.href) + "").replace(
              je,
              xe.protocol + "//"
            )),
            (d.type = n.method || n.type || d.method || d.type),
            (d.dataTypes = (d.dataType || "*").toLowerCase().match(j) || [""]),
            null == d.crossDomain)
          ) {
            l = m.createElement("a");
            try {
              (l.href = d.url),
                (l.href = l.href),
                (d.crossDomain =
                  Re.protocol + "//" + Re.host != l.protocol + "//" + l.host);
            } catch (t) {
              d.crossDomain = !0;
            }
          }
          if (
            (d.data &&
              d.processData &&
              "string" != typeof d.data &&
              (d.data = w.param(d.data, d.traditional)),
            Fe(He, d, n, E),
            c)
          )
            return E;
          for (f in ((u = w.event && d.global) &&
            0 == w.active++ &&
            w.event.trigger("ajaxStart"),
          (d.type = d.type.toUpperCase()),
          (d.hasContent = !Le.test(d.type)),
          (o = d.url.replace(Ae, "")),
          d.hasContent
            ? d.data &&
              d.processData &&
              0 ===
                (d.contentType || "").indexOf(
                  "application/x-www-form-urlencoded"
                ) &&
              (d.data = d.data.replace(De, "+"))
            : ((h = d.url.slice(o.length)),
              d.data &&
                (d.processData || "string" == typeof d.data) &&
                ((o += (Ee.test(o) ? "&" : "?") + d.data), delete d.data),
              !1 === d.cache &&
                ((o = o.replace(Ie, "$1")),
                (h = (Ee.test(o) ? "&" : "?") + "_=" + Ce.guid++ + h)),
              (d.url = o + h)),
          d.ifModified &&
            (w.lastModified[o] &&
              E.setRequestHeader("If-Modified-Since", w.lastModified[o]),
            w.etag[o] && E.setRequestHeader("If-None-Match", w.etag[o])),
          ((d.data && d.hasContent && !1 !== d.contentType) || n.contentType) &&
            E.setRequestHeader("Content-Type", d.contentType),
          E.setRequestHeader(
            "Accept",
            d.dataTypes[0] && d.accepts[d.dataTypes[0]]
              ? d.accepts[d.dataTypes[0]] +
                  ("*" !== d.dataTypes[0] ? ", " + qe + "; q=0.01" : "")
              : d.accepts["*"]
          ),
          d.headers))
            E.setRequestHeader(f, d.headers[f]);
          if (d.beforeSend && (!1 === d.beforeSend.call(p, E, d) || c))
            return E.abort();
          if (
            ((C = "abort"),
            b.add(d.complete),
            E.done(d.success),
            E.fail(d.error),
            (i = Fe(Me, d, n, E)))
          ) {
            if (((E.readyState = 1), u && g.trigger("ajaxSend", [E, d]), c))
              return E;
            d.async &&
              d.timeout > 0 &&
              (a = t.setTimeout(function () {
                E.abort("timeout");
              }, d.timeout));
            try {
              (c = !1), i.send(_, T);
            } catch (t) {
              if (c) throw t;
              T(-1, t);
            }
          } else T(-1, "No Transport");
          function T(e, n, s, l) {
            var f,
              h,
              m,
              _,
              x,
              C = n;
            c ||
              ((c = !0),
              a && t.clearTimeout(a),
              (i = void 0),
              (r = l || ""),
              (E.readyState = e > 0 ? 4 : 0),
              (f = (e >= 200 && e < 300) || 304 === e),
              s &&
                (_ = (function (t, e, n) {
                  for (
                    var i, o, r, s, a = t.contents, l = t.dataTypes;
                    "*" === l[0];

                  )
                    l.shift(),
                      void 0 === i &&
                        (i = t.mimeType || e.getResponseHeader("Content-Type"));
                  if (i)
                    for (o in a)
                      if (a[o] && a[o].test(i)) {
                        l.unshift(o);
                        break;
                      }
                  if (l[0] in n) r = l[0];
                  else {
                    for (o in n) {
                      if (!l[0] || t.converters[o + " " + l[0]]) {
                        r = o;
                        break;
                      }
                      s || (s = o);
                    }
                    r = r || s;
                  }
                  if (r) return r !== l[0] && l.unshift(r), n[r];
                })(d, E, s)),
              !f &&
                w.inArray("script", d.dataTypes) > -1 &&
                (d.converters["text script"] = function () {}),
              (_ = (function (t, e, n, i) {
                var o,
                  r,
                  s,
                  a,
                  l,
                  c = {},
                  u = t.dataTypes.slice();
                if (u[1])
                  for (s in t.converters) c[s.toLowerCase()] = t.converters[s];
                for (r = u.shift(); r; )
                  if (
                    (t.responseFields[r] && (n[t.responseFields[r]] = e),
                    !l &&
                      i &&
                      t.dataFilter &&
                      (e = t.dataFilter(e, t.dataType)),
                    (l = r),
                    (r = u.shift()))
                  )
                    if ("*" === r) r = l;
                    else if ("*" !== l && l !== r) {
                      if (!(s = c[l + " " + r] || c["* " + r]))
                        for (o in c)
                          if (
                            (a = o.split(" "))[1] === r &&
                            (s = c[l + " " + a[0]] || c["* " + a[0]])
                          ) {
                            !0 === s
                              ? (s = c[o])
                              : !0 !== c[o] && ((r = a[0]), u.unshift(a[1]));
                            break;
                          }
                      if (!0 !== s)
                        if (s && t.throws) e = s(e);
                        else
                          try {
                            e = s(e);
                          } catch (t) {
                            return {
                              state: "parsererror",
                              error: s
                                ? t
                                : "No conversion from " + l + " to " + r,
                            };
                          }
                    }
                return { state: "success", data: e };
              })(d, _, E, f)),
              f
                ? (d.ifModified &&
                    ((x = E.getResponseHeader("Last-Modified")) &&
                      (w.lastModified[o] = x),
                    (x = E.getResponseHeader("etag")) && (w.etag[o] = x)),
                  204 === e || "HEAD" === d.type
                    ? (C = "nocontent")
                    : 304 === e
                    ? (C = "notmodified")
                    : ((C = _.state), (h = _.data), (f = !(m = _.error))))
                : ((m = C), (!e && C) || ((C = "error"), e < 0 && (e = 0))),
              (E.status = e),
              (E.statusText = (n || C) + ""),
              f ? v.resolveWith(p, [h, C, E]) : v.rejectWith(p, [E, C, m]),
              E.statusCode(y),
              (y = void 0),
              u &&
                g.trigger(f ? "ajaxSuccess" : "ajaxError", [E, d, f ? h : m]),
              b.fireWith(p, [E, C]),
              u &&
                (g.trigger("ajaxComplete", [E, d]),
                --w.active || w.event.trigger("ajaxStop")));
          }
          return E;
        },
        getJSON: function (t, e, n) {
          return w.get(t, e, n, "json");
        },
        getScript: function (t, e) {
          return w.get(t, void 0, e, "script");
        },
      }),
      w.each(["get", "post"], function (t, e) {
        w[e] = function (t, n, i, o) {
          return (
            p(n) && ((o = o || i), (i = n), (n = void 0)),
            w.ajax(
              w.extend(
                { url: t, type: e, dataType: o, data: n, success: i },
                w.isPlainObject(t) && t
              )
            )
          );
        };
      }),
      w.ajaxPrefilter(function (t) {
        var e;
        for (e in t.headers)
          "content-type" === e.toLowerCase() &&
            (t.contentType = t.headers[e] || "");
      }),
      (w._evalUrl = function (t, e, n) {
        return w.ajax({
          url: t,
          type: "GET",
          dataType: "script",
          cache: !0,
          async: !1,
          global: !1,
          converters: { "text script": function () {} },
          dataFilter: function (t) {
            w.globalEval(t, e, n);
          },
        });
      }),
      w.fn.extend({
        wrapAll: function (t) {
          var e;
          return (
            this[0] &&
              (p(t) && (t = t.call(this[0])),
              (e = w(t, this[0].ownerDocument).eq(0).clone(!0)),
              this[0].parentNode && e.insertBefore(this[0]),
              e
                .map(function () {
                  for (var t = this; t.firstElementChild; )
                    t = t.firstElementChild;
                  return t;
                })
                .append(this)),
            this
          );
        },
        wrapInner: function (t) {
          return p(t)
            ? this.each(function (e) {
                w(this).wrapInner(t.call(this, e));
              })
            : this.each(function () {
                var e = w(this),
                  n = e.contents();
                n.length ? n.wrapAll(t) : e.append(t);
              });
        },
        wrap: function (t) {
          var e = p(t);
          return this.each(function (n) {
            w(this).wrapAll(e ? t.call(this, n) : t);
          });
        },
        unwrap: function (t) {
          return (
            this.parent(t)
              .not("body")
              .each(function () {
                w(this).replaceWith(this.childNodes);
              }),
            this
          );
        },
      }),
      (w.expr.pseudos.hidden = function (t) {
        return !w.expr.pseudos.visible(t);
      }),
      (w.expr.pseudos.visible = function (t) {
        return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
      }),
      (w.ajaxSettings.xhr = function () {
        try {
          return new t.XMLHttpRequest();
        } catch (t) {}
      });
    var ze = { 0: 200, 1223: 204 },
      Ue = w.ajaxSettings.xhr();
    (d.cors = !!Ue && "withCredentials" in Ue),
      (d.ajax = Ue = !!Ue),
      w.ajaxTransport(function (e) {
        var n, i;
        if (d.cors || (Ue && !e.crossDomain))
          return {
            send: function (o, r) {
              var s,
                a = e.xhr();
              if (
                (a.open(e.type, e.url, e.async, e.username, e.password),
                e.xhrFields)
              )
                for (s in e.xhrFields) a[s] = e.xhrFields[s];
              for (s in (e.mimeType &&
                a.overrideMimeType &&
                a.overrideMimeType(e.mimeType),
              e.crossDomain ||
                o["X-Requested-With"] ||
                (o["X-Requested-With"] = "XMLHttpRequest"),
              o))
                a.setRequestHeader(s, o[s]);
              (n = function (t) {
                return function () {
                  n &&
                    ((n =
                      i =
                      a.onload =
                      a.onerror =
                      a.onabort =
                      a.ontimeout =
                      a.onreadystatechange =
                        null),
                    "abort" === t
                      ? a.abort()
                      : "error" === t
                      ? "number" != typeof a.status
                        ? r(0, "error")
                        : r(a.status, a.statusText)
                      : r(
                          ze[a.status] || a.status,
                          a.statusText,
                          "text" !== (a.responseType || "text") ||
                            "string" != typeof a.responseText
                            ? { binary: a.response }
                            : { text: a.responseText },
                          a.getAllResponseHeaders()
                        ));
                };
              }),
                (a.onload = n()),
                (i = a.onerror = a.ontimeout = n("error")),
                void 0 !== a.onabort
                  ? (a.onabort = i)
                  : (a.onreadystatechange = function () {
                      4 === a.readyState &&
                        t.setTimeout(function () {
                          n && i();
                        });
                    }),
                (n = n("abort"));
              try {
                a.send((e.hasContent && e.data) || null);
              } catch (t) {
                if (n) throw t;
              }
            },
            abort: function () {
              n && n();
            },
          };
      }),
      w.ajaxPrefilter(function (t) {
        t.crossDomain && (t.contents.script = !1);
      }),
      w.ajaxSetup({
        accepts: {
          script:
            "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
        },
        contents: { script: /\b(?:java|ecma)script\b/ },
        converters: {
          "text script": function (t) {
            return w.globalEval(t), t;
          },
        },
      }),
      w.ajaxPrefilter("script", function (t) {
        void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET");
      }),
      w.ajaxTransport("script", function (t) {
        var e, n;
        if (t.crossDomain || t.scriptAttrs)
          return {
            send: function (i, o) {
              (e = w("<script>")
                .attr(t.scriptAttrs || {})
                .prop({ charset: t.scriptCharset, src: t.url })
                .on(
                  "load error",
                  (n = function (t) {
                    e.remove(),
                      (n = null),
                      t && o("error" === t.type ? 404 : 200, t.type);
                  })
                )),
                m.head.appendChild(e[0]);
            },
            abort: function () {
              n && n();
            },
          };
      });
    var Ye,
      Ve = [],
      Xe = /(=)\?(?=&|$)|\?\?/;
    w.ajaxSetup({
      jsonp: "callback",
      jsonpCallback: function () {
        var t = Ve.pop() || w.expando + "_" + Ce.guid++;
        return (this[t] = !0), t;
      },
    }),
      w.ajaxPrefilter("json jsonp", function (e, n, i) {
        var o,
          r,
          s,
          a =
            !1 !== e.jsonp &&
            (Xe.test(e.url)
              ? "url"
              : "string" == typeof e.data &&
                0 ===
                  (e.contentType || "").indexOf(
                    "application/x-www-form-urlencoded"
                  ) &&
                Xe.test(e.data) &&
                "data");
        if (a || "jsonp" === e.dataTypes[0])
          return (
            (o = e.jsonpCallback =
              p(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback),
            a
              ? (e[a] = e[a].replace(Xe, "$1" + o))
              : !1 !== e.jsonp &&
                (e.url += (Ee.test(e.url) ? "&" : "?") + e.jsonp + "=" + o),
            (e.converters["script json"] = function () {
              return s || w.error(o + " was not called"), s[0];
            }),
            (e.dataTypes[0] = "json"),
            (r = t[o]),
            (t[o] = function () {
              s = arguments;
            }),
            i.always(function () {
              void 0 === r ? w(t).removeProp(o) : (t[o] = r),
                e[o] && ((e.jsonpCallback = n.jsonpCallback), Ve.push(o)),
                s && p(r) && r(s[0]),
                (s = r = void 0);
            }),
            "script"
          );
      }),
      (d.createHTMLDocument =
        (((Ye = m.implementation.createHTMLDocument("").body).innerHTML =
          "<form></form><form></form>"),
        2 === Ye.childNodes.length)),
      (w.parseHTML = function (t, e, n) {
        return "string" != typeof t
          ? []
          : ("boolean" == typeof e && ((n = e), (e = !1)),
            e ||
              (d.createHTMLDocument
                ? (((i = (e =
                    m.implementation.createHTMLDocument("")).createElement(
                    "base"
                  )).href = m.location.href),
                  e.head.appendChild(i))
                : (e = m)),
            (r = !n && []),
            (o = P.exec(t))
              ? [e.createElement(o[1])]
              : ((o = _t([t], e, r)),
                r && r.length && w(r).remove(),
                w.merge([], o.childNodes)));
        var i, o, r;
      }),
      (w.fn.load = function (t, e, n) {
        var i,
          o,
          r,
          s = this,
          a = t.indexOf(" ");
        return (
          a > -1 && ((i = me(t.slice(a))), (t = t.slice(0, a))),
          p(e)
            ? ((n = e), (e = void 0))
            : e && "object" == typeof e && (o = "POST"),
          s.length > 0 &&
            w
              .ajax({ url: t, type: o || "GET", dataType: "html", data: e })
              .done(function (t) {
                (r = arguments),
                  s.html(i ? w("<div>").append(w.parseHTML(t)).find(i) : t);
              })
              .always(
                n &&
                  function (t, e) {
                    s.each(function () {
                      n.apply(this, r || [t.responseText, e, t]);
                    });
                  }
              ),
          this
        );
      }),
      (w.expr.pseudos.animated = function (t) {
        return w.grep(w.timers, function (e) {
          return t === e.elem;
        }).length;
      }),
      (w.offset = {
        setOffset: function (t, e, n) {
          var i,
            o,
            r,
            s,
            a,
            l,
            c = w.css(t, "position"),
            u = w(t),
            f = {};
          "static" === c && (t.style.position = "relative"),
            (a = u.offset()),
            (r = w.css(t, "top")),
            (l = w.css(t, "left")),
            ("absolute" === c || "fixed" === c) && (r + l).indexOf("auto") > -1
              ? ((s = (i = u.position()).top), (o = i.left))
              : ((s = parseFloat(r) || 0), (o = parseFloat(l) || 0)),
            p(e) && (e = e.call(t, n, w.extend({}, a))),
            null != e.top && (f.top = e.top - a.top + s),
            null != e.left && (f.left = e.left - a.left + o),
            "using" in e
              ? e.using.call(t, f)
              : ("number" == typeof f.top && (f.top += "px"),
                "number" == typeof f.left && (f.left += "px"),
                u.css(f));
        },
      }),
      w.fn.extend({
        offset: function (t) {
          if (arguments.length)
            return void 0 === t
              ? this
              : this.each(function (e) {
                  w.offset.setOffset(this, t, e);
                });
          var e,
            n,
            i = this[0];
          return i
            ? i.getClientRects().length
              ? ((e = i.getBoundingClientRect()),
                (n = i.ownerDocument.defaultView),
                { top: e.top + n.pageYOffset, left: e.left + n.pageXOffset })
              : { top: 0, left: 0 }
            : void 0;
        },
        position: function () {
          if (this[0]) {
            var t,
              e,
              n,
              i = this[0],
              o = { top: 0, left: 0 };
            if ("fixed" === w.css(i, "position")) e = i.getBoundingClientRect();
            else {
              for (
                e = this.offset(),
                  n = i.ownerDocument,
                  t = i.offsetParent || n.documentElement;
                t &&
                (t === n.body || t === n.documentElement) &&
                "static" === w.css(t, "position");

              )
                t = t.parentNode;
              t &&
                t !== i &&
                1 === t.nodeType &&
                (((o = w(t).offset()).top += w.css(t, "borderTopWidth", !0)),
                (o.left += w.css(t, "borderLeftWidth", !0)));
            }
            return {
              top: e.top - o.top - w.css(i, "marginTop", !0),
              left: e.left - o.left - w.css(i, "marginLeft", !0),
            };
          }
        },
        offsetParent: function () {
          return this.map(function () {
            for (
              var t = this.offsetParent;
              t && "static" === w.css(t, "position");

            )
              t = t.offsetParent;
            return t || it;
          });
        },
      }),
      w.each(
        { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
        function (t, e) {
          var n = "pageYOffset" === e;
          w.fn[t] = function (i) {
            return W(
              this,
              function (t, i, o) {
                var r;
                if (
                  (g(t) ? (r = t) : 9 === t.nodeType && (r = t.defaultView),
                  void 0 === o)
                )
                  return r ? r[e] : t[i];
                r
                  ? r.scrollTo(n ? r.pageXOffset : o, n ? o : r.pageYOffset)
                  : (t[i] = o);
              },
              t,
              i,
              arguments.length
            );
          };
        }
      ),
      w.each(["top", "left"], function (t, e) {
        w.cssHooks[e] = Ut(d.pixelPosition, function (t, n) {
          if (n)
            return (n = zt(t, e)), Rt.test(n) ? w(t).position()[e] + "px" : n;
        });
      }),
      w.each({ Height: "height", Width: "width" }, function (t, e) {
        w.each(
          { padding: "inner" + t, content: e, "": "outer" + t },
          function (n, i) {
            w.fn[i] = function (o, r) {
              var s = arguments.length && (n || "boolean" != typeof o),
                a = n || (!0 === o || !0 === r ? "margin" : "border");
              return W(
                this,
                function (e, n, o) {
                  var r;
                  return g(e)
                    ? 0 === i.indexOf("outer")
                      ? e["inner" + t]
                      : e.document.documentElement["client" + t]
                    : 9 === e.nodeType
                    ? ((r = e.documentElement),
                      Math.max(
                        e.body["scroll" + t],
                        r["scroll" + t],
                        e.body["offset" + t],
                        r["offset" + t],
                        r["client" + t]
                      ))
                    : void 0 === o
                    ? w.css(e, n, a)
                    : w.style(e, n, o, a);
                },
                e,
                s ? o : void 0,
                s
              );
            };
          }
        );
      }),
      w.each(
        [
          "ajaxStart",
          "ajaxStop",
          "ajaxComplete",
          "ajaxError",
          "ajaxSuccess",
          "ajaxSend",
        ],
        function (t, e) {
          w.fn[e] = function (t) {
            return this.on(e, t);
          };
        }
      ),
      w.fn.extend({
        bind: function (t, e, n) {
          return this.on(t, null, e, n);
        },
        unbind: function (t, e) {
          return this.off(t, null, e);
        },
        delegate: function (t, e, n, i) {
          return this.on(e, t, n, i);
        },
        undelegate: function (t, e, n) {
          return 1 === arguments.length
            ? this.off(t, "**")
            : this.off(e, t || "**", n);
        },
        hover: function (t, e) {
          return this.mouseenter(t).mouseleave(e || t);
        },
      }),
      w.each(
        "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(
          " "
        ),
        function (t, e) {
          w.fn[e] = function (t, n) {
            return arguments.length > 0
              ? this.on(e, null, t, n)
              : this.trigger(e);
          };
        }
      );
    var Qe = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    (w.proxy = function (t, e) {
      var n, i, r;
      if (("string" == typeof e && ((n = t[e]), (e = t), (t = n)), p(t)))
        return (
          (i = o.call(arguments, 2)),
          (r = function () {
            return t.apply(e || this, i.concat(o.call(arguments)));
          }),
          (r.guid = t.guid = t.guid || w.guid++),
          r
        );
    }),
      (w.holdReady = function (t) {
        t ? w.readyWait++ : w.ready(!0);
      }),
      (w.isArray = Array.isArray),
      (w.parseJSON = JSON.parse),
      (w.nodeName = k),
      (w.isFunction = p),
      (w.isWindow = g),
      (w.camelCase = V),
      (w.type = y),
      (w.now = Date.now),
      (w.isNumeric = function (t) {
        var e = w.type(t);
        return ("number" === e || "string" === e) && !isNaN(t - parseFloat(t));
      }),
      (w.trim = function (t) {
        return null == t ? "" : (t + "").replace(Qe, "");
      }),
      "function" == typeof define &&
        define.amd &&
        define("jquery", [], function () {
          return w;
        });
    var $e = t.jQuery,
      Ke = t.$;
    return (
      (w.noConflict = function (e) {
        return (
          t.$ === w && (t.$ = Ke), e && t.jQuery === w && (t.jQuery = $e), w
        );
      }),
      void 0 === e && (t.jQuery = t.$ = w),
      w
    );
  }),
  /*! jQuery UI - v1.11.4 - 2016-03-02
   * http://jqueryui.com
   * Includes: core.js, widget.js, mouse.js, draggable.js, droppable.js, sortable.js, effect.js, effect-slide.js
   * Copyright jQuery Foundation and other contributors; Licensed MIT */
  (function (t) {
    "function" == typeof define && define.amd
      ? define(["jquery"], t)
      : t(jQuery);
  })(function (t) {
    var e, n, i, o;
    function r(e, n) {
      var i,
        o,
        r,
        a = e.nodeName.toLowerCase();
      return "area" === a
        ? ((o = (i = e.parentNode).name),
          !(!e.href || !o || "map" !== i.nodeName.toLowerCase()) &&
            !!(r = t("img[usemap='#" + o + "']")[0]) &&
            s(r))
        : (/^(input|select|textarea|button|object)$/.test(a)
            ? !e.disabled
            : ("a" === a && e.href) || n) && s(e);
    }
    function s(e) {
      return (
        t.expr.filters.visible(e) &&
        !t(e)
          .parents()
          .addBack()
          .filter(function () {
            return "hidden" === t.css(this, "visibility");
          }).length
      );
    }
    /*!
     * jQuery UI Core 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/category/ui-core/
     */
    (t.ui = t.ui || {}),
      t.extend(t.ui, {
        version: "1.11.4",
        keyCode: {
          BACKSPACE: 8,
          COMMA: 188,
          DELETE: 46,
          DOWN: 40,
          END: 35,
          ENTER: 13,
          ESCAPE: 27,
          HOME: 36,
          LEFT: 37,
          PAGE_DOWN: 34,
          PAGE_UP: 33,
          PERIOD: 190,
          RIGHT: 39,
          SPACE: 32,
          TAB: 9,
          UP: 38,
        },
      }),
      t.fn.extend({
        scrollParent: function (e) {
          var n = this.css("position"),
            i = "absolute" === n,
            o = e ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
            r = this.parents()
              .filter(function () {
                var e = t(this);
                return (
                  (!i || "static" !== e.css("position")) &&
                  o.test(
                    e.css("overflow") +
                      e.css("overflow-y") +
                      e.css("overflow-x")
                  )
                );
              })
              .eq(0);
          return "fixed" !== n && r.length
            ? r
            : t(this[0].ownerDocument || document);
        },
        uniqueId:
          ((e = 0),
          function () {
            return this.each(function () {
              this.id || (this.id = "ui-id-" + ++e);
            });
          }),
        removeUniqueId: function () {
          return this.each(function () {
            /^ui-id-\d+$/.test(this.id) && t(this).removeAttr("id");
          });
        },
      }),
      t.extend(t.expr[":"], {
        data: t.expr.createPseudo
          ? t.expr.createPseudo(function (e) {
              return function (n) {
                return !!t.data(n, e);
              };
            })
          : function (e, n, i) {
              return !!t.data(e, i[3]);
            },
        focusable: function (e) {
          return r(e, !isNaN(t.attr(e, "tabindex")));
        },
        tabbable: function (e) {
          var n = t.attr(e, "tabindex"),
            i = isNaN(n);
          return (i || n >= 0) && r(e, !i);
        },
      }),
      t("<a>").outerWidth(1).jquery ||
        t.each(["Width", "Height"], function (e, n) {
          var i = "Width" === n ? ["Left", "Right"] : ["Top", "Bottom"],
            o = n.toLowerCase(),
            r = {
              innerWidth: t.fn.innerWidth,
              innerHeight: t.fn.innerHeight,
              outerWidth: t.fn.outerWidth,
              outerHeight: t.fn.outerHeight,
            };
          function s(e, n, o, r) {
            return (
              t.each(i, function () {
                (n -= parseFloat(t.css(e, "padding" + this)) || 0),
                  o &&
                    (n -= parseFloat(t.css(e, "border" + this + "Width")) || 0),
                  r && (n -= parseFloat(t.css(e, "margin" + this)) || 0);
              }),
              n
            );
          }
          (t.fn["inner" + n] = function (e) {
            return void 0 === e
              ? r["inner" + n].call(this)
              : this.each(function () {
                  t(this).css(o, s(this, e) + "px");
                });
          }),
            (t.fn["outer" + n] = function (e, i) {
              return "number" != typeof e
                ? r["outer" + n].call(this, e)
                : this.each(function () {
                    t(this).css(o, s(this, e, !0, i) + "px");
                  });
            });
        }),
      t.fn.addBack ||
        (t.fn.addBack = function (t) {
          return this.add(
            null == t ? this.prevObject : this.prevObject.filter(t)
          );
        }),
      t("<a>").data("a-b", "a").removeData("a-b").data("a-b") &&
        (t.fn.removeData =
          ((n = t.fn.removeData),
          function (e) {
            return arguments.length
              ? n.call(this, t.camelCase(e))
              : n.call(this);
          })),
      (t.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase())),
      t.fn.extend({
        focus:
          ((o = t.fn.focus),
          function (e, n) {
            return "number" == typeof e
              ? this.each(function () {
                  var i = this;
                  setTimeout(function () {
                    t(i).focus(), n && n.call(i);
                  }, e);
                })
              : o.apply(this, arguments);
          }),
        disableSelection:
          ((i =
            "onselectstart" in document.createElement("div")
              ? "selectstart"
              : "mousedown"),
          function () {
            return this.bind(i + ".ui-disableSelection", function (t) {
              t.preventDefault();
            });
          }),
        enableSelection: function () {
          return this.unbind(".ui-disableSelection");
        },
        zIndex: function (e) {
          if (void 0 !== e) return this.css("zIndex", e);
          if (this.length)
            for (var n, i, o = t(this[0]); o.length && o[0] !== document; ) {
              if (
                ("absolute" === (n = o.css("position")) ||
                  "relative" === n ||
                  "fixed" === n) &&
                ((i = parseInt(o.css("zIndex"), 10)), !isNaN(i) && 0 !== i)
              )
                return i;
              o = o.parent();
            }
          return 0;
        },
      }),
      (t.ui.plugin = {
        add: function (e, n, i) {
          var o,
            r = t.ui[e].prototype;
          for (o in i)
            (r.plugins[o] = r.plugins[o] || []), r.plugins[o].push([n, i[o]]);
        },
        call: function (t, e, n, i) {
          var o,
            r = t.plugins[e];
          if (
            r &&
            (i ||
              (t.element[0].parentNode &&
                11 !== t.element[0].parentNode.nodeType))
          )
            for (o = 0; o < r.length; o++)
              t.options[r[o][0]] && r[o][1].apply(t.element, n);
        },
      });
    /*!
     * jQuery UI Widget 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/jQuery.widget/
     */
    var a = 0,
      l = Array.prototype.slice;
    (t.cleanData = (function (e) {
      return function (n) {
        var i, o, r;
        for (r = 0; null != (o = n[r]); r++)
          try {
            (i = t._data(o, "events")) &&
              i.remove &&
              t(o).triggerHandler("remove");
          } catch (t) {}
        e(n);
      };
    })(t.cleanData)),
      (t.widget = function (e, n, i) {
        var o,
          r,
          s,
          a,
          l = {},
          c = e.split(".")[0];
        return (
          (e = e.split(".")[1]),
          (o = c + "-" + e),
          i || ((i = n), (n = t.Widget)),
          (t.expr[":"][o.toLowerCase()] = function (e) {
            return !!t.data(e, o);
          }),
          (t[c] = t[c] || {}),
          (r = t[c][e]),
          (s = t[c][e] =
            function (t, e) {
              if (!this._createWidget) return new s(t, e);
              arguments.length && this._createWidget(t, e);
            }),
          t.extend(s, r, {
            version: i.version,
            _proto: t.extend({}, i),
            _childConstructors: [],
          }),
          ((a = new n()).options = t.widget.extend({}, a.options)),
          t.each(i, function (e, i) {
            var o, r;
            t.isFunction(i)
              ? (l[e] =
                  ((o = function () {
                    return n.prototype[e].apply(this, arguments);
                  }),
                  (r = function (t) {
                    return n.prototype[e].apply(this, t);
                  }),
                  function () {
                    var t,
                      e = this._super,
                      n = this._superApply;
                    return (
                      (this._super = o),
                      (this._superApply = r),
                      (t = i.apply(this, arguments)),
                      (this._super = e),
                      (this._superApply = n),
                      t
                    );
                  }))
              : (l[e] = i);
          }),
          (s.prototype = t.widget.extend(
            a,
            { widgetEventPrefix: (r && a.widgetEventPrefix) || e },
            l,
            { constructor: s, namespace: c, widgetName: e, widgetFullName: o }
          )),
          r
            ? (t.each(r._childConstructors, function (e, n) {
                var i = n.prototype;
                t.widget(i.namespace + "." + i.widgetName, s, n._proto);
              }),
              delete r._childConstructors)
            : n._childConstructors.push(s),
          t.widget.bridge(e, s),
          s
        );
      }),
      (t.widget.extend = function (e) {
        for (
          var n, i, o = l.call(arguments, 1), r = 0, s = o.length;
          r < s;
          r++
        )
          for (n in o[r])
            (i = o[r][n]),
              o[r].hasOwnProperty(n) &&
                void 0 !== i &&
                (t.isPlainObject(i)
                  ? (e[n] = t.isPlainObject(e[n])
                      ? t.widget.extend({}, e[n], i)
                      : t.widget.extend({}, i))
                  : (e[n] = i));
        return e;
      }),
      (t.widget.bridge = function (e, n) {
        var i = n.prototype.widgetFullName || e;
        t.fn[e] = function (o) {
          var r = "string" == typeof o,
            s = l.call(arguments, 1),
            a = this;
          return (
            r
              ? this.each(function () {
                  var n,
                    r = t.data(this, i);
                  return "instance" === o
                    ? ((a = r), !1)
                    : r
                    ? t.isFunction(r[o]) && "_" !== o.charAt(0)
                      ? (n = r[o].apply(r, s)) !== r && void 0 !== n
                        ? ((a = n && n.jquery ? a.pushStack(n.get()) : n), !1)
                        : void 0
                      : t.error(
                          "no such method '" +
                            o +
                            "' for " +
                            e +
                            " widget instance"
                        )
                    : t.error(
                        "cannot call methods on " +
                          e +
                          " prior to initialization; attempted to call method '" +
                          o +
                          "'"
                      );
                })
              : (s.length && (o = t.widget.extend.apply(null, [o].concat(s))),
                this.each(function () {
                  var e = t.data(this, i);
                  e
                    ? (e.option(o || {}), e._init && e._init())
                    : t.data(this, i, new n(o, this));
                })),
            a
          );
        };
      }),
      (t.Widget = function () {}),
      (t.Widget._childConstructors = []),
      (t.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: { disabled: !1, create: null },
        _createWidget: function (e, n) {
          (n = t(n || this.defaultElement || this)[0]),
            (this.element = t(n)),
            (this.uuid = a++),
            (this.eventNamespace = "." + this.widgetName + this.uuid),
            (this.bindings = t()),
            (this.hoverable = t()),
            (this.focusable = t()),
            n !== this &&
              (t.data(n, this.widgetFullName, this),
              this._on(!0, this.element, {
                remove: function (t) {
                  t.target === n && this.destroy();
                },
              }),
              (this.document = t(n.style ? n.ownerDocument : n.document || n)),
              (this.window = t(
                this.document[0].defaultView || this.document[0].parentWindow
              ))),
            (this.options = t.widget.extend(
              {},
              this.options,
              this._getCreateOptions(),
              e
            )),
            this._create(),
            this._trigger("create", null, this._getCreateEventData()),
            this._init();
        },
        _getCreateOptions: t.noop,
        _getCreateEventData: t.noop,
        _create: t.noop,
        _init: t.noop,
        destroy: function () {
          this._destroy(),
            this.element
              .unbind(this.eventNamespace)
              .removeData(this.widgetFullName)
              .removeData(t.camelCase(this.widgetFullName)),
            this.widget()
              .unbind(this.eventNamespace)
              .removeAttr("aria-disabled")
              .removeClass(this.widgetFullName + "-disabled ui-state-disabled"),
            this.bindings.unbind(this.eventNamespace),
            this.hoverable.removeClass("ui-state-hover"),
            this.focusable.removeClass("ui-state-focus");
        },
        _destroy: t.noop,
        widget: function () {
          return this.element;
        },
        option: function (e, n) {
          var i,
            o,
            r,
            s = e;
          if (0 === arguments.length) return t.widget.extend({}, this.options);
          if ("string" == typeof e)
            if (((s = {}), (i = e.split(".")), (e = i.shift()), i.length)) {
              for (
                o = s[e] = t.widget.extend({}, this.options[e]), r = 0;
                r < i.length - 1;
                r++
              )
                (o[i[r]] = o[i[r]] || {}), (o = o[i[r]]);
              if (((e = i.pop()), 1 === arguments.length))
                return void 0 === o[e] ? null : o[e];
              o[e] = n;
            } else {
              if (1 === arguments.length)
                return void 0 === this.options[e] ? null : this.options[e];
              s[e] = n;
            }
          return this._setOptions(s), this;
        },
        _setOptions: function (t) {
          var e;
          for (e in t) this._setOption(e, t[e]);
          return this;
        },
        _setOption: function (t, e) {
          return (
            (this.options[t] = e),
            "disabled" === t &&
              (this.widget().toggleClass(
                this.widgetFullName + "-disabled",
                !!e
              ),
              e &&
                (this.hoverable.removeClass("ui-state-hover"),
                this.focusable.removeClass("ui-state-focus"))),
            this
          );
        },
        enable: function () {
          return this._setOptions({ disabled: !1 });
        },
        disable: function () {
          return this._setOptions({ disabled: !0 });
        },
        _on: function (e, n, i) {
          var o,
            r = this;
          "boolean" != typeof e && ((i = n), (n = e), (e = !1)),
            i
              ? ((n = o = t(n)), (this.bindings = this.bindings.add(n)))
              : ((i = n), (n = this.element), (o = this.widget())),
            t.each(i, function (i, s) {
              function a() {
                if (
                  e ||
                  (!0 !== r.options.disabled &&
                    !t(this).hasClass("ui-state-disabled"))
                )
                  return ("string" == typeof s ? r[s] : s).apply(r, arguments);
              }
              "string" != typeof s &&
                (a.guid = s.guid = s.guid || a.guid || t.guid++);
              var l = i.match(/^([\w:-]*)\s*(.*)$/),
                c = l[1] + r.eventNamespace,
                u = l[2];
              u ? o.delegate(u, c, a) : n.bind(c, a);
            });
        },
        _off: function (e, n) {
          (n =
            (n || "").split(" ").join(this.eventNamespace + " ") +
            this.eventNamespace),
            e.unbind(n).undelegate(n),
            (this.bindings = t(this.bindings.not(e).get())),
            (this.focusable = t(this.focusable.not(e).get())),
            (this.hoverable = t(this.hoverable.not(e).get()));
        },
        _delay: function (t, e) {
          var n = this;
          return setTimeout(function () {
            return ("string" == typeof t ? n[t] : t).apply(n, arguments);
          }, e || 0);
        },
        _hoverable: function (e) {
          (this.hoverable = this.hoverable.add(e)),
            this._on(e, {
              mouseenter: function (e) {
                t(e.currentTarget).addClass("ui-state-hover");
              },
              mouseleave: function (e) {
                t(e.currentTarget).removeClass("ui-state-hover");
              },
            });
        },
        _focusable: function (e) {
          (this.focusable = this.focusable.add(e)),
            this._on(e, {
              focusin: function (e) {
                t(e.currentTarget).addClass("ui-state-focus");
              },
              focusout: function (e) {
                t(e.currentTarget).removeClass("ui-state-focus");
              },
            });
        },
        _trigger: function (e, n, i) {
          var o,
            r,
            s = this.options[e];
          if (
            ((i = i || {}),
            ((n = t.Event(n)).type = (
              e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e
            ).toLowerCase()),
            (n.target = this.element[0]),
            (r = n.originalEvent))
          )
            for (o in r) o in n || (n[o] = r[o]);
          return (
            this.element.trigger(n, i),
            !(
              (t.isFunction(s) &&
                !1 === s.apply(this.element[0], [n].concat(i))) ||
              n.isDefaultPrevented()
            )
          );
        },
      }),
      t.each({ show: "fadeIn", hide: "fadeOut" }, function (e, n) {
        t.Widget.prototype["_" + e] = function (i, o, r) {
          "string" == typeof o && (o = { effect: o });
          var s,
            a = o ? (!0 === o || "number" == typeof o ? n : o.effect || n) : e;
          "number" == typeof (o = o || {}) && (o = { duration: o }),
            (s = !t.isEmptyObject(o)),
            (o.complete = r),
            o.delay && i.delay(o.delay),
            s && t.effects && t.effects.effect[a]
              ? i[e](o)
              : a !== e && i[a]
              ? i[a](o.duration, o.easing, r)
              : i.queue(function (n) {
                  t(this)[e](), r && r.call(i[0]), n();
                });
        };
      });
    t.widget;
    /*!
     * jQuery UI Mouse 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/mouse/
     */ var c = !1;
    t(document).mouseup(function () {
      c = !1;
    });
    t.widget("ui.mouse", {
      version: "1.11.4",
      options: {
        cancel: "input,textarea,button,select,option",
        distance: 1,
        delay: 0,
      },
      _mouseInit: function () {
        var e = this;
        this.element
          .bind("mousedown." + this.widgetName, function (t) {
            return e._mouseDown(t);
          })
          .bind("click." + this.widgetName, function (n) {
            if (!0 === t.data(n.target, e.widgetName + ".preventClickEvent"))
              return (
                t.removeData(n.target, e.widgetName + ".preventClickEvent"),
                n.stopImmediatePropagation(),
                !1
              );
          }),
          (this.started = !1);
      },
      _mouseDestroy: function () {
        this.element.unbind("." + this.widgetName),
          this._mouseMoveDelegate &&
            this.document
              .unbind("mousemove." + this.widgetName, this._mouseMoveDelegate)
              .unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
      },
      _mouseDown: function (e) {
        if (!c) {
          (this._mouseMoved = !1),
            this._mouseStarted && this._mouseUp(e),
            (this._mouseDownEvent = e);
          var n = this,
            i = 1 === e.which,
            o =
              !("string" != typeof this.options.cancel || !e.target.nodeName) &&
              t(e.target).closest(this.options.cancel).length;
          return (
            !(i && !o && this._mouseCapture(e)) ||
            ((this.mouseDelayMet = !this.options.delay),
            this.mouseDelayMet ||
              (this._mouseDelayTimer = setTimeout(function () {
                n.mouseDelayMet = !0;
              }, this.options.delay)),
            this._mouseDistanceMet(e) &&
            this._mouseDelayMet(e) &&
            ((this._mouseStarted = !1 !== this._mouseStart(e)),
            !this._mouseStarted)
              ? (e.preventDefault(), !0)
              : (!0 ===
                  t.data(e.target, this.widgetName + ".preventClickEvent") &&
                  t.removeData(
                    e.target,
                    this.widgetName + ".preventClickEvent"
                  ),
                (this._mouseMoveDelegate = function (t) {
                  return n._mouseMove(t);
                }),
                (this._mouseUpDelegate = function (t) {
                  return n._mouseUp(t);
                }),
                this.document
                  .bind("mousemove." + this.widgetName, this._mouseMoveDelegate)
                  .bind("mouseup." + this.widgetName, this._mouseUpDelegate),
                e.preventDefault(),
                (c = !0),
                !0))
          );
        }
      },
      _mouseMove: function (e) {
        if (this._mouseMoved) {
          if (
            t.ui.ie &&
            (!document.documentMode || document.documentMode < 9) &&
            !e.button
          )
            return this._mouseUp(e);
          if (!e.which) return this._mouseUp(e);
        }
        return (
          (e.which || e.button) && (this._mouseMoved = !0),
          this._mouseStarted
            ? (this._mouseDrag(e), e.preventDefault())
            : (this._mouseDistanceMet(e) &&
                this._mouseDelayMet(e) &&
                ((this._mouseStarted =
                  !1 !== this._mouseStart(this._mouseDownEvent, e)),
                this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)),
              !this._mouseStarted)
        );
      },
      _mouseUp: function (e) {
        return (
          this.document
            .unbind("mousemove." + this.widgetName, this._mouseMoveDelegate)
            .unbind("mouseup." + this.widgetName, this._mouseUpDelegate),
          this._mouseStarted &&
            ((this._mouseStarted = !1),
            e.target === this._mouseDownEvent.target &&
              t.data(e.target, this.widgetName + ".preventClickEvent", !0),
            this._mouseStop(e)),
          (c = !1),
          !1
        );
      },
      _mouseDistanceMet: function (t) {
        return (
          Math.max(
            Math.abs(this._mouseDownEvent.pageX - t.pageX),
            Math.abs(this._mouseDownEvent.pageY - t.pageY)
          ) >= this.options.distance
        );
      },
      _mouseDelayMet: function () {
        return this.mouseDelayMet;
      },
      _mouseStart: function () {},
      _mouseDrag: function () {},
      _mouseStop: function () {},
      _mouseCapture: function () {
        return !0;
      },
    });
    /*!
     * jQuery UI Draggable 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/draggable/
     */ t.widget("ui.draggable", t.ui.mouse, {
      version: "1.11.4",
      widgetEventPrefix: "drag",
      options: {
        addClasses: !0,
        appendTo: "parent",
        axis: !1,
        connectToSortable: !1,
        containment: !1,
        cursor: "auto",
        cursorAt: !1,
        grid: !1,
        handle: !1,
        helper: "original",
        iframeFix: !1,
        opacity: !1,
        refreshPositions: !1,
        revert: !1,
        revertDuration: 500,
        scope: "default",
        scroll: !0,
        scrollSensitivity: 20,
        scrollSpeed: 20,
        snap: !1,
        snapMode: "both",
        snapTolerance: 20,
        stack: !1,
        zIndex: !1,
        drag: null,
        start: null,
        stop: null,
      },
      _create: function () {
        "original" === this.options.helper && this._setPositionRelative(),
          this.options.addClasses && this.element.addClass("ui-draggable"),
          this.options.disabled &&
            this.element.addClass("ui-draggable-disabled"),
          this._setHandleClassName(),
          this._mouseInit();
      },
      _setOption: function (t, e) {
        this._super(t, e),
          "handle" === t &&
            (this._removeHandleClassName(), this._setHandleClassName());
      },
      _destroy: function () {
        (this.helper || this.element).is(".ui-draggable-dragging")
          ? (this.destroyOnClear = !0)
          : (this.element.removeClass(
              "ui-draggable ui-draggable-dragging ui-draggable-disabled"
            ),
            this._removeHandleClassName(),
            this._mouseDestroy());
      },
      _mouseCapture: function (e) {
        var n = this.options;
        return (
          this._blurActiveElement(e),
          !(
            this.helper ||
            n.disabled ||
            t(e.target).closest(".ui-resizable-handle").length > 0
          ) &&
            ((this.handle = this._getHandle(e)),
            !!this.handle &&
              (this._blockFrames(!0 === n.iframeFix ? "iframe" : n.iframeFix),
              !0))
        );
      },
      _blockFrames: function (e) {
        this.iframeBlocks = this.document.find(e).map(function () {
          var e = t(this);
          return t("<div>")
            .css("position", "absolute")
            .appendTo(e.parent())
            .outerWidth(e.outerWidth())
            .outerHeight(e.outerHeight())
            .offset(e.offset())[0];
        });
      },
      _unblockFrames: function () {
        this.iframeBlocks &&
          (this.iframeBlocks.remove(), delete this.iframeBlocks);
      },
      _blurActiveElement: function (e) {
        var n = this.document[0];
        if (this.handleElement.is(e.target))
          try {
            n.activeElement &&
              "body" !== n.activeElement.nodeName.toLowerCase() &&
              t(n.activeElement).blur();
          } catch (t) {}
      },
      _mouseStart: function (e) {
        var n = this.options;
        return (
          (this.helper = this._createHelper(e)),
          this.helper.addClass("ui-draggable-dragging"),
          this._cacheHelperProportions(),
          t.ui.ddmanager && (t.ui.ddmanager.current = this),
          this._cacheMargins(),
          (this.cssPosition = this.helper.css("position")),
          (this.scrollParent = this.helper.scrollParent(!0)),
          (this.offsetParent = this.helper.offsetParent()),
          (this.hasFixedAncestor =
            this.helper.parents().filter(function () {
              return "fixed" === t(this).css("position");
            }).length > 0),
          (this.positionAbs = this.element.offset()),
          this._refreshOffsets(e),
          (this.originalPosition = this.position =
            this._generatePosition(e, !1)),
          (this.originalPageX = e.pageX),
          (this.originalPageY = e.pageY),
          n.cursorAt && this._adjustOffsetFromHelper(n.cursorAt),
          this._setContainment(),
          !1 === this._trigger("start", e)
            ? (this._clear(), !1)
            : (this._cacheHelperProportions(),
              t.ui.ddmanager &&
                !n.dropBehaviour &&
                t.ui.ddmanager.prepareOffsets(this, e),
              this._normalizeRightBottom(),
              this._mouseDrag(e, !0),
              t.ui.ddmanager && t.ui.ddmanager.dragStart(this, e),
              !0)
        );
      },
      _refreshOffsets: function (t) {
        (this.offset = {
          top: this.positionAbs.top - this.margins.top,
          left: this.positionAbs.left - this.margins.left,
          scroll: !1,
          parent: this._getParentOffset(),
          relative: this._getRelativeOffset(),
        }),
          (this.offset.click = {
            left: t.pageX - this.offset.left,
            top: t.pageY - this.offset.top,
          });
      },
      _mouseDrag: function (e, n) {
        if (
          (this.hasFixedAncestor &&
            (this.offset.parent = this._getParentOffset()),
          (this.position = this._generatePosition(e, !0)),
          (this.positionAbs = this._convertPositionTo("absolute")),
          !n)
        ) {
          var i = this._uiHash();
          if (!1 === this._trigger("drag", e, i)) return this._mouseUp({}), !1;
          this.position = i.position;
        }
        return (
          (this.helper[0].style.left = this.position.left + "px"),
          (this.helper[0].style.top = this.position.top + "px"),
          t.ui.ddmanager && t.ui.ddmanager.drag(this, e),
          !1
        );
      },
      _mouseStop: function (e) {
        var n = this,
          i = !1;
        return (
          t.ui.ddmanager &&
            !this.options.dropBehaviour &&
            (i = t.ui.ddmanager.drop(this, e)),
          this.dropped && ((i = this.dropped), (this.dropped = !1)),
          ("invalid" === this.options.revert && !i) ||
          ("valid" === this.options.revert && i) ||
          !0 === this.options.revert ||
          (t.isFunction(this.options.revert) &&
            this.options.revert.call(this.element, i))
            ? t(this.helper).animate(
                this.originalPosition,
                parseInt(this.options.revertDuration, 10),
                function () {
                  !1 !== n._trigger("stop", e) && n._clear();
                }
              )
            : !1 !== this._trigger("stop", e) && this._clear(),
          !1
        );
      },
      _mouseUp: function (e) {
        return (
          this._unblockFrames(),
          t.ui.ddmanager && t.ui.ddmanager.dragStop(this, e),
          this.handleElement.is(e.target) && this.element.focus(),
          t.ui.mouse.prototype._mouseUp.call(this, e)
        );
      },
      cancel: function () {
        return (
          this.helper.is(".ui-draggable-dragging")
            ? this._mouseUp({})
            : this._clear(),
          this
        );
      },
      _getHandle: function (e) {
        return (
          !this.options.handle ||
          !!t(e.target).closest(this.element.find(this.options.handle)).length
        );
      },
      _setHandleClassName: function () {
        (this.handleElement = this.options.handle
          ? this.element.find(this.options.handle)
          : this.element),
          this.handleElement.addClass("ui-draggable-handle");
      },
      _removeHandleClassName: function () {
        this.handleElement.removeClass("ui-draggable-handle");
      },
      _createHelper: function (e) {
        var n = this.options,
          i = t.isFunction(n.helper),
          o = i
            ? t(n.helper.apply(this.element[0], [e]))
            : "clone" === n.helper
            ? this.element.clone().removeAttr("id")
            : this.element;
        return (
          o.parents("body").length ||
            o.appendTo(
              "parent" === n.appendTo ? this.element[0].parentNode : n.appendTo
            ),
          i && o[0] === this.element[0] && this._setPositionRelative(),
          o[0] === this.element[0] ||
            /(fixed|absolute)/.test(o.css("position")) ||
            o.css("position", "absolute"),
          o
        );
      },
      _setPositionRelative: function () {
        /^(?:r|a|f)/.test(this.element.css("position")) ||
          (this.element[0].style.position = "relative");
      },
      _adjustOffsetFromHelper: function (e) {
        "string" == typeof e && (e = e.split(" ")),
          t.isArray(e) && (e = { left: +e[0], top: +e[1] || 0 }),
          "left" in e && (this.offset.click.left = e.left + this.margins.left),
          "right" in e &&
            (this.offset.click.left =
              this.helperProportions.width - e.right + this.margins.left),
          "top" in e && (this.offset.click.top = e.top + this.margins.top),
          "bottom" in e &&
            (this.offset.click.top =
              this.helperProportions.height - e.bottom + this.margins.top);
      },
      _isRootNode: function (t) {
        return /(html|body)/i.test(t.tagName) || t === this.document[0];
      },
      _getParentOffset: function () {
        var e = this.offsetParent.offset(),
          n = this.document[0];
        return (
          "absolute" === this.cssPosition &&
            this.scrollParent[0] !== n &&
            t.contains(this.scrollParent[0], this.offsetParent[0]) &&
            ((e.left += this.scrollParent.scrollLeft()),
            (e.top += this.scrollParent.scrollTop())),
          this._isRootNode(this.offsetParent[0]) && (e = { top: 0, left: 0 }),
          {
            top:
              e.top +
              (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
            left:
              e.left +
              (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0),
          }
        );
      },
      _getRelativeOffset: function () {
        if ("relative" !== this.cssPosition) return { top: 0, left: 0 };
        var t = this.element.position(),
          e = this._isRootNode(this.scrollParent[0]);
        return {
          top:
            t.top -
            (parseInt(this.helper.css("top"), 10) || 0) +
            (e ? 0 : this.scrollParent.scrollTop()),
          left:
            t.left -
            (parseInt(this.helper.css("left"), 10) || 0) +
            (e ? 0 : this.scrollParent.scrollLeft()),
        };
      },
      _cacheMargins: function () {
        this.margins = {
          left: parseInt(this.element.css("marginLeft"), 10) || 0,
          top: parseInt(this.element.css("marginTop"), 10) || 0,
          right: parseInt(this.element.css("marginRight"), 10) || 0,
          bottom: parseInt(this.element.css("marginBottom"), 10) || 0,
        };
      },
      _cacheHelperProportions: function () {
        this.helperProportions = {
          width: this.helper.outerWidth(),
          height: this.helper.outerHeight(),
        };
      },
      _setContainment: function () {
        var e,
          n,
          i,
          o = this.options,
          r = this.document[0];
        (this.relativeContainer = null),
          o.containment
            ? "window" !== o.containment
              ? "document" !== o.containment
                ? o.containment.constructor !== Array
                  ? ("parent" === o.containment &&
                      (o.containment = this.helper[0].parentNode),
                    (i = (n = t(o.containment))[0]) &&
                      ((e = /(scroll|auto)/.test(n.css("overflow"))),
                      (this.containment = [
                        (parseInt(n.css("borderLeftWidth"), 10) || 0) +
                          (parseInt(n.css("paddingLeft"), 10) || 0),
                        (parseInt(n.css("borderTopWidth"), 10) || 0) +
                          (parseInt(n.css("paddingTop"), 10) || 0),
                        (e
                          ? Math.max(i.scrollWidth, i.offsetWidth)
                          : i.offsetWidth) -
                          (parseInt(n.css("borderRightWidth"), 10) || 0) -
                          (parseInt(n.css("paddingRight"), 10) || 0) -
                          this.helperProportions.width -
                          this.margins.left -
                          this.margins.right,
                        (e
                          ? Math.max(i.scrollHeight, i.offsetHeight)
                          : i.offsetHeight) -
                          (parseInt(n.css("borderBottomWidth"), 10) || 0) -
                          (parseInt(n.css("paddingBottom"), 10) || 0) -
                          this.helperProportions.height -
                          this.margins.top -
                          this.margins.bottom,
                      ]),
                      (this.relativeContainer = n)))
                  : (this.containment = o.containment)
                : (this.containment = [
                    0,
                    0,
                    t(r).width() -
                      this.helperProportions.width -
                      this.margins.left,
                    (t(r).height() || r.body.parentNode.scrollHeight) -
                      this.helperProportions.height -
                      this.margins.top,
                  ])
              : (this.containment = [
                  t(window).scrollLeft() -
                    this.offset.relative.left -
                    this.offset.parent.left,
                  t(window).scrollTop() -
                    this.offset.relative.top -
                    this.offset.parent.top,
                  t(window).scrollLeft() +
                    t(window).width() -
                    this.helperProportions.width -
                    this.margins.left,
                  t(window).scrollTop() +
                    (t(window).height() || r.body.parentNode.scrollHeight) -
                    this.helperProportions.height -
                    this.margins.top,
                ])
            : (this.containment = null);
      },
      _convertPositionTo: function (t, e) {
        e || (e = this.position);
        var n = "absolute" === t ? 1 : -1,
          i = this._isRootNode(this.scrollParent[0]);
        return {
          top:
            e.top +
            this.offset.relative.top * n +
            this.offset.parent.top * n -
            ("fixed" === this.cssPosition
              ? -this.offset.scroll.top
              : i
              ? 0
              : this.offset.scroll.top) *
              n,
          left:
            e.left +
            this.offset.relative.left * n +
            this.offset.parent.left * n -
            ("fixed" === this.cssPosition
              ? -this.offset.scroll.left
              : i
              ? 0
              : this.offset.scroll.left) *
              n,
        };
      },
      _generatePosition: function (t, e) {
        var n,
          i,
          o,
          r,
          s = this.options,
          a = this._isRootNode(this.scrollParent[0]),
          l = t.pageX,
          c = t.pageY;
        return (
          (a && this.offset.scroll) ||
            (this.offset.scroll = {
              top: this.scrollParent.scrollTop(),
              left: this.scrollParent.scrollLeft(),
            }),
          e &&
            (this.containment &&
              (this.relativeContainer
                ? ((i = this.relativeContainer.offset()),
                  (n = [
                    this.containment[0] + i.left,
                    this.containment[1] + i.top,
                    this.containment[2] + i.left,
                    this.containment[3] + i.top,
                  ]))
                : (n = this.containment),
              t.pageX - this.offset.click.left < n[0] &&
                (l = n[0] + this.offset.click.left),
              t.pageY - this.offset.click.top < n[1] &&
                (c = n[1] + this.offset.click.top),
              t.pageX - this.offset.click.left > n[2] &&
                (l = n[2] + this.offset.click.left),
              t.pageY - this.offset.click.top > n[3] &&
                (c = n[3] + this.offset.click.top)),
            s.grid &&
              ((o = s.grid[1]
                ? this.originalPageY +
                  Math.round((c - this.originalPageY) / s.grid[1]) * s.grid[1]
                : this.originalPageY),
              (c = n
                ? o - this.offset.click.top >= n[1] ||
                  o - this.offset.click.top > n[3]
                  ? o
                  : o - this.offset.click.top >= n[1]
                  ? o - s.grid[1]
                  : o + s.grid[1]
                : o),
              (r = s.grid[0]
                ? this.originalPageX +
                  Math.round((l - this.originalPageX) / s.grid[0]) * s.grid[0]
                : this.originalPageX),
              (l = n
                ? r - this.offset.click.left >= n[0] ||
                  r - this.offset.click.left > n[2]
                  ? r
                  : r - this.offset.click.left >= n[0]
                  ? r - s.grid[0]
                  : r + s.grid[0]
                : r)),
            "y" === s.axis && (l = this.originalPageX),
            "x" === s.axis && (c = this.originalPageY)),
          {
            top:
              c -
              this.offset.click.top -
              this.offset.relative.top -
              this.offset.parent.top +
              ("fixed" === this.cssPosition
                ? -this.offset.scroll.top
                : a
                ? 0
                : this.offset.scroll.top),
            left:
              l -
              this.offset.click.left -
              this.offset.relative.left -
              this.offset.parent.left +
              ("fixed" === this.cssPosition
                ? -this.offset.scroll.left
                : a
                ? 0
                : this.offset.scroll.left),
          }
        );
      },
      _clear: function () {
        this.helper.removeClass("ui-draggable-dragging"),
          this.helper[0] === this.element[0] ||
            this.cancelHelperRemoval ||
            this.helper.remove(),
          (this.helper = null),
          (this.cancelHelperRemoval = !1),
          this.destroyOnClear && this.destroy();
      },
      _normalizeRightBottom: function () {
        "y" !== this.options.axis &&
          "auto" !== this.helper.css("right") &&
          (this.helper.width(this.helper.width()),
          this.helper.css("right", "auto")),
          "x" !== this.options.axis &&
            "auto" !== this.helper.css("bottom") &&
            (this.helper.height(this.helper.height()),
            this.helper.css("bottom", "auto"));
      },
      _trigger: function (e, n, i) {
        return (
          (i = i || this._uiHash()),
          t.ui.plugin.call(this, e, [n, i, this], !0),
          /^(drag|start|stop)/.test(e) &&
            ((this.positionAbs = this._convertPositionTo("absolute")),
            (i.offset = this.positionAbs)),
          t.Widget.prototype._trigger.call(this, e, n, i)
        );
      },
      plugins: {},
      _uiHash: function () {
        return {
          helper: this.helper,
          position: this.position,
          originalPosition: this.originalPosition,
          offset: this.positionAbs,
        };
      },
    }),
      t.ui.plugin.add("draggable", "connectToSortable", {
        start: function (e, n, i) {
          var o = t.extend({}, n, { item: i.element });
          (i.sortables = []),
            t(i.options.connectToSortable).each(function () {
              var n = t(this).sortable("instance");
              n &&
                !n.options.disabled &&
                (i.sortables.push(n),
                n.refreshPositions(),
                n._trigger("activate", e, o));
            });
        },
        stop: function (e, n, i) {
          var o = t.extend({}, n, { item: i.element });
          (i.cancelHelperRemoval = !1),
            t.each(i.sortables, function () {
              var t = this;
              t.isOver
                ? ((t.isOver = 0),
                  (i.cancelHelperRemoval = !0),
                  (t.cancelHelperRemoval = !1),
                  (t._storedCSS = {
                    position: t.placeholder.css("position"),
                    top: t.placeholder.css("top"),
                    left: t.placeholder.css("left"),
                  }),
                  t._mouseStop(e),
                  (t.options.helper = t.options._helper))
                : ((t.cancelHelperRemoval = !0),
                  t._trigger("deactivate", e, o));
            });
        },
        drag: function (e, n, i) {
          t.each(i.sortables, function () {
            var o = !1,
              r = this;
            (r.positionAbs = i.positionAbs),
              (r.helperProportions = i.helperProportions),
              (r.offset.click = i.offset.click),
              r._intersectsWith(r.containerCache) &&
                ((o = !0),
                t.each(i.sortables, function () {
                  return (
                    (this.positionAbs = i.positionAbs),
                    (this.helperProportions = i.helperProportions),
                    (this.offset.click = i.offset.click),
                    this !== r &&
                      this._intersectsWith(this.containerCache) &&
                      t.contains(r.element[0], this.element[0]) &&
                      (o = !1),
                    o
                  );
                })),
              o
                ? (r.isOver ||
                    ((r.isOver = 1),
                    (i._parent = n.helper.parent()),
                    (r.currentItem = n.helper
                      .appendTo(r.element)
                      .data("ui-sortable-item", !0)),
                    (r.options._helper = r.options.helper),
                    (r.options.helper = function () {
                      return n.helper[0];
                    }),
                    (e.target = r.currentItem[0]),
                    r._mouseCapture(e, !0),
                    r._mouseStart(e, !0, !0),
                    (r.offset.click.top = i.offset.click.top),
                    (r.offset.click.left = i.offset.click.left),
                    (r.offset.parent.left -=
                      i.offset.parent.left - r.offset.parent.left),
                    (r.offset.parent.top -=
                      i.offset.parent.top - r.offset.parent.top),
                    i._trigger("toSortable", e),
                    (i.dropped = r.element),
                    t.each(i.sortables, function () {
                      this.refreshPositions();
                    }),
                    (i.currentItem = i.element),
                    (r.fromOutside = i)),
                  r.currentItem && (r._mouseDrag(e), (n.position = r.position)))
                : r.isOver &&
                  ((r.isOver = 0),
                  (r.cancelHelperRemoval = !0),
                  (r.options._revert = r.options.revert),
                  (r.options.revert = !1),
                  r._trigger("out", e, r._uiHash(r)),
                  r._mouseStop(e, !0),
                  (r.options.revert = r.options._revert),
                  (r.options.helper = r.options._helper),
                  r.placeholder && r.placeholder.remove(),
                  n.helper.appendTo(i._parent),
                  i._refreshOffsets(e),
                  (n.position = i._generatePosition(e, !0)),
                  i._trigger("fromSortable", e),
                  (i.dropped = !1),
                  t.each(i.sortables, function () {
                    this.refreshPositions();
                  }));
          });
        },
      }),
      t.ui.plugin.add("draggable", "cursor", {
        start: function (e, n, i) {
          var o = t("body"),
            r = i.options;
          o.css("cursor") && (r._cursor = o.css("cursor")),
            o.css("cursor", r.cursor);
        },
        stop: function (e, n, i) {
          var o = i.options;
          o._cursor && t("body").css("cursor", o._cursor);
        },
      }),
      t.ui.plugin.add("draggable", "opacity", {
        start: function (e, n, i) {
          var o = t(n.helper),
            r = i.options;
          o.css("opacity") && (r._opacity = o.css("opacity")),
            o.css("opacity", r.opacity);
        },
        stop: function (e, n, i) {
          var o = i.options;
          o._opacity && t(n.helper).css("opacity", o._opacity);
        },
      }),
      t.ui.plugin.add("draggable", "scroll", {
        start: function (t, e, n) {
          n.scrollParentNotHidden ||
            (n.scrollParentNotHidden = n.helper.scrollParent(!1)),
            n.scrollParentNotHidden[0] !== n.document[0] &&
              "HTML" !== n.scrollParentNotHidden[0].tagName &&
              (n.overflowOffset = n.scrollParentNotHidden.offset());
        },
        drag: function (e, n, i) {
          var o = i.options,
            r = !1,
            s = i.scrollParentNotHidden[0],
            a = i.document[0];
          s !== a && "HTML" !== s.tagName
            ? ((o.axis && "x" === o.axis) ||
                (i.overflowOffset.top + s.offsetHeight - e.pageY <
                o.scrollSensitivity
                  ? (s.scrollTop = r = s.scrollTop + o.scrollSpeed)
                  : e.pageY - i.overflowOffset.top < o.scrollSensitivity &&
                    (s.scrollTop = r = s.scrollTop - o.scrollSpeed)),
              (o.axis && "y" === o.axis) ||
                (i.overflowOffset.left + s.offsetWidth - e.pageX <
                o.scrollSensitivity
                  ? (s.scrollLeft = r = s.scrollLeft + o.scrollSpeed)
                  : e.pageX - i.overflowOffset.left < o.scrollSensitivity &&
                    (s.scrollLeft = r = s.scrollLeft - o.scrollSpeed)))
            : ((o.axis && "x" === o.axis) ||
                (e.pageY - t(a).scrollTop() < o.scrollSensitivity
                  ? (r = t(a).scrollTop(t(a).scrollTop() - o.scrollSpeed))
                  : t(window).height() - (e.pageY - t(a).scrollTop()) <
                      o.scrollSensitivity &&
                    (r = t(a).scrollTop(t(a).scrollTop() + o.scrollSpeed))),
              (o.axis && "y" === o.axis) ||
                (e.pageX - t(a).scrollLeft() < o.scrollSensitivity
                  ? (r = t(a).scrollLeft(t(a).scrollLeft() - o.scrollSpeed))
                  : t(window).width() - (e.pageX - t(a).scrollLeft()) <
                      o.scrollSensitivity &&
                    (r = t(a).scrollLeft(t(a).scrollLeft() + o.scrollSpeed)))),
            !1 !== r &&
              t.ui.ddmanager &&
              !o.dropBehaviour &&
              t.ui.ddmanager.prepareOffsets(i, e);
        },
      }),
      t.ui.plugin.add("draggable", "snap", {
        start: function (e, n, i) {
          var o = i.options;
          (i.snapElements = []),
            t(
              o.snap.constructor !== String
                ? o.snap.items || ":data(ui-draggable)"
                : o.snap
            ).each(function () {
              var e = t(this),
                n = e.offset();
              this !== i.element[0] &&
                i.snapElements.push({
                  item: this,
                  width: e.outerWidth(),
                  height: e.outerHeight(),
                  top: n.top,
                  left: n.left,
                });
            });
        },
        drag: function (e, n, i) {
          var o,
            r,
            s,
            a,
            l,
            c,
            u,
            f,
            h,
            d,
            p = i.options,
            g = p.snapTolerance,
            m = n.offset.left,
            v = m + i.helperProportions.width,
            b = n.offset.top,
            y = b + i.helperProportions.height;
          for (h = i.snapElements.length - 1; h >= 0; h--)
            (c =
              (l = i.snapElements[h].left - i.margins.left) +
              i.snapElements[h].width),
              (f =
                (u = i.snapElements[h].top - i.margins.top) +
                i.snapElements[h].height),
              v < l - g ||
              m > c + g ||
              y < u - g ||
              b > f + g ||
              !t.contains(
                i.snapElements[h].item.ownerDocument,
                i.snapElements[h].item
              )
                ? (i.snapElements[h].snapping &&
                    i.options.snap.release &&
                    i.options.snap.release.call(
                      i.element,
                      e,
                      t.extend(i._uiHash(), {
                        snapItem: i.snapElements[h].item,
                      })
                    ),
                  (i.snapElements[h].snapping = !1))
                : ("inner" !== p.snapMode &&
                    ((o = Math.abs(u - y) <= g),
                    (r = Math.abs(f - b) <= g),
                    (s = Math.abs(l - v) <= g),
                    (a = Math.abs(c - m) <= g),
                    o &&
                      (n.position.top = i._convertPositionTo("relative", {
                        top: u - i.helperProportions.height,
                        left: 0,
                      }).top),
                    r &&
                      (n.position.top = i._convertPositionTo("relative", {
                        top: f,
                        left: 0,
                      }).top),
                    s &&
                      (n.position.left = i._convertPositionTo("relative", {
                        top: 0,
                        left: l - i.helperProportions.width,
                      }).left),
                    a &&
                      (n.position.left = i._convertPositionTo("relative", {
                        top: 0,
                        left: c,
                      }).left)),
                  (d = o || r || s || a),
                  "outer" !== p.snapMode &&
                    ((o = Math.abs(u - b) <= g),
                    (r = Math.abs(f - y) <= g),
                    (s = Math.abs(l - m) <= g),
                    (a = Math.abs(c - v) <= g),
                    o &&
                      (n.position.top = i._convertPositionTo("relative", {
                        top: u,
                        left: 0,
                      }).top),
                    r &&
                      (n.position.top = i._convertPositionTo("relative", {
                        top: f - i.helperProportions.height,
                        left: 0,
                      }).top),
                    s &&
                      (n.position.left = i._convertPositionTo("relative", {
                        top: 0,
                        left: l,
                      }).left),
                    a &&
                      (n.position.left = i._convertPositionTo("relative", {
                        top: 0,
                        left: c - i.helperProportions.width,
                      }).left)),
                  !i.snapElements[h].snapping &&
                    (o || r || s || a || d) &&
                    i.options.snap.snap &&
                    i.options.snap.snap.call(
                      i.element,
                      e,
                      t.extend(i._uiHash(), {
                        snapItem: i.snapElements[h].item,
                      })
                    ),
                  (i.snapElements[h].snapping = o || r || s || a || d));
        },
      }),
      t.ui.plugin.add("draggable", "stack", {
        start: function (e, n, i) {
          var o,
            r = i.options,
            s = t.makeArray(t(r.stack)).sort(function (e, n) {
              return (
                (parseInt(t(e).css("zIndex"), 10) || 0) -
                (parseInt(t(n).css("zIndex"), 10) || 0)
              );
            });
          s.length &&
            ((o = parseInt(t(s[0]).css("zIndex"), 10) || 0),
            t(s).each(function (e) {
              t(this).css("zIndex", o + e);
            }),
            this.css("zIndex", o + s.length));
        },
      }),
      t.ui.plugin.add("draggable", "zIndex", {
        start: function (e, n, i) {
          var o = t(n.helper),
            r = i.options;
          o.css("zIndex") && (r._zIndex = o.css("zIndex")),
            o.css("zIndex", r.zIndex);
        },
        stop: function (e, n, i) {
          var o = i.options;
          o._zIndex && t(n.helper).css("zIndex", o._zIndex);
        },
      });
    t.ui.draggable;
    /*!
     * jQuery UI Droppable 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/droppable/
     */ t.widget("ui.droppable", {
      version: "1.11.4",
      widgetEventPrefix: "drop",
      options: {
        accept: "*",
        activeClass: !1,
        addClasses: !0,
        greedy: !1,
        hoverClass: !1,
        scope: "default",
        tolerance: "intersect",
        activate: null,
        deactivate: null,
        drop: null,
        out: null,
        over: null,
      },
      _create: function () {
        var e,
          n = this.options,
          i = n.accept;
        (this.isover = !1),
          (this.isout = !0),
          (this.accept = t.isFunction(i)
            ? i
            : function (t) {
                return t.is(i);
              }),
          (this.proportions = function () {
            if (!arguments.length)
              return (
                e ||
                (e = {
                  width: this.element[0].offsetWidth,
                  height: this.element[0].offsetHeight,
                })
              );
            e = arguments[0];
          }),
          this._addToManager(n.scope),
          n.addClasses && this.element.addClass("ui-droppable");
      },
      _addToManager: function (e) {
        (t.ui.ddmanager.droppables[e] = t.ui.ddmanager.droppables[e] || []),
          t.ui.ddmanager.droppables[e].push(this);
      },
      _splice: function (t) {
        for (var e = 0; e < t.length; e++) t[e] === this && t.splice(e, 1);
      },
      _destroy: function () {
        var e = t.ui.ddmanager.droppables[this.options.scope];
        this._splice(e),
          this.element.removeClass("ui-droppable ui-droppable-disabled");
      },
      _setOption: function (e, n) {
        if ("accept" === e)
          this.accept = t.isFunction(n)
            ? n
            : function (t) {
                return t.is(n);
              };
        else if ("scope" === e) {
          var i = t.ui.ddmanager.droppables[this.options.scope];
          this._splice(i), this._addToManager(n);
        }
        this._super(e, n);
      },
      _activate: function (e) {
        var n = t.ui.ddmanager.current;
        this.options.activeClass &&
          this.element.addClass(this.options.activeClass),
          n && this._trigger("activate", e, this.ui(n));
      },
      _deactivate: function (e) {
        var n = t.ui.ddmanager.current;
        this.options.activeClass &&
          this.element.removeClass(this.options.activeClass),
          n && this._trigger("deactivate", e, this.ui(n));
      },
      _over: function (e) {
        var n = t.ui.ddmanager.current;
        n &&
          (n.currentItem || n.element)[0] !== this.element[0] &&
          this.accept.call(this.element[0], n.currentItem || n.element) &&
          (this.options.hoverClass &&
            this.element.addClass(this.options.hoverClass),
          this._trigger("over", e, this.ui(n)));
      },
      _out: function (e) {
        var n = t.ui.ddmanager.current;
        n &&
          (n.currentItem || n.element)[0] !== this.element[0] &&
          this.accept.call(this.element[0], n.currentItem || n.element) &&
          (this.options.hoverClass &&
            this.element.removeClass(this.options.hoverClass),
          this._trigger("out", e, this.ui(n)));
      },
      _drop: function (e, n) {
        var i = n || t.ui.ddmanager.current,
          o = !1;
        return (
          !(!i || (i.currentItem || i.element)[0] === this.element[0]) &&
          (this.element
            .find(":data(ui-droppable)")
            .not(".ui-draggable-dragging")
            .each(function () {
              var n = t(this).droppable("instance");
              if (
                n.options.greedy &&
                !n.options.disabled &&
                n.options.scope === i.options.scope &&
                n.accept.call(n.element[0], i.currentItem || i.element) &&
                t.ui.intersect(
                  i,
                  t.extend(n, { offset: n.element.offset() }),
                  n.options.tolerance,
                  e
                )
              )
                return (o = !0), !1;
            }),
          !o &&
            !!this.accept.call(this.element[0], i.currentItem || i.element) &&
            (this.options.activeClass &&
              this.element.removeClass(this.options.activeClass),
            this.options.hoverClass &&
              this.element.removeClass(this.options.hoverClass),
            this._trigger("drop", e, this.ui(i)),
            this.element))
        );
      },
      ui: function (t) {
        return {
          draggable: t.currentItem || t.element,
          helper: t.helper,
          position: t.position,
          offset: t.positionAbs,
        };
      },
    }),
      (t.ui.intersect = (function () {
        function t(t, e, n) {
          return t >= e && t < e + n;
        }
        return function (e, n, i, o) {
          if (!n.offset) return !1;
          var r = (e.positionAbs || e.position.absolute).left + e.margins.left,
            s = (e.positionAbs || e.position.absolute).top + e.margins.top,
            a = r + e.helperProportions.width,
            l = s + e.helperProportions.height,
            c = n.offset.left,
            u = n.offset.top,
            f = c + n.proportions().width,
            h = u + n.proportions().height;
          switch (i) {
            case "fit":
              return c <= r && a <= f && u <= s && l <= h;
            case "intersect":
              return (
                c < r + e.helperProportions.width / 2 &&
                a - e.helperProportions.width / 2 < f &&
                u < s + e.helperProportions.height / 2 &&
                l - e.helperProportions.height / 2 < h
              );
            case "pointer":
              return (
                t(o.pageY, u, n.proportions().height) &&
                t(o.pageX, c, n.proportions().width)
              );
            case "touch":
              return (
                ((s >= u && s <= h) ||
                  (l >= u && l <= h) ||
                  (s < u && l > h)) &&
                ((r >= c && r <= f) || (a >= c && a <= f) || (r < c && a > f))
              );
            default:
              return !1;
          }
        };
      })()),
      (t.ui.ddmanager = {
        current: null,
        droppables: { default: [] },
        prepareOffsets: function (e, n) {
          var i,
            o,
            r = t.ui.ddmanager.droppables[e.options.scope] || [],
            s = n ? n.type : null,
            a = (e.currentItem || e.element)
              .find(":data(ui-droppable)")
              .addBack();
          t: for (i = 0; i < r.length; i++)
            if (
              !(
                r[i].options.disabled ||
                (e &&
                  !r[i].accept.call(
                    r[i].element[0],
                    e.currentItem || e.element
                  ))
              )
            ) {
              for (o = 0; o < a.length; o++)
                if (a[o] === r[i].element[0]) {
                  r[i].proportions().height = 0;
                  continue t;
                }
              (r[i].visible = "none" !== r[i].element.css("display")),
                r[i].visible &&
                  ("mousedown" === s && r[i]._activate.call(r[i], n),
                  (r[i].offset = r[i].element.offset()),
                  r[i].proportions({
                    width: r[i].element[0].offsetWidth,
                    height: r[i].element[0].offsetHeight,
                  }));
            }
        },
        drop: function (e, n) {
          var i = !1;
          return (
            t.each(
              (t.ui.ddmanager.droppables[e.options.scope] || []).slice(),
              function () {
                this.options &&
                  (!this.options.disabled &&
                    this.visible &&
                    t.ui.intersect(e, this, this.options.tolerance, n) &&
                    (i = this._drop.call(this, n) || i),
                  !this.options.disabled &&
                    this.visible &&
                    this.accept.call(
                      this.element[0],
                      e.currentItem || e.element
                    ) &&
                    ((this.isout = !0),
                    (this.isover = !1),
                    this._deactivate.call(this, n)));
              }
            ),
            i
          );
        },
        dragStart: function (e, n) {
          e.element.parentsUntil("body").bind("scroll.droppable", function () {
            e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, n);
          });
        },
        drag: function (e, n) {
          e.options.refreshPositions && t.ui.ddmanager.prepareOffsets(e, n),
            t.each(
              t.ui.ddmanager.droppables[e.options.scope] || [],
              function () {
                if (
                  !this.options.disabled &&
                  !this.greedyChild &&
                  this.visible
                ) {
                  var i,
                    o,
                    r,
                    s = t.ui.intersect(e, this, this.options.tolerance, n),
                    a =
                      !s && this.isover
                        ? "isout"
                        : s && !this.isover
                        ? "isover"
                        : null;
                  a &&
                    (this.options.greedy &&
                      ((o = this.options.scope),
                      (r = this.element
                        .parents(":data(ui-droppable)")
                        .filter(function () {
                          return (
                            t(this).droppable("instance").options.scope === o
                          );
                        })).length &&
                        ((i = t(r[0]).droppable("instance")).greedyChild =
                          "isover" === a)),
                    i &&
                      "isover" === a &&
                      ((i.isover = !1), (i.isout = !0), i._out.call(i, n)),
                    (this[a] = !0),
                    (this["isout" === a ? "isover" : "isout"] = !1),
                    this["isover" === a ? "_over" : "_out"].call(this, n),
                    i &&
                      "isout" === a &&
                      ((i.isout = !1), (i.isover = !0), i._over.call(i, n)));
                }
              }
            );
        },
        dragStop: function (e, n) {
          e.element.parentsUntil("body").unbind("scroll.droppable"),
            e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, n);
        },
      });
    t.ui.droppable,
      t.widget("ui.sortable", t.ui.mouse, {
        version: "1.11.4",
        widgetEventPrefix: "sort",
        ready: !1,
        options: {
          appendTo: "parent",
          axis: !1,
          connectWith: !1,
          containment: !1,
          cursor: "auto",
          cursorAt: !1,
          dropOnEmpty: !0,
          forcePlaceholderSize: !1,
          forceHelperSize: !1,
          grid: !1,
          handle: !1,
          helper: "original",
          items: "> *",
          opacity: !1,
          placeholder: !1,
          revert: !1,
          scroll: !0,
          scrollSensitivity: 20,
          scrollSpeed: 20,
          scope: "default",
          tolerance: "intersect",
          zIndex: 1e3,
          activate: null,
          beforeStop: null,
          change: null,
          deactivate: null,
          out: null,
          over: null,
          receive: null,
          remove: null,
          sort: null,
          start: null,
          stop: null,
          update: null,
        },
        _isOverAxis: function (t, e, n) {
          return t >= e && t < e + n;
        },
        _isFloating: function (t) {
          return (
            /left|right/.test(t.css("float")) ||
            /inline|table-cell/.test(t.css("display"))
          );
        },
        _create: function () {
          (this.containerCache = {}),
            this.element.addClass("ui-sortable"),
            this.refresh(),
            (this.offset = this.element.offset()),
            this._mouseInit(),
            this._setHandleClassName(),
            (this.ready = !0);
        },
        _setOption: function (t, e) {
          this._super(t, e), "handle" === t && this._setHandleClassName();
        },
        _setHandleClassName: function () {
          this.element
            .find(".ui-sortable-handle")
            .removeClass("ui-sortable-handle"),
            t.each(this.items, function () {
              (this.instance.options.handle
                ? this.item.find(this.instance.options.handle)
                : this.item
              ).addClass("ui-sortable-handle");
            });
        },
        _destroy: function () {
          this.element
            .removeClass("ui-sortable ui-sortable-disabled")
            .find(".ui-sortable-handle")
            .removeClass("ui-sortable-handle"),
            this._mouseDestroy();
          for (var t = this.items.length - 1; t >= 0; t--)
            this.items[t].item.removeData(this.widgetName + "-item");
          return this;
        },
        _mouseCapture: function (e, n) {
          var i = null,
            o = !1,
            r = this;
          return (
            !this.reverting &&
            !this.options.disabled &&
            "static" !== this.options.type &&
            (this._refreshItems(e),
            t(e.target)
              .parents()
              .each(function () {
                if (t.data(this, r.widgetName + "-item") === r)
                  return (i = t(this)), !1;
              }),
            t.data(e.target, r.widgetName + "-item") === r && (i = t(e.target)),
            !!i &&
              !(
                this.options.handle &&
                !n &&
                (t(this.options.handle, i)
                  .find("*")
                  .addBack()
                  .each(function () {
                    this === e.target && (o = !0);
                  }),
                !o)
              ) &&
              ((this.currentItem = i), this._removeCurrentsFromItems(), !0))
          );
        },
        _mouseStart: function (e, n, i) {
          var o,
            r,
            s = this.options;
          if (
            ((this.currentContainer = this),
            this.refreshPositions(),
            (this.helper = this._createHelper(e)),
            this._cacheHelperProportions(),
            this._cacheMargins(),
            (this.scrollParent = this.helper.scrollParent()),
            (this.offset = this.currentItem.offset()),
            (this.offset = {
              top: this.offset.top - this.margins.top,
              left: this.offset.left - this.margins.left,
            }),
            t.extend(this.offset, {
              click: {
                left: e.pageX - this.offset.left,
                top: e.pageY - this.offset.top,
              },
              parent: this._getParentOffset(),
              relative: this._getRelativeOffset(),
            }),
            this.helper.css("position", "absolute"),
            (this.cssPosition = this.helper.css("position")),
            (this.originalPosition = this._generatePosition(e)),
            (this.originalPageX = e.pageX),
            (this.originalPageY = e.pageY),
            s.cursorAt && this._adjustOffsetFromHelper(s.cursorAt),
            (this.domPosition = {
              prev: this.currentItem.prev()[0],
              parent: this.currentItem.parent()[0],
            }),
            this.helper[0] !== this.currentItem[0] && this.currentItem.hide(),
            this._createPlaceholder(),
            s.containment && this._setContainment(),
            s.cursor &&
              "auto" !== s.cursor &&
              ((r = this.document.find("body")),
              (this.storedCursor = r.css("cursor")),
              r.css("cursor", s.cursor),
              (this.storedStylesheet = t(
                "<style>*{ cursor: " + s.cursor + " !important; }</style>"
              ).appendTo(r))),
            s.opacity &&
              (this.helper.css("opacity") &&
                (this._storedOpacity = this.helper.css("opacity")),
              this.helper.css("opacity", s.opacity)),
            s.zIndex &&
              (this.helper.css("zIndex") &&
                (this._storedZIndex = this.helper.css("zIndex")),
              this.helper.css("zIndex", s.zIndex)),
            this.scrollParent[0] !== this.document[0] &&
              "HTML" !== this.scrollParent[0].tagName &&
              (this.overflowOffset = this.scrollParent.offset()),
            this._trigger("start", e, this._uiHash()),
            this._preserveHelperProportions || this._cacheHelperProportions(),
            !i)
          )
            for (o = this.containers.length - 1; o >= 0; o--)
              this.containers[o]._trigger("activate", e, this._uiHash(this));
          return (
            t.ui.ddmanager && (t.ui.ddmanager.current = this),
            t.ui.ddmanager &&
              !s.dropBehaviour &&
              t.ui.ddmanager.prepareOffsets(this, e),
            (this.dragging = !0),
            this.helper.addClass("ui-sortable-helper"),
            this._mouseDrag(e),
            !0
          );
        },
        _mouseDrag: function (e) {
          var n,
            i,
            o,
            r,
            s = this.options,
            a = !1;
          for (
            this.position = this._generatePosition(e),
              this.positionAbs = this._convertPositionTo("absolute"),
              this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs),
              this.options.scroll &&
                (this.scrollParent[0] !== this.document[0] &&
                "HTML" !== this.scrollParent[0].tagName
                  ? (this.overflowOffset.top +
                      this.scrollParent[0].offsetHeight -
                      e.pageY <
                    s.scrollSensitivity
                      ? (this.scrollParent[0].scrollTop = a =
                          this.scrollParent[0].scrollTop + s.scrollSpeed)
                      : e.pageY - this.overflowOffset.top <
                          s.scrollSensitivity &&
                        (this.scrollParent[0].scrollTop = a =
                          this.scrollParent[0].scrollTop - s.scrollSpeed),
                    this.overflowOffset.left +
                      this.scrollParent[0].offsetWidth -
                      e.pageX <
                    s.scrollSensitivity
                      ? (this.scrollParent[0].scrollLeft = a =
                          this.scrollParent[0].scrollLeft + s.scrollSpeed)
                      : e.pageX - this.overflowOffset.left <
                          s.scrollSensitivity &&
                        (this.scrollParent[0].scrollLeft = a =
                          this.scrollParent[0].scrollLeft - s.scrollSpeed))
                  : (e.pageY - this.document.scrollTop() < s.scrollSensitivity
                      ? (a = this.document.scrollTop(
                          this.document.scrollTop() - s.scrollSpeed
                        ))
                      : this.window.height() -
                          (e.pageY - this.document.scrollTop()) <
                          s.scrollSensitivity &&
                        (a = this.document.scrollTop(
                          this.document.scrollTop() + s.scrollSpeed
                        )),
                    e.pageX - this.document.scrollLeft() < s.scrollSensitivity
                      ? (a = this.document.scrollLeft(
                          this.document.scrollLeft() - s.scrollSpeed
                        ))
                      : this.window.width() -
                          (e.pageX - this.document.scrollLeft()) <
                          s.scrollSensitivity &&
                        (a = this.document.scrollLeft(
                          this.document.scrollLeft() + s.scrollSpeed
                        ))),
                !1 !== a &&
                  t.ui.ddmanager &&
                  !s.dropBehaviour &&
                  t.ui.ddmanager.prepareOffsets(this, e)),
              this.positionAbs = this._convertPositionTo("absolute"),
              (this.options.axis && "y" === this.options.axis) ||
                (this.helper[0].style.left = this.position.left + "px"),
              (this.options.axis && "x" === this.options.axis) ||
                (this.helper[0].style.top = this.position.top + "px"),
              n = this.items.length - 1;
            n >= 0;
            n--
          )
            if (
              ((o = (i = this.items[n]).item[0]),
              (r = this._intersectsWithPointer(i)) &&
                i.instance === this.currentContainer &&
                !(
                  o === this.currentItem[0] ||
                  this.placeholder[1 === r ? "next" : "prev"]()[0] === o ||
                  t.contains(this.placeholder[0], o) ||
                  ("semi-dynamic" === this.options.type &&
                    t.contains(this.element[0], o))
                ))
            ) {
              if (
                ((this.direction = 1 === r ? "down" : "up"),
                "pointer" !== this.options.tolerance &&
                  !this._intersectsWithSides(i))
              )
                break;
              this._rearrange(e, i), this._trigger("change", e, this._uiHash());
              break;
            }
          return (
            this._contactContainers(e),
            t.ui.ddmanager && t.ui.ddmanager.drag(this, e),
            this._trigger("sort", e, this._uiHash()),
            (this.lastPositionAbs = this.positionAbs),
            !1
          );
        },
        _mouseStop: function (e, n) {
          if (e) {
            if (
              (t.ui.ddmanager &&
                !this.options.dropBehaviour &&
                t.ui.ddmanager.drop(this, e),
              this.options.revert)
            ) {
              var i = this,
                o = this.placeholder.offset(),
                r = this.options.axis,
                s = {};
              (r && "x" !== r) ||
                (s.left =
                  o.left -
                  this.offset.parent.left -
                  this.margins.left +
                  (this.offsetParent[0] === this.document[0].body
                    ? 0
                    : this.offsetParent[0].scrollLeft)),
                (r && "y" !== r) ||
                  (s.top =
                    o.top -
                    this.offset.parent.top -
                    this.margins.top +
                    (this.offsetParent[0] === this.document[0].body
                      ? 0
                      : this.offsetParent[0].scrollTop)),
                (this.reverting = !0),
                t(this.helper).animate(
                  s,
                  parseInt(this.options.revert, 10) || 500,
                  function () {
                    i._clear(e);
                  }
                );
            } else this._clear(e, n);
            return !1;
          }
        },
        cancel: function () {
          if (this.dragging) {
            this._mouseUp({ target: null }),
              "original" === this.options.helper
                ? this.currentItem
                    .css(this._storedCSS)
                    .removeClass("ui-sortable-helper")
                : this.currentItem.show();
            for (var e = this.containers.length - 1; e >= 0; e--)
              this.containers[e]._trigger(
                "deactivate",
                null,
                this._uiHash(this)
              ),
                this.containers[e].containerCache.over &&
                  (this.containers[e]._trigger("out", null, this._uiHash(this)),
                  (this.containers[e].containerCache.over = 0));
          }
          return (
            this.placeholder &&
              (this.placeholder[0].parentNode &&
                this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
              "original" !== this.options.helper &&
                this.helper &&
                this.helper[0].parentNode &&
                this.helper.remove(),
              t.extend(this, {
                helper: null,
                dragging: !1,
                reverting: !1,
                _noFinalSort: null,
              }),
              this.domPosition.prev
                ? t(this.domPosition.prev).after(this.currentItem)
                : t(this.domPosition.parent).prepend(this.currentItem)),
            this
          );
        },
        serialize: function (e) {
          var n = this._getItemsAsjQuery(e && e.connected),
            i = [];
          return (
            (e = e || {}),
            t(n).each(function () {
              var n = (t(e.item || this).attr(e.attribute || "id") || "").match(
                e.expression || /(.+)[\-=_](.+)/
              );
              n &&
                i.push(
                  (e.key || n[1] + "[]") +
                    "=" +
                    (e.key && e.expression ? n[1] : n[2])
                );
            }),
            !i.length && e.key && i.push(e.key + "="),
            i.join("&")
          );
        },
        toArray: function (e) {
          var n = this._getItemsAsjQuery(e && e.connected),
            i = [];
          return (
            (e = e || {}),
            n.each(function () {
              i.push(t(e.item || this).attr(e.attribute || "id") || "");
            }),
            i
          );
        },
        _intersectsWith: function (t) {
          var e = this.positionAbs.left,
            n = e + this.helperProportions.width,
            i = this.positionAbs.top,
            o = i + this.helperProportions.height,
            r = t.left,
            s = r + t.width,
            a = t.top,
            l = a + t.height,
            c = this.offset.click.top,
            u = this.offset.click.left,
            f = "x" === this.options.axis || (i + c > a && i + c < l),
            h = "y" === this.options.axis || (e + u > r && e + u < s),
            d = f && h;
          return "pointer" === this.options.tolerance ||
            this.options.forcePointerForContainers ||
            ("pointer" !== this.options.tolerance &&
              this.helperProportions[this.floating ? "width" : "height"] >
                t[this.floating ? "width" : "height"])
            ? d
            : r < e + this.helperProportions.width / 2 &&
                n - this.helperProportions.width / 2 < s &&
                a < i + this.helperProportions.height / 2 &&
                o - this.helperProportions.height / 2 < l;
        },
        _intersectsWithPointer: function (t) {
          var e =
              "x" === this.options.axis ||
              this._isOverAxis(
                this.positionAbs.top + this.offset.click.top,
                t.top,
                t.height
              ),
            n =
              "y" === this.options.axis ||
              this._isOverAxis(
                this.positionAbs.left + this.offset.click.left,
                t.left,
                t.width
              ),
            i = e && n,
            o = this._getDragVerticalDirection(),
            r = this._getDragHorizontalDirection();
          return (
            !!i &&
            (this.floating
              ? (r && "right" === r) || "down" === o
                ? 2
                : 1
              : o && ("down" === o ? 2 : 1))
          );
        },
        _intersectsWithSides: function (t) {
          var e = this._isOverAxis(
              this.positionAbs.top + this.offset.click.top,
              t.top + t.height / 2,
              t.height
            ),
            n = this._isOverAxis(
              this.positionAbs.left + this.offset.click.left,
              t.left + t.width / 2,
              t.width
            ),
            i = this._getDragVerticalDirection(),
            o = this._getDragHorizontalDirection();
          return this.floating && o
            ? ("right" === o && n) || ("left" === o && !n)
            : i && (("down" === i && e) || ("up" === i && !e));
        },
        _getDragVerticalDirection: function () {
          var t = this.positionAbs.top - this.lastPositionAbs.top;
          return 0 !== t && (t > 0 ? "down" : "up");
        },
        _getDragHorizontalDirection: function () {
          var t = this.positionAbs.left - this.lastPositionAbs.left;
          return 0 !== t && (t > 0 ? "right" : "left");
        },
        refresh: function (t) {
          return (
            this._refreshItems(t),
            this._setHandleClassName(),
            this.refreshPositions(),
            this
          );
        },
        _connectWith: function () {
          var t = this.options;
          return t.connectWith.constructor === String
            ? [t.connectWith]
            : t.connectWith;
        },
        _getItemsAsjQuery: function (e) {
          var n,
            i,
            o,
            r,
            s = [],
            a = [],
            l = this._connectWith();
          if (l && e)
            for (n = l.length - 1; n >= 0; n--)
              for (i = (o = t(l[n], this.document[0])).length - 1; i >= 0; i--)
                (r = t.data(o[i], this.widgetFullName)) &&
                  r !== this &&
                  !r.options.disabled &&
                  a.push([
                    t.isFunction(r.options.items)
                      ? r.options.items.call(r.element)
                      : t(r.options.items, r.element)
                          .not(".ui-sortable-helper")
                          .not(".ui-sortable-placeholder"),
                    r,
                  ]);
          function c() {
            s.push(this);
          }
          for (
            a.push([
              t.isFunction(this.options.items)
                ? this.options.items.call(this.element, null, {
                    options: this.options,
                    item: this.currentItem,
                  })
                : t(this.options.items, this.element)
                    .not(".ui-sortable-helper")
                    .not(".ui-sortable-placeholder"),
              this,
            ]),
              n = a.length - 1;
            n >= 0;
            n--
          )
            a[n][0].each(c);
          return t(s);
        },
        _removeCurrentsFromItems: function () {
          var e = this.currentItem.find(":data(" + this.widgetName + "-item)");
          this.items = t.grep(this.items, function (t) {
            for (var n = 0; n < e.length; n++)
              if (e[n] === t.item[0]) return !1;
            return !0;
          });
        },
        _refreshItems: function (e) {
          (this.items = []), (this.containers = [this]);
          var n,
            i,
            o,
            r,
            s,
            a,
            l,
            c,
            u = this.items,
            f = [
              [
                t.isFunction(this.options.items)
                  ? this.options.items.call(this.element[0], e, {
                      item: this.currentItem,
                    })
                  : t(this.options.items, this.element),
                this,
              ],
            ],
            h = this._connectWith();
          if (h && this.ready)
            for (n = h.length - 1; n >= 0; n--)
              for (i = (o = t(h[n], this.document[0])).length - 1; i >= 0; i--)
                (r = t.data(o[i], this.widgetFullName)) &&
                  r !== this &&
                  !r.options.disabled &&
                  (f.push([
                    t.isFunction(r.options.items)
                      ? r.options.items.call(r.element[0], e, {
                          item: this.currentItem,
                        })
                      : t(r.options.items, r.element),
                    r,
                  ]),
                  this.containers.push(r));
          for (n = f.length - 1; n >= 0; n--)
            for (s = f[n][1], i = 0, c = (a = f[n][0]).length; i < c; i++)
              (l = t(a[i])).data(this.widgetName + "-item", s),
                u.push({
                  item: l,
                  instance: s,
                  width: 0,
                  height: 0,
                  left: 0,
                  top: 0,
                });
        },
        refreshPositions: function (e) {
          var n, i, o, r;
          for (
            this.floating =
              !!this.items.length &&
              ("x" === this.options.axis ||
                this._isFloating(this.items[0].item)),
              this.offsetParent &&
                this.helper &&
                (this.offset.parent = this._getParentOffset()),
              n = this.items.length - 1;
            n >= 0;
            n--
          )
            ((i = this.items[n]).instance !== this.currentContainer &&
              this.currentContainer &&
              i.item[0] !== this.currentItem[0]) ||
              ((o = this.options.toleranceElement
                ? t(this.options.toleranceElement, i.item)
                : i.item),
              e || ((i.width = o.outerWidth()), (i.height = o.outerHeight())),
              (r = o.offset()),
              (i.left = r.left),
              (i.top = r.top));
          if (this.options.custom && this.options.custom.refreshContainers)
            this.options.custom.refreshContainers.call(this);
          else
            for (n = this.containers.length - 1; n >= 0; n--)
              (r = this.containers[n].element.offset()),
                (this.containers[n].containerCache.left = r.left),
                (this.containers[n].containerCache.top = r.top),
                (this.containers[n].containerCache.width =
                  this.containers[n].element.outerWidth()),
                (this.containers[n].containerCache.height =
                  this.containers[n].element.outerHeight());
          return this;
        },
        _createPlaceholder: function (e) {
          var n,
            i = (e = e || this).options;
          (i.placeholder && i.placeholder.constructor !== String) ||
            ((n = i.placeholder),
            (i.placeholder = {
              element: function () {
                var i = e.currentItem[0].nodeName.toLowerCase(),
                  o = t("<" + i + ">", e.document[0])
                    .addClass(
                      n ||
                        e.currentItem[0].className + " ui-sortable-placeholder"
                    )
                    .removeClass("ui-sortable-helper");
                return (
                  "tbody" === i
                    ? e._createTrPlaceholder(
                        e.currentItem.find("tr").eq(0),
                        t("<tr>", e.document[0]).appendTo(o)
                      )
                    : "tr" === i
                    ? e._createTrPlaceholder(e.currentItem, o)
                    : "img" === i && o.attr("src", e.currentItem.attr("src")),
                  n || o.css("visibility", "hidden"),
                  o
                );
              },
              update: function (t, o) {
                (n && !i.forcePlaceholderSize) ||
                  (o.height() ||
                    o.height(
                      e.currentItem.innerHeight() -
                        parseInt(e.currentItem.css("paddingTop") || 0, 10) -
                        parseInt(e.currentItem.css("paddingBottom") || 0, 10)
                    ),
                  o.width() ||
                    o.width(
                      e.currentItem.innerWidth() -
                        parseInt(e.currentItem.css("paddingLeft") || 0, 10) -
                        parseInt(e.currentItem.css("paddingRight") || 0, 10)
                    ));
              },
            })),
            (e.placeholder = t(
              i.placeholder.element.call(e.element, e.currentItem)
            )),
            e.currentItem.after(e.placeholder),
            i.placeholder.update(e, e.placeholder);
        },
        _createTrPlaceholder: function (e, n) {
          var i = this;
          e.children().each(function () {
            t("<td>&#160;</td>", i.document[0])
              .attr("colspan", t(this).attr("colspan") || 1)
              .appendTo(n);
          });
        },
        _contactContainers: function (e) {
          var n,
            i,
            o,
            r,
            s,
            a,
            l,
            c,
            u,
            f,
            h = null,
            d = null;
          for (n = this.containers.length - 1; n >= 0; n--)
            if (!t.contains(this.currentItem[0], this.containers[n].element[0]))
              if (this._intersectsWith(this.containers[n].containerCache)) {
                if (
                  h &&
                  t.contains(this.containers[n].element[0], h.element[0])
                )
                  continue;
                (h = this.containers[n]), (d = n);
              } else
                this.containers[n].containerCache.over &&
                  (this.containers[n]._trigger("out", e, this._uiHash(this)),
                  (this.containers[n].containerCache.over = 0));
          if (h)
            if (1 === this.containers.length)
              this.containers[d].containerCache.over ||
                (this.containers[d]._trigger("over", e, this._uiHash(this)),
                (this.containers[d].containerCache.over = 1));
            else {
              for (
                o = 1e4,
                  r = null,
                  s = (u = h.floating || this._isFloating(this.currentItem))
                    ? "left"
                    : "top",
                  a = u ? "width" : "height",
                  f = u ? "clientX" : "clientY",
                  i = this.items.length - 1;
                i >= 0;
                i--
              )
                t.contains(
                  this.containers[d].element[0],
                  this.items[i].item[0]
                ) &&
                  this.items[i].item[0] !== this.currentItem[0] &&
                  ((l = this.items[i].item.offset()[s]),
                  (c = !1),
                  e[f] - l > this.items[i][a] / 2 && (c = !0),
                  Math.abs(e[f] - l) < o &&
                    ((o = Math.abs(e[f] - l)),
                    (r = this.items[i]),
                    (this.direction = c ? "up" : "down")));
              if (!r && !this.options.dropOnEmpty) return;
              if (this.currentContainer === this.containers[d])
                return void (
                  this.currentContainer.containerCache.over ||
                  (this.containers[d]._trigger("over", e, this._uiHash()),
                  (this.currentContainer.containerCache.over = 1))
                );
              r
                ? this._rearrange(e, r, null, !0)
                : this._rearrange(e, null, this.containers[d].element, !0),
                this._trigger("change", e, this._uiHash()),
                this.containers[d]._trigger("change", e, this._uiHash(this)),
                (this.currentContainer = this.containers[d]),
                this.options.placeholder.update(
                  this.currentContainer,
                  this.placeholder
                ),
                this.containers[d]._trigger("over", e, this._uiHash(this)),
                (this.containers[d].containerCache.over = 1);
            }
        },
        _createHelper: function (e) {
          var n = this.options,
            i = t.isFunction(n.helper)
              ? t(n.helper.apply(this.element[0], [e, this.currentItem]))
              : "clone" === n.helper
              ? this.currentItem.clone()
              : this.currentItem;
          return (
            i.parents("body").length ||
              t(
                "parent" !== n.appendTo
                  ? n.appendTo
                  : this.currentItem[0].parentNode
              )[0].appendChild(i[0]),
            i[0] === this.currentItem[0] &&
              (this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left"),
              }),
            (i[0].style.width && !n.forceHelperSize) ||
              i.width(this.currentItem.width()),
            (i[0].style.height && !n.forceHelperSize) ||
              i.height(this.currentItem.height()),
            i
          );
        },
        _adjustOffsetFromHelper: function (e) {
          "string" == typeof e && (e = e.split(" ")),
            t.isArray(e) && (e = { left: +e[0], top: +e[1] || 0 }),
            "left" in e &&
              (this.offset.click.left = e.left + this.margins.left),
            "right" in e &&
              (this.offset.click.left =
                this.helperProportions.width - e.right + this.margins.left),
            "top" in e && (this.offset.click.top = e.top + this.margins.top),
            "bottom" in e &&
              (this.offset.click.top =
                this.helperProportions.height - e.bottom + this.margins.top);
        },
        _getParentOffset: function () {
          this.offsetParent = this.helper.offsetParent();
          var e = this.offsetParent.offset();
          return (
            "absolute" === this.cssPosition &&
              this.scrollParent[0] !== this.document[0] &&
              t.contains(this.scrollParent[0], this.offsetParent[0]) &&
              ((e.left += this.scrollParent.scrollLeft()),
              (e.top += this.scrollParent.scrollTop())),
            (this.offsetParent[0] === this.document[0].body ||
              (this.offsetParent[0].tagName &&
                "html" === this.offsetParent[0].tagName.toLowerCase() &&
                t.ui.ie)) &&
              (e = { top: 0, left: 0 }),
            {
              top:
                e.top +
                (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
              left:
                e.left +
                (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0),
            }
          );
        },
        _getRelativeOffset: function () {
          if ("relative" === this.cssPosition) {
            var t = this.currentItem.position();
            return {
              top:
                t.top -
                (parseInt(this.helper.css("top"), 10) || 0) +
                this.scrollParent.scrollTop(),
              left:
                t.left -
                (parseInt(this.helper.css("left"), 10) || 0) +
                this.scrollParent.scrollLeft(),
            };
          }
          return { top: 0, left: 0 };
        },
        _cacheMargins: function () {
          this.margins = {
            left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
            top: parseInt(this.currentItem.css("marginTop"), 10) || 0,
          };
        },
        _cacheHelperProportions: function () {
          this.helperProportions = {
            width: this.helper.outerWidth(),
            height: this.helper.outerHeight(),
          };
        },
        _setContainment: function () {
          var e,
            n,
            i,
            o = this.options;
          "parent" === o.containment &&
            (o.containment = this.helper[0].parentNode),
            ("document" !== o.containment && "window" !== o.containment) ||
              (this.containment = [
                0 - this.offset.relative.left - this.offset.parent.left,
                0 - this.offset.relative.top - this.offset.parent.top,
                "document" === o.containment
                  ? this.document.width()
                  : this.window.width() -
                    this.helperProportions.width -
                    this.margins.left,
                ("document" === o.containment
                  ? this.document.width()
                  : this.window.height() ||
                    this.document[0].body.parentNode.scrollHeight) -
                  this.helperProportions.height -
                  this.margins.top,
              ]),
            /^(document|window|parent)$/.test(o.containment) ||
              ((e = t(o.containment)[0]),
              (n = t(o.containment).offset()),
              (i = "hidden" !== t(e).css("overflow")),
              (this.containment = [
                n.left +
                  (parseInt(t(e).css("borderLeftWidth"), 10) || 0) +
                  (parseInt(t(e).css("paddingLeft"), 10) || 0) -
                  this.margins.left,
                n.top +
                  (parseInt(t(e).css("borderTopWidth"), 10) || 0) +
                  (parseInt(t(e).css("paddingTop"), 10) || 0) -
                  this.margins.top,
                n.left +
                  (i ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) -
                  (parseInt(t(e).css("borderLeftWidth"), 10) || 0) -
                  (parseInt(t(e).css("paddingRight"), 10) || 0) -
                  this.helperProportions.width -
                  this.margins.left,
                n.top +
                  (i
                    ? Math.max(e.scrollHeight, e.offsetHeight)
                    : e.offsetHeight) -
                  (parseInt(t(e).css("borderTopWidth"), 10) || 0) -
                  (parseInt(t(e).css("paddingBottom"), 10) || 0) -
                  this.helperProportions.height -
                  this.margins.top,
              ]));
        },
        _convertPositionTo: function (e, n) {
          n || (n = this.position);
          var i = "absolute" === e ? 1 : -1,
            o =
              "absolute" !== this.cssPosition ||
              (this.scrollParent[0] !== this.document[0] &&
                t.contains(this.scrollParent[0], this.offsetParent[0]))
                ? this.scrollParent
                : this.offsetParent,
            r = /(html|body)/i.test(o[0].tagName);
          return {
            top:
              n.top +
              this.offset.relative.top * i +
              this.offset.parent.top * i -
              ("fixed" === this.cssPosition
                ? -this.scrollParent.scrollTop()
                : r
                ? 0
                : o.scrollTop()) *
                i,
            left:
              n.left +
              this.offset.relative.left * i +
              this.offset.parent.left * i -
              ("fixed" === this.cssPosition
                ? -this.scrollParent.scrollLeft()
                : r
                ? 0
                : o.scrollLeft()) *
                i,
          };
        },
        _generatePosition: function (e) {
          var n,
            i,
            o = this.options,
            r = e.pageX,
            s = e.pageY,
            a =
              "absolute" !== this.cssPosition ||
              (this.scrollParent[0] !== this.document[0] &&
                t.contains(this.scrollParent[0], this.offsetParent[0]))
                ? this.scrollParent
                : this.offsetParent,
            l = /(html|body)/i.test(a[0].tagName);
          return (
            "relative" !== this.cssPosition ||
              (this.scrollParent[0] !== this.document[0] &&
                this.scrollParent[0] !== this.offsetParent[0]) ||
              (this.offset.relative = this._getRelativeOffset()),
            this.originalPosition &&
              (this.containment &&
                (e.pageX - this.offset.click.left < this.containment[0] &&
                  (r = this.containment[0] + this.offset.click.left),
                e.pageY - this.offset.click.top < this.containment[1] &&
                  (s = this.containment[1] + this.offset.click.top),
                e.pageX - this.offset.click.left > this.containment[2] &&
                  (r = this.containment[2] + this.offset.click.left),
                e.pageY - this.offset.click.top > this.containment[3] &&
                  (s = this.containment[3] + this.offset.click.top)),
              o.grid &&
                ((n =
                  this.originalPageY +
                  Math.round((s - this.originalPageY) / o.grid[1]) * o.grid[1]),
                (s = this.containment
                  ? n - this.offset.click.top >= this.containment[1] &&
                    n - this.offset.click.top <= this.containment[3]
                    ? n
                    : n - this.offset.click.top >= this.containment[1]
                    ? n - o.grid[1]
                    : n + o.grid[1]
                  : n),
                (i =
                  this.originalPageX +
                  Math.round((r - this.originalPageX) / o.grid[0]) * o.grid[0]),
                (r = this.containment
                  ? i - this.offset.click.left >= this.containment[0] &&
                    i - this.offset.click.left <= this.containment[2]
                    ? i
                    : i - this.offset.click.left >= this.containment[0]
                    ? i - o.grid[0]
                    : i + o.grid[0]
                  : i))),
            {
              top:
                s -
                this.offset.click.top -
                this.offset.relative.top -
                this.offset.parent.top +
                ("fixed" === this.cssPosition
                  ? -this.scrollParent.scrollTop()
                  : l
                  ? 0
                  : a.scrollTop()),
              left:
                r -
                this.offset.click.left -
                this.offset.relative.left -
                this.offset.parent.left +
                ("fixed" === this.cssPosition
                  ? -this.scrollParent.scrollLeft()
                  : l
                  ? 0
                  : a.scrollLeft()),
            }
          );
        },
        _rearrange: function (t, e, n, i) {
          n
            ? n[0].appendChild(this.placeholder[0])
            : e.item[0].parentNode.insertBefore(
                this.placeholder[0],
                "down" === this.direction ? e.item[0] : e.item[0].nextSibling
              ),
            (this.counter = this.counter ? ++this.counter : 1);
          var o = this.counter;
          this._delay(function () {
            o === this.counter && this.refreshPositions(!i);
          });
        },
        _clear: function (t, e) {
          this.reverting = !1;
          var n,
            i = [];
          if (
            (!this._noFinalSort &&
              this.currentItem.parent().length &&
              this.placeholder.before(this.currentItem),
            (this._noFinalSort = null),
            this.helper[0] === this.currentItem[0])
          ) {
            for (n in this._storedCSS)
              ("auto" !== this._storedCSS[n] &&
                "static" !== this._storedCSS[n]) ||
                (this._storedCSS[n] = "");
            this.currentItem
              .css(this._storedCSS)
              .removeClass("ui-sortable-helper");
          } else this.currentItem.show();
          function o(t, e, n) {
            return function (i) {
              n._trigger(t, i, e._uiHash(e));
            };
          }
          for (
            this.fromOutside &&
              !e &&
              i.push(function (t) {
                this._trigger("receive", t, this._uiHash(this.fromOutside));
              }),
              (!this.fromOutside &&
                this.domPosition.prev ===
                  this.currentItem.prev().not(".ui-sortable-helper")[0] &&
                this.domPosition.parent === this.currentItem.parent()[0]) ||
                e ||
                i.push(function (t) {
                  this._trigger("update", t, this._uiHash());
                }),
              this !== this.currentContainer &&
                (e ||
                  (i.push(function (t) {
                    this._trigger("remove", t, this._uiHash());
                  }),
                  i.push(
                    function (t) {
                      return function (e) {
                        t._trigger("receive", e, this._uiHash(this));
                      };
                    }.call(this, this.currentContainer)
                  ),
                  i.push(
                    function (t) {
                      return function (e) {
                        t._trigger("update", e, this._uiHash(this));
                      };
                    }.call(this, this.currentContainer)
                  ))),
              n = this.containers.length - 1;
            n >= 0;
            n--
          )
            e || i.push(o("deactivate", this, this.containers[n])),
              this.containers[n].containerCache.over &&
                (i.push(o("out", this, this.containers[n])),
                (this.containers[n].containerCache.over = 0));
          if (
            (this.storedCursor &&
              (this.document.find("body").css("cursor", this.storedCursor),
              this.storedStylesheet.remove()),
            this._storedOpacity &&
              this.helper.css("opacity", this._storedOpacity),
            this._storedZIndex &&
              this.helper.css(
                "zIndex",
                "auto" === this._storedZIndex ? "" : this._storedZIndex
              ),
            (this.dragging = !1),
            e || this._trigger("beforeStop", t, this._uiHash()),
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
            this.cancelHelperRemoval ||
              (this.helper[0] !== this.currentItem[0] && this.helper.remove(),
              (this.helper = null)),
            !e)
          ) {
            for (n = 0; n < i.length; n++) i[n].call(this, t);
            this._trigger("stop", t, this._uiHash());
          }
          return (this.fromOutside = !1), !this.cancelHelperRemoval;
        },
        _trigger: function () {
          !1 === t.Widget.prototype._trigger.apply(this, arguments) &&
            this.cancel();
        },
        _uiHash: function (e) {
          var n = e || this;
          return {
            helper: n.helper,
            placeholder: n.placeholder || t([]),
            position: n.position,
            originalPosition: n.originalPosition,
            offset: n.positionAbs,
            item: n.currentItem,
            sender: e ? e.element : null,
          };
        },
      });
    /*!
     * jQuery UI Sortable 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/sortable/
     */
    var u,
      f = "ui-effects-",
      h = t;
    (t.effects = { effect: {} }),
      /*!
       * jQuery Color Animations v2.1.2
       * https://github.com/jquery/jquery-color
       *
       * Copyright 2014 jQuery Foundation and other contributors
       * Released under the MIT license.
       * http://jquery.org/license
       *
       * Date: Wed Jan 16 08:47:09 2013 -0600
       */
      (function (t, e) {
        var n,
          i = /^([\-+])=\s*(\d+\.?\d*)/,
          o = [
            {
              re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
              parse: function (t) {
                return [t[1], t[2], t[3], t[4]];
              },
            },
            {
              re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
              parse: function (t) {
                return [2.55 * t[1], 2.55 * t[2], 2.55 * t[3], t[4]];
              },
            },
            {
              re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
              parse: function (t) {
                return [
                  parseInt(t[1], 16),
                  parseInt(t[2], 16),
                  parseInt(t[3], 16),
                ];
              },
            },
            {
              re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
              parse: function (t) {
                return [
                  parseInt(t[1] + t[1], 16),
                  parseInt(t[2] + t[2], 16),
                  parseInt(t[3] + t[3], 16),
                ];
              },
            },
            {
              re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
              space: "hsla",
              parse: function (t) {
                return [t[1], t[2] / 100, t[3] / 100, t[4]];
              },
            },
          ],
          r = (t.Color = function (e, n, i, o) {
            return new t.Color.fn.parse(e, n, i, o);
          }),
          s = {
            rgba: {
              props: {
                red: { idx: 0, type: "byte" },
                green: { idx: 1, type: "byte" },
                blue: { idx: 2, type: "byte" },
              },
            },
            hsla: {
              props: {
                hue: { idx: 0, type: "degrees" },
                saturation: { idx: 1, type: "percent" },
                lightness: { idx: 2, type: "percent" },
              },
            },
          },
          a = {
            byte: { floor: !0, max: 255 },
            percent: { max: 1 },
            degrees: { mod: 360, floor: !0 },
          },
          l = (r.support = {}),
          c = t("<p>")[0],
          u = t.each;
        function f(t, e, n) {
          var i = a[e.type] || {};
          return null == t
            ? n || !e.def
              ? null
              : e.def
            : ((t = i.floor ? ~~t : parseFloat(t)),
              isNaN(t)
                ? e.def
                : i.mod
                ? (t + i.mod) % i.mod
                : 0 > t
                ? 0
                : i.max < t
                ? i.max
                : t);
        }
        function h(e) {
          var i = r(),
            a = (i._rgba = []);
          return (
            (e = e.toLowerCase()),
            u(o, function (t, n) {
              var o,
                r = n.re.exec(e),
                l = r && n.parse(r),
                c = n.space || "rgba";
              if (l)
                return (
                  (o = i[c](l)),
                  (i[s[c].cache] = o[s[c].cache]),
                  (a = i._rgba = o._rgba),
                  !1
                );
            }),
            a.length
              ? ("0,0,0,0" === a.join() && t.extend(a, n.transparent), i)
              : n[e]
          );
        }
        function d(t, e, n) {
          return 6 * (n = (n + 1) % 1) < 1
            ? t + (e - t) * n * 6
            : 2 * n < 1
            ? e
            : 3 * n < 2
            ? t + (e - t) * (2 / 3 - n) * 6
            : t;
        }
        (c.style.cssText = "background-color:rgba(1,1,1,.5)"),
          (l.rgba = c.style.backgroundColor.indexOf("rgba") > -1),
          u(s, function (t, e) {
            (e.cache = "_" + t),
              (e.props.alpha = { idx: 3, type: "percent", def: 1 });
          }),
          (r.fn = t.extend(r.prototype, {
            parse: function (i, o, a, l) {
              if (i === e) return (this._rgba = [null, null, null, null]), this;
              (i.jquery || i.nodeType) && ((i = t(i).css(o)), (o = e));
              var c = this,
                d = t.type(i),
                p = (this._rgba = []);
              return (
                o !== e && ((i = [i, o, a, l]), (d = "array")),
                "string" === d
                  ? this.parse(h(i) || n._default)
                  : "array" === d
                  ? (u(s.rgba.props, function (t, e) {
                      p[e.idx] = f(i[e.idx], e);
                    }),
                    this)
                  : "object" === d
                  ? (u(
                      s,
                      i instanceof r
                        ? function (t, e) {
                            i[e.cache] && (c[e.cache] = i[e.cache].slice());
                          }
                        : function (e, n) {
                            var o = n.cache;
                            u(n.props, function (t, e) {
                              if (!c[o] && n.to) {
                                if ("alpha" === t || null == i[t]) return;
                                c[o] = n.to(c._rgba);
                              }
                              c[o][e.idx] = f(i[t], e, !0);
                            }),
                              c[o] &&
                                t.inArray(null, c[o].slice(0, 3)) < 0 &&
                                ((c[o][3] = 1),
                                n.from && (c._rgba = n.from(c[o])));
                          }
                    ),
                    this)
                  : void 0
              );
            },
            is: function (t) {
              var e = r(t),
                n = !0,
                i = this;
              return (
                u(s, function (t, o) {
                  var r,
                    s = e[o.cache];
                  return (
                    s &&
                      ((r = i[o.cache] || (o.to && o.to(i._rgba)) || []),
                      u(o.props, function (t, e) {
                        if (null != s[e.idx])
                          return (n = s[e.idx] === r[e.idx]);
                      })),
                    n
                  );
                }),
                n
              );
            },
            _space: function () {
              var t = [],
                e = this;
              return (
                u(s, function (n, i) {
                  e[i.cache] && t.push(n);
                }),
                t.pop()
              );
            },
            transition: function (t, e) {
              var n = r(t),
                i = n._space(),
                o = s[i],
                l = 0 === this.alpha() ? r("transparent") : this,
                c = l[o.cache] || o.to(l._rgba),
                h = c.slice();
              return (
                (n = n[o.cache]),
                u(o.props, function (t, i) {
                  var o = i.idx,
                    r = c[o],
                    s = n[o],
                    l = a[i.type] || {};
                  null !== s &&
                    (null === r
                      ? (h[o] = s)
                      : (l.mod &&
                          (s - r > l.mod / 2
                            ? (r += l.mod)
                            : r - s > l.mod / 2 && (r -= l.mod)),
                        (h[o] = f((s - r) * e + r, i))));
                }),
                this[i](h)
              );
            },
            blend: function (e) {
              if (1 === this._rgba[3]) return this;
              var n = this._rgba.slice(),
                i = n.pop(),
                o = r(e)._rgba;
              return r(
                t.map(n, function (t, e) {
                  return (1 - i) * o[e] + i * t;
                })
              );
            },
            toRgbaString: function () {
              var e = "rgba(",
                n = t.map(this._rgba, function (t, e) {
                  return null == t ? (e > 2 ? 1 : 0) : t;
                });
              return 1 === n[3] && (n.pop(), (e = "rgb(")), e + n.join() + ")";
            },
            toHslaString: function () {
              var e = "hsla(",
                n = t.map(this.hsla(), function (t, e) {
                  return (
                    null == t && (t = e > 2 ? 1 : 0),
                    e && e < 3 && (t = Math.round(100 * t) + "%"),
                    t
                  );
                });
              return 1 === n[3] && (n.pop(), (e = "hsl(")), e + n.join() + ")";
            },
            toHexString: function (e) {
              var n = this._rgba.slice(),
                i = n.pop();
              return (
                e && n.push(~~(255 * i)),
                "#" +
                  t
                    .map(n, function (t) {
                      return 1 === (t = (t || 0).toString(16)).length
                        ? "0" + t
                        : t;
                    })
                    .join("")
              );
            },
            toString: function () {
              return 0 === this._rgba[3] ? "transparent" : this.toRgbaString();
            },
          })),
          (r.fn.parse.prototype = r.fn),
          (s.hsla.to = function (t) {
            if (null == t[0] || null == t[1] || null == t[2])
              return [null, null, null, t[3]];
            var e,
              n,
              i = t[0] / 255,
              o = t[1] / 255,
              r = t[2] / 255,
              s = t[3],
              a = Math.max(i, o, r),
              l = Math.min(i, o, r),
              c = a - l,
              u = a + l,
              f = 0.5 * u;
            return (
              (e =
                l === a
                  ? 0
                  : i === a
                  ? (60 * (o - r)) / c + 360
                  : o === a
                  ? (60 * (r - i)) / c + 120
                  : (60 * (i - o)) / c + 240),
              (n = 0 === c ? 0 : f <= 0.5 ? c / u : c / (2 - u)),
              [Math.round(e) % 360, n, f, null == s ? 1 : s]
            );
          }),
          (s.hsla.from = function (t) {
            if (null == t[0] || null == t[1] || null == t[2])
              return [null, null, null, t[3]];
            var e = t[0] / 360,
              n = t[1],
              i = t[2],
              o = t[3],
              r = i <= 0.5 ? i * (1 + n) : i + n - i * n,
              s = 2 * i - r;
            return [
              Math.round(255 * d(s, r, e + 1 / 3)),
              Math.round(255 * d(s, r, e)),
              Math.round(255 * d(s, r, e - 1 / 3)),
              o,
            ];
          }),
          u(s, function (n, o) {
            var s = o.props,
              a = o.cache,
              l = o.to,
              c = o.from;
            (r.fn[n] = function (n) {
              if ((l && !this[a] && (this[a] = l(this._rgba)), n === e))
                return this[a].slice();
              var i,
                o = t.type(n),
                h = "array" === o || "object" === o ? n : arguments,
                d = this[a].slice();
              return (
                u(s, function (t, e) {
                  var n = h["object" === o ? t : e.idx];
                  null == n && (n = d[e.idx]), (d[e.idx] = f(n, e));
                }),
                c ? (((i = r(c(d)))[a] = d), i) : r(d)
              );
            }),
              u(s, function (e, o) {
                r.fn[e] ||
                  (r.fn[e] = function (r) {
                    var s,
                      a = t.type(r),
                      l = "alpha" === e ? (this._hsla ? "hsla" : "rgba") : n,
                      c = this[l](),
                      u = c[o.idx];
                    return "undefined" === a
                      ? u
                      : ("function" === a &&
                          ((r = r.call(this, u)), (a = t.type(r))),
                        null == r && o.empty
                          ? this
                          : ("string" === a &&
                              (s = i.exec(r)) &&
                              (r =
                                u + parseFloat(s[2]) * ("+" === s[1] ? 1 : -1)),
                            (c[o.idx] = r),
                            this[l](c)));
                  });
              });
          }),
          (r.hook = function (e) {
            var n = e.split(" ");
            u(n, function (e, n) {
              (t.cssHooks[n] = {
                set: function (e, i) {
                  var o,
                    s,
                    a = "";
                  if (
                    "transparent" !== i &&
                    ("string" !== t.type(i) || (o = h(i)))
                  ) {
                    if (((i = r(o || i)), !l.rgba && 1 !== i._rgba[3])) {
                      for (
                        s = "backgroundColor" === n ? e.parentNode : e;
                        ("" === a || "transparent" === a) && s && s.style;

                      )
                        try {
                          (a = t.css(s, "backgroundColor")), (s = s.parentNode);
                        } catch (t) {}
                      i = i.blend(a && "transparent" !== a ? a : "_default");
                    }
                    i = i.toRgbaString();
                  }
                  try {
                    e.style[n] = i;
                  } catch (t) {}
                },
              }),
                (t.fx.step[n] = function (e) {
                  e.colorInit ||
                    ((e.start = r(e.elem, n)),
                    (e.end = r(e.end)),
                    (e.colorInit = !0)),
                    t.cssHooks[n].set(e.elem, e.start.transition(e.end, e.pos));
                });
            });
          }),
          r.hook(
            "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor"
          ),
          (t.cssHooks.borderColor = {
            expand: function (t) {
              var e = {};
              return (
                u(["Top", "Right", "Bottom", "Left"], function (n, i) {
                  e["border" + i + "Color"] = t;
                }),
                e
              );
            },
          }),
          (n = t.Color.names =
            {
              aqua: "#00ffff",
              black: "#000000",
              blue: "#0000ff",
              fuchsia: "#ff00ff",
              gray: "#808080",
              green: "#008000",
              lime: "#00ff00",
              maroon: "#800000",
              navy: "#000080",
              olive: "#808000",
              purple: "#800080",
              red: "#ff0000",
              silver: "#c0c0c0",
              teal: "#008080",
              white: "#ffffff",
              yellow: "#ffff00",
              transparent: [null, null, null, 0],
              _default: "#ffffff",
            });
      })(h),
      (function () {
        var e = ["add", "remove", "toggle"],
          n = {
            border: 1,
            borderBottom: 1,
            borderColor: 1,
            borderLeft: 1,
            borderRight: 1,
            borderTop: 1,
            borderWidth: 1,
            margin: 1,
            padding: 1,
          };
        function i(e) {
          var n,
            i,
            o = e.ownerDocument.defaultView
              ? e.ownerDocument.defaultView.getComputedStyle(e, null)
              : e.currentStyle,
            r = {};
          if (o && o.length && o[0] && o[o[0]])
            for (i = o.length; i--; )
              "string" == typeof o[(n = o[i])] && (r[t.camelCase(n)] = o[n]);
          else for (n in o) "string" == typeof o[n] && (r[n] = o[n]);
          return r;
        }
        t.each(
          [
            "borderLeftStyle",
            "borderRightStyle",
            "borderBottomStyle",
            "borderTopStyle",
          ],
          function (e, n) {
            t.fx.step[n] = function (t) {
              (("none" !== t.end && !t.setAttr) ||
                (1 === t.pos && !t.setAttr)) &&
                (h.style(t.elem, n, t.end), (t.setAttr = !0));
            };
          }
        ),
          t.fn.addBack ||
            (t.fn.addBack = function (t) {
              return this.add(
                null == t ? this.prevObject : this.prevObject.filter(t)
              );
            }),
          (t.effects.animateClass = function (o, r, s, a) {
            var l = t.speed(r, s, a);
            return this.queue(function () {
              var r,
                s = t(this),
                a = s.attr("class") || "",
                c = l.children ? s.find("*").addBack() : s;
              (c = c.map(function () {
                return { el: t(this), start: i(this) };
              })),
                (r = function () {
                  t.each(e, function (t, e) {
                    o[e] && s[e + "Class"](o[e]);
                  });
                })(),
                (c = c.map(function () {
                  return (
                    (this.end = i(this.el[0])),
                    (this.diff = (function (e, i) {
                      var o,
                        r,
                        s = {};
                      for (o in i)
                        (r = i[o]),
                          e[o] !== r &&
                            (n[o] ||
                              (!t.fx.step[o] && isNaN(parseFloat(r))) ||
                              (s[o] = r));
                      return s;
                    })(this.start, this.end)),
                    this
                  );
                })),
                s.attr("class", a),
                (c = c.map(function () {
                  var e = this,
                    n = t.Deferred(),
                    i = t.extend({}, l, {
                      queue: !1,
                      complete: function () {
                        n.resolve(e);
                      },
                    });
                  return this.el.animate(this.diff, i), n.promise();
                })),
                t.when.apply(t, c.get()).done(function () {
                  r(),
                    t.each(arguments, function () {
                      var e = this.el;
                      t.each(this.diff, function (t) {
                        e.css(t, "");
                      });
                    }),
                    l.complete.call(s[0]);
                });
            });
          }),
          t.fn.extend({
            addClass: (function (e) {
              return function (n, i, o, r) {
                return i
                  ? t.effects.animateClass.call(this, { add: n }, i, o, r)
                  : e.apply(this, arguments);
              };
            })(t.fn.addClass),
            removeClass: (function (e) {
              return function (n, i, o, r) {
                return arguments.length > 1
                  ? t.effects.animateClass.call(this, { remove: n }, i, o, r)
                  : e.apply(this, arguments);
              };
            })(t.fn.removeClass),
            toggleClass: (function (e) {
              return function (n, i, o, r, s) {
                return "boolean" == typeof i || void 0 === i
                  ? o
                    ? t.effects.animateClass.call(
                        this,
                        i ? { add: n } : { remove: n },
                        o,
                        r,
                        s
                      )
                    : e.apply(this, arguments)
                  : t.effects.animateClass.call(this, { toggle: n }, i, o, r);
              };
            })(t.fn.toggleClass),
            switchClass: function (e, n, i, o, r) {
              return t.effects.animateClass.call(
                this,
                { add: n, remove: e },
                i,
                o,
                r
              );
            },
          });
      })(),
      (function () {
        function e(e, n, i, o) {
          return (
            t.isPlainObject(e) && ((n = e), (e = e.effect)),
            (e = { effect: e }),
            null == n && (n = {}),
            t.isFunction(n) && ((o = n), (i = null), (n = {})),
            ("number" == typeof n || t.fx.speeds[n]) &&
              ((o = i), (i = n), (n = {})),
            t.isFunction(i) && ((o = i), (i = null)),
            n && t.extend(e, n),
            (i = i || n.duration),
            (e.duration = t.fx.off
              ? 0
              : "number" == typeof i
              ? i
              : i in t.fx.speeds
              ? t.fx.speeds[i]
              : t.fx.speeds._default),
            (e.complete = o || n.complete),
            e
          );
        }
        function n(e) {
          return (
            !(e && "number" != typeof e && !t.fx.speeds[e]) ||
            ("string" == typeof e && !t.effects.effect[e]) ||
            !!t.isFunction(e) ||
            ("object" == typeof e && !e.effect)
          );
        }
        t.extend(t.effects, {
          version: "1.11.4",
          save: function (t, e) {
            for (var n = 0; n < e.length; n++)
              null !== e[n] && t.data(f + e[n], t[0].style[e[n]]);
          },
          restore: function (t, e) {
            var n, i;
            for (i = 0; i < e.length; i++)
              null !== e[i] &&
                (void 0 === (n = t.data(f + e[i])) && (n = ""), t.css(e[i], n));
          },
          setMode: function (t, e) {
            return "toggle" === e && (e = t.is(":hidden") ? "show" : "hide"), e;
          },
          getBaseline: function (t, e) {
            var n, i;
            switch (t[0]) {
              case "top":
                n = 0;
                break;
              case "middle":
                n = 0.5;
                break;
              case "bottom":
                n = 1;
                break;
              default:
                n = t[0] / e.height;
            }
            switch (t[1]) {
              case "left":
                i = 0;
                break;
              case "center":
                i = 0.5;
                break;
              case "right":
                i = 1;
                break;
              default:
                i = t[1] / e.width;
            }
            return { x: i, y: n };
          },
          createWrapper: function (e) {
            if (e.parent().is(".ui-effects-wrapper")) return e.parent();
            var n = {
                width: e.outerWidth(!0),
                height: e.outerHeight(!0),
                float: e.css("float"),
              },
              i = t("<div></div>").addClass("ui-effects-wrapper").css({
                fontSize: "100%",
                background: "transparent",
                border: "none",
                margin: 0,
                padding: 0,
              }),
              o = { width: e.width(), height: e.height() },
              r = document.activeElement;
            try {
              r.id;
            } catch (t) {
              r = document.body;
            }
            return (
              e.wrap(i),
              (e[0] === r || t.contains(e[0], r)) && t(r).focus(),
              (i = e.parent()),
              "static" === e.css("position")
                ? (i.css({ position: "relative" }),
                  e.css({ position: "relative" }))
                : (t.extend(n, {
                    position: e.css("position"),
                    zIndex: e.css("z-index"),
                  }),
                  t.each(["top", "left", "bottom", "right"], function (t, i) {
                    (n[i] = e.css(i)),
                      isNaN(parseInt(n[i], 10)) && (n[i] = "auto");
                  }),
                  e.css({
                    position: "relative",
                    top: 0,
                    left: 0,
                    right: "auto",
                    bottom: "auto",
                  })),
              e.css(o),
              i.css(n).show()
            );
          },
          removeWrapper: function (e) {
            var n = document.activeElement;
            return (
              e.parent().is(".ui-effects-wrapper") &&
                (e.parent().replaceWith(e),
                (e[0] === n || t.contains(e[0], n)) && t(n).focus()),
              e
            );
          },
          setTransition: function (e, n, i, o) {
            return (
              (o = o || {}),
              t.each(n, function (t, n) {
                var r = e.cssUnit(n);
                r[0] > 0 && (o[n] = r[0] * i + r[1]);
              }),
              o
            );
          },
        }),
          t.fn.extend({
            effect: function () {
              var n = e.apply(this, arguments),
                i = n.mode,
                o = n.queue,
                r = t.effects.effect[n.effect];
              if (t.fx.off || !r)
                return i
                  ? this[i](n.duration, n.complete)
                  : this.each(function () {
                      n.complete && n.complete.call(this);
                    });
              function s(e) {
                var i = t(this),
                  o = n.complete,
                  s = n.mode;
                function a() {
                  t.isFunction(o) && o.call(i[0]), t.isFunction(e) && e();
                }
                (i.is(":hidden") ? "hide" === s : "show" === s)
                  ? (i[s](), a())
                  : r.call(i[0], n, a);
              }
              return !1 === o ? this.each(s) : this.queue(o || "fx", s);
            },
            show: (function (t) {
              return function (i) {
                if (n(i)) return t.apply(this, arguments);
                var o = e.apply(this, arguments);
                return (o.mode = "show"), this.effect.call(this, o);
              };
            })(t.fn.show),
            hide: (function (t) {
              return function (i) {
                if (n(i)) return t.apply(this, arguments);
                var o = e.apply(this, arguments);
                return (o.mode = "hide"), this.effect.call(this, o);
              };
            })(t.fn.hide),
            toggle: (function (t) {
              return function (i) {
                if (n(i) || "boolean" == typeof i)
                  return t.apply(this, arguments);
                var o = e.apply(this, arguments);
                return (o.mode = "toggle"), this.effect.call(this, o);
              };
            })(t.fn.toggle),
            cssUnit: function (e) {
              var n = this.css(e),
                i = [];
              return (
                t.each(["em", "px", "%", "pt"], function (t, e) {
                  n.indexOf(e) > 0 && (i = [parseFloat(n), e]);
                }),
                i
              );
            },
          });
      })(),
      (u = {}),
      t.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (t, e) {
        u[e] = function (e) {
          return Math.pow(e, t + 2);
        };
      }),
      t.extend(u, {
        Sine: function (t) {
          return 1 - Math.cos((t * Math.PI) / 2);
        },
        Circ: function (t) {
          return 1 - Math.sqrt(1 - t * t);
        },
        Elastic: function (t) {
          return 0 === t || 1 === t
            ? t
            : -Math.pow(2, 8 * (t - 1)) *
                Math.sin(((80 * (t - 1) - 7.5) * Math.PI) / 15);
        },
        Back: function (t) {
          return t * t * (3 * t - 2);
        },
        Bounce: function (t) {
          for (var e, n = 4; t < ((e = Math.pow(2, --n)) - 1) / 11; );
          return (
            1 / Math.pow(4, 3 - n) - 7.5625 * Math.pow((3 * e - 2) / 22 - t, 2)
          );
        },
      }),
      t.each(u, function (e, n) {
        (t.easing["easeIn" + e] = n),
          (t.easing["easeOut" + e] = function (t) {
            return 1 - n(1 - t);
          }),
          (t.easing["easeInOut" + e] = function (t) {
            return t < 0.5 ? n(2 * t) / 2 : 1 - n(-2 * t + 2) / 2;
          });
      });
    t.effects;
    /*!
     * jQuery UI Effects Slide 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/slide-effect/
     */
  }),
  /**!
   * @fileOverview Kickass library to create and place poppers near their reference elements.
   * @version 1.16.1
   * @license
   * Copyright (c) 2016 Federico Zivolo and contributors
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */
  (function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = e())
      : "function" == typeof define && define.amd
      ? define(e)
      : (t.Popper = e());
  })(this, function () {
    "use strict";
    var t =
        "undefined" != typeof window &&
        "undefined" != typeof document &&
        "undefined" != typeof navigator,
      e = (function () {
        for (
          var e = ["Edge", "Trident", "Firefox"], n = 0;
          n < e.length;
          n += 1
        )
          if (t && navigator.userAgent.indexOf(e[n]) >= 0) return 1;
        return 0;
      })();
    var n =
      t && window.Promise
        ? function (t) {
            var e = !1;
            return function () {
              e ||
                ((e = !0),
                window.Promise.resolve().then(function () {
                  (e = !1), t();
                }));
            };
          }
        : function (t) {
            var n = !1;
            return function () {
              n ||
                ((n = !0),
                setTimeout(function () {
                  (n = !1), t();
                }, e));
            };
          };
    function i(t) {
      return t && "[object Function]" === {}.toString.call(t);
    }
    function o(t, e) {
      if (1 !== t.nodeType) return [];
      var n = t.ownerDocument.defaultView.getComputedStyle(t, null);
      return e ? n[e] : n;
    }
    function r(t) {
      return "HTML" === t.nodeName ? t : t.parentNode || t.host;
    }
    function s(t) {
      if (!t) return document.body;
      switch (t.nodeName) {
        case "HTML":
        case "BODY":
          return t.ownerDocument.body;
        case "#document":
          return t.body;
      }
      var e = o(t),
        n = e.overflow,
        i = e.overflowX,
        a = e.overflowY;
      return /(auto|scroll|overlay)/.test(n + a + i) ? t : s(r(t));
    }
    function a(t) {
      return t && t.referenceNode ? t.referenceNode : t;
    }
    var l = t && !(!window.MSInputMethodContext || !document.documentMode),
      c = t && /MSIE 10/.test(navigator.userAgent);
    function u(t) {
      return 11 === t ? l : 10 === t ? c : l || c;
    }
    function f(t) {
      if (!t) return document.documentElement;
      for (
        var e = u(10) ? document.body : null, n = t.offsetParent || null;
        n === e && t.nextElementSibling;

      )
        n = (t = t.nextElementSibling).offsetParent;
      var i = n && n.nodeName;
      return i && "BODY" !== i && "HTML" !== i
        ? -1 !== ["TH", "TD", "TABLE"].indexOf(n.nodeName) &&
          "static" === o(n, "position")
          ? f(n)
          : n
        : t
        ? t.ownerDocument.documentElement
        : document.documentElement;
    }
    function h(t) {
      return null !== t.parentNode ? h(t.parentNode) : t;
    }
    function d(t, e) {
      if (!(t && t.nodeType && e && e.nodeType))
        return document.documentElement;
      var n = t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING,
        i = n ? t : e,
        o = n ? e : t,
        r = document.createRange();
      r.setStart(i, 0), r.setEnd(o, 0);
      var s,
        a,
        l = r.commonAncestorContainer;
      if ((t !== l && e !== l) || i.contains(o))
        return "BODY" === (a = (s = l).nodeName) ||
          ("HTML" !== a && f(s.firstElementChild) !== s)
          ? f(l)
          : l;
      var c = h(t);
      return c.host ? d(c.host, e) : d(t, h(e).host);
    }
    function p(t) {
      var e =
          "top" ===
          (arguments.length > 1 && void 0 !== arguments[1]
            ? arguments[1]
            : "top")
            ? "scrollTop"
            : "scrollLeft",
        n = t.nodeName;
      if ("BODY" === n || "HTML" === n) {
        var i = t.ownerDocument.documentElement;
        return (t.ownerDocument.scrollingElement || i)[e];
      }
      return t[e];
    }
    function g(t, e) {
      var n = "x" === e ? "Left" : "Top",
        i = "Left" === n ? "Right" : "Bottom";
      return (
        parseFloat(t["border" + n + "Width"]) +
        parseFloat(t["border" + i + "Width"])
      );
    }
    function m(t, e, n, i) {
      return Math.max(
        e["offset" + t],
        e["scroll" + t],
        n["client" + t],
        n["offset" + t],
        n["scroll" + t],
        u(10)
          ? parseInt(n["offset" + t]) +
              parseInt(i["margin" + ("Height" === t ? "Top" : "Left")]) +
              parseInt(i["margin" + ("Height" === t ? "Bottom" : "Right")])
          : 0
      );
    }
    function v(t) {
      var e = t.body,
        n = t.documentElement,
        i = u(10) && getComputedStyle(n);
      return { height: m("Height", e, n, i), width: m("Width", e, n, i) };
    }
    var b = (function () {
        function t(t, e) {
          for (var n = 0; n < e.length; n++) {
            var i = e[n];
            (i.enumerable = i.enumerable || !1),
              (i.configurable = !0),
              "value" in i && (i.writable = !0),
              Object.defineProperty(t, i.key, i);
          }
        }
        return function (e, n, i) {
          return n && t(e.prototype, n), i && t(e, i), e;
        };
      })(),
      y = function (t, e, n) {
        return (
          e in t
            ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[e] = n),
          t
        );
      },
      _ =
        Object.assign ||
        function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var i in n)
              Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
          }
          return t;
        };
    function w(t) {
      return _({}, t, { right: t.left + t.width, bottom: t.top + t.height });
    }
    function x(t) {
      var e = {};
      try {
        if (u(10)) {
          e = t.getBoundingClientRect();
          var n = p(t, "top"),
            i = p(t, "left");
          (e.top += n), (e.left += i), (e.bottom += n), (e.right += i);
        } else e = t.getBoundingClientRect();
      } catch (t) {}
      var r = {
          left: e.left,
          top: e.top,
          width: e.right - e.left,
          height: e.bottom - e.top,
        },
        s = "HTML" === t.nodeName ? v(t.ownerDocument) : {},
        a = s.width || t.clientWidth || r.width,
        l = s.height || t.clientHeight || r.height,
        c = t.offsetWidth - a,
        f = t.offsetHeight - l;
      if (c || f) {
        var h = o(t);
        (c -= g(h, "x")), (f -= g(h, "y")), (r.width -= c), (r.height -= f);
      }
      return w(r);
    }
    function C(t, e) {
      var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
        i = u(10),
        r = "HTML" === e.nodeName,
        a = x(t),
        l = x(e),
        c = s(t),
        f = o(e),
        h = parseFloat(f.borderTopWidth),
        d = parseFloat(f.borderLeftWidth);
      n && r && ((l.top = Math.max(l.top, 0)), (l.left = Math.max(l.left, 0)));
      var g = w({
        top: a.top - l.top - h,
        left: a.left - l.left - d,
        width: a.width,
        height: a.height,
      });
      if (((g.marginTop = 0), (g.marginLeft = 0), !i && r)) {
        var m = parseFloat(f.marginTop),
          v = parseFloat(f.marginLeft);
        (g.top -= h - m),
          (g.bottom -= h - m),
          (g.left -= d - v),
          (g.right -= d - v),
          (g.marginTop = m),
          (g.marginLeft = v);
      }
      return (
        (i && !n ? e.contains(c) : e === c && "BODY" !== c.nodeName) &&
          (g = (function (t, e) {
            var n =
                arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
              i = p(e, "top"),
              o = p(e, "left"),
              r = n ? -1 : 1;
            return (
              (t.top += i * r),
              (t.bottom += i * r),
              (t.left += o * r),
              (t.right += o * r),
              t
            );
          })(g, e)),
        g
      );
    }
    function E(t) {
      var e = t.nodeName;
      if ("BODY" === e || "HTML" === e) return !1;
      if ("fixed" === o(t, "position")) return !0;
      var n = r(t);
      return !!n && E(n);
    }
    function T(t) {
      if (!t || !t.parentElement || u()) return document.documentElement;
      for (var e = t.parentElement; e && "none" === o(e, "transform"); )
        e = e.parentElement;
      return e || document.documentElement;
    }
    function S(t, e, n, i) {
      var o = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
        l = { top: 0, left: 0 },
        c = o ? T(t) : d(t, a(e));
      if ("viewport" === i)
        l = (function (t) {
          var e =
              arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            n = t.ownerDocument.documentElement,
            i = C(t, n),
            o = Math.max(n.clientWidth, window.innerWidth || 0),
            r = Math.max(n.clientHeight, window.innerHeight || 0),
            s = e ? 0 : p(n),
            a = e ? 0 : p(n, "left");
          return w({
            top: s - i.top + i.marginTop,
            left: a - i.left + i.marginLeft,
            width: o,
            height: r,
          });
        })(c, o);
      else {
        var u = void 0;
        "scrollParent" === i
          ? "BODY" === (u = s(r(e))).nodeName &&
            (u = t.ownerDocument.documentElement)
          : (u = "window" === i ? t.ownerDocument.documentElement : i);
        var f = C(u, c, o);
        if ("HTML" !== u.nodeName || E(c)) l = f;
        else {
          var h = v(t.ownerDocument),
            g = h.height,
            m = h.width;
          (l.top += f.top - f.marginTop),
            (l.bottom = g + f.top),
            (l.left += f.left - f.marginLeft),
            (l.right = m + f.left);
        }
      }
      var b = "number" == typeof (n = n || 0);
      return (
        (l.left += b ? n : n.left || 0),
        (l.top += b ? n : n.top || 0),
        (l.right -= b ? n : n.right || 0),
        (l.bottom -= b ? n : n.bottom || 0),
        l
      );
    }
    function k(t, e, n, i, o) {
      var r =
        arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
      if (-1 === t.indexOf("auto")) return t;
      var s = S(n, i, r, o),
        a = {
          top: { width: s.width, height: e.top - s.top },
          right: { width: s.right - e.right, height: s.height },
          bottom: { width: s.width, height: s.bottom - e.bottom },
          left: { width: e.left - s.left, height: s.height },
        },
        l = Object.keys(a)
          .map(function (t) {
            return _({ key: t }, a[t], {
              area: ((e = a[t]), e.width * e.height),
            });
            var e;
          })
          .sort(function (t, e) {
            return e.area - t.area;
          }),
        c = l.filter(function (t) {
          var e = t.width,
            i = t.height;
          return e >= n.clientWidth && i >= n.clientHeight;
        }),
        u = c.length > 0 ? c[0].key : l[0].key,
        f = t.split("-")[1];
      return u + (f ? "-" + f : "");
    }
    function P(t, e, n) {
      var i =
        arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
      return C(n, i ? T(e) : d(e, a(n)), i);
    }
    function N(t) {
      var e = t.ownerDocument.defaultView.getComputedStyle(t),
        n = parseFloat(e.marginTop || 0) + parseFloat(e.marginBottom || 0),
        i = parseFloat(e.marginLeft || 0) + parseFloat(e.marginRight || 0);
      return { width: t.offsetWidth + i, height: t.offsetHeight + n };
    }
    function D(t) {
      var e = { left: "right", right: "left", bottom: "top", top: "bottom" };
      return t.replace(/left|right|bottom|top/g, function (t) {
        return e[t];
      });
    }
    function A(t, e, n) {
      n = n.split("-")[0];
      var i = N(t),
        o = { width: i.width, height: i.height },
        r = -1 !== ["right", "left"].indexOf(n),
        s = r ? "top" : "left",
        a = r ? "left" : "top",
        l = r ? "height" : "width",
        c = r ? "width" : "height";
      return (
        (o[s] = e[s] + e[l] / 2 - i[l] / 2),
        (o[a] = n === a ? e[a] - i[c] : e[D(a)]),
        o
      );
    }
    function I(t, e) {
      return Array.prototype.find ? t.find(e) : t.filter(e)[0];
    }
    function O(t, e, n) {
      return (
        (void 0 === n
          ? t
          : t.slice(
              0,
              (function (t, e, n) {
                if (Array.prototype.findIndex)
                  return t.findIndex(function (t) {
                    return t[e] === n;
                  });
                var i = I(t, function (t) {
                  return t[e] === n;
                });
                return t.indexOf(i);
              })(t, "name", n)
            )
        ).forEach(function (t) {
          t.function &&
            console.warn(
              "`modifier.function` is deprecated, use `modifier.fn`!"
            );
          var n = t.function || t.fn;
          t.enabled &&
            i(n) &&
            ((e.offsets.popper = w(e.offsets.popper)),
            (e.offsets.reference = w(e.offsets.reference)),
            (e = n(e, t)));
        }),
        e
      );
    }
    function L() {
      if (!this.state.isDestroyed) {
        var t = {
          instance: this,
          styles: {},
          arrowStyles: {},
          attributes: {},
          flipped: !1,
          offsets: {},
        };
        (t.offsets.reference = P(
          this.state,
          this.popper,
          this.reference,
          this.options.positionFixed
        )),
          (t.placement = k(
            this.options.placement,
            t.offsets.reference,
            this.popper,
            this.reference,
            this.options.modifiers.flip.boundariesElement,
            this.options.modifiers.flip.padding
          )),
          (t.originalPlacement = t.placement),
          (t.positionFixed = this.options.positionFixed),
          (t.offsets.popper = A(this.popper, t.offsets.reference, t.placement)),
          (t.offsets.popper.position = this.options.positionFixed
            ? "fixed"
            : "absolute"),
          (t = O(this.modifiers, t)),
          this.state.isCreated
            ? this.options.onUpdate(t)
            : ((this.state.isCreated = !0), this.options.onCreate(t));
      }
    }
    function j(t, e) {
      return t.some(function (t) {
        var n = t.name;
        return t.enabled && n === e;
      });
    }
    function H(t) {
      for (
        var e = [!1, "ms", "Webkit", "Moz", "O"],
          n = t.charAt(0).toUpperCase() + t.slice(1),
          i = 0;
        i < e.length;
        i++
      ) {
        var o = e[i],
          r = o ? "" + o + n : t;
        if (void 0 !== document.body.style[r]) return r;
      }
      return null;
    }
    function M() {
      return (
        (this.state.isDestroyed = !0),
        j(this.modifiers, "applyStyle") &&
          (this.popper.removeAttribute("x-placement"),
          (this.popper.style.position = ""),
          (this.popper.style.top = ""),
          (this.popper.style.left = ""),
          (this.popper.style.right = ""),
          (this.popper.style.bottom = ""),
          (this.popper.style.willChange = ""),
          (this.popper.style[H("transform")] = "")),
        this.disableEventListeners(),
        this.options.removeOnDestroy &&
          this.popper.parentNode.removeChild(this.popper),
        this
      );
    }
    function q(t) {
      var e = t.ownerDocument;
      return e ? e.defaultView : window;
    }
    function R(t, e, n, i) {
      var o = "BODY" === t.nodeName,
        r = o ? t.ownerDocument.defaultView : t;
      r.addEventListener(e, n, { passive: !0 }),
        o || R(s(r.parentNode), e, n, i),
        i.push(r);
    }
    function B(t, e, n, i) {
      (n.updateBound = i),
        q(t).addEventListener("resize", n.updateBound, { passive: !0 });
      var o = s(t);
      return (
        R(o, "scroll", n.updateBound, n.scrollParents),
        (n.scrollElement = o),
        (n.eventsEnabled = !0),
        n
      );
    }
    function F() {
      this.state.eventsEnabled ||
        (this.state = B(
          this.reference,
          this.options,
          this.state,
          this.scheduleUpdate
        ));
    }
    function W() {
      var t, e;
      this.state.eventsEnabled &&
        (cancelAnimationFrame(this.scheduleUpdate),
        (this.state =
          ((t = this.reference),
          (e = this.state),
          q(t).removeEventListener("resize", e.updateBound),
          e.scrollParents.forEach(function (t) {
            t.removeEventListener("scroll", e.updateBound);
          }),
          (e.updateBound = null),
          (e.scrollParents = []),
          (e.scrollElement = null),
          (e.eventsEnabled = !1),
          e)));
    }
    function z(t) {
      return "" !== t && !isNaN(parseFloat(t)) && isFinite(t);
    }
    function U(t, e) {
      Object.keys(e).forEach(function (n) {
        var i = "";
        -1 !==
          ["width", "height", "top", "right", "bottom", "left"].indexOf(n) &&
          z(e[n]) &&
          (i = "px"),
          (t.style[n] = e[n] + i);
      });
    }
    var Y = t && /Firefox/i.test(navigator.userAgent);
    function V(t, e, n) {
      var i = I(t, function (t) {
          return t.name === e;
        }),
        o =
          !!i &&
          t.some(function (t) {
            return t.name === n && t.enabled && t.order < i.order;
          });
      if (!o) {
        var r = "`" + e + "`",
          s = "`" + n + "`";
        console.warn(
          s +
            " modifier is required by " +
            r +
            " modifier in order to work, be sure to include it before " +
            r +
            "!"
        );
      }
      return o;
    }
    var X = [
        "auto-start",
        "auto",
        "auto-end",
        "top-start",
        "top",
        "top-end",
        "right-start",
        "right",
        "right-end",
        "bottom-end",
        "bottom",
        "bottom-start",
        "left-end",
        "left",
        "left-start",
      ],
      Q = X.slice(3);
    function $(t) {
      var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
        n = Q.indexOf(t),
        i = Q.slice(n + 1).concat(Q.slice(0, n));
      return e ? i.reverse() : i;
    }
    var K = "flip",
      G = "clockwise",
      J = "counterclockwise";
    function Z(t, e, n, i) {
      var o = [0, 0],
        r = -1 !== ["right", "left"].indexOf(i),
        s = t.split(/(\+|\-)/).map(function (t) {
          return t.trim();
        }),
        a = s.indexOf(
          I(s, function (t) {
            return -1 !== t.search(/,|\s/);
          })
        );
      s[a] &&
        -1 === s[a].indexOf(",") &&
        console.warn(
          "Offsets separated by white space(s) are deprecated, use a comma (,) instead."
        );
      var l = /\s*,\s*|\s+/,
        c =
          -1 !== a
            ? [
                s.slice(0, a).concat([s[a].split(l)[0]]),
                [s[a].split(l)[1]].concat(s.slice(a + 1)),
              ]
            : [s];
      return (
        (c = c.map(function (t, i) {
          var o = (1 === i ? !r : r) ? "height" : "width",
            s = !1;
          return t
            .reduce(function (t, e) {
              return "" === t[t.length - 1] && -1 !== ["+", "-"].indexOf(e)
                ? ((t[t.length - 1] = e), (s = !0), t)
                : s
                ? ((t[t.length - 1] += e), (s = !1), t)
                : t.concat(e);
            }, [])
            .map(function (t) {
              return (function (t, e, n, i) {
                var o = t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                  r = +o[1],
                  s = o[2];
                if (!r) return t;
                if (0 === s.indexOf("%")) {
                  return (w("%p" === s ? n : i)[e] / 100) * r;
                }
                if ("vh" === s || "vw" === s)
                  return (
                    (("vh" === s
                      ? Math.max(
                          document.documentElement.clientHeight,
                          window.innerHeight || 0
                        )
                      : Math.max(
                          document.documentElement.clientWidth,
                          window.innerWidth || 0
                        )) /
                      100) *
                    r
                  );
                return r;
              })(t, o, e, n);
            });
        })),
        c.forEach(function (t, e) {
          t.forEach(function (n, i) {
            z(n) && (o[e] += n * ("-" === t[i - 1] ? -1 : 1));
          });
        }),
        o
      );
    }
    var tt = {
        shift: {
          order: 100,
          enabled: !0,
          fn: function (t) {
            var e = t.placement,
              n = e.split("-")[0],
              i = e.split("-")[1];
            if (i) {
              var o = t.offsets,
                r = o.reference,
                s = o.popper,
                a = -1 !== ["bottom", "top"].indexOf(n),
                l = a ? "left" : "top",
                c = a ? "width" : "height",
                u = {
                  start: y({}, l, r[l]),
                  end: y({}, l, r[l] + r[c] - s[c]),
                };
              t.offsets.popper = _({}, s, u[i]);
            }
            return t;
          },
        },
        offset: {
          order: 200,
          enabled: !0,
          fn: function (t, e) {
            var n = e.offset,
              i = t.placement,
              o = t.offsets,
              r = o.popper,
              s = o.reference,
              a = i.split("-")[0],
              l = void 0;
            return (
              (l = z(+n) ? [+n, 0] : Z(n, r, s, a)),
              "left" === a
                ? ((r.top += l[0]), (r.left -= l[1]))
                : "right" === a
                ? ((r.top += l[0]), (r.left += l[1]))
                : "top" === a
                ? ((r.left += l[0]), (r.top -= l[1]))
                : "bottom" === a && ((r.left += l[0]), (r.top += l[1])),
              (t.popper = r),
              t
            );
          },
          offset: 0,
        },
        preventOverflow: {
          order: 300,
          enabled: !0,
          fn: function (t, e) {
            var n = e.boundariesElement || f(t.instance.popper);
            t.instance.reference === n && (n = f(n));
            var i = H("transform"),
              o = t.instance.popper.style,
              r = o.top,
              s = o.left,
              a = o[i];
            (o.top = ""), (o.left = ""), (o[i] = "");
            var l = S(
              t.instance.popper,
              t.instance.reference,
              e.padding,
              n,
              t.positionFixed
            );
            (o.top = r), (o.left = s), (o[i] = a), (e.boundaries = l);
            var c = e.priority,
              u = t.offsets.popper,
              h = {
                primary: function (t) {
                  var n = u[t];
                  return (
                    u[t] < l[t] &&
                      !e.escapeWithReference &&
                      (n = Math.max(u[t], l[t])),
                    y({}, t, n)
                  );
                },
                secondary: function (t) {
                  var n = "right" === t ? "left" : "top",
                    i = u[n];
                  return (
                    u[t] > l[t] &&
                      !e.escapeWithReference &&
                      (i = Math.min(
                        u[n],
                        l[t] - ("right" === t ? u.width : u.height)
                      )),
                    y({}, n, i)
                  );
                },
              };
            return (
              c.forEach(function (t) {
                var e =
                  -1 !== ["left", "top"].indexOf(t) ? "primary" : "secondary";
                u = _({}, u, h[e](t));
              }),
              (t.offsets.popper = u),
              t
            );
          },
          priority: ["left", "right", "top", "bottom"],
          padding: 5,
          boundariesElement: "scrollParent",
        },
        keepTogether: {
          order: 400,
          enabled: !0,
          fn: function (t) {
            var e = t.offsets,
              n = e.popper,
              i = e.reference,
              o = t.placement.split("-")[0],
              r = Math.floor,
              s = -1 !== ["top", "bottom"].indexOf(o),
              a = s ? "right" : "bottom",
              l = s ? "left" : "top",
              c = s ? "width" : "height";
            return (
              n[a] < r(i[l]) && (t.offsets.popper[l] = r(i[l]) - n[c]),
              n[l] > r(i[a]) && (t.offsets.popper[l] = r(i[a])),
              t
            );
          },
        },
        arrow: {
          order: 500,
          enabled: !0,
          fn: function (t, e) {
            var n;
            if (!V(t.instance.modifiers, "arrow", "keepTogether")) return t;
            var i = e.element;
            if ("string" == typeof i) {
              if (!(i = t.instance.popper.querySelector(i))) return t;
            } else if (!t.instance.popper.contains(i))
              return (
                console.warn(
                  "WARNING: `arrow.element` must be child of its popper element!"
                ),
                t
              );
            var r = t.placement.split("-")[0],
              s = t.offsets,
              a = s.popper,
              l = s.reference,
              c = -1 !== ["left", "right"].indexOf(r),
              u = c ? "height" : "width",
              f = c ? "Top" : "Left",
              h = f.toLowerCase(),
              d = c ? "left" : "top",
              p = c ? "bottom" : "right",
              g = N(i)[u];
            l[p] - g < a[h] && (t.offsets.popper[h] -= a[h] - (l[p] - g)),
              l[h] + g > a[p] && (t.offsets.popper[h] += l[h] + g - a[p]),
              (t.offsets.popper = w(t.offsets.popper));
            var m = l[h] + l[u] / 2 - g / 2,
              v = o(t.instance.popper),
              b = parseFloat(v["margin" + f]),
              _ = parseFloat(v["border" + f + "Width"]),
              x = m - t.offsets.popper[h] - b - _;
            return (
              (x = Math.max(Math.min(a[u] - g, x), 0)),
              (t.arrowElement = i),
              (t.offsets.arrow =
                (y((n = {}), h, Math.round(x)), y(n, d, ""), n)),
              t
            );
          },
          element: "[x-arrow]",
        },
        flip: {
          order: 600,
          enabled: !0,
          fn: function (t, e) {
            if (j(t.instance.modifiers, "inner")) return t;
            if (t.flipped && t.placement === t.originalPlacement) return t;
            var n = S(
                t.instance.popper,
                t.instance.reference,
                e.padding,
                e.boundariesElement,
                t.positionFixed
              ),
              i = t.placement.split("-")[0],
              o = D(i),
              r = t.placement.split("-")[1] || "",
              s = [];
            switch (e.behavior) {
              case K:
                s = [i, o];
                break;
              case G:
                s = $(i);
                break;
              case J:
                s = $(i, !0);
                break;
              default:
                s = e.behavior;
            }
            return (
              s.forEach(function (a, l) {
                if (i !== a || s.length === l + 1) return t;
                (i = t.placement.split("-")[0]), (o = D(i));
                var c = t.offsets.popper,
                  u = t.offsets.reference,
                  f = Math.floor,
                  h =
                    ("left" === i && f(c.right) > f(u.left)) ||
                    ("right" === i && f(c.left) < f(u.right)) ||
                    ("top" === i && f(c.bottom) > f(u.top)) ||
                    ("bottom" === i && f(c.top) < f(u.bottom)),
                  d = f(c.left) < f(n.left),
                  p = f(c.right) > f(n.right),
                  g = f(c.top) < f(n.top),
                  m = f(c.bottom) > f(n.bottom),
                  v =
                    ("left" === i && d) ||
                    ("right" === i && p) ||
                    ("top" === i && g) ||
                    ("bottom" === i && m),
                  b = -1 !== ["top", "bottom"].indexOf(i),
                  y =
                    !!e.flipVariations &&
                    ((b && "start" === r && d) ||
                      (b && "end" === r && p) ||
                      (!b && "start" === r && g) ||
                      (!b && "end" === r && m)),
                  w =
                    !!e.flipVariationsByContent &&
                    ((b && "start" === r && p) ||
                      (b && "end" === r && d) ||
                      (!b && "start" === r && m) ||
                      (!b && "end" === r && g)),
                  x = y || w;
                (h || v || x) &&
                  ((t.flipped = !0),
                  (h || v) && (i = s[l + 1]),
                  x &&
                    (r = (function (t) {
                      return "end" === t ? "start" : "start" === t ? "end" : t;
                    })(r)),
                  (t.placement = i + (r ? "-" + r : "")),
                  (t.offsets.popper = _(
                    {},
                    t.offsets.popper,
                    A(t.instance.popper, t.offsets.reference, t.placement)
                  )),
                  (t = O(t.instance.modifiers, t, "flip")));
              }),
              t
            );
          },
          behavior: "flip",
          padding: 5,
          boundariesElement: "viewport",
          flipVariations: !1,
          flipVariationsByContent: !1,
        },
        inner: {
          order: 700,
          enabled: !1,
          fn: function (t) {
            var e = t.placement,
              n = e.split("-")[0],
              i = t.offsets,
              o = i.popper,
              r = i.reference,
              s = -1 !== ["left", "right"].indexOf(n),
              a = -1 === ["top", "left"].indexOf(n);
            return (
              (o[s ? "left" : "top"] =
                r[n] - (a ? o[s ? "width" : "height"] : 0)),
              (t.placement = D(e)),
              (t.offsets.popper = w(o)),
              t
            );
          },
        },
        hide: {
          order: 800,
          enabled: !0,
          fn: function (t) {
            if (!V(t.instance.modifiers, "hide", "preventOverflow")) return t;
            var e = t.offsets.reference,
              n = I(t.instance.modifiers, function (t) {
                return "preventOverflow" === t.name;
              }).boundaries;
            if (
              e.bottom < n.top ||
              e.left > n.right ||
              e.top > n.bottom ||
              e.right < n.left
            ) {
              if (!0 === t.hide) return t;
              (t.hide = !0), (t.attributes["x-out-of-boundaries"] = "");
            } else {
              if (!1 === t.hide) return t;
              (t.hide = !1), (t.attributes["x-out-of-boundaries"] = !1);
            }
            return t;
          },
        },
        computeStyle: {
          order: 850,
          enabled: !0,
          fn: function (t, e) {
            var n = e.x,
              i = e.y,
              o = t.offsets.popper,
              r = I(t.instance.modifiers, function (t) {
                return "applyStyle" === t.name;
              }).gpuAcceleration;
            void 0 !== r &&
              console.warn(
                "WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!"
              );
            var s = void 0 !== r ? r : e.gpuAcceleration,
              a = f(t.instance.popper),
              l = x(a),
              c = { position: o.position },
              u = (function (t, e) {
                var n = t.offsets,
                  i = n.popper,
                  o = n.reference,
                  r = Math.round,
                  s = Math.floor,
                  a = function (t) {
                    return t;
                  },
                  l = r(o.width),
                  c = r(i.width),
                  u = -1 !== ["left", "right"].indexOf(t.placement),
                  f = -1 !== t.placement.indexOf("-"),
                  h = e ? (u || f || l % 2 == c % 2 ? r : s) : a,
                  d = e ? r : a;
                return {
                  left: h(
                    l % 2 == 1 && c % 2 == 1 && !f && e ? i.left - 1 : i.left
                  ),
                  top: d(i.top),
                  bottom: d(i.bottom),
                  right: h(i.right),
                };
              })(t, window.devicePixelRatio < 2 || !Y),
              h = "bottom" === n ? "top" : "bottom",
              d = "right" === i ? "left" : "right",
              p = H("transform"),
              g = void 0,
              m = void 0;
            if (
              ((m =
                "bottom" === h
                  ? "HTML" === a.nodeName
                    ? -a.clientHeight + u.bottom
                    : -l.height + u.bottom
                  : u.top),
              (g =
                "right" === d
                  ? "HTML" === a.nodeName
                    ? -a.clientWidth + u.right
                    : -l.width + u.right
                  : u.left),
              s && p)
            )
              (c[p] = "translate3d(" + g + "px, " + m + "px, 0)"),
                (c[h] = 0),
                (c[d] = 0),
                (c.willChange = "transform");
            else {
              var v = "bottom" === h ? -1 : 1,
                b = "right" === d ? -1 : 1;
              (c[h] = m * v), (c[d] = g * b), (c.willChange = h + ", " + d);
            }
            var y = { "x-placement": t.placement };
            return (
              (t.attributes = _({}, y, t.attributes)),
              (t.styles = _({}, c, t.styles)),
              (t.arrowStyles = _({}, t.offsets.arrow, t.arrowStyles)),
              t
            );
          },
          gpuAcceleration: !0,
          x: "bottom",
          y: "right",
        },
        applyStyle: {
          order: 900,
          enabled: !0,
          fn: function (t) {
            var e, n;
            return (
              U(t.instance.popper, t.styles),
              (e = t.instance.popper),
              (n = t.attributes),
              Object.keys(n).forEach(function (t) {
                !1 !== n[t] ? e.setAttribute(t, n[t]) : e.removeAttribute(t);
              }),
              t.arrowElement &&
                Object.keys(t.arrowStyles).length &&
                U(t.arrowElement, t.arrowStyles),
              t
            );
          },
          onLoad: function (t, e, n, i, o) {
            var r = P(o, e, t, n.positionFixed),
              s = k(
                n.placement,
                r,
                e,
                t,
                n.modifiers.flip.boundariesElement,
                n.modifiers.flip.padding
              );
            return (
              e.setAttribute("x-placement", s),
              U(e, { position: n.positionFixed ? "fixed" : "absolute" }),
              n
            );
          },
          gpuAcceleration: void 0,
        },
      },
      et = {
        placement: "bottom",
        positionFixed: !1,
        eventsEnabled: !0,
        removeOnDestroy: !1,
        onCreate: function () {},
        onUpdate: function () {},
        modifiers: tt,
      },
      nt = (function () {
        function t(e, o) {
          var r = this,
            s =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : {};
          !(function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, t),
            (this.scheduleUpdate = function () {
              return requestAnimationFrame(r.update);
            }),
            (this.update = n(this.update.bind(this))),
            (this.options = _({}, t.Defaults, s)),
            (this.state = {
              isDestroyed: !1,
              isCreated: !1,
              scrollParents: [],
            }),
            (this.reference = e && e.jquery ? e[0] : e),
            (this.popper = o && o.jquery ? o[0] : o),
            (this.options.modifiers = {}),
            Object.keys(_({}, t.Defaults.modifiers, s.modifiers)).forEach(
              function (e) {
                r.options.modifiers[e] = _(
                  {},
                  t.Defaults.modifiers[e] || {},
                  s.modifiers ? s.modifiers[e] : {}
                );
              }
            ),
            (this.modifiers = Object.keys(this.options.modifiers)
              .map(function (t) {
                return _({ name: t }, r.options.modifiers[t]);
              })
              .sort(function (t, e) {
                return t.order - e.order;
              })),
            this.modifiers.forEach(function (t) {
              t.enabled &&
                i(t.onLoad) &&
                t.onLoad(r.reference, r.popper, r.options, t, r.state);
            }),
            this.update();
          var a = this.options.eventsEnabled;
          a && this.enableEventListeners(), (this.state.eventsEnabled = a);
        }
        return (
          b(t, [
            {
              key: "update",
              value: function () {
                return L.call(this);
              },
            },
            {
              key: "destroy",
              value: function () {
                return M.call(this);
              },
            },
            {
              key: "enableEventListeners",
              value: function () {
                return F.call(this);
              },
            },
            {
              key: "disableEventListeners",
              value: function () {
                return W.call(this);
              },
            },
          ]),
          t
        );
      })();
    return (
      (nt.Utils = ("undefined" != typeof window ? window : global).PopperUtils),
      (nt.placements = X),
      (nt.Defaults = et),
      nt
    );
  }),
  /*!
   * Bootstrap v4.6.0 (https://getbootstrap.com/)
   * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   */
  (function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
      ? e(exports, require("jquery"), require("popper.js"))
      : "function" == typeof define && define.amd
      ? define(["exports", "jquery", "popper.js"], e)
      : e(
          ((t =
            "undefined" != typeof globalThis
              ? globalThis
              : t || self).bootstrap = {}),
          t.jQuery,
          t.Popper
        );
  })(this, function (t, e, n) {
    "use strict";
    function i(t) {
      return t && "object" == typeof t && "default" in t ? t : { default: t };
    }
    var o = i(e),
      r = i(n);
    function s(t, e) {
      for (var n = 0; n < e.length; n++) {
        var i = e[n];
        (i.enumerable = i.enumerable || !1),
          (i.configurable = !0),
          "value" in i && (i.writable = !0),
          Object.defineProperty(t, i.key, i);
      }
    }
    function a(t, e, n) {
      return e && s(t.prototype, e), n && s(t, n), t;
    }
    function l() {
      return (
        (l =
          Object.assign ||
          function (t) {
            for (var e = 1; e < arguments.length; e++) {
              var n = arguments[e];
              for (var i in n)
                Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
            }
            return t;
          }),
        l.apply(this, arguments)
      );
    }
    var c = "transitionend";
    function u(t) {
      var e = this,
        n = !1;
      return (
        o.default(this).one(f.TRANSITION_END, function () {
          n = !0;
        }),
        setTimeout(function () {
          n || f.triggerTransitionEnd(e);
        }, t),
        this
      );
    }
    var f = {
      TRANSITION_END: "bsTransitionEnd",
      getUID: function (t) {
        do {
          t += ~~(1e6 * Math.random());
        } while (document.getElementById(t));
        return t;
      },
      getSelectorFromElement: function (t) {
        var e = t.getAttribute("data-target");
        if (!e || "#" === e) {
          var n = t.getAttribute("href");
          e = n && "#" !== n ? n.trim() : "";
        }
        try {
          return document.querySelector(e) ? e : null;
        } catch (t) {
          return null;
        }
      },
      getTransitionDurationFromElement: function (t) {
        if (!t) return 0;
        var e = o.default(t).css("transition-duration"),
          n = o.default(t).css("transition-delay"),
          i = parseFloat(e),
          r = parseFloat(n);
        return i || r
          ? ((e = e.split(",")[0]),
            (n = n.split(",")[0]),
            1e3 * (parseFloat(e) + parseFloat(n)))
          : 0;
      },
      reflow: function (t) {
        return t.offsetHeight;
      },
      triggerTransitionEnd: function (t) {
        o.default(t).trigger(c);
      },
      supportsTransitionEnd: function () {
        return Boolean(c);
      },
      isElement: function (t) {
        return (t[0] || t).nodeType;
      },
      typeCheckConfig: function (t, e, n) {
        for (var i in n)
          if (Object.prototype.hasOwnProperty.call(n, i)) {
            var o = n[i],
              r = e[i],
              s =
                r && f.isElement(r)
                  ? "element"
                  : null == (a = r)
                  ? "" + a
                  : {}.toString
                      .call(a)
                      .match(/\s([a-z]+)/i)[1]
                      .toLowerCase();
            if (!new RegExp(o).test(s))
              throw new Error(
                t.toUpperCase() +
                  ': Option "' +
                  i +
                  '" provided type "' +
                  s +
                  '" but expected type "' +
                  o +
                  '".'
              );
          }
        var a;
      },
      findShadowRoot: function (t) {
        if (!document.documentElement.attachShadow) return null;
        if ("function" == typeof t.getRootNode) {
          var e = t.getRootNode();
          return e instanceof ShadowRoot ? e : null;
        }
        return t instanceof ShadowRoot
          ? t
          : t.parentNode
          ? f.findShadowRoot(t.parentNode)
          : null;
      },
      jQueryDetection: function () {
        if (void 0 === o.default)
          throw new TypeError(
            "Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript."
          );
        var t = o.default.fn.jquery.split(" ")[0].split(".");
        if (
          (t[0] < 2 && t[1] < 9) ||
          (1 === t[0] && 9 === t[1] && t[2] < 1) ||
          t[0] >= 4
        )
          throw new Error(
            "Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0"
          );
      },
    };
    f.jQueryDetection(),
      (o.default.fn.emulateTransitionEnd = u),
      (o.default.event.special[f.TRANSITION_END] = {
        bindType: c,
        delegateType: c,
        handle: function (t) {
          if (o.default(t.target).is(this))
            return t.handleObj.handler.apply(this, arguments);
        },
      });
    var h = "alert",
      d = "bs.alert",
      p = "." + d,
      g = o.default.fn[h],
      m = "close" + p,
      v = "closed" + p,
      b = "click" + p + ".data-api",
      y = (function () {
        function t(t) {
          this._element = t;
        }
        var e = t.prototype;
        return (
          (e.close = function (t) {
            var e = this._element;
            t && (e = this._getRootElement(t)),
              this._triggerCloseEvent(e).isDefaultPrevented() ||
                this._removeElement(e);
          }),
          (e.dispose = function () {
            o.default.removeData(this._element, d), (this._element = null);
          }),
          (e._getRootElement = function (t) {
            var e = f.getSelectorFromElement(t),
              n = !1;
            return (
              e && (n = document.querySelector(e)),
              n || (n = o.default(t).closest(".alert")[0]),
              n
            );
          }),
          (e._triggerCloseEvent = function (t) {
            var e = o.default.Event(m);
            return o.default(t).trigger(e), e;
          }),
          (e._removeElement = function (t) {
            var e = this;
            if (
              (o.default(t).removeClass("show"), o.default(t).hasClass("fade"))
            ) {
              var n = f.getTransitionDurationFromElement(t);
              o.default(t)
                .one(f.TRANSITION_END, function (n) {
                  return e._destroyElement(t, n);
                })
                .emulateTransitionEnd(n);
            } else this._destroyElement(t);
          }),
          (e._destroyElement = function (t) {
            o.default(t).detach().trigger(v).remove();
          }),
          (t._jQueryInterface = function (e) {
            return this.each(function () {
              var n = o.default(this),
                i = n.data(d);
              i || ((i = new t(this)), n.data(d, i)),
                "close" === e && i[e](this);
            });
          }),
          (t._handleDismiss = function (t) {
            return function (e) {
              e && e.preventDefault(), t.close(this);
            };
          }),
          a(t, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.6.0";
              },
            },
          ]),
          t
        );
      })();
    o
      .default(document)
      .on(b, '[data-dismiss="alert"]', y._handleDismiss(new y())),
      (o.default.fn[h] = y._jQueryInterface),
      (o.default.fn[h].Constructor = y),
      (o.default.fn[h].noConflict = function () {
        return (o.default.fn[h] = g), y._jQueryInterface;
      });
    var _ = "button",
      w = "bs.button",
      x = "." + w,
      C = ".data-api",
      E = o.default.fn[_],
      T = "active",
      S = '[data-toggle^="button"]',
      k = 'input:not([type="hidden"])',
      P = ".btn",
      N = "click" + x + C,
      D = "focus" + x + C + " blur" + x + C,
      A = "load" + x + C,
      I = (function () {
        function t(t) {
          (this._element = t), (this.shouldAvoidTriggerChange = !1);
        }
        var e = t.prototype;
        return (
          (e.toggle = function () {
            var t = !0,
              e = !0,
              n = o
                .default(this._element)
                .closest('[data-toggle="buttons"]')[0];
            if (n) {
              var i = this._element.querySelector(k);
              if (i) {
                if ("radio" === i.type)
                  if (i.checked && this._element.classList.contains(T)) t = !1;
                  else {
                    var r = n.querySelector(".active");
                    r && o.default(r).removeClass(T);
                  }
                t &&
                  (("checkbox" !== i.type && "radio" !== i.type) ||
                    (i.checked = !this._element.classList.contains(T)),
                  this.shouldAvoidTriggerChange ||
                    o.default(i).trigger("change")),
                  i.focus(),
                  (e = !1);
              }
            }
            this._element.hasAttribute("disabled") ||
              this._element.classList.contains("disabled") ||
              (e &&
                this._element.setAttribute(
                  "aria-pressed",
                  !this._element.classList.contains(T)
                ),
              t && o.default(this._element).toggleClass(T));
          }),
          (e.dispose = function () {
            o.default.removeData(this._element, w), (this._element = null);
          }),
          (t._jQueryInterface = function (e, n) {
            return this.each(function () {
              var i = o.default(this),
                r = i.data(w);
              r || ((r = new t(this)), i.data(w, r)),
                (r.shouldAvoidTriggerChange = n),
                "toggle" === e && r[e]();
            });
          }),
          a(t, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.6.0";
              },
            },
          ]),
          t
        );
      })();
    o
      .default(document)
      .on(N, S, function (t) {
        var e = t.target,
          n = e;
        if (
          (o.default(e).hasClass("btn") || (e = o.default(e).closest(P)[0]),
          !e || e.hasAttribute("disabled") || e.classList.contains("disabled"))
        )
          t.preventDefault();
        else {
          var i = e.querySelector(k);
          if (
            i &&
            (i.hasAttribute("disabled") || i.classList.contains("disabled"))
          )
            return void t.preventDefault();
          ("INPUT" !== n.tagName && "LABEL" === e.tagName) ||
            I._jQueryInterface.call(
              o.default(e),
              "toggle",
              "INPUT" === n.tagName
            );
        }
      })
      .on(D, S, function (t) {
        var e = o.default(t.target).closest(P)[0];
        o.default(e).toggleClass("focus", /^focus(in)?$/.test(t.type));
      }),
      o.default(window).on(A, function () {
        for (
          var t = [].slice.call(
              document.querySelectorAll('[data-toggle="buttons"] .btn')
            ),
            e = 0,
            n = t.length;
          e < n;
          e++
        ) {
          var i = t[e],
            o = i.querySelector(k);
          o.checked || o.hasAttribute("checked")
            ? i.classList.add(T)
            : i.classList.remove(T);
        }
        for (
          var r = 0,
            s = (t = [].slice.call(
              document.querySelectorAll('[data-toggle="button"]')
            )).length;
          r < s;
          r++
        ) {
          var a = t[r];
          "true" === a.getAttribute("aria-pressed")
            ? a.classList.add(T)
            : a.classList.remove(T);
        }
      }),
      (o.default.fn[_] = I._jQueryInterface),
      (o.default.fn[_].Constructor = I),
      (o.default.fn[_].noConflict = function () {
        return (o.default.fn[_] = E), I._jQueryInterface;
      });
    var O = "carousel",
      L = "bs.carousel",
      j = "." + L,
      H = ".data-api",
      M = o.default.fn[O],
      q = {
        interval: 5e3,
        keyboard: !0,
        slide: !1,
        pause: "hover",
        wrap: !0,
        touch: !0,
      },
      R = {
        interval: "(number|boolean)",
        keyboard: "boolean",
        slide: "(boolean|string)",
        pause: "(string|boolean)",
        wrap: "boolean",
        touch: "boolean",
      },
      B = "next",
      F = "prev",
      W = "slide" + j,
      z = "slid" + j,
      U = "keydown" + j,
      Y = "mouseenter" + j,
      V = "mouseleave" + j,
      X = "touchstart" + j,
      Q = "touchmove" + j,
      $ = "touchend" + j,
      K = "pointerdown" + j,
      G = "pointerup" + j,
      J = "dragstart" + j,
      Z = "load" + j + H,
      tt = "click" + j + H,
      et = "active",
      nt = ".active.carousel-item",
      it = { TOUCH: "touch", PEN: "pen" },
      ot = (function () {
        function t(t, e) {
          (this._items = null),
            (this._interval = null),
            (this._activeElement = null),
            (this._isPaused = !1),
            (this._isSliding = !1),
            (this.touchTimeout = null),
            (this.touchStartX = 0),
            (this.touchDeltaX = 0),
            (this._config = this._getConfig(e)),
            (this._element = t),
            (this._indicatorsElement = this._element.querySelector(
              ".carousel-indicators"
            )),
            (this._touchSupported =
              "ontouchstart" in document.documentElement ||
              navigator.maxTouchPoints > 0),
            (this._pointerEvent = Boolean(
              window.PointerEvent || window.MSPointerEvent
            )),
            this._addEventListeners();
        }
        var e = t.prototype;
        return (
          (e.next = function () {
            this._isSliding || this._slide(B);
          }),
          (e.nextWhenVisible = function () {
            var t = o.default(this._element);
            !document.hidden &&
              t.is(":visible") &&
              "hidden" !== t.css("visibility") &&
              this.next();
          }),
          (e.prev = function () {
            this._isSliding || this._slide(F);
          }),
          (e.pause = function (t) {
            t || (this._isPaused = !0),
              this._element.querySelector(
                ".carousel-item-next, .carousel-item-prev"
              ) && (f.triggerTransitionEnd(this._element), this.cycle(!0)),
              clearInterval(this._interval),
              (this._interval = null);
          }),
          (e.cycle = function (t) {
            t || (this._isPaused = !1),
              this._interval &&
                (clearInterval(this._interval), (this._interval = null)),
              this._config.interval &&
                !this._isPaused &&
                (this._updateInterval(),
                (this._interval = setInterval(
                  (document.visibilityState
                    ? this.nextWhenVisible
                    : this.next
                  ).bind(this),
                  this._config.interval
                )));
          }),
          (e.to = function (t) {
            var e = this;
            this._activeElement = this._element.querySelector(nt);
            var n = this._getItemIndex(this._activeElement);
            if (!(t > this._items.length - 1 || t < 0))
              if (this._isSliding)
                o.default(this._element).one(z, function () {
                  return e.to(t);
                });
              else {
                if (n === t) return this.pause(), void this.cycle();
                var i = t > n ? B : F;
                this._slide(i, this._items[t]);
              }
          }),
          (e.dispose = function () {
            o.default(this._element).off(j),
              o.default.removeData(this._element, L),
              (this._items = null),
              (this._config = null),
              (this._element = null),
              (this._interval = null),
              (this._isPaused = null),
              (this._isSliding = null),
              (this._activeElement = null),
              (this._indicatorsElement = null);
          }),
          (e._getConfig = function (t) {
            return (t = l({}, q, t)), f.typeCheckConfig(O, t, R), t;
          }),
          (e._handleSwipe = function () {
            var t = Math.abs(this.touchDeltaX);
            if (!(t <= 40)) {
              var e = t / this.touchDeltaX;
              (this.touchDeltaX = 0),
                e > 0 && this.prev(),
                e < 0 && this.next();
            }
          }),
          (e._addEventListeners = function () {
            var t = this;
            this._config.keyboard &&
              o.default(this._element).on(U, function (e) {
                return t._keydown(e);
              }),
              "hover" === this._config.pause &&
                o
                  .default(this._element)
                  .on(Y, function (e) {
                    return t.pause(e);
                  })
                  .on(V, function (e) {
                    return t.cycle(e);
                  }),
              this._config.touch && this._addTouchEventListeners();
          }),
          (e._addTouchEventListeners = function () {
            var t = this;
            if (this._touchSupported) {
              var e = function (e) {
                  t._pointerEvent &&
                  it[e.originalEvent.pointerType.toUpperCase()]
                    ? (t.touchStartX = e.originalEvent.clientX)
                    : t._pointerEvent ||
                      (t.touchStartX = e.originalEvent.touches[0].clientX);
                },
                n = function (e) {
                  t._pointerEvent &&
                    it[e.originalEvent.pointerType.toUpperCase()] &&
                    (t.touchDeltaX = e.originalEvent.clientX - t.touchStartX),
                    t._handleSwipe(),
                    "hover" === t._config.pause &&
                      (t.pause(),
                      t.touchTimeout && clearTimeout(t.touchTimeout),
                      (t.touchTimeout = setTimeout(function (e) {
                        return t.cycle(e);
                      }, 500 + t._config.interval)));
                };
              o
                .default(this._element.querySelectorAll(".carousel-item img"))
                .on(J, function (t) {
                  return t.preventDefault();
                }),
                this._pointerEvent
                  ? (o.default(this._element).on(K, function (t) {
                      return e(t);
                    }),
                    o.default(this._element).on(G, function (t) {
                      return n(t);
                    }),
                    this._element.classList.add("pointer-event"))
                  : (o.default(this._element).on(X, function (t) {
                      return e(t);
                    }),
                    o.default(this._element).on(Q, function (e) {
                      return (function (e) {
                        e.originalEvent.touches &&
                        e.originalEvent.touches.length > 1
                          ? (t.touchDeltaX = 0)
                          : (t.touchDeltaX =
                              e.originalEvent.touches[0].clientX -
                              t.touchStartX);
                      })(e);
                    }),
                    o.default(this._element).on($, function (t) {
                      return n(t);
                    }));
            }
          }),
          (e._keydown = function (t) {
            if (!/input|textarea/i.test(t.target.tagName))
              switch (t.which) {
                case 37:
                  t.preventDefault(), this.prev();
                  break;
                case 39:
                  t.preventDefault(), this.next();
              }
          }),
          (e._getItemIndex = function (t) {
            return (
              (this._items =
                t && t.parentNode
                  ? [].slice.call(
                      t.parentNode.querySelectorAll(".carousel-item")
                    )
                  : []),
              this._items.indexOf(t)
            );
          }),
          (e._getItemByDirection = function (t, e) {
            var n = t === B,
              i = t === F,
              o = this._getItemIndex(e),
              r = this._items.length - 1;
            if (((i && 0 === o) || (n && o === r)) && !this._config.wrap)
              return e;
            var s = (o + (t === F ? -1 : 1)) % this._items.length;
            return -1 === s
              ? this._items[this._items.length - 1]
              : this._items[s];
          }),
          (e._triggerSlideEvent = function (t, e) {
            var n = this._getItemIndex(t),
              i = this._getItemIndex(this._element.querySelector(nt)),
              r = o.default.Event(W, {
                relatedTarget: t,
                direction: e,
                from: i,
                to: n,
              });
            return o.default(this._element).trigger(r), r;
          }),
          (e._setActiveIndicatorElement = function (t) {
            if (this._indicatorsElement) {
              var e = [].slice.call(
                this._indicatorsElement.querySelectorAll(".active")
              );
              o.default(e).removeClass(et);
              var n = this._indicatorsElement.children[this._getItemIndex(t)];
              n && o.default(n).addClass(et);
            }
          }),
          (e._updateInterval = function () {
            var t = this._activeElement || this._element.querySelector(nt);
            if (t) {
              var e = parseInt(t.getAttribute("data-interval"), 10);
              e
                ? ((this._config.defaultInterval =
                    this._config.defaultInterval || this._config.interval),
                  (this._config.interval = e))
                : (this._config.interval =
                    this._config.defaultInterval || this._config.interval);
            }
          }),
          (e._slide = function (t, e) {
            var n,
              i,
              r,
              s = this,
              a = this._element.querySelector(nt),
              l = this._getItemIndex(a),
              c = e || (a && this._getItemByDirection(t, a)),
              u = this._getItemIndex(c),
              h = Boolean(this._interval);
            if (
              (t === B
                ? ((n = "carousel-item-left"),
                  (i = "carousel-item-next"),
                  (r = "left"))
                : ((n = "carousel-item-right"),
                  (i = "carousel-item-prev"),
                  (r = "right")),
              c && o.default(c).hasClass(et))
            )
              this._isSliding = !1;
            else if (
              !this._triggerSlideEvent(c, r).isDefaultPrevented() &&
              a &&
              c
            ) {
              (this._isSliding = !0),
                h && this.pause(),
                this._setActiveIndicatorElement(c),
                (this._activeElement = c);
              var d = o.default.Event(z, {
                relatedTarget: c,
                direction: r,
                from: l,
                to: u,
              });
              if (o.default(this._element).hasClass("slide")) {
                o.default(c).addClass(i),
                  f.reflow(c),
                  o.default(a).addClass(n),
                  o.default(c).addClass(n);
                var p = f.getTransitionDurationFromElement(a);
                o.default(a)
                  .one(f.TRANSITION_END, function () {
                    o
                      .default(c)
                      .removeClass(n + " " + i)
                      .addClass(et),
                      o.default(a).removeClass(et + " " + i + " " + n),
                      (s._isSliding = !1),
                      setTimeout(function () {
                        return o.default(s._element).trigger(d);
                      }, 0);
                  })
                  .emulateTransitionEnd(p);
              } else
                o.default(a).removeClass(et),
                  o.default(c).addClass(et),
                  (this._isSliding = !1),
                  o.default(this._element).trigger(d);
              h && this.cycle();
            }
          }),
          (t._jQueryInterface = function (e) {
            return this.each(function () {
              var n = o.default(this).data(L),
                i = l({}, q, o.default(this).data());
              "object" == typeof e && (i = l({}, i, e));
              var r = "string" == typeof e ? e : i.slide;
              if (
                (n || ((n = new t(this, i)), o.default(this).data(L, n)),
                "number" == typeof e)
              )
                n.to(e);
              else if ("string" == typeof r) {
                if (void 0 === n[r])
                  throw new TypeError('No method named "' + r + '"');
                n[r]();
              } else i.interval && i.ride && (n.pause(), n.cycle());
            });
          }),
          (t._dataApiClickHandler = function (e) {
            var n = f.getSelectorFromElement(this);
            if (n) {
              var i = o.default(n)[0];
              if (i && o.default(i).hasClass("carousel")) {
                var r = l({}, o.default(i).data(), o.default(this).data()),
                  s = this.getAttribute("data-slide-to");
                s && (r.interval = !1),
                  t._jQueryInterface.call(o.default(i), r),
                  s && o.default(i).data(L).to(s),
                  e.preventDefault();
              }
            }
          }),
          a(t, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.6.0";
              },
            },
            {
              key: "Default",
              get: function () {
                return q;
              },
            },
          ]),
          t
        );
      })();
    o
      .default(document)
      .on(tt, "[data-slide], [data-slide-to]", ot._dataApiClickHandler),
      o.default(window).on(Z, function () {
        for (
          var t = [].slice.call(
              document.querySelectorAll('[data-ride="carousel"]')
            ),
            e = 0,
            n = t.length;
          e < n;
          e++
        ) {
          var i = o.default(t[e]);
          ot._jQueryInterface.call(i, i.data());
        }
      }),
      (o.default.fn[O] = ot._jQueryInterface),
      (o.default.fn[O].Constructor = ot),
      (o.default.fn[O].noConflict = function () {
        return (o.default.fn[O] = M), ot._jQueryInterface;
      });
    var rt = "collapse",
      st = "bs.collapse",
      at = "." + st,
      lt = o.default.fn[rt],
      ct = { toggle: !0, parent: "" },
      ut = { toggle: "boolean", parent: "(string|element)" },
      ft = "show" + at,
      ht = "shown" + at,
      dt = "hide" + at,
      pt = "hidden" + at,
      gt = "click" + at + ".data-api",
      mt = "show",
      vt = "collapse",
      bt = "collapsing",
      yt = "collapsed",
      _t = "width",
      wt = '[data-toggle="collapse"]',
      xt = (function () {
        function t(t, e) {
          (this._isTransitioning = !1),
            (this._element = t),
            (this._config = this._getConfig(e)),
            (this._triggerArray = [].slice.call(
              document.querySelectorAll(
                '[data-toggle="collapse"][href="#' +
                  t.id +
                  '"],[data-toggle="collapse"][data-target="#' +
                  t.id +
                  '"]'
              )
            ));
          for (
            var n = [].slice.call(document.querySelectorAll(wt)),
              i = 0,
              o = n.length;
            i < o;
            i++
          ) {
            var r = n[i],
              s = f.getSelectorFromElement(r),
              a = [].slice
                .call(document.querySelectorAll(s))
                .filter(function (e) {
                  return e === t;
                });
            null !== s &&
              a.length > 0 &&
              ((this._selector = s), this._triggerArray.push(r));
          }
          (this._parent = this._config.parent ? this._getParent() : null),
            this._config.parent ||
              this._addAriaAndCollapsedClass(this._element, this._triggerArray),
            this._config.toggle && this.toggle();
        }
        var e = t.prototype;
        return (
          (e.toggle = function () {
            o.default(this._element).hasClass(mt) ? this.hide() : this.show();
          }),
          (e.show = function () {
            var e,
              n,
              i = this;
            if (
              !this._isTransitioning &&
              !o.default(this._element).hasClass(mt) &&
              (this._parent &&
                0 ===
                  (e = [].slice
                    .call(this._parent.querySelectorAll(".show, .collapsing"))
                    .filter(function (t) {
                      return "string" == typeof i._config.parent
                        ? t.getAttribute("data-parent") === i._config.parent
                        : t.classList.contains(vt);
                    })).length &&
                (e = null),
              !(
                e &&
                (n = o.default(e).not(this._selector).data(st)) &&
                n._isTransitioning
              ))
            ) {
              var r = o.default.Event(ft);
              if (
                (o.default(this._element).trigger(r), !r.isDefaultPrevented())
              ) {
                e &&
                  (t._jQueryInterface.call(
                    o.default(e).not(this._selector),
                    "hide"
                  ),
                  n || o.default(e).data(st, null));
                var s = this._getDimension();
                o.default(this._element).removeClass(vt).addClass(bt),
                  (this._element.style[s] = 0),
                  this._triggerArray.length &&
                    o
                      .default(this._triggerArray)
                      .removeClass(yt)
                      .attr("aria-expanded", !0),
                  this.setTransitioning(!0);
                var a = "scroll" + (s[0].toUpperCase() + s.slice(1)),
                  l = f.getTransitionDurationFromElement(this._element);
                o
                  .default(this._element)
                  .one(f.TRANSITION_END, function () {
                    o
                      .default(i._element)
                      .removeClass(bt)
                      .addClass(vt + " " + mt),
                      (i._element.style[s] = ""),
                      i.setTransitioning(!1),
                      o.default(i._element).trigger(ht);
                  })
                  .emulateTransitionEnd(l),
                  (this._element.style[s] = this._element[a] + "px");
              }
            }
          }),
          (e.hide = function () {
            var t = this;
            if (
              !this._isTransitioning &&
              o.default(this._element).hasClass(mt)
            ) {
              var e = o.default.Event(dt);
              if (
                (o.default(this._element).trigger(e), !e.isDefaultPrevented())
              ) {
                var n = this._getDimension();
                (this._element.style[n] =
                  this._element.getBoundingClientRect()[n] + "px"),
                  f.reflow(this._element),
                  o
                    .default(this._element)
                    .addClass(bt)
                    .removeClass(vt + " " + mt);
                var i = this._triggerArray.length;
                if (i > 0)
                  for (var r = 0; r < i; r++) {
                    var s = this._triggerArray[r],
                      a = f.getSelectorFromElement(s);
                    if (null !== a)
                      o
                        .default([].slice.call(document.querySelectorAll(a)))
                        .hasClass(mt) ||
                        o.default(s).addClass(yt).attr("aria-expanded", !1);
                  }
                this.setTransitioning(!0);
                this._element.style[n] = "";
                var l = f.getTransitionDurationFromElement(this._element);
                o.default(this._element)
                  .one(f.TRANSITION_END, function () {
                    t.setTransitioning(!1),
                      o
                        .default(t._element)
                        .removeClass(bt)
                        .addClass(vt)
                        .trigger(pt);
                  })
                  .emulateTransitionEnd(l);
              }
            }
          }),
          (e.setTransitioning = function (t) {
            this._isTransitioning = t;
          }),
          (e.dispose = function () {
            o.default.removeData(this._element, st),
              (this._config = null),
              (this._parent = null),
              (this._element = null),
              (this._triggerArray = null),
              (this._isTransitioning = null);
          }),
          (e._getConfig = function (t) {
            return (
              ((t = l({}, ct, t)).toggle = Boolean(t.toggle)),
              f.typeCheckConfig(rt, t, ut),
              t
            );
          }),
          (e._getDimension = function () {
            return o.default(this._element).hasClass(_t) ? _t : "height";
          }),
          (e._getParent = function () {
            var e,
              n = this;
            f.isElement(this._config.parent)
              ? ((e = this._config.parent),
                void 0 !== this._config.parent.jquery &&
                  (e = this._config.parent[0]))
              : (e = document.querySelector(this._config.parent));
            var i =
                '[data-toggle="collapse"][data-parent="' +
                this._config.parent +
                '"]',
              r = [].slice.call(e.querySelectorAll(i));
            return (
              o.default(r).each(function (e, i) {
                n._addAriaAndCollapsedClass(t._getTargetFromElement(i), [i]);
              }),
              e
            );
          }),
          (e._addAriaAndCollapsedClass = function (t, e) {
            var n = o.default(t).hasClass(mt);
            e.length &&
              o.default(e).toggleClass(yt, !n).attr("aria-expanded", n);
          }),
          (t._getTargetFromElement = function (t) {
            var e = f.getSelectorFromElement(t);
            return e ? document.querySelector(e) : null;
          }),
          (t._jQueryInterface = function (e) {
            return this.each(function () {
              var n = o.default(this),
                i = n.data(st),
                r = l({}, ct, n.data(), "object" == typeof e && e ? e : {});
              if (
                (!i &&
                  r.toggle &&
                  "string" == typeof e &&
                  /show|hide/.test(e) &&
                  (r.toggle = !1),
                i || ((i = new t(this, r)), n.data(st, i)),
                "string" == typeof e)
              ) {
                if (void 0 === i[e])
                  throw new TypeError('No method named "' + e + '"');
                i[e]();
              }
            });
          }),
          a(t, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.6.0";
              },
            },
            {
              key: "Default",
              get: function () {
                return ct;
              },
            },
          ]),
          t
        );
      })();
    o.default(document).on(gt, wt, function (t) {
      "A" === t.currentTarget.tagName && t.preventDefault();
      var e = o.default(this),
        n = f.getSelectorFromElement(this),
        i = [].slice.call(document.querySelectorAll(n));
      o.default(i).each(function () {
        var t = o.default(this),
          n = t.data(st) ? "toggle" : e.data();
        xt._jQueryInterface.call(t, n);
      });
    }),
      (o.default.fn[rt] = xt._jQueryInterface),
      (o.default.fn[rt].Constructor = xt),
      (o.default.fn[rt].noConflict = function () {
        return (o.default.fn[rt] = lt), xt._jQueryInterface;
      });
    var Ct = "dropdown",
      Et = "bs.dropdown",
      Tt = "." + Et,
      St = ".data-api",
      kt = o.default.fn[Ct],
      Pt = new RegExp("38|40|27"),
      Nt = "hide" + Tt,
      Dt = "hidden" + Tt,
      At = "show" + Tt,
      It = "shown" + Tt,
      Ot = "click" + Tt,
      Lt = "click" + Tt + St,
      jt = "keydown" + Tt + St,
      Ht = "keyup" + Tt + St,
      Mt = "disabled",
      qt = "show",
      Rt = "dropdown-menu-right",
      Bt = '[data-toggle="dropdown"]',
      Ft = ".dropdown-menu",
      Wt = {
        offset: 0,
        flip: !0,
        boundary: "scrollParent",
        reference: "toggle",
        display: "dynamic",
        popperConfig: null,
      },
      zt = {
        offset: "(number|string|function)",
        flip: "boolean",
        boundary: "(string|element)",
        reference: "(string|element)",
        display: "string",
        popperConfig: "(null|object)",
      },
      Ut = (function () {
        function t(t, e) {
          (this._element = t),
            (this._popper = null),
            (this._config = this._getConfig(e)),
            (this._menu = this._getMenuElement()),
            (this._inNavbar = this._detectNavbar()),
            this._addEventListeners();
        }
        var e = t.prototype;
        return (
          (e.toggle = function () {
            if (
              !this._element.disabled &&
              !o.default(this._element).hasClass(Mt)
            ) {
              var e = o.default(this._menu).hasClass(qt);
              t._clearMenus(), e || this.show(!0);
            }
          }),
          (e.show = function (e) {
            if (
              (void 0 === e && (e = !1),
              !(
                this._element.disabled ||
                o.default(this._element).hasClass(Mt) ||
                o.default(this._menu).hasClass(qt)
              ))
            ) {
              var n = { relatedTarget: this._element },
                i = o.default.Event(At, n),
                s = t._getParentFromElement(this._element);
              if ((o.default(s).trigger(i), !i.isDefaultPrevented())) {
                if (!this._inNavbar && e) {
                  if (void 0 === r.default)
                    throw new TypeError(
                      "Bootstrap's dropdowns require Popper (https://popper.js.org)"
                    );
                  var a = this._element;
                  "parent" === this._config.reference
                    ? (a = s)
                    : f.isElement(this._config.reference) &&
                      ((a = this._config.reference),
                      void 0 !== this._config.reference.jquery &&
                        (a = this._config.reference[0])),
                    "scrollParent" !== this._config.boundary &&
                      o.default(s).addClass("position-static"),
                    (this._popper = new r.default(
                      a,
                      this._menu,
                      this._getPopperConfig()
                    ));
                }
                "ontouchstart" in document.documentElement &&
                  0 === o.default(s).closest(".navbar-nav").length &&
                  o
                    .default(document.body)
                    .children()
                    .on("mouseover", null, o.default.noop),
                  this._element.focus(),
                  this._element.setAttribute("aria-expanded", !0),
                  o.default(this._menu).toggleClass(qt),
                  o.default(s).toggleClass(qt).trigger(o.default.Event(It, n));
              }
            }
          }),
          (e.hide = function () {
            if (
              !this._element.disabled &&
              !o.default(this._element).hasClass(Mt) &&
              o.default(this._menu).hasClass(qt)
            ) {
              var e = { relatedTarget: this._element },
                n = o.default.Event(Nt, e),
                i = t._getParentFromElement(this._element);
              o.default(i).trigger(n),
                n.isDefaultPrevented() ||
                  (this._popper && this._popper.destroy(),
                  o.default(this._menu).toggleClass(qt),
                  o.default(i).toggleClass(qt).trigger(o.default.Event(Dt, e)));
            }
          }),
          (e.dispose = function () {
            o.default.removeData(this._element, Et),
              o.default(this._element).off(Tt),
              (this._element = null),
              (this._menu = null),
              null !== this._popper &&
                (this._popper.destroy(), (this._popper = null));
          }),
          (e.update = function () {
            (this._inNavbar = this._detectNavbar()),
              null !== this._popper && this._popper.scheduleUpdate();
          }),
          (e._addEventListeners = function () {
            var t = this;
            o.default(this._element).on(Ot, function (e) {
              e.preventDefault(), e.stopPropagation(), t.toggle();
            });
          }),
          (e._getConfig = function (t) {
            return (
              (t = l(
                {},
                this.constructor.Default,
                o.default(this._element).data(),
                t
              )),
              f.typeCheckConfig(Ct, t, this.constructor.DefaultType),
              t
            );
          }),
          (e._getMenuElement = function () {
            if (!this._menu) {
              var e = t._getParentFromElement(this._element);
              e && (this._menu = e.querySelector(Ft));
            }
            return this._menu;
          }),
          (e._getPlacement = function () {
            var t = o.default(this._element.parentNode),
              e = "bottom-start";
            return (
              t.hasClass("dropup")
                ? (e = o.default(this._menu).hasClass(Rt)
                    ? "top-end"
                    : "top-start")
                : t.hasClass("dropright")
                ? (e = "right-start")
                : t.hasClass("dropleft")
                ? (e = "left-start")
                : o.default(this._menu).hasClass(Rt) && (e = "bottom-end"),
              e
            );
          }),
          (e._detectNavbar = function () {
            return o.default(this._element).closest(".navbar").length > 0;
          }),
          (e._getOffset = function () {
            var t = this,
              e = {};
            return (
              "function" == typeof this._config.offset
                ? (e.fn = function (e) {
                    return (
                      (e.offsets = l(
                        {},
                        e.offsets,
                        t._config.offset(e.offsets, t._element) || {}
                      )),
                      e
                    );
                  })
                : (e.offset = this._config.offset),
              e
            );
          }),
          (e._getPopperConfig = function () {
            var t = {
              placement: this._getPlacement(),
              modifiers: {
                offset: this._getOffset(),
                flip: { enabled: this._config.flip },
                preventOverflow: { boundariesElement: this._config.boundary },
              },
            };
            return (
              "static" === this._config.display &&
                (t.modifiers.applyStyle = { enabled: !1 }),
              l({}, t, this._config.popperConfig)
            );
          }),
          (t._jQueryInterface = function (e) {
            return this.each(function () {
              var n = o.default(this).data(Et);
              if (
                (n ||
                  ((n = new t(this, "object" == typeof e ? e : null)),
                  o.default(this).data(Et, n)),
                "string" == typeof e)
              ) {
                if (void 0 === n[e])
                  throw new TypeError('No method named "' + e + '"');
                n[e]();
              }
            });
          }),
          (t._clearMenus = function (e) {
            if (!e || (3 !== e.which && ("keyup" !== e.type || 9 === e.which)))
              for (
                var n = [].slice.call(document.querySelectorAll(Bt)),
                  i = 0,
                  r = n.length;
                i < r;
                i++
              ) {
                var s = t._getParentFromElement(n[i]),
                  a = o.default(n[i]).data(Et),
                  l = { relatedTarget: n[i] };
                if ((e && "click" === e.type && (l.clickEvent = e), a)) {
                  var c = a._menu;
                  if (
                    o.default(s).hasClass(qt) &&
                    !(
                      e &&
                      (("click" === e.type &&
                        /input|textarea/i.test(e.target.tagName)) ||
                        ("keyup" === e.type && 9 === e.which)) &&
                      o.default.contains(s, e.target)
                    )
                  ) {
                    var u = o.default.Event(Nt, l);
                    o.default(s).trigger(u),
                      u.isDefaultPrevented() ||
                        ("ontouchstart" in document.documentElement &&
                          o
                            .default(document.body)
                            .children()
                            .off("mouseover", null, o.default.noop),
                        n[i].setAttribute("aria-expanded", "false"),
                        a._popper && a._popper.destroy(),
                        o.default(c).removeClass(qt),
                        o
                          .default(s)
                          .removeClass(qt)
                          .trigger(o.default.Event(Dt, l)));
                  }
                }
              }
          }),
          (t._getParentFromElement = function (t) {
            var e,
              n = f.getSelectorFromElement(t);
            return n && (e = document.querySelector(n)), e || t.parentNode;
          }),
          (t._dataApiKeydownHandler = function (e) {
            if (
              !(/input|textarea/i.test(e.target.tagName)
                ? 32 === e.which ||
                  (27 !== e.which &&
                    ((40 !== e.which && 38 !== e.which) ||
                      o.default(e.target).closest(Ft).length))
                : !Pt.test(e.which)) &&
              !this.disabled &&
              !o.default(this).hasClass(Mt)
            ) {
              var n = t._getParentFromElement(this),
                i = o.default(n).hasClass(qt);
              if (i || 27 !== e.which) {
                if (
                  (e.preventDefault(),
                  e.stopPropagation(),
                  !i || 27 === e.which || 32 === e.which)
                )
                  return (
                    27 === e.which &&
                      o.default(n.querySelector(Bt)).trigger("focus"),
                    void o.default(this).trigger("click")
                  );
                var r = [].slice
                  .call(
                    n.querySelectorAll(
                      ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)"
                    )
                  )
                  .filter(function (t) {
                    return o.default(t).is(":visible");
                  });
                if (0 !== r.length) {
                  var s = r.indexOf(e.target);
                  38 === e.which && s > 0 && s--,
                    40 === e.which && s < r.length - 1 && s++,
                    s < 0 && (s = 0),
                    r[s].focus();
                }
              }
            }
          }),
          a(t, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.6.0";
              },
            },
            {
              key: "Default",
              get: function () {
                return Wt;
              },
            },
            {
              key: "DefaultType",
              get: function () {
                return zt;
              },
            },
          ]),
          t
        );
      })();
    o
      .default(document)
      .on(jt, Bt, Ut._dataApiKeydownHandler)
      .on(jt, Ft, Ut._dataApiKeydownHandler)
      .on(Lt + " " + Ht, Ut._clearMenus)
      .on(Lt, Bt, function (t) {
        t.preventDefault(),
          t.stopPropagation(),
          Ut._jQueryInterface.call(o.default(this), "toggle");
      })
      .on(Lt, ".dropdown form", function (t) {
        t.stopPropagation();
      }),
      (o.default.fn[Ct] = Ut._jQueryInterface),
      (o.default.fn[Ct].Constructor = Ut),
      (o.default.fn[Ct].noConflict = function () {
        return (o.default.fn[Ct] = kt), Ut._jQueryInterface;
      });
    var Yt = "modal",
      Vt = "bs.modal",
      Xt = "." + Vt,
      Qt = o.default.fn[Yt],
      $t = { backdrop: !0, keyboard: !0, focus: !0, show: !0 },
      Kt = {
        backdrop: "(boolean|string)",
        keyboard: "boolean",
        focus: "boolean",
        show: "boolean",
      },
      Gt = "hide" + Xt,
      Jt = "hidePrevented" + Xt,
      Zt = "hidden" + Xt,
      te = "show" + Xt,
      ee = "shown" + Xt,
      ne = "focusin" + Xt,
      ie = "resize" + Xt,
      oe = "click.dismiss" + Xt,
      re = "keydown.dismiss" + Xt,
      se = "mouseup.dismiss" + Xt,
      ae = "mousedown.dismiss" + Xt,
      le = "click" + Xt + ".data-api",
      ce = "modal-open",
      ue = "fade",
      fe = "show",
      he = "modal-static",
      de = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
      pe = ".sticky-top",
      ge = (function () {
        function t(t, e) {
          (this._config = this._getConfig(e)),
            (this._element = t),
            (this._dialog = t.querySelector(".modal-dialog")),
            (this._backdrop = null),
            (this._isShown = !1),
            (this._isBodyOverflowing = !1),
            (this._ignoreBackdropClick = !1),
            (this._isTransitioning = !1),
            (this._scrollbarWidth = 0);
        }
        var e = t.prototype;
        return (
          (e.toggle = function (t) {
            return this._isShown ? this.hide() : this.show(t);
          }),
          (e.show = function (t) {
            var e = this;
            if (!this._isShown && !this._isTransitioning) {
              o.default(this._element).hasClass(ue) &&
                (this._isTransitioning = !0);
              var n = o.default.Event(te, { relatedTarget: t });
              o.default(this._element).trigger(n),
                this._isShown ||
                  n.isDefaultPrevented() ||
                  ((this._isShown = !0),
                  this._checkScrollbar(),
                  this._setScrollbar(),
                  this._adjustDialog(),
                  this._setEscapeEvent(),
                  this._setResizeEvent(),
                  o
                    .default(this._element)
                    .on(oe, '[data-dismiss="modal"]', function (t) {
                      return e.hide(t);
                    }),
                  o.default(this._dialog).on(ae, function () {
                    o.default(e._element).one(se, function (t) {
                      o.default(t.target).is(e._element) &&
                        (e._ignoreBackdropClick = !0);
                    });
                  }),
                  this._showBackdrop(function () {
                    return e._showElement(t);
                  }));
            }
          }),
          (e.hide = function (t) {
            var e = this;
            if (
              (t && t.preventDefault(), this._isShown && !this._isTransitioning)
            ) {
              var n = o.default.Event(Gt);
              if (
                (o.default(this._element).trigger(n),
                this._isShown && !n.isDefaultPrevented())
              ) {
                this._isShown = !1;
                var i = o.default(this._element).hasClass(ue);
                if (
                  (i && (this._isTransitioning = !0),
                  this._setEscapeEvent(),
                  this._setResizeEvent(),
                  o.default(document).off(ne),
                  o.default(this._element).removeClass(fe),
                  o.default(this._element).off(oe),
                  o.default(this._dialog).off(ae),
                  i)
                ) {
                  var r = f.getTransitionDurationFromElement(this._element);
                  o.default(this._element)
                    .one(f.TRANSITION_END, function (t) {
                      return e._hideModal(t);
                    })
                    .emulateTransitionEnd(r);
                } else this._hideModal();
              }
            }
          }),
          (e.dispose = function () {
            [window, this._element, this._dialog].forEach(function (t) {
              return o.default(t).off(Xt);
            }),
              o.default(document).off(ne),
              o.default.removeData(this._element, Vt),
              (this._config = null),
              (this._element = null),
              (this._dialog = null),
              (this._backdrop = null),
              (this._isShown = null),
              (this._isBodyOverflowing = null),
              (this._ignoreBackdropClick = null),
              (this._isTransitioning = null),
              (this._scrollbarWidth = null);
          }),
          (e.handleUpdate = function () {
            this._adjustDialog();
          }),
          (e._getConfig = function (t) {
            return (t = l({}, $t, t)), f.typeCheckConfig(Yt, t, Kt), t;
          }),
          (e._triggerBackdropTransition = function () {
            var t = this,
              e = o.default.Event(Jt);
            if (
              (o.default(this._element).trigger(e), !e.isDefaultPrevented())
            ) {
              var n =
                this._element.scrollHeight >
                document.documentElement.clientHeight;
              n || (this._element.style.overflowY = "hidden"),
                this._element.classList.add(he);
              var i = f.getTransitionDurationFromElement(this._dialog);
              o.default(this._element).off(f.TRANSITION_END),
                o
                  .default(this._element)
                  .one(f.TRANSITION_END, function () {
                    t._element.classList.remove(he),
                      n ||
                        o
                          .default(t._element)
                          .one(f.TRANSITION_END, function () {
                            t._element.style.overflowY = "";
                          })
                          .emulateTransitionEnd(t._element, i);
                  })
                  .emulateTransitionEnd(i),
                this._element.focus();
            }
          }),
          (e._showElement = function (t) {
            var e = this,
              n = o.default(this._element).hasClass(ue),
              i = this._dialog
                ? this._dialog.querySelector(".modal-body")
                : null;
            (this._element.parentNode &&
              this._element.parentNode.nodeType === Node.ELEMENT_NODE) ||
              document.body.appendChild(this._element),
              (this._element.style.display = "block"),
              this._element.removeAttribute("aria-hidden"),
              this._element.setAttribute("aria-modal", !0),
              this._element.setAttribute("role", "dialog"),
              o.default(this._dialog).hasClass("modal-dialog-scrollable") && i
                ? (i.scrollTop = 0)
                : (this._element.scrollTop = 0),
              n && f.reflow(this._element),
              o.default(this._element).addClass(fe),
              this._config.focus && this._enforceFocus();
            var r = o.default.Event(ee, { relatedTarget: t }),
              s = function () {
                e._config.focus && e._element.focus(),
                  (e._isTransitioning = !1),
                  o.default(e._element).trigger(r);
              };
            if (n) {
              var a = f.getTransitionDurationFromElement(this._dialog);
              o.default(this._dialog)
                .one(f.TRANSITION_END, s)
                .emulateTransitionEnd(a);
            } else s();
          }),
          (e._enforceFocus = function () {
            var t = this;
            o.default(document)
              .off(ne)
              .on(ne, function (e) {
                document !== e.target &&
                  t._element !== e.target &&
                  0 === o.default(t._element).has(e.target).length &&
                  t._element.focus();
              });
          }),
          (e._setEscapeEvent = function () {
            var t = this;
            this._isShown
              ? o.default(this._element).on(re, function (e) {
                  t._config.keyboard && 27 === e.which
                    ? (e.preventDefault(), t.hide())
                    : t._config.keyboard ||
                      27 !== e.which ||
                      t._triggerBackdropTransition();
                })
              : this._isShown || o.default(this._element).off(re);
          }),
          (e._setResizeEvent = function () {
            var t = this;
            this._isShown
              ? o.default(window).on(ie, function (e) {
                  return t.handleUpdate(e);
                })
              : o.default(window).off(ie);
          }),
          (e._hideModal = function () {
            var t = this;
            (this._element.style.display = "none"),
              this._element.setAttribute("aria-hidden", !0),
              this._element.removeAttribute("aria-modal"),
              this._element.removeAttribute("role"),
              (this._isTransitioning = !1),
              this._showBackdrop(function () {
                o.default(document.body).removeClass(ce),
                  t._resetAdjustments(),
                  t._resetScrollbar(),
                  o.default(t._element).trigger(Zt);
              });
          }),
          (e._removeBackdrop = function () {
            this._backdrop &&
              (o.default(this._backdrop).remove(), (this._backdrop = null));
          }),
          (e._showBackdrop = function (t) {
            var e = this,
              n = o.default(this._element).hasClass(ue) ? ue : "";
            if (this._isShown && this._config.backdrop) {
              if (
                ((this._backdrop = document.createElement("div")),
                (this._backdrop.className = "modal-backdrop"),
                n && this._backdrop.classList.add(n),
                o.default(this._backdrop).appendTo(document.body),
                o.default(this._element).on(oe, function (t) {
                  e._ignoreBackdropClick
                    ? (e._ignoreBackdropClick = !1)
                    : t.target === t.currentTarget &&
                      ("static" === e._config.backdrop
                        ? e._triggerBackdropTransition()
                        : e.hide());
                }),
                n && f.reflow(this._backdrop),
                o.default(this._backdrop).addClass(fe),
                !t)
              )
                return;
              if (!n) return void t();
              var i = f.getTransitionDurationFromElement(this._backdrop);
              o.default(this._backdrop)
                .one(f.TRANSITION_END, t)
                .emulateTransitionEnd(i);
            } else if (!this._isShown && this._backdrop) {
              o.default(this._backdrop).removeClass(fe);
              var r = function () {
                e._removeBackdrop(), t && t();
              };
              if (o.default(this._element).hasClass(ue)) {
                var s = f.getTransitionDurationFromElement(this._backdrop);
                o.default(this._backdrop)
                  .one(f.TRANSITION_END, r)
                  .emulateTransitionEnd(s);
              } else r();
            } else t && t();
          }),
          (e._adjustDialog = function () {
            var t =
              this._element.scrollHeight >
              document.documentElement.clientHeight;
            !this._isBodyOverflowing &&
              t &&
              (this._element.style.paddingLeft = this._scrollbarWidth + "px"),
              this._isBodyOverflowing &&
                !t &&
                (this._element.style.paddingRight =
                  this._scrollbarWidth + "px");
          }),
          (e._resetAdjustments = function () {
            (this._element.style.paddingLeft = ""),
              (this._element.style.paddingRight = "");
          }),
          (e._checkScrollbar = function () {
            var t = document.body.getBoundingClientRect();
            (this._isBodyOverflowing =
              Math.round(t.left + t.right) < window.innerWidth),
              (this._scrollbarWidth = this._getScrollbarWidth());
          }),
          (e._setScrollbar = function () {
            var t = this;
            if (this._isBodyOverflowing) {
              var e = [].slice.call(document.querySelectorAll(de)),
                n = [].slice.call(document.querySelectorAll(pe));
              o.default(e).each(function (e, n) {
                var i = n.style.paddingRight,
                  r = o.default(n).css("padding-right");
                o.default(n)
                  .data("padding-right", i)
                  .css(
                    "padding-right",
                    parseFloat(r) + t._scrollbarWidth + "px"
                  );
              }),
                o.default(n).each(function (e, n) {
                  var i = n.style.marginRight,
                    r = o.default(n).css("margin-right");
                  o.default(n)
                    .data("margin-right", i)
                    .css(
                      "margin-right",
                      parseFloat(r) - t._scrollbarWidth + "px"
                    );
                });
              var i = document.body.style.paddingRight,
                r = o.default(document.body).css("padding-right");
              o.default(document.body)
                .data("padding-right", i)
                .css(
                  "padding-right",
                  parseFloat(r) + this._scrollbarWidth + "px"
                );
            }
            o.default(document.body).addClass(ce);
          }),
          (e._resetScrollbar = function () {
            var t = [].slice.call(document.querySelectorAll(de));
            o.default(t).each(function (t, e) {
              var n = o.default(e).data("padding-right");
              o.default(e).removeData("padding-right"),
                (e.style.paddingRight = n || "");
            });
            var e = [].slice.call(document.querySelectorAll("" + pe));
            o.default(e).each(function (t, e) {
              var n = o.default(e).data("margin-right");
              void 0 !== n &&
                o.default(e).css("margin-right", n).removeData("margin-right");
            });
            var n = o.default(document.body).data("padding-right");
            o.default(document.body).removeData("padding-right"),
              (document.body.style.paddingRight = n || "");
          }),
          (e._getScrollbarWidth = function () {
            var t = document.createElement("div");
            (t.className = "modal-scrollbar-measure"),
              document.body.appendChild(t);
            var e = t.getBoundingClientRect().width - t.clientWidth;
            return document.body.removeChild(t), e;
          }),
          (t._jQueryInterface = function (e, n) {
            return this.each(function () {
              var i = o.default(this).data(Vt),
                r = l(
                  {},
                  $t,
                  o.default(this).data(),
                  "object" == typeof e && e ? e : {}
                );
              if (
                (i || ((i = new t(this, r)), o.default(this).data(Vt, i)),
                "string" == typeof e)
              ) {
                if (void 0 === i[e])
                  throw new TypeError('No method named "' + e + '"');
                i[e](n);
              } else r.show && i.show(n);
            });
          }),
          a(t, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.6.0";
              },
            },
            {
              key: "Default",
              get: function () {
                return $t;
              },
            },
          ]),
          t
        );
      })();
    o.default(document).on(le, '[data-toggle="modal"]', function (t) {
      var e,
        n = this,
        i = f.getSelectorFromElement(this);
      i && (e = document.querySelector(i));
      var r = o.default(e).data(Vt)
        ? "toggle"
        : l({}, o.default(e).data(), o.default(this).data());
      ("A" !== this.tagName && "AREA" !== this.tagName) || t.preventDefault();
      var s = o.default(e).one(te, function (t) {
        t.isDefaultPrevented() ||
          s.one(Zt, function () {
            o.default(n).is(":visible") && n.focus();
          });
      });
      ge._jQueryInterface.call(o.default(e), r, this);
    }),
      (o.default.fn[Yt] = ge._jQueryInterface),
      (o.default.fn[Yt].Constructor = ge),
      (o.default.fn[Yt].noConflict = function () {
        return (o.default.fn[Yt] = Qt), ge._jQueryInterface;
      });
    var me = [
        "background",
        "cite",
        "href",
        "itemtype",
        "longdesc",
        "poster",
        "src",
        "xlink:href",
      ],
      ve = {
        "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
        a: ["target", "href", "title", "rel"],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        div: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: ["src", "srcset", "alt", "title", "width", "height"],
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: [],
      },
      be = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi,
      ye =
        /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;
    function _e(t, e, n) {
      if (0 === t.length) return t;
      if (n && "function" == typeof n) return n(t);
      for (
        var i = new window.DOMParser().parseFromString(t, "text/html"),
          o = Object.keys(e),
          r = [].slice.call(i.body.querySelectorAll("*")),
          s = function (t, n) {
            var i = r[t],
              s = i.nodeName.toLowerCase();
            if (-1 === o.indexOf(i.nodeName.toLowerCase()))
              return i.parentNode.removeChild(i), "continue";
            var a = [].slice.call(i.attributes),
              l = [].concat(e["*"] || [], e[s] || []);
            a.forEach(function (t) {
              (function (t, e) {
                var n = t.nodeName.toLowerCase();
                if (-1 !== e.indexOf(n))
                  return (
                    -1 === me.indexOf(n) ||
                    Boolean(t.nodeValue.match(be) || t.nodeValue.match(ye))
                  );
                for (
                  var i = e.filter(function (t) {
                      return t instanceof RegExp;
                    }),
                    o = 0,
                    r = i.length;
                  o < r;
                  o++
                )
                  if (n.match(i[o])) return !0;
                return !1;
              })(t, l) || i.removeAttribute(t.nodeName);
            });
          },
          a = 0,
          l = r.length;
        a < l;
        a++
      )
        s(a);
      return i.body.innerHTML;
    }
    var we = "tooltip",
      xe = "bs.tooltip",
      Ce = "." + xe,
      Ee = o.default.fn[we],
      Te = "bs-tooltip",
      Se = new RegExp("(^|\\s)" + Te + "\\S+", "g"),
      ke = ["sanitize", "whiteList", "sanitizeFn"],
      Pe = {
        animation: "boolean",
        template: "string",
        title: "(string|element|function)",
        trigger: "string",
        delay: "(number|object)",
        html: "boolean",
        selector: "(string|boolean)",
        placement: "(string|function)",
        offset: "(number|string|function)",
        container: "(string|element|boolean)",
        fallbackPlacement: "(string|array)",
        boundary: "(string|element)",
        customClass: "(string|function)",
        sanitize: "boolean",
        sanitizeFn: "(null|function)",
        whiteList: "object",
        popperConfig: "(null|object)",
      },
      Ne = {
        AUTO: "auto",
        TOP: "top",
        RIGHT: "right",
        BOTTOM: "bottom",
        LEFT: "left",
      },
      De = {
        animation: !0,
        template:
          '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        selector: !1,
        placement: "top",
        offset: 0,
        container: !1,
        fallbackPlacement: "flip",
        boundary: "scrollParent",
        customClass: "",
        sanitize: !0,
        sanitizeFn: null,
        whiteList: ve,
        popperConfig: null,
      },
      Ae = "show",
      Ie = "out",
      Oe = {
        HIDE: "hide" + Ce,
        HIDDEN: "hidden" + Ce,
        SHOW: "show" + Ce,
        SHOWN: "shown" + Ce,
        INSERTED: "inserted" + Ce,
        CLICK: "click" + Ce,
        FOCUSIN: "focusin" + Ce,
        FOCUSOUT: "focusout" + Ce,
        MOUSEENTER: "mouseenter" + Ce,
        MOUSELEAVE: "mouseleave" + Ce,
      },
      Le = "fade",
      je = "show",
      He = "hover",
      Me = "focus",
      qe = (function () {
        function t(t, e) {
          if (void 0 === r.default)
            throw new TypeError(
              "Bootstrap's tooltips require Popper (https://popper.js.org)"
            );
          (this._isEnabled = !0),
            (this._timeout = 0),
            (this._hoverState = ""),
            (this._activeTrigger = {}),
            (this._popper = null),
            (this.element = t),
            (this.config = this._getConfig(e)),
            (this.tip = null),
            this._setListeners();
        }
        var e = t.prototype;
        return (
          (e.enable = function () {
            this._isEnabled = !0;
          }),
          (e.disable = function () {
            this._isEnabled = !1;
          }),
          (e.toggleEnabled = function () {
            this._isEnabled = !this._isEnabled;
          }),
          (e.toggle = function (t) {
            if (this._isEnabled)
              if (t) {
                var e = this.constructor.DATA_KEY,
                  n = o.default(t.currentTarget).data(e);
                n ||
                  ((n = new this.constructor(
                    t.currentTarget,
                    this._getDelegateConfig()
                  )),
                  o.default(t.currentTarget).data(e, n)),
                  (n._activeTrigger.click = !n._activeTrigger.click),
                  n._isWithActiveTrigger()
                    ? n._enter(null, n)
                    : n._leave(null, n);
              } else {
                if (o.default(this.getTipElement()).hasClass(je))
                  return void this._leave(null, this);
                this._enter(null, this);
              }
          }),
          (e.dispose = function () {
            clearTimeout(this._timeout),
              o.default.removeData(this.element, this.constructor.DATA_KEY),
              o.default(this.element).off(this.constructor.EVENT_KEY),
              o
                .default(this.element)
                .closest(".modal")
                .off("hide.bs.modal", this._hideModalHandler),
              this.tip && o.default(this.tip).remove(),
              (this._isEnabled = null),
              (this._timeout = null),
              (this._hoverState = null),
              (this._activeTrigger = null),
              this._popper && this._popper.destroy(),
              (this._popper = null),
              (this.element = null),
              (this.config = null),
              (this.tip = null);
          }),
          (e.show = function () {
            var t = this;
            if ("none" === o.default(this.element).css("display"))
              throw new Error("Please use show on visible elements");
            var e = o.default.Event(this.constructor.Event.SHOW);
            if (this.isWithContent() && this._isEnabled) {
              o.default(this.element).trigger(e);
              var n = f.findShadowRoot(this.element),
                i = o.default.contains(
                  null !== n ? n : this.element.ownerDocument.documentElement,
                  this.element
                );
              if (e.isDefaultPrevented() || !i) return;
              var s = this.getTipElement(),
                a = f.getUID(this.constructor.NAME);
              s.setAttribute("id", a),
                this.element.setAttribute("aria-describedby", a),
                this.setContent(),
                this.config.animation && o.default(s).addClass(Le);
              var l =
                  "function" == typeof this.config.placement
                    ? this.config.placement.call(this, s, this.element)
                    : this.config.placement,
                c = this._getAttachment(l);
              this.addAttachmentClass(c);
              var u = this._getContainer();
              o.default(s).data(this.constructor.DATA_KEY, this),
                o.default.contains(
                  this.element.ownerDocument.documentElement,
                  this.tip
                ) || o.default(s).appendTo(u),
                o
                  .default(this.element)
                  .trigger(this.constructor.Event.INSERTED),
                (this._popper = new r.default(
                  this.element,
                  s,
                  this._getPopperConfig(c)
                )),
                o.default(s).addClass(je),
                o.default(s).addClass(this.config.customClass),
                "ontouchstart" in document.documentElement &&
                  o
                    .default(document.body)
                    .children()
                    .on("mouseover", null, o.default.noop);
              var h = function () {
                t.config.animation && t._fixTransition();
                var e = t._hoverState;
                (t._hoverState = null),
                  o.default(t.element).trigger(t.constructor.Event.SHOWN),
                  e === Ie && t._leave(null, t);
              };
              if (o.default(this.tip).hasClass(Le)) {
                var d = f.getTransitionDurationFromElement(this.tip);
                o.default(this.tip)
                  .one(f.TRANSITION_END, h)
                  .emulateTransitionEnd(d);
              } else h();
            }
          }),
          (e.hide = function (t) {
            var e = this,
              n = this.getTipElement(),
              i = o.default.Event(this.constructor.Event.HIDE),
              r = function () {
                e._hoverState !== Ae &&
                  n.parentNode &&
                  n.parentNode.removeChild(n),
                  e._cleanTipClass(),
                  e.element.removeAttribute("aria-describedby"),
                  o.default(e.element).trigger(e.constructor.Event.HIDDEN),
                  null !== e._popper && e._popper.destroy(),
                  t && t();
              };
            if ((o.default(this.element).trigger(i), !i.isDefaultPrevented())) {
              if (
                (o.default(n).removeClass(je),
                "ontouchstart" in document.documentElement &&
                  o
                    .default(document.body)
                    .children()
                    .off("mouseover", null, o.default.noop),
                (this._activeTrigger.click = !1),
                (this._activeTrigger[Me] = !1),
                (this._activeTrigger[He] = !1),
                o.default(this.tip).hasClass(Le))
              ) {
                var s = f.getTransitionDurationFromElement(n);
                o.default(n).one(f.TRANSITION_END, r).emulateTransitionEnd(s);
              } else r();
              this._hoverState = "";
            }
          }),
          (e.update = function () {
            null !== this._popper && this._popper.scheduleUpdate();
          }),
          (e.isWithContent = function () {
            return Boolean(this.getTitle());
          }),
          (e.addAttachmentClass = function (t) {
            o.default(this.getTipElement()).addClass(Te + "-" + t);
          }),
          (e.getTipElement = function () {
            return (
              (this.tip = this.tip || o.default(this.config.template)[0]),
              this.tip
            );
          }),
          (e.setContent = function () {
            var t = this.getTipElement();
            this.setElementContent(
              o.default(t.querySelectorAll(".tooltip-inner")),
              this.getTitle()
            ),
              o.default(t).removeClass(Le + " " + je);
          }),
          (e.setElementContent = function (t, e) {
            "object" != typeof e || (!e.nodeType && !e.jquery)
              ? this.config.html
                ? (this.config.sanitize &&
                    (e = _e(e, this.config.whiteList, this.config.sanitizeFn)),
                  t.html(e))
                : t.text(e)
              : this.config.html
              ? o.default(e).parent().is(t) || t.empty().append(e)
              : t.text(o.default(e).text());
          }),
          (e.getTitle = function () {
            var t = this.element.getAttribute("data-original-title");
            return (
              t ||
                (t =
                  "function" == typeof this.config.title
                    ? this.config.title.call(this.element)
                    : this.config.title),
              t
            );
          }),
          (e._getPopperConfig = function (t) {
            var e = this;
            return l(
              {},
              {
                placement: t,
                modifiers: {
                  offset: this._getOffset(),
                  flip: { behavior: this.config.fallbackPlacement },
                  arrow: { element: ".arrow" },
                  preventOverflow: { boundariesElement: this.config.boundary },
                },
                onCreate: function (t) {
                  t.originalPlacement !== t.placement &&
                    e._handlePopperPlacementChange(t);
                },
                onUpdate: function (t) {
                  return e._handlePopperPlacementChange(t);
                },
              },
              this.config.popperConfig
            );
          }),
          (e._getOffset = function () {
            var t = this,
              e = {};
            return (
              "function" == typeof this.config.offset
                ? (e.fn = function (e) {
                    return (
                      (e.offsets = l(
                        {},
                        e.offsets,
                        t.config.offset(e.offsets, t.element) || {}
                      )),
                      e
                    );
                  })
                : (e.offset = this.config.offset),
              e
            );
          }),
          (e._getContainer = function () {
            return !1 === this.config.container
              ? document.body
              : f.isElement(this.config.container)
              ? o.default(this.config.container)
              : o.default(document).find(this.config.container);
          }),
          (e._getAttachment = function (t) {
            return Ne[t.toUpperCase()];
          }),
          (e._setListeners = function () {
            var t = this;
            this.config.trigger.split(" ").forEach(function (e) {
              if ("click" === e)
                o.default(t.element).on(
                  t.constructor.Event.CLICK,
                  t.config.selector,
                  function (e) {
                    return t.toggle(e);
                  }
                );
              else if ("manual" !== e) {
                var n =
                    e === He
                      ? t.constructor.Event.MOUSEENTER
                      : t.constructor.Event.FOCUSIN,
                  i =
                    e === He
                      ? t.constructor.Event.MOUSELEAVE
                      : t.constructor.Event.FOCUSOUT;
                o.default(t.element)
                  .on(n, t.config.selector, function (e) {
                    return t._enter(e);
                  })
                  .on(i, t.config.selector, function (e) {
                    return t._leave(e);
                  });
              }
            }),
              (this._hideModalHandler = function () {
                t.element && t.hide();
              }),
              o
                .default(this.element)
                .closest(".modal")
                .on("hide.bs.modal", this._hideModalHandler),
              this.config.selector
                ? (this.config = l({}, this.config, {
                    trigger: "manual",
                    selector: "",
                  }))
                : this._fixTitle();
          }),
          (e._fixTitle = function () {
            var t = typeof this.element.getAttribute("data-original-title");
            (this.element.getAttribute("title") || "string" !== t) &&
              (this.element.setAttribute(
                "data-original-title",
                this.element.getAttribute("title") || ""
              ),
              this.element.setAttribute("title", ""));
          }),
          (e._enter = function (t, e) {
            var n = this.constructor.DATA_KEY;
            (e = e || o.default(t.currentTarget).data(n)) ||
              ((e = new this.constructor(
                t.currentTarget,
                this._getDelegateConfig()
              )),
              o.default(t.currentTarget).data(n, e)),
              t && (e._activeTrigger["focusin" === t.type ? Me : He] = !0),
              o.default(e.getTipElement()).hasClass(je) || e._hoverState === Ae
                ? (e._hoverState = Ae)
                : (clearTimeout(e._timeout),
                  (e._hoverState = Ae),
                  e.config.delay && e.config.delay.show
                    ? (e._timeout = setTimeout(function () {
                        e._hoverState === Ae && e.show();
                      }, e.config.delay.show))
                    : e.show());
          }),
          (e._leave = function (t, e) {
            var n = this.constructor.DATA_KEY;
            (e = e || o.default(t.currentTarget).data(n)) ||
              ((e = new this.constructor(
                t.currentTarget,
                this._getDelegateConfig()
              )),
              o.default(t.currentTarget).data(n, e)),
              t && (e._activeTrigger["focusout" === t.type ? Me : He] = !1),
              e._isWithActiveTrigger() ||
                (clearTimeout(e._timeout),
                (e._hoverState = Ie),
                e.config.delay && e.config.delay.hide
                  ? (e._timeout = setTimeout(function () {
                      e._hoverState === Ie && e.hide();
                    }, e.config.delay.hide))
                  : e.hide());
          }),
          (e._isWithActiveTrigger = function () {
            for (var t in this._activeTrigger)
              if (this._activeTrigger[t]) return !0;
            return !1;
          }),
          (e._getConfig = function (t) {
            var e = o.default(this.element).data();
            return (
              Object.keys(e).forEach(function (t) {
                -1 !== ke.indexOf(t) && delete e[t];
              }),
              "number" ==
                typeof (t = l(
                  {},
                  this.constructor.Default,
                  e,
                  "object" == typeof t && t ? t : {}
                )).delay && (t.delay = { show: t.delay, hide: t.delay }),
              "number" == typeof t.title && (t.title = t.title.toString()),
              "number" == typeof t.content &&
                (t.content = t.content.toString()),
              f.typeCheckConfig(we, t, this.constructor.DefaultType),
              t.sanitize &&
                (t.template = _e(t.template, t.whiteList, t.sanitizeFn)),
              t
            );
          }),
          (e._getDelegateConfig = function () {
            var t = {};
            if (this.config)
              for (var e in this.config)
                this.constructor.Default[e] !== this.config[e] &&
                  (t[e] = this.config[e]);
            return t;
          }),
          (e._cleanTipClass = function () {
            var t = o.default(this.getTipElement()),
              e = t.attr("class").match(Se);
            null !== e && e.length && t.removeClass(e.join(""));
          }),
          (e._handlePopperPlacementChange = function (t) {
            (this.tip = t.instance.popper),
              this._cleanTipClass(),
              this.addAttachmentClass(this._getAttachment(t.placement));
          }),
          (e._fixTransition = function () {
            var t = this.getTipElement(),
              e = this.config.animation;
            null === t.getAttribute("x-placement") &&
              (o.default(t).removeClass(Le),
              (this.config.animation = !1),
              this.hide(),
              this.show(),
              (this.config.animation = e));
          }),
          (t._jQueryInterface = function (e) {
            return this.each(function () {
              var n = o.default(this),
                i = n.data(xe),
                r = "object" == typeof e && e;
              if (
                (i || !/dispose|hide/.test(e)) &&
                (i || ((i = new t(this, r)), n.data(xe, i)),
                "string" == typeof e)
              ) {
                if (void 0 === i[e])
                  throw new TypeError('No method named "' + e + '"');
                i[e]();
              }
            });
          }),
          a(t, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.6.0";
              },
            },
            {
              key: "Default",
              get: function () {
                return De;
              },
            },
            {
              key: "NAME",
              get: function () {
                return we;
              },
            },
            {
              key: "DATA_KEY",
              get: function () {
                return xe;
              },
            },
            {
              key: "Event",
              get: function () {
                return Oe;
              },
            },
            {
              key: "EVENT_KEY",
              get: function () {
                return Ce;
              },
            },
            {
              key: "DefaultType",
              get: function () {
                return Pe;
              },
            },
          ]),
          t
        );
      })();
    (o.default.fn[we] = qe._jQueryInterface),
      (o.default.fn[we].Constructor = qe),
      (o.default.fn[we].noConflict = function () {
        return (o.default.fn[we] = Ee), qe._jQueryInterface;
      });
    var Re = "popover",
      Be = "bs.popover",
      Fe = "." + Be,
      We = o.default.fn[Re],
      ze = "bs-popover",
      Ue = new RegExp("(^|\\s)" + ze + "\\S+", "g"),
      Ye = l({}, qe.Default, {
        placement: "right",
        trigger: "click",
        content: "",
        template:
          '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
      }),
      Ve = l({}, qe.DefaultType, { content: "(string|element|function)" }),
      Xe = {
        HIDE: "hide" + Fe,
        HIDDEN: "hidden" + Fe,
        SHOW: "show" + Fe,
        SHOWN: "shown" + Fe,
        INSERTED: "inserted" + Fe,
        CLICK: "click" + Fe,
        FOCUSIN: "focusin" + Fe,
        FOCUSOUT: "focusout" + Fe,
        MOUSEENTER: "mouseenter" + Fe,
        MOUSELEAVE: "mouseleave" + Fe,
      },
      Qe = (function (t) {
        var e, n;
        function i() {
          return t.apply(this, arguments) || this;
        }
        (n = t),
          ((e = i).prototype = Object.create(n.prototype)),
          (e.prototype.constructor = e),
          (e.__proto__ = n);
        var r = i.prototype;
        return (
          (r.isWithContent = function () {
            return this.getTitle() || this._getContent();
          }),
          (r.addAttachmentClass = function (t) {
            o.default(this.getTipElement()).addClass(ze + "-" + t);
          }),
          (r.getTipElement = function () {
            return (
              (this.tip = this.tip || o.default(this.config.template)[0]),
              this.tip
            );
          }),
          (r.setContent = function () {
            var t = o.default(this.getTipElement());
            this.setElementContent(t.find(".popover-header"), this.getTitle());
            var e = this._getContent();
            "function" == typeof e && (e = e.call(this.element)),
              this.setElementContent(t.find(".popover-body"), e),
              t.removeClass("fade show");
          }),
          (r._getContent = function () {
            return (
              this.element.getAttribute("data-content") || this.config.content
            );
          }),
          (r._cleanTipClass = function () {
            var t = o.default(this.getTipElement()),
              e = t.attr("class").match(Ue);
            null !== e && e.length > 0 && t.removeClass(e.join(""));
          }),
          (i._jQueryInterface = function (t) {
            return this.each(function () {
              var e = o.default(this).data(Be),
                n = "object" == typeof t ? t : null;
              if (
                (e || !/dispose|hide/.test(t)) &&
                (e || ((e = new i(this, n)), o.default(this).data(Be, e)),
                "string" == typeof t)
              ) {
                if (void 0 === e[t])
                  throw new TypeError('No method named "' + t + '"');
                e[t]();
              }
            });
          }),
          a(i, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.6.0";
              },
            },
            {
              key: "Default",
              get: function () {
                return Ye;
              },
            },
            {
              key: "NAME",
              get: function () {
                return Re;
              },
            },
            {
              key: "DATA_KEY",
              get: function () {
                return Be;
              },
            },
            {
              key: "Event",
              get: function () {
                return Xe;
              },
            },
            {
              key: "EVENT_KEY",
              get: function () {
                return Fe;
              },
            },
            {
              key: "DefaultType",
              get: function () {
                return Ve;
              },
            },
          ]),
          i
        );
      })(qe);
    (o.default.fn[Re] = Qe._jQueryInterface),
      (o.default.fn[Re].Constructor = Qe),
      (o.default.fn[Re].noConflict = function () {
        return (o.default.fn[Re] = We), Qe._jQueryInterface;
      });
    var $e = "scrollspy",
      Ke = "bs.scrollspy",
      Ge = "." + Ke,
      Je = o.default.fn[$e],
      Ze = { offset: 10, method: "auto", target: "" },
      tn = { offset: "number", method: "string", target: "(string|element)" },
      en = "activate" + Ge,
      nn = "scroll" + Ge,
      on = "load" + Ge + ".data-api",
      rn = "active",
      sn = ".nav, .list-group",
      an = ".nav-link",
      ln = ".list-group-item",
      cn = "position",
      un = (function () {
        function t(t, e) {
          var n = this;
          (this._element = t),
            (this._scrollElement = "BODY" === t.tagName ? window : t),
            (this._config = this._getConfig(e)),
            (this._selector =
              this._config.target +
              " " +
              an +
              "," +
              this._config.target +
              " " +
              ln +
              "," +
              this._config.target +
              " .dropdown-item"),
            (this._offsets = []),
            (this._targets = []),
            (this._activeTarget = null),
            (this._scrollHeight = 0),
            o.default(this._scrollElement).on(nn, function (t) {
              return n._process(t);
            }),
            this.refresh(),
            this._process();
        }
        var e = t.prototype;
        return (
          (e.refresh = function () {
            var t = this,
              e =
                this._scrollElement === this._scrollElement.window
                  ? "offset"
                  : cn,
              n = "auto" === this._config.method ? e : this._config.method,
              i = n === cn ? this._getScrollTop() : 0;
            (this._offsets = []),
              (this._targets = []),
              (this._scrollHeight = this._getScrollHeight()),
              [].slice
                .call(document.querySelectorAll(this._selector))
                .map(function (t) {
                  var e,
                    r = f.getSelectorFromElement(t);
                  if ((r && (e = document.querySelector(r)), e)) {
                    var s = e.getBoundingClientRect();
                    if (s.width || s.height)
                      return [o.default(e)[n]().top + i, r];
                  }
                  return null;
                })
                .filter(function (t) {
                  return t;
                })
                .sort(function (t, e) {
                  return t[0] - e[0];
                })
                .forEach(function (e) {
                  t._offsets.push(e[0]), t._targets.push(e[1]);
                });
          }),
          (e.dispose = function () {
            o.default.removeData(this._element, Ke),
              o.default(this._scrollElement).off(Ge),
              (this._element = null),
              (this._scrollElement = null),
              (this._config = null),
              (this._selector = null),
              (this._offsets = null),
              (this._targets = null),
              (this._activeTarget = null),
              (this._scrollHeight = null);
          }),
          (e._getConfig = function (t) {
            if (
              "string" !=
                typeof (t = l({}, Ze, "object" == typeof t && t ? t : {}))
                  .target &&
              f.isElement(t.target)
            ) {
              var e = o.default(t.target).attr("id");
              e || ((e = f.getUID($e)), o.default(t.target).attr("id", e)),
                (t.target = "#" + e);
            }
            return f.typeCheckConfig($e, t, tn), t;
          }),
          (e._getScrollTop = function () {
            return this._scrollElement === window
              ? this._scrollElement.pageYOffset
              : this._scrollElement.scrollTop;
          }),
          (e._getScrollHeight = function () {
            return (
              this._scrollElement.scrollHeight ||
              Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight
              )
            );
          }),
          (e._getOffsetHeight = function () {
            return this._scrollElement === window
              ? window.innerHeight
              : this._scrollElement.getBoundingClientRect().height;
          }),
          (e._process = function () {
            var t = this._getScrollTop() + this._config.offset,
              e = this._getScrollHeight(),
              n = this._config.offset + e - this._getOffsetHeight();
            if ((this._scrollHeight !== e && this.refresh(), t >= n)) {
              var i = this._targets[this._targets.length - 1];
              this._activeTarget !== i && this._activate(i);
            } else {
              if (
                this._activeTarget &&
                t < this._offsets[0] &&
                this._offsets[0] > 0
              )
                return (this._activeTarget = null), void this._clear();
              for (var o = this._offsets.length; o--; ) {
                this._activeTarget !== this._targets[o] &&
                  t >= this._offsets[o] &&
                  (void 0 === this._offsets[o + 1] ||
                    t < this._offsets[o + 1]) &&
                  this._activate(this._targets[o]);
              }
            }
          }),
          (e._activate = function (t) {
            (this._activeTarget = t), this._clear();
            var e = this._selector.split(",").map(function (e) {
                return (
                  e + '[data-target="' + t + '"],' + e + '[href="' + t + '"]'
                );
              }),
              n = o.default(
                [].slice.call(document.querySelectorAll(e.join(",")))
              );
            n.hasClass("dropdown-item")
              ? (n.closest(".dropdown").find(".dropdown-toggle").addClass(rn),
                n.addClass(rn))
              : (n.addClass(rn),
                n
                  .parents(sn)
                  .prev(an + ", " + ln)
                  .addClass(rn),
                n.parents(sn).prev(".nav-item").children(an).addClass(rn)),
              o.default(this._scrollElement).trigger(en, { relatedTarget: t });
          }),
          (e._clear = function () {
            [].slice
              .call(document.querySelectorAll(this._selector))
              .filter(function (t) {
                return t.classList.contains(rn);
              })
              .forEach(function (t) {
                return t.classList.remove(rn);
              });
          }),
          (t._jQueryInterface = function (e) {
            return this.each(function () {
              var n = o.default(this).data(Ke);
              if (
                (n ||
                  ((n = new t(this, "object" == typeof e && e)),
                  o.default(this).data(Ke, n)),
                "string" == typeof e)
              ) {
                if (void 0 === n[e])
                  throw new TypeError('No method named "' + e + '"');
                n[e]();
              }
            });
          }),
          a(t, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.6.0";
              },
            },
            {
              key: "Default",
              get: function () {
                return Ze;
              },
            },
          ]),
          t
        );
      })();
    o.default(window).on(on, function () {
      for (
        var t = [].slice.call(document.querySelectorAll('[data-spy="scroll"]')),
          e = t.length;
        e--;

      ) {
        var n = o.default(t[e]);
        un._jQueryInterface.call(n, n.data());
      }
    }),
      (o.default.fn[$e] = un._jQueryInterface),
      (o.default.fn[$e].Constructor = un),
      (o.default.fn[$e].noConflict = function () {
        return (o.default.fn[$e] = Je), un._jQueryInterface;
      });
    var fn = "tab",
      hn = "bs.tab",
      dn = "." + hn,
      pn = o.default.fn[fn],
      gn = "hide" + dn,
      mn = "hidden" + dn,
      vn = "show" + dn,
      bn = "shown" + dn,
      yn = "click" + dn + ".data-api",
      _n = "active",
      wn = "fade",
      xn = "show",
      Cn = ".active",
      En = "> li > .active",
      Tn = (function () {
        function t(t) {
          this._element = t;
        }
        var e = t.prototype;
        return (
          (e.show = function () {
            var t = this;
            if (
              !(
                (this._element.parentNode &&
                  this._element.parentNode.nodeType === Node.ELEMENT_NODE &&
                  o.default(this._element).hasClass(_n)) ||
                o.default(this._element).hasClass("disabled")
              )
            ) {
              var e,
                n,
                i = o.default(this._element).closest(".nav, .list-group")[0],
                r = f.getSelectorFromElement(this._element);
              if (i) {
                var s = "UL" === i.nodeName || "OL" === i.nodeName ? En : Cn;
                n = (n = o.default.makeArray(o.default(i).find(s)))[
                  n.length - 1
                ];
              }
              var a = o.default.Event(gn, { relatedTarget: this._element }),
                l = o.default.Event(vn, { relatedTarget: n });
              if (
                (n && o.default(n).trigger(a),
                o.default(this._element).trigger(l),
                !l.isDefaultPrevented() && !a.isDefaultPrevented())
              ) {
                r && (e = document.querySelector(r)),
                  this._activate(this._element, i);
                var c = function () {
                  var e = o.default.Event(mn, { relatedTarget: t._element }),
                    i = o.default.Event(bn, { relatedTarget: n });
                  o.default(n).trigger(e), o.default(t._element).trigger(i);
                };
                e ? this._activate(e, e.parentNode, c) : c();
              }
            }
          }),
          (e.dispose = function () {
            o.default.removeData(this._element, hn), (this._element = null);
          }),
          (e._activate = function (t, e, n) {
            var i = this,
              r = (
                !e || ("UL" !== e.nodeName && "OL" !== e.nodeName)
                  ? o.default(e).children(Cn)
                  : o.default(e).find(En)
              )[0],
              s = n && r && o.default(r).hasClass(wn),
              a = function () {
                return i._transitionComplete(t, r, n);
              };
            if (r && s) {
              var l = f.getTransitionDurationFromElement(r);
              o.default(r)
                .removeClass(xn)
                .one(f.TRANSITION_END, a)
                .emulateTransitionEnd(l);
            } else a();
          }),
          (e._transitionComplete = function (t, e, n) {
            if (e) {
              o.default(e).removeClass(_n);
              var i = o
                .default(e.parentNode)
                .find("> .dropdown-menu .active")[0];
              i && o.default(i).removeClass(_n),
                "tab" === e.getAttribute("role") &&
                  e.setAttribute("aria-selected", !1);
            }
            if (
              (o.default(t).addClass(_n),
              "tab" === t.getAttribute("role") &&
                t.setAttribute("aria-selected", !0),
              f.reflow(t),
              t.classList.contains(wn) && t.classList.add(xn),
              t.parentNode && o.default(t.parentNode).hasClass("dropdown-menu"))
            ) {
              var r = o.default(t).closest(".dropdown")[0];
              if (r) {
                var s = [].slice.call(r.querySelectorAll(".dropdown-toggle"));
                o.default(s).addClass(_n);
              }
              t.setAttribute("aria-expanded", !0);
            }
            n && n();
          }),
          (t._jQueryInterface = function (e) {
            return this.each(function () {
              var n = o.default(this),
                i = n.data(hn);
              if (
                (i || ((i = new t(this)), n.data(hn, i)), "string" == typeof e)
              ) {
                if (void 0 === i[e])
                  throw new TypeError('No method named "' + e + '"');
                i[e]();
              }
            });
          }),
          a(t, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.6.0";
              },
            },
          ]),
          t
        );
      })();
    o
      .default(document)
      .on(
        yn,
        '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
        function (t) {
          t.preventDefault(), Tn._jQueryInterface.call(o.default(this), "show");
        }
      ),
      (o.default.fn[fn] = Tn._jQueryInterface),
      (o.default.fn[fn].Constructor = Tn),
      (o.default.fn[fn].noConflict = function () {
        return (o.default.fn[fn] = pn), Tn._jQueryInterface;
      });
    var Sn = "toast",
      kn = "bs.toast",
      Pn = "." + kn,
      Nn = o.default.fn[Sn],
      Dn = "click.dismiss" + Pn,
      An = "hide" + Pn,
      In = "hidden" + Pn,
      On = "show" + Pn,
      Ln = "shown" + Pn,
      jn = "hide",
      Hn = "show",
      Mn = "showing",
      qn = { animation: "boolean", autohide: "boolean", delay: "number" },
      Rn = { animation: !0, autohide: !0, delay: 500 },
      Bn = (function () {
        function t(t, e) {
          (this._element = t),
            (this._config = this._getConfig(e)),
            (this._timeout = null),
            this._setListeners();
        }
        var e = t.prototype;
        return (
          (e.show = function () {
            var t = this,
              e = o.default.Event(On);
            if (
              (o.default(this._element).trigger(e), !e.isDefaultPrevented())
            ) {
              this._clearTimeout(),
                this._config.animation && this._element.classList.add("fade");
              var n = function () {
                t._element.classList.remove(Mn),
                  t._element.classList.add(Hn),
                  o.default(t._element).trigger(Ln),
                  t._config.autohide &&
                    (t._timeout = setTimeout(function () {
                      t.hide();
                    }, t._config.delay));
              };
              if (
                (this._element.classList.remove(jn),
                f.reflow(this._element),
                this._element.classList.add(Mn),
                this._config.animation)
              ) {
                var i = f.getTransitionDurationFromElement(this._element);
                o.default(this._element)
                  .one(f.TRANSITION_END, n)
                  .emulateTransitionEnd(i);
              } else n();
            }
          }),
          (e.hide = function () {
            if (this._element.classList.contains(Hn)) {
              var t = o.default.Event(An);
              o.default(this._element).trigger(t),
                t.isDefaultPrevented() || this._close();
            }
          }),
          (e.dispose = function () {
            this._clearTimeout(),
              this._element.classList.contains(Hn) &&
                this._element.classList.remove(Hn),
              o.default(this._element).off(Dn),
              o.default.removeData(this._element, kn),
              (this._element = null),
              (this._config = null);
          }),
          (e._getConfig = function (t) {
            return (
              (t = l(
                {},
                Rn,
                o.default(this._element).data(),
                "object" == typeof t && t ? t : {}
              )),
              f.typeCheckConfig(Sn, t, this.constructor.DefaultType),
              t
            );
          }),
          (e._setListeners = function () {
            var t = this;
            o.default(this._element).on(
              Dn,
              '[data-dismiss="toast"]',
              function () {
                return t.hide();
              }
            );
          }),
          (e._close = function () {
            var t = this,
              e = function () {
                t._element.classList.add(jn), o.default(t._element).trigger(In);
              };
            if ((this._element.classList.remove(Hn), this._config.animation)) {
              var n = f.getTransitionDurationFromElement(this._element);
              o.default(this._element)
                .one(f.TRANSITION_END, e)
                .emulateTransitionEnd(n);
            } else e();
          }),
          (e._clearTimeout = function () {
            clearTimeout(this._timeout), (this._timeout = null);
          }),
          (t._jQueryInterface = function (e) {
            return this.each(function () {
              var n = o.default(this),
                i = n.data(kn);
              if (
                (i ||
                  ((i = new t(this, "object" == typeof e && e)), n.data(kn, i)),
                "string" == typeof e)
              ) {
                if (void 0 === i[e])
                  throw new TypeError('No method named "' + e + '"');
                i[e](this);
              }
            });
          }),
          a(t, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.6.0";
              },
            },
            {
              key: "DefaultType",
              get: function () {
                return qn;
              },
            },
            {
              key: "Default",
              get: function () {
                return Rn;
              },
            },
          ]),
          t
        );
      })();
    (o.default.fn[Sn] = Bn._jQueryInterface),
      (o.default.fn[Sn].Constructor = Bn),
      (o.default.fn[Sn].noConflict = function () {
        return (o.default.fn[Sn] = Nn), Bn._jQueryInterface;
      }),
      (t.Alert = y),
      (t.Button = I),
      (t.Carousel = ot),
      (t.Collapse = xt),
      (t.Dropdown = Ut),
      (t.Modal = ge),
      (t.Popover = Qe),
      (t.Scrollspy = un),
      (t.Tab = Tn),
      (t.Toast = Bn),
      (t.Tooltip = qe),
      (t.Util = f),
      Object.defineProperty(t, "__esModule", { value: !0 });
  }),
  /*! @preserve
   * bootbox.js
   * version: 5.1.1
   * author: Nick Payne <nick@kurai.co.uk>
   * license: MIT
   * http://bootboxjs.com/
   */
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(["jquery"], e)
      : "object" == typeof exports
      ? (module.exports = e(require("jquery")))
      : (t.bootbox = e(t.jQuery));
  })(this, function t(e, n) {
    "use strict";
    var i, o, r, s;
    Object.keys ||
      (Object.keys =
        ((i = Object.prototype.hasOwnProperty),
        (o = !{ toString: null }.propertyIsEnumerable("toString")),
        (s = (r = [
          "toString",
          "toLocaleString",
          "valueOf",
          "hasOwnProperty",
          "isPrototypeOf",
          "propertyIsEnumerable",
          "constructor",
        ]).length),
        function (t) {
          if ("function" != typeof t && ("object" != typeof t || null === t))
            throw new TypeError("Object.keys called on non-object");
          var e,
            n,
            a = [];
          for (e in t) i.call(t, e) && a.push(e);
          if (o) for (n = 0; n < s; n++) i.call(t, r[n]) && a.push(r[n]);
          return a;
        }));
    var a = {};
    a.VERSION = "5.0.0";
    var l = {},
      c = {
        dialog:
          '<div class="bootbox modal" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-body"><div class="bootbox-body"></div></div></div></div></div>',
        header: '<div class="modal-header"><h5 class="modal-title"></h5></div>',
        footer: '<div class="modal-footer"></div>',
        closeButton:
          '<button type="button" class="bootbox-close-button close" aria-hidden="true">&times;</button>',
        form: '<form class="bootbox-form"></form>',
        button: '<button type="button" class="btn"></button>',
        option: "<option></option>",
        promptMessage: '<div class="bootbox-prompt-message"></div>',
        inputs: {
          text: '<input class="bootbox-input bootbox-input-text form-control" autocomplete="off" type="text" />',
          textarea:
            '<textarea class="bootbox-input bootbox-input-textarea form-control"></textarea>',
          email:
            '<input class="bootbox-input bootbox-input-email form-control" autocomplete="off" type="email" />',
          select:
            '<select class="bootbox-input bootbox-input-select form-control"></select>',
          checkbox:
            '<div class="form-check checkbox"><label class="form-check-label"><input class="form-check-input bootbox-input bootbox-input-checkbox" type="checkbox" /></label></div>',
          radio:
            '<div class="form-check radio"><label class="form-check-label"><input class="form-check-input bootbox-input bootbox-input-radio" type="radio" name="bootbox-radio" /></label></div>',
          date: '<input class="bootbox-input bootbox-input-date form-control" autocomplete="off" type="date" />',
          time: '<input class="bootbox-input bootbox-input-time form-control" autocomplete="off" type="time" />',
          number:
            '<input class="bootbox-input bootbox-input-number form-control" autocomplete="off" type="number" />',
          password:
            '<input class="bootbox-input bootbox-input-password form-control" autocomplete="off" type="password" />',
          range:
            '<input class="bootbox-input bootbox-input-range form-control-range" autocomplete="off" type="range" />',
        },
      },
      u = {
        locale: "en",
        backdrop: "static",
        animate: !0,
        className: null,
        closeButton: !0,
        show: !0,
        container: "body",
        value: "",
        inputType: "text",
        swapButtonOrder: !1,
        centerVertical: !1,
        multiple: !1,
        scrollable: !1,
      };
    function f(t, n, i) {
      return e.extend(
        !0,
        {},
        t,
        (function (t, e) {
          var n = t.length,
            i = {};
          if (n < 1 || n > 2) throw new Error("Invalid argument length");
          return (
            2 === n || "string" == typeof t[0]
              ? ((i[e[0]] = t[0]), (i[e[1]] = t[1]))
              : (i = t[0]),
            i
          );
        })(n, i)
      );
    }
    function h(t, e, i, o) {
      var r;
      o &&
        o[0] &&
        ((r = o[0].locale || u.locale),
        (o[0].swapButtonOrder || u.swapButtonOrder) && (e = e.reverse()));
      var s,
        a,
        l,
        c = { className: "bootbox-" + t, buttons: d(e, r) };
      return (
        (s = f(c, o, i)),
        (l = {}),
        m((a = e), function (t, e) {
          l[e] = !0;
        }),
        m(s.buttons, function (t) {
          if (l[t] === n)
            throw new Error(
              'button key "' +
                t +
                '" is not allowed (options are ' +
                a.join(" ") +
                ")"
            );
        }),
        s
      );
    }
    function d(t, e) {
      for (var n = {}, i = 0, o = t.length; i < o; i++) {
        var r = t[i],
          s = r.toLowerCase(),
          a = r.toUpperCase();
        n[s] = { label: p(a, e) };
      }
      return n;
    }
    function p(t, e) {
      var n = l[e];
      return n ? n[t] : l.en[t];
    }
    function g(t) {
      return Object.keys(t).length;
    }
    function m(t, n) {
      var i = 0;
      e.each(t, function (t, e) {
        n(t, e, i++);
      });
    }
    function v(t, n, i) {
      t.stopPropagation(),
        t.preventDefault(),
        (e.isFunction(i) && !1 === i.call(n, t)) || n.modal("hide");
    }
    function b(t) {
      return /([01][0-9]|2[0-3]):[0-5][0-9]?:[0-5][0-9]/.test(t);
    }
    function y(t) {
      return /(\d{4})-(\d{2})-(\d{2})/.test(t);
    }
    return (
      (a.locales = function (t) {
        return t ? l[t] : l;
      }),
      (a.addLocale = function (t, n) {
        return (
          e.each(["OK", "CANCEL", "CONFIRM"], function (t, e) {
            if (!n[e])
              throw new Error('Please supply a translation for "' + e + '"');
          }),
          (l[t] = { OK: n.OK, CANCEL: n.CANCEL, CONFIRM: n.CONFIRM }),
          a
        );
      }),
      (a.removeLocale = function (t) {
        if ("en" === t)
          throw new Error(
            '"en" is used as the default and fallback locale and cannot be removed.'
          );
        return delete l[t], a;
      }),
      (a.setLocale = function (t) {
        return a.setDefaults("locale", t);
      }),
      (a.setDefaults = function () {
        var t = {};
        return (
          2 === arguments.length
            ? (t[arguments[0]] = arguments[1])
            : (t = arguments[0]),
          e.extend(u, t),
          a
        );
      }),
      (a.setTemplates = function () {
        var t = {};
        3 === arguments.length
          ? ((t[arguments[0]] = {}),
            (t[arguments[0]][arguments[1]] = arguments[2]))
          : 2 === arguments.length
          ? (t[arguments[0]] = arguments[1])
          : (t = arguments[0]),
          e.extend(c, t);
      }),
      (a.hideAll = function () {
        return e(".bootbox").modal("hide"), a;
      }),
      (a.init = function (n) {
        return t(n || e);
      }),
      (a.dialog = function (t) {
        if (e.fn.modal === n)
          throw new Error(
            '"$.fn.modal" is not defined; please double check you have included the Bootstrap JavaScript library. See http://getbootstrap.com/javascript/ for more details.'
          );
        if (
          ((t = (function (t) {
            var n, i;
            if ("object" != typeof t)
              throw new Error("Please supply an object of options");
            if (!t.message)
              throw new Error(
                '"message" option must not be null or an empty string.'
              );
            (t = e.extend({}, u, t)), t.buttons || (t.buttons = {});
            return (
              (n = t.buttons),
              (i = g(n)),
              m(n, function (o, r, s) {
                if (
                  (e.isFunction(r) && (r = n[o] = { callback: r }),
                  "object" !== e.type(r))
                )
                  throw new Error(
                    'button with key "' + o + '" must be an object'
                  );
                if ((r.label || (r.label = o), !r.className)) {
                  var a = !1;
                  (a = t.swapButtonOrder ? 0 === s : s === i - 1),
                    (r.className =
                      i <= 2 && a
                        ? "btn-primary"
                        : "btn-secondary btn-default");
                }
              }),
              t
            );
          })(t)),
          e.fn.modal.Constructor.VERSION)
        ) {
          t.fullBootstrapVersion = e.fn.modal.Constructor.VERSION;
          var i = t.fullBootstrapVersion.indexOf(".");
          t.bootstrap = t.fullBootstrapVersion.substring(0, i);
        } else
          (t.bootstrap = "2"),
            (t.fullBootstrapVersion = "2.3.2"),
            console.warn(
              "Bootbox will *mostly* work with Bootstrap 2, but we do not officially support it. Please upgrade, if possible."
            );
        var o = e(c.dialog),
          r = o.find(".modal-dialog"),
          s = o.find(".modal-body"),
          a = e(c.header),
          l = e(c.footer),
          f = t.buttons,
          h = { onEscape: t.onEscape };
        if (
          (s.find(".bootbox-body").html(t.message),
          g(t.buttons) > 0 &&
            (m(f, function (t, n) {
              var i = e(c.button);
              switch ((i.data("bb-handler", t), i.addClass(n.className), t)) {
                case "ok":
                case "confirm":
                  i.addClass("bootbox-accept");
                  break;
                case "cancel":
                  i.addClass("bootbox-cancel");
              }
              i.html(n.label), l.append(i), (h[t] = n.callback);
            }),
            s.after(l)),
          !0 === t.animate && o.addClass("fade"),
          t.className && o.addClass(t.className),
          t.size)
        )
          switch (
            (t.fullBootstrapVersion.substring(0, 3) < "3.1" &&
              console.warn(
                '"size" requires Bootstrap 3.1.0 or higher. You appear to be using ' +
                  t.fullBootstrapVersion +
                  ". Please upgrade to use this option."
              ),
            t.size)
          ) {
            case "small":
            case "sm":
              r.addClass("modal-sm");
              break;
            case "large":
            case "lg":
              r.addClass("modal-lg");
              break;
            case "xl":
            case "extra-large":
              t.fullBootstrapVersion.substring(0, 3) < "4.2" &&
                console.warn(
                  'Using size "xl"/"extra-large" requires Bootstrap 4.2.0 or higher. You appear to be using ' +
                    t.fullBootstrapVersion +
                    ". Please upgrade to use this option."
                ),
                r.addClass("modal-xl");
          }
        if (
          (t.scrollable &&
            (t.fullBootstrapVersion.substring(0, 3) < "4.3" &&
              console.warn(
                'Using "scrollable" requires Bootstrap 4.3.0 or higher. You appear to be using ' +
                  t.fullBootstrapVersion +
                  ". Please upgrade to use this option."
              ),
            r.addClass("modal-dialog-scrollable")),
          t.title && (s.before(a), o.find(".modal-title").html(t.title)),
          t.closeButton)
        ) {
          var d = e(c.closeButton);
          t.title
            ? t.bootstrap > 3
              ? o.find(".modal-header").append(d)
              : o.find(".modal-header").prepend(d)
            : d.prependTo(s);
        }
        return (
          t.centerVertical &&
            (t.fullBootstrapVersion < "4.0.0" &&
              console.warn(
                '"centerVertical" requires Bootstrap 4.0.0-beta.3 or higher. You appear to be using ' +
                  t.fullBootstrapVersion +
                  ". Please upgrade to use this option."
              ),
            r.addClass("modal-dialog-centered")),
          o.one("hide.bs.modal", function (t) {
            t.target === this && (o.off("escape.close.bb"), o.off("click"));
          }),
          o.one("hidden.bs.modal", function (t) {
            t.target === this && o.remove();
          }),
          o.one("shown.bs.modal", function () {
            o.find(".bootbox-accept:first").trigger("focus");
          }),
          "static" !== t.backdrop &&
            o.on("click.dismiss.bs.modal", function (t) {
              o.children(".modal-backdrop").length &&
                (t.currentTarget = o.children(".modal-backdrop").get(0)),
                t.target === t.currentTarget && o.trigger("escape.close.bb");
            }),
          o.on("escape.close.bb", function (t) {
            h.onEscape && v(t, o, h.onEscape);
          }),
          o.on("click", ".modal-footer button:not(.disabled)", function (t) {
            var n = e(this).data("bb-handler");
            v(t, o, h[n]);
          }),
          o.on("click", ".bootbox-close-button", function (t) {
            v(t, o, h.onEscape);
          }),
          o.on("keyup", function (t) {
            27 === t.which && o.trigger("escape.close.bb");
          }),
          e(t.container).append(o),
          o.modal({
            backdrop: !!t.backdrop && "static",
            keyboard: !1,
            show: !1,
          }),
          t.show && o.modal("show"),
          o
        );
      }),
      (a.alert = function () {
        var t;
        if (
          (t = h("alert", ["ok"], ["message", "callback"], arguments))
            .callback &&
          !e.isFunction(t.callback)
        )
          throw new Error(
            'alert requires the "callback" property to be a function when provided'
          );
        return (
          (t.buttons.ok.callback = t.onEscape =
            function () {
              return !e.isFunction(t.callback) || t.callback.call(this);
            }),
          a.dialog(t)
        );
      }),
      (a.confirm = function () {
        var t;
        if (
          ((t = h(
            "confirm",
            ["cancel", "confirm"],
            ["message", "callback"],
            arguments
          )),
          !e.isFunction(t.callback))
        )
          throw new Error("confirm requires a callback");
        return (
          (t.buttons.cancel.callback = t.onEscape =
            function () {
              return t.callback.call(this, !1);
            }),
          (t.buttons.confirm.callback = function () {
            return t.callback.call(this, !0);
          }),
          a.dialog(t)
        );
      }),
      (a.prompt = function () {
        var t, i, o, r, s, l;
        if (
          ((o = e(c.form)),
          (t = h(
            "prompt",
            ["cancel", "confirm"],
            ["title", "callback"],
            arguments
          )).value || (t.value = u.value),
          t.inputType || (t.inputType = u.inputType),
          (s = t.show === n ? u.show : t.show),
          (t.show = !1),
          (t.buttons.cancel.callback = t.onEscape =
            function () {
              return t.callback.call(this, null);
            }),
          (t.buttons.confirm.callback = function () {
            var n;
            if ("checkbox" === t.inputType)
              n = r
                .find("input:checked")
                .map(function () {
                  return e(this).val();
                })
                .get();
            else if ("radio" === t.inputType) n = r.find("input:checked").val();
            else {
              if (r[0].checkValidity && !r[0].checkValidity()) return !1;
              n =
                "select" === t.inputType && !0 === t.multiple
                  ? r
                      .find("option:selected")
                      .map(function () {
                        return e(this).val();
                      })
                      .get()
                  : r.val();
            }
            return t.callback.call(this, n);
          }),
          !t.title)
        )
          throw new Error("prompt requires a title");
        if (!e.isFunction(t.callback))
          throw new Error("prompt requires a callback");
        if (!c.inputs[t.inputType]) throw new Error("Invalid prompt type");
        switch (((r = e(c.inputs[t.inputType])), t.inputType)) {
          case "text":
          case "textarea":
          case "email":
          case "password":
            r.val(t.value),
              t.placeholder && r.attr("placeholder", t.placeholder),
              t.pattern && r.attr("pattern", t.pattern),
              t.maxlength && r.attr("maxlength", t.maxlength),
              t.required && r.prop({ required: !0 }),
              t.rows &&
                !isNaN(parseInt(t.rows)) &&
                "textarea" === t.inputType &&
                r.attr({ rows: t.rows });
            break;
          case "date":
          case "time":
          case "number":
          case "range":
            if (
              (r.val(t.value),
              t.placeholder && r.attr("placeholder", t.placeholder),
              t.pattern && r.attr("pattern", t.pattern),
              t.required && r.prop({ required: !0 }),
              "date" !== t.inputType && t.step)
            ) {
              if (
                !("any" === t.step || (!isNaN(t.step) && parseInt(t.step) > 0))
              )
                throw new Error(
                  '"step" must be a valid positive number or the value "any". See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-step for more information.'
                );
              r.attr("step", t.step);
            }
            (function (t, e, i) {
              var o = !1,
                r = !0,
                s = !0;
              if ("date" === t)
                e === n || (r = y(e))
                  ? i === n ||
                    (s = y(i)) ||
                    console.warn(
                      'Browsers which natively support the "date" input type expect date values to be of the form "YYYY-MM-DD" (see ISO-8601 https://www.iso.org/iso-8601-date-and-time-format.html). Bootbox does not enforce this rule, but your max value may not be enforced by this browser.'
                    )
                  : console.warn(
                      'Browsers which natively support the "date" input type expect date values to be of the form "YYYY-MM-DD" (see ISO-8601 https://www.iso.org/iso-8601-date-and-time-format.html). Bootbox does not enforce this rule, but your min value may not be enforced by this browser.'
                    );
              else if ("time" === t) {
                if (e !== n && !(r = b(e)))
                  throw new Error(
                    '"min" is not a valid time. See https://www.w3.org/TR/2012/WD-html-markup-20120315/datatypes.html#form.data.time for more information.'
                  );
                if (i !== n && !(s = b(i)))
                  throw new Error(
                    '"max" is not a valid time. See https://www.w3.org/TR/2012/WD-html-markup-20120315/datatypes.html#form.data.time for more information.'
                  );
              } else {
                if (e !== n && isNaN(e))
                  throw new Error(
                    '"min" must be a valid number. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-min for more information.'
                  );
                if (i !== n && isNaN(i))
                  throw new Error(
                    '"max" must be a valid number. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-max for more information.'
                  );
              }
              if (r && s) {
                if (i <= e)
                  throw new Error(
                    '"max" must be greater than "min". See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-max for more information.'
                  );
                o = !0;
              }
              return o;
            })(t.inputType, t.min, t.max) &&
              (t.min !== n && r.attr("min", t.min),
              t.max !== n && r.attr("max", t.max));
            break;
          case "select":
            var f = {};
            if (((l = t.inputOptions || []), !e.isArray(l)))
              throw new Error("Please pass an array of input options");
            if (!l.length)
              throw new Error(
                'prompt with "inputType" set to "select" requires at least one option'
              );
            t.placeholder && r.attr("placeholder", t.placeholder),
              t.required && r.prop({ required: !0 }),
              t.multiple && r.prop({ multiple: !0 }),
              m(l, function (t, i) {
                var o = r;
                if (i.value === n || i.text === n)
                  throw new Error(
                    'each option needs a "value" property and a "text" property'
                  );
                i.group &&
                  (f[i.group] ||
                    (f[i.group] = e("<optgroup />").attr("label", i.group)),
                  (o = f[i.group]));
                var s = e(c.option);
                s.attr("value", i.value).text(i.text), o.append(s);
              }),
              m(f, function (t, e) {
                r.append(e);
              }),
              r.val(t.value);
            break;
          case "checkbox":
            var d = e.isArray(t.value) ? t.value : [t.value];
            if (!(l = t.inputOptions || []).length)
              throw new Error(
                'prompt with "inputType" set to "checkbox" requires at least one option'
              );
            (r = e('<div class="bootbox-checkbox-list"></div>')),
              m(l, function (i, o) {
                if (o.value === n || o.text === n)
                  throw new Error(
                    'each option needs a "value" property and a "text" property'
                  );
                var s = e(c.inputs[t.inputType]);
                s.find("input").attr("value", o.value),
                  s.find("label").append("\n" + o.text),
                  m(d, function (t, e) {
                    e === o.value && s.find("input").prop("checked", !0);
                  }),
                  r.append(s);
              });
            break;
          case "radio":
            if (t.value !== n && e.isArray(t.value))
              throw new Error(
                'prompt with "inputType" set to "radio" requires a single, non-array value for "value"'
              );
            if (!(l = t.inputOptions || []).length)
              throw new Error(
                'prompt with "inputType" set to "radio" requires at least one option'
              );
            r = e('<div class="bootbox-radiobutton-list"></div>');
            var p = !0;
            m(l, function (i, o) {
              if (o.value === n || o.text === n)
                throw new Error(
                  'each option needs a "value" property and a "text" property'
                );
              var s = e(c.inputs[t.inputType]);
              s.find("input").attr("value", o.value),
                s.find("label").append("\n" + o.text),
                t.value !== n &&
                  o.value === t.value &&
                  (s.find("input").prop("checked", !0), (p = !1)),
                r.append(s);
            }),
              p && r.find('input[type="radio"]').first().prop("checked", !0);
        }
        if (
          (o.append(r),
          o.on("submit", function (t) {
            t.preventDefault(),
              t.stopPropagation(),
              i.find(".bootbox-accept").trigger("click");
          }),
          "" !== e.trim(t.message))
        ) {
          var g = e(c.promptMessage).html(t.message);
          o.prepend(g), (t.message = o);
        } else t.message = o;
        return (
          (i = a.dialog(t)).off("shown.bs.modal"),
          i.on("shown.bs.modal", function () {
            r.focus();
          }),
          !0 === s && i.modal("show"),
          i
        );
      }),
      a.addLocale("en", { OK: "OK", CANCEL: "Cancel", CONFIRM: "OK" }),
      a
    );
  }),
  bootbox.setTemplates({
    dialog:
      '<div class="bootbox modal" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-body"><div class="bootbox-body"></div></div></div></div></div>',
    header: '<div class="modal-header"><h5 class="modal-title"></h5></div>',
    footer: '<div class="modal-footer"></div>',
    closeButton:
      '<button type="button" class="bootbox-close-button close" aria-hidden="true"><i class="fal fa-times"></i></button>',
    form: '<form class="bootbox-form"></form>',
    button: '<button type="button" class="btn"></button>',
    option: "<option></option>",
    promptMessage: '<div class="bootbox-prompt-message"></div>',
    inputs: {
      text: '<input class="bootbox-input bootbox-input-text form-control" autocomplete="off" type="text" />',
      textarea:
        '<textarea class="bootbox-input bootbox-input-textarea form-control"></textarea>',
      email:
        '<input class="bootbox-input bootbox-input-email form-control" autocomplete="off" type="email" />',
      select:
        '<select class="bootbox-input bootbox-input-select form-control"></select>',
      checkbox:
        '<div class="form-check checkbox"><label class="form-check-label"><input class="form-check-input bootbox-input bootbox-input-checkbox" type="checkbox" /></label></div>',
      radio:
        '<div class="form-check radio"><label class="form-check-label"><input class="form-check-input bootbox-input bootbox-input-radio" type="radio" name="bootbox-radio" /></label></div>',
      date: '<input class="bootbox-input bootbox-input-date form-control" autocomplete="off" type="date" />',
      time: '<input class="bootbox-input bootbox-input-time form-control" autocomplete="off" type="time" />',
      number:
        '<input class="bootbox-input bootbox-input-number form-control" autocomplete="off" type="number" />',
      password:
        '<input class="bootbox-input bootbox-input-password form-control" autocomplete="off" type="password" />',
      range:
        '<input class="bootbox-input bootbox-input-range form-control-range" autocomplete="off" type="range" />',
    },
  }),
  ($.fn.removeClassPrefix = function (t) {
    return (
      this.each(function (e, n) {
        var i = n.className.split(" ").map(function (e) {
          return 0 === e.indexOf(t) ? "" : e;
        });
        n.className = i.join(" ");
      }),
      this
    );
  });
var getUrlParameter = function (t) {
  var e,
    n,
    i = decodeURIComponent(window.location.search.substring(1)).split("&");
  for (n = 0; n < i.length; n++)
    if ((e = i[n].split("="))[0] === t) return void 0 === e[1] || e[1];
};
function detectIE() {
  var t = window.navigator.userAgent,
    e = t.indexOf("MSIE ");
  if (e > 0) return parseInt(t.substring(e + 5, t.indexOf(".", e)), 10);
  if (t.indexOf("Trident/") > 0) {
    var n = t.indexOf("rv:");
    return parseInt(t.substring(n + 3, t.indexOf(".", n)), 10);
  }
  var i = t.indexOf("Edge/");
  return i > 0 && parseInt(t.substring(i + 5, t.indexOf(".", i)), 10);
}
function rgb2hex(t) {
  function e(t) {
    return ("0" + parseInt(t).toString(16)).slice(-2);
  }
  return (
    "#" +
    e((t = t.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/))[1]) +
    e(t[2]) +
    e(t[3])
  );
}
/*!
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */ jQuery.fn.extend({
  toggleText: function (t, e) {
    var n = this;
    return (
      n.text() != t && n.text() != e
        ? n.text(t)
        : n.text() == t
        ? n.text(e)
        : n.text() == e && n.text(t),
      this
    );
  },
}),
  (function (t, e) {
    var n,
      i = t.jQuery || t.Cowboy || (t.Cowboy = {});
    (i.throttle = n =
      function (t, n, o, r) {
        var s,
          a = 0;
        function l() {
          var i = this,
            l = +new Date() - a,
            c = arguments;
          function u() {
            (a = +new Date()), o.apply(i, c);
          }
          r && !s && u(),
            s && clearTimeout(s),
            r === e && l > t
              ? u()
              : !0 !== n &&
                (s = setTimeout(
                  r
                    ? function () {
                        s = e;
                      }
                    : u,
                  r === e ? t - l : t
                ));
        }
        return (
          "boolean" != typeof n && ((r = o), (o = n), (n = e)),
          i.guid && (l.guid = o.guid = o.guid || i.guid++),
          l
        );
      }),
      (i.debounce = function (t, i, o) {
        return o === e ? n(t, i, !1) : n(t, o, !1 !== i);
      });
  })(this),
  /*! Copyright (c) 2011 Piotr Rochala (http://rocha.la)
   * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
   * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
   *
   * Version: 1.3.8
   *
   */
  (function (e) {
    e.fn.extend({
      slimScroll: function (n) {
        var i = e.extend(
          {
            width: "auto",
            height: "250px",
            size: "7px",
            color: "#000",
            position: "right",
            distance: "1px",
            start: "top",
            opacity: 0.4,
            alwaysVisible: !1,
            disableFadeOut: !1,
            railVisible: !1,
            railColor: "#333",
            railOpacity: 0.2,
            railDraggable: !0,
            railClass: "slimScrollRail",
            barClass: "slimScrollBar",
            wrapperClass: "slimScrollDiv",
            allowPageScroll: !1,
            wheelStep: 20,
            touchScrollStep: 200,
            borderRadius: "7px",
            railBorderRadius: "7px",
          },
          n
        );
        return (
          this.each(function () {
            var o,
              r,
              s,
              a,
              l,
              c,
              u,
              f,
              h = "<div></div>",
              d = 30,
              p = !1,
              g = e(this);
            if (g.parent().hasClass(i.wrapperClass)) {
              var m = g.scrollTop();
              if (
                ((x = g.siblings("." + i.barClass)),
                (w = g.siblings("." + i.railClass)),
                S(),
                e.isPlainObject(n))
              ) {
                if ("height" in n && "auto" == n.height) {
                  g.parent().css("height", "auto"), g.css("height", "auto");
                  var v = g.parent().parent().height();
                  g.parent().css("height", v), g.css("height", v);
                } else if ("height" in n) {
                  var b = n.height;
                  g.parent().css("height", b), g.css("height", b);
                }
                if ("scrollTo" in n) m = parseInt(i.scrollTo);
                else if ("scrollBy" in n) m += parseInt(i.scrollBy);
                else if ("destroy" in n)
                  return x.remove(), w.remove(), void g.unwrap();
                T(m, !1, !0);
              }
            } else if (!e.isPlainObject(n) || !("destroy" in n)) {
              i.height = "auto" == i.height ? g.parent().height() : i.height;
              var y = e(h).addClass(i.wrapperClass).css({
                position: "relative",
                overflow: "hidden",
                width: i.width,
                height: i.height,
              });
              g.css({ overflow: "hidden", width: i.width, height: i.height });
              var _,
                w = e(h)
                  .addClass(i.railClass)
                  .css({
                    width: i.size,
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    display:
                      i.alwaysVisible && i.railVisible ? "block" : "none",
                    "border-radius": i.railBorderRadius,
                    background: i.railColor,
                    opacity: i.railOpacity,
                    zIndex: 90,
                  }),
                x = e(h)
                  .addClass(i.barClass)
                  .css({
                    background: i.color,
                    width: i.size,
                    position: "absolute",
                    top: 0,
                    opacity: i.opacity,
                    display: i.alwaysVisible ? "block" : "none",
                    "border-radius": i.borderRadius,
                    BorderRadius: i.borderRadius,
                    MozBorderRadius: i.borderRadius,
                    WebkitBorderRadius: i.borderRadius,
                    zIndex: 99,
                  }),
                C =
                  "right" == i.position
                    ? { right: i.distance }
                    : { left: i.distance };
              w.css(C),
                x.css(C),
                g.wrap(y),
                g.parent().append(x),
                g.parent().append(w),
                i.railDraggable &&
                  x
                    .bind("mousedown", function (n) {
                      var i = e(document);
                      return (
                        (s = !0),
                        (t = parseFloat(x.css("top"))),
                        (pageY = n.pageY),
                        i.bind("mousemove.slimscroll", function (e) {
                          (currTop = t + e.pageY - pageY),
                            x.css("top", currTop),
                            T(0, x.position().top, !1);
                        }),
                        i.bind("mouseup.slimscroll", function (t) {
                          (s = !1), P(), i.unbind(".slimscroll");
                        }),
                        !1
                      );
                    })
                    .bind("selectstart.slimscroll", function (t) {
                      return t.stopPropagation(), t.preventDefault(), !1;
                    }),
                w.hover(
                  function () {
                    k();
                  },
                  function () {
                    P();
                  }
                ),
                x.hover(
                  function () {
                    r = !0;
                  },
                  function () {
                    r = !1;
                  }
                ),
                g.hover(
                  function () {
                    (o = !0), k(), P();
                  },
                  function () {
                    (o = !1), P();
                  }
                ),
                g.bind("touchstart", function (t, e) {
                  t.originalEvent.touches.length &&
                    (l = t.originalEvent.touches[0].pageY);
                }),
                g.bind("touchmove", function (t) {
                  (p || t.originalEvent.preventDefault(),
                  t.originalEvent.touches.length) &&
                    (T(
                      (l - t.originalEvent.touches[0].pageY) /
                        i.touchScrollStep,
                      !0
                    ),
                    (l = t.originalEvent.touches[0].pageY));
                }),
                S(),
                "bottom" === i.start
                  ? (x.css({ top: g.outerHeight() - x.outerHeight() }),
                    T(0, !0))
                  : "top" !== i.start &&
                    (T(e(i.start).position().top, null, !0),
                    i.alwaysVisible || x.hide()),
                (_ = this),
                window.addEventListener
                  ? (_.addEventListener("DOMMouseScroll", E, !1),
                    _.addEventListener("mousewheel", E, !1))
                  : document.attachEvent("onmousewheel", E);
            }
            function E(t) {
              if (o) {
                var n = 0;
                (t = t || window.event).wheelDelta && (n = -t.wheelDelta / 120),
                  t.detail && (n = t.detail / 3);
                var r = t.target || t.srcTarget || t.srcElement;
                e(r)
                  .closest("." + i.wrapperClass)
                  .is(g.parent()) && T(n, !0),
                  t.preventDefault && !p && t.preventDefault(),
                  p || (t.returnValue = !1);
              }
            }
            function T(t, e, n) {
              p = !1;
              var o = t,
                r = g.outerHeight() - x.outerHeight();
              if (
                (e &&
                  ((o =
                    parseInt(x.css("top")) +
                    ((t * parseInt(i.wheelStep)) / 100) * x.outerHeight()),
                  (o = Math.min(Math.max(o, 0), r)),
                  (o = t > 0 ? Math.ceil(o) : Math.floor(o)),
                  x.css({ top: o + "px" })),
                (o =
                  (u =
                    parseInt(x.css("top")) /
                    (g.outerHeight() - x.outerHeight())) *
                  (g[0].scrollHeight - g.outerHeight())),
                n)
              ) {
                var s = ((o = t) / g[0].scrollHeight) * g.outerHeight();
                (s = Math.min(Math.max(s, 0), r)), x.css({ top: s + "px" });
              }
              g.scrollTop(o), g.trigger("slimscrolling", ~~o), k(), P();
            }
            function S() {
              (c = Math.max(
                (g.outerHeight() / g[0].scrollHeight) * g.outerHeight(),
                d
              )),
                x.css({ height: c + "px" });
              var t = c == g.outerHeight() ? "none" : "block";
              x.css({ display: t });
            }
            function k() {
              if ((S(), clearTimeout(a), u == ~~u)) {
                if (((p = i.allowPageScroll), f != u)) {
                  var t = 0 == ~~u ? "top" : "bottom";
                  g.trigger("slimscroll", t);
                }
              } else p = !1;
              (f = u),
                c >= g.outerHeight()
                  ? (p = !0)
                  : (x.stop(!0, !0).fadeIn("fast"),
                    i.railVisible && w.stop(!0, !0).fadeIn("fast"));
            }
            function P() {
              i.alwaysVisible ||
                (a = setTimeout(function () {
                  (i.disableFadeOut && o) ||
                    r ||
                    s ||
                    (x.fadeOut("slow"), w.fadeOut("slow"));
                }, 1e3));
            }
          }),
          this
        );
      },
    }),
      e.fn.extend({ slimscroll: e.fn.slimScroll });
  })(jQuery),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define([], function () {
          return (t.Waves = e.call(t)), t.Waves;
        })
      : "object" == typeof exports
      ? (module.exports = e.call(t))
      : (t.Waves = e.call(t));
  })("object" == typeof global ? global : this, function () {
    "use strict";
    var t = t || {},
      e = document.querySelectorAll.bind(document),
      n = Object.prototype.toString,
      i = "ontouchstart" in window;
    function o(t) {
      var e = typeof t;
      return "function" === e || ("object" === e && !!t);
    }
    function r(t) {
      var i,
        r = n.call(t);
      return "[object String]" === r
        ? e(t)
        : o(t) &&
          /^\[object (Array|HTMLCollection|NodeList|Object)\]$/.test(r) &&
          t.hasOwnProperty("length")
        ? t
        : o((i = t)) && i.nodeType > 0
        ? [t]
        : [];
    }
    function s(t) {
      var e,
        n,
        i = { top: 0, left: 0 },
        o = t && t.ownerDocument;
      return (
        (e = o.documentElement),
        void 0 !== t.getBoundingClientRect && (i = t.getBoundingClientRect()),
        (n = (function (t) {
          return null !== (e = t) && e === e.window
            ? t
            : 9 === t.nodeType && t.defaultView;
          var e;
        })(o)),
        {
          top: i.top + n.pageYOffset - e.clientTop,
          left: i.left + n.pageXOffset - e.clientLeft,
        }
      );
    }
    function a(t) {
      var e = "";
      for (var n in t) t.hasOwnProperty(n) && (e += n + ":" + t[n] + ";");
      return e;
    }
    var l = {
        duration: 750,
        delay: 200,
        show: function (t, e, n) {
          if (2 === t.button) return !1;
          e = e || this;
          var i = document.createElement("div");
          (i.className = "waves-ripple waves-rippling"), e.appendChild(i);
          var o = s(e),
            r = 0,
            c = 0;
          "touches" in t && t.touches.length
            ? ((r = t.touches[0].pageY - o.top),
              (c = t.touches[0].pageX - o.left))
            : ((r = t.pageY - o.top), (c = t.pageX - o.left)),
            (c = c >= 0 ? c : 0),
            (r = r >= 0 ? r : 0);
          var u = "scale(" + (e.clientWidth / 100) * 3 + ")",
            f = "translate(0,0)";
          n && (f = "translate(" + n.x + "px, " + n.y + "px)"),
            i.setAttribute("data-hold", Date.now()),
            i.setAttribute("data-x", c),
            i.setAttribute("data-y", r),
            i.setAttribute("data-scale", u),
            i.setAttribute("data-translate", f);
          var h = { top: r + "px", left: c + "px" };
          i.classList.add("waves-notransition"),
            i.setAttribute("style", a(h)),
            i.classList.remove("waves-notransition"),
            (h["-webkit-transform"] = u + " " + f),
            (h["-moz-transform"] = u + " " + f),
            (h["-ms-transform"] = u + " " + f),
            (h["-o-transform"] = u + " " + f),
            (h.transform = u + " " + f),
            (h.opacity = "1");
          var d = "mousemove" === t.type ? 2500 : l.duration;
          (h["-webkit-transition-duration"] = d + "ms"),
            (h["-moz-transition-duration"] = d + "ms"),
            (h["-o-transition-duration"] = d + "ms"),
            (h["transition-duration"] = d + "ms"),
            i.setAttribute("style", a(h));
        },
        hide: function (t, e) {
          for (
            var n = (e = e || this).getElementsByClassName("waves-rippling"),
              o = 0,
              r = n.length;
            o < r;
            o++
          )
            u(t, e, n[o]);
          i &&
            (e.removeEventListener("touchend", l.hide),
            e.removeEventListener("touchcancel", l.hide)),
            e.removeEventListener("mouseup", l.hide),
            e.removeEventListener("mouseleave", l.hide);
        },
      },
      c = {
        input: function (t) {
          var e = t.parentNode;
          if (
            "i" !== e.tagName.toLowerCase() ||
            !e.classList.contains("waves-effect")
          ) {
            var n = document.createElement("i");
            (n.className = t.className + " waves-input-wrapper"),
              (t.className = "waves-button-input"),
              e.replaceChild(n, t),
              n.appendChild(t);
            var i = window.getComputedStyle(t, null),
              o = i.color,
              r = i.backgroundColor;
            n.setAttribute("style", "color:" + o + ";background:" + r),
              t.setAttribute("style", "background-color:rgba(0,0,0,0);");
          }
        },
        img: function (t) {
          var e = t.parentNode;
          if (
            "i" !== e.tagName.toLowerCase() ||
            !e.classList.contains("waves-effect")
          ) {
            var n = document.createElement("i");
            e.replaceChild(n, t), n.appendChild(t);
          }
        },
      };
    function u(t, e, n) {
      if (n) {
        n.classList.remove("waves-rippling");
        var i = n.getAttribute("data-x"),
          o = n.getAttribute("data-y"),
          r = n.getAttribute("data-scale"),
          s = n.getAttribute("data-translate"),
          c = 350 - (Date.now() - Number(n.getAttribute("data-hold")));
        c < 0 && (c = 0), "mousemove" === t.type && (c = 150);
        var u = "mousemove" === t.type ? 2500 : l.duration;
        setTimeout(function () {
          var t = {
            top: o + "px",
            left: i + "px",
            opacity: "0",
            "-webkit-transition-duration": u + "ms",
            "-moz-transition-duration": u + "ms",
            "-o-transition-duration": u + "ms",
            "transition-duration": u + "ms",
            "-webkit-transform": r + " " + s,
            "-moz-transform": r + " " + s,
            "-ms-transform": r + " " + s,
            "-o-transform": r + " " + s,
            transform: r + " " + s,
          };
          n.setAttribute("style", a(t)),
            setTimeout(function () {
              try {
                e.removeChild(n);
              } catch (t) {
                return !1;
              }
            }, u);
        }, c);
      }
    }
    var f = {
      touches: 0,
      allowEvent: function (t) {
        var e = !0;
        return (
          /^(mousedown|mousemove)$/.test(t.type) && f.touches && (e = !1), e
        );
      },
      registerEvent: function (t) {
        var e = t.type;
        "touchstart" === e
          ? (f.touches += 1)
          : /^(touchend|touchcancel)$/.test(e) &&
            setTimeout(function () {
              f.touches && (f.touches -= 1);
            }, 500);
      },
    };
    function h(t) {
      var e = (function (t) {
        if (!1 === f.allowEvent(t)) return null;
        for (var e = null, n = t.target || t.srcElement; n.parentElement; ) {
          if (
            !(n instanceof SVGElement) &&
            n.classList.contains("waves-effect")
          ) {
            e = n;
            break;
          }
          n = n.parentElement;
        }
        return e;
      })(t);
      if (null !== e) {
        if (
          e.disabled ||
          e.getAttribute("disabled") ||
          e.classList.contains("disabled")
        )
          return;
        if ((f.registerEvent(t), "touchstart" === t.type && l.delay)) {
          var n = !1,
            o = setTimeout(function () {
              (o = null), l.show(t, e);
            }, l.delay),
            r = function (i) {
              o && (clearTimeout(o), (o = null), l.show(t, e)),
                n || ((n = !0), l.hide(i, e)),
                a();
            },
            s = function (t) {
              o && (clearTimeout(o), (o = null)), r(t), a();
            };
          e.addEventListener("touchmove", s, !1),
            e.addEventListener("touchend", r, !1),
            e.addEventListener("touchcancel", r, !1);
          var a = function () {
            e.removeEventListener("touchmove", s),
              e.removeEventListener("touchend", r),
              e.removeEventListener("touchcancel", r);
          };
        } else
          l.show(t, e),
            i &&
              (e.addEventListener("touchend", l.hide, !1),
              e.addEventListener("touchcancel", l.hide, !1)),
            e.addEventListener("mouseup", l.hide, !1),
            e.addEventListener("mouseleave", l.hide, !1);
      }
    }
    return (
      (t.init = function (t) {
        var e = document.body;
        "duration" in (t = t || {}) && (l.duration = t.duration),
          "delay" in t && (l.delay = t.delay),
          i &&
            (e.addEventListener("touchstart", h, !1),
            e.addEventListener("touchcancel", f.registerEvent, !1),
            e.addEventListener("touchend", f.registerEvent, !1)),
          e.addEventListener("mousedown", h, !1);
      }),
      (t.attach = function (t, e) {
        var i, o;
        (t = r(t)),
          "[object Array]" === n.call(e) && (e = e.join(" ")),
          (e = e ? " " + e : "");
        for (var s = 0, a = t.length; s < a; s++)
          (o = (i = t[s]).tagName.toLowerCase()),
            -1 !== ["input", "img"].indexOf(o) &&
              (c[o](i), (i = i.parentElement)),
            -1 === i.className.indexOf("waves-effect") &&
              (i.className += " waves-effect" + e);
      }),
      (t.ripple = function (t, e) {
        var n = (t = r(t)).length;
        if (
          (((e = e || {}).wait = e.wait || 0),
          (e.position = e.position || null),
          n)
        )
          for (
            var i,
              o,
              a,
              c = {},
              u = 0,
              f = { type: "mousedown", button: 1 },
              h = function (t, e) {
                return function () {
                  l.hide(t, e);
                };
              };
            u < n;
            u++
          )
            if (
              ((i = t[u]),
              (o = e.position || {
                x: i.clientWidth / 2,
                y: i.clientHeight / 2,
              }),
              (a = s(i)),
              (c.x = a.left + o.x),
              (c.y = a.top + o.y),
              (f.pageX = c.x),
              (f.pageY = c.y),
              l.show(f, i),
              e.wait >= 0 && null !== e.wait)
            ) {
              setTimeout(h({ type: "mouseup", button: 1 }, i), e.wait);
            }
      }),
      (t.calm = function (t) {
        for (
          var e = { type: "mouseup", button: 1 }, n = 0, i = (t = r(t)).length;
          n < i;
          n++
        )
          l.hide(e, t[n]);
      }),
      (t.displayEffect = function (e) {
        console.error(
          "Waves.displayEffect() has been deprecated and will be removed in future version. Please use Waves.init() to initialize Waves effect"
        ),
          t.init(e);
      }),
      t
    );
  }),
  /*!
   * jQuery SmartPanels v1.0.0
   *
   * Copyright 2019, 2020 SmartAdmin WebApp
   * Released under Marketplace License (see your license details for usage)
   *
   * Publish Date: 2018-01-01T17:42Z
   */
  (function (t, e, n, i) {
    var o,
      r = "smartPanel";
    function s(e, n) {
      (this.obj = t(e)),
        (this.o = t.extend({}, t.fn[r].defaults, n)),
        (this.objId = this.obj.attr("id")),
        (this.panel = this.obj.find(this.o.panels)),
        (this.storage = { enabled: this.o.localStorage }),
        (this.initialized = !1),
        this.init();
    }
    (o =
      "ontouchstart" in e || (e.DocumentTouch && n instanceof DocumentTouch)
        ? "click tap"
        : "click"),
      (s.prototype = {
        _runPanelLoader: function (t) {
          !0 === this.o.localStorage &&
            t
              .closest(this.o.panels)
              .find(".panel-saving")
              .stop(!0, !0)
              .fadeIn(100)
              .delay(600)
              .fadeOut(100);
        },
        _loadKeys: function () {
          var t = this,
            e = t.o.pageKey || location.pathname;
          (t.storage.keySettings = "smartPanel_settings_" + e + "_" + t.objId),
            (t.storage.keyPosition =
              "smartPanel_position_" + e + "_" + t.objId);
        },
        _savePanelSettings: function () {
          var e = this,
            n = e.storage;
          e._loadKeys();
          var i = e.obj
              .find(e.o.panels)
              .map(function () {
                var e = {};
                return (
                  (e.id = t(this).attr("id")),
                  (e.style = t(this).attr("data-panel-attstyle")),
                  (e.locked = t(this).hasClass("panel-locked") ? 1 : 0),
                  (e.collapsed = t(this).hasClass("panel-collapsed") ? 1 : 0),
                  e
                );
              })
              .get(),
            o = JSON.stringify({ panel: i });
          n.enabled &&
            n.getKeySettings != o &&
            (localStorage.setItem(n.keySettings, o), (n.getKeySettings = o)),
            "function" == typeof e.o.onSave &&
              (e.o.onSave.call(this, null, o, n.keySettings),
              myapp_config.debugState &&
                console.log("keySettings: " + n.keySettings));
        },
        _savePanelPosition: function () {
          var e = this,
            n = e.storage;
          e._loadKeys();
          var i = e.obj
              .find(e.o.grid + ".sortable-grid")
              .map(function () {
                return {
                  section: t(this)
                    .children(e.o.panels)
                    .map(function () {
                      return { id: t(this).attr("id") };
                    })
                    .get(),
                };
              })
              .get(),
            o = JSON.stringify({ grid: i });
          n.enabled &&
            n.getKeyPosition != o &&
            (localStorage.setItem(n.keyPosition, o), (n.getKeyPosition = o)),
            "function" == typeof e.o.onSave &&
              e.o.onSave.call(this, o, n.keyPosition);
        },
        init: function () {
          var e = this;
          if (!e.initialized) {
            if (
              (e._initStorage(e.storage),
              t("#" + e.objId).length ||
                ("undefined" != typeof bootbox
                  ? bootbox.alert("Your panel ID is missing!")
                  : alert("Your panel ID is missing!")),
              t(e.o.grid).each(function () {
                t(this).find(e.o.panels).length &&
                  t(this).addClass("sortable-grid");
              }),
              e.storage.enabled && e.storage.getKeyPosition)
            ) {
              var n = JSON.parse(e.storage.getKeyPosition);
              for (var r in n.grid) {
                var s = e.obj.find(e.o.grid + ".sortable-grid").eq(r);
                for (var a in n.grid[r].section)
                  s.append(t("#" + n.grid[r].section[a].id));
              }
            }
            if (e.storage.enabled && e.storage.getKeySettings) {
              var l = JSON.parse(e.storage.getKeySettings);
              for (var r in (myapp_config.debugState &&
                console.log(
                  "Panel settings loaded: " + e.storage.getKeySettings
                ),
              l.panel)) {
                var c = t("#" + l.panel[r].id);
                l.panel[r].style &&
                  c
                    .attr("data-panel-attstyle", "" + l.panel[r].style)
                    .children(".panel-hdr")
                    .removeClassPrefix("bg-")
                    .addClass(l.panel[r].style),
                  1 == l.panel[r].collapsed &&
                    c
                      .addClass("panel-collapsed")
                      .children(".panel-container")
                      .addClass("collapse")
                      .removeClass("show"),
                  1 == l.panel[r].locked && c.addClass("panel-locked");
              }
            }
            if (e.o.panelColors && e.o.colorButton) {
              var u = [];
              for (var r in e.o.panelColors)
                u.push(
                  '<a href="#" class="btn d-inline-block ' +
                    e.o.panelColors[r] +
                    ' width-2 height-2 p-0 rounded-0 js-panel-color hover-effect-dot" data-panel-setstyle="' +
                    e.o.panelColors[r] +
                    '" style="margin:1px;"></a>'
                );
            }
            if (
              (e.panel.each(function () {
                var n,
                  o,
                  r,
                  s,
                  a,
                  l,
                  c,
                  f,
                  h = t(this),
                  d = t(this).children(".panel-hdr"),
                  p = t(this).children(".panel-container");
                if (!d.parent().attr("role")) {
                  !0 === e.o.sortable &&
                    h.data("panel-sortable") === i &&
                    h.addClass("panel-sortable"),
                    (n =
                      !0 === e.o.closeButton && h.data("panel-close") === i
                        ? '<a href="#" class="btn btn-panel hover-effect-dot js-panel-close" data-toggle="tooltip" data-offset="0,10" data-original-title="Close"></a>'
                        : ""),
                    (o =
                      !0 === e.o.fullscreenButton &&
                      h.data("panel-fullscreen") === i
                        ? '<a href="#" class="btn btn-panel hover-effect-dot js-panel-fullscreen" data-toggle="tooltip" data-offset="0,10" data-original-title="Fullscreen"></a>'
                        : ""),
                    (r =
                      !0 === e.o.collapseButton &&
                      h.data("panel-collapsed") === i
                        ? '<a href="#" class="btn btn-panel hover-effect-dot js-panel-collapse" data-toggle="tooltip" data-offset="0,10" data-original-title="Collapse"></a>'
                        : ""),
                    (s =
                      !0 === e.o.lockedButton && h.data("panel-locked") === i
                        ? '<a href="#" class="dropdown-item js-panel-locked"><span data-i18n="drpdwn.lockpanel">' +
                          e.o.lockedButtonLabel +
                          "</span></a>"
                        : ""),
                    !0 === e.o.refreshButton && h.data("panel-refresh") === i
                      ? ((a =
                          '<a href="#" class="dropdown-item js-panel-refresh"><span data-i18n="drpdwn.refreshpanel">' +
                          e.o.refreshButtonLabel +
                          "</span></a>"),
                        p.prepend(
                          '<div class="loader"><i class="fal fa-spinner-third fa-spin-4x fs-xxl"></i></div>'
                        ))
                      : (a = ""),
                    (l =
                      !0 === e.o.colorButton && h.data("panel-color") === i
                        ? ' <div class="dropdown-multilevel dropdown-multilevel-left">\t\t\t\t\t\t\t\t\t\t\t<div class="dropdown-item">\t\t\t\t\t\t\t\t\t\t\t\t<span data-i18n="drpdwn.panelcolor">' +
                          e.o.colorButtonLabel +
                          '</span>\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t\t<div class="dropdown-menu d-flex flex-wrap" style="min-width: 9.5rem; width: 9.5rem; padding: 0.5rem">' +
                          u.join(" ") +
                          "</div>\t\t\t\t\t\t\t\t\t\t</div>"
                        : ""),
                    (c =
                      !0 === e.o.resetButton && h.data("panel-reset") === i
                        ? '<div class="dropdown-divider m-0"></div><a href="#" class="dropdown-item js-panel-reset"><span data-i18n="drpdwn.resetpanel">' +
                          e.o.resetButtonLabel +
                          "</span></a>"
                        : ""),
                    (f =
                      !0 === e.o.customButton &&
                      h.data("panel-custombutton") === i
                        ? '<a href="#" class="dropdown-item js-panel-custombutton pl-4"><span data-i18n="drpdwn.custombutton">' +
                          e.o.customButtonLabel +
                          "</span></a>"
                        : ""),
                    d.append(
                      '<div class="panel-saving mr-2" style="display:none"><i class="fal fa-spinner-third fa-spin-4x fs-xl"></i></div>'
                    );
                  var g = e.o.buttonOrder
                    .replace(/%close%/g, n)
                    .replace(/%fullscreen%/g, o)
                    .replace(/%collapse%/g, r);
                  ("" === n && "" === o && "" === r) ||
                    d.append('<div class="panel-toolbar">' + g + "</div>");
                  var m = e.o.buttonOrderDropdown
                    .replace(/%locked%/g, s)
                    .replace(/%color%/g, l)
                    .replace(/%refresh%/g, a)
                    .replace(/%reset%/g, c)
                    .replace(/%custom%/g, f);
                  ("" === s && "" === l && "" === a && "" === c && "" === f) ||
                    d.append(
                      '<div class="panel-toolbar"><a href="#" class="btn btn-toolbar-master" data-toggle="dropdown"><i class="fal fa-ellipsis-v"></i></a><div class="dropdown-menu dropdown-menu-animated dropdown-menu-right p-0">' +
                        m +
                        "</div></div>"
                    ),
                    h
                      .attr("role", "widget")
                      .children("div")
                      .attr("role", "content")
                      .prev(".panel-hdr")
                      .attr("role", "heading")
                      .children(".panel-toolbar")
                      .attr("role", "menu");
                }
              }),
              !0 === e.o.sortable && jQuery.ui)
            ) {
              var f = e.obj
                .find(e.o.grid + ".sortable-grid")
                .not("[data-panel-excludegrid]");
              f.sortable({
                items: f.find(e.o.panels + ".panel-sortable"),
                connectWith: f,
                placeholder: e.o.placeholderClass,
                cursor: "move",
                opacity: e.o.opacity,
                delay: 0,
                revert: 350,
                cancel:
                  ".btn-panel, .panel-fullscreen .panel-fullscreen, .mod-panel-disable .panel-sortable, .panel-locked.panel-sortable",
                zIndex: 1e4,
                handle: e.o.dragHandle,
                forcePlaceholderSize: !0,
                forceHelperSize: !0,
                update: function (t, n) {
                  e._runPanelLoader(n.item.children()),
                    e._savePanelPosition(),
                    "function" == typeof e.o.onChange &&
                      e.o.onChange.call(this, n.item);
                },
              });
            }
            e._clickEvents(),
              e.storage.enabled &&
                (t(e.o.deleteSettingsKey).on(o, this, function (t) {
                  confirm(e.o.settingsKeyLabel) &&
                    localStorage.removeItem(keySettings),
                    t.preventDefault();
                }),
                t(e.o.deletePositionKey).on(o, this, function (t) {
                  confirm(e.o.positionKeyLabel) &&
                    localStorage.removeItem(keyPosition),
                    t.preventDefault();
                })),
              (initialized = !0);
          }
        },
        _initStorage: function (t) {
          (t.enabled =
            t.enabled &&
            !!(function () {
              var t,
                e = +new Date();
              try {
                return (
                  localStorage.setItem(e, e),
                  (t = localStorage.getItem(e) == e),
                  localStorage.removeItem(e),
                  t
                );
              } catch (t) {}
            })()),
            this._loadKeys(),
            t.enabled &&
              ((t.getKeySettings = localStorage.getItem(t.keySettings)),
              (t.getKeyPosition = localStorage.getItem(t.keyPosition)));
        },
        _clickEvents: function () {
          var e = this,
            n = e.panel.children(".panel-hdr");
          n.on(o, ".js-panel-collapse", function (n) {
            var i = t(this),
              o = i.closest(e.o.panels);
            void 0 !== t.fn.tooltip && t('[data-toggle="tooltip"]').length
              ? t(this).tooltip("hide")
              : console.log("bs.tooltip is not loaded"),
              o
                .children(".panel-container")
                .collapse("toggle")
                .on("shown.bs.collapse", function () {
                  o.removeClass("panel-collapsed"), e._savePanelSettings();
                })
                .on("hidden.bs.collapse", function () {
                  o.addClass("panel-collapsed"), e._savePanelSettings();
                }),
              e._runPanelLoader(i),
              "function" == typeof e.o.onCollapse &&
                e.o.onCollapse.call(this, o),
              n.preventDefault();
          }),
            n.on(o, ".js-panel-fullscreen", function (n) {
              var i = t(this),
                o = i.closest(e.o.panels);
              void 0 !== t.fn.tooltip && t('[data-toggle="tooltip"]').length
                ? t(this).tooltip("hide")
                : console.log("bs.tooltip is not loaded"),
                o.toggleClass("panel-fullscreen"),
                myapp_config.root_.toggleClass("panel-fullscreen"),
                e._runPanelLoader(i),
                "function" == typeof e.o.onFullscreen &&
                  e.o.onFullscreen.call(this, o),
                n.preventDefault();
            }),
            n.on(o, ".js-panel-close", function (n) {
              var i = t(this),
                o = i.closest(e.o.panels),
                r = o.children(".panel-hdr").children("h2").text().trim();
              void 0 !== t.fn.tooltip && t('[data-toggle="tooltip"]').length
                ? t(this).tooltip("hide")
                : console.log("bs.tooltip is not loaded");
              var s = function () {
                o.fadeOut(500, function () {
                  t(this).remove(),
                    "function" == typeof e.o.onClosepanel &&
                      e.o.onClosepanel.call(this, o);
                }),
                  e._runPanelLoader(i);
              };
              initApp.playSound("media/sound", "messagebox"),
                "undefined" != typeof bootbox
                  ? bootbox.confirm({
                      title:
                        "<i class='fal fa-times-circle text-danger mr-2'></i> Do you wish to delete panel <span class='fw-500'>&nbsp;'" +
                        r +
                        "'&nbsp;</span>?",
                      message:
                        "<span><strong>Warning:</strong> This action cannot be undone!</span>",
                      centerVertical: !0,
                      swapButtonOrder: !0,
                      buttons: {
                        confirm: {
                          label: "Yes",
                          className: "btn-danger shadow-0",
                        },
                        cancel: { label: "No", className: "btn-default" },
                      },
                      className: "modal-alert",
                      closeButton: !1,
                      callback: function (t) {
                        1 == t && s();
                      },
                    })
                  : confirm("Do you wish to delete panel " + r + "?") && s(),
                n.preventDefault();
            }),
            n.on(o, ".js-panel-color", function (n) {
              var i = t(this),
                o = i.closest(e.o.panels),
                r = i.closest(".panel-hdr"),
                s = i.data("panel-setstyle");
              r
                .removeClassPrefix("bg-")
                .addClass(s)
                .closest(".panel")
                .attr("data-panel-attstyle", "" + s),
                "function" == typeof e.o.onColor && e.o.onColor.call(this, o),
                e._runPanelLoader(i),
                e._savePanelSettings(),
                n.preventDefault();
            }),
            n.on(o, ".js-panel-locked", function (n) {
              var i = t(this),
                o = i.closest(e.o.panels);
              o.toggleClass("panel-locked"),
                e._runPanelLoader(i),
                "function" == typeof e.o.onLocked && e.o.onLocked.call(this, o),
                e._savePanelSettings(),
                n.preventDefault();
            }),
            n.on(o, ".js-panel-refresh", function (n) {
              var i = t(this).closest(e.o.panels),
                o = i.attr("data-refresh-timer") || 1500;
              i
                .addClass("panel-refresh")
                .children(".panel-container")
                .addClass("enable-loader")
                .stop(!0, !0)
                .delay(o)
                .queue(function () {
                  i
                    .removeClass("panel-refresh")
                    .children(".panel-container")
                    .removeClass("enable-loader")
                    .dequeue(),
                    console.log(i.attr("id") + " refresh complete");
                }),
                "function" == typeof e.o.onRefresh &&
                  e.o.onRefresh.call(this, i),
                n.preventDefault();
            }),
            n.on(o, ".js-panel-reset", function (n) {
              var i = t(this),
                o = i.closest(e.o.panels);
              i
                .closest(".panel-hdr")
                .removeClassPrefix("bg-")
                .closest(".panel")
                .removeClass("panel-collapsed panel-fullscreen panel-locked")
                .attr("data-panel-attstyle", "")
                .children(".panel-container")
                .collapse("show"),
                e._runPanelLoader(i),
                e._savePanelSettings(),
                "function" == typeof e.o.onReset && e.o.onReset.call(this, o),
                n.preventDefault();
            }),
            (n = null);
        },
        destroy: function () {
          var n = this,
            i = "." + r,
            o = n.obj
              .find(n.o.grid + ".sortable-grid")
              .not("[data-panel-excludegrid]");
          n.panel.removeClass("panel-sortable"),
            o.sortable("destroy"),
            n.panel.children(".panel-hdr").off(i),
            t(n.o.deletePositionKey).off(i),
            t(e).off(i),
            n.obj.removeData(r),
            (n.initialized = !1);
        },
      }),
      (t.fn[r] = function (e) {
        return this.each(function () {
          var n = t(this),
            i = n.data(r);
          if (!i) {
            var o = "object" == typeof e && e;
            n.data(r, (i = new s(this, o)));
          }
          "string" == typeof e && i[e]();
        });
      }),
      (t.fn[r].defaults = {
        grid: '[class*="col-"]',
        panels: ".panel",
        placeholderClass: "panel-placeholder",
        dragHandle: "> .panel-hdr > h2",
        localStorage: !0,
        onChange: function () {},
        onSave: function () {},
        opacity: 1,
        deleteSettingsKey: "",
        settingsKeyLabel: "Reset settings?",
        deletePositionKey: "",
        positionKeyLabel: "Reset position?",
        sortable: !0,
        buttonOrder: "%collapse% %fullscreen% %close%",
        buttonOrderDropdown: "%refresh% %locked% %color% %custom% %reset%",
        customButton: !1,
        customButtonLabel: "Custom Label",
        onCustom: function () {},
        closeButton: !0,
        onClosepanel: function () {
          myapp_config.debugState &&
            console.log(t(this).closest(".panel").attr("id") + " onClosepanel");
        },
        fullscreenButton: !0,
        onFullscreen: function () {
          myapp_config.debugState &&
            console.log(t(this).closest(".panel").attr("id") + " onFullscreen");
        },
        collapseButton: !0,
        onCollapse: function () {
          myapp_config.debugState &&
            console.log(t(this).closest(".panel").attr("id") + " onCollapse");
        },
        lockedButton: !0,
        lockedButtonLabel: "Lock Position",
        onLocked: function () {
          myapp_config.debugState &&
            console.log(t(this).closest(".panel").attr("id") + " onLocked");
        },
        refreshButton: !0,
        refreshButtonLabel: "Refresh Content",
        onRefresh: function () {
          myapp_config.debugState &&
            console.log(t(this).closest(".panel").attr("id") + " onRefresh");
        },
        colorButton: !0,
        colorButtonLabel: "Panel Style",
        onColor: function () {
          myapp_config.debugState &&
            console.log(t(this).closest(".panel").attr("id") + " onColor");
        },
        panelColors: [
          "bg-primary-700 bg-success-gradient",
          "bg-primary-500 bg-info-gradient",
          "bg-primary-600 bg-primary-gradient",
          "bg-info-600 bg-primray-gradient",
          "bg-info-600 bg-info-gradient",
          "bg-info-700 bg-success-gradient",
          "bg-success-900 bg-info-gradient",
          "bg-success-700 bg-primary-gradient",
          "bg-success-600 bg-success-gradient",
          "bg-danger-900 bg-info-gradient",
          "bg-fusion-400 bg-fusion-gradient",
          "bg-faded",
        ],
        resetButton: !0,
        resetButtonLabel: "Reset Panel",
        onReset: function () {
          myapp_config.debugState &&
            console.log(
              t(this).closest(".panel").attr("id") + " onReset callback"
            );
        },
      });
  })(jQuery, window, document);
