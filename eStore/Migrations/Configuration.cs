namespace eStore.Migrations
{
    using eStore.Models;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<eStore.Models.eStoreContext>
    {

        eStoreContext db = new eStoreContext();

        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            AutomaticMigrationDataLossAllowed = false;
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

                //this is for creating user
                var userStore = new UserStore<ApplicationUser>(db);
                var userManager = new UserManager<ApplicationUser>(userStore);
                if (!(db.Users.Any(u => u.UserName == "sohailx2x@yahoo.com")))
                {
                    var userToInsert = new ApplicationUser { UserName = "sohailx2x@yahoo.com", Email = "sohailx2x@yahoo.com", PhoneNumber = "03035332033", LockoutEnabled = true };
                    userManager.Create(userToInsert, "Sohail@2");
                }

                //this is for creating role
                RoleManager<IdentityRole> RoleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(db));
                var role = new IdentityRole("Administrator");
                RoleManager.Create(role);

                //this is for assigning role that is created above
                ApplicationUser user = userManager.FindByNameAsync("sohailx2x@yahoo.com").Result;
                userManager.AddToRole(user.Id, role.Name);

            }
            catch (Exception exc)
            {

            }
            
        }
    }
}
