using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Security;
using WebMatrix.WebData;

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

                    //this is for creating user
                    var userStore = new UserStore<ApplicationUser>(db);
                    var userManager = new UserManager<ApplicationUser>(userStore);
                    if(!(db.Users.Any(u => u.UserName == "sohailx2x@yahoo.com")))
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