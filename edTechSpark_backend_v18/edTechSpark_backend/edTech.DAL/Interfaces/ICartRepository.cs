
using edTech.DomainModels.Entities;
using edTech.DomainModels.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace edTech.DAL.Interfaces
{
    public interface ICartRepository : IRepository<Cart>
    {
        bool SaveCart(Cart cart);
        bool CheckCartExist(Guid id);
    }
}
