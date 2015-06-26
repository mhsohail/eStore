using eStore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace eStore.Controllers
{
    public class ReceiptsApiController : ApiController
    {
        eStoreContext db = new eStoreContext();

        // GET: api/ReceiptApi
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/ReceiptApi/5
        public IHttpActionResult Get(int id)
        {
            Receipt Receipt = null;

            //try
            {
                Receipt = db.Receipts.Find(id);
                if (Receipt == null)
                {
                    return NotFound();
                }
            }
            //catch(Exception exc)
            {
                // exc
            }

            return Ok(Receipt);
        }

        // POST: api/ReceiptApi
        public void Post(Receipt Receipt)
        {
            try
            {
                db.Receipts.Add(Receipt);
                db.SaveChanges();
            }
            catch(Exception exc) { }
        }

        // PUT: api/ReceiptApi/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/ReceiptApi/5
        public void Delete(int id)
        {
        }
    }
}
