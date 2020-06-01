using System;
using System.Net;
using System.Text;
using UAP;

namespace FlowAgentBLL.APIs
{
    [API]
    public class test
    {
        public static dynamic getJDBabyInfo(string goodsUrl)
        {
            JSON urlData = new JSON
                    { 
                       { "shopid", Core.Tasks.JDTask.getInfoByUrlAndKey(goodsUrl, Core.Tasks.JDTask.Feilds.店铺编号) },
                       { "goodsid",Core.Tasks.JDTask.getInfoByUrlAndKey(goodsUrl, Core.Tasks.JDTask.Feilds.宝贝编号)},
                       { "shopName", Core.Tasks.JDTask.getInfoByUrlAndKey(goodsUrl, Core.Tasks.JDTask.Feilds.店铺名称) },
                       { "goodsprice", Core.Tasks.JDTask.getInfoByUrlAndKey(goodsUrl, Core.Tasks.JDTask.Feilds.宝贝价格) },
                       { "shopUrl", Core.Tasks.JDTask.getInfoByUrlAndKey(goodsUrl, Core.Tasks.JDTask.Feilds.店铺链接) },
                       { "babyName", Core.Tasks.JDTask.getInfoByUrlAndKey(goodsUrl, Core.Tasks.JDTask.Feilds.宝贝名称) },
                       { "brandName", Core.Tasks.JDTask.getInfoByUrlAndKey(goodsUrl, Core.Tasks.JDTask.Feilds.宝贝品牌) },
                       { "categoryName", Core.Tasks.JDTask.getInfoByUrlAndKey(goodsUrl, Core.Tasks.JDTask.Feilds.宝贝分类) },
                       { "marketTime", Core.Tasks.JDTask.getInfoByUrlAndKey(goodsUrl, Core.Tasks.JDTask.Feilds.上市时间) },
                       { "appliesCrowd",Core.Tasks.JDTask.getInfoByUrlAndKey(goodsUrl, Core.Tasks.JDTask.Feilds.适用人群) },
                       { "appliesSeason",Core.Tasks.JDTask.getInfoByUrlAndKey(goodsUrl, Core.Tasks.JDTask.Feilds.适用季节) },
                       { "appliesPlace",  Core.Tasks.JDTask.getInfoByUrlAndKey(goodsUrl, Core.Tasks.JDTask.Feilds.适用场地) },
                       { "appliesGender", Core.Tasks.JDTask.getInfoByUrlAndKey(goodsUrl, Core.Tasks.JDTask.Feilds.适用性别) },
                       { "appliesAge", Core.Tasks.JDTask.getInfoByUrlAndKey(goodsUrl, Core.Tasks.JDTask.Feilds.适用年龄) },
                       { "domesticEntrance",Core.Tasks.JDTask.getInfoByUrlAndKey(goodsUrl, Core.Tasks.JDTask.Feilds.进口国产) },
                       { "image",Core.Tasks.JDTask.getInfoByUrlAndKey(goodsUrl, Core.Tasks.JDTask.Feilds.宝贝主图) },
                       { "goodsShortName", Core.Tasks.JDTask.getInfoByUrlAndKey(goodsUrl, Core.Tasks.JDTask.Feilds.宝贝名称) },
                    };
            urlData.Add("startprice", urlData.String("goodsprice"));
            urlData.Add("endprice", urlData.String("goodsprice"));
            return urlData;
        }
    }
}
