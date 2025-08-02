
using edTech.DomainModels.Entities;
using System;
using System.Collections.Generic;

namespace edTech.DomainModels.Models
{
    public class PaymentModel
    {
        public PaymentModel()
        {
            Items = new HashSet<CartItem>();
        }
        public string PaymentId { get; set; }
        public string Signature { get; set; }
        public string OrderId { get; set; }       
        public decimal Tax { get; set; }
        public string Currency { get; set; }
        public decimal Total { get; set; }
        public string Email { get; set; }
        public Guid CartId { get; set; }
        public ICollection<CartItem> Items { get; set; }
        public int UserId { get; set; }
        public decimal GrandTotal { get; set; }
    }
}
