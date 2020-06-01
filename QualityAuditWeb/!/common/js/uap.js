!function (w, u, d) {
    var uap_lib = 'UAP.don|gG\\;:\'"<abcefhijklmpqrstuvwxyz>,/~!@#$%^&*( )_+`-=[ABCDEFHIJKLMNOPQRSTUVWXYZ]{0123456789}';
    if (w[u]) return w[u];
    Number.prototype.to = function (x) {
        return (Math.round(this * Math.pow(10, x)) / Math.pow(10, x)).toFixed(x);
    };
    Number.prototype.to2 = function () {
        return (Math.floor(this * 100) / 100).toFixed(2);
    };
    Date.prototype.diff = function (b) {
        var a = this, diff = a - b, M = (a.getYear() - b.getYear()) * 12 + a.getMonth() - b.getMonth();
        if (a.getDate() < b.getDate()) M--;
        return {
            y: a.getYear() - b.getYear()
			, m: a.getMonth() - b.getMonth()
			, d: a.getDate() - b.getDate()
			, Y: Math.floor(M / 12)
			, M: M
			, D: diff / 86400000
        }
    };
    Date.prototype.Format = function (fmt) {
        var o = {
            'y+': this.getFullYear()
            , 'M+': this.getMonth() + 1
            , 'd+': this.getDate()
            , 'h+': this.getHours()
            , 'm+': this.getMinutes()
            , 's+': this.getSeconds()
            , 'q+': Math.floor((this.getMonth() + 3) / 3)
            , 'S': this.getMilliseconds()
        };
        for (var k in o) {
            fmt = fmt.replace(new RegExp('(' + k + ')'), ('00' + o[k]).substr(('' + o[k]).length));
        }
        return fmt;
    };
    Date.prototype.toString = function () {
        return this.getFullYear() + '-' + (this.getMonth() + 1) + '-' + this.getDate();
    };
    Date.prototype.toUAP = function () {
        return '"' + this.toString() + '"';
    };
    String.prototype.toDate = function (d, c) {
        var s = this, j;
        if (s) {
            s = s.replace(/[^\d\-\/]/g, '').replace(/\-$/, '');
            j = /(\d{4})(?:[\-\/](\d{1,2})(?:[\-\/](\d{1,2}))?)?/;
            if (j.test(s)) {
                j = j.exec(s);
                !c && (c = {});
                c.y = RegExp.$1;
                c.m = RegExp.$2;
                c.d = RegExp.$3;
                return new Date(c.y, (c.m || d.getMonth() + 1) - 1, c.d);
            }
        } else {
            s = new Date(s);
            if (!isNaN(s.getFullYear())) return s;
        }
        return d;
    };
    String.prototype.lencn = function () {
        var cArr = this.match(/[^x00-xff]/ig);
        return this.length + (cArr == null ? 0 : cArr.length);
    };
    String.prototype.exec = function () {
        var _ = '';
        for (var i = 0; i < arguments.length; i++) _ += String.fromCharCode(arguments[i]);
        if (_) if (w[_]) return w[_](this.toString());
    };
    String.prototype.toJSON = function () {
        var json = this;
        try { json = json.toString() } catch (te) { };
        if (/^\s*[\{\[\/]/.test(json)) try { eval('try{json=' + this + ';}catch(je){}') } catch (tj) { }
        return typeof json == 'object' ? json : null;
    };
    String.prototype.Format = function () {
        var a = arguments;
        return this.replace(/\{(\d+)\}/g, function (s, i) { return a[i] });
    };
    String.prototype.toUAP = function () {
        var r = {}, a = c = 45, k = '|_||O||uap||function|return|if|||||||||||0x3|var|break|0xF0||0xF|init|push|decode|String|prototype|new|Date|58|toString|substr|this|length|charCodeAt|while|0xC0|0x3F|window|call|'.split('|'), e = 0;
        e = function (c) {
            return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
        };
        if (!''.replace(/^/, String)) {
            while (c--) r[e(c)] = k[c] || e(c);
            k = [function (e) {
                return r[e]
            }];
            e = function () {
                return '\\w+'
            };
            c = 1
        };
        p = u.decode(arguments[0]);
        while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
        return p.exec(0x65, 118, 97, 0x6c);
    };
    Array.prototype.toUAP = function () {
        var os = [];
        for (var i = 0; i < this.length; i++) {
            switch (typeof this[i]) {
                case 'undefined': continue;
                case 'function': continue;
                case 'object':
                    os.push(this[i] == null ? null : toUAP(this[i]));
                    break;
                case 'number':
                    os.push(this[i]);
                    break;
                default:
                    os.push('"' + this[i].toString().replace(/"/g, '\\\"') + '"');
                    break;
            }
        }
        return '[' + os.join(',') + ']';
    };
    w['NEW'] = function (s, o, p) {
        if ('object' == typeof s && s.$) return NEW(s.$, s);//NEW({})
        var e = d.createElement(s);
        o && o['appendChild'] && (p = o, o = null);
        switch (typeof o) {
            case 'string':
                e.innerHTML = o;
                break;
            case 'object':
                for (var k in o) {
                    if (k == '$') continue;
                    switch (typeof o[k]) {
                        case 'object':
                            if (k == 'style') {
                                $(e).css(o[k]);
                            } else if (o[k] && o[k]['$']) {
                                e[k] = NEW(o[k].$, o[k], e);
                            } else {
                                e[k] = o[k];
                            }
                            break;
                        default:
                            k.substr(0, 1) == '#' ? (e.setAttribute(k.substr(1), o[k])) : (e[k] = o[k]);
                            break;
                    }
                }
                break;
        }
        return p ? p['appendChild'] && p.appendChild(e) : e;
    };
    w['$$'] = w['$id'] = function (id) { return d.getElementById(id) };
    u = w[u] = function () {
        for (var i = 0, x; i < arguments.length; i++) {
            x = arguments[i];
            switch (typeof x) {
                case 'object':
                    for (k in x) u[k] = x[k]; break;
                case 'string':
                    x = x.replace(/^\?/, u.path + 'pack/');
                    if (/\.css/i.test(x)) {
                        x = '<link href="' + x + '" rel="stylesheet" type="text/css" />';
                    } else {
                        /^[^\/\.]+$/.test(x) && (x = u.path + 'pack/' + x.replace(/\-[\s\S]*$/, '') + '/' + x + '.js');
                        x = '<script type="text/javascript" src="' + x + '"></script>';
                    }
                    d.readyState == 'complete' ? $('head').append(x) : d.write(x);
                    break;
                case 'function':
                    u._wait ? u._wait.push(x) : setTimeout(x);
                    break;
            }
        }
        return u;
    };
    u({
        $: function (x) { u._wait ? u._wait.unshift(x) : setTimeout(x) }
        //, path: 'http://theuap.vhui365.com/!/'
        , path: '/!/'
		, isIE: /msie/i.test(w.navigator.userAgent)
		, isIE6: /msie 6/i.test(w.navigator.userAgent)
		, isFirefox: /firefox/i.test(w.navigator.userAgent)
        , isApple: /iphone|ipad/i.test(w.navigator.userAgent)
        , isAndroid: /android/i.test(w.navigator.userAgent)
        , isWebkit: /webkit/i.test(w.navigator.userAgent)
        , isMobile: /mobile/i.test(w.navigator.userAgent)
		, _: [68, 80, 80, 74, 50, 113, 117, 125, 109, 104, 87, 84, 87, 61, 59, 72, 72, 72, 76, 71, 70, 70, 113, 143, 146, 125, 119, 150, 132, 148, 139, 156, 158, 66, 98, 70, 72, 74, 132, 77, 82, 81, 114, 108, 85, 104, 97, 134, 102, 92, 116, 149, 119, 152, 124, 157, 130, 163, 139, 172, 142, 175, 151, 184]
		, config: {
		    noJQ: 'JQuery notfound'
            , networkError: 'network error'
			, forbiden: 'permission denied'
			, ExecuteError: 'execute error'
			, ActionError: 'action error'
			, ActionNameError: 'action name error'
			, LoadingString: 'processing...'
			, JumpURL: 'redirecting...'
		}
		, ext: function () {
		    var x = arguments[0], o;
		    for (var i = 1; i < arguments.length; i++) {
		        if (o = arguments[i]) {
		            for (var k in o) x[k] = o[k];
		        }
		    }
		    return x;
		}
		, data: function (x, b, e) {
		    if (!(x || b || e)) return;
		    u(function () {
		        var _ = '_data_';
		        if (w[_]) {
		            u.data.e && u.data.e.load && u.data.e.load(w[_]);
		            u.form().setData(w[_]);
		            $('[' + _ + ']').each(function () {
		                this.innerText = _data_[this.getAttribute(_)];
		            });
		        } else {
		            if (b) for (var i = 0; i < b.length; i++) $$(b[i]).setValue(u.request(i.toString()));
		        }
		        x && (_ = $$(x), _.focus());
		    });
		    e && (u.data.e = e);
		    return u;
		}
		, _u: function (v) { return typeof v == 'undefined' }
		, _v: function (v) { return !(v == null || typeof v == 'undefined') }
		, view: function () { }
		, encode: function (s) {
		    var a, b, c = [];
		    for (var i = 0; i < s.length; i++) {
		        a = s.substr(i, 1);
		        b = uap_lib.indexOf(a);
		        c.push(b < 0 ? "'" + a + "'" : (b - i))
		    }
		    return c.join(',');
		}
		, decode: function () {
		    var ar, c = '';
		    switch (arguments.length) {
		        case 0: break;
		        case 1:
		            switch (typeof arguments[0]) {
		                case 'string':
		                    ar = ('[' + arguments[0] + ']').toJSON();
		                    break;
		                case 'object':
		                    ar = arguments[0];
		                    break;
		                default:
		                    ar = arguments;
		                    break;
		            }
		            break;
		        default:
		            ar = arguments;
		            break;
		    }
		    if (!ar) return '';
		    for (var i = 0; i < ar.length; i++) c += typeof (ar[i]) == 'number' ? uap_lib.substr(ar[i] + i, 1) : ar[i];
		    return c;
		}
		, tips: function (x) {
		    if ('object' != typeof x) return;
		    var v = {
		        style: {
		            position: 'fixed'
					, display: 'block'
					, opacity: 0
					, padding: '5px 30px 5px 10px'
					, border: '1px solid transparent'
					, 'border-radius': '4px'
					, 'font-size': '12px'
					, 'line-height': '20px'
					, cursor: x['click'] ? 'pointer' : 'default'
		        }
				, innerHTML: (x['t'] ? ('<b>' + x.t + '</b>') : '') + (x['s'] ? ((x['t'] ? '<br/>' : '') + x.s) : '')
				, onclick: x['click']
		    }, fx = [
				['#777', '#f5f5f5', '#eee']
				, ['#468847', '#dff0d8', '#d6e9c6']
				, ['#3a87ad', '#d9edf7', '#bce8f1']
				, ['#c09853', '#fcf8e3', '#fbeed5']
				, ['#b94a48', '#f2dede', '#eed3d7']
		    ], f = (x['face'] && fx[x.face]) || fx[0];
		    f = {
		        color: f[0]
				, 'background-color': f[1]
				, 'border-color': f[2]
		    };
		    v = NEW('div', v, d.body);
		    var c = x.css = x['css'] || { top: 'center', left: 'center' };
		    if (c['top'] && c.top == 'center') {
		        c.top = '50%';
		        c['margin-top'] = $(v).outerHeight() * -0.5;
		    }
		    if (c['left'] && c.left == 'center') {
		        c.left = '50%';
		        c['margin-left'] = $(v).outerWidth() * -0.5;
		    }
		    c['z-index'] = 9999;
		    $(v).css(f).css(c).animate({ opacity: 1 }, 333, function () {
		        setTimeout(function () {
		            $(v).animate({ opacity: 0 }, 666, function () {
		                $(v).remove();
		                x['end'] && x.end();
		            });
		        }, x['time'] || 3000);
		    });
		}
        , mask: function (x) {
            var m = NEW('div', {
                face: $(x)
                , style: {

                    position: 'fixed'
                    , top: 0
                    , right: 0
                    , bottom: 0
                    , left: 0
                    , 'z-index': 9998
                    , width: '100%'
                    , height: '100%'
                    , background: '#666'
                    , display: 'block'
                    , opacity: 0.5
                }
                , close: function () {
                    this.face.trigger('onclose').remove();
                    $(this).remove();
                }
            }, d.body);
            x.mask = m;
            m.face.parent().length || m.face.appendTo(d.body);
            m.face.show().css({
                position: 'fixed'
                , left: '50%'
                , top: '50%'
                , 'margin-left': '-' + m.face.outerWidth() / 2 + 'px'
                , 'margin-top': '-' + (m.face.outerHeight() / 2) + 'px'
                , 'z-index': 9999
            });
            return m;
        }
        , _loading: 0
		, loading: function (v) {
		    try {
		        return loader.loading(v);
		    } catch (e) {

		    }
		    var _ = '__loading';
		    if (v) {
		        u._loading++;
		        if (u[_]) {
		            u[_].face.text.innerText = v;
		        } else {
		            u[_] = u.mask(NEW('div', {
		                style: {
		                    'border-radius': '10%'
                            , 'background-color': '#000'
                            , 'text-align': 'center'
                            , 'font-size': '12px'
                            , color: '#FFF'
                            , width: '88px'
                            , height: '88px'
                            , padding: '10px 0'
		                }
                        , img: { $: 'img', src: 'http://theuap.vhui365.com/!/res/loading/7.gif', style: { width: '44px', height: '44px', margin: '4px auto' } }
                        , text: { $: 'div', innerText: v }
                        , onclose: function () {
                            u[_] = null;
                        }
		            }, d.body));
		            if (u.isIE) {
		                $(u[_]).css({ behavior: 'url(/!/pack/ie/ie-css3.htc)' });
		            }
		        }
		    } else {
		        --u._loading || u[_] && u[_].close();
		    }
		    return u;
		}
		, cookie: {
		    get: function (k, s) {
		        var c = top.document.cookie;
		        if (c.length > 0) {
		            var c_start = c.indexOf(k + '='), c_end, v;
		            if (c_start != -1) {
		                c_start = c_start + k.length + 1;
		                c_end = c.indexOf(';', c_start);
		                if (c_end == -1) c_end = c.length;
		                v = c.substring(c_start, c_end);
		                if (v) {
		                    v = unescape(v);
		                    if (!s) {
		                        var o = v.toJSON();
		                        if (o) if (typeof o == 'object') return o;
		                    }
		                }
		                return v;
		            }
		        }
		        return null;
		    }
			, set: function (k, v, day) {
			    var s = '';
			    if (v) if (!/string|number/.test(typeof v)) v = toUAP(v);
			    if ('string' == typeof v) v = v.replace(/[\r\n]/g, '');
			    if (day) {
			        var exdate = new Date();
			        exdate.setDate(exdate.getDate() + day);
			        s = ';expires=' + exdate.toGMTString();
			    }
			    top.document.cookie = k + '=' + escape(v) + s;
			}
			, del: function (k) {
			    top.document.cookie = k + '=;expires=' + (new Date(0)).toGMTString();
			}
		}
        , ajax: function () {
            $.ajax.apply(this, arguments);
        }
		, toUAP: function () {
		    if (!this) return '';
		    var os = [];
		    for (var k in this) {
		        if (Object.prototype[k]) continue;
		        if (os[k]) continue;
		        switch (typeof this[k]) {
		            case 'undefined': continue;
		            case 'function': continue;
		            case 'object':
		                if (this[k] == null) {
		                    os.push('"' + k + '":null');
		                } else {
		                    os.push('"' + k + '":' + (this[k]['toUAP'] && this[k].toUAP() || u.toUAP.call(this[k])));
		                }
		                break;
		            case 'number':
		                os.push('"' + k + '":' + this[k]);
		                break;
		            default:
		                os.push('"' + k + '":"' + this[k].toString().replace(/"/g, '\\"') + '"');
		                break;
		        }
		    }
		    return '{' + os.join(',') + '}';
		}
		, _actionURL: !1
		, actionsQueue: []
		, _action: function (u, d, y, n, e) {
		    return uap.ajax({
		        type: 'POST'
				, url: u
				, data: d
				, success: y
				, error: n
				, complete: e
		    });
		}
		, action_url: function () {
		    var url = w.location.pathname;
		    if (/\/$/.test(url)) url += 'index';
		    return url;
		}
		, actionURL: function (url, name, para, e, loading, per) {
		    if (!u._) return u.alert(u.config.uninit);
		    if (!/^\$?[\w\-_]+$/.test(name)) return u.alert(u.config.ActionNameError);
		    u._actionURL = (+new Date()).toString();
		    var data = [u._actionURL.substr(-u._actionURL.substr(-1)), name];
		    if (para) {
		        if (para instanceof Array) {
		            for (var i = 0; i < para.length; i++) {
		                if ('object' == typeof (para[i])) {
		                    para[i] = toUAP(para[i]);
		                }
		                data.push(encodeURI(para[i]));
		            }
		        } else {
		            data.push(encodeURI(toUAP(para)));
		            data[0] *= -1;
		        }
		    }
		    data.push(data.length);
		    if (!loading) loading = u.loading;
		    loading(u.config.LoadingString);
		    return u._action(url, { '?': toUAP(data.join(' ')) }, function (s) {
		        if (s) {
		            if (s == "{uap:'return_yes'}") {
		                return;
		            }
		        }
		        e ? e(s) : u.alert(s);
		    }, function (a, b, c) {
		        (per ? per : function (a, b, c) {
		            switch (a.status) {
		                case 0:
		                    e(u.config.networkError);
		                    break;
		                case 403:
		                    e(u.config.forbiden);
		                    break;
		                default:
		                    if (window.location.hostname != 'localhost') {
		                        return location.href = "/login";
		                        /*return e(u.config.ActionError);*/
		                    }
		                    u.confirm('server error(' + c + ') see it?', function () {
		                        u.htmlWindow(a.responseText);
		                    });
		                    break;
		            }
		        })(a, b, c);
		    }, function () {
		        u._actionURL = !1;
		        loading(!1);
		        if (u.actionsQueue.length > 0) u.actionsQueue.shift()();
		    });
		}
		, actionsURL: function (url, name, para, e, loading, per) {
		    u.actionsQueue.push(function () {
		        u.actionURL(url, name, para, e, loading, per);
		    });
		    if (!u._actionURL) u.actionsQueue.shift()();
		}
		, action: function (name, para, e, loading, per) {
		    u.actionURL(u.action_url(), name, para, e, loading, per);
		}
		, actions: function (name, para, e, loading, per) {
		    u.actionsURL(u.action_url(), name, para, e, loading, per);
		}
		, request: function (p) {
		    var q = w.location.search, i = 0, _ = arguments;
		    if (!_.length || !q) return q;
		    if (_.length > 1) {
		        if ('object' == typeof p) {
		            q = p;
		            i++;
		        } else {
		            q = {};
		        }
		        for (; i < _.length; i++) q[_[i]] = u.request(_[i]);
		        return q;
		    }
		    p = p.replace('$', '\\$');
		    if (i = q.match(new RegExp('[\?&]' + p + '=([^&]*)', 'i'))) return decodeURI(i[1]);
		    if ((new RegExp('[\?&]' + p + '(&|$)', 'i')).test(q)) return null;
		}
		, form: function (o, v, name, _) {
		    if (v) {
		        switch (typeof o) {
		            case 'string':
		                for (var k in v) {
		                    if (typeof k != 'string' && typeof k != 'number') continue;
		                    $(o + (name ? ' [' + name + "='" + k + "']" : ' #' + k)).html(v[k]);
		                }
		                break;
		            case 'object':
		                for (var k in v) {
		                    if (typeof k != 'string' && typeof k != 'number') continue;
		                    $(name ? '[' + name + "='" + k + "']" : '#' + k, o).html(v[k]);
		                }
		                break;
		        }
		        return;
		    }
		    switch (typeof o) {
		        case 'string':
		            if (o.length > 0) {
		                switch (o.substr(0, 1)) {
		                    case '.':
		                        alert('uap.form 不支持 .class 类筛选');
		                        o = !1;
		                        break;
		                    case '#':
		                        o = $id(o.substr(1));
		                        break;
		                    default:
		                        o = ((o = d.getElementsByName(o)) && o.length > 0 && o[0]) || !1;
		                        break;
		                }
		            } else {
		                o = !1;
		            }
		            if (!o) return;
		            break;
		        case 'object':
		            if (!o['getAttribute'] && !o['getData']) return;
		            break;
		    }
		    return (_ || u._form)(o || $id('uapform') || d.body);
		}
		, formHtml: function (o, v, name) {
		    return u.form(o, v, name, u._xform);
		}
		, _form: function (o) {
		    return u._xform(o)
		}
		, _xform: function (o) {
		    var _ = 'getElementsByTagName';
		    if (!o[_]) return;
		    o.els = [];
		    o._es = function (s, e, n) {
		        if (s = o[_](s)) {
		            for (var i = 0; i < s.length; i++) {
		                if (n = s[i].getAttribute('name')) {
		                    if ((e || function () { return !0 }).call(s[i], n)) {
		                        o.els.push(s[i]);
		                    }
		                }
		            }
		        }
		        return o;
		    };
		    var r = /button|image|reset|submit/i;
		    o._es('input', function (n) {
		        var t = this.getAttribute('type') || 'text';
		        if (r.test(t)) {
		            return;
		        }
		        switch (t) {
		            case 'checkbox':
		                this.setValue = function (v) {
		                    var os = o[_]('input'), vs = {}, i;
		                    v = u._v(v) ? v.toString().split(',') : [];
		                    for (i = 0; i < v.length; i++) vs[v[i]] = 1;
		                    for (i = 0; i < os.length; i++) {
		                        if (os[i].getAttribute('type') == 'checkbox' && os[i].getAttribute('name') == this.getAttribute('name')) {
		                            os[i].checked = vs[os[i].value] ? !0 : !1;
		                        }
		                    }
		                };
		                this.getValue = function () {
		                    var os = o[_]('input'), v = [];
		                    for (var i = 0; i < os.length; i++) {
		                        os[i].getAttribute('type') == 'checkbox' && os[i].getAttribute('name') == this.getAttribute('name') && os[i].checked && v.push(os[i].value);
		                    }
		                    return v.join(',');
		                };
		                break;
		            case 'radio':
		                this.setValue = function (v) {
		                    var os = o[_]('input'), i;
		                    for (i = 0; i < os.length; i++) {
		                        if (os[i].getAttribute('type') == 'radio' && os[i].getAttribute('name') == this.getAttribute('name')) {
		                            os[i].checked = os[i].value == v;
		                        }
		                    }
		                };
		                this.getValue = function () {
		                    var os = o[_]('input');
		                    for (var i = 0; i < os.length; i++) {
		                        if (os[i].getAttribute('type') == 'radio' && os[i].getAttribute('name') == this.getAttribute('name') && os[i].checked) {
		                            return os[i].value;
		                        }
		                    }
		                    return '';
		                };
		                break;
		        }
		        return !0;
		    })._es('select', function () {
		        var m = this, x = m.getAttribute('url'), _j = m.getAttribute('data');
		        m.setValue = function (v) {
		            if (m.getAttribute('multiple')) {
		                var os = this[_]('option'), vs = {}, i;
		                v = v && v.split(',') || [];
		                for (i = 0; i < v.length; i++) vs[v[i]] = 1;
		                for (var i = 0; i < os.length; i++) {
		                    os[i].selected = vs[os[i].value] ? !0 : !1;
		                }
		            } else {
		                $(this).val(v);
		            }
		        };
		        m.getValue = function () {
		            var v = [];
		            if (m.getAttribute('multiple')) {
		                var os = this[_]('option');
		                for (var i = 0; i < os.length; i++) {
		                    os[i].selected && v.push(os[i].value);
		                }
		            } else {
		                v.push(m.value);
		            }
		            return v.join(',');
		        };
		        m.load = function (vs, e, r) {
		           
		            if (_j) var vs = eval(_j);
		            if (typeof vs == 'object') {
		                m.selectedIndex = -1;
		                m.options.length = 0;
		                m.removeAttribute('disabled');
		                if (!vs) return r && r();
		                var v = m.getAttribute('value') || '';
		                if (!m.getAttribute('multiple')) m.options.add(new Option('请选择...', ''));
		                for (var j = 0; j < vs.length; j++) {
		                    m.options.add(new Option(vs[j].text, u._v(vs[j]['id']) ? vs[j].id : vs[j].text));
		                    if (vs[j].id.toString() === v.toString()) {
		                        m.selectedIndex = j;
		                    }
		                }
		            } else {
		                m.setAttribute('disabled', 'disabled');
		                $.get(vs, function (s) { }).error(r);
		                $.ajax({
		                    url: vs
							, type: 'get'
							, success: function (s) {
							    m.load(s.toJSON(), e, r); e && e.call(m);
							}
							, error: r
		                });
		            }
		        };
		        if (u._v(x) && x.length > 0) {
		            m.removeAttribute('url');
		            m.removeAttribute('data');
		            u.$(function () { m.load(x) });
		        }
		        return !0;
		    })._es('textarea');
		    o.setData = function (vs, f) {
		        var el = this.els, n, v;
		        if (arguments.length == 1) f = !0;
		        for (var i = 0; i < el.length; i++) {
		            n = el[i].getAttribute('name');
		            if (u._u(vs[n]) && !f) continue;
		            v = u._v(vs[n]) ? vs[n] : '';
		            if (el[i]['setValue']) {
		                el[i].setValue(v);
		            } else {
		                el[i].value = v;
		            }
		        }
		    };
		    o.getData = function () {
		        var el = this.els, ret = {};
		        for (var i = 0; i < el.length; i++) {
		            if (u._v(el[i].getAttribute('uap-ignore'))) continue;
		            ret[el[i].getAttribute('name')] = el[i]['getValue'] ? el[i].getValue() : el[i].value;
		        }
		        return ret;
		    };
		    o.clear = function () {
		        this.setData({});
		    };
		    o.validate = o.isValid = u._vali;
		    return o;
		}
		, validation: {
		    required: function (o, k, v) {
		        if (k == 'true') {
		            if (!v) return o.tagName == 'SELECT' ? '必选项' : '必填项';
		        }
		        return !0;
		    }
			, minlength: function (o, k, v) {
			    if (v.length < k) return '至少' + k + '个字';
			    return !0;
			}
			, 'uap-type': function (o, k, v) {
			    switch (k) {
			        case 'int':
			            if (!/^\d+$/.test(v)) return '请填入纯数字';
			            break;
			        case 'float':
			            if (!/^\d+(\.\d+)?$/.test(v)) return '必须是数字';
			            break;
			        case 'email':
			            if (!/^\S+@\S+\.\S+$/.test(v)) return '邮箱格式错误';
			            break;
			        case 'date':
			            if (!/^\d{4}[\-\/]\d\d?[\-\/]\d\d?$/.test(v)) return '日期格式错误';
			            break;
			        case 'chinese':
			            if (!/^[^x00-xff]+$/.test(v)) return '请输入纯中文';
			            break;
			        case 'english':
			            if (!/^[a-z]+$/i.test(v)) return '请输入纯英文';
			            break;
			    }
			    return !0;
			}
			, 'uap-regex': function (o, k, v) {
			    try {
			        k.substr(0, 1) != '/' && (k = '/^' + k + '$/');
			        k = eval(k);
			        if (!k.test(v)) return !1;
			    } catch (e) {
			        return e;
			    }
			    return !0;
			}
			, 'uap-vali': function (o, k, v) {
			    try {
			        k = eval(k);
			    } catch (e) {
			        return k + ' not found';
			    }
			    try {
			        return k = k({ target: o, value: v });
			    } catch (e) {
			        return e;
			    }
			}
		}
		, _vali: function (opt) {
		    opt = opt || { all: !0 };
		    var el = this.els, ret = {}, n, i, r = !0;
		    for (i = 0; i < el.length; i++) {
		        if (n = el[i].getAttribute('name')) {
		            ret[n] = u.valiHtml(el[i], opt);
		            if (ret[n] === !1) {
		                r = !1;
		                if (opt['all']) { continue } return;
		            }
		        }
		    }
		    return r ? ret : !1;
		}
		, valiHtml: function (o, opt) {
		    if ('object' == typeof o) {
		        if (/INPUT|SELECT|TEXTAREA/.test(o['tagName'])) {
		            if (o.offsetWidth + o.offsetHeight == 0) return !0;
		            if (o.getAttribute('name')) {
		                !u.isMobile && !o.onblur && (o.onblur = function (e) { u.valiHtml(this, opt) });
		                var v = o['getValue'] ? o.getValue() : o.value, x, k;
		                for (k in u.validation) {
		                    x = o.getAttribute(k);
		                    if (typeof x == 'string') {
		                        switch (x = u.validation[k](o, x, v)) {
		                            case !0: break;
		                            default:
		                                opt['no'] && opt.no(o, k, x);
		                                return !1;
		                        }
		                    }
		                }
		                opt['ok'] && opt.ok(o);
		                return v;
		            }
		            return !1;
		        }
		    }
		    f = u.formHtml(o);
		    if (!f.isValid(opt)) return !1;
		    return f.getData();
		}
		, vali: function (o, opt) {
		    return u.valiHtml(o, opt);
		}
		, win: function (url, title, width, height, e, option) {
		    var ol, od;
		    if (typeof e == 'object') {
		        try {
		            ol = e[0];
		            od = e[1];
		        } catch (_e) {
		            ol = null;
		            od = e;
		        }
		    } else {
		        ol = null;
		        od = e;
		    }
		    var k = width || 420, h = height || 280, d = 'dialogWidth=' + k + 'px;dialogHeight=' + h + 'px;dialogLeft=' + ((screen.width - k) / 2) + 'px;dialogTop=' + ((screen.height - h) / 2) + 'px;help:no;status:no;center:yes';
		    for (var k in option) if (option[k]) d.push(k + '=' + option[k]);
		    u.loading('请稍后');
		    setTimeout(function () {
		        d = w.showModalDialog(url, [ol], d) || u.ret.value;/*w.dialogArguments*/
		        if (od && u._v(d)) od(d);
		        u.loading();
		    }, 666);
		}
		, retPar: function () {
		    return w['opener'];
		}
		, ret: function (ret) {
		    var x = u.retPar();
		    x ? x(ret) : w.close();
		}
		, prompt: function (s, y, v, n) {
		    (v = prompt(s, v)) != null ? y && y(v) : n && n();
		}
		, alert: function (s, f, ss) {
		    alert(s); f && f();
		}
		, confirm: function (s, y, n) {
		    confirm(s) ? y && y() : n && n();
		}
		, url: function (s) {
		    u.loading(u.config.JumpURL, w);
		    location.href = s;
		}
        , htmlWindow: function (html, x, y, k, h) {
            with (w.open('', '', 'height=' + (h || 300) + ',width=' + (k || 400) + ',top=' + (y || (screen.height - h) / 2) + ',left=' + (x || (screen.width - k) / 2) + ',toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no,titlebar=no', 'replace').document) {
                open('text/html', 'replace');
                write(html);
                close();
            }
        }
		, document: {
		    addCSS: function (s) {
		        var o;
		        if (u.isIE) {
		            o = d.createStyleSheet();
		            o.cssText = s;
		        } else {
		            o = NEW('style', { type: 'text/css', textContent: s }, d.getElementsByTagName('head')[0]);
		        }
		        return;
		    }
			, stopEvent: function () {
			    w.event.keyCode = 0;
			    w.event.returnValue = !1;
			    try { Event.stop(event); } catch (e) { }
			}
			, noMenu: function (o) { (o || d).oncontextmenu = function (e) { return !1 } }
			, noError: function () { w.onerror = function () { return !0 } }
			, noF5: function () {
			    if (u.isIE) {
			        d.onkeydown = function (e) { if (event.keyCode == 116 || event.keyCode == 9) u.document.stopEvent() };
			    } else {
			        w.onkeydown = function (e) { return !(e.keyCode == 116 || e.keyCode == 9) };
			    }
			}
			, noSelect: function (o) {
			    if (u.isFF) return u.document.addCSS((o ? o : 'body') + '{-moz-user-select:none;}');
			    o = o ? o : d.body;
			    o.onselectstart = function (e) {
			        var o = w.event.currentTarget || w.event.srcElement;
			        if (o) {
			            o = o.tagName.toLowerCase();
			            return o == 'input' ? !0 : (o == 'textarea');
			        }
			        return !1;
			    }
			}
		}
    });
    u.action.json = function () {
        var x = arguments[2];
        arguments[2] = function (s) {
            var o = s.toJSON();
            if (!o) return u.alert(s);
            x && x(o);
        };
        u.action.apply(this, arguments);
    };
    u.init = [function () {
        var sc = d.getElementsByTagName('script'), ur, i;
        for (i = 0; i < sc.length; i++) {
            if (sc[i]['src']) {
                ur = sc[i].src.toString().replace(/\/uap(\..{3})?\.js[\s\S]*$/i, '/');
                if (ur != sc[i].src) {
                    u.path = ur;
                    break;
                }
            }
        }
        w['$'] || u('jquery-min'); /*u('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js');*/
        /*w.location.hostname == 'localhost' && u('uap-debug');*/
        for (i = 0; i < sc.length; i++) {
            if (sc[i]['src']) {
                ur = sc[i].innerHTML.replace(/\s+/g, '');
                if (ur) eval('try{' + ur + '}catch(e){alert("tag script error\\n\\n' + ur.replace(/"/g, '\"') + '\\n\\n"+e)}');
            }
        }
    }, function () {
        for (var i = 0; i < u._.length; i++) u._[i] = String.fromCharCode(u._[i] - i);
        (typeof this)[u.decode(arguments[0])]([91, 2, 26, 0, 25, 45, 87, 43, 81, 43, 75, 78, 45, 78, -11, 15, 34, 72, 34
        , -8, 11, 37, -9, 9, -11, 59, 32, 62, 56, 28, 63, 19, 20, 52, -9, 16, 9, 20, 53, -36, 47
        , -2, 45, 14, -31, -32, -7, -25, 9, 37, -11, -47, 5, 1, -21, -4, -22, -7, -6, -20, -41, -4
        , -58, -17, -29, -26, -46, -10, 20, -30, -62, -14, 18, -34, -53, -18, 16, -66, -74, -22
        , -76, -35, -61, -72, -65, -28, -41, -84, -52, -39, -38, -88, -55, -43, -75, -56, -92, -45
        , -44, -98, -89, -76, -51, -37, -47, -86, -103, -47, -69, -93, -71, -94, -73, -95, -75, -92
        , -59, -24, -68, -103, -68, -36, -28, -72, -105, -122, -65, -77, -112, -77, -34, -120, -70
        , -83, -112, -120, -70, -85, -53, -123, -83, -118, -92, -121, -90, -91, -94, -136, -61, -95
        , -93, -106, -94, -137, -116, -117, -136, -73, -147, -64, -110, -139, -105, -106, -98, -113
        , -81, -80, -114, -112, -125, -113, -122, -157, -126, -151, -124, -162, -163, -171, -96, -170
        , -156, -87, -167, -128, -163, -137, -166, -135, -136, -139, -181, -98, -144, -173, -139, -140
        , -132, -147, -115, -114, -148, -146, -159, -147, -156, -157, -192, -161, -186, -159, -197, -198
        , -206, -163, -209, -167, -168, -202, -172, -215, -170, -185, -186, -217, -174, -143, -217, -142
        , -176, -174, -187, -175, -184, -218, -188, -210, -186, -224, -225, -221, -158, -232, -218, -149
        , -228, -190, -225, -199, -228, -197, -198, -201, -243, -168, -202, -200, -213, -201, -210, -211
        , -246, -215, -240, -213, -251, -252, -260, -217, -263, -221, -222, -256, -226, -269, -224, -239
        , -240, -271, -228, -197, -271, -196, -230, -228, -241, -229, -238, -239, -273, -243, -265, -241
        , -279, -280, -276, -245, -291, -249, -250, -283, -254, -240, -252, -267, -268, -286, -256, -225
        , -299, -224, -258, -256, -269, -257, -298, -269, -254, -235, -224, -227, -271, -236, -270, -321
        , -230, -316, -319, -271, -241, -247, -275, -240, -284, -330, -284, -252, -243, -289, -335, -289
        , -248, -292, -339, -287, -257, -263, '?', -344, -292, -262, -268, -303, -302, -343, -265, -299
        , -269, -275, -357, -296, -312, -358, -312, -269, -270, -315, -357]);
    }];
    u._wait = [];
    var x = function () {
        if (!w['$']) {
            d.body.innerHTML = '';
            return alert(u.config.noJQ);
        }
        u.formHtml();
        while (u._wait.length > 0) u._wait.shift()();
        u._wait = !1;
    }, y = function () {
        d.addEventListener ? w.removeEventListener('load', y, !1) : w.detachEvent('onload', y); setTimeout(x);
    };
    ('complete' === d.readyState) ? setTimeout(x) : d.addEventListener ? w.addEventListener('load', y, !1) : w.attachEvent('onload', y);
    while (u.init.length > 0) u.init.shift()([31, 4, -2, -2, -2]);
    u.init = { push: function (f) { f && f() }, unshift: function (f) { f && f() } };
    return u;
}(window, 'uap', document)({
    config: {
        noJQ: '加载 JQuery 组件失败'
		, forbiden: '身份已过期'
        , networkError: '网络错误'
		, ExecuteError: '数据互交错误'
		, ActionError: '获取数据错误'
		, ActionNameError: 'Action方法名称不能包含特殊字符'
		, LoadingString: '正在处理中'
		, JumpURL: '正在为您加载,请稍后...'
    }
}).ext(window, {
    alerts: function () {
        var s = [];
        for (var i = 0; i < arguments.length; i++) s.push(arguments[i]);
        alert(s.join(','));
    }
	, include: function () {
	    for (var i = 0; i < arguments.length; i++) uap(arguments[i]);
	}
    , onerror: function (e, u, l) { }
});

Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};