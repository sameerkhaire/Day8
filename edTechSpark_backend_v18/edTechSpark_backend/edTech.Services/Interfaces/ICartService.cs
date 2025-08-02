using edTech.DomainModels.Entities;
using edTech.DomainModels.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace edTech.Services.Interfaces
{
    public interface ICartService
    {
        bool SaveCart(Cart cart);
        bool CheckCartExist(Guid id);

        bool DeleteCart(Guid id);
    }
}
