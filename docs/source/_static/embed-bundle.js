/*! For license information please see embed-bundle.js.LICENSE.txt */
define('ipylgbst', ['@jupyter-widgets/base'], t =>
  (() => {
    var e = {
        889: (t, e, n) => {
          (e = n(352)(!1)).push([
            t.id,
            '.custom-widget {\n  \n}\n\n\n\n.custom-widget  {\n  display: grid;\n  grid-template-columns: 200px 200px 200px 200px;\n  grid-gap: 10px;\n  background-color: #fff;\n  color: #444;\n  background-color: white;\n  padding: 0px 2px;\n}\n\n.box {\n  background-color: #444;\n  color: #fff;\n  border-radius: 5px;\n  padding: 20px;\n  font-size: 100%;\n}\n\n.error-box {\n  background-color: #ffffff;\n  color: #000000;\n  border-radius: 5px;\n  padding: 20px;\n  font-size: 100%;\n}\n',
            ''
          ]),
            (t.exports = e);
        },
        155: (t, e) => {
          'use strict';
          (e.byteLength = function (t) {
            var e = u(t),
              n = e[0],
              r = e[1];
            return (3 * (n + r)) / 4 - r;
          }),
            (e.toByteArray = function (t) {
              var e,
                n,
                i = u(t),
                s = i[0],
                c = i[1],
                a = new o(
                  (function (t, e, n) {
                    return (3 * (e + n)) / 4 - n;
                  })(0, s, c)
                ),
                l = 0,
                h = c > 0 ? s - 4 : s;
              for (n = 0; n < h; n += 4)
                (e =
                  (r[t.charCodeAt(n)] << 18) |
                  (r[t.charCodeAt(n + 1)] << 12) |
                  (r[t.charCodeAt(n + 2)] << 6) |
                  r[t.charCodeAt(n + 3)]),
                  (a[l++] = (e >> 16) & 255),
                  (a[l++] = (e >> 8) & 255),
                  (a[l++] = 255 & e);
              return (
                2 === c &&
                  ((e =
                    (r[t.charCodeAt(n)] << 2) | (r[t.charCodeAt(n + 1)] >> 4)),
                  (a[l++] = 255 & e)),
                1 === c &&
                  ((e =
                    (r[t.charCodeAt(n)] << 10) |
                    (r[t.charCodeAt(n + 1)] << 4) |
                    (r[t.charCodeAt(n + 2)] >> 2)),
                  (a[l++] = (e >> 8) & 255),
                  (a[l++] = 255 & e)),
                a
              );
            }),
            (e.fromByteArray = function (t) {
              for (
                var e,
                  r = t.length,
                  o = r % 3,
                  i = [],
                  s = 16383,
                  u = 0,
                  a = r - o;
                u < a;
                u += s
              )
                i.push(c(t, u, u + s > a ? a : u + s));
              return (
                1 === o
                  ? ((e = t[r - 1]),
                    i.push(n[e >> 2] + n[(e << 4) & 63] + '=='))
                  : 2 === o &&
                    ((e = (t[r - 2] << 8) + t[r - 1]),
                    i.push(
                      n[e >> 10] + n[(e >> 4) & 63] + n[(e << 2) & 63] + '='
                    )),
                i.join('')
              );
            });
          for (
            var n = [],
              r = [],
              o = 'undefined' != typeof Uint8Array ? Uint8Array : Array,
              i =
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
              s = 0;
            s < 64;
            ++s
          )
            (n[s] = i[s]), (r[i.charCodeAt(s)] = s);
          function u(t) {
            var e = t.length;
            if (e % 4 > 0)
              throw new Error('Invalid string. Length must be a multiple of 4');
            var n = t.indexOf('=');
            return -1 === n && (n = e), [n, n === e ? 0 : 4 - (n % 4)];
          }
          function c(t, e, r) {
            for (var o, i, s = [], u = e; u < r; u += 3)
              (o =
                ((t[u] << 16) & 16711680) +
                ((t[u + 1] << 8) & 65280) +
                (255 & t[u + 2])),
                s.push(
                  n[((i = o) >> 18) & 63] +
                    n[(i >> 12) & 63] +
                    n[(i >> 6) & 63] +
                    n[63 & i]
                );
            return s.join('');
          }
          (r['-'.charCodeAt(0)] = 62), (r['_'.charCodeAt(0)] = 63);
        },
        352: t => {
          'use strict';
          t.exports = function (t) {
            var e = [];
            return (
              (e.toString = function () {
                return this.map(function (e) {
                  var n = (function (t, e) {
                    var n,
                      r,
                      o,
                      i = t[1] || '',
                      s = t[3];
                    if (!s) return i;
                    if (e && 'function' == typeof btoa) {
                      var u =
                          ((n = s),
                          (r = btoa(
                            unescape(encodeURIComponent(JSON.stringify(n)))
                          )),
                          (o =
                            'sourceMappingURL=data:application/json;charset=utf-8;base64,'.concat(
                              r
                            )),
                          '/*# '.concat(o, ' */')),
                        c = s.sources.map(function (t) {
                          return '/*# sourceURL='
                            .concat(s.sourceRoot || '')
                            .concat(t, ' */');
                        });
                      return [i].concat(c).concat([u]).join('\n');
                    }
                    return [i].join('\n');
                  })(e, t);
                  return e[2] ? '@media '.concat(e[2], ' {').concat(n, '}') : n;
                }).join('');
              }),
              (e.i = function (t, n, r) {
                'string' == typeof t && (t = [[null, t, '']]);
                var o = {};
                if (r)
                  for (var i = 0; i < this.length; i++) {
                    var s = this[i][0];
                    null != s && (o[s] = !0);
                  }
                for (var u = 0; u < t.length; u++) {
                  var c = [].concat(t[u]);
                  (r && o[c[0]]) ||
                    (n &&
                      (c[2]
                        ? (c[2] = ''.concat(n, ' and ').concat(c[2]))
                        : (c[2] = n)),
                    e.push(c));
                }
              }),
              e
            );
          };
        },
        525: (t, e) => {
          (e.read = function (t, e, n, r, o) {
            var i,
              s,
              u = 8 * o - r - 1,
              c = (1 << u) - 1,
              a = c >> 1,
              l = -7,
              h = n ? o - 1 : 0,
              f = n ? -1 : 1,
              p = t[e + h];
            for (
              h += f, i = p & ((1 << -l) - 1), p >>= -l, l += u;
              l > 0;
              i = 256 * i + t[e + h], h += f, l -= 8
            );
            for (
              s = i & ((1 << -l) - 1), i >>= -l, l += r;
              l > 0;
              s = 256 * s + t[e + h], h += f, l -= 8
            );
            if (0 === i) i = 1 - a;
            else {
              if (i === c) return s ? NaN : (1 / 0) * (p ? -1 : 1);
              (s += Math.pow(2, r)), (i -= a);
            }
            return (p ? -1 : 1) * s * Math.pow(2, i - r);
          }),
            (e.write = function (t, e, n, r, o, i) {
              var s,
                u,
                c,
                a = 8 * i - o - 1,
                l = (1 << a) - 1,
                h = l >> 1,
                f = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                p = r ? 0 : i - 1,
                d = r ? 1 : -1,
                v = e < 0 || (0 === e && 1 / e < 0) ? 1 : 0;
              for (
                e = Math.abs(e),
                  isNaN(e) || e === 1 / 0
                    ? ((u = isNaN(e) ? 1 : 0), (s = l))
                    : ((s = Math.floor(Math.log(e) / Math.LN2)),
                      e * (c = Math.pow(2, -s)) < 1 && (s--, (c *= 2)),
                      (e += s + h >= 1 ? f / c : f * Math.pow(2, 1 - h)) * c >=
                        2 && (s++, (c /= 2)),
                      s + h >= l
                        ? ((u = 0), (s = l))
                        : s + h >= 1
                          ? ((u = (e * c - 1) * Math.pow(2, o)), (s += h))
                          : ((u = e * Math.pow(2, h - 1) * Math.pow(2, o)),
                            (s = 0)));
                o >= 8;
                t[n + p] = 255 & u, p += d, u /= 256, o -= 8
              );
              for (
                s = (s << o) | u, a += o;
                a > 0;
                t[n + p] = 255 & s, p += d, s /= 256, a -= 8
              );
              t[n + p - d] |= 128 * v;
            });
        },
        433: function (t, e, n) {
          'use strict';
          var r =
              (this && this.__assign) ||
              function () {
                return (
                  (r =
                    Object.assign ||
                    function (t) {
                      for (var e, n = 1, r = arguments.length; n < r; n++)
                        for (var o in (e = arguments[n]))
                          Object.prototype.hasOwnProperty.call(e, o) &&
                            (t[o] = e[o]);
                      return t;
                    }),
                  r.apply(this, arguments)
                );
              },
            o =
              (this && this.__awaiter) ||
              function (t, e, n, r) {
                return new (n || (n = Promise))(function (o, i) {
                  function s(t) {
                    try {
                      c(r.next(t));
                    } catch (t) {
                      i(t);
                    }
                  }
                  function u(t) {
                    try {
                      c(r.throw(t));
                    } catch (t) {
                      i(t);
                    }
                  }
                  function c(t) {
                    var e;
                    t.done
                      ? o(t.value)
                      : ((e = t.value),
                        e instanceof n
                          ? e
                          : new n(function (t) {
                              t(e);
                            })).then(s, u);
                  }
                  c((r = r.apply(t, e || [])).next());
                });
              },
            i =
              (this && this.__generator) ||
              function (t, e) {
                var n,
                  r,
                  o,
                  i,
                  s = {
                    label: 0,
                    sent: function () {
                      if (1 & o[0]) throw o[1];
                      return o[1];
                    },
                    trys: [],
                    ops: []
                  };
                return (
                  (i = { next: u(0), throw: u(1), return: u(2) }),
                  'function' == typeof Symbol &&
                    (i[Symbol.iterator] = function () {
                      return this;
                    }),
                  i
                );
                function u(i) {
                  return function (u) {
                    return (function (i) {
                      if (n)
                        throw new TypeError('Generator is already executing.');
                      for (; s; )
                        try {
                          if (
                            ((n = 1),
                            r &&
                              (o =
                                2 & i[0]
                                  ? r.return
                                  : i[0]
                                    ? r.throw ||
                                      ((o = r.return) && o.call(r), 0)
                                    : r.next) &&
                              !(o = o.call(r, i[1])).done)
                          )
                            return o;
                          switch (
                            ((r = 0), o && (i = [2 & i[0], o.value]), i[0])
                          ) {
                            case 0:
                            case 1:
                              o = i;
                              break;
                            case 4:
                              return s.label++, { value: i[1], done: !1 };
                            case 5:
                              s.label++, (r = i[1]), (i = [0]);
                              continue;
                            case 7:
                              (i = s.ops.pop()), s.trys.pop();
                              continue;
                            default:
                              if (
                                !(
                                  (o =
                                    (o = s.trys).length > 0 &&
                                    o[o.length - 1]) ||
                                  (6 !== i[0] && 2 !== i[0])
                                )
                              ) {
                                s = 0;
                                continue;
                              }
                              if (
                                3 === i[0] &&
                                (!o || (i[1] > o[0] && i[1] < o[3]))
                              ) {
                                s.label = i[1];
                                break;
                              }
                              if (6 === i[0] && s.label < o[1]) {
                                (s.label = o[1]), (o = i);
                                break;
                              }
                              if (o && s.label < o[2]) {
                                (s.label = o[2]), s.ops.push(i);
                                break;
                              }
                              o[2] && s.ops.pop(), s.trys.pop();
                              continue;
                          }
                          i = e.call(t, s);
                        } catch (t) {
                          (i = [6, t]), (r = 0);
                        } finally {
                          n = o = 0;
                        }
                      if (5 & i[0]) throw i[1];
                      return { value: i[0] ? i[1] : void 0, done: !0 };
                    })([i, u]);
                  };
                }
              };
          Object.defineProperty(e, '__esModule', { value: !0 }),
            (e.HubControl = void 0);
          var s = n(357),
            u = n(332),
            c = (function () {
              function t(t, e, n) {
                (this.hub = null),
                  (this.device = t),
                  (this.control = e),
                  (this.configuration = n),
                  (this.prevControl = r({}, this.control)),
                  (this.states = {
                    Turn: u.turn,
                    Drive: u.drive,
                    Stop: u.stop,
                    Back: u.back,
                    Manual: s.manual,
                    Seek: u.seek
                  }),
                  (this.currentState = this.states.Manual);
              }
              return (
                (t.prototype.updateConfiguration = function (t) {
                  this.configuration = t;
                }),
                (t.prototype.start = function (t) {
                  return o(this, void 0, void 0, function () {
                    var e = this;
                    return i(this, function (n) {
                      switch (n.label) {
                        case 0:
                          return (
                            (this.hub = t),
                            (this.device.connected = !0),
                            this.hub.emitter.on('error', function (t) {
                              e.device.err = t;
                            }),
                            this.hub.emitter.on('disconnect', function () {
                              e.device.connected = !1;
                            }),
                            this.hub.emitter.on('distance', function (t) {
                              e.device.distance = t;
                            }),
                            this.hub.emitter.on('rssi', function (t) {
                              e.device.rssi = t;
                            }),
                            this.hub.emitter.on('port', function (t) {
                              var n = t.port,
                                r = t.action;
                              e.device.ports[n].action = r;
                            }),
                            this.hub.emitter.on('color', function (t) {
                              e.device.color = t;
                            }),
                            this.hub.emitter.on('tilt', function (t) {
                              var n = t.roll,
                                r = t.pitch;
                              (e.device.tilt.roll = n),
                                (e.device.tilt.pitch = r);
                            }),
                            this.hub.emitter.on('rotation', function (t) {
                              var n = t.port,
                                r = t.angle;
                              e.device.ports[n].angle = r;
                            }),
                            [4, this.hub.ledAsync('red')]
                          );
                        case 1:
                          return n.sent(), [4, this.hub.ledAsync('yellow')];
                        case 2:
                          return n.sent(), [4, this.hub.ledAsync('green')];
                        case 3:
                          return n.sent(), [2];
                      }
                    });
                  });
                }),
                (t.prototype.disconnect = function () {
                  return o(this, void 0, void 0, function () {
                    return i(this, function (t) {
                      switch (t.label) {
                        case 0:
                          return this.device.connected
                            ? [4, this.hub.disconnectAsync()]
                            : [3, 2];
                        case 1:
                          t.sent(), (t.label = 2);
                        case 2:
                          return [2];
                      }
                    });
                  });
                }),
                (t.prototype.setNextState = function (t) {
                  (this.control.controlUpdateTime = void 0),
                    (this.control.state = t),
                    (this.currentState = this.states[t]);
                }),
                (t.prototype.update = function () {
                  this.currentState(this),
                    (this.prevControl = r({}, this.control)),
                    (this.prevControl.tilt = r({}, this.control.tilt)),
                    (this.prevDevice = r({}, this.device));
                }),
                t
              );
            })();
          e.HubControl = c;
        },
        332: (t, e) => {
          'use strict';
          Object.defineProperty(e, '__esModule', { value: !0 }),
            (e.seek = e.turn = e.drive = e.back = e.stop = void 0);
          var n = 59e3;
          (e.seek = function (t) {
            (!t.control.controlUpdateTime ||
              Date.now() - t.control.controlUpdateTime > n) &&
              ((t.control.controlUpdateTime = Date.now()),
              t.hub.motorTimeMulti(60, 30, -10)),
              Date.now() - t.control.controlUpdateTime < 250 ||
                (t.device.distance > t.prevDevice.distance
                  ? ((t.control.turnDirection = 'right'),
                    t.setNextState('Turn'))
                  : ((t.control.turnDirection = 'left'),
                    t.setNextState('Turn')));
          }),
            (e.turn = function (t) {
              if (t.device.distance < 75)
                return (
                  (t.control.turnDirection = null), void t.setNextState('Back')
                );
              if (t.device.distance > 100)
                return (
                  (t.control.turnDirection = null), void t.setNextState('Drive')
                );
              if (
                !t.control.controlUpdateTime ||
                Date.now() - t.control.controlUpdateTime > n
              ) {
                var e = 'right' === t.control.turnDirection ? 30 : -10,
                  r = 'right' === t.control.turnDirection ? -10 : 30;
                (t.control.controlUpdateTime = Date.now()),
                  t.hub.motorTimeMulti(60, e, r);
              }
            }),
            (e.drive = function (t) {
              if (t.device.distance < 75) t.setNextState('Back');
              else if (t.device.distance < 100) t.setNextState('Seek');
              else if (
                !t.control.controlUpdateTime ||
                Date.now() - t.control.controlUpdateTime > n
              ) {
                t.control.controlUpdateTime = Date.now();
                var e = 'A' === t.configuration.leftMotor ? 30 : -30;
                t.hub.motorTimeMulti(60, e, e);
              }
            }),
            (e.back = function (t) {
              if (t.device.distance > 100) t.setNextState('Seek');
              else if (
                !t.control.controlUpdateTime ||
                Date.now() - t.control.controlUpdateTime > n
              ) {
                t.control.controlUpdateTime = Date.now();
                var e = 'A' === t.configuration.leftMotor ? -15 : 15;
                t.hub.motorTimeMulti(60, e, e);
              }
            }),
            (e.stop = function (t) {
              (t.control.speed = 0),
                (t.control.turnAngle = 0),
                (!t.control.controlUpdateTime ||
                  Date.now() - t.control.controlUpdateTime > n) &&
                  ((t.control.controlUpdateTime = Date.now()),
                  t.hub.motorTimeMulti(60, 0, 0));
            });
        },
        357: (t, e) => {
          'use strict';
          Object.defineProperty(e, '__esModule', { value: !0 }),
            (e.manual = void 0),
            (e.manual = function (t) {
              if (
                t.control.speed !== t.prevControl.speed ||
                t.control.turnAngle !== t.prevControl.turnAngle
              ) {
                var e =
                    t.control.speed +
                    (t.control.turnAngle > 0
                      ? Math.abs(t.control.turnAngle)
                      : 0),
                  n =
                    t.control.speed +
                    (t.control.turnAngle < 0
                      ? Math.abs(t.control.turnAngle)
                      : 0);
                e > 100 && ((n -= e - 100), (e = 100)),
                  n > 100 && ((e -= n - 100), (n = 100)),
                  (t.control.motorA = e),
                  (t.control.motorB = n),
                  t.hub.motorTimeMulti(60, e, n);
              }
              t.control.tilt.pitch !== t.prevControl.tilt.pitch &&
                t.hub.motorTime('C', 60, t.control.tilt.pitch),
                t.control.tilt.roll !== t.prevControl.tilt.roll &&
                  t.hub.motorTime('D', 60, t.control.tilt.roll);
            });
        },
        443: function (t, e) {
          'use strict';
          var n =
              (this && this.__awaiter) ||
              function (t, e, n, r) {
                return new (n || (n = Promise))(function (o, i) {
                  function s(t) {
                    try {
                      c(r.next(t));
                    } catch (t) {
                      i(t);
                    }
                  }
                  function u(t) {
                    try {
                      c(r.throw(t));
                    } catch (t) {
                      i(t);
                    }
                  }
                  function c(t) {
                    var e;
                    t.done
                      ? o(t.value)
                      : ((e = t.value),
                        e instanceof n
                          ? e
                          : new n(function (t) {
                              t(e);
                            })).then(s, u);
                  }
                  c((r = r.apply(t, e || [])).next());
                });
              },
            r =
              (this && this.__generator) ||
              function (t, e) {
                var n,
                  r,
                  o,
                  i,
                  s = {
                    label: 0,
                    sent: function () {
                      if (1 & o[0]) throw o[1];
                      return o[1];
                    },
                    trys: [],
                    ops: []
                  };
                return (
                  (i = { next: u(0), throw: u(1), return: u(2) }),
                  'function' == typeof Symbol &&
                    (i[Symbol.iterator] = function () {
                      return this;
                    }),
                  i
                );
                function u(i) {
                  return function (u) {
                    return (function (i) {
                      if (n)
                        throw new TypeError('Generator is already executing.');
                      for (; s; )
                        try {
                          if (
                            ((n = 1),
                            r &&
                              (o =
                                2 & i[0]
                                  ? r.return
                                  : i[0]
                                    ? r.throw ||
                                      ((o = r.return) && o.call(r), 0)
                                    : r.next) &&
                              !(o = o.call(r, i[1])).done)
                          )
                            return o;
                          switch (
                            ((r = 0), o && (i = [2 & i[0], o.value]), i[0])
                          ) {
                            case 0:
                            case 1:
                              o = i;
                              break;
                            case 4:
                              return s.label++, { value: i[1], done: !1 };
                            case 5:
                              s.label++, (r = i[1]), (i = [0]);
                              continue;
                            case 7:
                              (i = s.ops.pop()), s.trys.pop();
                              continue;
                            default:
                              if (
                                !(
                                  (o =
                                    (o = s.trys).length > 0 &&
                                    o[o.length - 1]) ||
                                  (6 !== i[0] && 2 !== i[0])
                                )
                              ) {
                                s = 0;
                                continue;
                              }
                              if (
                                3 === i[0] &&
                                (!o || (i[1] > o[0] && i[1] < o[3]))
                              ) {
                                s.label = i[1];
                                break;
                              }
                              if (6 === i[0] && s.label < o[1]) {
                                (s.label = o[1]), (o = i);
                                break;
                              }
                              if (o && s.label < o[2]) {
                                (s.label = o[2]), s.ops.push(i);
                                break;
                              }
                              o[2] && s.ops.pop(), s.trys.pop();
                              continue;
                          }
                          i = e.call(t, s);
                        } catch (t) {
                          (i = [6, t]), (r = 0);
                        } finally {
                          n = o = 0;
                        }
                      if (5 & i[0]) throw i[1];
                      return { value: i[0] ? i[1] : void 0, done: !0 };
                    })([i, u]);
                  };
                }
              };
          Object.defineProperty(e, '__esModule', { value: !0 }),
            (e.BoostConnector = void 0);
          var o = '00001623-1212-efde-1623-785feabcd123',
            i = (function () {
              function t() {}
              return (
                (t.connect = function (e) {
                  return n(this, void 0, void 0, function () {
                    var i,
                      s,
                      u = this;
                    return r(this, function (c) {
                      switch (c.label) {
                        case 0:
                          return (
                            (i = {
                              acceptAllDevices: !1,
                              filters: [{ services: [o] }],
                              optionalServices: [o]
                            }),
                            (s = this),
                            [4, navigator.bluetooth.requestDevice(i)]
                          );
                        case 1:
                          return (
                            (s.device = c.sent()),
                            this.device.addEventListener(
                              'gattserverdisconnected',
                              function (t) {
                                return n(u, void 0, void 0, function () {
                                  return r(this, function (t) {
                                    switch (t.label) {
                                      case 0:
                                        return [4, e()];
                                      case 1:
                                        return t.sent(), [2];
                                    }
                                  });
                                });
                              }
                            ),
                            [2, t.getCharacteristic(this.device)]
                          );
                      }
                    });
                  });
                }),
                (t.getCharacteristic = function (t) {
                  return n(this, void 0, void 0, function () {
                    return r(this, function (e) {
                      switch (e.label) {
                        case 0:
                          return [4, t.gatt.connect()];
                        case 1:
                          return [4, e.sent().getPrimaryService(o)];
                        case 2:
                          return [
                            4,
                            e
                              .sent()
                              .getCharacteristic(
                                '00001624-1212-efde-1623-785feabcd123'
                              )
                          ];
                        case 3:
                          return [2, e.sent()];
                      }
                    });
                  });
                }),
                (t.reconnect = function () {
                  return n(this, void 0, void 0, function () {
                    return r(this, function (e) {
                      switch (e.label) {
                        case 0:
                          return this.device
                            ? [4, t.getCharacteristic(this.device)]
                            : [3, 2];
                        case 1:
                          return [2, [!0, e.sent()]];
                        case 2:
                          return [2, [!1, null]];
                      }
                    });
                  });
                }),
                (t.disconnect = function () {
                  return !!this.device && (this.device.gatt.disconnect(), !0);
                }),
                (t.isWebBluetoothSupported = !!navigator.bluetooth),
                t
              );
            })();
          e.BoostConnector = i;
        },
        118: (t, e, n) => {
          'use strict';
          Object.defineProperty(e, '__esModule', { value: !0 }),
            (e.kMaxLength =
              e.INSPECT_MAX_BYTES =
              e.SlowBuffer =
              e.Buffer =
                void 0);
          var r = Promise.resolve().then(function () {
              return n(155);
            }),
            o = Promise.resolve().then(function () {
              return n(525);
            });
          e.INSPECT_MAX_BYTES = 50;
          var i = 2147483647,
            s = i;
          function u(t) {
            if (t > i)
              throw new RangeError(
                'The value "' + t + '" is invalid for option "size"'
              );
            var e = new Uint8Array(t);
            return (e.__proto__ = c.prototype), e;
          }
          function c(t, e, n) {
            if ('number' == typeof t) {
              if ('string' == typeof e)
                throw new TypeError(
                  'The "string" argument must be of type string. Received type number'
                );
              return h(t);
            }
            return a(t, e, n);
          }
          function a(t, e, n) {
            if ('string' == typeof t)
              return (function (t, e) {
                if (
                  (('string' == typeof e && '' !== e) || (e = 'utf8'),
                  !c.isEncoding(e))
                )
                  throw new TypeError('Unknown encoding: ' + e);
                var n = 0 | d(t, e),
                  r = u(n),
                  o = r.write(t, e);
                return o !== n && (r = r.slice(0, o)), r;
              })(t, e);
            if (ArrayBuffer.isView(t)) return f(t);
            if (null == t)
              throw TypeError(
                'The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' +
                  typeof t
              );
            if (G(t, ArrayBuffer) || (t && G(t.buffer, ArrayBuffer)))
              return (function (t, e, n) {
                if (e < 0 || t.byteLength < e)
                  throw new RangeError('"offset" is outside of buffer bounds');
                if (t.byteLength < e + (n || 0))
                  throw new RangeError('"length" is outside of buffer bounds');
                var r;
                return (
                  ((r =
                    void 0 === e && void 0 === n
                      ? new Uint8Array(t)
                      : void 0 === n
                        ? new Uint8Array(t, e)
                        : new Uint8Array(t, e, n)).__proto__ = c.prototype),
                  r
                );
              })(t, e, n);
            if ('number' == typeof t)
              throw new TypeError(
                'The "value" argument must not be of type number. Received type number'
              );
            var r = t.valueOf && t.valueOf();
            if (null != r && r !== t) return c.from(r, e, n);
            var o = (function (t) {
              if (c.isBuffer(t)) {
                var e = 0 | p(t.length),
                  n = u(e);
                return 0 === n.length || t.copy(n, 0, 0, e), n;
              }
              return void 0 !== t.length
                ? 'number' != typeof t.length || z(t.length)
                  ? u(0)
                  : f(t)
                : 'Buffer' === t.type && Array.isArray(t.data)
                  ? f(t.data)
                  : void 0;
            })(t);
            if (o) return o;
            if (
              'undefined' != typeof Symbol &&
              null != Symbol.toPrimitive &&
              'function' == typeof t[Symbol.toPrimitive]
            )
              return c.from(t[Symbol.toPrimitive]('string'), e, n);
            throw new TypeError(
              'The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' +
                typeof t
            );
          }
          function l(t) {
            if ('number' != typeof t)
              throw new TypeError('"size" argument must be of type number');
            if (t < 0)
              throw new RangeError(
                'The value "' + t + '" is invalid for option "size"'
              );
          }
          function h(t) {
            return l(t), u(t < 0 ? 0 : 0 | p(t));
          }
          function f(t) {
            for (
              var e = t.length < 0 ? 0 : 0 | p(t.length), n = u(e), r = 0;
              r < e;
              r += 1
            )
              n[r] = 255 & t[r];
            return n;
          }
          function p(t) {
            if (t >= i)
              throw new RangeError(
                'Attempt to allocate Buffer larger than maximum size: 0x' +
                  i.toString(16) +
                  ' bytes'
              );
            return 0 | t;
          }
          function d(t, e) {
            if (c.isBuffer(t)) return t.length;
            if (ArrayBuffer.isView(t) || G(t, ArrayBuffer)) return t.byteLength;
            if ('string' != typeof t)
              throw new TypeError(
                'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
                  typeof t
              );
            var n = t.length,
              r = arguments.length > 2 && !0 === arguments[2];
            if (!r && 0 === n) return 0;
            for (var o = !1; ; )
              switch (e) {
                case 'ascii':
                case 'latin1':
                case 'binary':
                  return n;
                case 'utf8':
                case 'utf-8':
                  return R(t).length;
                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                  return 2 * n;
                case 'hex':
                  return n >>> 1;
                case 'base64':
                  return N(t).length;
                default:
                  if (o) return r ? -1 : R(t).length;
                  (e = ('' + e).toLowerCase()), (o = !0);
              }
          }
          function v(t, e, n) {
            var r = !1;
            if (((void 0 === e || e < 0) && (e = 0), e > this.length))
              return '';
            if (
              ((void 0 === n || n > this.length) && (n = this.length), n <= 0)
            )
              return '';
            if ((n >>>= 0) <= (e >>>= 0)) return '';
            for (t || (t = 'utf8'); ; )
              switch (t) {
                case 'hex':
                  return B(this, e, n);
                case 'utf8':
                case 'utf-8':
                  return T(this, e, n);
                case 'ascii':
                  return D(this, e, n);
                case 'latin1':
                case 'binary':
                  return I(this, e, n);
                case 'base64':
                  return C(this, e, n);
                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                  return S(this, e, n);
                default:
                  if (r) throw new TypeError('Unknown encoding: ' + t);
                  (t = (t + '').toLowerCase()), (r = !0);
              }
          }
          function b(t, e, n) {
            var r = t[e];
            (t[e] = t[n]), (t[n] = r);
          }
          function m(t, e, n, r, o) {
            if (0 === t.length) return -1;
            if (
              ('string' == typeof n
                ? ((r = n), (n = 0))
                : n > 2147483647
                  ? (n = 2147483647)
                  : n < -2147483648 && (n = -2147483648),
              z((n = +n)) && (n = o ? 0 : t.length - 1),
              n < 0 && (n = t.length + n),
              n >= t.length)
            ) {
              if (o) return -1;
              n = t.length - 1;
            } else if (n < 0) {
              if (!o) return -1;
              n = 0;
            }
            if (('string' == typeof e && (e = c.from(e, r)), c.isBuffer(e)))
              return 0 === e.length ? -1 : g(t, e, n, r, o);
            if ('number' == typeof e)
              return (
                (e &= 255),
                'function' == typeof Uint8Array.prototype.indexOf
                  ? o
                    ? Uint8Array.prototype.indexOf.call(t, e, n)
                    : Uint8Array.prototype.lastIndexOf.call(t, e, n)
                  : g(t, [e], n, r, o)
              );
            throw new TypeError('val must be string, number or Buffer');
          }
          function g(t, e, n, r, o) {
            var i,
              s = 1,
              u = t.length,
              c = e.length;
            if (
              void 0 !== r &&
              ('ucs2' === (r = String(r).toLowerCase()) ||
                'ucs-2' === r ||
                'utf16le' === r ||
                'utf-16le' === r)
            ) {
              if (t.length < 2 || e.length < 2) return -1;
              (s = 2), (u /= 2), (c /= 2), (n /= 2);
            }
            function a(t, e) {
              return 1 === s ? t[e] : t.readUInt16BE(e * s);
            }
            if (o) {
              var l = -1;
              for (i = n; i < u; i++)
                if (a(t, i) === a(e, -1 === l ? 0 : i - l)) {
                  if ((-1 === l && (l = i), i - l + 1 === c)) return l * s;
                } else -1 !== l && (i -= i - l), (l = -1);
            } else
              for (n + c > u && (n = u - c), i = n; i >= 0; i--) {
                for (var h = !0, f = 0; f < c; f++)
                  if (a(t, i + f) !== a(e, f)) {
                    h = !1;
                    break;
                  }
                if (h) return i;
              }
            return -1;
          }
          function y(t, e, n, r) {
            n = Number(n) || 0;
            var o = t.length - n;
            r ? (r = Number(r)) > o && (r = o) : (r = o);
            var i = e.length;
            r > i / 2 && (r = i / 2);
            for (var s = 0; s < r; ++s) {
              var u = parseInt(e.substr(2 * s, 2), 16);
              if (z(u)) return s;
              t[n + s] = u;
            }
            return s;
          }
          function w(t, e, n, r) {
            return F(R(e, t.length - n), t, n, r);
          }
          function _(t, e, n, r) {
            return F(
              (function (t) {
                for (var e = [], n = 0; n < t.length; ++n)
                  e.push(255 & t.charCodeAt(n));
                return e;
              })(e),
              t,
              n,
              r
            );
          }
          function A(t, e, n, r) {
            return _(t, e, n, r);
          }
          function E(t, e, n, r) {
            return F(N(e), t, n, r);
          }
          function x(t, e, n, r) {
            return F(
              (function (t, e) {
                for (
                  var n, r, o, i = [], s = 0;
                  s < t.length && !((e -= 2) < 0);
                  ++s
                )
                  (r = (n = t.charCodeAt(s)) >> 8),
                    (o = n % 256),
                    i.push(o),
                    i.push(r);
                return i;
              })(e, t.length - n),
              t,
              n,
              r
            );
          }
          function C(t, e, n) {
            return 0 === e && n === t.length
              ? r.fromByteArray(t)
              : r.fromByteArray(t.slice(e, n));
          }
          function T(t, e, n) {
            n = Math.min(t.length, n);
            for (var r = [], o = e; o < n; ) {
              var i,
                s,
                u,
                c,
                a = t[o],
                l = null,
                h = a > 239 ? 4 : a > 223 ? 3 : a > 191 ? 2 : 1;
              if (o + h <= n)
                switch (h) {
                  case 1:
                    a < 128 && (l = a);
                    break;
                  case 2:
                    128 == (192 & (i = t[o + 1])) &&
                      (c = ((31 & a) << 6) | (63 & i)) > 127 &&
                      (l = c);
                    break;
                  case 3:
                    (i = t[o + 1]),
                      (s = t[o + 2]),
                      128 == (192 & i) &&
                        128 == (192 & s) &&
                        (c = ((15 & a) << 12) | ((63 & i) << 6) | (63 & s)) >
                          2047 &&
                        (c < 55296 || c > 57343) &&
                        (l = c);
                    break;
                  case 4:
                    (i = t[o + 1]),
                      (s = t[o + 2]),
                      (u = t[o + 3]),
                      128 == (192 & i) &&
                        128 == (192 & s) &&
                        128 == (192 & u) &&
                        (c =
                          ((15 & a) << 18) |
                          ((63 & i) << 12) |
                          ((63 & s) << 6) |
                          (63 & u)) > 65535 &&
                        c < 1114112 &&
                        (l = c);
                }
              null === l
                ? ((l = 65533), (h = 1))
                : l > 65535 &&
                  ((l -= 65536),
                  r.push(((l >>> 10) & 1023) | 55296),
                  (l = 56320 | (1023 & l))),
                r.push(l),
                (o += h);
            }
            return (function (t) {
              var e = t.length;
              if (e <= M) return String.fromCharCode.apply(String, t);
              for (var n = '', r = 0; r < e; )
                n += String.fromCharCode.apply(String, t.slice(r, (r += M)));
              return n;
            })(r);
          }
          (e.kMaxLength = s),
            (c.TYPED_ARRAY_SUPPORT = (function () {
              try {
                var t = new Uint8Array(1);
                return (
                  (t.__proto__ = {
                    __proto__: Uint8Array.prototype,
                    foo: function () {
                      return 42;
                    }
                  }),
                  42 === t.foo()
                );
              } catch (t) {
                return !1;
              }
            })()),
            c.TYPED_ARRAY_SUPPORT ||
              'undefined' == typeof console ||
              'function' != typeof console.error ||
              console.error(
                'This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
              ),
            Object.defineProperty(c.prototype, 'parent', {
              enumerable: !0,
              get: function () {
                if (c.isBuffer(this)) return this.buffer;
              }
            }),
            Object.defineProperty(c.prototype, 'offset', {
              enumerable: !0,
              get: function () {
                if (c.isBuffer(this)) return this.byteOffset;
              }
            }),
            (e.Buffer = c),
            'undefined' != typeof Symbol &&
              null != Symbol.species &&
              c[Symbol.species] === c &&
              Object.defineProperty(c, Symbol.species, {
                value: null,
                configurable: !0,
                enumerable: !1,
                writable: !1
              }),
            (c.poolSize = 8192),
            (c.from = function (t, e, n) {
              return a(t, e, n);
            }),
            (c.prototype.__proto__ = Uint8Array.prototype),
            (c.__proto__ = Uint8Array),
            (c.alloc = function (t, e, n) {
              return (function (t, e, n) {
                return (
                  l(t),
                  t <= 0
                    ? u(t)
                    : void 0 !== e
                      ? 'string' == typeof n
                        ? u(t).fill(e, n)
                        : u(t).fill(e)
                      : u(t)
                );
              })(t, e, n);
            }),
            (c.allocUnsafe = function (t) {
              return h(t);
            }),
            (c.allocUnsafeSlow = function (t) {
              return h(t);
            }),
            (e.SlowBuffer = function (t) {
              return +t != t && (t = 0), c.alloc(+t);
            }),
            (c.isBuffer = function (t) {
              return null != t && !0 === t._isBuffer && t !== c.prototype;
            }),
            (c.compare = function (t, e) {
              if (
                (G(t, Uint8Array) && (t = c.from(t, t.offset, t.byteLength)),
                G(e, Uint8Array) && (e = c.from(e, e.offset, e.byteLength)),
                !c.isBuffer(t) || !c.isBuffer(e))
              )
                throw new TypeError(
                  'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
                );
              if (t === e) return 0;
              for (
                var n = t.length, r = e.length, o = 0, i = Math.min(n, r);
                o < i;
                ++o
              )
                if (t[o] !== e[o]) {
                  (n = t[o]), (r = e[o]);
                  break;
                }
              return n < r ? -1 : r < n ? 1 : 0;
            }),
            (c.isEncoding = function (t) {
              switch (String(t).toLowerCase()) {
                case 'hex':
                case 'utf8':
                case 'utf-8':
                case 'ascii':
                case 'latin1':
                case 'binary':
                case 'base64':
                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                  return !0;
                default:
                  return !1;
              }
            }),
            (c.concat = function (t, e) {
              if (!Array.isArray(t))
                throw new TypeError(
                  '"list" argument must be an Array of Buffers'
                );
              if (0 === t.length) return c.alloc(0);
              var n;
              if (void 0 === e)
                for (e = 0, n = 0; n < t.length; ++n) e += t[n].length;
              var r = c.allocUnsafe(e),
                o = 0;
              for (n = 0; n < t.length; ++n) {
                var i = t[n];
                if ((G(i, Uint8Array) && (i = c.from(i)), !c.isBuffer(i)))
                  throw new TypeError(
                    '"list" argument must be an Array of Buffers'
                  );
                i.copy(r, o), (o += i.length);
              }
              return r;
            }),
            (c.byteLength = d),
            (c.prototype._isBuffer = !0),
            (c.prototype.swap16 = function () {
              var t = this.length;
              if (t % 2 != 0)
                throw new RangeError(
                  'Buffer size must be a multiple of 16-bits'
                );
              for (var e = 0; e < t; e += 2) b(this, e, e + 1);
              return this;
            }),
            (c.prototype.swap32 = function () {
              var t = this.length;
              if (t % 4 != 0)
                throw new RangeError(
                  'Buffer size must be a multiple of 32-bits'
                );
              for (var e = 0; e < t; e += 4)
                b(this, e, e + 3), b(this, e + 1, e + 2);
              return this;
            }),
            (c.prototype.swap64 = function () {
              var t = this.length;
              if (t % 8 != 0)
                throw new RangeError(
                  'Buffer size must be a multiple of 64-bits'
                );
              for (var e = 0; e < t; e += 8)
                b(this, e, e + 7),
                  b(this, e + 1, e + 6),
                  b(this, e + 2, e + 5),
                  b(this, e + 3, e + 4);
              return this;
            }),
            (c.prototype.toString = function () {
              var t = this.length;
              return 0 === t
                ? ''
                : 0 === arguments.length
                  ? T(this, 0, t)
                  : v.apply(this, arguments);
            }),
            (c.prototype.toLocaleString = c.prototype.toString),
            (c.prototype.equals = function (t) {
              if (!c.isBuffer(t))
                throw new TypeError('Argument must be a Buffer');
              return this === t || 0 === c.compare(this, t);
            }),
            (c.prototype.inspect = function () {
              var t = '';
              return (
                (t = this.toString('hex', 0, 50)
                  .replace(/(.{2})/g, '$1 ')
                  .trim()),
                this.length > 50 && (t += ' ... '),
                '<Buffer ' + t + '>'
              );
            }),
            (c.prototype.compare = function (t, e, n, r, o) {
              if (
                (G(t, Uint8Array) && (t = c.from(t, t.offset, t.byteLength)),
                !c.isBuffer(t))
              )
                throw new TypeError(
                  'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
                    typeof t
                );
              if (
                (void 0 === e && (e = 0),
                void 0 === n && (n = t ? t.length : 0),
                void 0 === r && (r = 0),
                void 0 === o && (o = this.length),
                e < 0 || n > t.length || r < 0 || o > this.length)
              )
                throw new RangeError('out of range index');
              if (r >= o && e >= n) return 0;
              if (r >= o) return -1;
              if (e >= n) return 1;
              if (this === t) return 0;
              for (
                var i = (o >>>= 0) - (r >>>= 0),
                  s = (n >>>= 0) - (e >>>= 0),
                  u = Math.min(i, s),
                  a = this.slice(r, o),
                  l = t.slice(e, n),
                  h = 0;
                h < u;
                ++h
              )
                if (a[h] !== l[h]) {
                  (i = a[h]), (s = l[h]);
                  break;
                }
              return i < s ? -1 : s < i ? 1 : 0;
            }),
            (c.prototype.includes = function (t, e, n) {
              return -1 !== this.indexOf(t, e, n);
            }),
            (c.prototype.indexOf = function (t, e, n) {
              return m(this, t, e, n, !0);
            }),
            (c.prototype.lastIndexOf = function (t, e, n) {
              return m(this, t, e, n, !1);
            }),
            (c.prototype.write = function (t, e, n, r) {
              if (void 0 === e) (r = 'utf8'), (n = this.length), (e = 0);
              else if (void 0 === n && 'string' == typeof e)
                (r = e), (n = this.length), (e = 0);
              else {
                if (!isFinite(e))
                  throw new Error(
                    'Buffer.write(string, encoding, offset[, length]) is no longer supported'
                  );
                (e >>>= 0),
                  isFinite(n)
                    ? ((n >>>= 0), void 0 === r && (r = 'utf8'))
                    : ((r = n), (n = void 0));
              }
              var o = this.length - e;
              if (
                ((void 0 === n || n > o) && (n = o),
                (t.length > 0 && (n < 0 || e < 0)) || e > this.length)
              )
                throw new RangeError('Attempt to write outside buffer bounds');
              r || (r = 'utf8');
              for (var i = !1; ; )
                switch (r) {
                  case 'hex':
                    return y(this, t, e, n);
                  case 'utf8':
                  case 'utf-8':
                    return w(this, t, e, n);
                  case 'ascii':
                    return _(this, t, e, n);
                  case 'latin1':
                  case 'binary':
                    return A(this, t, e, n);
                  case 'base64':
                    return E(this, t, e, n);
                  case 'ucs2':
                  case 'ucs-2':
                  case 'utf16le':
                  case 'utf-16le':
                    return x(this, t, e, n);
                  default:
                    if (i) throw new TypeError('Unknown encoding: ' + r);
                    (r = ('' + r).toLowerCase()), (i = !0);
                }
            }),
            (c.prototype.toJSON = function () {
              return {
                type: 'Buffer',
                data: Array.prototype.slice.call(this._arr || this, 0)
              };
            });
          var M = 4096;
          function D(t, e, n) {
            var r = '';
            n = Math.min(t.length, n);
            for (var o = e; o < n; ++o) r += String.fromCharCode(127 & t[o]);
            return r;
          }
          function I(t, e, n) {
            var r = '';
            n = Math.min(t.length, n);
            for (var o = e; o < n; ++o) r += String.fromCharCode(t[o]);
            return r;
          }
          function B(t, e, n) {
            var r,
              o = t.length;
            (!e || e < 0) && (e = 0), (!n || n < 0 || n > o) && (n = o);
            for (var i = '', s = e; s < n; ++s)
              i += (r = t[s]) < 16 ? '0' + r.toString(16) : r.toString(16);
            return i;
          }
          function S(t, e, n) {
            for (var r = t.slice(e, n), o = '', i = 0; i < r.length; i += 2)
              o += String.fromCharCode(r[i] + 256 * r[i + 1]);
            return o;
          }
          function O(t, e, n) {
            if (t % 1 != 0 || t < 0) throw new RangeError('offset is not uint');
            if (t + e > n)
              throw new RangeError('Trying to access beyond buffer length');
          }
          function k(t, e, n, r, o, i) {
            if (!c.isBuffer(t))
              throw new TypeError(
                '"buffer" argument must be a Buffer instance'
              );
            if (e > o || e < i)
              throw new RangeError('"value" argument is out of bounds');
            if (n + r > t.length) throw new RangeError('Index out of range');
          }
          function U(t, e, n, r, o, i) {
            if (n + r > t.length) throw new RangeError('Index out of range');
            if (n < 0) throw new RangeError('Index out of range');
          }
          function L(t, e, n, r, i) {
            return (
              (e = +e),
              (n >>>= 0),
              i || U(t, 0, n, 4),
              o.write(t, e, n, r, 23, 4),
              n + 4
            );
          }
          function j(t, e, n, r, i) {
            return (
              (e = +e),
              (n >>>= 0),
              i || U(t, 0, n, 8),
              o.write(t, e, n, r, 52, 8),
              n + 8
            );
          }
          (c.prototype.slice = function (t, e) {
            var n = this.length;
            (t = ~~t) < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n),
              (e = void 0 === e ? n : ~~e) < 0
                ? (e += n) < 0 && (e = 0)
                : e > n && (e = n),
              e < t && (e = t);
            var r = this.subarray(t, e);
            return (r.__proto__ = c.prototype), r;
          }),
            (c.prototype.readUIntLE = function (t, e, n) {
              (t >>>= 0), (e >>>= 0), n || O(t, e, this.length);
              for (var r = this[t], o = 1, i = 0; ++i < e && (o *= 256); )
                r += this[t + i] * o;
              return r;
            }),
            (c.prototype.readUIntBE = function (t, e, n) {
              (t >>>= 0), (e >>>= 0), n || O(t, e, this.length);
              for (var r = this[t + --e], o = 1; e > 0 && (o *= 256); )
                r += this[t + --e] * o;
              return r;
            }),
            (c.prototype.readUInt8 = function (t, e) {
              return (t >>>= 0), e || O(t, 1, this.length), this[t];
            }),
            (c.prototype.readUInt16LE = function (t, e) {
              return (
                (t >>>= 0),
                e || O(t, 2, this.length),
                this[t] | (this[t + 1] << 8)
              );
            }),
            (c.prototype.readUInt16BE = function (t, e) {
              return (
                (t >>>= 0),
                e || O(t, 2, this.length),
                (this[t] << 8) | this[t + 1]
              );
            }),
            (c.prototype.readUInt32LE = function (t, e) {
              return (
                (t >>>= 0),
                e || O(t, 4, this.length),
                (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) +
                  16777216 * this[t + 3]
              );
            }),
            (c.prototype.readUInt32BE = function (t, e) {
              return (
                (t >>>= 0),
                e || O(t, 4, this.length),
                16777216 * this[t] +
                  ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
              );
            }),
            (c.prototype.readIntLE = function (t, e, n) {
              (t >>>= 0), (e >>>= 0), n || O(t, e, this.length);
              for (var r = this[t], o = 1, i = 0; ++i < e && (o *= 256); )
                r += this[t + i] * o;
              return r >= (o *= 128) && (r -= Math.pow(2, 8 * e)), r;
            }),
            (c.prototype.readIntBE = function (t, e, n) {
              (t >>>= 0), (e >>>= 0), n || O(t, e, this.length);
              for (var r = e, o = 1, i = this[t + --r]; r > 0 && (o *= 256); )
                i += this[t + --r] * o;
              return i >= (o *= 128) && (i -= Math.pow(2, 8 * e)), i;
            }),
            (c.prototype.readInt8 = function (t, e) {
              return (
                (t >>>= 0),
                e || O(t, 1, this.length),
                128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
              );
            }),
            (c.prototype.readInt16LE = function (t, e) {
              (t >>>= 0), e || O(t, 2, this.length);
              var n = this[t] | (this[t + 1] << 8);
              return 32768 & n ? 4294901760 | n : n;
            }),
            (c.prototype.readInt16BE = function (t, e) {
              (t >>>= 0), e || O(t, 2, this.length);
              var n = this[t + 1] | (this[t] << 8);
              return 32768 & n ? 4294901760 | n : n;
            }),
            (c.prototype.readInt32LE = function (t, e) {
              return (
                (t >>>= 0),
                e || O(t, 4, this.length),
                this[t] |
                  (this[t + 1] << 8) |
                  (this[t + 2] << 16) |
                  (this[t + 3] << 24)
              );
            }),
            (c.prototype.readInt32BE = function (t, e) {
              return (
                (t >>>= 0),
                e || O(t, 4, this.length),
                (this[t] << 24) |
                  (this[t + 1] << 16) |
                  (this[t + 2] << 8) |
                  this[t + 3]
              );
            }),
            (c.prototype.readFloatLE = function (t, e) {
              return (
                (t >>>= 0),
                e || O(t, 4, this.length),
                o.read(this, t, !0, 23, 4)
              );
            }),
            (c.prototype.readFloatBE = function (t, e) {
              return (
                (t >>>= 0),
                e || O(t, 4, this.length),
                o.read(this, t, !1, 23, 4)
              );
            }),
            (c.prototype.readDoubleLE = function (t, e) {
              return (
                (t >>>= 0),
                e || O(t, 8, this.length),
                o.read(this, t, !0, 52, 8)
              );
            }),
            (c.prototype.readDoubleBE = function (t, e) {
              return (
                (t >>>= 0),
                e || O(t, 8, this.length),
                o.read(this, t, !1, 52, 8)
              );
            }),
            (c.prototype.writeUIntLE = function (t, e, n, r) {
              (t = +t),
                (e >>>= 0),
                (n >>>= 0),
                r || k(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
              var o = 1,
                i = 0;
              for (this[e] = 255 & t; ++i < n && (o *= 256); )
                this[e + i] = (t / o) & 255;
              return e + n;
            }),
            (c.prototype.writeUIntBE = function (t, e, n, r) {
              (t = +t),
                (e >>>= 0),
                (n >>>= 0),
                r || k(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
              var o = n - 1,
                i = 1;
              for (this[e + o] = 255 & t; --o >= 0 && (i *= 256); )
                this[e + o] = (t / i) & 255;
              return e + n;
            }),
            (c.prototype.writeUInt8 = function (t, e, n) {
              return (
                (t = +t),
                (e >>>= 0),
                n || k(this, t, e, 1, 255, 0),
                (this[e] = 255 & t),
                e + 1
              );
            }),
            (c.prototype.writeUInt16LE = function (t, e, n) {
              return (
                (t = +t),
                (e >>>= 0),
                n || k(this, t, e, 2, 65535, 0),
                (this[e] = 255 & t),
                (this[e + 1] = t >>> 8),
                e + 2
              );
            }),
            (c.prototype.writeUInt16BE = function (t, e, n) {
              return (
                (t = +t),
                (e >>>= 0),
                n || k(this, t, e, 2, 65535, 0),
                (this[e] = t >>> 8),
                (this[e + 1] = 255 & t),
                e + 2
              );
            }),
            (c.prototype.writeUInt32LE = function (t, e, n) {
              return (
                (t = +t),
                (e >>>= 0),
                n || k(this, t, e, 4, 4294967295, 0),
                (this[e + 3] = t >>> 24),
                (this[e + 2] = t >>> 16),
                (this[e + 1] = t >>> 8),
                (this[e] = 255 & t),
                e + 4
              );
            }),
            (c.prototype.writeUInt32BE = function (t, e, n) {
              return (
                (t = +t),
                (e >>>= 0),
                n || k(this, t, e, 4, 4294967295, 0),
                (this[e] = t >>> 24),
                (this[e + 1] = t >>> 16),
                (this[e + 2] = t >>> 8),
                (this[e + 3] = 255 & t),
                e + 4
              );
            }),
            (c.prototype.writeIntLE = function (t, e, n, r) {
              if (((t = +t), (e >>>= 0), !r)) {
                var o = Math.pow(2, 8 * n - 1);
                k(this, t, e, n, o - 1, -o);
              }
              var i = 0,
                s = 1,
                u = 0;
              for (this[e] = 255 & t; ++i < n && (s *= 256); )
                t < 0 && 0 === u && 0 !== this[e + i - 1] && (u = 1),
                  (this[e + i] = (((t / s) >> 0) - u) & 255);
              return e + n;
            }),
            (c.prototype.writeIntBE = function (t, e, n, r) {
              if (((t = +t), (e >>>= 0), !r)) {
                var o = Math.pow(2, 8 * n - 1);
                k(this, t, e, n, o - 1, -o);
              }
              var i = n - 1,
                s = 1,
                u = 0;
              for (this[e + i] = 255 & t; --i >= 0 && (s *= 256); )
                t < 0 && 0 === u && 0 !== this[e + i + 1] && (u = 1),
                  (this[e + i] = (((t / s) >> 0) - u) & 255);
              return e + n;
            }),
            (c.prototype.writeInt8 = function (t, e, n) {
              return (
                (t = +t),
                (e >>>= 0),
                n || k(this, t, e, 1, 127, -128),
                t < 0 && (t = 255 + t + 1),
                (this[e] = 255 & t),
                e + 1
              );
            }),
            (c.prototype.writeInt16LE = function (t, e, n) {
              return (
                (t = +t),
                (e >>>= 0),
                n || k(this, t, e, 2, 32767, -32768),
                (this[e] = 255 & t),
                (this[e + 1] = t >>> 8),
                e + 2
              );
            }),
            (c.prototype.writeInt16BE = function (t, e, n) {
              return (
                (t = +t),
                (e >>>= 0),
                n || k(this, t, e, 2, 32767, -32768),
                (this[e] = t >>> 8),
                (this[e + 1] = 255 & t),
                e + 2
              );
            }),
            (c.prototype.writeInt32LE = function (t, e, n) {
              return (
                (t = +t),
                (e >>>= 0),
                n || k(this, t, e, 4, 2147483647, -2147483648),
                (this[e] = 255 & t),
                (this[e + 1] = t >>> 8),
                (this[e + 2] = t >>> 16),
                (this[e + 3] = t >>> 24),
                e + 4
              );
            }),
            (c.prototype.writeInt32BE = function (t, e, n) {
              return (
                (t = +t),
                (e >>>= 0),
                n || k(this, t, e, 4, 2147483647, -2147483648),
                t < 0 && (t = 4294967295 + t + 1),
                (this[e] = t >>> 24),
                (this[e + 1] = t >>> 16),
                (this[e + 2] = t >>> 8),
                (this[e + 3] = 255 & t),
                e + 4
              );
            }),
            (c.prototype.writeFloatLE = function (t, e, n) {
              return L(this, t, e, !0, n);
            }),
            (c.prototype.writeFloatBE = function (t, e, n) {
              return L(this, t, e, !1, n);
            }),
            (c.prototype.writeDoubleLE = function (t, e, n) {
              return j(this, t, e, !0, n);
            }),
            (c.prototype.writeDoubleBE = function (t, e, n) {
              return j(this, t, e, !1, n);
            }),
            (c.prototype.copy = function (t, e, n, r) {
              if (!c.isBuffer(t))
                throw new TypeError('argument should be a Buffer');
              if (
                (n || (n = 0),
                r || 0 === r || (r = this.length),
                e >= t.length && (e = t.length),
                e || (e = 0),
                r > 0 && r < n && (r = n),
                r === n)
              )
                return 0;
              if (0 === t.length || 0 === this.length) return 0;
              if (e < 0) throw new RangeError('targetStart out of bounds');
              if (n < 0 || n >= this.length)
                throw new RangeError('Index out of range');
              if (r < 0) throw new RangeError('sourceEnd out of bounds');
              r > this.length && (r = this.length),
                t.length - e < r - n && (r = t.length - e + n);
              var o = r - n;
              if (
                this === t &&
                'function' == typeof Uint8Array.prototype.copyWithin
              )
                this.copyWithin(e, n, r);
              else if (this === t && n < e && e < r)
                for (var i = o - 1; i >= 0; --i) t[i + e] = this[i + n];
              else Uint8Array.prototype.set.call(t, this.subarray(n, r), e);
              return o;
            }),
            (c.prototype.fill = function (t, e, n, r) {
              if ('string' == typeof t) {
                if (
                  ('string' == typeof e
                    ? ((r = e), (e = 0), (n = this.length))
                    : 'string' == typeof n && ((r = n), (n = this.length)),
                  void 0 !== r && 'string' != typeof r)
                )
                  throw new TypeError('encoding must be a string');
                if ('string' == typeof r && !c.isEncoding(r))
                  throw new TypeError('Unknown encoding: ' + r);
                if (1 === t.length) {
                  var o = t.charCodeAt(0);
                  (('utf8' === r && o < 128) || 'latin1' === r) && (t = o);
                }
              } else 'number' == typeof t && (t &= 255);
              if (e < 0 || this.length < e || this.length < n)
                throw new RangeError('Out of range index');
              if (n <= e) return this;
              var i;
              if (
                ((e >>>= 0),
                (n = void 0 === n ? this.length : n >>> 0),
                t || (t = 0),
                'number' == typeof t)
              )
                for (i = e; i < n; ++i) this[i] = t;
              else {
                var s = c.isBuffer(t) ? t : c.from(t, r),
                  u = s.length;
                if (0 === u)
                  throw new TypeError(
                    'The value "' + t + '" is invalid for argument "value"'
                  );
                for (i = 0; i < n - e; ++i) this[i + e] = s[i % u];
              }
              return this;
            });
          var P = /[^+/0-9A-Za-z-_]/g;
          function R(t, e) {
            var n;
            e = e || 1 / 0;
            for (var r = t.length, o = null, i = [], s = 0; s < r; ++s) {
              if ((n = t.charCodeAt(s)) > 55295 && n < 57344) {
                if (!o) {
                  if (n > 56319) {
                    (e -= 3) > -1 && i.push(239, 191, 189);
                    continue;
                  }
                  if (s + 1 === r) {
                    (e -= 3) > -1 && i.push(239, 191, 189);
                    continue;
                  }
                  o = n;
                  continue;
                }
                if (n < 56320) {
                  (e -= 3) > -1 && i.push(239, 191, 189), (o = n);
                  continue;
                }
                n = 65536 + (((o - 55296) << 10) | (n - 56320));
              } else o && (e -= 3) > -1 && i.push(239, 191, 189);
              if (((o = null), n < 128)) {
                if ((e -= 1) < 0) break;
                i.push(n);
              } else if (n < 2048) {
                if ((e -= 2) < 0) break;
                i.push((n >> 6) | 192, (63 & n) | 128);
              } else if (n < 65536) {
                if ((e -= 3) < 0) break;
                i.push((n >> 12) | 224, ((n >> 6) & 63) | 128, (63 & n) | 128);
              } else {
                if (!(n < 1114112)) throw new Error('Invalid code point');
                if ((e -= 4) < 0) break;
                i.push(
                  (n >> 18) | 240,
                  ((n >> 12) & 63) | 128,
                  ((n >> 6) & 63) | 128,
                  (63 & n) | 128
                );
              }
            }
            return i;
          }
          function N(t) {
            return r.toByteArray(
              (function (t) {
                if (
                  (t = (t = t.split('=')[0]).trim().replace(P, '')).length < 2
                )
                  return '';
                for (; t.length % 4 != 0; ) t += '=';
                return t;
              })(t)
            );
          }
          function F(t, e, n, r) {
            for (var o = 0; o < r && !(o + n >= e.length || o >= t.length); ++o)
              e[o + n] = t[o];
            return o;
          }
          function G(t, e) {
            return (
              t instanceof e ||
              (null != t &&
                null != t.constructor &&
                null != t.constructor.name &&
                t.constructor.name === e.name)
            );
          }
          function z(t) {
            return t != t;
          }
        },
        634: function (t, e) {
          'use strict';
          var n =
            (this && this.__spreadArrays) ||
            function () {
              for (var t = 0, e = 0, n = arguments.length; e < n; e++)
                t += arguments[e].length;
              var r = Array(t),
                o = 0;
              for (e = 0; e < n; e++)
                for (var i = arguments[e], s = 0, u = i.length; s < u; s++, o++)
                  r[o] = i[s];
              return r;
            };
          Object.defineProperty(e, '__esModule', { value: !0 }),
            (e.EventEmitter = void 0);
          var r = (function () {
            function t() {
              this.events = {};
            }
            return (
              (t.prototype.on = function (t, e) {
                var n = this;
                return (
                  'object' != typeof this.events[t] && (this.events[t] = []),
                  this.events[t].push(e),
                  function () {
                    return n.removeListener(t, e);
                  }
                );
              }),
              (t.prototype.removeListener = function (t, e) {
                if ('object' == typeof this.events[t]) {
                  var n = this.events[t].indexOf(e);
                  n > -1 && this.events[t].splice(n, 1);
                }
              }),
              (t.prototype.removeAllListeners = function () {
                var t = this;
                Object.keys(this.events).forEach(function (e) {
                  return t.events[e].splice(0, t.events[e].length);
                });
              }),
              (t.prototype.emit = function (t) {
                for (var e = this, r = [], o = 1; o < arguments.length; o++)
                  r[o - 1] = arguments[o];
                'object' == typeof this.events[t] &&
                  n(this.events[t]).forEach(function (t) {
                    return t.apply(e, r);
                  });
              }),
              (t.prototype.once = function (t, e) {
                var n = this,
                  r = this.on(t, function () {
                    for (var t = [], o = 0; o < arguments.length; o++)
                      t[o] = arguments[o];
                    r(), e.apply(n, t);
                  });
                return r;
              }),
              t
            );
          })();
          e.EventEmitter = r;
        },
        917: (t, e, n) => {
          'use strict';
          Object.defineProperty(e, '__esModule', { value: !0 }),
            (e.Hub = void 0);
          var r = n(634),
            o = n(118),
            i = (function () {
              function t(t) {
                (this.emitter = new r.EventEmitter()),
                  (this.autoSubscribe = !0),
                  (this.writeCue = []),
                  (this.isWriting = !1),
                  (this.bluetooth = t),
                  (this.log = console.log),
                  (this.autoSubscribe = !0),
                  (this.ports = {}),
                  (this.num2type = {
                    23: 'LED',
                    37: 'DISTANCE',
                    38: 'IMOTOR',
                    39: 'MOTOR',
                    40: 'TILT'
                  }),
                  (this.port2num = {
                    A: 0,
                    B: 1,
                    C: 2,
                    D: 3,
                    AB: 16,
                    LED: 50,
                    TILT: 58
                  }),
                  (this.num2port = Object.entries(this.port2num).reduce(
                    function (t, e) {
                      var n = e[0];
                      return (t[e[1]] = n), t;
                    },
                    {}
                  )),
                  (this.num2action = { 1: 'start', 5: 'conflict', 10: 'stop' }),
                  (this.num2color = {
                    0: 'black',
                    3: 'blue',
                    5: 'green',
                    7: 'yellow',
                    9: 'red',
                    10: 'white'
                  }),
                  (this.ledColors = [
                    'off',
                    'pink',
                    'purple',
                    'blue',
                    'lightblue',
                    'cyan',
                    'green',
                    'yellow',
                    'orange',
                    'red',
                    'white'
                  ]),
                  this.addListeners();
              }
              return (
                (t.prototype.emit = function (t, e) {
                  void 0 === e && (e = null), this.emitter.emit(t, e);
                }),
                (t.prototype.addListeners = function () {
                  var t = this;
                  this.bluetooth.addEventListener(
                    'characteristicvaluechanged',
                    function (e) {
                      var n = o.Buffer.from(e.target.value.buffer);
                      t.parseMessage(n);
                    }
                  ),
                    setTimeout(function () {
                      t.bluetooth.startNotifications();
                    }, 1e3);
                }),
                (t.prototype.parseMessage = function (t) {
                  var e = this;
                  if (this.num2port[t[3]])
                    switch (t[2]) {
                      case 4:
                        clearTimeout(this.portInfoTimeout),
                          (this.portInfoTimeout = setTimeout(function () {
                            e.autoSubscribe && e.subscribeAll(),
                              e.connected ||
                                ((e.connected = !0), e.emit('connect'));
                          }, 1e3)),
                          this.log('Found: ' + this.num2type[t[5]]),
                          this.logDebug('Found', t),
                          1 === t[4]
                            ? (this.ports[t[3]] = {
                                type: 'port',
                                deviceType: this.num2type[t[5]],
                                deviceTypeNum: t[5]
                              })
                            : 2 === t[4] &&
                              (this.ports[t[3]] = {
                                type: 'group',
                                deviceType: this.num2type[t[5]],
                                deviceTypeNum: t[5],
                                members: [t[7], t[8]]
                              });
                        break;
                      case 5:
                        this.log('Malformed message!'), this.log('<', t);
                        break;
                      case 69:
                        this.parseSensor(t);
                        break;
                      case 71:
                        break;
                      case 130:
                        this.emit('port', {
                          port: this.num2port[t[3]],
                          action: this.num2action[t[4]]
                        });
                        break;
                      default:
                        this.log('unknown message type 0x' + t[2].toString(16)),
                          this.log('<', t);
                    }
                  else
                    this.log('parseSensor unknown port 0x' + t[3].toString(16));
                }),
                (t.prototype.parseSensor = function (t) {
                  if (this.ports[t[3]])
                    switch (this.ports[t[3]].deviceType) {
                      case 'DISTANCE':
                        this.emit('color', this.num2color[t[4]]);
                        var e;
                        (e =
                          t[7] > 0 && t[5] < 2
                            ? Math.floor(20 - 2.85 * t[7])
                            : t[5] > 9
                              ? 1 / 0
                              : Math.floor(20 + 18 * t[5])),
                          this.emit('distance', e);
                        break;
                      case 'TILT':
                        var n = t.readInt8(4),
                          r = t.readInt8(5);
                        this.emit('tilt', { roll: n, pitch: r });
                        break;
                      case 'MOTOR':
                      case 'IMOTOR':
                        var o = t.readInt32LE(4);
                        this.emit('rotation', {
                          port: this.num2port[t[3]],
                          angle: o
                        });
                        break;
                      default:
                        this.log(
                          'unknown sensor type 0x' + t[3].toString(16),
                          t[3],
                          this.ports[t[3]].deviceType
                        );
                    }
                  else
                    this.log('parseSensor unknown port 0x' + t[3].toString(16));
                }),
                (t.prototype.setDisconnected = function () {
                  (this.connected = !1),
                    (this.noReconnect = !0),
                    (this.writeCue = []);
                }),
                (t.prototype.motorTime = function (t, e, n, r) {
                  'function' == typeof n && ((r = n), (n = 100));
                  var o = 'string' == typeof t ? this.port2num[t] : t;
                  this.write(this.encodeMotorTime(o, e, n), r);
                }),
                (t.prototype.motorTimeMulti = function (t, e, n, r) {
                  this.write(
                    this.encodeMotorTimeMulti(this.port2num.AB, t, e, n),
                    r
                  );
                }),
                (t.prototype.motorAngle = function (t, e, n, r) {
                  'function' == typeof n && ((r = n), (n = 100));
                  var o = 'string' == typeof t ? this.port2num[t] : t;
                  this.write(this.encodeMotorAngle(o, e, n), r);
                }),
                (t.prototype.motorAngleMulti = function (t, e, n, r) {
                  this.write(
                    this.encodeMotorAngleMulti(this.port2num.AB, t, e, n),
                    r
                  );
                }),
                (t.prototype.rawCommand = function (t, e) {
                  var n = o.Buffer.from([
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                  ]);
                  for (var r in t) n.writeIntLE(t[r], r);
                  this.write(n, e);
                }),
                (t.prototype.motorPowerCommand = function (t, e) {
                  this.write(this.encodeMotorPower(t, e));
                }),
                (t.prototype.encodeMotorPower = function (t, e) {
                  void 0 === e && (e = 100);
                  var n = 'string' == typeof t ? this.port2num[t] : t,
                    r = o.Buffer.from([9, 0, 129, n, 17, 7, 0, 100, 3]);
                  return r.writeInt8(e, 6), r;
                }),
                (t.prototype.led = function (t, e) {
                  this.write(this.encodeLed(t), e);
                }),
                (t.prototype.subscribe = function (t, e, n) {
                  void 0 === e && (e = 0),
                    'function' == typeof e && ((n = e), (e = 0));
                  var r = 'string' == typeof t ? this.port2num[t] : t;
                  this.write(
                    o.Buffer.from([10, 0, 65, r, e, 1, 0, 0, 0, 1]),
                    n
                  );
                }),
                (t.prototype.unsubscribe = function (t, e, n) {
                  void 0 === e && (e = 0),
                    'function' == typeof e && ((n = e), (e = 0));
                  var r = 'string' == typeof t ? this.port2num[t] : t;
                  this.write(
                    o.Buffer.from([10, 0, 65, r, e, 1, 0, 0, 0, 0]),
                    n
                  );
                }),
                (t.prototype.subscribeAll = function () {
                  var t = this;
                  Object.entries(this.ports).forEach(function (e) {
                    var n = e[0],
                      r = e[1];
                    'DISTANCE' === r.deviceType
                      ? t.subscribe(parseInt(n, 10), 8)
                      : 'TILT' === r.deviceType
                        ? t.subscribe(parseInt(n, 10), 0)
                        : 'IMOTOR' === r.deviceType || 'MOTOR' === r.deviceType
                          ? t.subscribe(parseInt(n, 10), 2)
                          : t.logDebug('Port subscribtion not sent: ' + n);
                  });
                }),
                (t.prototype.write = function (t, e) {
                  if ('string' == typeof t) {
                    var n = [];
                    t.split(' ').forEach(function (t) {
                      n.push(parseInt(t, 16));
                    }),
                      (t = o.Buffer.from(n));
                  }
                  this.writeCue.push({ data: t, secondArg: !0, callback: e }),
                    this.writeFromCue();
                }),
                (t.prototype.writeFromCue = function () {
                  var t = this;
                  if (0 !== this.writeCue.length && !this.isWriting) {
                    var e = this.writeCue.shift();
                    this.logDebug('Writing to device', e),
                      (this.isWriting = !0),
                      this.bluetooth
                        .writeValue(e.data)
                        .then(function () {
                          (t.isWriting = !1),
                            'function' == typeof e.callback && e.callback();
                        })
                        .catch(function (n) {
                          (t.isWriting = !1),
                            t.log(
                              'Error while writing: ' +
                                e.data +
                                ' - Error ' +
                                n.toString()
                            );
                        })
                        .finally(function () {
                          t.writeFromCue();
                        });
                  }
                }),
                (t.prototype.encodeMotorTimeMulti = function (t, e, n, r) {
                  void 0 === n && (n = 100), void 0 === r && (r = -100);
                  var i = o.Buffer.from([
                    13,
                    0,
                    129,
                    t,
                    17,
                    10,
                    0,
                    0,
                    0,
                    0,
                    100,
                    127,
                    3
                  ]);
                  return (
                    i.writeUInt16LE(1e3 * e, 6),
                    i.writeInt8(n, 8),
                    i.writeInt8(r, 9),
                    i
                  );
                }),
                (t.prototype.encodeMotorTime = function (t, e, n) {
                  void 0 === n && (n = 100);
                  var r = o.Buffer.from([
                    12,
                    0,
                    129,
                    t,
                    17,
                    9,
                    0,
                    0,
                    0,
                    100,
                    127,
                    3
                  ]);
                  return r.writeUInt16LE(1e3 * e, 6), r.writeInt8(n, 8), r;
                }),
                (t.prototype.encodeMotorAngleMulti = function (t, e, n, r) {
                  void 0 === n && (n = 100), void 0 === r && (r = -100);
                  var i = o.Buffer.from([
                    15,
                    0,
                    129,
                    t,
                    17,
                    12,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    100,
                    127,
                    3
                  ]);
                  return (
                    i.writeUInt32LE(e, 6),
                    i.writeInt8(n, 10),
                    i.writeInt8(r, 11),
                    i
                  );
                }),
                (t.prototype.encodeMotorAngle = function (t, e, n) {
                  void 0 === n && (n = 100);
                  var r = o.Buffer.from([
                    14,
                    0,
                    129,
                    t,
                    17,
                    11,
                    0,
                    0,
                    0,
                    0,
                    0,
                    100,
                    127,
                    3
                  ]);
                  return r.writeUInt32LE(e, 6), r.writeInt8(n, 10), r;
                }),
                (t.prototype.encodeLed = function (t) {
                  'boolean' == typeof t && (t = t ? 'white' : 'off');
                  var e = 'string' == typeof t ? this.ledColors.indexOf(t) : t;
                  return o.Buffer.from([8, 0, 129, 50, 17, 81, 0, e]);
                }),
                t
              );
            })();
          e.Hub = i;
        },
        920: function (t, e, n) {
          'use strict';
          var r,
            o =
              (this && this.__extends) ||
              ((r = function (t, e) {
                return (
                  (r =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (t, e) {
                        t.__proto__ = e;
                      }) ||
                    function (t, e) {
                      for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
                    }),
                  r(t, e)
                );
              }),
              function (t, e) {
                function n() {
                  this.constructor = t;
                }
                r(t, e),
                  (t.prototype =
                    null === e
                      ? Object.create(e)
                      : ((n.prototype = e.prototype), new n()));
              }),
            i =
              (this && this.__awaiter) ||
              function (t, e, n, r) {
                return new (n || (n = Promise))(function (o, i) {
                  function s(t) {
                    try {
                      c(r.next(t));
                    } catch (t) {
                      i(t);
                    }
                  }
                  function u(t) {
                    try {
                      c(r.throw(t));
                    } catch (t) {
                      i(t);
                    }
                  }
                  function c(t) {
                    var e;
                    t.done
                      ? o(t.value)
                      : ((e = t.value),
                        e instanceof n
                          ? e
                          : new n(function (t) {
                              t(e);
                            })).then(s, u);
                  }
                  c((r = r.apply(t, e || [])).next());
                });
              },
            s =
              (this && this.__generator) ||
              function (t, e) {
                var n,
                  r,
                  o,
                  i,
                  s = {
                    label: 0,
                    sent: function () {
                      if (1 & o[0]) throw o[1];
                      return o[1];
                    },
                    trys: [],
                    ops: []
                  };
                return (
                  (i = { next: u(0), throw: u(1), return: u(2) }),
                  'function' == typeof Symbol &&
                    (i[Symbol.iterator] = function () {
                      return this;
                    }),
                  i
                );
                function u(i) {
                  return function (u) {
                    return (function (i) {
                      if (n)
                        throw new TypeError('Generator is already executing.');
                      for (; s; )
                        try {
                          if (
                            ((n = 1),
                            r &&
                              (o =
                                2 & i[0]
                                  ? r.return
                                  : i[0]
                                    ? r.throw ||
                                      ((o = r.return) && o.call(r), 0)
                                    : r.next) &&
                              !(o = o.call(r, i[1])).done)
                          )
                            return o;
                          switch (
                            ((r = 0), o && (i = [2 & i[0], o.value]), i[0])
                          ) {
                            case 0:
                            case 1:
                              o = i;
                              break;
                            case 4:
                              return s.label++, { value: i[1], done: !1 };
                            case 5:
                              s.label++, (r = i[1]), (i = [0]);
                              continue;
                            case 7:
                              (i = s.ops.pop()), s.trys.pop();
                              continue;
                            default:
                              if (
                                !(
                                  (o =
                                    (o = s.trys).length > 0 &&
                                    o[o.length - 1]) ||
                                  (6 !== i[0] && 2 !== i[0])
                                )
                              ) {
                                s = 0;
                                continue;
                              }
                              if (
                                3 === i[0] &&
                                (!o || (i[1] > o[0] && i[1] < o[3]))
                              ) {
                                s.label = i[1];
                                break;
                              }
                              if (6 === i[0] && s.label < o[1]) {
                                (s.label = o[1]), (o = i);
                                break;
                              }
                              if (o && s.label < o[2]) {
                                (s.label = o[2]), s.ops.push(i);
                                break;
                              }
                              o[2] && s.ops.pop(), s.trys.pop();
                              continue;
                          }
                          i = e.call(t, s);
                        } catch (t) {
                          (i = [6, t]), (r = 0);
                        } finally {
                          n = o = 0;
                        }
                      if (5 & i[0]) throw i[1];
                      return { value: i[0] ? i[1] : void 0, done: !0 };
                    })([i, u]);
                  };
                }
              };
          Object.defineProperty(e, '__esModule', { value: !0 }),
            (e.HubAsync = e.DEFAULT_CONFIG = void 0);
          var u = n(917),
            c = 1e3 / 3;
          e.DEFAULT_CONFIG = {
            METRIC_MODIFIER: 28.5,
            TURN_MODIFIER: 2.56,
            DRIVE_SPEED: 25,
            TURN_SPEED: 20,
            DEFAULT_STOP_DISTANCE: 105,
            DEFAULT_CLEAR_DISTANCE: 120,
            LEFT_MOTOR: 'A',
            RIGHT_MOTOR: 'B',
            VALID_MOTORS: ['A', 'B']
          };
          var a = function (t) {
              if (
                ((t.leftMotor = t.leftMotor || e.DEFAULT_CONFIG.LEFT_MOTOR),
                (t.rightMotor = t.rightMotor || e.DEFAULT_CONFIG.RIGHT_MOTOR),
                !e.DEFAULT_CONFIG.VALID_MOTORS.includes(t.leftMotor))
              )
                throw Error('Define left port port correctly');
              if (!e.DEFAULT_CONFIG.VALID_MOTORS.includes(t.rightMotor))
                throw Error('Define right port port correctly');
              if (t.leftMotor === t.rightMotor)
                throw Error('Left and right motor can not be same');
              (t.distanceModifier =
                t.distanceModifier || e.DEFAULT_CONFIG.METRIC_MODIFIER),
                (t.turnModifier =
                  t.turnModifier || e.DEFAULT_CONFIG.TURN_MODIFIER),
                (t.driveSpeed = t.driveSpeed || e.DEFAULT_CONFIG.DRIVE_SPEED),
                (t.turnSpeed = t.turnSpeed || e.DEFAULT_CONFIG.TURN_SPEED),
                (t.defaultStopDistance =
                  t.defaultStopDistance ||
                  e.DEFAULT_CONFIG.DEFAULT_STOP_DISTANCE),
                (t.defaultClearDistance =
                  t.defaultClearDistance ||
                  e.DEFAULT_CONFIG.DEFAULT_CLEAR_DISTANCE);
            },
            l = function (t, e, n) {
              var r = this;
              return (
                void 0 === e &&
                  (e = function (t) {
                    return r[t];
                  }),
                void 0 === n && (n = 0),
                e.bind(this)(t)
                  ? Promise.resolve(this[t])
                  : new Promise(function (o, u) {
                      setTimeout(function () {
                        return i(r, void 0, void 0, function () {
                          var r;
                          return s(this, function (i) {
                            switch (i.label) {
                              case 0:
                                return (r = o), [4, l.bind(this)(t, e, n)];
                              case 1:
                                return [2, r.apply(void 0, [i.sent()])];
                            }
                          });
                        });
                      }, n + 100);
                    })
              );
            },
            h = (function (t) {
              function e(e, n) {
                var r = t.call(this, e) || this;
                return a(n), (r.configuration = n), r;
              }
              return (
                o(e, t),
                (e.prototype.disconnectAsync = function () {
                  return (
                    this.setDisconnected(), l.bind(this)('hubDisconnected')
                  );
                }),
                (e.prototype.afterInitialization = function () {
                  var t = this;
                  (this.hubDisconnected = null),
                    (this.portData = {
                      A: { angle: 0 },
                      B: { angle: 0 },
                      AB: { angle: 0 },
                      C: { angle: 0 },
                      D: { angle: 0 },
                      LED: { angle: 0 }
                    }),
                    (this.useMetric = !0),
                    (this.modifier = 1),
                    this.emitter.on('rotation', function (e) {
                      return (t.portData[e.port].angle = e.angle);
                    }),
                    this.emitter.on('disconnect', function () {
                      return (t.hubDisconnected = !0);
                    }),
                    this.emitter.on('distance', function (e) {
                      return (t.distance = e);
                    });
                }),
                (e.prototype.ledAsync = function (t) {
                  var e = this;
                  return new Promise(function (n, r) {
                    e.led(t, function () {
                      setTimeout(n, c);
                    });
                  });
                }),
                (e.prototype.motorTimeAsync = function (t, e, n, r) {
                  var o = this;
                  return (
                    void 0 === n && (n = 100),
                    void 0 === r && (r = !1),
                    new Promise(function (i, s) {
                      o.motorTime(t, e, n, function () {
                        setTimeout(i, r ? c + 1e3 * e : c);
                      });
                    })
                  );
                }),
                (e.prototype.motorTimeMultiAsync = function (t, e, n, r) {
                  var o = this;
                  return (
                    void 0 === e && (e = 100),
                    void 0 === n && (n = 100),
                    void 0 === r && (r = !1),
                    new Promise(function (i, s) {
                      o.motorTimeMulti(t, e, n, function () {
                        setTimeout(i, r ? c + 1e3 * t : c);
                      });
                    })
                  );
                }),
                (e.prototype.motorAngleAsync = function (t, e, n, r) {
                  var o = this;
                  return (
                    void 0 === n && (n = 100),
                    void 0 === r && (r = !1),
                    new Promise(function (u, a) {
                      o.motorAngle(t, e, n, function () {
                        return i(o, void 0, void 0, function () {
                          var e;
                          return s(this, function (n) {
                            switch (n.label) {
                              case 0:
                                if (!r) return [3, 5];
                                (e = void 0), (n.label = 1);
                              case 1:
                                return (
                                  (e = this.portData[t].angle),
                                  [
                                    4,
                                    new Promise(function (t) {
                                      return setTimeout(t, c);
                                    })
                                  ]
                                );
                              case 2:
                                n.sent(), (n.label = 3);
                              case 3:
                                if (this.portData[t].angle !== e) return [3, 1];
                                n.label = 4;
                              case 4:
                                return u(), [3, 6];
                              case 5:
                                setTimeout(u, c), (n.label = 6);
                              case 6:
                                return [2];
                            }
                          });
                        });
                      });
                    })
                  );
                }),
                (e.prototype.motorAngleMultiAsync = function (t, e, n, r) {
                  var o = this;
                  return (
                    void 0 === e && (e = 100),
                    void 0 === n && (n = 100),
                    void 0 === r && (r = !1),
                    new Promise(function (u, a) {
                      o.motorAngleMulti(t, e, n, function () {
                        return i(o, void 0, void 0, function () {
                          var t;
                          return s(this, function (e) {
                            switch (e.label) {
                              case 0:
                                if (!r) return [3, 5];
                                (t = void 0), (e.label = 1);
                              case 1:
                                return (
                                  (t = this.portData.AB.angle),
                                  [
                                    4,
                                    new Promise(function (t) {
                                      return setTimeout(t, c);
                                    })
                                  ]
                                );
                              case 2:
                                e.sent(), (e.label = 3);
                              case 3:
                                if (this.portData.AB.angle !== t) return [3, 1];
                                e.label = 4;
                              case 4:
                                return u(), [3, 6];
                              case 5:
                                setTimeout(u, c), (e.label = 6);
                              case 6:
                                return [2];
                            }
                          });
                        });
                      });
                    })
                  );
                }),
                (e.prototype.useMetricUnits = function () {
                  this.useMetric = !0;
                }),
                (e.prototype.useImperialUnits = function () {
                  this.useMetric = !1;
                }),
                (e.prototype.setFrictionModifier = function (t) {
                  this.modifier = t;
                }),
                (e.prototype.drive = function (t, e) {
                  void 0 === e && (e = !0);
                  var n =
                      Math.abs(t) *
                      ((this.useMetric
                        ? this.configuration.distanceModifier
                        : this.configuration.distanceModifier / 4) *
                        this.modifier),
                    r =
                      this.configuration.driveSpeed *
                      (t > 0 ? 1 : -1) *
                      ('A' === this.configuration.leftMotor ? 1 : -1),
                    o =
                      this.configuration.driveSpeed *
                      (t > 0 ? 1 : -1) *
                      ('A' === this.configuration.leftMotor ? 1 : -1);
                  return this.motorAngleMultiAsync(n, r, o, e);
                }),
                (e.prototype.turn = function (t, e) {
                  void 0 === e && (e = !0);
                  var n = Math.abs(t) * this.configuration.turnModifier,
                    r = 'A' === this.configuration.leftMotor ? 1 : -1,
                    o = this.configuration.turnSpeed * (t > 0 ? 1 : -1) * r,
                    i = this.configuration.turnSpeed * (t > 0 ? -1 : 1) * r,
                    s = 'A' === this.configuration.leftMotor ? o : i,
                    u = 'A' === this.configuration.leftMotor ? i : o;
                  return this.motorAngleMultiAsync(n, s, u, e);
                }),
                (e.prototype.driveUntil = function (t, e) {
                  return (
                    void 0 === t && (t = 0),
                    void 0 === e && (e = !0),
                    i(this, void 0, void 0, function () {
                      var n,
                        r,
                        o,
                        i = this;
                      return s(this, function (s) {
                        switch (s.label) {
                          case 0:
                            return (
                              (n =
                                0 !== t
                                  ? this.useMetric
                                    ? t
                                    : 2.54 * t
                                  : this.configuration.defaultStopDistance),
                              (r =
                                'A' === this.configuration.leftMotor ? 1 : -1),
                              (o =
                                1 === r
                                  ? function () {
                                      return n >= i.distance;
                                    }
                                  : function () {
                                      return n <= i.distance;
                                    }),
                              this.motorTimeMulti(
                                60,
                                this.configuration.driveSpeed * r,
                                this.configuration.driveSpeed * r
                              ),
                              e ? [4, l.bind(this)('distance', o)] : [3, 3]
                            );
                          case 1:
                            return s.sent(), [4, this.motorAngleMultiAsync(0)];
                          case 2:
                            return s.sent(), [3, 4];
                          case 3:
                            return [
                              2,
                              l
                                .bind(this)('distance', o)
                                .then(function (t) {
                                  return i.motorAngleMulti(0, 0, 0);
                                })
                            ];
                          case 4:
                            return [2];
                        }
                      });
                    })
                  );
                }),
                (e.prototype.turnUntil = function (t, e) {
                  return (
                    void 0 === t && (t = 1),
                    void 0 === e && (e = !0),
                    i(this, void 0, void 0, function () {
                      var n,
                        r = this;
                      return s(this, function (o) {
                        switch (o.label) {
                          case 0:
                            return (
                              (n = t > 0 ? 1 : -1),
                              this.turn(360 * n, !1),
                              e
                                ? [
                                    4,
                                    l.bind(this)('distance', function () {
                                      return (
                                        r.distance >=
                                        r.configuration.defaultClearDistance
                                      );
                                    })
                                  ]
                                : [3, 3]
                            );
                          case 1:
                            return o.sent(), [4, this.turn(0, !1)];
                          case 2:
                            return o.sent(), [3, 4];
                          case 3:
                            return [
                              2,
                              l
                                .bind(this)('distance', function () {
                                  return (
                                    r.distance >=
                                    r.configuration.defaultClearDistance
                                  );
                                })
                                .then(function (t) {
                                  return r.turn(0, !1);
                                })
                            ];
                          case 4:
                            return [2];
                        }
                      });
                    })
                  );
                }),
                (e.prototype.updateConfiguration = function (t) {
                  a(t), (this.configuration = t);
                }),
                e
              );
            })(u.Hub);
          e.HubAsync = h;
        },
        334: function (t, e, n) {
          'use strict';
          var r =
              (this && this.__awaiter) ||
              function (t, e, n, r) {
                return new (n || (n = Promise))(function (o, i) {
                  function s(t) {
                    try {
                      c(r.next(t));
                    } catch (t) {
                      i(t);
                    }
                  }
                  function u(t) {
                    try {
                      c(r.throw(t));
                    } catch (t) {
                      i(t);
                    }
                  }
                  function c(t) {
                    var e;
                    t.done
                      ? o(t.value)
                      : ((e = t.value),
                        e instanceof n
                          ? e
                          : new n(function (t) {
                              t(e);
                            })).then(s, u);
                  }
                  c((r = r.apply(t, e || [])).next());
                });
              },
            o =
              (this && this.__generator) ||
              function (t, e) {
                var n,
                  r,
                  o,
                  i,
                  s = {
                    label: 0,
                    sent: function () {
                      if (1 & o[0]) throw o[1];
                      return o[1];
                    },
                    trys: [],
                    ops: []
                  };
                return (
                  (i = { next: u(0), throw: u(1), return: u(2) }),
                  'function' == typeof Symbol &&
                    (i[Symbol.iterator] = function () {
                      return this;
                    }),
                  i
                );
                function u(i) {
                  return function (u) {
                    return (function (i) {
                      if (n)
                        throw new TypeError('Generator is already executing.');
                      for (; s; )
                        try {
                          if (
                            ((n = 1),
                            r &&
                              (o =
                                2 & i[0]
                                  ? r.return
                                  : i[0]
                                    ? r.throw ||
                                      ((o = r.return) && o.call(r), 0)
                                    : r.next) &&
                              !(o = o.call(r, i[1])).done)
                          )
                            return o;
                          switch (
                            ((r = 0), o && (i = [2 & i[0], o.value]), i[0])
                          ) {
                            case 0:
                            case 1:
                              o = i;
                              break;
                            case 4:
                              return s.label++, { value: i[1], done: !1 };
                            case 5:
                              s.label++, (r = i[1]), (i = [0]);
                              continue;
                            case 7:
                              (i = s.ops.pop()), s.trys.pop();
                              continue;
                            default:
                              if (
                                !(
                                  (o =
                                    (o = s.trys).length > 0 &&
                                    o[o.length - 1]) ||
                                  (6 !== i[0] && 2 !== i[0])
                                )
                              ) {
                                s = 0;
                                continue;
                              }
                              if (
                                3 === i[0] &&
                                (!o || (i[1] > o[0] && i[1] < o[3]))
                              ) {
                                s.label = i[1];
                                break;
                              }
                              if (6 === i[0] && s.label < o[1]) {
                                (s.label = o[1]), (o = i);
                                break;
                              }
                              if (o && s.label < o[2]) {
                                (s.label = o[2]), s.ops.push(i);
                                break;
                              }
                              o[2] && s.ops.pop(), s.trys.pop();
                              continue;
                          }
                          i = e.call(t, s);
                        } catch (t) {
                          (i = [6, t]), (r = 0);
                        } finally {
                          n = o = 0;
                        }
                      if (5 & i[0]) throw i[1];
                      return { value: i[0] ? i[1] : void 0, done: !0 };
                    })([i, u]);
                  };
                }
              };
          Object.defineProperty(e, '__esModule', { value: !0 });
          var i = n(443),
            s = n(920),
            u = n(433),
            c = (function () {
              function t() {
                (this.logDebug = function (t) {}),
                  (this.deviceInfo = {
                    ports: {
                      A: { action: '', angle: 0 },
                      B: { action: '', angle: 0 },
                      AB: { action: '', angle: 0 },
                      C: { action: '', angle: 0 },
                      D: { action: '', angle: 0 },
                      LED: { action: '', angle: 0 }
                    },
                    tilt: { roll: 0, pitch: 0 },
                    distance: Number.MAX_SAFE_INTEGER,
                    rssi: 0,
                    color: '',
                    error: '',
                    connected: !1
                  }),
                  (this.controlData = {
                    input: null,
                    speed: 0,
                    turnAngle: 0,
                    tilt: { roll: 0, pitch: 0 },
                    forceState: null,
                    updateInputMode: null,
                    controlUpdateTime: void 0,
                    state: void 0
                  });
              }
              return (
                (t.prototype.connect = function (t) {
                  return (
                    void 0 === t && (t = {}),
                    r(this, void 0, void 0, function () {
                      var e, n;
                      return o(this, function (r) {
                        switch (r.label) {
                          case 0:
                            return (
                              r.trys.push([0, 2, , 3]),
                              (this.configuration = t),
                              [
                                4,
                                i.BoostConnector.connect(
                                  this.handleGattDisconnect.bind(this)
                                )
                              ]
                            );
                          case 1:
                            return (
                              (e = r.sent()),
                              this.initHub(e, this.configuration),
                              [3, 3]
                            );
                          case 2:
                            return (
                              (n = r.sent()),
                              console.log('Error from connect: ' + n),
                              [3, 3]
                            );
                          case 3:
                            return [2];
                        }
                      });
                    })
                  );
                }),
                (t.prototype.initHub = function (t, e) {
                  return r(this, void 0, void 0, function () {
                    var n = this;
                    return o(this, function (i) {
                      switch (i.label) {
                        case 0:
                          return (
                            (this.hub = new s.HubAsync(t, e)),
                            (this.hub.logDebug = this.logDebug),
                            this.hub.emitter.on('disconnect', function (t) {
                              return r(n, void 0, void 0, function () {
                                return o(this, function (t) {
                                  return [2];
                                });
                              });
                            }),
                            this.hub.emitter.on('connect', function (t) {
                              return r(n, void 0, void 0, function () {
                                return o(this, function (t) {
                                  switch (t.label) {
                                    case 0:
                                      return (
                                        this.hub.afterInitialization(),
                                        [4, this.hub.ledAsync('white')]
                                      );
                                    case 1:
                                      return (
                                        t.sent(),
                                        this.logDebug('Connected'),
                                        [2]
                                      );
                                  }
                                });
                              });
                            }),
                            (this.hubControl = new u.HubControl(
                              this.deviceInfo,
                              this.controlData,
                              e
                            )),
                            [4, this.hubControl.start(this.hub)]
                          );
                        case 1:
                          return (
                            i.sent(),
                            (this.updateTimer = setInterval(function () {
                              n.hubControl.update();
                            }, 100)),
                            [2]
                          );
                      }
                    });
                  });
                }),
                (t.prototype.handleGattDisconnect = function () {
                  return r(this, void 0, void 0, function () {
                    return o(this, function (t) {
                      return (
                        this.logDebug('handleGattDisconnect'),
                        !1 === this.deviceInfo.connected ||
                          (this.hub.setDisconnected(),
                          (this.deviceInfo.connected = !1),
                          clearInterval(this.updateTimer),
                          this.logDebug('Disconnected')),
                        [2]
                      );
                    });
                  });
                }),
                (t.prototype.changeLed = function () {
                  return r(this, void 0, void 0, function () {
                    return o(this, function (t) {
                      switch (t.label) {
                        case 0:
                          return this.hub && !1 !== this.hub.connected
                            ? ((this.color =
                                'pink' === this.color ? 'orange' : 'pink'),
                              [4, this.hub.ledAsync(this.color)])
                            : [2];
                        case 1:
                          return t.sent(), [2];
                      }
                    });
                  });
                }),
                (t.prototype.driveToDirection = function (t) {
                  return (
                    void 0 === t && (t = 1),
                    r(this, void 0, void 0, function () {
                      return o(this, function (e) {
                        switch (e.label) {
                          case 0:
                            return this.preCheck()
                              ? t > 0
                                ? [4, this.hub.driveUntil()]
                                : [3, 2]
                              : [2];
                          case 1:
                          case 3:
                            return [2, e.sent()];
                          case 2:
                            return [4, this.hub.drive(-1e4)];
                        }
                      });
                    })
                  );
                }),
                (t.prototype.disconnect = function () {
                  if (this.hub && !1 !== this.hub.connected)
                    return (
                      this.hub.setDisconnected(), i.BoostConnector.disconnect()
                    );
                }),
                (t.prototype.ai = function () {
                  this.hub &&
                    !1 !== this.hub.connected &&
                    this.hubControl.setNextState('Drive');
                }),
                (t.prototype.stop = function () {
                  return r(this, void 0, void 0, function () {
                    return o(this, function (t) {
                      switch (t.label) {
                        case 0:
                          return this.preCheck()
                            ? ((this.controlData.speed = 0),
                              (this.controlData.turnAngle = 0),
                              [4, this.hub.motorTimeMultiAsync(1, 0, 0)])
                            : [2];
                        case 1:
                          return [2, t.sent()];
                      }
                    });
                  });
                }),
                (t.prototype.updateConfiguration = function (t) {
                  this.hub &&
                    (this.hub.updateConfiguration(t),
                    this.hubControl.updateConfiguration(t));
                }),
                (t.prototype.led = function (t) {
                  this.preCheck() && this.hub.led(t);
                }),
                (t.prototype.ledAsync = function (t) {
                  return r(this, void 0, void 0, function () {
                    return o(this, function (e) {
                      switch (e.label) {
                        case 0:
                          return this.preCheck()
                            ? [4, this.hub.ledAsync(t)]
                            : [2];
                        case 1:
                          return [2, e.sent()];
                      }
                    });
                  });
                }),
                (t.prototype.motorTime = function (t, e, n) {
                  void 0 === n && (n = 100),
                    this.preCheck() && this.hub.motorTime(t, e, n);
                }),
                (t.prototype.motorTimeAsync = function (t, e, n, i) {
                  return (
                    void 0 === n && (n = 100),
                    void 0 === i && (i = !0),
                    r(this, void 0, void 0, function () {
                      return o(this, function (r) {
                        switch (r.label) {
                          case 0:
                            return this.preCheck()
                              ? [4, this.hub.motorTimeAsync(t, e, n, i)]
                              : [2];
                          case 1:
                            return r.sent(), [2];
                        }
                      });
                    })
                  );
                }),
                (t.prototype.motorTimeMulti = function (t, e, n) {
                  void 0 === e && (e = 100),
                    void 0 === n && (n = 100),
                    this.preCheck() && this.hub.motorTimeMulti(t, e, n);
                }),
                (t.prototype.motorTimeMultiAsync = function (t, e, n, i) {
                  return (
                    void 0 === e && (e = 100),
                    void 0 === n && (n = 100),
                    void 0 === i && (i = !0),
                    r(this, void 0, void 0, function () {
                      return o(this, function (r) {
                        switch (r.label) {
                          case 0:
                            return this.preCheck()
                              ? [4, this.hub.motorTimeMultiAsync(t, e, n, i)]
                              : [2];
                          case 1:
                            return r.sent(), [2];
                        }
                      });
                    })
                  );
                }),
                (t.prototype.motorAngle = function (t, e, n) {
                  void 0 === n && (n = 100),
                    this.preCheck() && this.hub.motorAngle(t, e, n);
                }),
                (t.prototype.motorAngleAsync = function (t, e, n, i) {
                  return (
                    void 0 === n && (n = 100),
                    void 0 === i && (i = !0),
                    r(this, void 0, void 0, function () {
                      return o(this, function (r) {
                        switch (r.label) {
                          case 0:
                            return this.preCheck()
                              ? [4, this.hub.motorAngleAsync(t, e, n, i)]
                              : [2];
                          case 1:
                            return r.sent(), [2];
                        }
                      });
                    })
                  );
                }),
                (t.prototype.motorAngleMulti = function (t, e, n) {
                  void 0 === e && (e = 100),
                    void 0 === n && (n = 100),
                    this.preCheck() && this.hub.motorAngleMulti(t, e, n);
                }),
                (t.prototype.motorAngleMultiAsync = function (t, e, n, i) {
                  return (
                    void 0 === e && (e = 100),
                    void 0 === n && (n = 100),
                    void 0 === i && (i = !0),
                    r(this, void 0, void 0, function () {
                      return o(this, function (r) {
                        switch (r.label) {
                          case 0:
                            return this.preCheck()
                              ? [4, this.hub.motorAngleMultiAsync(t, e, n, i)]
                              : [2];
                          case 1:
                            return r.sent(), [2];
                        }
                      });
                    })
                  );
                }),
                (t.prototype.drive = function (t, e) {
                  return (
                    void 0 === e && (e = !0),
                    r(this, void 0, void 0, function () {
                      return o(this, function (n) {
                        switch (n.label) {
                          case 0:
                            return this.preCheck()
                              ? [4, this.hub.drive(t, e)]
                              : [2];
                          case 1:
                            return [2, n.sent()];
                        }
                      });
                    })
                  );
                }),
                (t.prototype.turn = function (t, e) {
                  return (
                    void 0 === e && (e = !0),
                    r(this, void 0, void 0, function () {
                      return o(this, function (n) {
                        switch (n.label) {
                          case 0:
                            return this.preCheck()
                              ? [4, this.hub.turn(t, e)]
                              : [2];
                          case 1:
                            return [2, n.sent()];
                        }
                      });
                    })
                  );
                }),
                (t.prototype.driveUntil = function (t, e) {
                  return (
                    void 0 === t && (t = 0),
                    void 0 === e && (e = !0),
                    r(this, void 0, void 0, function () {
                      return o(this, function (n) {
                        switch (n.label) {
                          case 0:
                            return this.preCheck()
                              ? [4, this.hub.driveUntil(t, e)]
                              : [2];
                          case 1:
                            return [2, n.sent()];
                        }
                      });
                    })
                  );
                }),
                (t.prototype.turnUntil = function (t, e) {
                  return (
                    void 0 === t && (t = 1),
                    void 0 === e && (e = !0),
                    r(this, void 0, void 0, function () {
                      return o(this, function (n) {
                        switch (n.label) {
                          case 0:
                            return this.preCheck()
                              ? [4, this.hub.turnUntil(t, e)]
                              : [2];
                          case 1:
                            return [2, n.sent()];
                        }
                      });
                    })
                  );
                }),
                (t.prototype.rawCommand = function (t) {
                  if (this.preCheck()) return this.hub.rawCommand(t);
                }),
                (t.prototype.preCheck = function () {
                  return !(
                    !this.hub ||
                    !1 === this.hub.connected ||
                    (this.hubControl.setNextState('Manual'), 0)
                  );
                }),
                t
              );
            })();
          e.default = c;
        },
        204: (t, e, n) => {
          var r = n(379),
            o = n(889);
          'string' == typeof (o = o.__esModule ? o.default : o) &&
            (o = [[t.id, o, '']]);
          r(o, { insert: 'head', singleton: !1 }), (t.exports = o.locals || {});
        },
        379: (t, e, n) => {
          'use strict';
          var r,
            o = (function () {
              var t = {};
              return function (e) {
                if (void 0 === t[e]) {
                  var n = document.querySelector(e);
                  if (
                    window.HTMLIFrameElement &&
                    n instanceof window.HTMLIFrameElement
                  )
                    try {
                      n = n.contentDocument.head;
                    } catch (t) {
                      n = null;
                    }
                  t[e] = n;
                }
                return t[e];
              };
            })(),
            i = [];
          function s(t) {
            for (var e = -1, n = 0; n < i.length; n++)
              if (i[n].identifier === t) {
                e = n;
                break;
              }
            return e;
          }
          function u(t, e) {
            for (var n = {}, r = [], o = 0; o < t.length; o++) {
              var u = t[o],
                c = e.base ? u[0] + e.base : u[0],
                a = n[c] || 0,
                l = ''.concat(c, ' ').concat(a);
              n[c] = a + 1;
              var h = s(l),
                f = { css: u[1], media: u[2], sourceMap: u[3] };
              -1 !== h
                ? (i[h].references++, i[h].updater(f))
                : i.push({ identifier: l, updater: v(f, e), references: 1 }),
                r.push(l);
            }
            return r;
          }
          function c(t) {
            var e = document.createElement('style'),
              r = t.attributes || {};
            if (void 0 === r.nonce) {
              var i = n.nc;
              i && (r.nonce = i);
            }
            if (
              (Object.keys(r).forEach(function (t) {
                e.setAttribute(t, r[t]);
              }),
              'function' == typeof t.insert)
            )
              t.insert(e);
            else {
              var s = o(t.insert || 'head');
              if (!s)
                throw new Error(
                  "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid."
                );
              s.appendChild(e);
            }
            return e;
          }
          var a,
            l =
              ((a = []),
              function (t, e) {
                return (a[t] = e), a.filter(Boolean).join('\n');
              });
          function h(t, e, n, r) {
            var o = n
              ? ''
              : r.media
                ? '@media '.concat(r.media, ' {').concat(r.css, '}')
                : r.css;
            if (t.styleSheet) t.styleSheet.cssText = l(e, o);
            else {
              var i = document.createTextNode(o),
                s = t.childNodes;
              s[e] && t.removeChild(s[e]),
                s.length ? t.insertBefore(i, s[e]) : t.appendChild(i);
            }
          }
          function f(t, e, n) {
            var r = n.css,
              o = n.media,
              i = n.sourceMap;
            if (
              (o ? t.setAttribute('media', o) : t.removeAttribute('media'),
              i &&
                'undefined' != typeof btoa &&
                (r +=
                  '\n/*# sourceMappingURL=data:application/json;base64,'.concat(
                    btoa(unescape(encodeURIComponent(JSON.stringify(i)))),
                    ' */'
                  )),
              t.styleSheet)
            )
              t.styleSheet.cssText = r;
            else {
              for (; t.firstChild; ) t.removeChild(t.firstChild);
              t.appendChild(document.createTextNode(r));
            }
          }
          var p = null,
            d = 0;
          function v(t, e) {
            var n, r, o;
            if (e.singleton) {
              var i = d++;
              (n = p || (p = c(e))),
                (r = h.bind(null, n, i, !1)),
                (o = h.bind(null, n, i, !0));
            } else
              (n = c(e)),
                (r = f.bind(null, n, e)),
                (o = function () {
                  !(function (t) {
                    if (null === t.parentNode) return !1;
                    t.parentNode.removeChild(t);
                  })(n);
                });
            return (
              r(t),
              function (e) {
                if (e) {
                  if (
                    e.css === t.css &&
                    e.media === t.media &&
                    e.sourceMap === t.sourceMap
                  )
                    return;
                  r((t = e));
                } else o();
              }
            );
          }
          t.exports = function (t, e) {
            (e = e || {}).singleton ||
              'boolean' == typeof e.singleton ||
              (e.singleton =
                (void 0 === r &&
                  (r = Boolean(
                    window && document && document.all && !window.atob
                  )),
                r));
            var n = u((t = t || []), e);
            return function (t) {
              if (
                ((t = t || []),
                '[object Array]' === Object.prototype.toString.call(t))
              ) {
                for (var r = 0; r < n.length; r++) {
                  var o = s(n[r]);
                  i[o].references--;
                }
                for (var c = u(t, e), a = 0; a < n.length; a++) {
                  var l = s(n[a]);
                  0 === i[l].references && (i[l].updater(), i.splice(l, 1));
                }
                n = c;
              }
            };
          };
        },
        607: function (t, e, n) {
          'use strict';
          var r =
              (this && this.__createBinding) ||
              (Object.create
                ? function (t, e, n, r) {
                    void 0 === r && (r = n),
                      Object.defineProperty(t, r, {
                        enumerable: !0,
                        get: function () {
                          return e[n];
                        }
                      });
                  }
                : function (t, e, n, r) {
                    void 0 === r && (r = n), (t[r] = e[n]);
                  }),
            o =
              (this && this.__exportStar) ||
              function (t, e) {
                for (var n in t)
                  'default' === n ||
                    Object.prototype.hasOwnProperty.call(e, n) ||
                    r(e, t, n);
              };
          Object.defineProperty(e, '__esModule', { value: !0 }),
            o(n(412), e),
            o(n(891), e);
        },
        412: (t, e, n) => {
          'use strict';
          Object.defineProperty(e, '__esModule', { value: !0 }),
            (e.MODULE_NAME = e.MODULE_VERSION = void 0);
          const r = n(147);
          (e.MODULE_VERSION = r.version), (e.MODULE_NAME = r.name);
        },
        891: function (t, e, n) {
          'use strict';
          var r =
              (this && this.__awaiter) ||
              function (t, e, n, r) {
                return new (n || (n = Promise))(function (o, i) {
                  function s(t) {
                    try {
                      c(r.next(t));
                    } catch (t) {
                      i(t);
                    }
                  }
                  function u(t) {
                    try {
                      c(r.throw(t));
                    } catch (t) {
                      i(t);
                    }
                  }
                  function c(t) {
                    var e;
                    t.done
                      ? o(t.value)
                      : ((e = t.value),
                        e instanceof n
                          ? e
                          : new n(function (t) {
                              t(e);
                            })).then(s, u);
                  }
                  c((r = r.apply(t, e || [])).next());
                });
              },
            o =
              (this && this.__importDefault) ||
              function (t) {
                return t && t.__esModule ? t : { default: t };
              };
          Object.defineProperty(e, '__esModule', { value: !0 }),
            (e.LegoBoostView = e.LegoBoostModel = void 0);
          const i = n(146),
            s = n(412);
          n(204);
          const u = o(n(334)),
            c = {};
          class a extends i.DOMWidgetModel {
            constructor() {
              super(...arguments),
                (this.polling_frame = 0),
                (this.polling_is_running = !1),
                (this.stop_polling = !1),
                (this.lane_cmd_index = [0]),
                (this.lanes = [
                  Promise.resolve(),
                  Promise.resolve(),
                  Promise.resolve()
                ]);
            }
            defaults() {
              return Object.assign(Object.assign({}, super.defaults()), {
                _model_name: a.model_name,
                _model_module: a.model_module,
                _model_module_version: a.model_module_version,
                _view_name: a.view_name,
                _view_module: a.view_module,
                _view_module_version: a.view_module_version,
                _device_info: {},
                name: 'device1',
                n_lanes: 3
              });
            }
            save_device_info() {
              const t = Object.assign(
                {
                  polling_frame: this.polling_frame,
                  lane_cmd_index: this.lane_cmd_index
                },
                this.boost.deviceInfo
              );
              this.set('_device_info', t), this.save_changes();
            }
            poll() {
              (this.polling_frame += 1), this.save_device_info();
            }
            polling() {
              this.poll(),
                this.stop_polling
                  ? (this.polling_is_running = !1)
                  : ((this.polling_is_running = !0),
                    setTimeout(this.polling.bind(this), 200));
            }
            initialize(t, e) {
              super.initialize(t, e);
              const n = this.get('n_lanes');
              console.log(`initialize with n_lanes=${n}`, this);
              const o = this.get('name');
              console.log(`initialize with name=${o}`),
                o in c || (c[o] = new u.default()),
                (this.boost = c[o]),
                this.on('msg:custom', (t, e) =>
                  r(this, void 0, void 0, function* () {
                    const n = t.lane;
                    this.lanes[n] = this.lanes[n].then(() =>
                      r(this, void 0, void 0, function* () {
                        const r = t.args,
                          o = t.args,
                          i = this.onCommand(t, e);
                        o && (yield i),
                          r &&
                            ((this.lane_cmd_index[n] += 1),
                            this.save_device_info());
                      })
                    );
                  })
                );
            }
            onCommand(t, e) {
              return r(this, void 0, void 0, function* () {
                console.log('onCommand', t);
                const e = t.command,
                  n = t.args;
                if ('connect' === e) yield this.connect();
                else if ('disconnect' === e) this.disconnect();
                else if (this.boost.deviceInfo.connected)
                  switch (e) {
                    case 'poll':
                      this.poll();
                      break;
                    case 'led':
                      this.boost.led.apply(this.boost, n);
                      break;
                    case 'ledAsync':
                      yield this.boost.ledAsync.apply(this.boost, n);
                      break;
                    case 'motorTime':
                      this.boost.motorTime.apply(this.boost, n);
                      break;
                    case 'motorTimeMulti':
                      this.boost.motorTimeMulti.apply(this.boost, n);
                      break;
                    case 'motorTimeAsync':
                      yield this.boost.motorTimeAsync.apply(this.boost, n);
                      break;
                    case 'motorTimeMultiAsync':
                      yield this.boost.motorTimeMultiAsync.apply(this.boost, n);
                      break;
                    case 'motorAngle':
                      this.boost.motorAngle.apply(this.boost, n);
                      break;
                    case 'motorAngleMulti':
                      this.boost.motorAngleMulti.apply(this.boost, n);
                      break;
                    case 'motorAngleAsync':
                      yield this.boost.motorAngleAsync.apply(this.boost, n);
                      break;
                    case 'motorAngleMultiAsync':
                      yield this.boost.motorAngleMultiAsync.apply(
                        this.boost,
                        n
                      );
                      break;
                    default:
                      console.error(`unknown command "${e}"`);
                  }
                else
                  console.log(
                    `cannot run command ${e} since we are not connected`
                  );
              });
            }
            connect() {
              return r(this, void 0, void 0, function* () {
                const t = t => new Promise(e => setTimeout(e, t));
                if (!this.boost.deviceInfo.connected) {
                  console.log('not connected yet'), yield this.boost.connect();
                  for (
                    let e = 0;
                    e < 30 &&
                    (yield t(100),
                    !this.boost.deviceInfo.connected ||
                      void 0 === this.boost.hub ||
                      !this.boost.hub.connected);
                    e++
                  );
                  yield t(4e3);
                }
                const e = this.get('n_lanes');
                for (; this.lane_cmd_index.length < e; )
                  this.lane_cmd_index.push(0);
                this.polling_is_running ||
                  ((this.polling_is_running = !0),
                  setTimeout(this.polling.bind(this), 200));
              });
            }
            disconnect() {
              console.log('disconnect'), this.boost.disconnect();
            }
            dispose() {
              console.log('remove model');
            }
          }
          (e.LegoBoostModel = a),
            (a.serializers = Object.assign({}, i.DOMWidgetModel.serializers)),
            (a.model_name = 'LegoBoostModel'),
            (a.model_module = s.MODULE_NAME),
            (a.model_module_version = s.MODULE_VERSION),
            (a.view_name = 'LegoBoostView'),
            (a.view_module = s.MODULE_NAME),
            (a.view_module_version = s.MODULE_VERSION);
          class l extends i.DOMWidgetView {
            constructor() {
              super(...arguments),
                (this.isWebBluetoothSupported = !!navigator.bluetooth);
            }
            render() {
              if (
                (this.el.classList.add('custom-widget'),
                !this.isWebBluetoothSupported)
              ) {
                const t = document.createElement('div');
                t.classList.add('error-box'),
                  this.el.appendChild(t),
                  (this.txt_bluetooth = document.createElement('div')),
                  (this.txt_bluetooth.textContent =
                    "Your device doesn't support Web Bluetooth API. Try to turn on Experimental Platform Features from Chrome, by accessing the following link and turning it on: chrome://flags/#enable-experimental-web-platform-features"),
                  t.appendChild(this.txt_bluetooth),
                  console.log(
                    "Your device doesn't support Web Bluetooth API. Try to turn on Experimental Platform Features from Chrome, by accessing the following link and turning it on: chrome://flags/#enable-experimental-web-platform-features"
                  );
              }
              const t = document.createElement('div');
              t.classList.add('box'), this.el.appendChild(t);
              const e = document.createElement('div');
              e.classList.add('box'), this.el.appendChild(e);
              const n = document.createElement('div');
              n.classList.add('box'),
                this.el.appendChild(n),
                (this.txt_connected = document.createElement('div')),
                (this.txt_connected.textContent = 'Disconnected'),
                t.appendChild(this.txt_connected),
                (this.txt_pitch = document.createElement('div')),
                (this.txt_pitch.textContent = 'pitch1:'),
                e.appendChild(this.txt_pitch),
                (this.meter_pitch = document.createElement('meter')),
                e.appendChild(this.meter_pitch),
                (this.meter_pitch.min = -90),
                (this.meter_pitch.max = 90),
                this.el.appendChild(document.createElement('br')),
                (this.txt_roll = document.createElement('div')),
                (this.txt_roll.textContent = 'roll:'),
                e.appendChild(this.txt_roll),
                (this.meter_roll = document.createElement('meter')),
                e.appendChild(this.meter_roll),
                (this.meter_roll.min = -90),
                (this.meter_roll.max = 90),
                e.appendChild(document.createElement('br')),
                (this.txt_distance = document.createElement('div')),
                (this.txt_distance.textContent = 'distance:'),
                e.appendChild(this.txt_distance),
                (this.meter_distance = document.createElement('meter')),
                e.appendChild(this.meter_distance),
                (this.meter_distance.min = 0),
                (this.meter_distance.max = 255),
                e.appendChild(document.createElement('br')),
                (this.txt_color = document.createElement('div')),
                (this.txt_color.textContent = 'color:'),
                e.appendChild(this.txt_color),
                (this.color_color = document.createElement('div')),
                e.appendChild(this.color_color),
                (this.color_color.textContent = 'None'),
                this.changes(),
                n.appendChild(document.createElement('br')),
                (this.txt_port_a = document.createElement('div')),
                (this.txt_port_a.textContent = 'Port A:'),
                n.appendChild(this.txt_port_a),
                n.appendChild(document.createElement('br')),
                (this.txt_port_b = document.createElement('div')),
                (this.txt_port_b.textContent = 'Port B:'),
                n.appendChild(this.txt_port_b),
                n.appendChild(document.createElement('br')),
                (this.txt_port_ab = document.createElement('div')),
                (this.txt_port_ab.textContent = 'Port AB:'),
                n.appendChild(this.txt_port_ab),
                n.appendChild(document.createElement('br')),
                (this.txt_port_c = document.createElement('div')),
                (this.txt_port_c.textContent = 'Port C:'),
                n.appendChild(this.txt_port_c),
                n.appendChild(document.createElement('br')),
                (this.txt_port_d = document.createElement('div')),
                (this.txt_port_d.textContent = 'Port D:'),
                n.appendChild(this.txt_port_d),
                this.model.on('change:_device_info', this.changes, this);
            }
            changes() {
              const t = this.model.boost.deviceInfo;
              if (void 0 !== t.connected && t.connected) {
                (this.txt_connected.textContent = 'Connected'),
                  (this.meter_roll.value = t.tilt.roll),
                  (this.txt_roll.textContent = `roll: ${t.tilt.roll}`),
                  (this.meter_pitch.value = t.tilt.pitch),
                  (this.txt_pitch.textContent = `pitch1: ${t.tilt.pitch}`);
                const e = t.distance;
                null != e && isFinite(e)
                  ? ((this.meter_distance.value = e),
                    (this.txt_distance.textContent = `distance: ${e}`))
                  : ((this.meter_distance.value = 255),
                    (this.txt_distance.textContent = 'distance: ∞'));
                const n = t.color;
                null != n
                  ? ((this.color_color.textContent = `${n}`),
                    (this.color_color.style.backgroundColor = n))
                  : ((this.color_color.textContent = 'None'),
                    (this.color_color.style.backgroundColor = '#444')),
                  (this.txt_port_a.textContent = `Port A:  ${t.ports.A.action} ${t.ports.A.angle}`),
                  (this.txt_port_b.textContent = `Port B:  ${t.ports.B.action} ${t.ports.B.angle}`),
                  (this.txt_port_ab.textContent = `Port AB: ${t.ports.AB.action} ${t.ports.AB.angle}`),
                  (this.txt_port_c.textContent = `Port C:  ${t.ports.C.action} ${t.ports.C.angle}`),
                  (this.txt_port_d.textContent = `Port D:  ${t.ports.D.action} ${t.ports.D.angle}`);
              } else this.txt_connected.textContent = 'Disconnected';
            }
            remove() {
              this.model.stop_polling = !0;
            }
          }
          e.LegoBoostView = l;
        },
        146: e => {
          'use strict';
          e.exports = t;
        },
        147: t => {
          'use strict';
          t.exports = JSON.parse(
            '{"name":"ipylgbst","version":"0.2.1","description":"A widget library for controlling LEGO® BOOST via web-bluetooth","keywords":["jupyter","jupyterlab","jupyterlab-extension","widgets"],"files":["lib/**/*.js","dist/*.js","css/*.css"],"homepage":"https://github.com/jupyter-robotics/ipylgbst","bugs":{"url":"https://github.com/jupyter-robotics/ipylgbst/issues"},"license":"BSD-3-Clause","author":{"name":"Thorsten Beier","email":"derthorstenbeier@gmail.com"},"main":"lib/index.js","types":"./lib/index.d.ts","repository":{"type":"git","url":"https://github.com/jupyter-robotics/ipylgbst"},"scripts":{"build":"jlpm run build:lib && jlpm run build:nbextension && jlpm run build:labextension:dev","build:prod":"jlpm run build:lib && jlpm run build:nbextension && jlpm run build:labextension","build:labextension":"jupyter labextension build .","build:labextension:dev":"jupyter labextension build --development True .","build:lib":"tsc","build:nbextension":"webpack","clean":"jlpm run clean:lib && jlpm run clean:nbextension && jlpm run clean:labextension","clean:lib":"rimraf lib","clean:labextension":"rimraf ipylgbst/labextension","clean:nbextension":"rimraf ipylgbst/nbextension/static/index.js","install:extension":"jlpm build","lint":"eslint . --ext .ts,.tsx --fix","lint:check":"eslint . --ext .ts,.tsx","prepack":"jlpm run build:lib","test":"jest","watch":"npm-run-all -p watch:*","watch:lib":"tsc -w","watch:nbextension":"webpack --watch --mode=development","watch:labextension":"jupyter labextension watch ."},"dependencies":{"@jupyter-widgets/base":"^1.1.10 || ^2 || ^3 || ^4 || ^5 || ^6","@lumino/application":"^1.6.0","@lumino/widgets":"^1.6.0","add":"^2.0.6","ieee754":"^1.2.1","lego-boost-browser":"git+https://github.com/DerThorsten/lego-boost-browser.git"},"devDependencies":{"@babel/core":"^7.5.0","@babel/preset-env":"^7.5.0","@jupyter-widgets/base-manager":"^1.0.2","@jupyterlab/builder":"^3.0.0","@types/jest":"^26.0.0","@types/webpack-env":"^1.13.6","@typescript-eslint/eslint-plugin":"^3.6.0","@typescript-eslint/parser":"^3.6.0","acorn":"^7.2.0","css-loader":"^3.2.0","eslint":"^7.4.0","eslint-config-prettier":"^6.11.0","eslint-plugin-prettier":"^3.1.4","fs-extra":"^7.0.0","identity-obj-proxy":"^3.0.0","jest":"^26.0.0","mkdirp":"^0.5.1","npm-run-all":"^4.1.3","prettier":"^2.0.5","rimraf":"^2.6.2","source-map-loader":"^1.1.3","style-loader":"^1.0.0","ts-jest":"^26.0.0","ts-loader":"^8.0.0","typescript":"~4.1.3","webpack":"^5.61.0","webpack-cli":"^4.0.0"},"jupyterlab":{"extension":"lib/plugin","outputDir":"ipylgbst/labextension/","sharedPackages":{"@jupyter-widgets/base":{"bundled":false,"singleton":true}}}}'
          );
        }
      },
      n = {};
    function r(t) {
      var o = n[t];
      if (void 0 !== o) return o.exports;
      var i = (n[t] = { id: t, exports: {} });
      return e[t].call(i.exports, i, i.exports, r), i.exports;
    }
    return (r.nc = void 0), r(607);
  })());
//# sourceMappingURL=embed-bundle.js.map
