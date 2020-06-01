using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UAP;

namespace FlowAgentBLL.APIs
{
    public class ApiReturn
    {
        internal static string Get(int errCode, string errMessage)
        {
            return new JSON().Add("Err_Code", errCode).Add("Err_Msg", errMessage).ToString(true);
        }
    }
}
