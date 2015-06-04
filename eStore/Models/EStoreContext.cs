﻿using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace eStore.Models
{
    public class EStoreContext : IdentityDbContext<ApplicationUser>
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx

        public EStoreContext()
            : base("name=EStoreContext", throwIfV1Schema: false)
        {
        }

        public System.Data.Entity.DbSet<eStore.Models.Product> Products { get; set; }
        public System.Data.Entity.DbSet<eStore.Models.Cart> Carts { get; set; }
        public System.Data.Entity.DbSet<eStore.Models.OrderDetail> OrderDetails { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    
    }
}
