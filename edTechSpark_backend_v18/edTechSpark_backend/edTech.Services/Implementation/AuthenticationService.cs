using edTech.DomainModels.Entities;
using edTech.Services.Interfaces;
using edTech.DomainModels.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace edTech.Services.Implementations
{
    public class AuthenticationService : IAuthenticationService
    {
        protected SignInManager<User> _signManager;
        protected UserManager<User> _userManager;
        protected RoleManager<Role> _roleManager;
        protected IConfiguration _config;
        public AuthenticationService(SignInManager<User> signManager, UserManager<User> userManager, RoleManager<Role> roleManager, IConfiguration config)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signManager = signManager;
            _config = config;
        }
        private string GenerateJSONWebToken(User userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
                             new Claim(JwtRegisteredClaimNames.Sub, userInfo.Name),
                             new Claim(JwtRegisteredClaimNames.Email, userInfo.Email),
                             new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                             };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                                            _config["Jwt:Audience"],
                                            claims,
                                            expires: DateTime.UtcNow.AddMinutes(60), //token expiry minutes
                                            signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        public UserModel AuthenticateUser(string Username, string Password)
        {
            //lockoutOnFailure default value:5 
            var result = _signManager.PasswordSignInAsync(Username, Password, false, lockoutOnFailure: false).Result;
            if (result.Succeeded)
            {
                var user = _userManager.FindByNameAsync(Username).Result;
                var roles = _userManager.GetRolesAsync(user).Result;

                UserModel model = new UserModel
                {
                    Id = user.Id,
                    Name = user.Name,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber,
                    Roles = roles.ToArray()
                };
                model.Token = GenerateJSONWebToken(user);
                return model;
            }
            return null;
        }
        public bool ValidateToken(string token)
        {
            SecurityKey key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_config["Jwt:Key"]));
            TokenValidationParameters validationParameters =
                    new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = _config["Jwt:Issuer"],
                        ValidAudiences = new[] { _config["Jwt:Audience"] },
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key
                    };

            SecurityToken validatedToken;
            JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
            var user = handler.ValidateToken(token, validationParameters, out validatedToken);
            if (!user.Identity.IsAuthenticated)
            {
                return false;
            }
            else
            {
                return true;
            }
        }
        public User GetUser(string Username)
        {
            return _userManager.FindByNameAsync(Username).Result;
        }
        public bool CreateUser(User user, string Password)
        {
            var result = _userManager.CreateAsync(user, Password).Result;
            if (result.Succeeded)
            {
                //Admin, User
                string role = "User";
                var res = _userManager.AddToRoleAsync(user, role).Result;
                if (res.Succeeded)
                {
                    return true;
                }
            }
            return false;
        }

        public bool CreateAdminUser(User user, string Password)
        {
            var result = _userManager.CreateAsync(user, Password).Result;
            if (result.Succeeded)
            {
                //Admin, User
                string role = "Admin";
                var res = _userManager.AddToRoleAsync(user, role).Result;
                if (res.Succeeded)
                {
                    return true;
                }
            }
            return false;
        }
        public bool SignOut()
        {
            _signManager.SignOutAsync().Wait();
            return true;
        }
    }
}