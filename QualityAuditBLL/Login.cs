using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UAP;

namespace QualityAuditBLL
{
    public class Login : UAP.Razor.Page
    {
        [UAP.Attr.HttpJson]
        public string doLogin(JSON data)
        {
            try
            {
                var retStr = data.ToString(true);
                var result = UAP.Function.Http.getPost("http://10.0.8.27:8027/api/user/Login", retStr);
                //var result = "{\"states\": 1,\"UserName\": \"222\",\"FactoryName\": \"壳厂\",\"Data\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJMb2dpbk5hbWUiOiIyMjIiLCJQYXNzd29yZCI6IjIyMiIsInRpbWVvdXQiOiIyMDIwLTAxLTE0VDE0OjAyOjU1LjQ4NTg3NzcrMDg6MDAifQ.5JvqzYlVxcdqVtlixSBeGCR7w_IDWPqF47haoMzWgw4\",\"ErrorMessage\": \"登录成功！\"}";
                var user = JSON.Decode(result);
                if (user.Int("states") == 1)
                {
                    user.Remove("states").Remove("ErrorMessage").Add("id", 1);
                    UAP.User.LoginByData(user);
                    return "ok";
                }
                return user.tryS("ErrorMessage");
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }
    }
}
