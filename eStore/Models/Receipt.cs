using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace eStore.Models
{
    public class Receipt
    {
        public int ReceiptId { get; set; }
        public int OrderId { get; set; }
        public string UserId { get; set; }
        public DateTime DateTime { get; set; }
        public decimal PayedAmount { get; set; }

        [ForeignKey("OrderId")]
        public virtual Order Order { get; set; }

        [ForeignKey("UserId")]
        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}