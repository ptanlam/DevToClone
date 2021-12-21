using System;

namespace DevToClone.Backend.Application.Models.Authentication
{
    public class AuthenticationResponse
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string AccessToken { get; set; }
        public string AvatarUrl { get; set; }
    }
}