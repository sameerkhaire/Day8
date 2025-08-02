using edTech.DomainModels.Entities;
using edTech.DomainModels.Models;
using System.Threading.Tasks;

namespace edTech.Services.Interfaces
{
    public interface IAuthenticationService
    {
        bool CreateUser(User user, string Password);
        bool SignOut();
        UserModel AuthenticateUser(string Username, string Password);
        User GetUser(string Username);
        bool CreateAdminUser(User user, string Password);
        bool ValidateToken(string token);
    }
}
