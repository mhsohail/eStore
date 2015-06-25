using eStore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace eStore.Controllers
{
    public class ReceiptApiController : ApiController
    {
        // GET: api/ReceiptApi
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/ReceiptApi/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/ReceiptApi
        public void Post(Receipt Receipt)
        {
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
