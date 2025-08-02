using edTech.DomainModels.Entities;
using edTech.DAL.Interfaces;
using edTech.DomainModels.Models;
using edTech.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace edTech.Services.Implementations
{
    public class CartService : ICartService
    {
        private readonly ICartRepository _cartRepo;
        private readonly IRepository<CartItem> _cartItem;
        public CartService(ICartRepository cartRepo, IRepository<CartItem> cartItem)
        {
            _cartRepo = cartRepo;
            _cartItem = cartItem;
        }
        public bool SaveCart(Cart cart)
        {
            return _cartRepo.SaveCart(cart);
        }

        public bool CheckCartExist(Guid id)
        {
            return _cartRepo.CheckCartExist(id);
        }

        public bool DeleteCart(Guid id)
        {
            var cartToDelete = _cartRepo.Find(id);
            _cartRepo.Remove(cartToDelete);
            var rowsAffected = _cartRepo.SaveChanges();
            return (rowsAffected  > 0);

        }
    }
}
