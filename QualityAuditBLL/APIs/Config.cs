using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Web;
using UAP;

namespace FlowAgentBLL
{
    /// <summary>
    /// 代理商发布系统配置
    /// </summary>
    public class Config
    {
        #region 环境配置基础属性
        public static string APIKEY = "bdebb9c6326eb32253ddd4633b124d64";

#if DEBUG
        public const string APIURL_BASE = "http://192.168.0.57";

#else
        public const string APIURL_BASE = "http://agent-api.51liuliangshenqi.com";
#endif
        public static string FileService = "http://upload.51liuliangshenqi.com/";
        private static JSON doMainInfo = null;
        public static string SESSION_HOST = "$AGENT_PARTNER_SESSION_HOST";
        #endregion

        public static bool IsMobile
        {
            get
            {
                bool result = false;
                HttpContext context = HttpContext.Current;
                if (context != null)
                {
                    HttpRequest request = context.Request;
                    string useragent = request.UserAgent.ToLower();
                    if (useragent.IndexOf("android") > -1 || useragent.IndexOf("ipod") > -1 || useragent.IndexOf("iphone") > -1 || useragent.IndexOf("ipad") > -1 || useragent.IndexOf("ucweb") > -1)
                    {
                        result = true;
                    }
                }
                return result;
            }
            set { IsMobile = value; }
        }

    }
}
