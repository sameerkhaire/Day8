using edTech.DomainModels.Entities;
using edTech.DomainModels.Models;
using edTech.Services.Interfaces;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace edTech.APIs.Controllers
{
    [EnableCors("AllowAll")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        IOrderService _orderService;
        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet("{UserId}")]
        public IEnumerable<Order> GetUserOrders(int UserId)
        {
            return _orderService.GetUserOrders(UserId);
        }

        [HttpGet("{OrderId}")]
        public OrderModel GetOrderDetails(string OrderId)
        {
            return _orderService.GetOrderDetails(OrderId);
        }
    }
}
