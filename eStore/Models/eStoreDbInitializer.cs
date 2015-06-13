using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace eStore.Models
{
    public class eStoreDbInitializer : DropCreateDatabaseAlways<eStoreContext>
    {
        protected override void Seed(eStoreContext db)
        {
            using(var transaction = db.Database.BeginTransaction())
            {
                try
                {
                    db.Products.Add(new Product
                    {
                        Name = "USB",
                        Color = "Black",
                        Price = 5.23M
                    });

                    db.Products.Add(new Product
                    {
                        Name = "PTCL Evo",
                        Color = "White",
                        Price = 20.23M
                    });

                    db.Products.Add(new Product
                    {
                        Name = "Samsung S3",
                        Color = "Black",
                        Price = 12.23M
                    });

                    db.Products.Add(new Product
                    {
                        Name = "iPhone 4",
                        Color = "White",
                        Price = 35.23M
                    });

                    db.SaveChanges();
                    transaction.Commit();
                }
                catch(Exception exc)
                {
                    transaction.Rollback();
                }
            }
            
            base.Seed(db);
        }
    }
}