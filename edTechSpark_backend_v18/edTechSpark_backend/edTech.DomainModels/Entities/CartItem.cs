using System;
using System.Text.Json.Serialization;

namespace edTech.DomainModels.Entities
{
    public class CartItem
    {
        public int Id { get; set; }
        public int ItemId { get;  set; }
        public decimal UnitPrice { get;  set; }
        public int Quantity { get; set; }
        public decimal Total { get; set; }

        public Guid CartId { get; set; }
        public virtual Cart Cart { get; set; }
    }
}
