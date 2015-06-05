using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace eStore.Controllers
{
    public class CheckoutController : Controller
    {
        public ActionResult Billing()
        {
            return View();
        }

        public ActionResult Shipping()
        {
            return View();
        }
    }
}
