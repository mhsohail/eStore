using eStore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eStore.ViewModels
{
    public class ShoppingCartViewModel
    {
        public List<Cart> CartItems { get; set; }
        public decimal CartTotal { get; set; }
        public Product NewProduct { get; set; }
    }
}