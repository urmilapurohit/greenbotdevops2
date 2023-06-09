﻿/*

jSignature v2 "2017-07-30T10:26" "commit ID 3ef5538b5b49228993a9d3613d4b6d465150a310"
Copyright (c) 2012 Willow Systems Corp http://willow-systems.com
Copyright (c) 2010 Brinley Ang http://www.unbolt.net
MIT License <http://www.opensource.org/licenses/mit-license.php>


Simplify.js BSD 
(c) 2012, Vladimir Agafonkin
mourner.github.com/simplify-js


base64 encoder
MIT, GPL
http://phpjs.org/functions/base64_encode
+   original by: Tyler Akins (http://rumkin.com)
+   improved by: Bayron Guevara
+   improved by: Thunder.m
+   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
+   bugfixed by: Pellentesque Malesuada
+   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
+   improved by: Rafal Kukawski (http://kukawski.pl)


jSignature v2 jSignature's Undo Button and undo functionality plugin


jSignature v2 jSignature's custom "base30" format export and import plugins.


jSignature v2 SVG export plugin.

*/
(function () {
    function q(a) {
        var b = a.css("color"),
            d;
        a = a[0];
        for (var g = !1; a && !d && !g;) {
            try {
                var c = $(a).css("background-color")
            } catch (l) {
                c = "transparent"
            }
            "transparent" !== c && "rgba(0, 0, 0, 0)" !== c && (d = c);
            g = a.body;
            a = a.parentNode
        }
        a = /rgb[a]*\((\d+),\s*(\d+),\s*(\d+)/;
        var g = /#([AaBbCcDdEeFf\d]{2})([AaBbCcDdEeFf\d]{2})([AaBbCcDdEeFf\d]{2})/;
        c = void 0;
        if (c = b.match(a)) var n = {
            r: parseInt(c[1], 10),
            g: parseInt(c[2], 10),
            b: parseInt(c[3], 10)
        };
        else (c = b.match(g)) && (n = {
            r: parseInt(c[1], 16),
            g: parseInt(c[2], 16),
            b: parseInt(c[3],
                16)
        });
        if (d)
            if (c = void 0, c = d.match(a)) var e = {
                r: parseInt(c[1], 10),
                g: parseInt(c[2], 10),
                b: parseInt(c[3], 10)
            };
            else (c = d.match(g)) && (e = {
                r: parseInt(c[1], 16),
                g: parseInt(c[2], 16),
                b: parseInt(c[3], 16)
            });
        else e = n ? 127 < Math.max.apply(null, [n.r, n.g, n.b]) ? {
            r: 0,
            g: 0,
            b: 0
        } : {
            r: 255,
            g: 255,
            b: 255
        } : {
            r: 255,
            g: 255,
            b: 255
        };
        c = function (a) {
            return "rgb(" + [a.r, a.g, a.b].join(", ") + ")"
        };
        n && e ? (a = Math.max.apply(null, [n.r, n.g, n.b]), n = Math.max.apply(null, [e.r, e.g, e.b]), n = Math.round(n + -.75 * (n - a)), n = {
            r: n,
            g: n,
            b: n
        }) : n ? (n = Math.max.apply(null, [n.r,
            n.g, n.b
        ]), a = 1, 127 < n && (a = -1), n = Math.round(n + 96 * a), n = {
            r: n,
            g: n,
            b: n
        }) : n = {
            r: 191,
            g: 191,
            b: 191
        };
        return {
            color: b,
            "background-color": e ? c(e) : d,
            "decor-color": c(n)
        }
    }

    function k(a, b) {
        this.x = a;
        this.y = b;
        this.reverse = function () {
            return new this.constructor(-1 * this.x, -1 * this.y)
        };
        this._length = null;
        this.getLength = function () {
            this._length || (this._length = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)));
            return this._length
        };
        var d = function (a) {
            return Math.round(a / Math.abs(a))
        };
        this.resizeTo = function (a) {
            if (0 === this.x && 0 === this.y) this._length =
                0;
            else if (0 === this.x) this._length = a, this.y = a * d(this.y);
            else if (0 === this.y) this._length = a, this.x = a * d(this.x);
            else {
                var b = Math.abs(this.y / this.x),
                    g = Math.sqrt(Math.pow(a, 2) / (1 + Math.pow(b, 2))),
                    b = b * g;
                this._length = a;
                this.x = g * d(this.x);
                this.y = b * d(this.y)
            }
            return this
        };
        this.angleTo = function (a) {
            var b = this.getLength() * a.getLength();
            return 0 === b ? 0 : Math.acos(Math.min(Math.max((this.x * a.x + this.y * a.y) / b, -1), 1)) / Math.PI
        }
    }

    function h(a, b) {
        this.x = a;
        this.y = b;
        this.getVectorToCoordinates = function (a, b) {
            return new k(a - this.x,
                b - this.y)
        };
        this.getVectorFromCoordinates = function (a, b) {
            return this.getVectorToCoordinates(a, b).reverse()
        };
        this.getVectorToPoint = function (a) {
            return new k(a.x - this.x, a.y - this.y)
        };
        this.getVectorFromPoint = function (a) {
            return this.getVectorToPoint(a).reverse()
        }
    }

    function p(a, b, d, g, c) {
        this.data = a;
        this.context = b;
        if (a.length)
            for (var n = a.length, e, l, f = 0; f < n; f++) {
                e = a[f];
                l = e.x.length;
                d.call(b, e);
                for (var u = 1; u < l; u++) g.call(b, e, u);
                c.call(b, e)
            }
        this.changed = function () { };
        this.startStrokeFn = d;
        this.addToStrokeFn = g;
        this.endStrokeFn =
            c;
        this.inStroke = !1;
        this._stroke = this._lastPoint = null;
        this.startStroke = function (a) {
            if (a && "number" == typeof a.x && "number" == typeof a.y) {
                this._stroke = {
                    x: [a.x],
                    y: [a.y]
                };
                this.data.push(this._stroke);
                this._lastPoint = a;
                this.inStroke = !0;
                var b = this._stroke,
                    d = this.startStrokeFn,
                    c = this.context;
                setTimeout(function () {
                    d.call(c, b)
                }, 3);
                return a
            }
            return null
        };
        this.addToStroke = function (a) {
            if (this.inStroke && "number" === typeof a.x && "number" === typeof a.y && 4 < Math.abs(a.x - this._lastPoint.x) + Math.abs(a.y - this._lastPoint.y)) {
                var b =
                    this._stroke.x.length;
                this._stroke.x.push(a.x);
                this._stroke.y.push(a.y);
                this._lastPoint = a;
                var d = this._stroke,
                    c = this.addToStrokeFn,
                    g = this.context;
                setTimeout(function () {
                    c.call(g, d, b)
                }, 3);
                return a
            }
            return null
        };
        this.endStroke = function () {
            var a = this.inStroke;
            this.inStroke = !1;
            this._lastPoint = null;
            if (a) {
                var b = this._stroke,
                    d = this.endStrokeFn,
                    c = this.context,
                    g = this.changed;
                setTimeout(function () {
                    d.call(c, b);
                    g.call(c)
                }, 3);
                return !0
            }
            return null
        }
    }

    function m(a, b, d, g) {
        if ("ratio" === b || "%" === b.split("")[b.length - 1]) this.eventTokens[d +
            ".parentresized"] = g.subscribe(d + ".parentresized", function (b, n, e, l) {
                return function () {
                    var c = n.width();
                    if (c !== e) {
                        for (var l in b) b.hasOwnProperty(l) && (g.unsubscribe(b[l]), delete b[l]);
                        var f = a.settings;
                        a.$parent.children().remove();
                        for (l in a) a.hasOwnProperty(l) && delete a[l];
                        l = f.data;
                        var c = 1 * c / e,
                            t = [],
                            C, D;
                        var h = 0;
                        for (C = l.length; h < C; h++) {
                            var k = l[h];
                            var m = {
                                x: [],
                                y: []
                            };
                            var p = 0;
                            for (D = k.x.length; p < D; p++) m.x.push(k.x[p] * c), m.y.push(k.y[p] * c);
                            t.push(m)
                        }
                        f.data = t;
                        n[d](f)
                    }
                }
            }(this.eventTokens, this.$parent, this.$parent.width(),
            1 * this.canvas.width / this.canvas.height))
    }

    function x(a, b, d) {
        var g = this.$parent = $(a);
        a = this.eventTokens = {};
        this.events = new v(this);
        var c = $.fn.jSignature("globalEvents"),
            e = {
                width: "ratio",
                height: "ratio",
                sizeRatio: 4,
                color: "#000",
                "background-color": "#fff",
                "decor-color": "#eee",
                lineWidth: 0,
                minFatFingerCompensation: -10,
                showUndoButton: !1,
                readOnly: !1,
                data: [],
                signatureLine: !1
            };
        $.extend(e, q(g));
        b && $.extend(e, b);
        this.settings = e;
        for (var f in d) d.hasOwnProperty(f) && d[f].call(this, f);
        this.events.publish("jSignature.initializing");
        this.$controlbarUpper = $('<div style="padding:0 !important; margin:0 !important;width: 100% !important; height: 0 !important; -ms-touch-action: none; touch-action: none;margin-top:-1em !important; margin-bottom:1em !important;"></div>').appendTo(g);
        this.isCanvasEmulator = !1;
        b = this.canvas = this.initializeCanvas(e);
        d = $(b);
        this.$controlbarLower = $('<div style="padding:0 !important; margin:0 !important;width: 100% !important; height: 0 !important; -ms-touch-action: none; touch-action: none;margin-top:-1.5em !important; margin-bottom:1.5em !important; position: relative;"></div>').appendTo(g);
        this.canvasContext = b.getContext("2d");
        d.data("jSignature.this", this);
        e.lineWidth = function (a, b) {
            return a ? a : Math.max(Math.round(b / 400), 2)
        }(e.lineWidth, b.width);
        this.lineCurveThreshold = 3 * e.lineWidth;
        e.cssclass && "" != $.trim(e.cssclass) && d.addClass(e.cssclass);
        this.fatFingerCompensation = 0;
        g = function (a) {
            var b, d, c = function (c) {
                c = c.changedTouches && 0 < c.changedTouches.length ? c.changedTouches[0] : c;
                return new h(Math.round(c.pageX + b), Math.round(c.pageY + d) + a.fatFingerCompensation)
            },
                g = new w(750, function () {
                    a.dataEngine.endStroke()
                });
            this.drawEndHandler = function (b) {
                if (!a.settings.readOnly) {
                    try {
                        b.preventDefault()
                    } catch (B) { }
                    g.clear();
                    a.dataEngine.endStroke()
                }
            };
            this.drawStartHandler = function (e) {
                if (!a.settings.readOnly) {
                    e.preventDefault();
                    var n = $(a.canvas).offset();
                    b = -1 * n.left;
                    d = -1 * n.top;
                    a.dataEngine.startStroke(c(e));
                    g.kick()
                }
            };
            this.drawMoveHandler = function (b) {
                a.settings.readOnly || (b.preventDefault(), a.dataEngine.inStroke && (a.dataEngine.addToStroke(c(b)), g.kick()))
            };
            return this
        }.call({}, this);
        (function (a, b, d) {
            var c = this.canvas,
                g =
                $(c);
            this.isCanvasEmulator ? (g.bind("mousemove.jSignature", d), g.bind("mouseup.jSignature", a), g.bind("mousedown.jSignature", b)) : (c.ontouchstart = function (g) {
                c.onmousedown = c.onmouseup = c.onmousemove = void 0;
                this.fatFingerCompensation = e.minFatFingerCompensation && -3 * e.lineWidth > e.minFatFingerCompensation ? -3 * e.lineWidth : e.minFatFingerCompensation;
                b(g);
                c.ontouchend = a;
                c.ontouchstart = b;
                c.ontouchmove = d
            }, c.onmousedown = function (g) {
                c.ontouchstart = c.ontouchend = c.ontouchmove = void 0;
                b(g);
                c.onmousedown = b;
                c.onmouseup =
                    a;
                c.onmousemove = d
            }, window.navigator.msPointerEnabled && (c.onmspointerdown = b, c.onmspointerup = a, c.onmspointermove = d))
        }).call(this, g.drawEndHandler, g.drawStartHandler, g.drawMoveHandler);
        a["jSignature.windowmouseup"] = c.subscribe("jSignature.windowmouseup", g.drawEndHandler);
        this.events.publish("jSignature.attachingEventHandlers");
        m.call(this, this, e.width.toString(10), "jSignature", c);
        this.resetCanvas(e.data);
        this.events.publish("jSignature.initialized");
        return this
    }

    function y(a) {
        if (a.getContext) return !1;
        var b = a.ownerDocument.parentWindow,
            d = b.FlashCanvas ? a.ownerDocument.parentWindow.FlashCanvas : "undefined" === typeof FlashCanvas ? void 0 : FlashCanvas;
        if (d) {
            a = d.initElement(a);
            d = 1;
            b && b.screen && b.screen.deviceXDPI && b.screen.logicalXDPI && (d = 1 * b.screen.deviceXDPI / b.screen.logicalXDPI);
            if (1 !== d) try {
                $(a).children("object").get(0).resize(Math.ceil(a.width * d), Math.ceil(a.height * d)), a.getContext("2d").scale(d, d)
            } catch (g) { }
            return !0
        }
        throw Error("Canvas element does not support 2d context. jSignature cannot proceed.");
    }
    var w = function (a, b) {
        var d;
        this.kick = function () {
            clearTimeout(d);
            d = setTimeout(b, a)
        };
        this.clear = function () {
            clearTimeout(d)
        };
        return this
    },
        v = function (a) {
            this.topics = {};
            this.context = a ? a : this;
            this.publish = function (a, d, g, c) {
                if (this.topics[a]) {
                    var b = this.topics[a],
                        e = Array.prototype.slice.call(arguments, 1),
                        f = [],
                        h = [],
                        u;
                    var k = 0;
                    for (u = b.length; k < u; k++) {
                        var t = b[k];
                        var C = t[0];
                        t[1] && (t[0] = function () { }, f.push(k));
                        h.push(C)
                    }
                    k = 0;
                    for (u = f.length; k < u; k++) b.splice(f[k], 1);
                    k = 0;
                    for (u = h.length; k < u; k++) h[k].apply(this.context,
                        e)
                }
            };
            this.subscribe = function (a, d, g) {
                this.topics[a] ? this.topics[a].push([d, g]) : this.topics[a] = [
                    [d, g]
                ];
                return {
                    topic: a,
                    callback: d
                }
            };
            this.unsubscribe = function (a) {
                if (this.topics[a.topic])
                    for (var b = this.topics[a.topic], g = 0, c = b.length; g < c; g++) b[g] && b[g][0] === a.callback && b.splice(g, 1)
            }
        },
        z = function (a, b, d, g, c) {
            a.beginPath();
            a.moveTo(b, d);
            a.lineTo(g, c);
            a.closePath();
            a.stroke()
        },
        r = function (a) {
            var b = this.canvasContext,
                d = a.x[0];
            a = a.y[0];
            var g = this.settings.lineWidth,
                c = b.fillStyle;
            b.fillStyle = b.strokeStyle;
            b.fillRect(d +
                g / -2, a + g / -2, g, g);
            b.fillStyle = c
        },
        f = function (a, b) {
            var d = new h(a.x[b - 1], a.y[b - 1]),
                g = new h(a.x[b], a.y[b]),
                c = d.getVectorToPoint(g);
            if (1 < b) {
                var e = new h(a.x[b - 2], a.y[b - 2]),
                    f = e.getVectorToPoint(d);
                if (f.getLength() > this.lineCurveThreshold) {
                    var l = 2 < b ? (new h(a.x[b - 3], a.y[b - 3])).getVectorToPoint(e) : new k(0, 0);
                    var m = .35 * f.getLength(),
                        u = f.angleTo(l.reverse()),
                        p = c.angleTo(f.reverse());
                    l = (new k(l.x + f.x, l.y + f.y)).resizeTo(Math.max(.05, u) * m);
                    var t = (new k(f.x + c.x, f.y + c.y)).reverse().resizeTo(Math.max(.05, p) * m),
                        f = this.canvasContext,
                        m = e.x,
                        p = e.y,
                        u = d.x,
                        C = d.y,
                        B = e.x + l.x,
                        e = e.y + l.y;
                    l = d.x + t.x;
                    t = d.y + t.y;
                    f.beginPath();
                    f.moveTo(m, p);
                    f.bezierCurveTo(B, e, l, t, u, C);
                    f.closePath();
                    f.stroke()
                }
            }
            c.getLength() <= this.lineCurveThreshold && z(this.canvasContext, d.x, d.y, g.x, g.y)
        },
        e = function (a) {
            var b = a.x.length - 1;
            if (0 < b) {
                var d = new h(a.x[b], a.y[b]),
                    e = new h(a.x[b - 1], a.y[b - 1]),
                    c = e.getVectorToPoint(d);
                if (c.getLength() > this.lineCurveThreshold)
                    if (1 < b) {
                        a = (new h(a.x[b - 2], a.y[b - 2])).getVectorToPoint(e);
                        var f = (new k(a.x + c.x, a.y + c.y)).resizeTo(c.getLength() / 2),
                            c =
                            this.canvasContext;
                        a = e.x;
                        var b = e.y,
                            D = d.x,
                            l = d.y,
                            m = e.x + f.x,
                            e = e.y + f.y,
                            f = d.x,
                            d = d.y;
                        c.beginPath();
                        c.moveTo(a, b);
                        c.bezierCurveTo(m, e, f, d, D, l);
                        c.closePath();
                        c.stroke()
                    } else z(this.canvasContext, e.x, e.y, d.x, d.y)
            }
        };
    x.prototype.resetCanvas = function (a, b) {
        var d = this.canvas,
            g = this.settings,
            c = this.canvasContext,
            n = this.isCanvasEmulator,
            h = d.width,
            l = d.height;
        b || c.clearRect(0, 0, h + 30, l + 30);
        c.shadowColor = c.fillStyle = g["background-color"];
        n && c.fillRect(0, 0, h + 30, l + 30);
        c.lineWidth = Math.ceil(parseInt(g.lineWidth, 10));
        c.lineCap =
            c.lineJoin = "round";
        if (g.signatureLine) {
            if (null != g["decor-color"]) {
                c.strokeStyle = g["decor-color"];
                c.shadowOffsetX = 0;
                c.shadowOffsetY = 0;
                var k = Math.round(l / 5);
                z(c, 1.5 * k, l - k, h - 1.5 * k, l - k)
            }
            n || (c.shadowColor = c.strokeStyle, c.shadowOffsetX = .5 * c.lineWidth, c.shadowOffsetY = -.6 * c.lineWidth, c.shadowBlur = 0)
        }
        c.strokeStyle = g.color;
        a || (a = []);
        c = this.dataEngine = new p(a, this, r, f, e);
        g.data = a;
        $(d).data("jSignature.data", a).data("jSignature.settings", g);
        c.changed = function (a, b, d) {
            return function () {
                b.publish(d + ".change");
                a.trigger("change")
            }
        }(this.$parent,
            this.events, "jSignature");
        c.changed();
        return !0
    };
    x.prototype.initializeCanvas = function (a) {
        var b = document.createElement("canvas"),
            d = $(b);
        a.width === a.height && "ratio" === a.height && (a.width = "100%");
        d.css({
            margin: 0,
            padding: 0,
            border: "none",
            height: "ratio" !== a.height && a.height ? a.height.toString(10) : 1,
            width: "ratio" !== a.width && a.width ? a.width.toString(10) : 1,
            "-ms-touch-action": "none",
            "touch-action": "none",
            "background-color": a["background-color"]
        });
        d.appendTo(this.$parent);
        "ratio" === a.height ? d.css("height", Math.round(d.width() /
            a.sizeRatio)) : "ratio" === a.width && d.css("width", Math.round(d.height() * a.sizeRatio));
        d.addClass("jSignature");
        b.width = d.width();
        b.height = d.height();
        this.isCanvasEmulator = y(b);
        b.onselectstart = function (a) {
            a && a.preventDefault && a.preventDefault();
            a && a.stopPropagation && a.stopPropagation();
            return !1
        };
        return b
    };
    (function (a) {
        function b(a, b, d) {
            var c = new Image,
                e = this;
            c.onload = function () {
                var a = e.getContext("2d"),
                    b = a.shadowColor;
                a.shadowColor = "transparent";
                a.drawImage(c, 0, 0, c.width < e.width ? c.width : e.width, c.height <
                    e.height ? c.height : e.height);
                a.shadowColor = b
            };
            c.src = "data:" + b + "," + a
        }

        function d(a, b) {
            this.find("canvas.jSignature").add(this.filter("canvas.jSignature")).data("jSignature.this").resetCanvas(a, b);
            return this
        }

        function e(a, b) {
            if (void 0 === b && "string" === typeof a && "data:" === a.substr(0, 5) && (b = a.slice(5).split(",")[0], a = a.slice(6 + b.length), b === a)) return;
            var c = this.find("canvas.jSignature").add(this.filter("canvas.jSignature"));
            if (l.hasOwnProperty(b)) 0 !== c.length && l[b].call(c[0], a, b, function (a) {
                return function () {
                    return a.resetCanvas.apply(a,
                        arguments)
                }
            }(c.data("jSignature.this")));
            else throw Error("jSignature is unable to find import plugin with for format '" + String(b) + "'");
            return this
        }
        var c = new v;
        (function (a, b, c, d) {
            var e, g = function () {
                //a.publish(b + ".parentresized")
            };
            c(d).bind("resize." + b, function () {
                e && clearTimeout(e);
                e = setTimeout(g, 500)
            }).bind("mouseup." + b, function (c) {
                a.publish(b + ".windowmouseup")
            })
        })(c, "jSignature", $, a);
        var f = {},
            h = {
                "default": function (a) {
                    return this.toDataURL()
                },
                "native": function (a) {
                    return a
                },
                image: function (a) {
                    a = this.toDataURL();
                    if ("string" === typeof a && 4 < a.length && "data:" === a.slice(0, 5) && -1 !== a.indexOf(",")) {
                        var b = a.indexOf(",");
                        return [a.slice(5, b), a.substr(b + 1)]
                    }
                    return []
                }
            },
            l = {
                "native": function (a, b, c) {
                    c(a)
                },
                image: b,
                "image/png;base64": b,
                "image/jpeg;base64": b,
                "image/jpg;base64": b
            },
            k = function (a) {
                var b = !1;
                for (a = a.parentNode; a && !b;) b = a.body, a = a.parentNode;
                return !b
            },
            m = {
                "export": h,
                "import": l,
                instance: f
            },
            p = {
                init: function (a) {
                    return this.each(function () {
                        k(this) || new x(this, a, f)
                    })
                },
                destroy: function () {
                    return this.each(function () {
                        if (!k(this)) {
                            var a =
                                $(this).find("canvas").data("jSignature.this");
                            if (a) {
                                a.$controlbarLower.remove();
                                a.$controlbarUpper.remove();
                                $(a.canvas).remove();
                                for (var b in a.eventTokens) a.eventTokens.hasOwnProperty(b) && c.unsubscribe(a.eventTokens[b])
                            }
                        }
                    })
                },
                getSettings: function () {
                    return this.find("canvas.jSignature").add(this.filter("canvas.jSignature")).data("jSignature.this").settings
                },
                isModified: function () {
                    return null !== this.find("canvas.jSignature").add(this.filter("canvas.jSignature")).data("jSignature.this").dataEngine._stroke
                },
                updateSetting: function (a, b, c) {
                    var d = this.find("canvas.jSignature").add(this.filter("canvas.jSignature")).data("jSignature.this");
                    d.settings[a] = b;
                    d.resetCanvas(c ? null : d.settings.data, !0);
                    return d.settings[a]
                },
                clear: d,
                reset: d,
                addPlugin: function (a, b, c) {
                    m.hasOwnProperty(a) && (m[a][b] = c);
                    return this
                },
                listPlugins: function (a) {
                    var b = [];
                    if (m.hasOwnProperty(a)) {
                        a = m[a];
                        for (var c in a) a.hasOwnProperty(c) && b.push(c)
                    }
                    return b
                },
                getData: function (a) {
                    var b = this.find("canvas.jSignature").add(this.filter("canvas.jSignature"));
                    void 0 === a && (a = "default");
                    if (0 !== b.length && h.hasOwnProperty(a)) return h[a].call(b.get(0), b.data("jSignature.data"), b.data("jSignature.settings"))
                },
                importData: e,
                setData: e,
                globalEvents: function () {
                    return c
                },
                disable: function () {
                    this.find("input").attr("disabled", 1);
                    this.find("canvas.jSignature").addClass("disabled").data("jSignature.this").settings.readOnly = !0
                },
                enable: function () {
                    this.find("input").removeAttr("disabled");
                    this.find("canvas.jSignature").removeClass("disabled").data("jSignature.this").settings.readOnly = !1
                },
                events: function () {
                    return this.find("canvas.jSignature").add(this.filter("canvas.jSignature")).data("jSignature.this").events
                }
            };
        $.fn.jSignature = function (a) {
            if (a && "object" !== typeof a) {
                if ("string" === typeof a && p[a]) return p[a].apply(this, Array.prototype.slice.call(arguments, 1));
                $.error("Method " + String(a) + " does not exist on jQuery.jSignature")
            } else return p.init.apply(this, arguments)
        }
    })(window)
})();

(function () {
    function q(k, h, p) {
        k = k.call(this);
        (function (h, k, p) {
            h.events.subscribe(p + ".change", function () {
                h.dataEngine.data.length ? k.show() : k.hide()
            })
        })(this, k, h);
        (function (h, k, p) {
            var m = p + ".undo";
            k.bind("click", function () {
                h.events.publish(m)
            });
            h.events.subscribe(m, function () {
                var k = h.dataEngine.data;
                k.length && (k.pop(), h.resetCanvas(k))
            })
        })(this, k, this.events.topics.hasOwnProperty(h + ".undo") ? p : h)
    }
    $.fn.jSignature("addPlugin", "instance", "UndoButton", function (k) {
        this.events.subscribe("jSignature.attachingEventHandlers",
            function () {
                if (this.settings[k]) {
                    var h = this.settings[k];
                    "function" !== typeof h && (h = function () {
                        var h = $('<input type="button" value="Undo last stroke" style="position:absolute;display:none;margin:0 !important;top:auto" />').appendTo(this.$controlbarLower),
                            k = h.width();
                        h.css("left", Math.round((this.canvas.width - k) / 2));
                        k !== h.width() && h.width(k);
                        return h
                    });
                    q.call(this, h, "jSignature", k)
                }
            })
    })
})();
(function () {
    for (var q = {}, k = {}, h = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWX".split(""), p = h.length / 2, m = p - 1; -1 < m; m--) q[h[m]] = h[m + p], k[h[m + p]] = h[m];
    var x = function (e) {
        e = e.split("");
        for (var a = e.length, b = 1; b < a; b++) e[b] = q[e[b]];
        return e.join("")
    },
        y = function (e) {
            for (var a = [], b = 0, d = 1, g = e.length, c, f, h = 0; h < g; h++) c = Math.round(e[h]), f = c - b, b = c, 0 > f && 0 < d ? (d = -1, a.push("Z")) : 0 < f && 0 > d && (d = 1, a.push("Y")), c = Math.abs(f), c >= p ? a.push(x(c.toString(p))) : a.push(c.toString(p));
            return a.join("")
        },
        w = function (e) {
            var a = [];
            e = e.split("");
            for (var b = e.length, d, g = 1, c = [], f = 0, h = 0; h < b; h++) d = e[h], d in q || "Z" === d || "Y" === d ? (0 !== c.length && (c = parseInt(c.join(""), p) * g + f, a.push(c), f = c), "Z" === d ? (g = -1, c = []) : "Y" === d ? (g = 1, c = []) : c = [d]) : c.push(k[d]);
            a.push(parseInt(c.join(""), p) * g + f);
            return a
        },
        v = function (e) {
            for (var a = [], b = e.length, d, g = 0; g < b; g++) d = e[g], a.push(y(d.x)), a.push(y(d.y));
            return a.join("_")
        },
        z = function (e) {
            var a = [];
            e = e.split("_");
            for (var b = e.length / 2, d = 0; d < b; d++) a.push({
                x: w(e[2 * d]),
                y: w(e[2 * d + 1])
            });
            return a
        },
        r = function (e) {
            return ["image/jsignature;base30",
                v(e)
            ]
        },
        f = function (e, a, b) {
            "string" === typeof e && ("image/jsignature;base30" === e.substring(0, 23).toLowerCase() && (e = e.substring(24)), b(z(e)))
        };
    if (null == this.jQuery) throw Error("We need jQuery for some of the functionality. jQuery is not detected. Failing to initialize...");
    (function (e) {
        e = e.fn.jSignature;
        e("addPlugin", "export", "base30", r);
        e("addPlugin", "export", "image/jsignature;base30", r);
        e("addPlugin", "import", "base30", f);
        e("addPlugin", "import", "image/jsignature;base30", f)
    })(this.jQuery);
    this.jSignatureDebug &&
        (this.jSignatureDebug.base30 = {
            remapTailChars: x,
            compressstrokeleg: y,
            uncompressstrokeleg: w,
            compressstrokes: v,
            uncompressstrokes: z,
            charmap: q
        })
}).call("undefined" !== typeof window ? window : this);
(function () {
    function q(f, e) {
        this.x = f;
        this.y = e;
        this.reverse = function () {
            return new this.constructor(-1 * this.x, -1 * this.y)
        };
        this._length = null;
        this.getLength = function () {
            this._length || (this._length = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)));
            return this._length
        };
        var a = function (a) {
            return Math.round(a / Math.abs(a))
        };
        this.resizeTo = function (b) {
            if (0 === this.x && 0 === this.y) this._length = 0;
            else if (0 === this.x) this._length = b, this.y = b * a(this.y);
            else if (0 === this.y) this._length = b, this.x = b * a(this.x);
            else {
                var d = Math.abs(this.y /
                        this.x),
                    e = Math.sqrt(Math.pow(b, 2) / (1 + Math.pow(d, 2))),
                    d = d * e;
                this._length = b;
                this.x = e * a(this.x);
                this.y = d * a(this.y)
            }
            return this
        };
        this.angleTo = function (a) {
            var b = this.getLength() * a.getLength();
            return 0 === b ? 0 : Math.acos(Math.min(Math.max((this.x * a.x + this.y * a.y) / b, -1), 1)) / Math.PI
        }
    }

    function k(f, e) {
        this.x = f;
        this.y = e;
        this.getVectorToCoordinates = function (a, b) {
            return new q(a - this.x, b - this.y)
        };
        this.getVectorFromCoordinates = function (a, b) {
            return this.getVectorToCoordinates(a, b).reverse()
        };
        this.getVectorToPoint = function (a) {
            return new q(a.x -
                this.x, a.y - this.y)
        };
        this.getVectorFromPoint = function (a) {
            return this.getVectorToPoint(a).reverse()
        }
    }

    function h(f, e) {
        var a = Math.pow(10, e);
        return Math.round(f * a) / a
    }

    function p(f, e, a) {
        e += 1;
        var b = new k(f.x[e - 1], f.y[e - 1]),
            d = new k(f.x[e], f.y[e]),
            d = b.getVectorToPoint(d),
            g = new k(f.x[e - 2], f.y[e - 2]),
            b = g.getVectorToPoint(b);
        return b.getLength() > a ? (a = 2 < e ? (new k(f.x[e - 3], f.y[e - 3])).getVectorToPoint(g) : new q(0, 0), f = .35 * b.getLength(), g = b.angleTo(a.reverse()), e = d.angleTo(b.reverse()), a = (new q(a.x + b.x, a.y + b.y)).resizeTo(Math.max(.05,
            g) * f), d = (new q(b.x + d.x, b.y + d.y)).reverse().resizeTo(Math.max(.05, e) * f), d = new q(b.x + d.x, b.y + d.y), ["c", h(a.x, 2), h(a.y, 2), h(d.x, 2), h(d.y, 2), h(b.x, 2), h(b.y, 2)]) : ["l", h(b.x, 2), h(b.y, 2)]
    }

    function m(f, e) {
        var a = f.x.length - 1,
            b = new k(f.x[a], f.y[a]),
            d = new k(f.x[a - 1], f.y[a - 1]),
            b = d.getVectorToPoint(b);
        if (1 < a && b.getLength() > e) {
            var a = (new k(f.x[a - 2], f.y[a - 2])).getVectorToPoint(d),
                d = b.angleTo(a.reverse()),
                g = .35 * b.getLength(),
                a = (new q(a.x + b.x, a.y + b.y)).resizeTo(Math.max(.05, d) * g);
            return ["c", h(a.x, 2), h(a.y, 2), h(b.x,
                2), h(b.y, 2), h(b.x, 2), h(b.y, 2)]
        }
        return ["l", h(b.x, 2), h(b.y, 2)]
    }

    function x(f, e, a) {
        e = ["M", h(f.x[0] - e, 2), h(f.y[0] - a, 2)];
        a = 1;
        for (var b = f.x.length - 1; a < b; a++) e.push.apply(e, p(f, a, 1));
        0 < b ? e.push.apply(e, m(f, a, 1)) : 0 === b && e.push.apply(e, ["l", 1, 1]);
        return e.join(" ")
    }

    function y(f) {
        for (var e = [], a = [
                ["fill", void 0, "none"],
                ["stroke", "color", "#000000"],
                ["stroke-width", "lineWidth", 2],
                ["stroke-linecap", void 0, "round"],
                ["stroke-linejoin", void 0, "round"]
        ], b = a.length - 1; 0 <= b; b--) {
            var d = a[b][1],
                g = a[b][2];
            e.push(a[b][0] +
                '="' + (d in f && f[d] ? f[d] : g) + '"')
        }
        return e.join(" ")
    }

    function w(f, e) {
        var a = ['<?xml version="1.0" encoding="UTF-8" standalone="no"?>', '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">'],
            b, d = f.length,
            g, c = [],
            h = [],
            k = g = b = 0,
            l = 0,
            p = [];
        if (0 !== d) {
            for (b = 0; b < d; b++) {
                g = f[b];
                for (var m = [], q = {
                    x: [],
                    y: []
                }, l = 0, k = g.x.length; l < k; l++) m.push({
                    x: g.x[l],
                    y: g.y[l]
                });
                m = simplify(m, .7, !0);
                l = 0;
                for (k = m.length; l < k; l++) q.x.push(m[l].x), q.y.push(m[l].y);
                g = q;
                p.push(g);
                c = c.concat(g.x);
                h =
                    h.concat(g.y)
            }
            d = Math.min.apply(null, c) - 1;
            b = Math.max.apply(null, c) + 1;
            c = Math.min.apply(null, h) - 1;
            h = Math.max.apply(null, h) + 1;
            k = 0 > d ? 0 : d;
            l = 0 > c ? 0 : c;
            b -= d;
            g = h - c
        }
        a.push('<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="' + b.toString() + '" height="' + g.toString() + '">');
        b = 0;
        for (d = p.length; b < d; b++) g = p[b], a.push("<path " + y(e) + ' d="' + x(g, k, l) + '"/>');
        a.push("</svg>");
        return a.join("")
    }

    function v(f, e) {
        return ["image/svg+xml", w(f, e)]
    }

    function z(f, e) {
        return ["image/svg+xml;base64", r(w(f, e))]
    }
    var r;
    (function (f,
        e) {
        "use strict";
        f.simplify = function (a, b, d) {
            b = b !== e ? b * b : 1;
            if (!d) {
                var g = a.length,
                    c = a[0],
                    f = [c];
                for (d = 1; d < g; d++) {
                    var h = a[d];
                    var k = h.x - c.x,
                        m = h.y - c.y;
                    k * k + m * m > b && (f.push(h), c = h)
                }
                a = (c !== h && f.push(h), f)
            }
            h = a;
            d = h.length;
            var g = new (typeof Uint8Array != e + "" ? Uint8Array : Array)(d),
                c = 0,
                f = d - 1,
                p, q = [],
                t = [],
                z = [];
            for (g[c] = g[f] = 1; f;) {
                m = 0;
                for (k = c + 1; k < f; k++) {
                    var B = h[k];
                    var A = h[c],
                        x = h[f],
                        v = A.x,
                        w = A.y,
                        A = x.x - v,
                        r = x.y - w;
                    if (0 !== A || 0 !== r) {
                        var y = ((B.x - v) * A + (B.y - w) * r) / (A * A + r * r);
                        1 < y ? (v = x.x, w = x.y) : 0 < y && (v += A * y, w += r * y)
                    }
                    B = (A = B.x - v, r = B.y -
                        w, A * A + r * r);
                    B > m && (p = k, m = B)
                }
                m > b && (g[p] = 1, q.push(c), t.push(p), q.push(p), t.push(f));
                c = q.pop();
                f = t.pop()
            }
            for (k = 0; k < d; k++) g[k] && z.push(h[k]);
            return a = z, a
        }
    })(window);
    "function" !== typeof r && (r = function (f) {
        var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".split(""),
            a = 0,
            b = 0,
            d = [];
        do {
            var g = f.charCodeAt(a++);
            var c = f.charCodeAt(a++);
            var h = f.charCodeAt(a++);
            var k = g << 16 | c << 8 | h;
            g = k >> 18 & 63;
            c = k >> 12 & 63;
            h = k >> 6 & 63;
            k &= 63;
            d[b++] = e[g] + e[c] + e[h] + e[k]
        } while (a < f.length);
        e = d.join("");
        f = f.length % 3;
        return (f ?
            e.slice(0, f - 3) : e) + "===".slice(f || 3)
    });
    if ("undefined" === typeof $) throw Error("We need jQuery for some of the functionality. jQuery is not detected. Failing to initialize...");
    (function (f) {
        f = f.fn.jSignature;
        f("addPlugin", "export", "svg", v);
        f("addPlugin", "export", "image/svg+xml", v);
        f("addPlugin", "export", "svgbase64", z);
        f("addPlugin", "export", "image/svg+xml;base64", z)
    })($)
})();