

// 添加错误提示信息
function AddError(obj, msg) {
    obj.html('');
    obj.html('<span class="checkError"></span>' + msg);
}

// 移除错误提示信息
function RemoveError(obj) {
    obj.html('');
    obj.html('<span class="checkRight"></span>');
}

// 检查玩家账号
function CheckUserId(strUserId, obj) {
    strUserId = $.trim(strUserId);
    if (!CheckIsNull(strUserId)) {
        AddError(obj, "玩家账号不能为空");
        return false;
    }

    if (!/^[a-z][a-z0-9]{3,15}$/.test(strUserId) &&
           !/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(strUserId) &&
           !/^(1)\d{10}$/.test(strUserId)) {

        AddError(obj, "账号格式不正确");
        return false;
    }
    else {
        RemoveError(obj);
        return true;
    }
}

// 检查验证码
function CheckCheckCode() {

    var isShow = $('#CheckCodeShow').css("display");

    if (isShow == "none") {
        return true;
    }

    var code = $('#CheckCode').val();
    if (!CheckIsNull(code)) {
        $("#CheckCodeMsgDiv").html("");
        $("#CheckCodeMsgDiv").html('<span class="checkError">验证码不能为空</span>');
        return false;
    } else {
        $("#CheckCodeMsgDiv").html('<span class="checkRight"></span>');
        return true;

    }

    return true;
}

// 检查是否为空
function CheckIsNull(str) {
    if (str == "" || str == "手机/邮箱/普通账号") {
        return false;
    }
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    if (re.test(str)) {
        return false;
    }
    return true;
}

// 文本框输入时自动过滤空格
function TrimKeyUp(e) {
    var $this = $(this);

    if (e.keyCode != 38 && e.keyCode != 40 && e.keyCode != 13) {
        var $thisVal = $.trim($this.val());
        $this.val($thisVal);
    }
}

//计算折扣价
function GetPayMoney(obj) {
    return (obj * 1).toFixed(2);
}



$(document).ready(function () {
    //默认情况下给buycash赋值
    $("#PayMoney").html(GetPayMoney($("#BuyCash").val()));
    //检查玩家账号
    $('#UserId').blur(function () { CheckUserId($('#UserId').val(), $('#UserIdMsgDiv')); });
    //再次检查玩家账号
    $('#UserId2').blur(function () {
        CheckUserId($('#UserId2').val(), $('#UserId2MsgDiv'));
        if ($.trim($('#UserId').val()) != $.trim($('#UserId2').val())) {
            AddError($('#UserId2MsgDiv'), "输入账号不一致");
        }
    });

    //检查充值金额
    $('#OtherCash').blur(function () {
        //填写其他金额
        $("#EventList").find('a').removeClass().addClass("moneyRadio");
        if ($("#OtherCash").val() != "") {
            // 如果有填写自定义金额 则前面选择的面额取消选择样式
            $("#BuyCash").val($("#OtherCash").val());
            $("#PayMoney").html(GetPayMoney($("#BuyCash").val()));
        } else {
            $("#aProductId").addClass("moneyRadio moneyRadioSel");
            $("#BuyCash").val($("#aProductId").attr("title"));
            $("#PayMoney").html(GetPayMoney($("#BuyCash").val()));
            $('#BuyCashMsgDiv').html("");
        }
        if ($("#BuyCash").val() == "") {
            AddError($("#BuyCashMsgDiv"), "充值面额不能为空");
        } else {
            CheckUserCash();
        }
    });
    //检查验证码
    $("#CheckCode").blur(function () { CheckCheckCode(); });
    //金额切换
    $("#EventList").find("a").click(function () {
        $(this).addClass("moneyRadioSel").siblings("a").removeClass("moneyRadioSel");
    });
});


// 选择充值面额
function CheckEvent(obj) {
    // 如果前面有选择面额，则清空自定义金额
    $('#OtherCash').val("");
    $('#BuyCashMsgDiv').html("");

    $('#BuyCash').val(obj);
    $('#PayMoney').html(GetPayMoney($("#BuyCash").val()));
}

// 检查充值金额
function CheckUserCash() {
    var BuyCash = parseFloat(Number($('#BuyCash').val()));

    if (BuyCash < 0.01 || !BuyCash) {
        AddError($('#BuyCashMsgDiv'), "充值金额有误");
        return false;
    }

    //if (isNaN(BuyCash)) {
    //    AddError($('#BuyCashMsgDiv'), "请输入100的倍数");
    //    return false;
    //}
    //if (BuyCash % 100) {
    //    AddError($('#BuyCashMsgDiv'), "请输入100的倍数");
    //    return false;
    //}
    //else {
    //    RemoveError($('#BuyCashMsgDiv'));
    //    return true;
    //}

    RemoveError($('#BuyCashMsgDiv'));
    return true;
}



// 检查验证码
function CheckCheckCode() {

    var isShow = $('#CheckCodeShow').css("display");

    if (isShow == "none") {
        return true;
    }

    var code = $('#CheckCode').val();
    if (!CheckIsNull(code)) {
        $("#CheckCodeMsgDiv").html("");
        $("#CheckCodeMsgDiv").html('<span class="checkError">验证码不能为空</span>');
        return false;
    } else {
        $("#CheckCodeMsgDiv").html('<span class="checkRight"></span>');
        return true;

    }

    return true;
}


// 选择银行
function CheckBank(obj) {
    var bank = obj.split(',');
    $("#BankId").val(bank[0]);
    $("#BankName").val(bank[1]);
}

// 选择更多银行
function ChangeMoreBank() {
    var BankId = $("#moreBank").val();
    var BankName = $("#moreBank").find("option:selected").text()
    if (BankId != "-1") {
        $('#BankId').val(BankId);
        $('#BankName').val(BankName);
        RemoveError($("#BankIdMsgDiv"));
    } else {
        AddError($('#BankIdMsgDiv'), "充值渠道不能为空");
    }
}

