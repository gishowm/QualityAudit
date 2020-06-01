using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PartnerBLL.Views
{
    [User]
    public class flows : ReadDataBaseListView
    {
        public flows()
        {
            this.setFilter("s", "e", "icase");
        }
        protected override string onFilter(string column, string value)
        {
            switch (column)
            {
                case "s":
                    return "optime>='" + value + " 00:00:00'";
                case "e":
                    return "optime<='" + value + " 23:59:59'";
            }
            return base.onFilter(column, value);
        }
        protected override string Table
        {
            get
            {
                return @"(select *,scase=" + Extend.EnumToCaseWhenSQL<Core.Enums.Distributor_Bill_Icase>("icase") + @" from tb_partner_bills where partnerid=" + UAP.User.Id + @")_";
            }
        }
    }
}
