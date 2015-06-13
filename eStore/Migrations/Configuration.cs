namespace eStore.Migrations
{
    using eStore.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<eStore.Models.eStoreContext>
    {

        eStoreContext db = new eStoreContext();

        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(eStore.Models.eStoreContext context)
        {
            
            try
            {
                //Product p1 = new Product { Name = "USB Drive", Color = "White", Price = 3.45 };
                //db.Products.Add(p1);
                ////db.SaveChanges();
                //
                //Product p2 = new Product { Name = "Mobile Charger", Color = "Black", Price = 4.23 };
                //db.Products.Add(p2);
                ////db.SaveChanges();
                //
                //Product p3 = new Product { Name = "Data Cable", Color = "Black", Price = 2.34 };
                //db.Products.Add(p3);
                //db.SaveChanges();
            }
            catch (Exception exc)
            {

            }
            
        }
    }
}
