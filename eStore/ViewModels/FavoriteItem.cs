using eStore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eStore.ViewModels
{
    public class FavoriteItem
    {
        public int FavoriteItemId { get; set; }
        public string RecordId { get; set; }
        public int ProductId { get; set; }
        public System.DateTime DateCreated { get; set; }

        public virtual Product Product { get; set; }
    }
}