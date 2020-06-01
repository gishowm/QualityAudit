$.fn.extend({
    renderForm: function (msg, data, url, target) {
        var containner = $(this);
        var f = NEW({
            $: "form",
            style: {
                "position": "fixed"
             , "left": "35%"
             , "top": "190px"
             , "background": "#2e3846"
             , "z-index": "9999"
             , "width": "450px"
             , "box-shadow": "0 2px 4px 0 rgba(0,0,0,.3)"
             , "border-radius": "3px"
             , "background-clip": "padding-box"
             , "color": "#FFF"
            , "height": "160px"
             , "text-align": " center"
             , "padding": "40px 0px"
            }
        });
        f.appendChild(NEW({
            $: "div",
            innerHTML: msg
        }, msg));
        for (var k in data) {
            f.appendChild(NEW({
                $: 'INPUT'
                , type: 'hidden'
                , name: k
                , value: data[k]
            }));
        }
        f.className = "animated fadeIn";
        f.method = 'POST';
        f.action = url;
        f.target = target || '_self';
        f.appendChild(NEW({
            $: 'INPUT'
            , type: 'submit'
            , value: "提交"
            , style: {
                position: "absolute",
                right: "85px",
                width: "75px",
                bottom: "5px",
                color: "#FFF",
                border: "0",
                background: "#f44a56",
                transition: "all ease .3s",
                "user-select": "none",
                "background-clip": "padding-box",
                "border-radius": "3px",
                padding: "5px 0px"
            }
        }));
        f.appendChild(NEW({
            $: 'INPUT'
            , type: 'button'
            , value: "取消"
            , onclick: function () {
                $(this).parents("#formconfirm").remove();
            }
            , style: {
                position: "absolute",
                right: "5px",
                bottom: "5px",
                width: "75px",
                background: "#795aac",
                color: "#FFF",
                border: "1px solid #EEE",
                padding: "5px 0px",
                border: "0",
                //background: "#067520",
                transition: "all ease .3s",
                "user-select": "none",
                "background-clip": "padding-box",
                "border-radius": "3px",
            }
        }));
        var mask = NEW({
            $: "div",
            id: "formconfirm",
            style: {
                position: "fixed",
                width: "100%",
                height: "100%",
                top: 0,
                background: "rgba(144, 144, 144, 0.45)"
            }
        });
        mask.appendChild(f);
        $(containner).append(mask);
    }
});