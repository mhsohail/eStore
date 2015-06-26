using eStore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Microsoft.AspNet.Identity;

namespace eStore.Controllers
{
    public class HomeController : Controller
    {
        eStore.Models.eStoreContext db = new Models.eStoreContext();

        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            var UserId = User.Identity.GetUserId();
            var IsUserAuthenticated = User.Identity.IsAuthenticated;

            //var UID = RequestContext.Principal.Identity.GetUserId();
            //var IsUserAuthenticatedd = RequestContext.Principal.Identity.IsAuthenticated;
            
            return View();
        }
    }
}
