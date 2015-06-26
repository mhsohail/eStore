using AuthorizeNet;
using eStore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using Microsoft.AspNet.Identity;
using System.IO;

namespace eStore.Controllers
{
    public class PaymentApiController : ApiController
    {
        eStoreContext db = new eStoreContext();

        public PaymentApiController()
        {
            //db.Database.CommandTimeout = 180;
        }

        // GET: api/PaymentApi
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/PaymentApi/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/PaymentApi
        public HttpResponseMessage Post(eStore.Models.Order Order)
        {
            try
            {
                string ApiLogin = "2Vnc7H75By";
                string TxnKey = "9KnE8M58n694B2qR";

                string ccNumber = "4111111111111111";
                string ccExp = "1217";
                decimal TxnAmount = 10.12M;
                string TxnDescription = "Test Transaction";

                // Step 1 - Create the request
                var ADNRequest = new AuthorizationRequest(ccNumber, ccExp, Order.Total, TxnDescription);

                // Step 2 - Create the gateway, sending in your credentials
                var gateway = new Gateway(ApiLogin, TxnKey);

                // Step 3 - Send the request to the gateway
                var ADNResponse = gateway.Send(ADNRequest);

                var Receipt = new Receipt();
                Receipt.OrderId = Order.OrderId;
                Receipt.DateTime = DateTime.Now;
                Receipt.UserId = Order.UserId;
                Receipt.PayedAmount = ADNResponse.Amount;
                Receipt.Message = ADNResponse.Message;
                Receipt.TransactionId = ADNResponse.TransactionID;
                Receipt.CardNumber = ADNResponse.CardNumber;
                Receipt.DateTime = DateTime.Now;
                
                /*
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                string ReceiptSerialized = serializer.Serialize(Receipt);

                string serviceUrl = string.Format("http://localhost:4785/api/ReceiptApi");
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(serviceUrl);
                request.Method = "POST";
                request.ContentType = "application/json; charset=UTF-8";
                request.Accept = "application/json; charset=UTF-8";

                using (var streamWriter = new StreamWriter(request.GetRequestStream()))
                {
                    streamWriter.Write(ReceiptSerialized);
                    streamWriter.Flush();
                    streamWriter.Close();
                }

                var httpResponse = (HttpWebResponse)request.GetResponse();
            
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    var responstText = streamReader.ReadToEnd();
                }
                */
                var ResponseMsg = Request.CreateResponse<Receipt>(HttpStatusCode.OK, Receipt);
                return ResponseMsg;
            }
            catch(Exception exc)
            {
                var ResponseMsg = Request.CreateErrorResponse(HttpStatusCode.InternalServerError, exc.Message);
                return ResponseMsg;
            }
        }

        // PUT: api/PaymentApi/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/PaymentApi/5
        public void Delete(int id)
        {
        }
    }
}
