namespace eStore.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class GenderFieldAddedToUserProfile_dataType_updated : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "ReceiveNewsLetter", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "ReceiveNewsLetter");
        }
    }
}
