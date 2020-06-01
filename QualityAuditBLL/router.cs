using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;

namespace FlowAgentBLL
{
    public class router : IHttpModule
    {
        public void Dispose()
        {
        }

        public void Init(HttpApplication context)
        {
            context.BeginRequest += Context_BeginRequest;
        }

        private void Context_BeginRequest(object sender, EventArgs e)
        {
            HttpApplication application = sender as HttpApplication;
            HttpContext context = application.Context; //上下文
            string url = context.Request.Url.LocalPath; //获得请求URL

            //if (url == "/" || url == "/index"||url=="/main")
            //{
            //    context.RewritePath("/views/index");
            //}
        }
    }
}
