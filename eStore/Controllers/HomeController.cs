using eStore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace eStore.Controllers
{
    public class HomeController : Controller
    {
        eStore.Models.EStoreContext db = new Models.EStoreContext();

        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
    }
}
