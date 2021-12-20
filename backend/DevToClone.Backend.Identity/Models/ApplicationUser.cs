using Microsoft.AspNetCore.Identity;

namespace DevToClone.Backend.Identity.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string AvatarUrl { get; set; }
    }
}