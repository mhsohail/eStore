using eStore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eStore.ViewModels
{
    public class FavoriteList
    {
        public List<FavoriteItem> FavoriteItems { get; set; }
        public Product NewProduct { get; set; }
    }
}