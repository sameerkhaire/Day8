using edTech.DomainModels.Entities;
using edTech.Services.Interfaces;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace edTech.APIs.Controllers
{
    [EnableCors("AllowAll")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        ICartService _cartService;
        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpPost]
        public ActionResult<bool> SaveCart(Cart cart)
        {
            if (_cartService.CheckCartExist(cart.Id))
            {
                _cartService.DeleteCart(cart.Id);
            }
            return _cartService.SaveCart(cart);
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<bool> CheckCart(Guid id)
        {
            return _cartService.CheckCartExist(id);
        }
    }
}
