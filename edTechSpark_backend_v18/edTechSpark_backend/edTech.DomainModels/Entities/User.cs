using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace edTech.DomainModels.Entities
{
    public class User: IdentityUser<int>
    {
        public string Name { get; set; }
    }
}