using eStore.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace eStore.Controllers
{
    public class FavoriteListApiController : ApiController
    {
        // GET: api/FavoriteListApi
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/FavoriteListApi/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/FavoriteListApi
        public HttpResponseMessage Post(FavoriteList fl)
        {
            var FavoriteItem = fl.FavoriteItems.SingleOrDefault(fi => fi.ProductId == fl.NewProduct.ProductId);

            if (FavoriteItem == null)
            {
                FavoriteItem favoriteItem = new FavoriteItem
                {
                    FavoriteItemId = 1,
                    DateCreated = DateTime.Now,
                    ProductId = fl.NewProduct.ProductId,
                    RecordId = "1",
                    Product = fl.NewProduct
                };

                fl.FavoriteItems.Add(favoriteItem);
            }
            else
            {
                // item already exists    
            }
            
            var resp = new HttpResponseMessage();
            resp = Request.CreateResponse<FavoriteList>(HttpStatusCode.OK, fl);
            
            return resp;
        }

        // PUT: api/FavoriteListApi/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/FavoriteListApi/5
        public void Delete(int id)
        {
        }
    }
}
