
using edTech.DomainModels.Entities;
using edTech.DAL.Interfaces;
using edTech.DomainModels.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace edTech.DAL.Implementations
{
    public class CartRepository : Repository<Cart>, ICartRepository
    {
        private AppDbContext dbContext
        {
            get
            {
                return _dbContext as AppDbContext;
            }
        }

        public CartRepository(DbContext dbContext) : base(dbContext)
        {
        }

        public bool SaveCart(Cart cart)
        {
            dbContext.Carts.Add(cart);
            dbContext.SaveChanges();
            return true;
        }

        public bool CheckCartExist(Guid id)
        {
            return dbContext.Carts.Where(c => c.Id == id).Any();
        }

    }
}
