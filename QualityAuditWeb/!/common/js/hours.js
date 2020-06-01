
/*
** 任务时间
*/
function romanceHours(initialVal, bolAdd) {
    var initValue = initialVal || false;
    var sliData = {
        min: 0,
        max: 1000,
        value: 0
    };
    var bInitChange = false;
    if (bolAdd) {
        $('.hour_wrap ').find('input').attr('disabled', 'true');
    }
    $(".sbox").slider({
        orientation: "vertical",
        range: "min",
        min: sliData.min,
        max: sliData.max,
        value: sliData.value,
        animate: "fast",
        slide: function (event, ui) {
            $(this).siblings('.showing').val(ui.value);
            if (!$(this).hasClass('trans')) {
                $(this).addClass('trans');
            };
            bInitChange = false;
        },
        change: function (event, ui) {
            if (bInitChange) return;
            bInitChange = true;
            calcTotal();
            setTimeout(function () { $(this).removeClass('trans'); }.bind(this), 300);
        },
        disabled:bolAdd
    });
    $('.slider-in').find('.showing').val($(this).find('.sbox').slider('value'));
    $('.showing').on('change', function () {
        bInitChange = false;
        $(this).val(parseInt($(this).val()));
        if ($(this).val() >= sliData.max) {
            $(this).val(sliData.max);
            $(this).siblings('.sbox').slider({
                value: sliData.max
            })
        } else if ($(this).val() <= sliData.min) {
            $(this).val(sliData.min);
            $(this).siblings('.sbox').slider({
                value: sliData.min
            })
        }
    });
    $('.showing').on('input', function () {
        bInitChange = false;
        this.value = this.value.replace(/[^0-9]/g, '')
        $(this).siblings('.sbox').slider({
            value: $(this).val()
        })
    });

    //随机分配任务
    function weight_rand(numTote, objOdds) {

        /*
        **  任务数量分配
        **  任务总数
        **  初始概率
        */
        var arrCome = [];
        var nTote = numTote;
        var nTempChance = [];
        /*
        **  判断传入的概率 传入的是数字则概率相同
        */
        if (typeof (objOdds) === 'number') {
            for (var s = 0; s < objOdds; s++) {
                nTempChance.push(1)
            }
        } else if (typeof (objOdds) === 'object') {
            if (Array.isArray(objOdds)) {
                nTempChance = objOdds;
            } else {
                for (var temp in objOdds) {
                    nTempChance.push(objOdds[temp]);
                }
            }
        };

        /*
        **  创建对应的数组数
        */
        for (var i = 0; i < nTempChance.length; i++) {
            arrCome.push(0);
        }
        /*
        **  获取概率数
        */
        var nPre = 0; //概率总数
        var newChance = []; //创建新概率
        for (var d = 0; d < nTempChance.length; d++) {
            nPre += nTempChance[d];
        };
        if (nPre <= 0) nPre = 1;
        for (var c = 0; c < nTempChance.length; c++) {
            newChance.push(nTempChance[c] / nPre);
        };
        //根据权重返回随机数组下标
        function random(nce) {
            //创建随机数
            nPre = 0;
            for (var i = 0; i < newChance.length; i++) {
                nPre += newChance[i]
            }
            var nRan = Math.random() * nPre;
            var factor = 0;
            for (var i = nce.length - 1; i >= 0; i--) {
                factor += nce[i];
                if (nRan <= factor)
                    return i;
            };
            return null;
        }
        //根据权重分配任务
        for (var i = 0; i < nTote; i++) {
            var thisDom = random(newChance);
            arrCome[thisDom]++
        };
        //判断过剩任务
        var sMn = [];
        function foo() {
            var nSurplus = 0;
            for (var g = 0; g < arrCome.length; g++) {
                if (arrCome[g] > sliData.max) {
                    nSurplus += (arrCome[g] - sliData.max);
                    sMn.push(g)
                    arrCome[g] = sliData.max;
                }
            }
            if (!nSurplus) return arrCome;
            var tempSuChance = newChance;   //过剩重新分配任务概率;
            for (var l = 0; l < sMn.length; l++) {
                tempSuChance[sMn[l]] = 0;
            }
            var toChance = 0;
            for (var k = 0; k < tempSuChance.length; k++) {
                toChance += tempSuChance[k]
            }
            if (toChance === 0) {
                for (var n = 0; n < tempSuChance.length; n++) {
                    tempSuChance[n]++;
                }
                for (var f = 0; f < sMn.length; f++) {
                    tempSuChance[sMn[f]] = 0;
                }
            }
            for (var i = 0; i < nSurplus; i++) {
                var temp = random(tempSuChance);
                arrCome[temp]++
            }
            return foo();
        }

        foo();
        return arrCome;
    }
    /*
    **  任务概率
    */
    var tempodds = {
        '0': 0,
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 0,
        '7': 0,
        '8': 0.1,
        '9': 0.1,
        '10': 0.2,
        '11': 0.2,
        '12': 0.3,
        '13': 0.3,
        '14': 0.2,
        '15': 0.1,
        '16': 0.2,
        '17': 0.3,
        '18': 0.1,
        '19': 0.6,
        '20': 0.7,
        '21': 0.1,
        '22': 0,
        '23': 0,
    };

    //生成任务表格
    function makeTotal() {
        var nTotalVal = $('#baby_nums').val();
        if (nTotalVal > (sliData.max * 24)) {
            layer.alert('任务总数最多' + (sliData.max * 24));
            nTotalVal = sliData.max * 24;
            $('#baby_nums').val(sliData.max * 24);
        };
        var aCleatDom = weight_rand(nTotalVal, tempodds);
        if (initValue) aCleatDom = initValue;
        for (var i = 0; i < aCleatDom.length; i++) {
            $('.hour_wrap .sbox').eq(i).slider({
                value: aCleatDom[i]
            })
            $('.hour_wrap .showing').eq(i).val(aCleatDom[i]);
        };
        bInitChange = true;
        setTimeout(calcTotal, 100);
    };
    $('#baby_nums').on('change', makeTotal);
    makeTotal();
    //计算任务总数
    function calcTotal() {
        var tempTotal = 0;
        $.each($('.hour_wrap .slider-in'), function (index, item) {
            tempTotal += parseInt($(item).find('.showing').val());
        });
        $('#baby_nums').val(tempTotal);
        $('#sucmoney').trigger('click');
    }
}