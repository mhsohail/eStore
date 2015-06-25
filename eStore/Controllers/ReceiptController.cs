using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace eStore.Controllers
{
    public class ReceiptController : ApiController
    {
        // GET: api/Receipt
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Receipt/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Receipt
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Receipt/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Receipt/5
        public void Delete(int id)
        {
        }
    }
}
