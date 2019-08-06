using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(SomGumusTesbih.Startup))]
namespace SomGumusTesbih
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
