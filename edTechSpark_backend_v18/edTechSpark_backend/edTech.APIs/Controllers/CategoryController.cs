using edTech.APIs.Filters;
using edTech.DomainModels.Entities;
using edTech.Services.Interfaces;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace edTech.APIs.Controllers
{
    [EnableCors("AllowAll")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    [CustomAuthorize]
    public class CategoryController : ControllerBase
    {
        IService<Category> _categoryService;
        public CategoryController(IService<Category> categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public IEnumerable<Category> GetAll()
        {
            return _categoryService.GetAll();
        }

        [HttpPost]
        public IActionResult Add(Category model)
        {
            try
            {
                _categoryService.Add(model);
                return StatusCode(StatusCodes.Status201Created);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
