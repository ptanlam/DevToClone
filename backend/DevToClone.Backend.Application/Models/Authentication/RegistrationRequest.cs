using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace DevToClone.Backend.Application.Models.Authentication
{
    public class RegistrationRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Text)]
        [MinLength(6)]
        public string UserName { get; set; }

        [Required]
        [MinLength(6)]
        public string Password { get; set; }

        public IFormFile Avatar { get; set; }
    }
}