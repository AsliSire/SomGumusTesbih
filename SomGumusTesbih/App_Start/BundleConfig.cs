using System.Web;
using System.Web.Optimization;

namespace SomGumusTesbih
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/som").Include(
                      "~/Scripts/velocity.min.js",
                      "~/Scripts/addtocart.js",
                      "~/Scripts/navigation.js",
                      "~/Scripts/sidecart.js",
                      "~/Scripts/slider.js",
                      "~/Scripts/accordion-menu.js",
                      "~/Scripts/snap.svg-min.js",
                      "~/Scripts/main.js",
                      "~/Scripts/social.js",
                       "~/Scripts/map.js",
                      "~/Scripts/paginate.js",
                      "~/Scripts/back-to-top.js",
                      "~/Scripts/magnifying.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/reset.css",
                      "~/Content/bootstrap.css",
                      "~/Content/slider.css",
                      "~/Content/accordion-menu.css",
                      // "~/Content/sidecart.css",
                      "~/Content/addtocart.css",
                      "~/Content/navigation.css",
                      "~/Content/social.css",
                      "~/Content/style.css",
                      "~/Content/footer.css",
                      "~/Content/pagination.css",
                      "~/Content/back-to-top.css",
                      "~/Content/mobile-menu.css",
                      "~/Content/magnifying.css"));

        }
    }
}
