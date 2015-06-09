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
        public IEnumerable<Order> Get(string userName)
        {
            IEnumerable<Order> orders = new List<Order>();
            if (userName != null)
            {
                orders = db.Orders.Where(o => o.Email.Equals(userName)) as IEnumerable<Order>;
            }

            return orders;
        }

        // POST: api/OrderApi
        public HttpResponseMessage Post(Order order)
        {
            HttpResponseMessage response;

            using(var transaction = db.Database.BeginTransaction())
            {
                try
                {
                    order.OrderDate = DateTime.Now;
                    db.Orders.Add(order);
                    db.SaveChanges();
                    transaction.Commit();
                    response = Request.CreateResponse<string>(HttpStatusCode.OK, "Order placed");
                }
                catch(Exception exc)
                {
                    transaction.Rollback();
                    response = Request.CreateErrorResponse(HttpStatusCode.InternalServerError, exc.Message);
                }
            }

            return response;
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
