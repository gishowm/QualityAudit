using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using UAP;

namespace QualityAuditBLL
{
    public class User : UAP.User
    {
        public override bool onCheckLegal()
        {
            if (UAP.User.isGuest())
            {
                Current.Response.Redirect("/login");
            }
            return base.onCheckLegal();
        }
    }
}
