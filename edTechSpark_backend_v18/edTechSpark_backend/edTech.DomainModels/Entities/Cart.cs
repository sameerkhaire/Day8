using System;
using System.Collections.Generic;

namespace edTech.DomainModels.Entities
{
    public class Cart
    {
        public Cart()
        {
            Items = new List<CartItem>();
            CreatedDate = DateTime.Now;
            IsActive = true;
        }
        public Guid Id { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedDate { get; set; }
        public virtual List<CartItem> Items { get;  set; }

        public bool IsActive { get; set; }
    }
}
