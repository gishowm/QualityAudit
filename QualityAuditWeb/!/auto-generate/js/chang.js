/// <reference path="../jquery-min.js" />

/*
    chang 简单集成 js 
    callback 回调
*/


var _win = $(window);
var _doc = $(document);

var chang = {
    /*
        顶部通知
        s 提示内容
        style 0=success，1=info，2=warning，3=danger
        time 显示的时间
    */
    tips: function (s, callback, style, time) {
        var arr = ["5cb85c", "5bc0de", "f0ad4e", "d9534f"];
        if (style === null || style === undefined || style === "") {
            style = 2;
        }
        var _tips = "<div class='top_alert' style='margin: 0; position: fixed;top: 0px;color: white;background: #" + arr[style] + ";width: 100%; font-size: 14px;word-wrap: break-word;padding: 10px;z-index: 999;text-align: center;'></div>";
        if ($(".top_alert").length > 0) {
            $('.top_alert').css({
                "background": "#" + arr[style]
            });
            $(".top_alert").text(s);
        } else {
            $("body").append(_tips);
            $(".top_alert").text(s);
        }
        $(".top_alert").show();
        $(".top_alert").stop(false, true).animate({ "filter": "alpha(opacity=100)", "opacity": "1" }, 500);
        setTimeout(function () {
            $(".top_alert").stop(false, true).animate({ "filter": "alpha(opacity=0)", "opacity": "0" }, 500, "swing", function () {
                $(".top_alert").hide();
                callback && callback();
            });
        }, time ? time : 1500);
    },
    /* 
        弹出框 alert 
        e 弹出的内容 
        i 不赋值或者 = 0|| false ，不显示 取消按钮，否则 显示 取消按钮
    */
    alert: function (e, callback, i, cancel, yestxt, notxt) {
        var e = e || String(e);
        var i = i || false;
        var yestxt = yestxt || "确定";
        var notxt = notxt || "取消";
        if (typeof (callback) == "boolean") {
            i = callback;
            callback = "";
        };
        if ($('.alert-bg').length <= 0) {
            var _AlertBg = "<div class='alert-bg' style=' position: fixed; top: 0; left: 0; z-index: 99; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: none; opacity: 0; transition: all .2s;'>"
                + "</div>";
            $('body').append(_AlertBg);
        }
        if ($('.alert-ct').length <= 0) {
            var _AlertCt = "<div class='alert-ct' style=' position: fixed; z-index: 100;width: 90%; max-width: 400px; background: #fff; display: none; opacity: 0; transform: scale(1.2,1.2); transition: all .2s;'>"
                + "<i style='position: absolute;display: block;top: 0;right: 0;font-size: 1.5rem;padding: 0 0.5rem;'>&times;</i>"
                + "<div class='alert-text' style=' max-height: 30rem; overflow-y: auto; text-align: center; font-size: 1.4rem; color: #333; line-height: 3rem; padding: 3rem;'>"
                + e
                + "</div>"
                + "<div class='alert-btn' style=' width: 80%; border-top: 0.1rem solid #e5e5e5; margin: 0 auto; text-align: center;'>"
                + "<button id='alert-btn-no' style=' width: 50%; line-height: 4rem; font-size: 1.4rem; text-align: center; color: #ef4f4f; border: none; background: transparent; display: none;'>" + notxt + "</button>"
                + "<button id='alert-btn-yes' style=' width: 50%; line-height: 4rem; font-size: 1.4rem; text-align: center; color: #04be02; border: none; background: transparent;'>" + yestxt + "</button>"
                + "</div>"
                + "</div>";
            $('body').append(_AlertCt);
        } else {
            $('.alert-text').html(e);
            $("#alert-btn-yes").text(yestxt);
            $("#alert-btn-no").text(notxt);
        }
        i ? ($('#alert-btn-no').show()) : ($('#alert-btn-no').hide());
        var AlertHeight = function () {
            var _win_width = _win.width();
            var _win_height = _win.height();
            var _alert_width = $('.alert-ct').width();
            var _alert_height = $('.alert-ct').height();
            $('.alert-ct').css({
                "left": (_win_width - _alert_width) / 2,
                "top": (_win_height - _alert_height) / 2
            });
        };
        AlertHeight();
        _win.resize(function () {
            AlertHeight();
        });
        $('.alert-bg').show().css({
            "opacity": 1
        });
        $('.alert-ct').show().css({
            "opacity": 1,
            "transform": "scale(1,1)"
        });
        $(".alert-btn button").unbind();
        var f = function () {
            $('.alert-bg').css({
                "opacity": 0
            });
            setTimeout(function () { $('.alert-bg').hide() }, 200);
            $('.alert-ct').css({
                "opacity": 0,
                "transform": "scale(1.2,1.2)"
            });
            setTimeout(function () { $('.alert-ct').hide() }, 200);
        };
        $(".alert-ct i").click(function () {
            f();
        });
        _doc.keydown(function (e) {
            var c = e.keyCode;
            switch (c) {
                case 13:
                    $("#alert-btn-yes").trigger('click');
                    break;
                default:
                    break;
            }
        });
        $("#alert-btn-no").click(function () {
            $.when(cancel && cancel()).done(function () {
                f();
            }).fail(function () {

            });
        });
        $("#alert-btn-yes").click(function () {
            $.when(callback && callback()).done(function () {
                f();
            }).fail(function () {

            });
        });
        return e;
    },
    /*
        chang.loading(i);
        i==false, chang.loading()隐藏
        其它都显示
    */
    loading: function (i, n) {
        var i = i;
        var arr = ["chang-dot", "ball-clip-rotate", "ball-clip-rotate-pulse", "square-spin", "ball-clip-rotate-multiple", "ball-pulse-rise", "ball-rotate", "ball-scale", "line-scale", "ball-scale-multiple", "ball-beat", "line-scale-pulse-out-rapid", "ball-scale-ripple-multiple", "ball-spin-fade-loader", "triangle-skew-spin", "pacman"];
        if (typeof (n) == "number") {
            var n = n.toString();
        } else {
            var n = parseInt(arr.length * Math.random());
        }
        var Loading = {
            "chang-dot": "<div class='changloading' style='z-index:100;'><div class='changdot white'></div><div class='changdot'></div><div class='changdot'></div><div class='changdot'></div><div class='changdot'></div></div>",
            "ball-clip-rotate": "<div class='ball-clip-rotate'><div></div></div>",
            "ball-clip-rotate-pulse": "<div class='ball-clip-rotate-pulse'><div></div><div></div></div>",
            "square-spin": "<div class='square-spin'><div></div></div>",
            "ball-clip-rotate-multiple": "<div class='ball-clip-rotate-multiple'><div></div><div></div></div>",
            "ball-pulse-rise": "<div class='ball-pulse-rise'><div></div><div></div><div></div><div></div><div></div></div>",
            "ball-rotate": "<div class='ball-rotate'><div></div></div>",
            "ball-scale": "<div class='ball-scale'><div></div></div>",
            "line-scale": "<div class='line-scale'><div></div><div></div><div></div><div></div><div></div></div>",
            "ball-scale-multiple": "<div class='ball-scale-multiple'><div></div><div></div><div></div></div>",
            "ball-beat": "<div class='ball-beat'><div></div><div></div><div></div></div>",
            "line-scale-pulse-out-rapid": "<div class='line-scale-pulse-out-rapid'><div></div><div></div><div></div><div></div><div></div></div>",
            "ball-scale-ripple-multiple": "<div class='ball-scale-ripple-multiple'><div></div><div></div><div></div></div>",
            "ball-spin-fade-loader": "<div class='ball-spin-fade-loader'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>",
            "triangle-skew-spin": "<div class='triangle-skew-spin'><div></div></div>",
            "pacman": "<div class='pacman'><div></div><div></div><div></div><div></div><div></div></div>"
        };
        var r = Loading[arr[0]];
        if ($('#changloader').length < 1) {
            var h = "<div id='changloader'>" + r + "</div>";
            $('body').append(h);
        } else {
            $('#changloader').empty();
            $('#changloader').html(r);
        };
        if ($('.loading-bg').length < 1) {
            var Bg = "<div class='loading-bg' style=' position: fixed; top: 0; left: 0; z-index: 999; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: none;'>"
                + "</div>";
            $('body').append(Bg);
        };
        if (i) {
            $('#changloader').show();
            $('.loading-bg').show();
        } else {
            $('#changloader').hide();
            $('.loading-bg').hide();
        };
        return n;
    },
    /* 
        发送验证码 sellMessage
        btn 发送验证码的 
        time 重发验证码的时间
        class 点击 btn 之后给它添加
    */
    sellMessage: function (obj, callback) {

        obj = obj || {};
        obj.btn = $(obj.btn) || {};
        obj.time = obj.time || 60;
        obj.class = obj.class || "";
        obj.count = obj.count || 0;
        obj.limit = obj.limit * 1000 || 0;
        obj.limittips = obj.limittips || "您的操作过于频繁，请稍后再试";
        var arr = location.pathname.split("/");
        var itemname = "selldata_" + arr[arr.length - 1];
        if (itemname.indexOf(".") > -1) {
            itemname = itemname.substring(0, itemname.indexOf("."));
        }

        var send = function () {
            obj.btn.attr('disabled', true);
            var myInterval;
            var _time = obj.time;
            var ReadTime = function () {
                if (_time > 0) {
                    obj.btn.addClass(obj.class);
                    obj.btn.text("重新发送(" + _time + ")");
                } else {
                    clearInterval(myInterval);
                    _time = obj.time;
                    obj.btn.removeClass(obj.class);
                    obj.btn.text("发送验证码");
                    obj.btn.removeAttr('disabled');
                }
                _time--;
            };
            ReadTime();
            myInterval = setInterval(ReadTime, 1000);
            return _time;
        };

        if (!obj.count) {
            callback(send);
        } else {
            var d = localStorage.getItem(itemname);
            if (!d) {
                d = {
                    count: 0,
                    time: new Date().getTime()
                };
            } else {
                d = JSON.parse(d);
            };

            var nowtime = new Date().getTime();
            if (d.count < obj.count || (nowtime - d.time >= obj.limit)) {
                d.count >= obj.count ? d.count = 1 : d.count++;
                d.time = nowtime;
                localStorage.setItem(itemname, JSON.stringify(d));
                callback(send);
            } else {
                callback(obj.limittips)
            };

        };

    },
    /* 给数字添加千分号 */
    formatThousand: function (num) {
        return num && (num['replace'] || (num = num.toString())) && num.replace(/([\+\-])?(\d+)(\.\d+)?/, function (v) {
            var b = function (n) {
                var sn = n.toString(), r = '';
                for (var i = sn.length - 1, j = 1; i > -1; i--, j++) {
                    r = sn[i] + r;
                    if (i && j % 3 == 0) {
                        r = ',' + r;
                    }
                }
                return r;
            };
            return RegExp.$1 + b(RegExp.$2) + RegExp.$3.substring(0, 3);
        });
    },
    /*
        AutoScroll 使某个div一直滚动
        obj.show 可视区域
        obj.have  放置内容区域 
        obj.text1 滚动主要内容1
        obj.text2 滚动主要内容2
        obj.speed 滚动速度，越大越慢
    */
    AutoScroll: function (obj, callback) {
        var _show = $(obj.show);
        var _scroll = $(obj.scroll);
        var _text1 = $(obj.text1);
        var _text2 = $(obj.text2);
        _text2.html(_text1.html());
        var _speed = obj.speed || 10;
        var i = 0;
        _show.scrollLeft(i);
        var Start = function () {
            if (_text1.width() < _show.width()) {
                return false;
            } else {
                if (_show.scrollLeft() < _text1.width()) {
                    _show.scrollLeft(i++);
                } else {
                    i = 0;
                    _show.scrollLeft(0);
                }
            }
        };
        var MyInterval = setInterval(Start, _speed);
        _show.hover(function () {
            clearInterval(MyInterval);
        }, function () {
            MyInterval = setInterval(Start, _speed);
        });
    },
    /*
        item 要利用哪个 div 添加分页
        total 分成多少页
        i 当前页
        url 分页链接
    */
    page: function (item, total, i, url) {
        var url = url || "#";
        if (total < i) {
            throw ("你又传错值了，SB！");
        };
        $(item).empty();
        var h = "";
        for (var j = 1; j <= total; j++) {
            var a = url + j;
            if (j == i) {
                h = h + "<a class='active' href='" + a + "' data-page='" + j + "'>" + j + "</a>";
            } else {
                h = h + "<a href='" + a + "' data-page='" + j + "'>" + j + "</a>";
            }
        };
        $(item).append(h);
        if (total > 5) {
            $(item).children("a").each(function (index) {
                var _this = $(this);
                if ((index + 1) == 1 || (index + 1) == total || (((index + 1) >= (i - 2)) && ((index + 1) <= (i + 2)))) {
                    _this.show();
                    _this.attr("data-display", "1");
                } else {
                    _this.hide();
                    _this.attr("data-display", "0");
                };
            });
            var d = "<a>...</a>";
            var f = $(item + " a[data-page=" + 2 + "]").attr("data-display");
            var l = $(item + " a[data-page=" + (total - 1) + "]").attr("data-display");
            if (f == 0) {
                $(item + " a:first").after(d);
            };
            if (l == 0) {
                $(item + " a:last").before(d);
            };
        };
        if (i != 1) {
            var a = url + (i - 1);
            var prev = "<a href='" + a + "'>上一页</a>";
        } else {
            var prev = "<a href='#'>上一页</a>";
        };
        if (i != total) {
            var a = url + (i + 1);
            var next = "<a href='" + a + "'>下一页</a>";
        } else {
            var next = "<a href='#'>下一页</a>";
        };
        $(item + " a:first").before(prev);
        $(item + " a:last").after(next);
    },
    /*
        CanvasImg   把图片和文字最终生成一张图片
        用法
        var xxx = new chang.CanvasImg({
            canvas:     要借用哪个canvas生成
            finaImg:    生成到哪张图片那里 
            CanvasWidth:      canvas 设定宽度，默认为 320
            CanvasHeight:     canvas 设定高度，默认为 240
            finaImgWidth:     输出的 img 宽度，默认为 100%
            finaImgHeight:    输出的 img 高度，默认为 auto
            img: [{     要合成的 img 数组
                index:0     图片叠放顺序，值越大越靠前，默认为 0
                src:        引用图片的地址 
                width:      img 宽度
                height:     img 高度
                positionX:  img 在canvas中 X 坐标
                positionY:  img 在canvas中 Y 坐标
                radius:     img 棱角羽化情况
            }]
            text: [{    如果要输入文本
                text:""         要输入的文字
                color:""        文字的颜色
                size:""         文字大小    默认 12px
                weight:""       是否加粗    默认 normal，否则 bold 或者 100，200，...
                align:""        文字对齐方式  默认 left， 可填 center, right
                baseline:""     绘制文本时的当前文本基线  默认 top , 可填 middle, bottom
                width:""        文本框宽度   默认 canvas 宽度
                family: ""      字体类型， 默认 "Microsoft YaHei"
                positionX:""    文本框 X轴中心点
                positionY:""    文本框 Y轴中心点
            }]
            callback:           输出图片之后的回调
        });
    */
    CanvasImg: function (option) {
        var $canvas = $(option.canvas);
        var $finaImg = $(option.finaImg);
        var cWidth = option.CanvasWidth || 320;
        var cHeight = option.CanvasHeight || 240;
        var iWidth = option.finaImgWidth || "100%";
        var iHeight = option.finaImgHeight || "auto";
        var callback = option.callback;
        var img = option.img || "";
        var text = option.text || "";
        var c = $canvas[0];
        var ctx = c.getContext("2d");
        $canvas.attr("width", cWidth);
        $canvas.attr("height", cHeight);
        $finaImg.css("width", iWidth);
        $finaImg.css("height", iHeight);

        /* img 加载结束后才跑 */
        var ImgEnd = function () {
            if (text) {
                $.each(text, function (i, it) {
                    ctx.textBaseline = it.baseline || "top";
                    ctx.textAlign = it.align || "left";
                    it.size = it.size || "12px";
                    it.family = it.family || 'Microsoft YaHei';
                    it.weight = it.weight || "normal";
                    ctx.font = "normal normal " + it.weight + " " + it.size + " " + it.family;
                    ctx.fillStyle = it.color || "#000";
                    var X = it.positionX || 0;
                    var Y = it.positionY || 0;
                    var width = it.width || cWidth;
                    ctx.fillText(it.text, X, Y, width);
                });
            };

            var finaImg = c.toDataURL();
            $finaImg.attr("src", finaImg);
            return callback && callback(finaImg);
        };

        if (img) {
            var imgnews = [];
            /* 输出 imgnews 从小排到大 */
            var ImgSort = function (img) {
                if (img.length > 0) {
                    var min = img[0].index;
                    var k = 0;
                    for (var i = 0; i < img.length; i++) {
                        if (min > img[i].index) {
                            min = img[i].index;
                            k = i;
                        };
                    };
                    imgnews.push(img[k]);
                    img.splice(k, 1);
                    ImgSort(img);
                };
            };
            ImgSort(img);
            for (var i = 0; i < imgnews.length; i++) {
                var smallimg = imgnews[i];
                if (!smallimg.src) {
                    throw "please set img src";
                };
                smallimg.index = smallimg.index ? smallimg.index : 0;
                smallimg.positionX = smallimg.positionX ? smallimg.positionX : 0;
                smallimg.positionY = smallimg.positionY ? smallimg.positionY : 0;
            };

            /* 它是让图片羽化的 */
            var DrawImg = function (obj, x, y, w, h, r) {
                var ScaleX = w / obj.width;
                var ScaleY = h / obj.height;
                var pattern = ctx.createPattern(obj, "no-repeat");
                ctx.roundRect(x, y, w, h, r);
                ctx.translate(x, y);
                ctx.fillStyle = pattern;
                ctx.scale(ScaleX, ScaleY);
                ctx.fill();
                ctx.scale(1 / ScaleX, 1 / ScaleY);
                ctx.translate(-x, -y);
            };

            /* 图片渲染 */
            var imglength = imgnews.length;
            var ImgRender = function (i) {
                var it = imgnews[i];
                if (!it.width || !it.height) throw "img must have width & height";
                var ctximg = new Image();
                ctximg.src = it.src;
                ctximg.onload = function (e) {
                    i++;
                    if (!it.radius) {
                        ctx.drawImage(ctximg, it.positionX, it.positionY, it.width, it.height);
                    } else {
                        DrawImg(ctximg, it.positionX, it.positionY, it.width, it.height, it.radius);
                    };
                    if (i == imglength) {
                        ImgEnd();
                    } else {
                        ImgRender(i);
                    };
                };
            };
            ImgRender(0);

        } else {
            ImgEnd();
        };
    }
};

/* jq扩展方法 */
$.fn.extend({
    /* 
        手机版字体初始化
        $('html').MobileFont();
    */
    MobileFont: function () {
        var _this = this;
        var HtmlFont = function () {
            var _font = _win.width() / 320 * 10;
            if (_font < 14) {
                _this.css({ "font-size": _font });
            } else {
                _this.css({ "font-size": 14 });
            }
        };
        HtmlFont();
        _win.resize(function () {
            HtmlFont();
        });
    },
    /*
        使 div 里面的字从小到大显示出来
        $('div').NumberAnimation();
        z 要显示的最终数字
        t 多长时间显示完成
    */
    NumberAnimation: function (z, t, callback, c) {
        var g;
        var _this = this;
        z = z.toString();
        if (z.indexOf("-") != -1) {
            g = "-";
            z = -parseFloat(z);
        } else if (z.indexOf("+") != -1) {
            g = "+";
        } else {
            g = "";
        };
        t = t || 1000;
        var b = parseFloat(z);
        var i = b / 66;
        var v = 0;
        var f = function (v) {
            v = (v + i);
            if (v < b) {
                _this.text(g + v.toFixed(2));
                c && c();
                var a = setTimeout(function () { f(v) }, t / 66);
            }
            else {
                _this.text(g + b.toFixed(2));
                callback && callback();
            }
            return (g + b.toFixed(2));
        };
        return f(v);
    },
    /*
        PC 使 footer 一直在底部
        $('#footer').Footer();
    */
    Footer: function () {
        var _this = this;
        var h = _this.height();
        var w = _this.width();
        var a = "<div class='foot-hide' style='display:none; position: relative; height:" + h + "px; width:" + w + "px'></div>";
        _this.after(a);
        var f = function () {
            var wH = _win.height();
            var wW = _win.width();
            var bH = $('body').height();
            var bW = $('body').width();
            if (wH > bH) {
                $('.foot-hide').show();
                _this.css({
                    "position": "fixed",
                    "z-index": 2,
                    "bottom": 0,
                    "left": 0
                });
            } else {
                $('.foot-hide').hide();
                _this.css({ "position": "relative" });
            };
        };
        f();
        _win.resize(function () {
            f();
        });
    },
    /*
        悬浮窗漂浮
    */
    Suspend: function (i) {
        i = i || 150;
        var _this = this;
        var l = _this.offset().top;
        _win.scroll(function () {
            var h = _win.scrollTop();
            if (l - h > i) {
                _this.css({
                    "position": "absolute",
                    "top": l
                });
            } else {
                _this.css({
                    "position": "fixed",
                    "top": i
                });
            }
        });
    }
});
/*
    取出数组中最小值
*/
Array.prototype.Min = function () {
    var arr = this;
    if (!typeof (arr) == "object") {
        return "请传入 object 类型";
    } else {
        var l = arr.length;
        var min = parseFloat(arr[0]);
        for (var i = 0; i < l; i++) {
            if (min > parseFloat(arr[i])) {
                min = parseFloat(arr[i]);
            }
        };
        return min;
    }
};
/*
    取出数组中最大值
*/
Array.prototype.Max = function () {
    var arr = this;
    if (!typeof (arr) == "object") {
        return "请传入 object 类型";
    } else {
        var l = arr.length;
        var max = parseFloat(arr[0]);
        for (var i = 0; i < l; i++) {
            if (max < parseFloat(arr[i])) {
                max = parseFloat(arr[i]);
            }
        };
        return max;
    }
};
/*
    算出卡号中的卡号段，抛出去
*/
Array.prototype.card = function () {
    var arr = this;
    if (!typeof (arr) == "object") {
        return "请传入 object 类型";
    } else {
        var narr = [];
        var rarr = [];
        for (var i = 0; i < arr.length; i++) {
            var c = parseInt(arr[i].substr(4, 10));
            narr.push(c);
        }
        var s = 0;
        var e = 0;
        var f = function (i) {
            if (i < narr.length) {
                if (narr[i] + 1 == narr[i + 1]) {
                    i++;
                    f(i);
                } else {
                    e = i;
                    var data = {
                        scode: arr[s],
                        ecode: arr[e],
                    };
                    rarr.push(data);
                    s = i + 1;
                    f(s);
                }
            } else {
                return false;
            };
        };
        f(s);
        return rarr;
    }
};
/*
    绘制一块圆形 或 棱角羽化图形 
    obj传的是一个 new Image()
*/
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    var m = Math.min(w, h);
    if (r > m / 2) {
        r = m / 2
    };
    this.beginPath();
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
    this.closePath();
    return this;
};