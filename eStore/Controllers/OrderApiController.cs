using eStore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace eStore.Controllers
{
    public class OrderApiController : ApiController
    {
        EStoreContext db = new EStoreContext();

        // GET: api/OrderApi
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/OrderApi/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/OrderApi
        public void Post(Order order)
        {
            using(var transaction = db.Database.BeginTransaction())
            {
                try
                {
                    order.OrderDate = DateTime.Now;
                    db.Orders.Add(order);
                    //db.SaveChanges();
                    //transaction.Commit();
                }
                catch(Exception exc)
                {
                    transaction.Rollback();
                }
            }
        }

        // PUT: api/OrderApi/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/OrderApi/5
        public void Delete(int id)
        {
        }
    }
}
