



document.writeln("<style>body{font:14px Helvetica Neue,Helvetica,PingFang SC,Tahoma,Arial,sans-serif}*{margin:0;padding:0;}h3{font-size:24px;padding-top:200px;}a{margin:0 10px;color:#fff;}</style>")
document.writeln("<div style=\'text-align:center;height:100%;width:100%;position:fixed;top:0;left:0;z-index:123456;background:#23b7e5;color:#dcf2f8\';>" +
                    "<h3>你的浏览器版本太low了,已经和时代脱轨了 :( </h3>" +
                    "<br />" + "<h4>请升级你的浏览器或使用双核极速浏览器</h4>" + "<br />" +
                    "<div class=\'text-center\'>" +
                        "推荐使用: &nbsp;" +
                        "<a href=\'https://www.google.cn/chrome/\' class=\'btn btn-primary\'>Google</a>" +
                        "<a href=\'http://www.firefox.com.cn/\' class=\'btn btn-danger\'>Firefox</a>" +
                        "<a href=\'https://browser.360.cn/ee/\' class=\'btn btn-danger\'>360极速浏览器</a>" +
                        "<a href=\'https://support.microsoft.com/zh-cn/help/17621/internet-explorer-downloads\' class=\'btn btn-info\'>Edge</a>" +
                    "</div>" +
                 "</div>");

if (window.stop()) window.stop();
document.execCommand("Stop");
