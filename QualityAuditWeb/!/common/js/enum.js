/*
    Dec:系统枚举类,请将系统一些公共的枚举类同步在此JSON，提供给系统读取，免读取系统数据库
    Author：戴跃雄
    Time：  2018/08/20
*/


var ext = {
    data: {
        sex: [
            { id: 0, text: '女' },
            { id: 1, text: '男' }
        ]
        , isactive: [
            { id: 0, text: '不启用' },
            { id: 1, text: '启用' }
        ]
        , taskFree: [
            { id: 0, text: '普通任务' },
            { id: 1, text: '免费任务' },
            { id: 2, text: '免费任务带收藏' }
        ]
        , userItype: [
            { id: 1, text: '普通会员' },
            { id: 2, text: 'VIP1' },
            { id: 3, text: 'VIP2' },
            { id: 4, text: 'VIP3' },
            { id: 5, text: 'VIP4 ' },
        ]
        , taskType: [
            { id: 0, text: '关键词任务' },
            { id: 1, text: '淘口令任务' },
            { id: 2, text: '词口令任务' },
            { id: 3, text: '货比三家' },
            { id: 4, text: '直访任务' },
            { id: 5, text: '类目搜索' },
            { id: 6, text: '店铺回访' },
            { id: 7, text: '直通车' },
        ]
        , taskState: [
            { id: 0, text: '待开启' },
            { id: 1, text: '已暂停' },
            { id: 2, text: '执行中' },
            { id: 3, text: '已停止' },
            { id: 4, text: '已完成' },
            { id: 5, text: '异常' },
            { id: 6, text: '已删除' },
        ]
        , queueState: [
            { id: 0, text: '待分配' },
            { id: 1, text: '已分配' },
            { id: 2, text: '已完成' },
        ]
        , taskPlatform: [
            { id: 0, text: '一号店' },
            { id: 1, text: '京东' },
            { id: 2, text: '淘宝' },
            { id: 3, text: '天猫' },
            { id: 4, text: '拼多多' },

        ]
        , taskDevice: [
            { id: 0, text: '移动端' },
            { id: 1, text: '电脑端' },
        ]
        , sellerBillCase: [
            { id: 0, text: '余额充值' },
            { id: 1, text: '京东任务发布订单扣款' },
            { id: 2, text: '淘宝任务发布订单扣款' },
            { id: 3, text: '天猫任务发布订单扣款' },
            { id: 4, text: '申请提现' },
            { id: 5, text: '拼多多任务发布订单扣款' },
            { id: 6, text: '推广商家奖励金额' },
            { id: 7, text: '停止任务返现' },
            { id: 8, text: '提现不通过' },
            { id: 9, text: '商家升级扣款' }
        ]
    }
};

function lay_form(o) {
    if (!o) return;
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
        return !0;
    })._es('select', function () {
        var m = this, x = m.getAttribute('lay-url'), j = m.getAttribute('lay-data');
        m.load = function (vs, e, r) {
            if (typeof vs == 'object') {
                m.selectedIndex = -1;
                m.options.length = 0;
                m.removeAttribute('disabled');
                if (!vs) return r && r();
                var v = m.getAttribute('value') || '';
                if (!m.getAttribute('multiple')) m.options.add(new Option('请选择...', ''));
                for (var j = 0; j < vs.length; j++) {
                    m.options.add(new Option(vs[j].text, vs[j]['id']));
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
        m.data = function (vs, e, r) {
            if (typeof vs != 'object') return;
            m.selectedIndex = -1;
            m.options.length = 0;
            m.removeAttribute('disabled');
            if (!vs) return r && r();
            var v = m.getAttribute('value') || '';
            if (!m.getAttribute('multiple')) m.options.add(new Option('请选择...', ''));
            for (var j = 0; j < vs.length; j++) {
                m.options.add(new Option(vs[j].text, vs[j]['id']));
                if (vs[j].id.toString() === v.toString()) {
                    m.selectedIndex = j;
                }
            }
            try {
                form.render();
            } catch (e) {

            }
        };
        if (x && x.length > 0) {
            m.removeAttribute('url');
            $(function () { m.load(x) });
        }
        if (j) {
            j = eval(j);
            m.removeAttribute('lay-data');
            $(function () { m.data(j) });
        }
        return !0;
    });
}
