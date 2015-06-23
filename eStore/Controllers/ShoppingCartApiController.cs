using eStore.Models;
using eStore.ViewModels;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Cors;

namespace eStore.Controllers
{
    public class ShoppingCartApiController : ApiController
    {

        eStoreContext db = new eStoreContext();

        // GET: api/ShoppingCartApi
        public HttpResponseMessage Get()
        {
            var cart = ShoppingCart.GetCart();
            
            // Set up our ViewModel
            var ShoppingCartVM = new ShoppingCartViewModel
            {
                CartItems = cart.GetCartItems(),
                CartTotal = cart.GetTotal()
            };

            var cookie = new CookieHeaderValue("session-id", "12345");
            cookie.Expires = DateTimeOffset.Now.AddDays(1);
            cookie.Domain = Request.RequestUri.Host;
            cookie.Path = "/";
            
            var resp = new HttpResponseMessage();
            resp = Request.CreateResponse<ShoppingCartViewModel>(HttpStatusCode.OK, ShoppingCartVM);
            resp.Headers.AddCookies(new CookieHeaderValue[] { cookie });
            var c = Request.Headers.GetCookies();
            
            return resp;
        }

        // GET: api/ShoppingCartApi/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/ShoppingCartApi
        public HttpResponseMessage Post(int qty, ShoppingCartViewModel scvm)
        {
            var CartItem = scvm.CartItems.FirstOrDefault(ci => ci.ProductId == scvm.NewProduct.ProductId);
            if (CartItem == null)
            {
                Cart cart1 = new Cart
                {
                    CartId = 1,
                    Count = qty,
                    DateCreated = DateTime.Now,
                    ProductId = scvm.NewProduct.ProductId,
                    RecordId = "1",
                    Product = scvm.NewProduct
                };

                scvm.CartItems.Add(cart1);
                scvm.CartTotal = scvm.CartTotal + (scvm.NewProduct.Price * qty);
            }
            else
            {
                // remove new product, so it cannot be appended to shopping cart DOM in javascript code
                scvm.CartTotal = scvm.CartTotal - (scvm.NewProduct.Price * CartItem.Count);
                CartItem.Count = qty;
                scvm.CartTotal = scvm.CartTotal + (scvm.NewProduct.Price * CartItem.Count);
                scvm.NewProduct = null;
            }

            NameValueCollection cookies = new NameValueCollection();
            cookies.Add("A", "1");
            cookies.Add("B", "2");
            cookies.Add("C", "3");

            var cookie = new CookieHeaderValue("session-id", cookies);
            cookie.Expires = DateTimeOffset.Now.AddDays(1);
            //cookie.Domain = Request.RequestUri.Host;
            //cookie.Path = "/";

            var resp = new HttpResponseMessage();
            resp = Request.CreateResponse<ShoppingCartViewModel>(HttpStatusCode.OK, scvm);
            resp.Headers.AddCookies(new CookieHeaderValue[] { cookie });
            resp.Headers.Add("ShoppingCart", new List<string> { "a","b","c" } as IEnumerable<string>);
            
            var c = Request.Headers.GetCookies();

            return resp;
        }

        // PUT: api/ShoppingCartApi/5
        public HttpResponseMessage Put(int id, int qty, ShoppingCartViewModel scvm)
        {
            var CartItem = scvm.CartItems.FirstOrDefault(ci => ci.ProductId == id);
            var Product = db.Products.FirstOrDefault(p => p.ProductId == CartItem.ProductId);

            if (CartItem != null && Product != null)
            {
                // remove new product, so it cannot be appended to shopping cart DOM in javascript code
                scvm.CartTotal = scvm.CartTotal - (Product.Price * CartItem.Count);
                CartItem.Count = qty;
                scvm.CartTotal = scvm.CartTotal + (Product.Price * CartItem.Count);
                scvm.NewProduct = Product;
            }

            var resp = new HttpResponseMessage();
            resp = Request.CreateResponse<ShoppingCartViewModel>(HttpStatusCode.OK, scvm);
            return resp;
        }

        // DELETE: api/ShoppingCartApi/5
        public HttpResponseMessage Delete(int id, ShoppingCartViewModel scvm)
        {
            Cart cart = null;
            if (id != null)
            {
                cart = scvm.CartItems.FirstOrDefault(ci => ci.ProductId == id);
            }

            if (cart != null)
            {
                Product product = db.Products.Find(id);
                scvm.CartTotal -= cart.Count * product.Price;
                scvm.CartItems.Remove(cart);
            }

            var resp = new HttpResponseMessage();
            resp = Request.CreateResponse<ShoppingCartViewModel>(HttpStatusCode.OK, scvm);
            return resp;
        }
    }
}
