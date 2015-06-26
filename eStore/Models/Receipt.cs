using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace eStore.Models
{
    public class Receipt
    {
        //public int ReceiptId { get; set; }
        [Key, ForeignKey("Order")]
        public int OrderId { get; set; }
        public string UserId { get; set; }
        public DateTime DateTime { get; set; }
        public decimal PayedAmount { get; set; }
        public string Message { get; set; }
        public string TransactionId { get; set; }
        public string CardNumber { get; set; }
        
        [JsonIgnore]
        public virtual Order Order { get; set; }

        [JsonIgnore]
        [ForeignKey("UserId")]
        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}