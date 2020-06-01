using System;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;

namespace QualityAuditBLL
{
    public class Init
    {
        static string js = null, css = null, area = null;

        public static void Start()
        {
            //C:\Windows\Microsoft.NET\Framework\v4.0.30319\aspnet_regiis -i

            //全局JS压缩缓存
            UAP.Router.Add("/!/js", delegate (Match match, HttpContext c, bool h)
            {
                if (js == null || Current.HOST.Equals("localhost"))
                {
                    //if (Current.HOST != "localhost")
                    //{
                    //    js = string.Join("", System.IO.Directory.GetFiles(c.Server.MapPath("/!/auto-generate"), "*.js", SearchOption.AllDirectories).Select(f => "\r\n/*-" + Path.GetFileName(f) + "-*/" + UAP.Function.Compression.JavascriptCompress(File.ReadAllText(f))).ToArray()).Substring(2);
                    //}
                    //else
                    //{
                        js = string.Join("", System.IO.Directory.GetFiles(c.Server.MapPath("/!/auto-generate"), "*.js", SearchOption.AllDirectories).Select(f => "\r\n/*-" + Path.GetFileName(f) + "-*/" + File.ReadAllText(f)).ToArray()).Substring(2);
                    //}
                }
                c.Response.Cache.SetCacheability(HttpCacheability.Public);
                c.Response.Cache.SetExpires(DateTime.Now.AddDays(1));
                c.Response.Cache.SetLastModified(DateTime.Now);
                c.Response.ContentType = "text/javascript; charset=utf-8";
                c.Response.Write(js);
                return true;
            });

            //全局CSS压缩缓存
            UAP.Router.Add("/!/css", delegate (Match match, HttpContext c, bool h)
            {
                if (css == null || Current.HOST.Equals("localhost"))
                {
                    css = string.Join("", Directory.GetFiles(c.Server.MapPath("/!/auto-generate"), "*.css", SearchOption.AllDirectories).Select(f => File.ReadAllText(f)).ToArray());
                    if (Current.HOST != "localhost")
                    {
                        css = UAP.Function.Compression.CssCompress(css, UAP.Function.CssCompressLevel.Line);
                    }
                }
                c.Response.Cache.SetCacheability(HttpCacheability.Public);
                c.Response.Cache.SetExpires(DateTime.Now.AddDays(1));
                c.Response.Cache.SetLastModified(DateTime.Now);
                c.Response.ContentType = "text/css; charset=utf-8";
                c.Response.Write(css);
                return true;
            });

            //全局CSS压缩缓存
            UAP.Router.Add("/!/cls", delegate (Match match, HttpContext c, bool h)
            {
                js = css = null;
                return true;
            });
            //开启全局 cshtml -> razor 直接访问视图引擎
            UAP.Router.AddRazorEngine();
             
         


        }
    }
}
