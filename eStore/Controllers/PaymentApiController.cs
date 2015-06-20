using AuthorizeNet;
using eStore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace eStore.Controllers
{
    public class PaymentApiController : ApiController
    {

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
        public HttpResponseMessage Post(eStore.Models.Order order)
        {
            string ApiLogin = "2Vnc7H75By";
            string TxnKey = "9KnE8M58n694B2qR";

            string ccNumber = "4111111111111111";
            string ccExp = "1217";
            decimal TxnAmount = 10.12M;
            string TxnDescription = "Test Transaction";

            // Step 1 - Create the request
            var request = new AuthorizationRequest(ccNumber, ccExp, order.Total, TxnDescription);

            // Step 2 - Create the gateway, sending in your credentials
            var gateway = new Gateway(ApiLogin, TxnKey);

            // Step 3 - Send the request to the gateway
            var response = gateway.Send(request);

            var ResponseMsg = Request.CreateResponse<string>(response.ResponseCode + ":" + response.Message);
            return ResponseMsg;
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
