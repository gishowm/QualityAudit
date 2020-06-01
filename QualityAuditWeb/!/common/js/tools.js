
//Ŀ¼����
function Basic(obj) {
    var arrLoads = [];
    var strPath = obj.path || '/!/';
    var sMark = '?';
    typeof (obj.loading) === 'string' ? arrLoads.push(obj.loading) : arrLoads = obj.loading.unique();
    if (obj.mark) {
        for (var keys in obj.mark) {
            sMark += (keys + '=' + obj.mark[keys] + '&');
        }
        sMark = sMark.slice(0, -1);
    }
    for (var i = 0; i < arrLoads.length; i++) {
        var sHrefLoad = strPath + arrLoads[i];
        var sType = sHrefLoad.substr(-3);
        if (sHrefLoad.indexOf('?') >= 0) {
            sType = sHrefLoad.substr(sHrefLoad.indexOf('?') - 3, 3);
        };
        if (obj.mark) {
            if (obj.nums && Array.isArray(obj.nums)) {
                if (obj.nums.indexOf(i) >= 0) {
                    sHrefLoad += sMark;
                }
            } else {
                if (obj.nums && obj.nums !== 'all') {
                    if (sType.indexOf(obj.nums) >= 0) {
                        sHrefLoad += sMark;
                    }
                } else {
                    sHrefLoad += sMark;
                }
            }
        }
        switch (sType) {
            case 'css':
                document.writeln('<link href="' + sHrefLoad + '" type="text/css" rel="stylesheet" >')
                break;
            case '.js':
                document.writeln('<script src="' + sHrefLoad + '" type="text/javascript" ><\/script>')
                break;
            default:
                document.writeln('<link href="' + sHrefLoad + '" rel="stylesheet" >')
                break;
        }
    }
    return obj;
}

//����ȥ��
Array.prototype.unique = function () {
    var temp = [];
    for (var i = 0; i < this.length; i++) {
        if (temp.indexOf(this[i]) < 0) {
            temp.push(this[i]);
        }
    }
    return temp;
}

//ʱ���ʽ�� new Date(blog.AddTime).format('yyyy-MM-dd hh:mm:ss');
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

//��������еĿ�����
Array.prototype._trim = function () {
    for (var k in this) {
        if (this.hasOwnProperty(k)) {
            if (this[k] === '') this.splice(k, 1);
        };
    };
    return this;
}

//trigger�����¼�
function trigger(dom, event) {
    var triDom = dom;
    if (document.all) {
        triDom.click();
    } else {
        var e = document.createEvent("MouseEvents");
        e.initEvent(event, true, true);
        triDom.dispatchEvent(e);
    }
}

//��ȡ����ҳ�����
function getRequest(str) {
    var url = str;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var strs = url.substr(1);
        strData = strs.split("&");
        for (var i = 0; i < strData.length; i++) {
            var arrTemp = strData[i].split("=");
            var arrIns = arrTemp[2] ? '=' + arrTemp[2] : '';
            theRequest[arrTemp[0]] = unescape(arrTemp[1]) + arrIns;
        }
    }
    return theRequest;
}

//���������
function ceartArr(obj) {
    var newObj = {};
    var arrName = [];
    for (var keys in obj) {
        newObj[keys] = obj[keys];
        var strKeys = keys.substr(0, keys.indexOf('['));
        if (keys.indexOf('[') >= 0 && arrName.indexOf(strKeys) < 0) {
            arrName.push(strKeys);
        }
    }
    for (var i = 0; i < arrName.length; i++) {
        var objTemp = {};
        for (var k in newObj) {
            if (k.indexOf(arrName[i] + '[') === 0) {
                var kName = k.split('[')[1].slice(0, -1);
                objTemp[kName] = obj[k];
                delete newObj[k];
            }
        }
        newObj[arrName[i]] = objTemp;
    }
    return newObj;
};