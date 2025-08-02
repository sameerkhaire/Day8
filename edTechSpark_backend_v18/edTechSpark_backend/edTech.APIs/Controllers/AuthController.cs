using edTech.DomainModels.Entities;
using edTech.Services.Interfaces;
using edTech.DomainModels.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace edTech.APIs.Controllers
{
    [EnableCors("AllowAll")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        IAuthenticationService _authService;
        public AuthController(IAuthenticationService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        public IActionResult CreateUser(UserSignUpModel model)
        {
            User user = new User
            {
                Name = model.Name,
                UserName = model.Email,
                Email = model.Email,
                PhoneNumber = model.PhoneNumber
            };
            bool result = _authService.CreateUser(user, model.Password);
            if (result)
            {
                return StatusCode(StatusCodes.Status201Created);
            }
            else
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }
        }

        [HttpPost]
        public UserModel ValidateUser(LoginModel model)
        {
            return _authService.AuthenticateUser(model.Username, model.Password);
        }

        [HttpPost]

        public IActionResult CreateAdminUser(UserSignUpModel model)
        {
            User user = new User
            {
                Name = model.Name,
                UserName = model.Email,
                Email = model.Email,
                PhoneNumber = model.PhoneNumber
            };
            bool result = _authService.CreateAdminUser(user, model.Password);
            if (result)
            {
                return StatusCode(StatusCodes.Status201Created);
            }
            else
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }
        }
    }
}
