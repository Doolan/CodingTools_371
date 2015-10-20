using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(CodingTools_371.Startup))]
namespace CodingTools_371
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
