using AuthorizeNet;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace eStore.Controllers
{
    public class PaymentController : Controller
    {
        // GET: Payment
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult DPM()
        {
            String ApiLogin = "2Vnc7H75By";
            String TxnKey = "9KnE8M58n694B2qR";

            String DPMFormOpen = DPMFormGenerator.OpenForm(ApiLogin, TxnKey, 10.25M, string.Empty, true);
            String DPMFormEnd = DPMFormGenerator.EndForm();
            ViewBag.DPMFormOpen = DPMFormOpen;
            ViewBag.DPMFormEnd = DPMFormEnd;

            return View();
        }

        public ActionResult ccinfo()
        {
            return View();
        }

        // GET: Pay/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Pay/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Pay/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Pay/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Pay/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Pay/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Pay/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
