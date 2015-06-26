using eStore.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace eStore.Controllers
{
    public class OrdersApiController : ApiController
    {
        eStoreContext db = new eStoreContext();

        // GET: api/OrderApi
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/OrderApi/5
        public IEnumerable<Order> Get(string UserId)
        {
            IEnumerable<Order> orders = new List<Order>();
            if (UserId != null)
            {
                orders = db.Orders.Where(o => o.UserId.Equals(UserId)) as IEnumerable<Order>;
            }

            return orders;
        }

        // POST: api/OrderApi
        public HttpResponseMessage Post(Order Order)
        {
            HttpResponseMessage response;
            
            using(var transaction = db.Database.BeginTransaction())
            {
                try
                {
                    Order.OrderDate = DateTime.Now;
                    db.Orders.Add(Order);
                    db.SaveChanges();

                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    string OrderSerialized = serializer.Serialize(Order);

                    string serviceUrl = string.Format("http://localhost:4785/api/PaymentApi");
                    HttpWebRequest request = (HttpWebRequest)WebRequest.Create(serviceUrl);
                    request.Method = "POST";
                    request.ContentType = "application/json; charset=UTF-8";
                    request.Accept = "application/json; charset=UTF-8";

                    using (var streamWriter = new StreamWriter(request.GetRequestStream()))
                    {
                        streamWriter.Write(OrderSerialized);
                        streamWriter.Flush();
                        streamWriter.Close();
                    }

                    var httpResponse = (HttpWebResponse)request.GetResponse();
                    Receipt Receipt = null;
                    using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                    {
                        var responstText = streamReader.ReadToEnd();
                        Receipt = serializer.Deserialize<Receipt>(responstText);
                    }

                    db.Receipts.Add(Receipt);
                    db.SaveChanges();

                    response = Request.CreateResponse<Receipt>(HttpStatusCode.OK, Receipt);
                    transaction.Commit();
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
