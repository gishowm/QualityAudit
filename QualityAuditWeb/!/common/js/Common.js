

//预加载layui模块
layui.use(['layer', 'laydate', 'form'], function () {
    var layer = layui.layer,
        laydate = layui.laydate,
        form = layui.form;
});
var arrTips = {
    tips: [1, '#f05050'],
    time: 1000
};

//延迟 delayLoading(str, num, fn, dom); 依赖于layui.layer模块
function delayLoading(message, surTime, callback, dom) {
    layui.use('layer', function () {
        var layer = layui.layer;
        var jsonData = {
            sInfo: message,
            surTime: surTime || 3,
        }
        var domThis = dom || false;
        domThis ? domThis.onclick = null : false;
        var timer = null, fMsg = null, timersucc = null;
        clearInterval(timer);
        clearTimeout(timersucc);
        fMsg = layer.msg(jsonData.sInfo + jsonData.surTime, { time: 1000 });
        timer = setInterval(function () {
            jsonData.surTime >= 1 ? jsonData.surTime-- : jsonData.surTime;
            fMsg = layer.msg(jsonData.sInfo + jsonData.surTime);
        }, 1000);
        timersucc = setTimeout(function () {
            layer.close(fMsg)
            clearInterval(timer);
            callback && callback();
        }, 1000 * surTime);

    });
}

//验证关键字
function matching(eledom, reg, replaceStr, message) {
    var regs = reg || /[^\u4e00-\u9fa5a-zA-Z\d,\，]+/;
    var str = replaceStr || '';
    var mes = arguments.length === 3 ? '格式有误，请重新输入！' : message ? message : false;
    if ($(eledom).val().search(regs) >= 0) {
        if (mes) layer.tips(mes, $(eledom), arrTips);
        $(eledom).val($(eledom).val().replace(regs, str));
    }
}
//限制请求一次
function fnPublishTimer(objId, strTxt, nTime, strLoading) {
    var oBtnPublish = document.getElementById(objId);
    var i = nTime || 3;
    var strLod = strLoading || '请求中...';
    oBtnPublish.disabled = 'disabled';
    oBtnPublish.style.cursor = 'no-drop';
    oBtnPublish.innerText = strLod + i;
    var timer = setInterval(function () {
        i <= 1 ? clearInterval(timer) : i--;
        oBtnPublish.innerText = strLod + i;
    }, 1000);
    setTimeout(function () {
        oBtnPublish.disabled = '';
        oBtnPublish.style.cursor = 'pointer';
        oBtnPublish.innerText = strTxt;
    }, 1000 * i);
}

//分配表单数据
var tempFormArrDom = [];
function fillform(formDataInfo, callback) {
    if (formDataInfo) tempFormArrDom = [];
    for (var key in formDataInfo) {
        var oInput = document.querySelector('input[name="' + key + '"]');
        if (oInput) {
            oInput.value = formDataInfo[key];
            tempFormArrDom.push(oInput);
        };
    }
    try {
        callback(formDataInfo, tempFormArrDom);
    } catch (e) {
        if (!formDataInfo) {
            for (var i = 0; i < tempFormArrDom.length; i++) {
                tempFormArrDom[i].value = '';
            }
            tempFormArrDom = [];
        };
    }
}

try {
    //jQuery方法
    $(function () {
        $.fn.extend({
            //切换方法tab
            swi: function (tabSwiCont, tabSwiClass) {
                var oLength = arguments.length;
                oLength === 1 ? tabSwiClass = tabSwiCont : '';
                $(this).click(function () {
                    $(this).addClass(tabSwiClass).siblings().removeClass(tabSwiClass);
                    if (tabSwiCont !== '' && tabSwiCont !== null && tabSwiCont !== 'undefined' && tabSwiClass !== tabSwiCont && oLength !== 1) {
                        $(tabSwiCont).children().eq($(this).index()).addClass(tabSwiClass).siblings().removeClass(tabSwiClass);
                    }
                })
            },
            //阻止事件冒泡
            eStop: function () {
                $(this).click(function (e) {
                    e.stopPropagation();
                    return this;
                })
            }
        })
    })
} catch (e) {
    console.log('jQuery is not loaded;')
}




