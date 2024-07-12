!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : (e.moment = t());
})(this, function () {
  "use strict";
  var e, t;
  function n() {
    return e.apply(null, arguments);
  }
  function s(e) {
    return (
      e instanceof Array ||
      "[object Array]" === Object.prototype.toString.call(e)
    );
  }
  function i(e) {
    return null != e && "[object Object]" === Object.prototype.toString.call(e);
  }
  function r(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }
  function a(e) {
    if (Object.getOwnPropertyNames)
      return 0 === Object.getOwnPropertyNames(e).length;
    for (var t in e) if (r(e, t)) return;
    return 1;
  }
  function o(e) {
    return void 0 === e;
  }
  function u(e) {
    return (
      "number" == typeof e ||
      "[object Number]" === Object.prototype.toString.call(e)
    );
  }
  function l(e) {
    return (
      e instanceof Date || "[object Date]" === Object.prototype.toString.call(e)
    );
  }
  function h(e, t) {
    for (var n = [], s = 0; s < e.length; ++s) n.push(t(e[s], s));
    return n;
  }
  function d(e, t) {
    for (var n in t) r(t, n) && (e[n] = t[n]);
    return (
      r(t, "toString") && (e.toString = t.toString),
      r(t, "valueOf") && (e.valueOf = t.valueOf),
      e
    );
  }
  function c(e, t, n, s) {
    return Ot(e, t, n, s, !0).utc();
  }
  function f(e) {
    return (
      null == e._pf &&
        (e._pf = {
          empty: !1,
          unusedTokens: [],
          unusedInput: [],
          overflow: -2,
          charsLeftOver: 0,
          nullInput: !1,
          invalidEra: null,
          invalidMonth: null,
          invalidFormat: !1,
          userInvalidated: !1,
          iso: !1,
          parsedDateParts: [],
          era: null,
          meridiem: null,
          rfc2822: !1,
          weekdayMismatch: !1,
        }),
      e._pf
    );
  }
  function m(e) {
    if (null == e._isValid) {
      var n = f(e),
        s = t.call(n.parsedDateParts, function (e) {
          return null != e;
        }),
        i =
          !isNaN(e._d.getTime()) &&
          n.overflow < 0 &&
          !n.empty &&
          !n.invalidEra &&
          !n.invalidMonth &&
          !n.invalidWeekday &&
          !n.weekdayMismatch &&
          !n.nullInput &&
          !n.invalidFormat &&
          !n.userInvalidated &&
          (!n.meridiem || (n.meridiem && s));
      if (
        (e._strict &&
          (i =
            i &&
            0 === n.charsLeftOver &&
            0 === n.unusedTokens.length &&
            void 0 === n.bigHour),
        null != Object.isFrozen && Object.isFrozen(e))
      )
        return i;
      e._isValid = i;
    }
    return e._isValid;
  }
  function _(e) {
    var t = c(NaN);
    return null != e ? d(f(t), e) : (f(t).userInvalidated = !0), t;
  }
  t = Array.prototype.some
    ? Array.prototype.some
    : function (e) {
        for (var t = Object(this), n = t.length >>> 0, s = 0; s < n; s++)
          if (s in t && e.call(this, t[s], s, t)) return !0;
        return !1;
      };
  var y = (n.momentProperties = []),
    g = !1;
  function w(e, t) {
    var n, s, i;
    if (
      (o(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject),
      o(t._i) || (e._i = t._i),
      o(t._f) || (e._f = t._f),
      o(t._l) || (e._l = t._l),
      o(t._strict) || (e._strict = t._strict),
      o(t._tzm) || (e._tzm = t._tzm),
      o(t._isUTC) || (e._isUTC = t._isUTC),
      o(t._offset) || (e._offset = t._offset),
      o(t._pf) || (e._pf = f(t)),
      o(t._locale) || (e._locale = t._locale),
      0 < y.length)
    )
      for (n = 0; n < y.length; n++) o((i = t[(s = y[n])])) || (e[s] = i);
    return e;
  }
  function p(e) {
    w(this, e),
      (this._d = new Date(null != e._d ? e._d.getTime() : NaN)),
      this.isValid() || (this._d = new Date(NaN)),
      !1 === g && ((g = !0), n.updateOffset(this), (g = !1));
  }
  function v(e) {
    return e instanceof p || (null != e && null != e._isAMomentObject);
  }
  function k(e) {
    !1 === n.suppressDeprecationWarnings &&
      "undefined" != typeof console &&
      console.warn &&
      console.warn("Deprecation warning: " + e);
  }
  function M(e, t) {
    var s = !0;
    return d(function () {
      if ((null != n.deprecationHandler && n.deprecationHandler(null, e), s)) {
        for (var i, a, o = [], u = 0; u < arguments.length; u++) {
          if (((i = ""), "object" == typeof arguments[u])) {
            for (a in ((i += "\n[" + u + "] "), arguments[0]))
              r(arguments[0], a) && (i += a + ": " + arguments[0][a] + ", ");
            i = i.slice(0, -2);
          } else i = arguments[u];
          o.push(i);
        }
        k(
          e +
            "\nArguments: " +
            Array.prototype.slice.call(o).join("") +
            "\n" +
            new Error().stack
        ),
          (s = !1);
      }
      return t.apply(this, arguments);
    }, t);
  }
  var D,
    S = {};
  function Y(e, t) {
    null != n.deprecationHandler && n.deprecationHandler(e, t),
      S[e] || (k(t), (S[e] = !0));
  }
  function O(e) {
    return (
      ("undefined" != typeof Function && e instanceof Function) ||
      "[object Function]" === Object.prototype.toString.call(e)
    );
  }
  function b(e, t) {
    var n,
      s = d({}, e);
    for (n in t)
      r(t, n) &&
        (i(e[n]) && i(t[n])
          ? ((s[n] = {}), d(s[n], e[n]), d(s[n], t[n]))
          : null != t[n]
          ? (s[n] = t[n])
          : delete s[n]);
    for (n in e) r(e, n) && !r(t, n) && i(e[n]) && (s[n] = d({}, s[n]));
    return s;
  }
  function x(e) {
    null != e && this.set(e);
  }
  function T(e, t, n) {
    var s = "" + Math.abs(e),
      i = t - s.length;
    return (
      (0 <= e ? (n ? "+" : "") : "-") +
      Math.pow(10, Math.max(0, i)).toString().substr(1) +
      s
    );
  }
  (n.suppressDeprecationWarnings = !1),
    (n.deprecationHandler = null),
    (D = Object.keys
      ? Object.keys
      : function (e) {
          var t,
            n = [];
          for (t in e) r(e, t) && n.push(t);
          return n;
        });
  var N =
      /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
    P = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
    R = {},
    W = {};
  function C(e, t, n, s) {
    var i =
      "string" == typeof s
        ? function () {
            return this[s]();
          }
        : s;
    e && (W[e] = i),
      t &&
        (W[t[0]] = function () {
          return T(i.apply(this, arguments), t[1], t[2]);
        }),
      n &&
        (W[n] = function () {
          return this.localeData().ordinal(i.apply(this, arguments), e);
        });
  }
  function U(e, t) {
    return e.isValid()
      ? ((t = H(t, e.localeData())),
        (R[t] =
          R[t] ||
          (function (e) {
            for (var t, n = e.match(N), s = 0, i = n.length; s < i; s++)
              W[n[s]]
                ? (n[s] = W[n[s]])
                : (n[s] = (t = n[s]).match(/\[[\s\S]/)
                    ? t.replace(/^\[|\]$/g, "")
                    : t.replace(/\\/g, ""));
            return function (t) {
              for (var s = "", r = 0; r < i; r++)
                s += O(n[r]) ? n[r].call(t, e) : n[r];
              return s;
            };
          })(t)),
        R[t](e))
      : e.localeData().invalidDate();
  }
  function H(e, t) {
    var n = 5;
    function s(e) {
      return t.longDateFormat(e) || e;
    }
    for (P.lastIndex = 0; 0 <= n && P.test(e); )
      (e = e.replace(P, s)), (P.lastIndex = 0), --n;
    return e;
  }
  var F = {};
  function L(e, t) {
    var n = e.toLowerCase();
    F[n] = F[n + "s"] = F[t] = e;
  }
  function V(e) {
    return "string" == typeof e ? F[e] || F[e.toLowerCase()] : void 0;
  }
  function G(e) {
    var t,
      n,
      s = {};
    for (n in e) r(e, n) && (t = V(n)) && (s[t] = e[n]);
    return s;
  }
  var E = {};
  function A(e, t) {
    E[e] = t;
  }
  function j(e) {
    return (e % 4 == 0 && e % 100 != 0) || e % 400 == 0;
  }
  function I(e) {
    return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
  }
  function Z(e) {
    var t = +e,
      n = 0;
    return 0 != t && isFinite(t) && (n = I(t)), n;
  }
  function z(e, t) {
    return function (s) {
      return null != s
        ? (q(this, e, s), n.updateOffset(this, t), this)
        : $(this, e);
    };
  }
  function $(e, t) {
    return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN;
  }
  function q(e, t, n) {
    e.isValid() &&
      !isNaN(n) &&
      ("FullYear" === t && j(e.year()) && 1 === e.month() && 29 === e.date()
        ? ((n = Z(n)),
          e._d["set" + (e._isUTC ? "UTC" : "") + t](
            n,
            e.month(),
            xe(n, e.month())
          ))
        : e._d["set" + (e._isUTC ? "UTC" : "") + t](n));
  }
  var B,
    J = /\d/,
    Q = /\d\d/,
    X = /\d{3}/,
    K = /\d{4}/,
    ee = /[+-]?\d{6}/,
    te = /\d\d?/,
    ne = /\d\d\d\d?/,
    se = /\d\d\d\d\d\d?/,
    ie = /\d{1,3}/,
    re = /\d{1,4}/,
    ae = /[+-]?\d{1,6}/,
    oe = /\d+/,
    ue = /[+-]?\d+/,
    le = /Z|[+-]\d\d:?\d\d/gi,
    he = /Z|[+-]\d\d(?::?\d\d)?/gi,
    de =
      /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;
  function ce(e, t, n) {
    B[e] = O(t)
      ? t
      : function (e, s) {
          return e && n ? n : t;
        };
  }
  function fe(e, t) {
    return r(B, e)
      ? B[e](t._strict, t._locale)
      : new RegExp(
          me(
            e
              .replace("\\", "")
              .replace(
                /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
                function (e, t, n, s, i) {
                  return t || n || s || i;
                }
              )
          )
        );
  }
  function me(e) {
    return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  }
  B = {};
  var _e = {};
  function ye(e, t) {
    var n,
      s = t;
    for (
      "string" == typeof e && (e = [e]),
        u(t) &&
          (s = function (e, n) {
            n[t] = Z(e);
          }),
        n = 0;
      n < e.length;
      n++
    )
      _e[e[n]] = s;
  }
  function ge(e, t) {
    ye(e, function (e, n, s, i) {
      (s._w = s._w || {}), t(e, s._w, s, i);
    });
  }
  var we,
    pe = 0,
    ve = 1,
    ke = 2,
    Me = 3,
    De = 4,
    Se = 5,
    Ye = 6,
    Oe = 7,
    be = 8;
  function xe(e, t) {
    if (isNaN(e) || isNaN(t)) return NaN;
    var n = ((t % 12) + 12) % 12;
    return (e += (t - n) / 12), 1 == n ? (j(e) ? 29 : 28) : 31 - ((n % 7) % 2);
  }
  (we = Array.prototype.indexOf
    ? Array.prototype.indexOf
    : function (e) {
        for (var t = 0; t < this.length; ++t) if (this[t] === e) return t;
        return -1;
      }),
    C("M", ["MM", 2], "Mo", function () {
      return this.month() + 1;
    }),
    C("MMM", 0, 0, function (e) {
      return this.localeData().monthsShort(this, e);
    }),
    C("MMMM", 0, 0, function (e) {
      return this.localeData().months(this, e);
    }),
    L("month", "M"),
    A("month", 8),
    ce("M", te),
    ce("MM", te, Q),
    ce("MMM", function (e, t) {
      return t.monthsShortRegex(e);
    }),
    ce("MMMM", function (e, t) {
      return t.monthsRegex(e);
    }),
    ye(["M", "MM"], function (e, t) {
      t[ve] = Z(e) - 1;
    }),
    ye(["MMM", "MMMM"], function (e, t, n, s) {
      var i = n._locale.monthsParse(e, s, n._strict);
      null != i ? (t[ve] = i) : (f(n).invalidMonth = e);
    });
  var Te =
      "January_February_March_April_May_June_July_August_September_October_November_December".split(
        "_"
      ),
    Ne = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
    Pe = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
    Re = de,
    We = de;
  function Ce(e, t) {
    var n;
    if (!e.isValid()) return e;
    if ("string" == typeof t)
      if (/^\d+$/.test(t)) t = Z(t);
      else if (!u((t = e.localeData().monthsParse(t)))) return e;
    return (
      (n = Math.min(e.date(), xe(e.year(), t))),
      e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, n),
      e
    );
  }
  function Ue(e) {
    return null != e
      ? (Ce(this, e), n.updateOffset(this, !0), this)
      : $(this, "Month");
  }
  function He() {
    function e(e, t) {
      return t.length - e.length;
    }
    for (var t, n = [], s = [], i = [], r = 0; r < 12; r++)
      (t = c([2e3, r])),
        n.push(this.monthsShort(t, "")),
        s.push(this.months(t, "")),
        i.push(this.months(t, "")),
        i.push(this.monthsShort(t, ""));
    for (n.sort(e), s.sort(e), i.sort(e), r = 0; r < 12; r++)
      (n[r] = me(n[r])), (s[r] = me(s[r]));
    for (r = 0; r < 24; r++) i[r] = me(i[r]);
    (this._monthsRegex = new RegExp("^(" + i.join("|") + ")", "i")),
      (this._monthsShortRegex = this._monthsRegex),
      (this._monthsStrictRegex = new RegExp("^(" + s.join("|") + ")", "i")),
      (this._monthsShortStrictRegex = new RegExp(
        "^(" + n.join("|") + ")",
        "i"
      ));
  }
  function Fe(e) {
    return j(e) ? 366 : 365;
  }
  C("Y", 0, 0, function () {
    var e = this.year();
    return e <= 9999 ? T(e, 4) : "+" + e;
  }),
    C(0, ["YY", 2], 0, function () {
      return this.year() % 100;
    }),
    C(0, ["YYYY", 4], 0, "year"),
    C(0, ["YYYYY", 5], 0, "year"),
    C(0, ["YYYYYY", 6, !0], 0, "year"),
    L("year", "y"),
    A("year", 1),
    ce("Y", ue),
    ce("YY", te, Q),
    ce("YYYY", re, K),
    ce("YYYYY", ae, ee),
    ce("YYYYYY", ae, ee),
    ye(["YYYYY", "YYYYYY"], pe),
    ye("YYYY", function (e, t) {
      t[pe] = 2 === e.length ? n.parseTwoDigitYear(e) : Z(e);
    }),
    ye("YY", function (e, t) {
      t[pe] = n.parseTwoDigitYear(e);
    }),
    ye("Y", function (e, t) {
      t[pe] = parseInt(e, 10);
    }),
    (n.parseTwoDigitYear = function (e) {
      return Z(e) + (68 < Z(e) ? 1900 : 2e3);
    });
  var Le = z("FullYear", !0);
  function Ve(e) {
    var t, n;
    return (
      e < 100 && 0 <= e
        ? (((n = Array.prototype.slice.call(arguments))[0] = e + 400),
          (t = new Date(Date.UTC.apply(null, n))),
          isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e))
        : (t = new Date(Date.UTC.apply(null, arguments))),
      t
    );
  }
  function Ge(e, t, n) {
    var s = 7 + t - n;
    return s - ((7 + Ve(e, 0, s).getUTCDay() - t) % 7) - 1;
  }
  function Ee(e, t, n, s, i) {
    var r,
      a = 1 + 7 * (t - 1) + ((7 + n - s) % 7) + Ge(e, s, i),
      o =
        a <= 0
          ? Fe((r = e - 1)) + a
          : a > Fe(e)
          ? ((r = e + 1), a - Fe(e))
          : ((r = e), a);
    return { year: r, dayOfYear: o };
  }
  function Ae(e, t, n) {
    var s,
      i,
      r = Ge(e.year(), t, n),
      a = Math.floor((e.dayOfYear() - r - 1) / 7) + 1;
    return (
      a < 1
        ? (s = a + je((i = e.year() - 1), t, n))
        : a > je(e.year(), t, n)
        ? ((s = a - je(e.year(), t, n)), (i = e.year() + 1))
        : ((i = e.year()), (s = a)),
      { week: s, year: i }
    );
  }
  function je(e, t, n) {
    var s = Ge(e, t, n),
      i = Ge(e + 1, t, n);
    return (Fe(e) - s + i) / 7;
  }
  function Ie(e, t) {
    return e.slice(t, 7).concat(e.slice(0, t));
  }
  C("w", ["ww", 2], "wo", "week"),
    C("W", ["WW", 2], "Wo", "isoWeek"),
    L("week", "w"),
    L("isoWeek", "W"),
    A("week", 5),
    A("isoWeek", 5),
    ce("w", te),
    ce("ww", te, Q),
    ce("W", te),
    ce("WW", te, Q),
    ge(["w", "ww", "W", "WW"], function (e, t, n, s) {
      t[s.substr(0, 1)] = Z(e);
    }),
    C("d", 0, "do", "day"),
    C("dd", 0, 0, function (e) {
      return this.localeData().weekdaysMin(this, e);
    }),
    C("ddd", 0, 0, function (e) {
      return this.localeData().weekdaysShort(this, e);
    }),
    C("dddd", 0, 0, function (e) {
      return this.localeData().weekdays(this, e);
    }),
    C("e", 0, 0, "weekday"),
    C("E", 0, 0, "isoWeekday"),
    L("day", "d"),
    L("weekday", "e"),
    L("isoWeekday", "E"),
    A("day", 11),
    A("weekday", 11),
    A("isoWeekday", 11),
    ce("d", te),
    ce("e", te),
    ce("E", te),
    ce("dd", function (e, t) {
      return t.weekdaysMinRegex(e);
    }),
    ce("ddd", function (e, t) {
      return t.weekdaysShortRegex(e);
    }),
    ce("dddd", function (e, t) {
      return t.weekdaysRegex(e);
    }),
    ge(["dd", "ddd", "dddd"], function (e, t, n, s) {
      var i = n._locale.weekdaysParse(e, s, n._strict);
      null != i ? (t.d = i) : (f(n).invalidWeekday = e);
    }),
    ge(["d", "e", "E"], function (e, t, n, s) {
      t[s] = Z(e);
    });
  var Ze = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
      "_"
    ),
    ze = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
    $e = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
    qe = de,
    Be = de,
    Je = de;
  function Qe() {
    function e(e, t) {
      return t.length - e.length;
    }
    for (var t, n, s, i, r = [], a = [], o = [], u = [], l = 0; l < 7; l++)
      (t = c([2e3, 1]).day(l)),
        (n = me(this.weekdaysMin(t, ""))),
        (s = me(this.weekdaysShort(t, ""))),
        (i = me(this.weekdays(t, ""))),
        r.push(n),
        a.push(s),
        o.push(i),
        u.push(n),
        u.push(s),
        u.push(i);
    r.sort(e),
      a.sort(e),
      o.sort(e),
      u.sort(e),
      (this._weekdaysRegex = new RegExp("^(" + u.join("|") + ")", "i")),
      (this._weekdaysShortRegex = this._weekdaysRegex),
      (this._weekdaysMinRegex = this._weekdaysRegex),
      (this._weekdaysStrictRegex = new RegExp("^(" + o.join("|") + ")", "i")),
      (this._weekdaysShortStrictRegex = new RegExp(
        "^(" + a.join("|") + ")",
        "i"
      )),
      (this._weekdaysMinStrictRegex = new RegExp(
        "^(" + r.join("|") + ")",
        "i"
      ));
  }
  function Xe() {
    return this.hours() % 12 || 12;
  }
  function Ke(e, t) {
    C(e, 0, 0, function () {
      return this.localeData().meridiem(this.hours(), this.minutes(), t);
    });
  }
  function et(e, t) {
    return t._meridiemParse;
  }
  C("H", ["HH", 2], 0, "hour"),
    C("h", ["hh", 2], 0, Xe),
    C("k", ["kk", 2], 0, function () {
      return this.hours() || 24;
    }),
    C("hmm", 0, 0, function () {
      return "" + Xe.apply(this) + T(this.minutes(), 2);
    }),
    C("hmmss", 0, 0, function () {
      return "" + Xe.apply(this) + T(this.minutes(), 2) + T(this.seconds(), 2);
    }),
    C("Hmm", 0, 0, function () {
      return "" + this.hours() + T(this.minutes(), 2);
    }),
    C("Hmmss", 0, 0, function () {
      return "" + this.hours() + T(this.minutes(), 2) + T(this.seconds(), 2);
    }),
    Ke("a", !0),
    Ke("A", !1),
    L("hour", "h"),
    A("hour", 13),
    ce("a", et),
    ce("A", et),
    ce("H", te),
    ce("h", te),
    ce("k", te),
    ce("HH", te, Q),
    ce("hh", te, Q),
    ce("kk", te, Q),
    ce("hmm", ne),
    ce("hmmss", se),
    ce("Hmm", ne),
    ce("Hmmss", se),
    ye(["H", "HH"], Me),
    ye(["k", "kk"], function (e, t, n) {
      var s = Z(e);
      t[Me] = 24 === s ? 0 : s;
    }),
    ye(["a", "A"], function (e, t, n) {
      (n._isPm = n._locale.isPM(e)), (n._meridiem = e);
    }),
    ye(["h", "hh"], function (e, t, n) {
      (t[Me] = Z(e)), (f(n).bigHour = !0);
    }),
    ye("hmm", function (e, t, n) {
      var s = e.length - 2;
      (t[Me] = Z(e.substr(0, s))),
        (t[De] = Z(e.substr(s))),
        (f(n).bigHour = !0);
    }),
    ye("hmmss", function (e, t, n) {
      var s = e.length - 4,
        i = e.length - 2;
      (t[Me] = Z(e.substr(0, s))),
        (t[De] = Z(e.substr(s, 2))),
        (t[Se] = Z(e.substr(i))),
        (f(n).bigHour = !0);
    }),
    ye("Hmm", function (e, t, n) {
      var s = e.length - 2;
      (t[Me] = Z(e.substr(0, s))), (t[De] = Z(e.substr(s)));
    }),
    ye("Hmmss", function (e, t, n) {
      var s = e.length - 4,
        i = e.length - 2;
      (t[Me] = Z(e.substr(0, s))),
        (t[De] = Z(e.substr(s, 2))),
        (t[Se] = Z(e.substr(i)));
    });
  var tt,
    nt = z("Hours", !0),
    st = {
      calendar: {
        sameDay: "[Today at] LT",
        nextDay: "[Tomorrow at] LT",
        nextWeek: "dddd [at] LT",
        lastDay: "[Yesterday at] LT",
        lastWeek: "[Last] dddd [at] LT",
        sameElse: "L",
      },
      longDateFormat: {
        LTS: "h:mm:ss A",
        LT: "h:mm A",
        L: "MM/DD/YYYY",
        LL: "MMMM D, YYYY",
        LLL: "MMMM D, YYYY h:mm A",
        LLLL: "dddd, MMMM D, YYYY h:mm A",
      },
      invalidDate: "Invalid date",
      ordinal: "%d",
      dayOfMonthOrdinalParse: /\d{1,2}/,
      relativeTime: {
        future: "in %s",
        past: "%s ago",
        s: "a few seconds",
        ss: "%d seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        w: "a week",
        ww: "%d weeks",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years",
      },
      months: Te,
      monthsShort: Ne,
      week: { dow: 0, doy: 6 },
      weekdays: Ze,
      weekdaysMin: $e,
      weekdaysShort: ze,
      meridiemParse: /[ap]\.?m?\.?/i,
    },
    it = {},
    rt = {};
  function at(e) {
    return e ? e.toLowerCase().replace("_", "-") : e;
  }
  function ot(e) {
    var t;
    if (
      void 0 === it[e] &&
      "undefined" != typeof module &&
      module &&
      module.exports
    )
      try {
        (t = tt._abbr), require("./locale/" + e), ut(t);
      } catch (t) {
        it[e] = null;
      }
    return it[e];
  }
  function ut(e, t) {
    var n;
    return (
      e &&
        ((n = o(t) ? ht(e) : lt(e, t))
          ? (tt = n)
          : "undefined" != typeof console &&
            console.warn &&
            console.warn(
              "Locale " + e + " not found. Did you forget to load it?"
            )),
      tt._abbr
    );
  }
  function lt(e, t) {
    if (null === t) return delete it[e], null;
    var n,
      s = st;
    if (((t.abbr = e), null != it[e]))
      Y(
        "defineLocaleOverride",
        "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
      ),
        (s = it[e]._config);
    else if (null != t.parentLocale)
      if (null != it[t.parentLocale]) s = it[t.parentLocale]._config;
      else {
        if (null == (n = ot(t.parentLocale)))
          return (
            rt[t.parentLocale] || (rt[t.parentLocale] = []),
            rt[t.parentLocale].push({ name: e, config: t }),
            null
          );
        s = n._config;
      }
    return (
      (it[e] = new x(b(s, t))),
      rt[e] &&
        rt[e].forEach(function (e) {
          lt(e.name, e.config);
        }),
      ut(e),
      it[e]
    );
  }
  function ht(e) {
    var t;
    if ((e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e))
      return tt;
    if (!s(e)) {
      if ((t = ot(e))) return t;
      e = [e];
    }
    return (function (e) {
      for (var t, n, s, i, r = 0; r < e.length; ) {
        for (
          t = (i = at(e[r]).split("-")).length,
            n = (n = at(e[r + 1])) ? n.split("-") : null;
          0 < t;

        ) {
          if ((s = ot(i.slice(0, t).join("-")))) return s;
          if (
            n &&
            n.length >= t &&
            (function (e, t) {
              for (var n = Math.min(e.length, t.length), s = 0; s < n; s += 1)
                if (e[s] !== t[s]) return s;
              return n;
            })(i, n) >=
              t - 1
          )
            break;
          t--;
        }
        r++;
      }
      return tt;
    })(e);
  }
  function dt(e) {
    var t,
      n = e._a;
    return (
      n &&
        -2 === f(e).overflow &&
        ((t =
          n[ve] < 0 || 11 < n[ve]
            ? ve
            : n[ke] < 1 || n[ke] > xe(n[pe], n[ve])
            ? ke
            : n[Me] < 0 ||
              24 < n[Me] ||
              (24 === n[Me] && (0 !== n[De] || 0 !== n[Se] || 0 !== n[Ye]))
            ? Me
            : n[De] < 0 || 59 < n[De]
            ? De
            : n[Se] < 0 || 59 < n[Se]
            ? Se
            : n[Ye] < 0 || 999 < n[Ye]
            ? Ye
            : -1),
        f(e)._overflowDayOfYear && (t < pe || ke < t) && (t = ke),
        f(e)._overflowWeeks && -1 === t && (t = Oe),
        f(e)._overflowWeekday && -1 === t && (t = be),
        (f(e).overflow = t)),
      e
    );
  }
  var ct =
      /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
    ft =
      /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
    mt = /Z|[+-]\d\d(?::?\d\d)?/,
    _t = [
      ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
      ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
      ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
      ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
      ["YYYY-DDD", /\d{4}-\d{3}/],
      ["YYYY-MM", /\d{4}-\d\d/, !1],
      ["YYYYYYMMDD", /[+-]\d{10}/],
      ["YYYYMMDD", /\d{8}/],
      ["GGGG[W]WWE", /\d{4}W\d{3}/],
      ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
      ["YYYYDDD", /\d{7}/],
      ["YYYYMM", /\d{6}/, !1],
      ["YYYY", /\d{4}/, !1],
    ],
    yt = [
      ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
      ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
      ["HH:mm:ss", /\d\d:\d\d:\d\d/],
      ["HH:mm", /\d\d:\d\d/],
      ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
      ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
      ["HHmmss", /\d\d\d\d\d\d/],
      ["HHmm", /\d\d\d\d/],
      ["HH", /\d\d/],
    ],
    gt = /^\/?Date\((-?\d+)/i,
    wt =
      /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
    pt = {
      UT: 0,
      GMT: 0,
      EDT: -240,
      EST: -300,
      CDT: -300,
      CST: -360,
      MDT: -360,
      MST: -420,
      PDT: -420,
      PST: -480,
    };
  function vt(e) {
    var t,
      n,
      s,
      i,
      r,
      a,
      o = e._i,
      u = ct.exec(o) || ft.exec(o);
    if (u) {
      for (f(e).iso = !0, t = 0, n = _t.length; t < n; t++)
        if (_t[t][1].exec(u[1])) {
          (i = _t[t][0]), (s = !1 !== _t[t][2]);
          break;
        }
      if (null == i) return void (e._isValid = !1);
      if (u[3]) {
        for (t = 0, n = yt.length; t < n; t++)
          if (yt[t][1].exec(u[3])) {
            r = (u[2] || " ") + yt[t][0];
            break;
          }
        if (null == r) return void (e._isValid = !1);
      }
      if (!s && null != r) return void (e._isValid = !1);
      if (u[4]) {
        if (!mt.exec(u[4])) return void (e._isValid = !1);
        a = "Z";
      }
      (e._f = i + (r || "") + (a || "")), St(e);
    } else e._isValid = !1;
  }
  function kt(e) {
    var t,
      n,
      s,
      i,
      r = wt.exec(
        e._i
          .replace(/\([^)]*\)|[\n\t]/g, " ")
          .replace(/(\s\s+)/g, " ")
          .replace(/^\s\s*/, "")
          .replace(/\s\s*$/, "")
      );
    if (r) {
      if (
        ((t = (function (e, t, n, s, i, r) {
          var a = [
            (function (e) {
              var t = parseInt(e, 10);
              return t <= 49 ? 2e3 + t : t <= 999 ? 1900 + t : t;
            })(e),
            Ne.indexOf(t),
            parseInt(n, 10),
            parseInt(s, 10),
            parseInt(i, 10),
          ];
          return r && a.push(parseInt(r, 10)), a;
        })(r[4], r[3], r[2], r[5], r[6], r[7])),
        (s = t),
        (i = e),
        (n = r[1]) &&
          ze.indexOf(n) !== new Date(s[0], s[1], s[2]).getDay() &&
          ((f(i).weekdayMismatch = !0), !void (i._isValid = !1)))
      )
        return;
      (e._a = t),
        (e._tzm = (function (e, t, n) {
          if (e) return pt[e];
          if (t) return 0;
          var s = parseInt(n, 10),
            i = s % 100;
          return ((s - i) / 100) * 60 + i;
        })(r[8], r[9], r[10])),
        (e._d = Ve.apply(null, e._a)),
        e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm),
        (f(e).rfc2822 = !0);
    } else e._isValid = !1;
  }
  function Mt(e, t, n) {
    return null != e ? e : null != t ? t : n;
  }
  function Dt(e) {
    var t,
      s,
      i,
      r,
      a,
      o,
      u,
      l = [];
    if (!e._d) {
      for (
        o = e,
          u = new Date(n.now()),
          i = o._useUTC
            ? [u.getUTCFullYear(), u.getUTCMonth(), u.getUTCDate()]
            : [u.getFullYear(), u.getMonth(), u.getDate()],
          e._w &&
            null == e._a[ke] &&
            null == e._a[ve] &&
            (function (e) {
              var t, n, s, i, r, a, o, u, l;
              null != (t = e._w).GG || null != t.W || null != t.E
                ? ((r = 1),
                  (a = 4),
                  (n = Mt(t.GG, e._a[pe], Ae(bt(), 1, 4).year)),
                  (s = Mt(t.W, 1)),
                  ((i = Mt(t.E, 1)) < 1 || 7 < i) && (u = !0))
                : ((r = e._locale._week.dow),
                  (a = e._locale._week.doy),
                  (l = Ae(bt(), r, a)),
                  (n = Mt(t.gg, e._a[pe], l.year)),
                  (s = Mt(t.w, l.week)),
                  null != t.d
                    ? ((i = t.d) < 0 || 6 < i) && (u = !0)
                    : null != t.e
                    ? ((i = t.e + r), (t.e < 0 || 6 < t.e) && (u = !0))
                    : (i = r)),
                s < 1 || s > je(n, r, a)
                  ? (f(e)._overflowWeeks = !0)
                  : null != u
                  ? (f(e)._overflowWeekday = !0)
                  : ((o = Ee(n, s, i, r, a)),
                    (e._a[pe] = o.year),
                    (e._dayOfYear = o.dayOfYear));
            })(e),
          null != e._dayOfYear &&
            ((a = Mt(e._a[pe], i[pe])),
            (e._dayOfYear > Fe(a) || 0 === e._dayOfYear) &&
              (f(e)._overflowDayOfYear = !0),
            (s = Ve(a, 0, e._dayOfYear)),
            (e._a[ve] = s.getUTCMonth()),
            (e._a[ke] = s.getUTCDate())),
          t = 0;
        t < 3 && null == e._a[t];
        ++t
      )
        e._a[t] = l[t] = i[t];
      for (; t < 7; t++)
        e._a[t] = l[t] = null == e._a[t] ? (2 === t ? 1 : 0) : e._a[t];
      24 === e._a[Me] &&
        0 === e._a[De] &&
        0 === e._a[Se] &&
        0 === e._a[Ye] &&
        ((e._nextDay = !0), (e._a[Me] = 0)),
        (e._d = (
          e._useUTC
            ? Ve
            : function (e, t, n, s, i, r, a) {
                var o;
                return (
                  e < 100 && 0 <= e
                    ? ((o = new Date(e + 400, t, n, s, i, r, a)),
                      isFinite(o.getFullYear()) && o.setFullYear(e))
                    : (o = new Date(e, t, n, s, i, r, a)),
                  o
                );
              }
        ).apply(null, l)),
        (r = e._useUTC ? e._d.getUTCDay() : e._d.getDay()),
        null != e._tzm && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm),
        e._nextDay && (e._a[Me] = 24),
        e._w &&
          void 0 !== e._w.d &&
          e._w.d !== r &&
          (f(e).weekdayMismatch = !0);
    }
  }
  function St(e) {
    if (e._f !== n.ISO_8601)
      if (e._f !== n.RFC_2822) {
        (e._a = []), (f(e).empty = !0);
        for (
          var t,
            s,
            i,
            a,
            o,
            u,
            l,
            h = "" + e._i,
            d = h.length,
            c = 0,
            m = H(e._f, e._locale).match(N) || [],
            _ = 0;
          _ < m.length;
          _++
        )
          (s = m[_]),
            (t = (h.match(fe(s, e)) || [])[0]) &&
              (0 < (i = h.substr(0, h.indexOf(t))).length &&
                f(e).unusedInput.push(i),
              (h = h.slice(h.indexOf(t) + t.length)),
              (c += t.length)),
            W[s]
              ? (t ? (f(e).empty = !1) : f(e).unusedTokens.push(s),
                (o = s),
                (l = e),
                null != (u = t) && r(_e, o) && _e[o](u, l._a, l, o))
              : e._strict && !t && f(e).unusedTokens.push(s);
        (f(e).charsLeftOver = d - c),
          0 < h.length && f(e).unusedInput.push(h),
          e._a[Me] <= 12 &&
            !0 === f(e).bigHour &&
            0 < e._a[Me] &&
            (f(e).bigHour = void 0),
          (f(e).parsedDateParts = e._a.slice(0)),
          (f(e).meridiem = e._meridiem),
          (e._a[Me] = (function (e, t, n) {
            var s;
            return null == n
              ? t
              : null != e.meridiemHour
              ? e.meridiemHour(t, n)
              : (null != e.isPM &&
                  ((s = e.isPM(n)) && t < 12 && (t += 12),
                  s || 12 !== t || (t = 0)),
                t);
          })(e._locale, e._a[Me], e._meridiem)),
          null !== (a = f(e).era) &&
            (e._a[pe] = e._locale.erasConvertYear(a, e._a[pe])),
          Dt(e),
          dt(e);
      } else kt(e);
    else vt(e);
  }
  function Yt(e) {
    var t,
      r,
      a = e._i,
      c = e._f;
    return (
      (e._locale = e._locale || ht(e._l)),
      null === a || (void 0 === c && "" === a)
        ? _({ nullInput: !0 })
        : ("string" == typeof a && (e._i = a = e._locale.preparse(a)),
          v(a)
            ? new p(dt(a))
            : (l(a)
                ? (e._d = a)
                : s(c)
                ? (function (e) {
                    var t,
                      n,
                      s,
                      i,
                      r,
                      a,
                      o = !1;
                    if (0 === e._f.length)
                      return (f(e).invalidFormat = !0), (e._d = new Date(NaN));
                    for (i = 0; i < e._f.length; i++)
                      (r = 0),
                        (a = !1),
                        (t = w({}, e)),
                        null != e._useUTC && (t._useUTC = e._useUTC),
                        (t._f = e._f[i]),
                        St(t),
                        m(t) && (a = !0),
                        (r += f(t).charsLeftOver),
                        (r += 10 * f(t).unusedTokens.length),
                        (f(t).score = r),
                        o
                          ? r < s && ((s = r), (n = t))
                          : (null == s || r < s || a) &&
                            ((s = r), (n = t), a && (o = !0));
                    d(e, n || t);
                  })(e)
                : c
                ? St(e)
                : o((r = (t = e)._i))
                ? (t._d = new Date(n.now()))
                : l(r)
                ? (t._d = new Date(r.valueOf()))
                : "string" == typeof r
                ? (function (e) {
                    var t = gt.exec(e._i);
                    null === t
                      ? (vt(e),
                        !1 === e._isValid &&
                          (delete e._isValid,
                          kt(e),
                          !1 === e._isValid &&
                            (delete e._isValid,
                            e._strict
                              ? (e._isValid = !1)
                              : n.createFromInputFallback(e))))
                      : (e._d = new Date(+t[1]));
                  })(t)
                : s(r)
                ? ((t._a = h(r.slice(0), function (e) {
                    return parseInt(e, 10);
                  })),
                  Dt(t))
                : i(r)
                ? (function (e) {
                    var t, n;
                    e._d ||
                      ((n = void 0 === (t = G(e._i)).day ? t.date : t.day),
                      (e._a = h(
                        [
                          t.year,
                          t.month,
                          n,
                          t.hour,
                          t.minute,
                          t.second,
                          t.millisecond,
                        ],
                        function (e) {
                          return e && parseInt(e, 10);
                        }
                      )),
                      Dt(e));
                  })(t)
                : u(r)
                ? (t._d = new Date(r))
                : n.createFromInputFallback(t),
              m(e) || (e._d = null),
              e))
    );
  }
  function Ot(e, t, n, r, o) {
    var u,
      l = {};
    return (
      (!0 !== t && !1 !== t) || ((r = t), (t = void 0)),
      (!0 !== n && !1 !== n) || ((r = n), (n = void 0)),
      ((i(e) && a(e)) || (s(e) && 0 === e.length)) && (e = void 0),
      (l._isAMomentObject = !0),
      (l._useUTC = l._isUTC = o),
      (l._l = n),
      (l._i = e),
      (l._f = t),
      (l._strict = r),
      (u = new p(dt(Yt(l))))._nextDay && (u.add(1, "d"), (u._nextDay = void 0)),
      u
    );
  }
  function bt(e, t, n, s) {
    return Ot(e, t, n, s, !1);
  }
  (n.createFromInputFallback = M(
    "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
    function (e) {
      e._d = new Date(e._i + (e._useUTC ? " UTC" : ""));
    }
  )),
    (n.ISO_8601 = function () {}),
    (n.RFC_2822 = function () {});
  var xt = M(
      "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
      function () {
        var e = bt.apply(null, arguments);
        return this.isValid() && e.isValid() ? (e < this ? this : e) : _();
      }
    ),
    Tt = M(
      "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
      function () {
        var e = bt.apply(null, arguments);
        return this.isValid() && e.isValid() ? (this < e ? this : e) : _();
      }
    );
  function Nt(e, t) {
    var n, i;
    if ((1 === t.length && s(t[0]) && (t = t[0]), !t.length)) return bt();
    for (n = t[0], i = 1; i < t.length; ++i)
      (t[i].isValid() && !t[i][e](n)) || (n = t[i]);
    return n;
  }
  var Pt = [
    "year",
    "quarter",
    "month",
    "week",
    "day",
    "hour",
    "minute",
    "second",
    "millisecond",
  ];
  function Rt(e) {
    var t = G(e),
      n = t.year || 0,
      s = t.quarter || 0,
      i = t.month || 0,
      a = t.week || t.isoWeek || 0,
      o = t.day || 0,
      u = t.hour || 0,
      l = t.minute || 0,
      h = t.second || 0,
      d = t.millisecond || 0;
    (this._isValid = (function (e) {
      var t,
        n,
        s = !1;
      for (t in e)
        if (r(e, t) && (-1 === we.call(Pt, t) || (null != e[t] && isNaN(e[t]))))
          return !1;
      for (n = 0; n < Pt.length; ++n)
        if (e[Pt[n]]) {
          if (s) return !1;
          parseFloat(e[Pt[n]]) !== Z(e[Pt[n]]) && (s = !0);
        }
      return !0;
    })(t)),
      (this._milliseconds = +d + 1e3 * h + 6e4 * l + 1e3 * u * 60 * 60),
      (this._days = +o + 7 * a),
      (this._months = +i + 3 * s + 12 * n),
      (this._data = {}),
      (this._locale = ht()),
      this._bubble();
  }
  function Wt(e) {
    return e instanceof Rt;
  }
  function Ct(e) {
    return e < 0 ? -1 * Math.round(-1 * e) : Math.round(e);
  }
  function Ut(e, t) {
    C(e, 0, 0, function () {
      var e = this.utcOffset(),
        n = "+";
      return (
        e < 0 && ((e = -e), (n = "-")),
        n + T(~~(e / 60), 2) + t + T(~~e % 60, 2)
      );
    });
  }
  Ut("Z", ":"),
    Ut("ZZ", ""),
    ce("Z", he),
    ce("ZZ", he),
    ye(["Z", "ZZ"], function (e, t, n) {
      (n._useUTC = !0), (n._tzm = Ft(he, e));
    });
  var Ht = /([\+\-]|\d\d)/gi;
  function Ft(e, t) {
    var n,
      s,
      i = (t || "").match(e);
    return null === i
      ? null
      : 0 ===
        (s =
          60 *
            (n = ((i[i.length - 1] || []) + "").match(Ht) || ["-", 0, 0])[1] +
          Z(n[2]))
      ? 0
      : "+" === n[0]
      ? s
      : -s;
  }
  function Lt(e, t) {
    var s, i;
    return t._isUTC
      ? ((s = t.clone()),
        (i = (v(e) || l(e) ? e.valueOf() : bt(e).valueOf()) - s.valueOf()),
        s._d.setTime(s._d.valueOf() + i),
        n.updateOffset(s, !1),
        s)
      : bt(e).local();
  }
  function Vt(e) {
    return -Math.round(e._d.getTimezoneOffset());
  }
  function Gt() {
    return !!this.isValid() && this._isUTC && 0 === this._offset;
  }
  n.updateOffset = function () {};
  var Et = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
    At =
      /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
  function jt(e, t) {
    var n,
      s,
      i,
      a = e,
      o = null;
    return (
      Wt(e)
        ? (a = { ms: e._milliseconds, d: e._days, M: e._months })
        : u(e) || !isNaN(+e)
        ? ((a = {}), t ? (a[t] = +e) : (a.milliseconds = +e))
        : (o = Et.exec(e))
        ? ((n = "-" === o[1] ? -1 : 1),
          (a = {
            y: 0,
            d: Z(o[ke]) * n,
            h: Z(o[Me]) * n,
            m: Z(o[De]) * n,
            s: Z(o[Se]) * n,
            ms: Z(Ct(1e3 * o[Ye])) * n,
          }))
        : (o = At.exec(e))
        ? ((n = "-" === o[1] ? -1 : 1),
          (a = {
            y: It(o[2], n),
            M: It(o[3], n),
            w: It(o[4], n),
            d: It(o[5], n),
            h: It(o[6], n),
            m: It(o[7], n),
            s: It(o[8], n),
          }))
        : null == a
        ? (a = {})
        : "object" == typeof a &&
          ("from" in a || "to" in a) &&
          ((i = (function (e, t) {
            var n;
            return e.isValid() && t.isValid()
              ? ((t = Lt(t, e)),
                e.isBefore(t)
                  ? (n = Zt(e, t))
                  : (((n = Zt(t, e)).milliseconds = -n.milliseconds),
                    (n.months = -n.months)),
                n)
              : { milliseconds: 0, months: 0 };
          })(bt(a.from), bt(a.to))),
          ((a = {}).ms = i.milliseconds),
          (a.M = i.months)),
      (s = new Rt(a)),
      Wt(e) && r(e, "_locale") && (s._locale = e._locale),
      Wt(e) && r(e, "_isValid") && (s._isValid = e._isValid),
      s
    );
  }
  function It(e, t) {
    var n = e && parseFloat(e.replace(",", "."));
    return (isNaN(n) ? 0 : n) * t;
  }
  function Zt(e, t) {
    var n = {};
    return (
      (n.months = t.month() - e.month() + 12 * (t.year() - e.year())),
      e.clone().add(n.months, "M").isAfter(t) && --n.months,
      (n.milliseconds = t - e.clone().add(n.months, "M")),
      n
    );
  }
  function zt(e, t) {
    return function (n, s) {
      var i;
      return (
        null === s ||
          isNaN(+s) ||
          (Y(
            t,
            "moment()." +
              t +
              "(period, number) is deprecated. Please use moment()." +
              t +
              "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
          ),
          (i = n),
          (n = s),
          (s = i)),
        $t(this, jt(n, s), e),
        this
      );
    };
  }
  function $t(e, t, s, i) {
    var r = t._milliseconds,
      a = Ct(t._days),
      o = Ct(t._months);
    e.isValid() &&
      ((i = null == i || i),
      o && Ce(e, $(e, "Month") + o * s),
      a && q(e, "Date", $(e, "Date") + a * s),
      r && e._d.setTime(e._d.valueOf() + r * s),
      i && n.updateOffset(e, a || o));
  }
  (jt.fn = Rt.prototype),
    (jt.invalid = function () {
      return jt(NaN);
    });
  var qt = zt(1, "add"),
    Bt = zt(-1, "subtract");
  function Jt(e) {
    return "string" == typeof e || e instanceof String;
  }
  function Qt(e, t) {
    if (e.date() < t.date()) return -Qt(t, e);
    var n = 12 * (t.year() - e.year()) + (t.month() - e.month()),
      s = e.clone().add(n, "months");
    return (
      -(
        n +
        (t - s < 0
          ? (t - s) / (s - e.clone().add(n - 1, "months"))
          : (t - s) / (e.clone().add(1 + n, "months") - s))
      ) || 0
    );
  }
  function Xt(e) {
    var t;
    return void 0 === e
      ? this._locale._abbr
      : (null != (t = ht(e)) && (this._locale = t), this);
  }
  (n.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ"),
    (n.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]");
  var Kt = M(
    "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
    function (e) {
      return void 0 === e ? this.localeData() : this.locale(e);
    }
  );
  function en() {
    return this._locale;
  }
  var tn = 126227808e5;
  function nn(e, t) {
    return ((e % t) + t) % t;
  }
  function sn(e, t, n) {
    return e < 100 && 0 <= e
      ? new Date(e + 400, t, n) - tn
      : new Date(e, t, n).valueOf();
  }
  function rn(e, t, n) {
    return e < 100 && 0 <= e ? Date.UTC(e + 400, t, n) - tn : Date.UTC(e, t, n);
  }
  function an(e, t) {
    return t.erasAbbrRegex(e);
  }
  function on() {
    for (
      var e = [], t = [], n = [], s = [], i = this.eras(), r = 0, a = i.length;
      r < a;
      ++r
    )
      t.push(me(i[r].name)),
        e.push(me(i[r].abbr)),
        n.push(me(i[r].narrow)),
        s.push(me(i[r].name)),
        s.push(me(i[r].abbr)),
        s.push(me(i[r].narrow));
    (this._erasRegex = new RegExp("^(" + s.join("|") + ")", "i")),
      (this._erasNameRegex = new RegExp("^(" + t.join("|") + ")", "i")),
      (this._erasAbbrRegex = new RegExp("^(" + e.join("|") + ")", "i")),
      (this._erasNarrowRegex = new RegExp("^(" + n.join("|") + ")", "i"));
  }
  function un(e, t) {
    C(0, [e, e.length], 0, t);
  }
  function ln(e, t, n, s, i) {
    var r;
    return null == e
      ? Ae(this, s, i).year
      : ((r = je(e, s, i)) < t && (t = r),
        function (e, t, n, s, i) {
          var r = Ee(e, t, n, s, i),
            a = Ve(r.year, 0, r.dayOfYear);
          return (
            this.year(a.getUTCFullYear()),
            this.month(a.getUTCMonth()),
            this.date(a.getUTCDate()),
            this
          );
        }.call(this, e, t, n, s, i));
  }
  C("N", 0, 0, "eraAbbr"),
    C("NN", 0, 0, "eraAbbr"),
    C("NNN", 0, 0, "eraAbbr"),
    C("NNNN", 0, 0, "eraName"),
    C("NNNNN", 0, 0, "eraNarrow"),
    C("y", ["y", 1], "yo", "eraYear"),
    C("y", ["yy", 2], 0, "eraYear"),
    C("y", ["yyy", 3], 0, "eraYear"),
    C("y", ["yyyy", 4], 0, "eraYear"),
    ce("N", an),
    ce("NN", an),
    ce("NNN", an),
    ce("NNNN", function (e, t) {
      return t.erasNameRegex(e);
    }),
    ce("NNNNN", function (e, t) {
      return t.erasNarrowRegex(e);
    }),
    ye(["N", "NN", "NNN", "NNNN", "NNNNN"], function (e, t, n, s) {
      var i = n._locale.erasParse(e, s, n._strict);
      i ? (f(n).era = i) : (f(n).invalidEra = e);
    }),
    ce("y", oe),
    ce("yy", oe),
    ce("yyy", oe),
    ce("yyyy", oe),
    ce("yo", function (e, t) {
      return t._eraYearOrdinalRegex || oe;
    }),
    ye(["y", "yy", "yyy", "yyyy"], pe),
    ye(["yo"], function (e, t, n, s) {
      var i;
      n._locale._eraYearOrdinalRegex &&
        (i = e.match(n._locale._eraYearOrdinalRegex)),
        n._locale.eraYearOrdinalParse
          ? (t[pe] = n._locale.eraYearOrdinalParse(e, i))
          : (t[pe] = parseInt(e, 10));
    }),
    C(0, ["gg", 2], 0, function () {
      return this.weekYear() % 100;
    }),
    C(0, ["GG", 2], 0, function () {
      return this.isoWeekYear() % 100;
    }),
    un("gggg", "weekYear"),
    un("ggggg", "weekYear"),
    un("GGGG", "isoWeekYear"),
    un("GGGGG", "isoWeekYear"),
    L("weekYear", "gg"),
    L("isoWeekYear", "GG"),
    A("weekYear", 1),
    A("isoWeekYear", 1),
    ce("G", ue),
    ce("g", ue),
    ce("GG", te, Q),
    ce("gg", te, Q),
    ce("GGGG", re, K),
    ce("gggg", re, K),
    ce("GGGGG", ae, ee),
    ce("ggggg", ae, ee),
    ge(["gggg", "ggggg", "GGGG", "GGGGG"], function (e, t, n, s) {
      t[s.substr(0, 2)] = Z(e);
    }),
    ge(["gg", "GG"], function (e, t, s, i) {
      t[i] = n.parseTwoDigitYear(e);
    }),
    C("Q", 0, "Qo", "quarter"),
    L("quarter", "Q"),
    A("quarter", 7),
    ce("Q", J),
    ye("Q", function (e, t) {
      t[ve] = 3 * (Z(e) - 1);
    }),
    C("D", ["DD", 2], "Do", "date"),
    L("date", "D"),
    A("date", 9),
    ce("D", te),
    ce("DD", te, Q),
    ce("Do", function (e, t) {
      return e
        ? t._dayOfMonthOrdinalParse || t._ordinalParse
        : t._dayOfMonthOrdinalParseLenient;
    }),
    ye(["D", "DD"], ke),
    ye("Do", function (e, t) {
      t[ke] = Z(e.match(te)[0]);
    });
  var hn = z("Date", !0);
  C("DDD", ["DDDD", 3], "DDDo", "dayOfYear"),
    L("dayOfYear", "DDD"),
    A("dayOfYear", 4),
    ce("DDD", ie),
    ce("DDDD", X),
    ye(["DDD", "DDDD"], function (e, t, n) {
      n._dayOfYear = Z(e);
    }),
    C("m", ["mm", 2], 0, "minute"),
    L("minute", "m"),
    A("minute", 14),
    ce("m", te),
    ce("mm", te, Q),
    ye(["m", "mm"], De);
  var dn = z("Minutes", !1);
  C("s", ["ss", 2], 0, "second"),
    L("second", "s"),
    A("second", 15),
    ce("s", te),
    ce("ss", te, Q),
    ye(["s", "ss"], Se);
  var cn,
    fn,
    mn = z("Seconds", !1);
  for (
    C("S", 0, 0, function () {
      return ~~(this.millisecond() / 100);
    }),
      C(0, ["SS", 2], 0, function () {
        return ~~(this.millisecond() / 10);
      }),
      C(0, ["SSS", 3], 0, "millisecond"),
      C(0, ["SSSS", 4], 0, function () {
        return 10 * this.millisecond();
      }),
      C(0, ["SSSSS", 5], 0, function () {
        return 100 * this.millisecond();
      }),
      C(0, ["SSSSSS", 6], 0, function () {
        return 1e3 * this.millisecond();
      }),
      C(0, ["SSSSSSS", 7], 0, function () {
        return 1e4 * this.millisecond();
      }),
      C(0, ["SSSSSSSS", 8], 0, function () {
        return 1e5 * this.millisecond();
      }),
      C(0, ["SSSSSSSSS", 9], 0, function () {
        return 1e6 * this.millisecond();
      }),
      L("millisecond", "ms"),
      A("millisecond", 16),
      ce("S", ie, J),
      ce("SS", ie, Q),
      ce("SSS", ie, X),
      cn = "SSSS";
    cn.length <= 9;
    cn += "S"
  )
    ce(cn, oe);
  function _n(e, t) {
    t[Ye] = Z(1e3 * ("0." + e));
  }
  for (cn = "S"; cn.length <= 9; cn += "S") ye(cn, _n);
  (fn = z("Milliseconds", !1)),
    C("z", 0, 0, "zoneAbbr"),
    C("zz", 0, 0, "zoneName");
  var yn = p.prototype;
  function gn(e) {
    return e;
  }
  (yn.add = qt),
    (yn.calendar = function (e, t) {
      1 === arguments.length &&
        (arguments[0]
          ? (function (e) {
              return (
                v(e) ||
                l(e) ||
                Jt(e) ||
                u(e) ||
                (function (e) {
                  var t = s(e),
                    n = !1;
                  return (
                    t &&
                      (n =
                        0 ===
                        e.filter(function (t) {
                          return !u(t) && Jt(e);
                        }).length),
                    t && n
                  );
                })(e) ||
                (function (e) {
                  var t,
                    n = i(e) && !a(e),
                    s = !1,
                    o = [
                      "years",
                      "year",
                      "y",
                      "months",
                      "month",
                      "M",
                      "days",
                      "day",
                      "d",
                      "dates",
                      "date",
                      "D",
                      "hours",
                      "hour",
                      "h",
                      "minutes",
                      "minute",
                      "m",
                      "seconds",
                      "second",
                      "s",
                      "milliseconds",
                      "millisecond",
                      "ms",
                    ];
                  for (t = 0; t < o.length; t += 1) s = s || r(e, o[t]);
                  return n && s;
                })(e) ||
                null == e
              );
            })(arguments[0])
            ? ((e = arguments[0]), (t = void 0))
            : (function (e) {
                for (
                  var t = i(e) && !a(e),
                    n = !1,
                    s = [
                      "sameDay",
                      "nextDay",
                      "lastDay",
                      "nextWeek",
                      "lastWeek",
                      "sameElse",
                    ],
                    o = 0;
                  o < s.length;
                  o += 1
                )
                  n = n || r(e, s[o]);
                return t && n;
              })(arguments[0]) && ((t = arguments[0]), (e = void 0))
          : (t = e = void 0));
      var o = e || bt(),
        h = Lt(o, this).startOf("day"),
        d = n.calendarFormat(this, h) || "sameElse",
        c = t && (O(t[d]) ? t[d].call(this, o) : t[d]);
      return this.format(c || this.localeData().calendar(d, this, bt(o)));
    }),
    (yn.clone = function () {
      return new p(this);
    }),
    (yn.diff = function (e, t, n) {
      var s, i, r;
      if (!this.isValid()) return NaN;
      if (!(s = Lt(e, this)).isValid()) return NaN;
      switch (((i = 6e4 * (s.utcOffset() - this.utcOffset())), (t = V(t)))) {
        case "year":
          r = Qt(this, s) / 12;
          break;
        case "month":
          r = Qt(this, s);
          break;
        case "quarter":
          r = Qt(this, s) / 3;
          break;
        case "second":
          r = (this - s) / 1e3;
          break;
        case "minute":
          r = (this - s) / 6e4;
          break;
        case "hour":
          r = (this - s) / 36e5;
          break;
        case "day":
          r = (this - s - i) / 864e5;
          break;
        case "week":
          r = (this - s - i) / 6048e5;
          break;
        default:
          r = this - s;
      }
      return n ? r : I(r);
    }),
    (yn.endOf = function (e) {
      var t, s;
      if (void 0 === (e = V(e)) || "millisecond" === e || !this.isValid())
        return this;
      switch (((s = this._isUTC ? rn : sn), e)) {
        case "year":
          t = s(this.year() + 1, 0, 1) - 1;
          break;
        case "quarter":
          t = s(this.year(), this.month() - (this.month() % 3) + 3, 1) - 1;
          break;
        case "month":
          t = s(this.year(), this.month() + 1, 1) - 1;
          break;
        case "week":
          t =
            s(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
          break;
        case "isoWeek":
          t =
            s(
              this.year(),
              this.month(),
              this.date() - (this.isoWeekday() - 1) + 7
            ) - 1;
          break;
        case "day":
        case "date":
          t = s(this.year(), this.month(), this.date() + 1) - 1;
          break;
        case "hour":
          (t = this._d.valueOf()),
            (t +=
              36e5 -
              nn(t + (this._isUTC ? 0 : 6e4 * this.utcOffset()), 36e5) -
              1);
          break;
        case "minute":
          (t = this._d.valueOf()), (t += 6e4 - nn(t, 6e4) - 1);
          break;
        case "second":
          (t = this._d.valueOf()), (t += 1e3 - nn(t, 1e3) - 1);
      }
      return this._d.setTime(t), n.updateOffset(this, !0), this;
    }),
    (yn.format = function (e) {
      var t = U(
        this,
        (e = e || (this.isUtc() ? n.defaultFormatUtc : n.defaultFormat))
      );
      return this.localeData().postformat(t);
    }),
    (yn.from = function (e, t) {
      return this.isValid() && ((v(e) && e.isValid()) || bt(e).isValid())
        ? jt({ to: this, from: e }).locale(this.locale()).humanize(!t)
        : this.localeData().invalidDate();
    }),
    (yn.fromNow = function (e) {
      return this.from(bt(), e);
    }),
    (yn.to = function (e, t) {
      return this.isValid() && ((v(e) && e.isValid()) || bt(e).isValid())
        ? jt({ from: this, to: e }).locale(this.locale()).humanize(!t)
        : this.localeData().invalidDate();
    }),
    (yn.toNow = function (e) {
      return this.to(bt(), e);
    }),
    (yn.get = function (e) {
      return O(this[(e = V(e))]) ? this[e]() : this;
    }),
    (yn.invalidAt = function () {
      return f(this).overflow;
    }),
    (yn.isAfter = function (e, t) {
      var n = v(e) ? e : bt(e);
      return (
        !(!this.isValid() || !n.isValid()) &&
        ("millisecond" === (t = V(t) || "millisecond")
          ? this.valueOf() > n.valueOf()
          : n.valueOf() < this.clone().startOf(t).valueOf())
      );
    }),
    (yn.isBefore = function (e, t) {
      var n = v(e) ? e : bt(e);
      return (
        !(!this.isValid() || !n.isValid()) &&
        ("millisecond" === (t = V(t) || "millisecond")
          ? this.valueOf() < n.valueOf()
          : this.clone().endOf(t).valueOf() < n.valueOf())
      );
    }),
    (yn.isBetween = function (e, t, n, s) {
      var i = v(e) ? e : bt(e),
        r = v(t) ? t : bt(t);
      return (
        !!(this.isValid() && i.isValid() && r.isValid()) &&
        ("(" === (s = s || "()")[0]
          ? this.isAfter(i, n)
          : !this.isBefore(i, n)) &&
        (")" === s[1] ? this.isBefore(r, n) : !this.isAfter(r, n))
      );
    }),
    (yn.isSame = function (e, t) {
      var n,
        s = v(e) ? e : bt(e);
      return (
        !(!this.isValid() || !s.isValid()) &&
        ("millisecond" === (t = V(t) || "millisecond")
          ? this.valueOf() === s.valueOf()
          : ((n = s.valueOf()),
            this.clone().startOf(t).valueOf() <= n &&
              n <= this.clone().endOf(t).valueOf()))
      );
    }),
    (yn.isSameOrAfter = function (e, t) {
      return this.isSame(e, t) || this.isAfter(e, t);
    }),
    (yn.isSameOrBefore = function (e, t) {
      return this.isSame(e, t) || this.isBefore(e, t);
    }),
    (yn.isValid = function () {
      return m(this);
    }),
    (yn.lang = Kt),
    (yn.locale = Xt),
    (yn.localeData = en),
    (yn.max = Tt),
    (yn.min = xt),
    (yn.parsingFlags = function () {
      return d({}, f(this));
    }),
    (yn.set = function (e, t) {
      if ("object" == typeof e)
        for (
          var n = (function (e) {
              var t,
                n = [];
              for (t in e) r(e, t) && n.push({ unit: t, priority: E[t] });
              return (
                n.sort(function (e, t) {
                  return e.priority - t.priority;
                }),
                n
              );
            })((e = G(e))),
            s = 0;
          s < n.length;
          s++
        )
          this[n[s].unit](e[n[s].unit]);
      else if (O(this[(e = V(e))])) return this[e](t);
      return this;
    }),
    (yn.startOf = function (e) {
      var t, s;
      if (void 0 === (e = V(e)) || "millisecond" === e || !this.isValid())
        return this;
      switch (((s = this._isUTC ? rn : sn), e)) {
        case "year":
          t = s(this.year(), 0, 1);
          break;
        case "quarter":
          t = s(this.year(), this.month() - (this.month() % 3), 1);
          break;
        case "month":
          t = s(this.year(), this.month(), 1);
          break;
        case "week":
          t = s(this.year(), this.month(), this.date() - this.weekday());
          break;
        case "isoWeek":
          t = s(
            this.year(),
            this.month(),
            this.date() - (this.isoWeekday() - 1)
          );
          break;
        case "day":
        case "date":
          t = s(this.year(), this.month(), this.date());
          break;
        case "hour":
          (t = this._d.valueOf()),
            (t -= nn(t + (this._isUTC ? 0 : 6e4 * this.utcOffset()), 36e5));
          break;
        case "minute":
          (t = this._d.valueOf()), (t -= nn(t, 6e4));
          break;
        case "second":
          (t = this._d.valueOf()), (t -= nn(t, 1e3));
      }
      return this._d.setTime(t), n.updateOffset(this, !0), this;
    }),
    (yn.subtract = Bt),
    (yn.toArray = function () {
      var e = this;
      return [
        e.year(),
        e.month(),
        e.date(),
        e.hour(),
        e.minute(),
        e.second(),
        e.millisecond(),
      ];
    }),
    (yn.toObject = function () {
      var e = this;
      return {
        years: e.year(),
        months: e.month(),
        date: e.date(),
        hours: e.hours(),
        minutes: e.minutes(),
        seconds: e.seconds(),
        milliseconds: e.milliseconds(),
      };
    }),
    (yn.toDate = function () {
      return new Date(this.valueOf());
    }),
    (yn.toISOString = function (e) {
      if (!this.isValid()) return null;
      var t = !0 !== e,
        n = t ? this.clone().utc() : this;
      return n.year() < 0 || 9999 < n.year()
        ? U(
            n,
            t
              ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]"
              : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
          )
        : O(Date.prototype.toISOString)
        ? t
          ? this.toDate().toISOString()
          : new Date(this.valueOf() + 60 * this.utcOffset() * 1e3)
              .toISOString()
              .replace("Z", U(n, "Z"))
        : U(
            n,
            t ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
          );
    }),
    (yn.inspect = function () {
      if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
      var e,
        t,
        n,
        s = "moment",
        i = "";
      return (
        this.isLocal() ||
          ((s = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone"),
          (i = "Z")),
        (e = "[" + s + '("]'),
        (t = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY"),
        (n = i + '[")]'),
        this.format(e + t + "-MM-DD[T]HH:mm:ss.SSS" + n)
      );
    }),
    "undefined" != typeof Symbol &&
      null != Symbol.for &&
      (yn[Symbol.for("nodejs.util.inspect.custom")] = function () {
        return "Moment<" + this.format() + ">";
      }),
    (yn.toJSON = function () {
      return this.isValid() ? this.toISOString() : null;
    }),
    (yn.toString = function () {
      return this.clone()
        .locale("en")
        .format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
    }),
    (yn.unix = function () {
      return Math.floor(this.valueOf() / 1e3);
    }),
    (yn.valueOf = function () {
      return this._d.valueOf() - 6e4 * (this._offset || 0);
    }),
    (yn.creationData = function () {
      return {
        input: this._i,
        format: this._f,
        locale: this._locale,
        isUTC: this._isUTC,
        strict: this._strict,
      };
    }),
    (yn.eraName = function () {
      for (
        var e, t = this.localeData().eras(), n = 0, s = t.length;
        n < s;
        ++n
      ) {
        if (
          ((e = this.clone().startOf("day").valueOf()),
          t[n].since <= e && e <= t[n].until)
        )
          return t[n].name;
        if (t[n].until <= e && e <= t[n].since) return t[n].name;
      }
      return "";
    }),
    (yn.eraNarrow = function () {
      for (
        var e, t = this.localeData().eras(), n = 0, s = t.length;
        n < s;
        ++n
      ) {
        if (
          ((e = this.clone().startOf("day").valueOf()),
          t[n].since <= e && e <= t[n].until)
        )
          return t[n].narrow;
        if (t[n].until <= e && e <= t[n].since) return t[n].narrow;
      }
      return "";
    }),
    (yn.eraAbbr = function () {
      for (
        var e, t = this.localeData().eras(), n = 0, s = t.length;
        n < s;
        ++n
      ) {
        if (
          ((e = this.clone().startOf("day").valueOf()),
          t[n].since <= e && e <= t[n].until)
        )
          return t[n].abbr;
        if (t[n].until <= e && e <= t[n].since) return t[n].abbr;
      }
      return "";
    }),
    (yn.eraYear = function () {
      for (
        var e, t, s = this.localeData().eras(), i = 0, r = s.length;
        i < r;
        ++i
      )
        if (
          ((e = s[i].since <= s[i].until ? 1 : -1),
          (t = this.clone().startOf("day").valueOf()),
          (s[i].since <= t && t <= s[i].until) ||
            (s[i].until <= t && t <= s[i].since))
        )
          return (this.year() - n(s[i].since).year()) * e + s[i].offset;
      return this.year();
    }),
    (yn.year = Le),
    (yn.isLeapYear = function () {
      return j(this.year());
    }),
    (yn.weekYear = function (e) {
      return ln.call(
        this,
        e,
        this.week(),
        this.weekday(),
        this.localeData()._week.dow,
        this.localeData()._week.doy
      );
    }),
    (yn.isoWeekYear = function (e) {
      return ln.call(this, e, this.isoWeek(), this.isoWeekday(), 1, 4);
    }),
    (yn.quarter = yn.quarters =
      function (e) {
        return null == e
          ? Math.ceil((this.month() + 1) / 3)
          : this.month(3 * (e - 1) + (this.month() % 3));
      }),
    (yn.month = Ue),
    (yn.daysInMonth = function () {
      return xe(this.year(), this.month());
    }),
    (yn.week = yn.weeks =
      function (e) {
        var t = this.localeData().week(this);
        return null == e ? t : this.add(7 * (e - t), "d");
      }),
    (yn.isoWeek = yn.isoWeeks =
      function (e) {
        var t = Ae(this, 1, 4).week;
        return null == e ? t : this.add(7 * (e - t), "d");
      }),
    (yn.weeksInYear = function () {
      var e = this.localeData()._week;
      return je(this.year(), e.dow, e.doy);
    }),
    (yn.weeksInWeekYear = function () {
      var e = this.localeData()._week;
      return je(this.weekYear(), e.dow, e.doy);
    }),
    (yn.isoWeeksInYear = function () {
      return je(this.year(), 1, 4);
    }),
    (yn.isoWeeksInISOWeekYear = function () {
      return je(this.isoWeekYear(), 1, 4);
    }),
    (yn.date = hn),
    (yn.day = yn.days =
      function (e) {
        if (!this.isValid()) return null != e ? this : NaN;
        var t,
          n,
          s = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        return null != e
          ? ((t = e),
            (n = this.localeData()),
            (e =
              "string" != typeof t
                ? t
                : isNaN(t)
                ? "number" == typeof (t = n.weekdaysParse(t))
                  ? t
                  : null
                : parseInt(t, 10)),
            this.add(e - s, "d"))
          : s;
      }),
    (yn.weekday = function (e) {
      if (!this.isValid()) return null != e ? this : NaN;
      var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
      return null == e ? t : this.add(e - t, "d");
    }),
    (yn.isoWeekday = function (e) {
      if (!this.isValid()) return null != e ? this : NaN;
      if (null == e) return this.day() || 7;
      var t,
        n,
        s =
          ((t = e),
          (n = this.localeData()),
          "string" == typeof t
            ? n.weekdaysParse(t) % 7 || 7
            : isNaN(t)
            ? null
            : t);
      return this.day(this.day() % 7 ? s : s - 7);
    }),
    (yn.dayOfYear = function (e) {
      var t =
        Math.round(
          (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
        ) + 1;
      return null == e ? t : this.add(e - t, "d");
    }),
    (yn.hour = yn.hours = nt),
    (yn.minute = yn.minutes = dn),
    (yn.second = yn.seconds = mn),
    (yn.millisecond = yn.milliseconds = fn),
    (yn.utcOffset = function (e, t, s) {
      var i,
        r = this._offset || 0;
      if (!this.isValid()) return null != e ? this : NaN;
      if (null == e) return this._isUTC ? r : Vt(this);
      if ("string" == typeof e) {
        if (null === (e = Ft(he, e))) return this;
      } else Math.abs(e) < 16 && !s && (e *= 60);
      return (
        !this._isUTC && t && (i = Vt(this)),
        (this._offset = e),
        (this._isUTC = !0),
        null != i && this.add(i, "m"),
        r !== e &&
          (!t || this._changeInProgress
            ? $t(this, jt(e - r, "m"), 1, !1)
            : this._changeInProgress ||
              ((this._changeInProgress = !0),
              n.updateOffset(this, !0),
              (this._changeInProgress = null))),
        this
      );
    }),
    (yn.utc = function (e) {
      return this.utcOffset(0, e);
    }),
    (yn.local = function (e) {
      return (
        this._isUTC &&
          (this.utcOffset(0, e),
          (this._isUTC = !1),
          e && this.subtract(Vt(this), "m")),
        this
      );
    }),
    (yn.parseZone = function () {
      var e;
      return (
        null != this._tzm
          ? this.utcOffset(this._tzm, !1, !0)
          : "string" == typeof this._i &&
            (null != (e = Ft(le, this._i))
              ? this.utcOffset(e)
              : this.utcOffset(0, !0)),
        this
      );
    }),
    (yn.hasAlignedHourOffset = function (e) {
      return (
        !!this.isValid() &&
        ((e = e ? bt(e).utcOffset() : 0), (this.utcOffset() - e) % 60 == 0)
      );
    }),
    (yn.isDST = function () {
      return (
        this.utcOffset() > this.clone().month(0).utcOffset() ||
        this.utcOffset() > this.clone().month(5).utcOffset()
      );
    }),
    (yn.isLocal = function () {
      return !!this.isValid() && !this._isUTC;
    }),
    (yn.isUtcOffset = function () {
      return !!this.isValid() && this._isUTC;
    }),
    (yn.isUtc = Gt),
    (yn.isUTC = Gt),
    (yn.zoneAbbr = function () {
      return this._isUTC ? "UTC" : "";
    }),
    (yn.zoneName = function () {
      return this._isUTC ? "Coordinated Universal Time" : "";
    }),
    (yn.dates = M("dates accessor is deprecated. Use date instead.", hn)),
    (yn.months = M("months accessor is deprecated. Use month instead", Ue)),
    (yn.years = M("years accessor is deprecated. Use year instead", Le)),
    (yn.zone = M(
      "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
      function (e, t) {
        return null != e
          ? ("string" != typeof e && (e = -e), this.utcOffset(e, t), this)
          : -this.utcOffset();
      }
    )),
    (yn.isDSTShifted = M(
      "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
      function () {
        if (!o(this._isDSTShifted)) return this._isDSTShifted;
        var e,
          t = {};
        return (
          w(t, this),
          (t = Yt(t))._a
            ? ((e = (t._isUTC ? c : bt)(t._a)),
              (this._isDSTShifted =
                this.isValid() &&
                0 <
                  (function (e, t, n) {
                    for (
                      var s = Math.min(e.length, t.length),
                        i = Math.abs(e.length - t.length),
                        r = 0,
                        a = 0;
                      a < s;
                      a++
                    )
                      Z(e[a]) !== Z(t[a]) && r++;
                    return r + i;
                  })(t._a, e.toArray())))
            : (this._isDSTShifted = !1),
          this._isDSTShifted
        );
      }
    ));
  var wn = x.prototype;
  function pn(e, t, n, s) {
    var i = ht(),
      r = c().set(s, t);
    return i[n](r, e);
  }
  function vn(e, t, n) {
    if ((u(e) && ((t = e), (e = void 0)), (e = e || ""), null != t))
      return pn(e, t, n, "month");
    for (var s = [], i = 0; i < 12; i++) s[i] = pn(e, i, n, "month");
    return s;
  }
  function kn(e, t, n, s) {
    "boolean" == typeof e
      ? u(t) && ((n = t), (t = void 0))
      : ((t = e), (e = !1), u((n = t)) && ((n = t), (t = void 0))),
      (t = t || "");
    var i,
      r = ht(),
      a = e ? r._week.dow : 0,
      o = [];
    if (null != n) return pn(t, (n + a) % 7, s, "day");
    for (i = 0; i < 7; i++) o[i] = pn(t, (i + a) % 7, s, "day");
    return o;
  }
  (wn.calendar = function (e, t, n) {
    var s = this._calendar[e] || this._calendar.sameElse;
    return O(s) ? s.call(t, n) : s;
  }),
    (wn.longDateFormat = function (e) {
      var t = this._longDateFormat[e],
        n = this._longDateFormat[e.toUpperCase()];
      return t || !n
        ? t
        : ((this._longDateFormat[e] = n
            .match(N)
            .map(function (e) {
              return "MMMM" === e || "MM" === e || "DD" === e || "dddd" === e
                ? e.slice(1)
                : e;
            })
            .join("")),
          this._longDateFormat[e]);
    }),
    (wn.invalidDate = function () {
      return this._invalidDate;
    }),
    (wn.ordinal = function (e) {
      return this._ordinal.replace("%d", e);
    }),
    (wn.preparse = gn),
    (wn.postformat = gn),
    (wn.relativeTime = function (e, t, n, s) {
      var i = this._relativeTime[n];
      return O(i) ? i(e, t, n, s) : i.replace(/%d/i, e);
    }),
    (wn.pastFuture = function (e, t) {
      var n = this._relativeTime[0 < e ? "future" : "past"];
      return O(n) ? n(t) : n.replace(/%s/i, t);
    }),
    (wn.set = function (e) {
      var t, n;
      for (n in e)
        r(e, n) && (O((t = e[n])) ? (this[n] = t) : (this["_" + n] = t));
      (this._config = e),
        (this._dayOfMonthOrdinalParseLenient = new RegExp(
          (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
            "|" +
            /\d{1,2}/.source
        ));
    }),
    (wn.eras = function (e, t) {
      for (
        var s, i = this._eras || ht("en")._eras, r = 0, a = i.length;
        r < a;
        ++r
      ) {
        if ("string" == typeof i[r].since)
          (s = n(i[r].since).startOf("day")), (i[r].since = s.valueOf());
        switch (typeof i[r].until) {
          case "undefined":
            i[r].until = 1 / 0;
            break;
          case "string":
            (s = n(i[r].until).startOf("day").valueOf()),
              (i[r].until = s.valueOf());
        }
      }
      return i;
    }),
    (wn.erasParse = function (e, t, n) {
      var s,
        i,
        r,
        a,
        o,
        u = this.eras();
      for (e = e.toUpperCase(), s = 0, i = u.length; s < i; ++s)
        if (
          ((r = u[s].name.toUpperCase()),
          (a = u[s].abbr.toUpperCase()),
          (o = u[s].narrow.toUpperCase()),
          n)
        )
          switch (t) {
            case "N":
            case "NN":
            case "NNN":
              if (a === e) return u[s];
              break;
            case "NNNN":
              if (r === e) return u[s];
              break;
            case "NNNNN":
              if (o === e) return u[s];
          }
        else if (0 <= [r, a, o].indexOf(e)) return u[s];
    }),
    (wn.erasConvertYear = function (e, t) {
      var s = e.since <= e.until ? 1 : -1;
      return void 0 === t
        ? n(e.since).year()
        : n(e.since).year() + (t - e.offset) * s;
    }),
    (wn.erasAbbrRegex = function (e) {
      return (
        r(this, "_erasAbbrRegex") || on.call(this),
        e ? this._erasAbbrRegex : this._erasRegex
      );
    }),
    (wn.erasNameRegex = function (e) {
      return (
        r(this, "_erasNameRegex") || on.call(this),
        e ? this._erasNameRegex : this._erasRegex
      );
    }),
    (wn.erasNarrowRegex = function (e) {
      return (
        r(this, "_erasNarrowRegex") || on.call(this),
        e ? this._erasNarrowRegex : this._erasRegex
      );
    }),
    (wn.months = function (e, t) {
      return e
        ? s(this._months)
          ? this._months[e.month()]
          : this._months[
              (this._months.isFormat || Pe).test(t) ? "format" : "standalone"
            ][e.month()]
        : s(this._months)
        ? this._months
        : this._months.standalone;
    }),
    (wn.monthsShort = function (e, t) {
      return e
        ? s(this._monthsShort)
          ? this._monthsShort[e.month()]
          : this._monthsShort[Pe.test(t) ? "format" : "standalone"][e.month()]
        : s(this._monthsShort)
        ? this._monthsShort
        : this._monthsShort.standalone;
    }),
    (wn.monthsParse = function (e, t, n) {
      var s, i, r;
      if (this._monthsParseExact)
        return function (e, t, n) {
          var s,
            i,
            r,
            a = e.toLocaleLowerCase();
          if (!this._monthsParse)
            for (
              this._monthsParse = [],
                this._longMonthsParse = [],
                this._shortMonthsParse = [],
                s = 0;
              s < 12;
              ++s
            )
              (r = c([2e3, s])),
                (this._shortMonthsParse[s] = this.monthsShort(
                  r,
                  ""
                ).toLocaleLowerCase()),
                (this._longMonthsParse[s] = this.months(
                  r,
                  ""
                ).toLocaleLowerCase());
          return n
            ? "MMM" === t
              ? -1 !== (i = we.call(this._shortMonthsParse, a))
                ? i
                : null
              : -1 !== (i = we.call(this._longMonthsParse, a))
              ? i
              : null
            : "MMM" === t
            ? -1 !== (i = we.call(this._shortMonthsParse, a)) ||
              -1 !== (i = we.call(this._longMonthsParse, a))
              ? i
              : null
            : -1 !== (i = we.call(this._longMonthsParse, a)) ||
              -1 !== (i = we.call(this._shortMonthsParse, a))
            ? i
            : null;
        }.call(this, e, t, n);
      for (
        this._monthsParse ||
          ((this._monthsParse = []),
          (this._longMonthsParse = []),
          (this._shortMonthsParse = [])),
          s = 0;
        s < 12;
        s++
      ) {
        if (
          ((i = c([2e3, s])),
          n &&
            !this._longMonthsParse[s] &&
            ((this._longMonthsParse[s] = new RegExp(
              "^" + this.months(i, "").replace(".", "") + "$",
              "i"
            )),
            (this._shortMonthsParse[s] = new RegExp(
              "^" + this.monthsShort(i, "").replace(".", "") + "$",
              "i"
            ))),
          n ||
            this._monthsParse[s] ||
            ((r = "^" + this.months(i, "") + "|^" + this.monthsShort(i, "")),
            (this._monthsParse[s] = new RegExp(r.replace(".", ""), "i"))),
          n && "MMMM" === t && this._longMonthsParse[s].test(e))
        )
          return s;
        if (n && "MMM" === t && this._shortMonthsParse[s].test(e)) return s;
        if (!n && this._monthsParse[s].test(e)) return s;
      }
    }),
    (wn.monthsRegex = function (e) {
      return this._monthsParseExact
        ? (r(this, "_monthsRegex") || He.call(this),
          e ? this._monthsStrictRegex : this._monthsRegex)
        : (r(this, "_monthsRegex") || (this._monthsRegex = We),
          this._monthsStrictRegex && e
            ? this._monthsStrictRegex
            : this._monthsRegex);
    }),
    (wn.monthsShortRegex = function (e) {
      return this._monthsParseExact
        ? (r(this, "_monthsRegex") || He.call(this),
          e ? this._monthsShortStrictRegex : this._monthsShortRegex)
        : (r(this, "_monthsShortRegex") || (this._monthsShortRegex = Re),
          this._monthsShortStrictRegex && e
            ? this._monthsShortStrictRegex
            : this._monthsShortRegex);
    }),
    (wn.week = function (e) {
      return Ae(e, this._week.dow, this._week.doy).week;
    }),
    (wn.firstDayOfYear = function () {
      return this._week.doy;
    }),
    (wn.firstDayOfWeek = function () {
      return this._week.dow;
    }),
    (wn.weekdays = function (e, t) {
      var n = s(this._weekdays)
        ? this._weekdays
        : this._weekdays[
            e && !0 !== e && this._weekdays.isFormat.test(t)
              ? "format"
              : "standalone"
          ];
      return !0 === e ? Ie(n, this._week.dow) : e ? n[e.day()] : n;
    }),
    (wn.weekdaysMin = function (e) {
      return !0 === e
        ? Ie(this._weekdaysMin, this._week.dow)
        : e
        ? this._weekdaysMin[e.day()]
        : this._weekdaysMin;
    }),
    (wn.weekdaysShort = function (e) {
      return !0 === e
        ? Ie(this._weekdaysShort, this._week.dow)
        : e
        ? this._weekdaysShort[e.day()]
        : this._weekdaysShort;
    }),
    (wn.weekdaysParse = function (e, t, n) {
      var s, i, r;
      if (this._weekdaysParseExact)
        return function (e, t, n) {
          var s,
            i,
            r,
            a = e.toLocaleLowerCase();
          if (!this._weekdaysParse)
            for (
              this._weekdaysParse = [],
                this._shortWeekdaysParse = [],
                this._minWeekdaysParse = [],
                s = 0;
              s < 7;
              ++s
            )
              (r = c([2e3, 1]).day(s)),
                (this._minWeekdaysParse[s] = this.weekdaysMin(
                  r,
                  ""
                ).toLocaleLowerCase()),
                (this._shortWeekdaysParse[s] = this.weekdaysShort(
                  r,
                  ""
                ).toLocaleLowerCase()),
                (this._weekdaysParse[s] = this.weekdays(
                  r,
                  ""
                ).toLocaleLowerCase());
          return n
            ? "dddd" === t
              ? -1 !== (i = we.call(this._weekdaysParse, a))
                ? i
                : null
              : "ddd" === t
              ? -1 !== (i = we.call(this._shortWeekdaysParse, a))
                ? i
                : null
              : -1 !== (i = we.call(this._minWeekdaysParse, a))
              ? i
              : null
            : "dddd" === t
            ? -1 !== (i = we.call(this._weekdaysParse, a)) ||
              -1 !== (i = we.call(this._shortWeekdaysParse, a)) ||
              -1 !== (i = we.call(this._minWeekdaysParse, a))
              ? i
              : null
            : "ddd" === t
            ? -1 !== (i = we.call(this._shortWeekdaysParse, a)) ||
              -1 !== (i = we.call(this._weekdaysParse, a)) ||
              -1 !== (i = we.call(this._minWeekdaysParse, a))
              ? i
              : null
            : -1 !== (i = we.call(this._minWeekdaysParse, a)) ||
              -1 !== (i = we.call(this._weekdaysParse, a)) ||
              -1 !== (i = we.call(this._shortWeekdaysParse, a))
            ? i
            : null;
        }.call(this, e, t, n);
      for (
        this._weekdaysParse ||
          ((this._weekdaysParse = []),
          (this._minWeekdaysParse = []),
          (this._shortWeekdaysParse = []),
          (this._fullWeekdaysParse = [])),
          s = 0;
        s < 7;
        s++
      ) {
        if (
          ((i = c([2e3, 1]).day(s)),
          n &&
            !this._fullWeekdaysParse[s] &&
            ((this._fullWeekdaysParse[s] = new RegExp(
              "^" + this.weekdays(i, "").replace(".", "\\.?") + "$",
              "i"
            )),
            (this._shortWeekdaysParse[s] = new RegExp(
              "^" + this.weekdaysShort(i, "").replace(".", "\\.?") + "$",
              "i"
            )),
            (this._minWeekdaysParse[s] = new RegExp(
              "^" + this.weekdaysMin(i, "").replace(".", "\\.?") + "$",
              "i"
            ))),
          this._weekdaysParse[s] ||
            ((r =
              "^" +
              this.weekdays(i, "") +
              "|^" +
              this.weekdaysShort(i, "") +
              "|^" +
              this.weekdaysMin(i, "")),
            (this._weekdaysParse[s] = new RegExp(r.replace(".", ""), "i"))),
          n && "dddd" === t && this._fullWeekdaysParse[s].test(e))
        )
          return s;
        if (n && "ddd" === t && this._shortWeekdaysParse[s].test(e)) return s;
        if (n && "dd" === t && this._minWeekdaysParse[s].test(e)) return s;
        if (!n && this._weekdaysParse[s].test(e)) return s;
      }
    }),
    (wn.weekdaysRegex = function (e) {
      return this._weekdaysParseExact
        ? (r(this, "_weekdaysRegex") || Qe.call(this),
          e ? this._weekdaysStrictRegex : this._weekdaysRegex)
        : (r(this, "_weekdaysRegex") || (this._weekdaysRegex = qe),
          this._weekdaysStrictRegex && e
            ? this._weekdaysStrictRegex
            : this._weekdaysRegex);
    }),
    (wn.weekdaysShortRegex = function (e) {
      return this._weekdaysParseExact
        ? (r(this, "_weekdaysRegex") || Qe.call(this),
          e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
        : (r(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = Be),
          this._weekdaysShortStrictRegex && e
            ? this._weekdaysShortStrictRegex
            : this._weekdaysShortRegex);
    }),
    (wn.weekdaysMinRegex = function (e) {
      return this._weekdaysParseExact
        ? (r(this, "_weekdaysRegex") || Qe.call(this),
          e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
        : (r(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Je),
          this._weekdaysMinStrictRegex && e
            ? this._weekdaysMinStrictRegex
            : this._weekdaysMinRegex);
    }),
    (wn.isPM = function (e) {
      return "p" === (e + "").toLowerCase().charAt(0);
    }),
    (wn.meridiem = function (e, t, n) {
      return 11 < e ? (n ? "pm" : "PM") : n ? "am" : "AM";
    }),
    ut("en", {
      eras: [
        {
          since: "0001-01-01",
          until: 1 / 0,
          offset: 1,
          name: "Anno Domini",
          narrow: "AD",
          abbr: "AD",
        },
        {
          since: "0000-12-31",
          until: -1 / 0,
          offset: 1,
          name: "Before Christ",
          narrow: "BC",
          abbr: "BC",
        },
      ],
      dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
      ordinal: function (e) {
        var t = e % 10;
        return (
          e +
          (1 === Z((e % 100) / 10)
            ? "th"
            : 1 == t
            ? "st"
            : 2 == t
            ? "nd"
            : 3 == t
            ? "rd"
            : "th")
        );
      },
    }),
    (n.lang = M("moment.lang is deprecated. Use moment.locale instead.", ut)),
    (n.langData = M(
      "moment.langData is deprecated. Use moment.localeData instead.",
      ht
    ));
  var Mn = Math.abs;
  function Dn(e, t, n, s) {
    var i = jt(t, n);
    return (
      (e._milliseconds += s * i._milliseconds),
      (e._days += s * i._days),
      (e._months += s * i._months),
      e._bubble()
    );
  }
  function Sn(e) {
    return e < 0 ? Math.floor(e) : Math.ceil(e);
  }
  function Yn(e) {
    return (4800 * e) / 146097;
  }
  function On(e) {
    return (146097 * e) / 4800;
  }
  function bn(e) {
    return function () {
      return this.as(e);
    };
  }
  var xn = bn("ms"),
    Tn = bn("s"),
    Nn = bn("m"),
    Pn = bn("h"),
    Rn = bn("d"),
    Wn = bn("w"),
    Cn = bn("M"),
    Un = bn("Q"),
    Hn = bn("y");
  function Fn(e) {
    return function () {
      return this.isValid() ? this._data[e] : NaN;
    };
  }
  var Ln = Fn("milliseconds"),
    Vn = Fn("seconds"),
    Gn = Fn("minutes"),
    En = Fn("hours"),
    An = Fn("days"),
    jn = Fn("months"),
    In = Fn("years"),
    Zn = Math.round,
    zn = { ss: 44, s: 45, m: 45, h: 22, d: 26, w: null, M: 11 };
  var $n = Math.abs;
  function qn(e) {
    return (0 < e) - (e < 0) || +e;
  }
  function Bn() {
    if (!this.isValid()) return this.localeData().invalidDate();
    var e,
      t,
      n,
      s,
      i,
      r,
      a,
      o,
      u = $n(this._milliseconds) / 1e3,
      l = $n(this._days),
      h = $n(this._months),
      d = this.asSeconds();
    return d
      ? ((e = I(u / 60)),
        (t = I(e / 60)),
        (u %= 60),
        (e %= 60),
        (n = I(h / 12)),
        (h %= 12),
        (s = u ? u.toFixed(3).replace(/\.?0+$/, "") : ""),
        (i = d < 0 ? "-" : ""),
        (r = qn(this._months) !== qn(d) ? "-" : ""),
        (a = qn(this._days) !== qn(d) ? "-" : ""),
        (o = qn(this._milliseconds) !== qn(d) ? "-" : ""),
        i +
          "P" +
          (n ? r + n + "Y" : "") +
          (h ? r + h + "M" : "") +
          (l ? a + l + "D" : "") +
          (t || e || u ? "T" : "") +
          (t ? o + t + "H" : "") +
          (e ? o + e + "M" : "") +
          (u ? o + s + "S" : ""))
      : "P0D";
  }
  var Jn = Rt.prototype;
  return (
    (Jn.isValid = function () {
      return this._isValid;
    }),
    (Jn.abs = function () {
      var e = this._data;
      return (
        (this._milliseconds = Mn(this._milliseconds)),
        (this._days = Mn(this._days)),
        (this._months = Mn(this._months)),
        (e.milliseconds = Mn(e.milliseconds)),
        (e.seconds = Mn(e.seconds)),
        (e.minutes = Mn(e.minutes)),
        (e.hours = Mn(e.hours)),
        (e.months = Mn(e.months)),
        (e.years = Mn(e.years)),
        this
      );
    }),
    (Jn.add = function (e, t) {
      return Dn(this, e, t, 1);
    }),
    (Jn.subtract = function (e, t) {
      return Dn(this, e, t, -1);
    }),
    (Jn.as = function (e) {
      if (!this.isValid()) return NaN;
      var t,
        n,
        s = this._milliseconds;
      if ("month" === (e = V(e)) || "quarter" === e || "year" === e)
        switch (((t = this._days + s / 864e5), (n = this._months + Yn(t)), e)) {
          case "month":
            return n;
          case "quarter":
            return n / 3;
          case "year":
            return n / 12;
        }
      else
        switch (((t = this._days + Math.round(On(this._months))), e)) {
          case "week":
            return t / 7 + s / 6048e5;
          case "day":
            return t + s / 864e5;
          case "hour":
            return 24 * t + s / 36e5;
          case "minute":
            return 1440 * t + s / 6e4;
          case "second":
            return 86400 * t + s / 1e3;
          case "millisecond":
            return Math.floor(864e5 * t) + s;
          default:
            throw new Error("Unknown unit " + e);
        }
    }),
    (Jn.asMilliseconds = xn),
    (Jn.asSeconds = Tn),
    (Jn.asMinutes = Nn),
    (Jn.asHours = Pn),
    (Jn.asDays = Rn),
    (Jn.asWeeks = Wn),
    (Jn.asMonths = Cn),
    (Jn.asQuarters = Un),
    (Jn.asYears = Hn),
    (Jn.valueOf = function () {
      return this.isValid()
        ? this._milliseconds +
            864e5 * this._days +
            (this._months % 12) * 2592e6 +
            31536e6 * Z(this._months / 12)
        : NaN;
    }),
    (Jn._bubble = function () {
      var e,
        t,
        n,
        s,
        i,
        r = this._milliseconds,
        a = this._days,
        o = this._months,
        u = this._data;
      return (
        (0 <= r && 0 <= a && 0 <= o) ||
          (r <= 0 && a <= 0 && o <= 0) ||
          ((r += 864e5 * Sn(On(o) + a)), (o = a = 0)),
        (u.milliseconds = r % 1e3),
        (e = I(r / 1e3)),
        (u.seconds = e % 60),
        (t = I(e / 60)),
        (u.minutes = t % 60),
        (n = I(t / 60)),
        (u.hours = n % 24),
        (a += I(n / 24)),
        (o += i = I(Yn(a))),
        (a -= Sn(On(i))),
        (s = I(o / 12)),
        (o %= 12),
        (u.days = a),
        (u.months = o),
        (u.years = s),
        this
      );
    }),
    (Jn.clone = function () {
      return jt(this);
    }),
    (Jn.get = function (e) {
      return (e = V(e)), this.isValid() ? this[e + "s"]() : NaN;
    }),
    (Jn.milliseconds = Ln),
    (Jn.seconds = Vn),
    (Jn.minutes = Gn),
    (Jn.hours = En),
    (Jn.days = An),
    (Jn.weeks = function () {
      return I(this.days() / 7);
    }),
    (Jn.months = jn),
    (Jn.years = In),
    (Jn.humanize = function (e, t) {
      if (!this.isValid()) return this.localeData().invalidDate();
      var n,
        s,
        i = !1,
        r = zn;
      return (
        "object" == typeof e && ((t = e), (e = !1)),
        "boolean" == typeof e && (i = e),
        "object" == typeof t &&
          ((r = Object.assign({}, zn, t)),
          null != t.s && null == t.ss && (r.ss = t.s - 1)),
        (s = (function (e, t, n, s) {
          var i = jt(e).abs(),
            r = Zn(i.as("s")),
            a = Zn(i.as("m")),
            o = Zn(i.as("h")),
            u = Zn(i.as("d")),
            l = Zn(i.as("M")),
            h = Zn(i.as("w")),
            d = Zn(i.as("y")),
            c =
              (r <= n.ss ? ["s", r] : r < n.s && ["ss", r]) ||
              (a <= 1 && ["m"]) ||
              (a < n.m && ["mm", a]) ||
              (o <= 1 && ["h"]) ||
              (o < n.h && ["hh", o]) ||
              (u <= 1 && ["d"]) ||
              (u < n.d && ["dd", u]);
          return (
            null != n.w &&
              (c = c || (h <= 1 && ["w"]) || (h < n.w && ["ww", h])),
            ((c = c ||
              (l <= 1 && ["M"]) ||
              (l < n.M && ["MM", l]) ||
              (d <= 1 && ["y"]) || ["yy", d])[2] = t),
            (c[3] = 0 < +e),
            (c[4] = s),
            function (e, t, n, s, i) {
              return i.relativeTime(t || 1, !!n, e, s);
            }.apply(null, c)
          );
        })(this, !i, r, (n = this.localeData()))),
        i && (s = n.pastFuture(+this, s)),
        n.postformat(s)
      );
    }),
    (Jn.toISOString = Bn),
    (Jn.toString = Bn),
    (Jn.toJSON = Bn),
    (Jn.locale = Xt),
    (Jn.localeData = en),
    (Jn.toIsoString = M(
      "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
      Bn
    )),
    (Jn.lang = Kt),
    C("X", 0, 0, "unix"),
    C("x", 0, 0, "valueOf"),
    ce("x", ue),
    ce("X", /[+-]?\d+(\.\d{1,3})?/),
    ye("X", function (e, t, n) {
      n._d = new Date(1e3 * parseFloat(e));
    }),
    ye("x", function (e, t, n) {
      n._d = new Date(Z(e));
    }),
    (n.version = "2.29.1"),
    (e = bt),
    (n.fn = yn),
    (n.min = function () {
      return Nt("isBefore", [].slice.call(arguments, 0));
    }),
    (n.max = function () {
      return Nt("isAfter", [].slice.call(arguments, 0));
    }),
    (n.now = function () {
      return Date.now ? Date.now() : +new Date();
    }),
    (n.utc = c),
    (n.unix = function (e) {
      return bt(1e3 * e);
    }),
    (n.months = function (e, t) {
      return vn(e, t, "months");
    }),
    (n.isDate = l),
    (n.locale = ut),
    (n.invalid = _),
    (n.duration = jt),
    (n.isMoment = v),
    (n.weekdays = function (e, t, n) {
      return kn(e, t, n, "weekdays");
    }),
    (n.parseZone = function () {
      return bt.apply(null, arguments).parseZone();
    }),
    (n.localeData = ht),
    (n.isDuration = Wt),
    (n.monthsShort = function (e, t) {
      return vn(e, t, "monthsShort");
    }),
    (n.weekdaysMin = function (e, t, n) {
      return kn(e, t, n, "weekdaysMin");
    }),
    (n.defineLocale = lt),
    (n.updateLocale = function (e, t) {
      var n, s, i;
      return (
        null != t
          ? ((i = st),
            null != it[e] && null != it[e].parentLocale
              ? it[e].set(b(it[e]._config, t))
              : (null != (s = ot(e)) && (i = s._config),
                (t = b(i, t)),
                null == s && (t.abbr = e),
                ((n = new x(t)).parentLocale = it[e]),
                (it[e] = n)),
            ut(e))
          : null != it[e] &&
            (null != it[e].parentLocale
              ? ((it[e] = it[e].parentLocale), e === ut() && ut(e))
              : null != it[e] && delete it[e]),
        it[e]
      );
    }),
    (n.locales = function () {
      return D(it);
    }),
    (n.weekdaysShort = function (e, t, n) {
      return kn(e, t, n, "weekdaysShort");
    }),
    (n.normalizeUnits = V),
    (n.relativeTimeRounding = function (e) {
      return void 0 === e ? Zn : "function" == typeof e && ((Zn = e), !0);
    }),
    (n.relativeTimeThreshold = function (e, t) {
      return (
        void 0 !== zn[e] &&
        (void 0 === t ? zn[e] : ((zn[e] = t), "s" === e && (zn.ss = t - 1), !0))
      );
    }),
    (n.calendarFormat = function (e, t) {
      var n = e.diff(t, "days", !0);
      return n < -6
        ? "sameElse"
        : n < -1
        ? "lastWeek"
        : n < 0
        ? "lastDay"
        : n < 1
        ? "sameDay"
        : n < 2
        ? "nextDay"
        : n < 7
        ? "nextWeek"
        : "sameElse";
    }),
    (n.prototype = yn),
    (n.HTML5_FMT = {
      DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
      DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
      DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
      DATE: "YYYY-MM-DD",
      TIME: "HH:mm",
      TIME_SECONDS: "HH:mm:ss",
      TIME_MS: "HH:mm:ss.SSS",
      WEEK: "GGGG-[W]WW",
      MONTH: "YYYY-MM",
    }),
    n
  );
});
