!(function (t, e, i) {
  var s;
  (s = function (s) {
    "use strict";
    var r,
      n,
      a,
      o,
      h,
      l,
      g,
      p,
      c,
      u,
      d,
      f,
      m,
      v,
      x,
      y,
      C,
      b,
      w,
      R,
      S,
      k,
      M,
      _,
      H,
      j,
      W,
      T,
      q,
      I = {},
      P = 0;
    (r = function () {
      return {
        common: {
          type: "line",
          lineColor: "#00f",
          fillColor: "#cdf",
          defaultPixelsPerValue: 3,
          width: "auto",
          height: "auto",
          composite: !1,
          tagValuesAttribute: "values",
          tagOptionsPrefix: "spark",
          enableTagOptions: !1,
          enableHighlight: !0,
          highlightLighten: 1.4,
          tooltipSkipNull: !0,
          tooltipPrefix: "",
          tooltipSuffix: "",
          disableHiddenCheck: !1,
          numberFormatter: !1,
          numberDigitGroupCount: 3,
          numberDigitGroupSep: ",",
          numberDecimalMark: ".",
          disableTooltips: !1,
          disableInteraction: !1,
        },
        line: {
          spotColor: "#f80",
          highlightSpotColor: "#5f5",
          highlightLineColor: "#f22",
          spotRadius: 1.5,
          minSpotColor: "#f80",
          maxSpotColor: "#f80",
          lineWidth: 1,
          normalRangeMin: i,
          normalRangeMax: i,
          normalRangeColor: "#ccc",
          drawNormalOnTop: !1,
          chartRangeMin: i,
          chartRangeMax: i,
          chartRangeMinX: i,
          chartRangeMaxX: i,
          tooltipFormat: new a(
            '<span style="color: {{color}}">&#9679;</span> {{prefix}}{{y}}{{suffix}}'
          ),
        },
        bar: {
          barColor: "#3366cc",
          negBarColor: "#f44",
          stackedBarColor: [
            "#3366cc",
            "#dc3912",
            "#ff9900",
            "#109618",
            "#66aa00",
            "#dd4477",
            "#0099c6",
            "#990099",
          ],
          zeroColor: i,
          nullColor: i,
          zeroAxis: !0,
          barWidth: 4,
          barSpacing: 1,
          chartRangeMax: i,
          chartRangeMin: i,
          chartRangeClip: !1,
          colorMap: i,
          tooltipFormat: new a(
            '<span style="color: {{color}}">&#9679;</span> {{prefix}}{{value}}{{suffix}}'
          ),
        },
        tristate: {
          barWidth: 4,
          barSpacing: 1,
          posBarColor: "#6f6",
          negBarColor: "#f44",
          zeroBarColor: "#999",
          colorMap: {},
          tooltipFormat: new a(
            '<span style="color: {{color}}">&#9679;</span> {{value:map}}'
          ),
          tooltipValueLookups: { map: { "-1": "Loss", 0: "Draw", 1: "Win" } },
        },
        discrete: {
          lineHeight: "auto",
          thresholdColor: i,
          thresholdValue: 0,
          chartRangeMax: i,
          chartRangeMin: i,
          chartRangeClip: !1,
          tooltipFormat: new a("{{prefix}}{{value}}{{suffix}}"),
        },
        bullet: {
          targetColor: "#f33",
          targetWidth: 3,
          performanceColor: "#33f",
          rangeColors: ["#d3dafe", "#a8b6ff", "#7f94ff"],
          base: i,
          tooltipFormat: new a("{{fieldkey:fields}} - {{value}}"),
          tooltipValueLookups: {
            fields: { r: "Range", p: "Performance", t: "Target" },
          },
        },
        pie: {
          offset: 0,
          sliceColors: [
            "#3366cc",
            "#dc3912",
            "#ff9900",
            "#109618",
            "#66aa00",
            "#dd4477",
            "#0099c6",
            "#990099",
          ],
          borderWidth: 0,
          borderColor: "#000",
          tooltipFormat: new a(
            '<span style="color: {{color}}">&#9679;</span> {{value}} ({{percent.1}}%)'
          ),
        },
        box: {
          raw: !1,
          boxLineColor: "#000",
          boxFillColor: "#cdf",
          whiskerColor: "#000",
          outlierLineColor: "#333",
          outlierFillColor: "#fff",
          medianColor: "#f00",
          showOutliers: !0,
          outlierIQR: 1.5,
          spotRadius: 1.5,
          target: i,
          targetColor: "#4a2",
          chartRangeMax: i,
          chartRangeMin: i,
          tooltipFormat: new a("{{field:fields}}: {{value}}"),
          tooltipFormatFieldlistKey: "field",
          tooltipValueLookups: {
            fields: {
              lq: "Lower Quartile",
              med: "Median",
              uq: "Upper Quartile",
              lo: "Left Outlier",
              ro: "Right Outlier",
              lw: "Left Whisker",
              rw: "Right Whisker",
            },
          },
        },
      };
    }),
      (n = function () {
        var t, e;
        return (
          (t = function () {
            this.init.apply(this, arguments);
          }),
          arguments.length > 1
            ? (arguments[0]
                ? ((t.prototype = s.extend(
                    new arguments[0](),
                    arguments[arguments.length - 1]
                  )),
                  (t._super = arguments[0].prototype))
                : (t.prototype = arguments[arguments.length - 1]),
              arguments.length > 2 &&
                ((e = Array.prototype.slice.call(arguments, 1, -1)).unshift(
                  t.prototype
                ),
                s.extend.apply(s, e)))
            : (t.prototype = arguments[0]),
          (t.prototype.cls = t),
          t
        );
      }),
      (s.SPFormatClass = a =
        n({
          fre: /\{\{([\w.]+?)(:(.+?))?\}\}/g,
          precre: /(\w+)\.(\d+)/,
          init: function (t, e) {
            (this.format = t), (this.fclass = e);
          },
          render: function (t, e, s) {
            var r,
              n,
              a,
              o,
              h,
              l = this,
              g = t;
            return this.format.replace(this.fre, function () {
              return (
                (n = arguments[1]),
                (a = arguments[3]),
                (r = l.precre.exec(n)) ? ((h = r[2]), (n = r[1])) : (h = !1),
                (o = g[n]) === i
                  ? ""
                  : a && e && e[a]
                  ? e[a].get
                    ? e[a].get(o) || o
                    : e[a][o] || o
                  : (c(o) &&
                      (o = s.get("numberFormatter")
                        ? s.get("numberFormatter")(o)
                        : m(
                            o,
                            h,
                            s.get("numberDigitGroupCount"),
                            s.get("numberDigitGroupSep"),
                            s.get("numberDecimalMark")
                          )),
                    o)
              );
            });
          },
        })),
      (s.spformat = function (t, e) {
        return new a(t, e);
      }),
      (o = function (t, e, i) {
        return t < e ? e : t > i ? i : t;
      }),
      (h = function (t, i) {
        var s;
        return 2 === i
          ? ((s = e.floor(t.length / 2)),
            t.length % 2 ? t[s] : (t[s - 1] + t[s]) / 2)
          : t.length % 2
          ? (s = (t.length * i + i) / 4) % 1
            ? (t[e.floor(s)] + t[e.floor(s) - 1]) / 2
            : t[s - 1]
          : (s = (t.length * i + 2) / 4) % 1
          ? (t[e.floor(s)] + t[e.floor(s) - 1]) / 2
          : t[s - 1];
      }),
      (l = function (t) {
        var e;
        switch (t) {
          case "undefined":
            t = i;
            break;
          case "null":
            t = null;
            break;
          case "true":
            t = !0;
            break;
          case "false":
            t = !1;
            break;
          default:
            t == (e = parseFloat(t)) && (t = e);
        }
        return t;
      }),
      (g = function (t) {
        var e,
          i = [];
        for (e = t.length; e--; ) i[e] = l(t[e]);
        return i;
      }),
      (p = function (t, e) {
        var i,
          s,
          r = [];
        for (i = 0, s = t.length; i < s; i++) t[i] !== e && r.push(t[i]);
        return r;
      }),
      (c = function (t) {
        return !isNaN(parseFloat(t)) && isFinite(t);
      }),
      (m = function (t, e, i, r, n) {
        var a, o;
        for (
          t = (!1 === e ? parseFloat(t).toString() : t.toFixed(e)).split(""),
            (a = (a = s.inArray(".", t)) < 0 ? t.length : a) < t.length &&
              (t[a] = n),
            o = a - i;
          o > 0;
          o -= i
        )
          t.splice(o, 0, r);
        return t.join("");
      }),
      (u = function (t, e, i) {
        var s;
        for (s = e.length; s--; )
          if ((!i || null !== e[s]) && e[s] !== t) return !1;
        return !0;
      }),
      (f = function (t) {
        return s.isArray(t) ? t : [t];
      }),
      (d = function (e) {
        var i, s;
        if (t.createStyleSheet)
          try {
            return void (t.createStyleSheet().cssText = e);
          } catch (t) {
            s = !0;
          }
        ((i = t.createElement("style")).type = "text/css"),
          t.getElementsByTagName("head")[0].appendChild(i),
          s
            ? (t.styleSheets[t.styleSheets.length - 1].cssText = e)
            : (i[
                "string" == typeof t.body.style.WebkitAppearance
                  ? "innerText"
                  : "innerHTML"
              ] = e);
      }),
      (s.fn.simpledraw = function (e, r, n, a) {
        var o, h;
        if (n && (o = this.data("_jqs_vcanvas"))) return o;
        if (!1 === s.fn.sparkline.canvas) return !1;
        if (s.fn.sparkline.canvas === i) {
          var l = t.createElement("canvas");
          if (l.getContext && l.getContext("2d"))
            s.fn.sparkline.canvas = function (t, e, i, s) {
              return new W(t, e, i, s);
            };
          else {
            if (!t.namespaces || t.namespaces.v)
              return (s.fn.sparkline.canvas = !1), !1;
            t.namespaces.add(
              "v",
              "urn:schemas-microsoft-com:vml",
              "#default#VML"
            ),
              (s.fn.sparkline.canvas = function (t, e, i, s) {
                return new T(t, e, i);
              });
          }
        }
        return (
          e === i && (e = s(this).innerWidth()),
          r === i && (r = s(this).innerHeight()),
          (o = s.fn.sparkline.canvas(e, r, this, a)),
          (h = s(this).data("_jqs_mhandler")) && h.registerCanvas(o),
          o
        );
      }),
      (s.fn.cleardraw = function () {
        var t = this.data("_jqs_vcanvas");
        t && t.reset();
      }),
      (s.RangeMapClass = v =
        n({
          init: function (t) {
            var e,
              i,
              s = [];
            for (e in t)
              t.hasOwnProperty(e) &&
                "string" == typeof e &&
                e.indexOf(":") > -1 &&
                (((i = e.split(":"))[0] =
                  0 === i[0].length ? -1 / 0 : parseFloat(i[0])),
                (i[1] = 0 === i[1].length ? 1 / 0 : parseFloat(i[1])),
                (i[2] = t[e]),
                s.push(i));
            (this.map = t), (this.rangelist = s || !1);
          },
          get: function (t) {
            var e,
              s,
              r,
              n = this.rangelist;
            if ((r = this.map[t]) !== i) return r;
            if (n)
              for (e = n.length; e--; )
                if ((s = n[e])[0] <= t && s[1] >= t) return s[2];
            return i;
          },
        })),
      (s.range_map = function (t) {
        return new v(t);
      }),
      (x = n({
        init: function (t, e) {
          var i = s(t);
          (this.$el = i),
            (this.options = e),
            (this.currentPageX = 0),
            (this.currentPageY = 0),
            (this.el = t),
            (this.splist = []),
            (this.tooltip = null),
            (this.over = !1),
            (this.displayTooltips = !e.get("disableTooltips")),
            (this.highlightEnabled = !e.get("disableHighlight"));
        },
        registerSparkline: function (t) {
          this.splist.push(t), this.over && this.updateDisplay();
        },
        registerCanvas: function (t) {
          var e = s(t.canvas);
          (this.canvas = t),
            (this.$canvas = e),
            e.mouseenter(s.proxy(this.mouseenter, this)),
            e.mouseleave(s.proxy(this.mouseleave, this)),
            e.click(s.proxy(this.mouseclick, this));
        },
        reset: function (t) {
          (this.splist = []),
            this.tooltip && t && (this.tooltip.remove(), (this.tooltip = i));
        },
        mouseclick: function (t) {
          var e = s.Event("sparklineClick");
          (e.originalEvent = t),
            (e.sparklines = this.splist),
            this.$el.trigger(e);
        },
        mouseenter: function (e) {
          s(t.body).unbind("mousemove.jqs"),
            s(t.body).bind("mousemove.jqs", s.proxy(this.mousemove, this)),
            (this.over = !0),
            (this.currentPageX = e.pageX),
            (this.currentPageY = e.pageY),
            (this.currentEl = e.target),
            !this.tooltip &&
              this.displayTooltips &&
              ((this.tooltip = new y(this.options)),
              this.tooltip.updatePosition(e.pageX, e.pageY)),
            this.updateDisplay();
        },
        mouseleave: function () {
          s(t.body).unbind("mousemove.jqs");
          var e,
            i = this.splist,
            r = i.length,
            n = !1;
          for (
            this.over = !1,
              this.currentEl = null,
              this.tooltip && (this.tooltip.remove(), (this.tooltip = null)),
              e = 0;
            e < r;
            e++
          )
            i[e].clearRegionHighlight() && (n = !0);
          n && this.canvas.render();
        },
        mousemove: function (t) {
          (this.currentPageX = t.pageX),
            (this.currentPageY = t.pageY),
            (this.currentEl = t.target),
            this.tooltip && this.tooltip.updatePosition(t.pageX, t.pageY),
            this.updateDisplay();
        },
        updateDisplay: function () {
          var t,
            e,
            i,
            r,
            n = this.splist,
            a = n.length,
            o = !1,
            h = this.$canvas.offset(),
            l = this.currentPageX - h.left,
            g = this.currentPageY - h.top;
          if (this.over) {
            for (e = 0; e < a; e++)
              (i = n[e].setRegionHighlight(this.currentEl, l, g)) && (o = !0);
            if (o) {
              if (
                (((r = s.Event("sparklineRegionChange")).sparklines =
                  this.splist),
                this.$el.trigger(r),
                this.tooltip)
              ) {
                for (t = "", e = 0; e < a; e++)
                  t += n[e].getCurrentRegionTooltip();
                this.tooltip.setContent(t);
              }
              this.disableHighlight || this.canvas.render();
            }
            null === i && this.mouseleave();
          }
        },
      })),
      (y = n({
        sizeStyle:
          "position: static !important;display: block !important;visibility: hidden !important;float: left !important;",
        init: function (e) {
          var i,
            r = e.get("tooltipClassname", "jqstooltip"),
            n = this.sizeStyle;
          (this.container = e.get("tooltipContainer") || t.body),
            (this.tooltipOffsetX = e.get("tooltipOffsetX", 10)),
            (this.tooltipOffsetY = e.get("tooltipOffsetY", 12)),
            s("#jqssizetip").remove(),
            s("#jqstooltip").remove(),
            (this.sizetip = s("<div/>", {
              id: "jqssizetip",
              style: n,
              class: r,
            })),
            (this.tooltip = s("<div/>", {
              id: "jqstooltip",
              class: r,
            }).appendTo(this.container)),
            (i = this.tooltip.offset()),
            (this.offsetLeft = i.left),
            (this.offsetTop = i.top),
            (this.hidden = !0),
            s(window).unbind("resize.jqs scroll.jqs"),
            s(window).bind(
              "resize.jqs scroll.jqs",
              s.proxy(this.updateWindowDims, this)
            ),
            this.updateWindowDims();
        },
        updateWindowDims: function () {
          (this.scrollTop = s(window).scrollTop()),
            (this.scrollLeft = s(window).scrollLeft()),
            (this.scrollRight = this.scrollLeft + s(window).width()),
            this.updatePosition();
        },
        getSize: function (t) {
          this.sizetip.html(t).appendTo(this.container),
            (this.width = this.sizetip.width() + 1),
            (this.height = this.sizetip.height()),
            this.sizetip.remove();
        },
        setContent: function (t) {
          if (!t)
            return (
              this.tooltip.css("visibility", "hidden"), void (this.hidden = !0)
            );
          this.getSize(t),
            this.tooltip.html(t).css({
              width: this.width,
              height: this.height,
              visibility: "visible",
            }),
            this.hidden && ((this.hidden = !1), this.updatePosition());
        },
        updatePosition: function (t, e) {
          if (t === i) {
            if (this.mousex === i) return;
            (t = this.mousex - this.offsetLeft),
              (e = this.mousey - this.offsetTop);
          } else
            (this.mousex = t -= this.offsetLeft),
              (this.mousey = e -= this.offsetTop);
          this.height &&
            this.width &&
            !this.hidden &&
            ((e -= this.height + this.tooltipOffsetY),
            (t += this.tooltipOffsetX),
            e < this.scrollTop && (e = this.scrollTop),
            t < this.scrollLeft
              ? (t = this.scrollLeft)
              : t + this.width > this.scrollRight &&
                (t = this.scrollRight - this.width),
            this.tooltip.css({ left: t, top: e }));
        },
        remove: function () {
          this.tooltip.remove(),
            this.sizetip.remove(),
            (this.sizetip = this.tooltip = i),
            s(window).unbind("resize.jqs scroll.jqs");
        },
      })),
      s(function () {
        d(
          '.jqstooltip { position: absolute;left: 0px;top: 0px;visibility: hidden;background: rgb(0, 0, 0) transparent;background-color: rgba(0,0,0,0.6);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000);-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000)";color: white;font: 10px arial, san serif;text-align: left;white-space: nowrap;padding: 5px;border: 1px solid white;box-sizing: content-box;z-index: 10000;}.jqsfield { color: white;font: 10px arial, san serif;text-align: left;}'
        );
      }),
      (q = []),
      (s.fn.sparkline = function (e, r) {
        return this.each(function () {
          var n,
            a,
            o = new s.fn.sparkline.options(this, r),
            h = s(this);
          if (
            ((n = function () {
              var r, n, a, l, g, p, c;
              "html" === e || e === i
                ? (((c = this.getAttribute(o.get("tagValuesAttribute"))) !==
                    i &&
                    null !== c) ||
                    (c = h.html()),
                  (r = c.replace(/(^\s*<!--)|(-->\s*$)|\s+/g, "").split(",")))
                : (r = e),
                (n =
                  "auto" === o.get("width")
                    ? r.length * o.get("defaultPixelsPerValue")
                    : o.get("width")),
                "auto" === o.get("height")
                  ? (o.get("composite") && s.data(this, "_jqs_vcanvas")) ||
                    (((l = t.createElement("span")).innerHTML = "a"),
                    h.html(l),
                    (a = s(l).innerHeight() || s(l).height()),
                    s(l).remove(),
                    (l = null))
                  : (a = o.get("height")),
                o.get("disableInteraction")
                  ? (g = !1)
                  : (g = s.data(this, "_jqs_mhandler"))
                  ? o.get("composite") || g.reset()
                  : ((g = new x(this, o)), s.data(this, "_jqs_mhandler", g)),
                !o.get("composite") || s.data(this, "_jqs_vcanvas")
                  ? ((p = new s.fn.sparkline[o.get("type")](
                      this,
                      r,
                      o,
                      n,
                      a
                    )).render(),
                    g && g.registerSparkline(p))
                  : s.data(this, "_jqs_errnotify") ||
                    (alert(
                      "Attempted to attach a composite sparkline to an element with no existing sparkline"
                    ),
                    s.data(this, "_jqs_errnotify", !0));
            }),
            (s(this).html() &&
              !o.get("disableHiddenCheck") &&
              s(this).is(":hidden")) ||
              !s(this).parents("body").length)
          ) {
            if (!o.get("composite") && s.data(this, "_jqs_pending"))
              for (a = q.length; a; a--)
                q[a - 1][0] == this && q.splice(a - 1, 1);
            q.push([this, n]), s.data(this, "_jqs_pending", !0);
          } else n.call(this);
        });
      }),
      (s.fn.sparkline.defaults = r()),
      (s.sparkline_display_visible = function () {
        var t,
          e,
          i,
          r = [];
        for (e = 0, i = q.length; e < i; e++)
          (t = q[e][0]),
            s(t).is(":visible") && !s(t).parents().is(":hidden")
              ? (q[e][1].call(t),
                s.data(q[e][0], "_jqs_pending", !1),
                r.push(e))
              : s(t).closest("html").length ||
                s.data(t, "_jqs_pending") ||
                (s.data(q[e][0], "_jqs_pending", !1), r.push(e));
        for (e = r.length; e; e--) q.splice(r[e - 1], 1);
      }),
      (s.fn.sparkline.options = n({
        init: function (t, e) {
          var i, r, n, a;
          (this.userOptions = e = e || {}),
            (this.tag = t),
            (this.tagValCache = {}),
            (n = (r = s.fn.sparkline.defaults).common),
            (this.tagOptionsPrefix =
              e.enableTagOptions && (e.tagOptionsPrefix || n.tagOptionsPrefix)),
            (i =
              (a = this.getTagSetting("type")) === I
                ? r[e.type || n.type]
                : r[a]),
            (this.mergedOptions = s.extend({}, n, i, e));
        },
        getTagSetting: function (t) {
          var e,
            s,
            r,
            n,
            a = this.tagOptionsPrefix;
          if (!1 === a || a === i) return I;
          if (this.tagValCache.hasOwnProperty(t)) e = this.tagValCache.key;
          else {
            if ((e = this.tag.getAttribute(a + t)) === i || null === e) e = I;
            else if ("[" === e.substr(0, 1))
              for (s = (e = e.substr(1, e.length - 2).split(",")).length; s--; )
                e[s] = l(e[s].replace(/(^\s*)|(\s*$)/g, ""));
            else if ("{" === e.substr(0, 1))
              for (
                r = e.substr(1, e.length - 2).split(","), e = {}, s = r.length;
                s--;

              )
                e[(n = r[s].split(":", 2))[0].replace(/(^\s*)|(\s*$)/g, "")] =
                  l(n[1].replace(/(^\s*)|(\s*$)/g, ""));
            else e = l(e);
            this.tagValCache.key = e;
          }
          return e;
        },
        get: function (t, e) {
          var s,
            r = this.getTagSetting(t);
          return r !== I ? r : (s = this.mergedOptions[t]) === i ? e : s;
        },
      })),
      (s.fn.sparkline._base = n({
        disabled: !1,
        init: function (t, e, r, n, a) {
          (this.el = t),
            (this.$el = s(t)),
            (this.values = e),
            (this.options = r),
            (this.width = n),
            (this.height = a),
            (this.currentRegion = i);
        },
        initTarget: function () {
          var t = !this.options.get("disableInteraction");
          (this.target = this.$el.simpledraw(
            this.width,
            this.height,
            this.options.get("composite"),
            t
          ))
            ? ((this.canvasWidth = this.target.pixelWidth),
              (this.canvasHeight = this.target.pixelHeight))
            : (this.disabled = !0);
        },
        render: function () {
          return !this.disabled || ((this.el.innerHTML = ""), !1);
        },
        getRegion: function (t, e) {},
        setRegionHighlight: function (t, e, s) {
          var r,
            n = this.currentRegion,
            a = !this.options.get("disableHighlight");
          return e > this.canvasWidth || s > this.canvasHeight || e < 0 || s < 0
            ? null
            : n !== (r = this.getRegion(t, e, s)) &&
                (n !== i && a && this.removeHighlight(),
                (this.currentRegion = r),
                r !== i && a && this.renderHighlight(),
                !0);
        },
        clearRegionHighlight: function () {
          return (
            this.currentRegion !== i &&
            (this.removeHighlight(), (this.currentRegion = i), !0)
          );
        },
        renderHighlight: function () {
          this.changeHighlight(!0);
        },
        removeHighlight: function () {
          this.changeHighlight(!1);
        },
        changeHighlight: function (t) {},
        getCurrentRegionTooltip: function () {
          var t,
            e,
            r,
            n,
            o,
            h,
            l,
            g,
            p,
            c,
            u,
            d,
            f,
            m,
            v = this.options,
            x = "",
            y = [];
          if (this.currentRegion === i) return "";
          if (
            ((t = this.getCurrentRegionFields()),
            (u = v.get("tooltipFormatter")))
          )
            return u(this, v, t);
          if (
            (v.get("tooltipChartTitle") &&
              (x +=
                '<div class="jqs jqstitle">' +
                v.get("tooltipChartTitle") +
                "</div>\n"),
            !(e = this.options.get("tooltipFormat")))
          )
            return "";
          if (
            (s.isArray(e) || (e = [e]),
            s.isArray(t) || (t = [t]),
            (l = this.options.get("tooltipFormatFieldlist")),
            (g = this.options.get("tooltipFormatFieldlistKey")),
            l && g)
          ) {
            for (p = [], h = t.length; h--; )
              (c = t[h][g]), -1 != (m = s.inArray(c, l)) && (p[m] = t[h]);
            t = p;
          }
          for (r = e.length, f = t.length, h = 0; h < r; h++)
            for (
              "string" == typeof (d = e[h]) && (d = new a(d)),
                n = d.fclass || "jqsfield",
                m = 0;
              m < f;
              m++
            )
              (t[m].isNull && v.get("tooltipSkipNull")) ||
                (s.extend(t[m], {
                  prefix: v.get("tooltipPrefix"),
                  suffix: v.get("tooltipSuffix"),
                }),
                (o = d.render(t[m], v.get("tooltipValueLookups"), v)),
                y.push('<div class="' + n + '">' + o + "</div>"));
          return y.length ? x + y.join("\n") : "";
        },
        getCurrentRegionFields: function () {},
        calcHighlightColor: function (t, i) {
          var s,
            r,
            n,
            a,
            h = i.get("highlightColor"),
            l = i.get("highlightLighten");
          if (h) return h;
          if (
            l &&
            (s =
              /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(t) ||
              /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(t))
          ) {
            for (n = [], r = 4 === t.length ? 16 : 1, a = 0; a < 3; a++)
              n[a] = o(e.round(parseInt(s[a + 1], 16) * r * l), 0, 255);
            return "rgb(" + n.join(",") + ")";
          }
          return t;
        },
      })),
      (C = {
        changeHighlight: function (t) {
          var e,
            i = this.currentRegion,
            r = this.target,
            n = this.regionShapes[i];
          n &&
            ((e = this.renderRegion(i, t)),
            s.isArray(e) || s.isArray(n)
              ? (r.replaceWithShapes(n, e),
                (this.regionShapes[i] = s.map(e, function (t) {
                  return t.id;
                })))
              : (r.replaceWithShape(n, e), (this.regionShapes[i] = e.id)));
        },
        render: function () {
          var t,
            e,
            i,
            r,
            n = this.values,
            a = this.target,
            o = this.regionShapes;
          if (this.cls._super.render.call(this)) {
            for (i = n.length; i--; )
              if ((t = this.renderRegion(i)))
                if (s.isArray(t)) {
                  for (e = [], r = t.length; r--; )
                    t[r].append(), e.push(t[r].id);
                  o[i] = e;
                } else t.append(), (o[i] = t.id);
              else o[i] = null;
            a.render();
          }
        },
      }),
      (s.fn.sparkline.line = b =
        n(s.fn.sparkline._base, {
          type: "line",
          init: function (t, e, i, s, r) {
            b._super.init.call(this, t, e, i, s, r),
              (this.vertices = []),
              (this.regionMap = []),
              (this.xvalues = []),
              (this.yvalues = []),
              (this.yminmax = []),
              (this.hightlightSpotId = null),
              (this.lastShapeId = null),
              this.initTarget();
          },
          getRegion: function (t, e, s) {
            var r,
              n = this.regionMap;
            for (r = n.length; r--; )
              if (null !== n[r] && e >= n[r][0] && e <= n[r][1]) return n[r][2];
            return i;
          },
          getCurrentRegionFields: function () {
            var t = this.currentRegion;
            return {
              isNull: null === this.yvalues[t],
              x: this.xvalues[t],
              y: this.yvalues[t],
              color: this.options.get("lineColor"),
              fillColor: this.options.get("fillColor"),
              offset: t,
            };
          },
          renderHighlight: function () {
            var t,
              e,
              s = this.currentRegion,
              r = this.target,
              n = this.vertices[s],
              a = this.options,
              o = a.get("spotRadius"),
              h = a.get("highlightSpotColor"),
              l = a.get("highlightLineColor");
            n &&
              (o &&
                h &&
                ((t = r.drawCircle(n[0], n[1], o, i, h)),
                (this.highlightSpotId = t.id),
                r.insertAfterShape(this.lastShapeId, t)),
              l &&
                ((e = r.drawLine(
                  n[0],
                  this.canvasTop,
                  n[0],
                  this.canvasTop + this.canvasHeight,
                  l
                )),
                (this.highlightLineId = e.id),
                r.insertAfterShape(this.lastShapeId, e)));
          },
          removeHighlight: function () {
            var t = this.target;
            this.highlightSpotId &&
              (t.removeShapeId(this.highlightSpotId),
              (this.highlightSpotId = null)),
              this.highlightLineId &&
                (t.removeShapeId(this.highlightLineId),
                (this.highlightLineId = null));
          },
          scanValues: function () {
            var t,
              i,
              s,
              r,
              n,
              a = this.values,
              o = a.length,
              h = this.xvalues,
              l = this.yvalues,
              g = this.yminmax;
            for (t = 0; t < o; t++)
              (i = a[t]),
                (s = "string" == typeof a[t]),
                (r = "object" == typeof a[t] && a[t] instanceof Array),
                (n = s && a[t].split(":")),
                s && 2 === n.length
                  ? (h.push(Number(n[0])),
                    l.push(Number(n[1])),
                    g.push(Number(n[1])))
                  : r
                  ? (h.push(i[0]), l.push(i[1]), g.push(i[1]))
                  : (h.push(t),
                    null === a[t] || "null" === a[t]
                      ? l.push(null)
                      : (l.push(Number(i)), g.push(Number(i))));
            this.options.get("xvalues") && (h = this.options.get("xvalues")),
              (this.maxy = this.maxyorg = e.max.apply(e, g)),
              (this.miny = this.minyorg = e.min.apply(e, g)),
              (this.maxx = e.max.apply(e, h)),
              (this.minx = e.min.apply(e, h)),
              (this.xvalues = h),
              (this.yvalues = l),
              (this.yminmax = g);
          },
          processRangeOptions: function () {
            var t = this.options,
              e = t.get("normalRangeMin"),
              s = t.get("normalRangeMax");
            e !== i &&
              (e < this.miny && (this.miny = e),
              s > this.maxy && (this.maxy = s)),
              t.get("chartRangeMin") !== i &&
                (t.get("chartRangeClip") ||
                  t.get("chartRangeMin") < this.miny) &&
                (this.miny = t.get("chartRangeMin")),
              t.get("chartRangeMax") !== i &&
                (t.get("chartRangeClip") ||
                  t.get("chartRangeMax") > this.maxy) &&
                (this.maxy = t.get("chartRangeMax")),
              t.get("chartRangeMinX") !== i &&
                (t.get("chartRangeClipX") ||
                  t.get("chartRangeMinX") < this.minx) &&
                (this.minx = t.get("chartRangeMinX")),
              t.get("chartRangeMaxX") !== i &&
                (t.get("chartRangeClipX") ||
                  t.get("chartRangeMaxX") > this.maxx) &&
                (this.maxx = t.get("chartRangeMaxX"));
          },
          drawNormalRange: function (t, s, r, n, a) {
            var o = this.options.get("normalRangeMin"),
              h = this.options.get("normalRangeMax"),
              l = s + e.round(r - r * ((h - this.miny) / a)),
              g = e.round((r * (h - o)) / a);
            this.target
              .drawRect(t, l, n, g, i, this.options.get("normalRangeColor"))
              .append();
          },
          render: function () {
            var t,
              r,
              n,
              a,
              o,
              h,
              l,
              g,
              p,
              c,
              u,
              d,
              f,
              m,
              x,
              y,
              C,
              w,
              R,
              S,
              k,
              M,
              _,
              H,
              j = this.options,
              W = this.target,
              T = this.canvasWidth,
              q = this.canvasHeight,
              I = this.vertices,
              P = j.get("spotRadius"),
              L = this.regionMap;
            if (
              b._super.render.call(this) &&
              (this.scanValues(),
              this.processRangeOptions(),
              (M = this.xvalues),
              (_ = this.yvalues),
              this.yminmax.length && !(this.yvalues.length < 2))
            ) {
              for (
                a = o = 0,
                  t = this.maxx - this.minx == 0 ? 1 : this.maxx - this.minx,
                  r = this.maxy - this.miny == 0 ? 1 : this.maxy - this.miny,
                  n = this.yvalues.length - 1,
                  P && (T < 4 * P || q < 4 * P) && (P = 0),
                  P &&
                    (((S =
                      j.get("highlightSpotColor") &&
                      !j.get("disableInteraction")) ||
                      j.get("minSpotColor") ||
                      (j.get("spotColor") && _[n] === this.miny)) &&
                      (q -= e.ceil(P)),
                    (S ||
                      j.get("maxSpotColor") ||
                      (j.get("spotColor") && _[n] === this.maxy)) &&
                      ((q -= e.ceil(P)), (a += e.ceil(P))),
                    (S ||
                      ((j.get("minSpotColor") || j.get("maxSpotColor")) &&
                        (_[0] === this.miny || _[0] === this.maxy))) &&
                      ((o += e.ceil(P)), (T -= e.ceil(P))),
                    (S ||
                      j.get("spotColor") ||
                      j.get("minSpotColor") ||
                      (j.get("maxSpotColor") &&
                        (_[n] === this.miny || _[n] === this.maxy))) &&
                      (T -= e.ceil(P))),
                  q--,
                  j.get("normalRangeMin") === i ||
                    j.get("drawNormalOnTop") ||
                    this.drawNormalRange(o, a, q, T, r),
                  g = [(l = [])],
                  f = m = null,
                  x = _.length,
                  H = 0;
                H < x;
                H++
              )
                (p = M[H]),
                  (u = M[H + 1]),
                  (c = _[H]),
                  (m =
                    (d = o + e.round((p - this.minx) * (T / t))) +
                    ((H < x - 1 ? o + e.round((u - this.minx) * (T / t)) : T) -
                      d) /
                      2),
                  (L[H] = [f || 0, m, H]),
                  (f = m),
                  null === c
                    ? H &&
                      (null !== _[H - 1] && ((l = []), g.push(l)), I.push(null))
                    : (c < this.miny && (c = this.miny),
                      c > this.maxy && (c = this.maxy),
                      l.length || l.push([d, a + q]),
                      (h = [d, a + e.round(q - q * ((c - this.miny) / r))]),
                      l.push(h),
                      I.push(h));
              for (y = [], C = [], w = g.length, H = 0; H < w; H++)
                (l = g[H]).length &&
                  (j.get("fillColor") &&
                    (l.push([l[l.length - 1][0], a + q]),
                    C.push(l.slice(0)),
                    l.pop()),
                  l.length > 2 && (l[0] = [l[0][0], l[1][1]]),
                  y.push(l));
              for (w = C.length, H = 0; H < w; H++)
                W.drawShape(
                  C[H],
                  j.get("fillColor"),
                  j.get("fillColor")
                ).append();
              for (
                j.get("normalRangeMin") !== i &&
                  j.get("drawNormalOnTop") &&
                  this.drawNormalRange(o, a, q, T, r),
                  w = y.length,
                  H = 0;
                H < w;
                H++
              )
                W.drawShape(
                  y[H],
                  j.get("lineColor"),
                  i,
                  j.get("lineWidth")
                ).append();
              if (P && j.get("valueSpots"))
                for (
                  (R = j.get("valueSpots")).get === i && (R = new v(R)), H = 0;
                  H < x;
                  H++
                )
                  (k = R.get(_[H])) &&
                    W.drawCircle(
                      o + e.round((M[H] - this.minx) * (T / t)),
                      a + e.round(q - q * ((_[H] - this.miny) / r)),
                      P,
                      i,
                      k
                    ).append();
              P &&
                j.get("spotColor") &&
                null !== _[n] &&
                W.drawCircle(
                  o + e.round((M[M.length - 1] - this.minx) * (T / t)),
                  a + e.round(q - q * ((_[n] - this.miny) / r)),
                  P,
                  i,
                  j.get("spotColor")
                ).append(),
                this.maxy !== this.minyorg &&
                  (P &&
                    j.get("minSpotColor") &&
                    ((p = M[s.inArray(this.minyorg, _)]),
                    W.drawCircle(
                      o + e.round((p - this.minx) * (T / t)),
                      a + e.round(q - q * ((this.minyorg - this.miny) / r)),
                      P,
                      i,
                      j.get("minSpotColor")
                    ).append()),
                  P &&
                    j.get("maxSpotColor") &&
                    ((p = M[s.inArray(this.maxyorg, _)]),
                    W.drawCircle(
                      o + e.round((p - this.minx) * (T / t)),
                      a + e.round(q - q * ((this.maxyorg - this.miny) / r)),
                      P,
                      i,
                      j.get("maxSpotColor")
                    ).append())),
                (this.lastShapeId = W.getLastShapeId()),
                (this.canvasTop = a),
                W.render();
            }
          },
        })),
      (s.fn.sparkline.bar = w =
        n(s.fn.sparkline._base, C, {
          type: "bar",
          init: function (t, r, n, a, h) {
            var c,
              u,
              d,
              f,
              m,
              x,
              y,
              C,
              b,
              R,
              S,
              k,
              M,
              _,
              H,
              j,
              W,
              T,
              q,
              I,
              P,
              L = parseInt(n.get("barWidth"), 10),
              A = parseInt(n.get("barSpacing"), 10),
              F = n.get("chartRangeMin"),
              B = n.get("chartRangeMax"),
              O = n.get("chartRangeClip"),
              $ = 1 / 0,
              V = -1 / 0;
            for (
              w._super.init.call(this, t, r, n, a, h), x = 0, y = r.length;
              x < y;
              x++
            )
              ((c = "string" == typeof (I = r[x]) && I.indexOf(":") > -1) ||
                s.isArray(I)) &&
                ((H = !0),
                c && (I = r[x] = g(I.split(":"))),
                (I = p(I, null)),
                (u = e.min.apply(e, I)) < $ && ($ = u),
                (d = e.max.apply(e, I)) > V && (V = d));
            (this.stacked = H),
              (this.regionShapes = {}),
              (this.barWidth = L),
              (this.barSpacing = A),
              (this.totalBarWidth = L + A),
              (this.width = a = r.length * L + (r.length - 1) * A),
              this.initTarget(),
              O && ((M = F === i ? -1 / 0 : F), (_ = B === i ? 1 / 0 : B)),
              (m = []),
              (f = H ? [] : m);
            var X = [],
              z = [];
            for (x = 0, y = r.length; x < y; x++)
              if (H)
                for (
                  j = r[x],
                    r[x] = q = [],
                    X[x] = 0,
                    f[x] = z[x] = 0,
                    W = 0,
                    T = j.length;
                  W < T;
                  W++
                )
                  null !== (I = q[W] = O ? o(j[W], M, _) : j[W]) &&
                    (I > 0 && (X[x] += I),
                    $ < 0 && V > 0
                      ? I < 0
                        ? (z[x] += e.abs(I))
                        : (f[x] += I)
                      : (f[x] += e.abs(I - (I < 0 ? V : $))),
                    m.push(I));
              else
                (I = O ? o(r[x], M, _) : r[x]),
                  null !== (I = r[x] = l(I)) && m.push(I);
            (this.max = k = e.max.apply(e, m)),
              (this.min = S = e.min.apply(e, m)),
              (this.stackMax = V = H ? e.max.apply(e, X) : k),
              (this.stackMin = $ = H ? e.min.apply(e, m) : S),
              n.get("chartRangeMin") !== i &&
                (n.get("chartRangeClip") || n.get("chartRangeMin") < S) &&
                (S = n.get("chartRangeMin")),
              n.get("chartRangeMax") !== i &&
                (n.get("chartRangeClip") || n.get("chartRangeMax") > k) &&
                (k = n.get("chartRangeMax")),
              (this.zeroAxis = b = n.get("zeroAxis", !0)),
              (R = S <= 0 && k >= 0 && b ? 0 : 0 == b || S > 0 ? S : k),
              (this.xaxisOffset = R),
              (C = H ? e.max.apply(e, f) + e.max.apply(e, z) : k - S),
              (this.canvasHeightEf =
                b && S < 0 ? this.canvasHeight - 2 : this.canvasHeight - 1),
              S < R
                ? (P =
                    (((H && k >= 0 ? V : k) - R) / C) * this.canvasHeight) !==
                    e.ceil(P) && ((this.canvasHeightEf -= 2), (P = e.ceil(P)))
                : (P = this.canvasHeight),
              (this.yoffset = P),
              s.isArray(n.get("colorMap"))
                ? ((this.colorMapByIndex = n.get("colorMap")),
                  (this.colorMapByValue = null))
                : ((this.colorMapByIndex = null),
                  (this.colorMapByValue = n.get("colorMap")),
                  this.colorMapByValue &&
                    this.colorMapByValue.get === i &&
                    (this.colorMapByValue = new v(this.colorMapByValue))),
              (this.range = C);
          },
          getRegion: function (t, s, r) {
            var n = e.floor(s / this.totalBarWidth);
            return n < 0 || n >= this.values.length ? i : n;
          },
          getCurrentRegionFields: function () {
            var t,
              e,
              i = this.currentRegion,
              s = f(this.values[i]),
              r = [];
            for (e = s.length; e--; )
              (t = s[e]),
                r.push({
                  isNull: null === t,
                  value: t,
                  color: this.calcColor(e, t, i),
                  offset: i,
                });
            return r;
          },
          calcColor: function (t, e, r) {
            var n,
              a,
              o = this.colorMapByIndex,
              h = this.colorMapByValue,
              l = this.options;
            return (
              (n = this.stacked
                ? l.get("stackedBarColor")
                : e < 0
                ? l.get("negBarColor")
                : l.get("barColor")),
              0 === e && l.get("zeroColor") !== i && (n = l.get("zeroColor")),
              h && (a = h.get(e)) ? (n = a) : o && o.length > r && (n = o[r]),
              s.isArray(n) ? n[t % n.length] : n
            );
          },
          renderRegion: function (t, r) {
            var n,
              a,
              o,
              h,
              l,
              g,
              p,
              c,
              d,
              f,
              m = this.values[t],
              v = this.options,
              x = this.xaxisOffset,
              y = [],
              C = this.range,
              b = this.stacked,
              w = this.target,
              R = t * this.totalBarWidth,
              S = this.canvasHeightEf,
              k = this.yoffset;
            if (
              ((p = (m = s.isArray(m) ? m : [m]).length),
              (c = m[0]),
              (h = u(null, m)),
              (f = u(x, m, !0)),
              h)
            )
              return v.get("nullColor")
                ? ((o = r
                    ? v.get("nullColor")
                    : this.calcHighlightColor(v.get("nullColor"), v)),
                  (n = k > 0 ? k - 1 : k),
                  w.drawRect(R, n, this.barWidth - 1, 0, o, o))
                : i;
            for (l = k, g = 0; g < p; g++) {
              if (((c = m[g]), b && c === x)) {
                if (!f || d) continue;
                d = !0;
              }
              (a = C > 0 ? e.floor(S * (e.abs(c - x) / C)) + 1 : 1),
                c < x || (c === x && 0 === k)
                  ? ((n = l), (l += a))
                  : ((n = k - a), (k -= a)),
                (o = this.calcColor(g, c, t)),
                r && (o = this.calcHighlightColor(o, v)),
                y.push(w.drawRect(R, n, this.barWidth - 1, a - 1, o, o));
            }
            return 1 === y.length ? y[0] : y;
          },
        })),
      (s.fn.sparkline.tristate = R =
        n(s.fn.sparkline._base, C, {
          type: "tristate",
          init: function (t, e, r, n, a) {
            var o = parseInt(r.get("barWidth"), 10),
              h = parseInt(r.get("barSpacing"), 10);
            R._super.init.call(this, t, e, r, n, a),
              (this.regionShapes = {}),
              (this.barWidth = o),
              (this.barSpacing = h),
              (this.totalBarWidth = o + h),
              (this.values = s.map(e, Number)),
              (this.width = n = e.length * o + (e.length - 1) * h),
              s.isArray(r.get("colorMap"))
                ? ((this.colorMapByIndex = r.get("colorMap")),
                  (this.colorMapByValue = null))
                : ((this.colorMapByIndex = null),
                  (this.colorMapByValue = r.get("colorMap")),
                  this.colorMapByValue &&
                    this.colorMapByValue.get === i &&
                    (this.colorMapByValue = new v(this.colorMapByValue))),
              this.initTarget();
          },
          getRegion: function (t, i, s) {
            return e.floor(i / this.totalBarWidth);
          },
          getCurrentRegionFields: function () {
            var t = this.currentRegion;
            return {
              isNull: this.values[t] === i,
              value: this.values[t],
              color: this.calcColor(this.values[t], t),
              offset: t,
            };
          },
          calcColor: function (t, e) {
            var i,
              s = this.values,
              r = this.options,
              n = this.colorMapByIndex,
              a = this.colorMapByValue;
            return a && (i = a.get(t))
              ? i
              : n && n.length > e
              ? n[e]
              : s[e] < 0
              ? r.get("negBarColor")
              : s[e] > 0
              ? r.get("posBarColor")
              : r.get("zeroBarColor");
          },
          renderRegion: function (t, i) {
            var s,
              r,
              n,
              a,
              o,
              h,
              l = this.values,
              g = this.options,
              p = this.target;
            if (
              ((s = p.pixelHeight),
              (n = e.round(s / 2)),
              (a = t * this.totalBarWidth),
              l[t] < 0
                ? ((o = n), (r = n - 1))
                : l[t] > 0
                ? ((o = 0), (r = n - 1))
                : ((o = n - 1), (r = 2)),
              null !== (h = this.calcColor(l[t], t)))
            )
              return (
                i && (h = this.calcHighlightColor(h, g)),
                p.drawRect(a, o, this.barWidth - 1, r - 1, h, h)
              );
          },
        })),
      (s.fn.sparkline.discrete = S =
        n(s.fn.sparkline._base, C, {
          type: "discrete",
          init: function (t, r, n, a, o) {
            S._super.init.call(this, t, r, n, a, o),
              (this.regionShapes = {}),
              (this.values = r = s.map(r, Number)),
              (this.min = e.min.apply(e, r)),
              (this.max = e.max.apply(e, r)),
              (this.range = this.max - this.min),
              (this.width = a =
                "auto" === n.get("width") ? 2 * r.length : this.width),
              (this.interval = e.floor(a / r.length)),
              (this.itemWidth = a / r.length),
              n.get("chartRangeMin") !== i &&
                (n.get("chartRangeClip") ||
                  n.get("chartRangeMin") < this.min) &&
                (this.min = n.get("chartRangeMin")),
              n.get("chartRangeMax") !== i &&
                (n.get("chartRangeClip") ||
                  n.get("chartRangeMax") > this.max) &&
                (this.max = n.get("chartRangeMax")),
              this.initTarget(),
              this.target &&
                (this.lineHeight =
                  "auto" === n.get("lineHeight")
                    ? e.round(0.3 * this.canvasHeight)
                    : n.get("lineHeight"));
          },
          getRegion: function (t, i, s) {
            return e.floor(i / this.itemWidth);
          },
          getCurrentRegionFields: function () {
            var t = this.currentRegion;
            return {
              isNull: this.values[t] === i,
              value: this.values[t],
              offset: t,
            };
          },
          renderRegion: function (t, i) {
            var s,
              r,
              n,
              a,
              h = this.values,
              l = this.options,
              g = this.min,
              p = this.max,
              c = this.range,
              u = this.interval,
              d = this.target,
              f = this.canvasHeight,
              m = this.lineHeight,
              v = f - m;
            return (
              (r = o(h[t], g, p)),
              (a = t * u),
              (s = e.round(v - v * ((r - g) / c))),
              (n =
                l.get("thresholdColor") && r < l.get("thresholdValue")
                  ? l.get("thresholdColor")
                  : l.get("lineColor")),
              i && (n = this.calcHighlightColor(n, l)),
              d.drawLine(a, s, a, s + m, n)
            );
          },
        })),
      (s.fn.sparkline.bullet = k =
        n(s.fn.sparkline._base, {
          type: "bullet",
          init: function (t, s, r, n, a) {
            var o, h, l;
            k._super.init.call(this, t, s, r, n, a),
              (this.values = s = g(s)),
              ((l = s.slice())[0] = null === l[0] ? l[2] : l[0]),
              (l[1] = null === s[1] ? l[2] : l[1]),
              (o = e.min.apply(e, s)),
              (h = e.max.apply(e, s)),
              (o = r.get("base") === i ? (o < 0 ? o : 0) : r.get("base")),
              (this.min = o),
              (this.max = h),
              (this.range = h - o),
              (this.shapes = {}),
              (this.valueShapes = {}),
              (this.regiondata = {}),
              (this.width = n = "auto" === r.get("width") ? "4.0em" : n),
              (this.target = this.$el.simpledraw(n, a, r.get("composite"))),
              s.length || (this.disabled = !0),
              this.initTarget();
          },
          getRegion: function (t, e, s) {
            var r = this.target.getShapeAt(t, e, s);
            return r !== i && this.shapes[r] !== i ? this.shapes[r] : i;
          },
          getCurrentRegionFields: function () {
            var t = this.currentRegion;
            return {
              fieldkey: t.substr(0, 1),
              value: this.values[t.substr(1)],
              region: t,
            };
          },
          changeHighlight: function (t) {
            var e,
              i = this.currentRegion,
              s = this.valueShapes[i];
            switch ((delete this.shapes[s], i.substr(0, 1))) {
              case "r":
                e = this.renderRange(i.substr(1), t);
                break;
              case "p":
                e = this.renderPerformance(t);
                break;
              case "t":
                e = this.renderTarget(t);
            }
            (this.valueShapes[i] = e.id),
              (this.shapes[e.id] = i),
              this.target.replaceWithShape(s, e);
          },
          renderRange: function (t, i) {
            var s = this.values[t],
              r = e.round(this.canvasWidth * ((s - this.min) / this.range)),
              n = this.options.get("rangeColors")[t - 2];
            return (
              i && (n = this.calcHighlightColor(n, this.options)),
              this.target.drawRect(0, 0, r - 1, this.canvasHeight - 1, n, n)
            );
          },
          renderPerformance: function (t) {
            var i = this.values[1],
              s = e.round(this.canvasWidth * ((i - this.min) / this.range)),
              r = this.options.get("performanceColor");
            return (
              t && (r = this.calcHighlightColor(r, this.options)),
              this.target.drawRect(
                0,
                e.round(0.3 * this.canvasHeight),
                s - 1,
                e.round(0.4 * this.canvasHeight) - 1,
                r,
                r
              )
            );
          },
          renderTarget: function (t) {
            var i = this.values[0],
              s = e.round(
                this.canvasWidth * ((i - this.min) / this.range) -
                  this.options.get("targetWidth") / 2
              ),
              r = e.round(0.1 * this.canvasHeight),
              n = this.canvasHeight - 2 * r,
              a = this.options.get("targetColor");
            return (
              t && (a = this.calcHighlightColor(a, this.options)),
              this.target.drawRect(
                s,
                r,
                this.options.get("targetWidth") - 1,
                n - 1,
                a,
                a
              )
            );
          },
          render: function () {
            var t,
              e,
              i = this.values.length,
              s = this.target;
            if (k._super.render.call(this)) {
              for (t = 2; t < i; t++)
                (e = this.renderRange(t).append()),
                  (this.shapes[e.id] = "r" + t),
                  (this.valueShapes["r" + t] = e.id);
              null !== this.values[1] &&
                ((e = this.renderPerformance().append()),
                (this.shapes[e.id] = "p1"),
                (this.valueShapes.p1 = e.id)),
                null !== this.values[0] &&
                  ((e = this.renderTarget().append()),
                  (this.shapes[e.id] = "t0"),
                  (this.valueShapes.t0 = e.id)),
                s.render();
            }
          },
        })),
      (s.fn.sparkline.pie = M =
        n(s.fn.sparkline._base, {
          type: "pie",
          init: function (t, i, r, n, a) {
            var o,
              h = 0;
            if (
              (M._super.init.call(this, t, i, r, n, a),
              (this.shapes = {}),
              (this.valueShapes = {}),
              (this.values = i = s.map(i, Number)),
              "auto" === r.get("width") && (this.width = this.height),
              i.length > 0)
            )
              for (o = i.length; o--; ) h += i[o];
            (this.total = h),
              this.initTarget(),
              (this.radius = e.floor(
                e.min(this.canvasWidth, this.canvasHeight) / 2
              ));
          },
          getRegion: function (t, e, s) {
            var r = this.target.getShapeAt(t, e, s);
            return r !== i && this.shapes[r] !== i ? this.shapes[r] : i;
          },
          getCurrentRegionFields: function () {
            var t = this.currentRegion;
            return {
              isNull: this.values[t] === i,
              value: this.values[t],
              percent: (this.values[t] / this.total) * 100,
              color:
                this.options.get("sliceColors")[
                  t % this.options.get("sliceColors").length
                ],
              offset: t,
            };
          },
          changeHighlight: function (t) {
            var e = this.currentRegion,
              i = this.renderSlice(e, t),
              s = this.valueShapes[e];
            delete this.shapes[s],
              this.target.replaceWithShape(s, i),
              (this.valueShapes[e] = i.id),
              (this.shapes[i.id] = e);
          },
          renderSlice: function (t, s) {
            var r,
              n,
              a,
              o,
              h,
              l = this.target,
              g = this.options,
              p = this.radius,
              c = g.get("borderWidth"),
              u = g.get("offset"),
              d = 2 * e.PI,
              f = this.values,
              m = this.total,
              v = u ? 2 * e.PI * (u / 360) : 0;
            for (o = f.length, a = 0; a < o; a++) {
              if (
                ((r = v), (n = v), m > 0 && (n = v + d * (f[a] / m)), t === a)
              )
                return (
                  (h = g.get("sliceColors")[a % g.get("sliceColors").length]),
                  s && (h = this.calcHighlightColor(h, g)),
                  l.drawPieSlice(p, p, p - c, r, n, i, h)
                );
              v = n;
            }
          },
          render: function () {
            var t,
              s,
              r = this.target,
              n = this.values,
              a = this.options,
              o = this.radius,
              h = a.get("borderWidth"),
              l = a.get("donutWidth");
            if (M._super.render.call(this)) {
              for (
                h &&
                  r
                    .drawCircle(
                      o,
                      o,
                      e.floor(o - h / 2),
                      a.get("borderColor"),
                      i,
                      h
                    )
                    .append(),
                  s = n.length;
                s--;

              )
                n[s] &&
                  ((t = this.renderSlice(s).append()),
                  (this.valueShapes[s] = t.id),
                  (this.shapes[t.id] = s));
              l &&
                r
                  .drawCircle(
                    o,
                    o,
                    o - l,
                    a.get("donutColor"),
                    a.get("donutColor"),
                    0
                  )
                  .append(),
                r.render();
            }
          },
        })),
      (s.fn.sparkline.box = _ =
        n(s.fn.sparkline._base, {
          type: "box",
          init: function (t, e, i, r, n) {
            _._super.init.call(this, t, e, i, r, n),
              (this.values = s.map(e, Number)),
              (this.width = "auto" === i.get("width") ? "4.0em" : r),
              this.initTarget(),
              this.values.length || (this.disabled = 1);
          },
          getRegion: function () {
            return 1;
          },
          getCurrentRegionFields: function () {
            var t = [
              { field: "lq", value: this.quartiles[0] },
              { field: "med", value: this.quartiles[1] },
              { field: "uq", value: this.quartiles[2] },
            ];
            return (
              this.loutlier !== i &&
                t.push({ field: "lo", value: this.loutlier }),
              this.routlier !== i &&
                t.push({ field: "ro", value: this.routlier }),
              this.lwhisker !== i &&
                t.push({ field: "lw", value: this.lwhisker }),
              this.rwhisker !== i &&
                t.push({ field: "rw", value: this.rwhisker }),
              t
            );
          },
          render: function () {
            var t,
              s,
              r,
              n,
              a,
              o,
              l,
              g,
              p,
              c,
              u,
              d = this.target,
              f = this.values,
              m = f.length,
              v = this.options,
              x = this.canvasWidth,
              y = this.canvasHeight,
              C =
                v.get("chartRangeMin") === i
                  ? e.min.apply(e, f)
                  : v.get("chartRangeMin"),
              b =
                v.get("chartRangeMax") === i
                  ? e.max.apply(e, f)
                  : v.get("chartRangeMax"),
              w = 0;
            if (_._super.render.call(this)) {
              if (v.get("raw"))
                v.get("showOutliers") && f.length > 5
                  ? ((s = f[0]),
                    (t = f[1]),
                    (n = f[2]),
                    (a = f[3]),
                    (o = f[4]),
                    (l = f[5]),
                    (g = f[6]))
                  : ((t = f[0]),
                    (n = f[1]),
                    (a = f[2]),
                    (o = f[3]),
                    (l = f[4]));
              else if (
                (f.sort(function (t, e) {
                  return t - e;
                }),
                (n = h(f, 1)),
                (a = h(f, 2)),
                (r = (o = h(f, 3)) - n),
                v.get("showOutliers"))
              ) {
                for (t = l = i, p = 0; p < m; p++)
                  t === i && f[p] > n - r * v.get("outlierIQR") && (t = f[p]),
                    f[p] < o + r * v.get("outlierIQR") && (l = f[p]);
                (s = f[0]), (g = f[m - 1]);
              } else (t = f[0]), (l = f[m - 1]);
              (this.quartiles = [n, a, o]),
                (this.lwhisker = t),
                (this.rwhisker = l),
                (this.loutlier = s),
                (this.routlier = g),
                (u = x / (b - C + 1)),
                v.get("showOutliers") &&
                  ((w = e.ceil(v.get("spotRadius"))),
                  (u = (x -= 2 * e.ceil(v.get("spotRadius"))) / (b - C + 1)),
                  s < t &&
                    d
                      .drawCircle(
                        (s - C) * u + w,
                        y / 2,
                        v.get("spotRadius"),
                        v.get("outlierLineColor"),
                        v.get("outlierFillColor")
                      )
                      .append(),
                  g > l &&
                    d
                      .drawCircle(
                        (g - C) * u + w,
                        y / 2,
                        v.get("spotRadius"),
                        v.get("outlierLineColor"),
                        v.get("outlierFillColor")
                      )
                      .append()),
                d
                  .drawRect(
                    e.round((n - C) * u + w),
                    e.round(0.1 * y),
                    e.round((o - n) * u),
                    e.round(0.8 * y),
                    v.get("boxLineColor"),
                    v.get("boxFillColor")
                  )
                  .append(),
                d
                  .drawLine(
                    e.round((t - C) * u + w),
                    e.round(y / 2),
                    e.round((n - C) * u + w),
                    e.round(y / 2),
                    v.get("lineColor")
                  )
                  .append(),
                d
                  .drawLine(
                    e.round((t - C) * u + w),
                    e.round(y / 4),
                    e.round((t - C) * u + w),
                    e.round(y - y / 4),
                    v.get("whiskerColor")
                  )
                  .append(),
                d
                  .drawLine(
                    e.round((l - C) * u + w),
                    e.round(y / 2),
                    e.round((o - C) * u + w),
                    e.round(y / 2),
                    v.get("lineColor")
                  )
                  .append(),
                d
                  .drawLine(
                    e.round((l - C) * u + w),
                    e.round(y / 4),
                    e.round((l - C) * u + w),
                    e.round(y - y / 4),
                    v.get("whiskerColor")
                  )
                  .append(),
                d
                  .drawLine(
                    e.round((a - C) * u + w),
                    e.round(0.1 * y),
                    e.round((a - C) * u + w),
                    e.round(0.9 * y),
                    v.get("medianColor")
                  )
                  .append(),
                v.get("target") &&
                  ((c = e.ceil(v.get("spotRadius"))),
                  d
                    .drawLine(
                      e.round((v.get("target") - C) * u + w),
                      e.round(y / 2 - c),
                      e.round((v.get("target") - C) * u + w),
                      e.round(y / 2 + c),
                      v.get("targetColor")
                    )
                    .append(),
                  d
                    .drawLine(
                      e.round((v.get("target") - C) * u + w - c),
                      e.round(y / 2),
                      e.round((v.get("target") - C) * u + w + c),
                      e.round(y / 2),
                      v.get("targetColor")
                    )
                    .append()),
                d.render();
            }
          },
        })),
      (H = n({
        init: function (t, e, i, s) {
          (this.target = t), (this.id = e), (this.type = i), (this.args = s);
        },
        append: function () {
          return this.target.appendShape(this), this;
        },
      })),
      (j = n({
        _pxregex: /(\d+)(px)?\s*$/i,
        init: function (t, e, i) {
          t &&
            ((this.width = t),
            (this.height = e),
            (this.target = i),
            (this.lastShapeId = null),
            i[0] && (i = i[0]),
            s.data(i, "_jqs_vcanvas", this));
        },
        drawLine: function (t, e, i, s, r, n) {
          return this.drawShape(
            [
              [t, e],
              [i, s],
            ],
            r,
            n
          );
        },
        drawShape: function (t, e, i, s) {
          return this._genShape("Shape", [t, e, i, s]);
        },
        drawCircle: function (t, e, i, s, r, n) {
          return this._genShape("Circle", [t, e, i, s, r, n]);
        },
        drawPieSlice: function (t, e, i, s, r, n, a) {
          return this._genShape("PieSlice", [t, e, i, s, r, n, a]);
        },
        drawRect: function (t, e, i, s, r, n) {
          return this._genShape("Rect", [t, e, i, s, r, n]);
        },
        getElement: function () {
          return this.canvas;
        },
        getLastShapeId: function () {
          return this.lastShapeId;
        },
        reset: function () {
          alert("reset not implemented");
        },
        _insert: function (t, e) {
          s(e).html(t);
        },
        _calculatePixelDims: function (t, e, i) {
          var r;
          (r = this._pxregex.exec(e)),
            (this.pixelHeight = r ? r[1] : s(i).height()),
            (r = this._pxregex.exec(t)),
            (this.pixelWidth = r ? r[1] : s(i).width());
        },
        _genShape: function (t, e) {
          var i = P++;
          return e.unshift(i), new H(this, i, t, e);
        },
        appendShape: function (t) {
          alert("appendShape not implemented");
        },
        replaceWithShape: function (t, e) {
          alert("replaceWithShape not implemented");
        },
        insertAfterShape: function (t, e) {
          alert("insertAfterShape not implemented");
        },
        removeShapeId: function (t) {
          alert("removeShapeId not implemented");
        },
        getShapeAt: function (t, e, i) {
          alert("getShapeAt not implemented");
        },
        render: function () {
          alert("render not implemented");
        },
      })),
      (W = n(j, {
        init: function (e, r, n, a) {
          W._super.init.call(this, e, r, n),
            (this.canvas = t.createElement("canvas")),
            n[0] && (n = n[0]),
            s.data(n, "_jqs_vcanvas", this),
            s(this.canvas).css({
              display: "inline-block",
              width: e,
              height: r,
              verticalAlign: "top",
            }),
            this._insert(this.canvas, n),
            this._calculatePixelDims(e, r, this.canvas),
            (this.canvas.width = this.pixelWidth),
            (this.canvas.height = this.pixelHeight),
            (this.interact = a),
            (this.shapes = {}),
            (this.shapeseq = []),
            (this.currentTargetShapeId = i),
            s(this.canvas).css({
              width: this.pixelWidth,
              height: this.pixelHeight,
            });
        },
        _getContext: function (t, e, s) {
          var r = this.canvas.getContext("2d");
          return (
            t !== i && (r.strokeStyle = t),
            (r.lineWidth = s === i ? 1 : s),
            e !== i && (r.fillStyle = e),
            r
          );
        },
        reset: function () {
          this._getContext().clearRect(0, 0, this.pixelWidth, this.pixelHeight),
            (this.shapes = {}),
            (this.shapeseq = []),
            (this.currentTargetShapeId = i);
        },
        _drawShape: function (t, e, s, r, n) {
          var a,
            o,
            h = this._getContext(s, r, n);
          for (
            h.beginPath(),
              h.moveTo(e[0][0] + 0.5, e[0][1] + 0.5),
              a = 1,
              o = e.length;
            a < o;
            a++
          )
            h.lineTo(e[a][0] + 0.5, e[a][1] + 0.5);
          s !== i && h.stroke(),
            r !== i && h.fill(),
            this.targetX !== i &&
              this.targetY !== i &&
              h.isPointInPath(this.targetX, this.targetY) &&
              (this.currentTargetShapeId = t);
        },
        _drawCircle: function (t, s, r, n, a, o, h) {
          var l = this._getContext(a, o, h);
          l.beginPath(),
            l.arc(s, r, n, 0, 2 * e.PI, !1),
            this.targetX !== i &&
              this.targetY !== i &&
              l.isPointInPath(this.targetX, this.targetY) &&
              (this.currentTargetShapeId = t),
            a !== i && l.stroke(),
            o !== i && l.fill();
        },
        _drawPieSlice: function (t, e, s, r, n, a, o, h) {
          var l = this._getContext(o, h);
          l.beginPath(),
            l.moveTo(e, s),
            l.arc(e, s, r, n, a, !1),
            l.lineTo(e, s),
            l.closePath(),
            o !== i && l.stroke(),
            h && l.fill(),
            this.targetX !== i &&
              this.targetY !== i &&
              l.isPointInPath(this.targetX, this.targetY) &&
              (this.currentTargetShapeId = t);
        },
        _drawRect: function (t, e, i, s, r, n, a) {
          return this._drawShape(
            t,
            [
              [e, i],
              [e + s, i],
              [e + s, i + r],
              [e, i + r],
              [e, i],
            ],
            n,
            a
          );
        },
        appendShape: function (t) {
          return (
            (this.shapes[t.id] = t),
            this.shapeseq.push(t.id),
            (this.lastShapeId = t.id),
            t.id
          );
        },
        replaceWithShape: function (t, e) {
          var i,
            s = this.shapeseq;
          for (this.shapes[e.id] = e, i = s.length; i--; )
            s[i] == t && (s[i] = e.id);
          delete this.shapes[t];
        },
        replaceWithShapes: function (t, e) {
          var i,
            s,
            r,
            n = this.shapeseq,
            a = {};
          for (s = t.length; s--; ) a[t[s]] = !0;
          for (s = n.length; s--; )
            a[(i = n[s])] && (n.splice(s, 1), delete this.shapes[i], (r = s));
          for (s = e.length; s--; )
            n.splice(r, 0, e[s].id), (this.shapes[e[s].id] = e[s]);
        },
        insertAfterShape: function (t, e) {
          var i,
            s = this.shapeseq;
          for (i = s.length; i--; )
            if (s[i] === t)
              return s.splice(i + 1, 0, e.id), void (this.shapes[e.id] = e);
        },
        removeShapeId: function (t) {
          var e,
            i = this.shapeseq;
          for (e = i.length; e--; )
            if (i[e] === t) {
              i.splice(e, 1);
              break;
            }
          delete this.shapes[t];
        },
        getShapeAt: function (t, e, i) {
          return (
            (this.targetX = e),
            (this.targetY = i),
            this.render(),
            this.currentTargetShapeId
          );
        },
        render: function () {
          var t,
            e,
            i = this.shapeseq,
            s = this.shapes,
            r = i.length;
          for (
            this._getContext().clearRect(
              0,
              0,
              this.pixelWidth,
              this.pixelHeight
            ),
              e = 0;
            e < r;
            e++
          )
            this["_draw" + (t = s[i[e]]).type].apply(this, t.args);
          this.interact || ((this.shapes = {}), (this.shapeseq = []));
        },
      })),
      (T = n(j, {
        init: function (e, i, r) {
          var n;
          T._super.init.call(this, e, i, r),
            r[0] && (r = r[0]),
            s.data(r, "_jqs_vcanvas", this),
            (this.canvas = t.createElement("span")),
            s(this.canvas).css({
              display: "inline-block",
              position: "relative",
              overflow: "hidden",
              width: e,
              height: i,
              margin: "0px",
              padding: "0px",
              verticalAlign: "top",
            }),
            this._insert(this.canvas, r),
            this._calculatePixelDims(e, i, this.canvas),
            (this.canvas.width = this.pixelWidth),
            (this.canvas.height = this.pixelHeight),
            (n =
              '<v:group coordorigin="0 0" coordsize="' +
              this.pixelWidth +
              " " +
              this.pixelHeight +
              '" style="position:absolute;top:0;left:0;width:' +
              this.pixelWidth +
              "px;height=" +
              this.pixelHeight +
              'px;"></v:group>'),
            this.canvas.insertAdjacentHTML("beforeEnd", n),
            (this.group = s(this.canvas).children()[0]),
            (this.rendered = !1),
            (this.prerender = "");
        },
        _drawShape: function (t, e, s, r, n) {
          var a,
            o,
            h,
            l,
            g,
            p,
            c = [];
          for (p = 0, g = e.length; p < g; p++) c[p] = e[p][0] + "," + e[p][1];
          return (
            (a = c.splice(0, 1)),
            (n = n === i ? 1 : n),
            (o =
              s === i
                ? ' stroked="false" '
                : ' strokeWeight="' + n + 'px" strokeColor="' + s + '" '),
            (h =
              r === i
                ? ' filled="false"'
                : ' fillColor="' + r + '" filled="true" '),
            (l = c[0] === c[c.length - 1] ? "x " : ""),
            '<v:shape coordorigin="0 0" coordsize="' +
              this.pixelWidth +
              " " +
              this.pixelHeight +
              '"  id="jqsshape' +
              t +
              '" ' +
              o +
              h +
              ' style="position:absolute;left:0px;top:0px;height:' +
              this.pixelHeight +
              "px;width:" +
              this.pixelWidth +
              'px;padding:0px;margin:0px;"  path="m ' +
              a +
              " l " +
              c.join(", ") +
              " " +
              l +
              'e"> </v:shape>'
          );
        },
        _drawCircle: function (t, e, s, r, n, a, o) {
          return (
            '<v:oval  id="jqsshape' +
            t +
            '" ' +
            (n === i
              ? ' stroked="false" '
              : ' strokeWeight="' + o + 'px" strokeColor="' + n + '" ') +
            (a === i
              ? ' filled="false"'
              : ' fillColor="' + a + '" filled="true" ') +
            ' style="position:absolute;top:' +
            (s -= r) +
            "px; left:" +
            (e -= r) +
            "px; width:" +
            2 * r +
            "px; height:" +
            2 * r +
            'px"></v:oval>'
          );
        },
        _drawPieSlice: function (t, s, r, n, a, o, h, l) {
          var g, p, c, u, d, f, m;
          if (a === o) return "";
          if (
            (o - a == 2 * e.PI && ((a = 0), (o = 2 * e.PI)),
            (p = s + e.round(e.cos(a) * n)),
            (c = r + e.round(e.sin(a) * n)),
            (u = s + e.round(e.cos(o) * n)),
            (d = r + e.round(e.sin(o) * n)),
            p === u && c === d)
          ) {
            if (o - a < e.PI) return "";
            (p = u = s + n), (c = d = r);
          }
          return p === u && c === d && o - a < e.PI
            ? ""
            : ((g = [s - n, r - n, s + n, r + n, p, c, u, d]),
              (f =
                h === i
                  ? ' stroked="false" '
                  : ' strokeWeight="1px" strokeColor="' + h + '" '),
              (m =
                l === i
                  ? ' filled="false"'
                  : ' fillColor="' + l + '" filled="true" '),
              '<v:shape coordorigin="0 0" coordsize="' +
                this.pixelWidth +
                " " +
                this.pixelHeight +
                '"  id="jqsshape' +
                t +
                '" ' +
                f +
                m +
                ' style="position:absolute;left:0px;top:0px;height:' +
                this.pixelHeight +
                "px;width:" +
                this.pixelWidth +
                'px;padding:0px;margin:0px;"  path="m ' +
                s +
                "," +
                r +
                " wa " +
                g.join(", ") +
                ' x e"> </v:shape>');
        },
        _drawRect: function (t, e, i, s, r, n, a) {
          return this._drawShape(
            t,
            [
              [e, i],
              [e, i + r],
              [e + s, i + r],
              [e + s, i],
              [e, i],
            ],
            n,
            a
          );
        },
        reset: function () {
          this.group.innerHTML = "";
        },
        appendShape: function (t) {
          var e = this["_draw" + t.type].apply(this, t.args);
          return (
            this.rendered
              ? this.group.insertAdjacentHTML("beforeEnd", e)
              : (this.prerender += e),
            (this.lastShapeId = t.id),
            t.id
          );
        },
        replaceWithShape: function (t, e) {
          var i = s("#jqsshape" + t),
            r = this["_draw" + e.type].apply(this, e.args);
          i[0].outerHTML = r;
        },
        replaceWithShapes: function (t, e) {
          var i,
            r = s("#jqsshape" + t[0]),
            n = "",
            a = e.length;
          for (i = 0; i < a; i++)
            n += this["_draw" + e[i].type].apply(this, e[i].args);
          for (r[0].outerHTML = n, i = 1; i < t.length; i++)
            s("#jqsshape" + t[i]).remove();
        },
        insertAfterShape: function (t, e) {
          var i = s("#jqsshape" + t),
            r = this["_draw" + e.type].apply(this, e.args);
          i[0].insertAdjacentHTML("afterEnd", r);
        },
        removeShapeId: function (t) {
          var e = s("#jqsshape" + t);
          this.group.removeChild(e[0]);
        },
        getShapeAt: function (t, e, i) {
          return t.id.substr(8);
        },
        render: function () {
          this.rendered ||
            ((this.group.innerHTML = this.prerender), (this.rendered = !0));
        },
      }));
  }),
    "function" == typeof define && define.amd
      ? define(["jquery"], s)
      : jQuery && !jQuery.fn.sparkline && s(jQuery);
})(document, Math),
  document.addEventListener("DOMContentLoaded", function () {
    $(".sparklines").sparkline("html", {
      enableTagOptions: !0,
      width: 110,
      height: 40,
      barSpacing: "3px",
      barWidth: "7px",
      spotRadius: 3,
      highlightLineColor: rgb2hex(
        $("#js-color-profile .color-danger-700").css("color")
      ),
      targetColor: rgb2hex(
        $("#js-color-profile .color-danger-500").css("color")
      ),
      performanceColor: rgb2hex(
        $("#js-color-profile .color-primary-700").css("color")
      ),
      rangeColors: [
        rgb2hex($("#js-color-profile .color-primary-100").css("color")),
        rgb2hex($("#js-color-profile .color-primary-200").css("color")),
        rgb2hex($("#js-color-profile .color-primary-300").css("color")),
      ],
      barColor: rgb2hex($("#js-color-profile .color-primary-500").css("color")),
      stackedBarColor: [
        rgb2hex($("#js-color-profile .color-danger-300").css("color")),
        rgb2hex($("#js-color-profile .color-info-300").css("color")),
      ],
      sliceColors: [
        rgb2hex($("#js-color-profile .color-success-500").css("color")),
        rgb2hex($("#js-color-profile .color-info-500").css("color")),
        rgb2hex($("#js-color-profile .color-danger-500").css("color")),
        rgb2hex($("#js-color-profile .color-primary-500").css("color")),
        rgb2hex($("#js-color-profile .color-warning-500").css("color")),
        rgb2hex($("#js-color-profile .color-primary-700").css("color")),
        rgb2hex($("#js-color-profile .color-info-700").css("color")),
        rgb2hex($("#js-color-profile .color-danger-700").css("color")),
      ],
    });
  });
