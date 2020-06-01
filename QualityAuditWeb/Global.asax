<%@ Application Language="C#" %>

<script RunAt="server">
    void Application_Start(object sender, EventArgs e)
    {
        //UAP数据库配置
        HttpApplication app = sender as HttpApplication;
        //UAP.DataBase.Set("51liuliang1", "51flow", "xgg", "imitXGG852456.", 4000000);
        //UDP.Config.Set("51liuliang3", "51flow", "xgg", "imitXGG852456.");


        QualityAuditBLL.Init.Start();

    }

    void Application_End(object sender, EventArgs e)
    {
        //  在应用程序关闭时运行的代码
    }

    void Application_Error(object sender, EventArgs e)
    {
        Exception ex = Server.GetLastError().GetBaseException();
        //try
        //{
        //    Response.Redirect("/error?ErrorCode=" + ((HttpException)ex).GetHttpCode());
        //}
        //catch (Exception exx)
        //{
        //    Response.Redirect("/error?ErrorCode=" + 500);
        //}
        //错误状态码
        // 在出现未处理的错误时运行的代码
    }

    void Session_Start(object sender, EventArgs e)
    {
        // 在新会话启动时运行的代码
    }

    void Session_End(object sender, EventArgs e)
    {
        // 在会话结束时运行的代码。 
        // 注意: 只有在 Web.config 文件中的 sessionstate 模式设置为
        // InProc 时，才会引发 Session_End 事件。如果会话模式设置为 StateServer
        // 或 SQLServer，则不引发该事件。
    }
</script>
