using System;

namespace QualityAuditBLL.Views
{
    [User]
    public class index : UAP.Razor.Page
    {
        public int nums = 0;

        public override void OnLoad()
        {
            nums = 13;
            base.OnLoad();
        }
    }
}
