using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DevToClone.Backend.Application;
using DevToClone.Backend.Application.Contracts.Authentication;
using DevToClone.Backend.Application.Models.Authentication;
using DevToClone.Backend.Identity.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace DevToClone.Backend.Identity.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly JwtSettings _jwtSettings;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;

        public AuthenticationService(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IOptions<JwtSettings> jwtSettings)
        {
            _userManager = userManager ??
                           throw new ArgumentNullException(nameof(userManager));

            _signInManager = signInManager ??
                             throw new ArgumentNullException(nameof(signInManager));

            _jwtSettings = jwtSettings.Value;
        }

        public async Task<(bool success, string message, AuthenticationResponse response)> LoginAsync(
            AuthenticationRequest request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null) return (false, $"User with {request.Email} does not exist!", null);

            var result = await _signInManager.PasswordSignInAsync(user,
                request.Password, false, false);
            if (!result.Succeeded) return (false, "Password is not correct!", null);

            var jwtSecurityToken = await GenerateTokenAsync(user);
            var authenticationResponse = new AuthenticationResponse
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                AvatarUrl = user.AvatarUrl,
                AccessToken = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken)
            };

            return (true, string.Empty, authenticationResponse);
        }

        public async Task<(bool success, string message)> RegisterAsync(
            RegistrationRequest request)
        {
            var existingUserName = await _userManager.FindByNameAsync(request.UserName);
            if (existingUserName != null)
                return (false, $"User with {request.UserName} has already exist!");

            var existingEmail = await _userManager.FindByEmailAsync(request.Email);
            if (existingEmail != null)
                return (false, $"User with {request.Email} has already exist!");

            // TODO: Upload avatar to some cloud storage

            var user = new ApplicationUser
            {
                UserName = request.UserName,
                Email = request.Email,
                AvatarUrl = null
            };

            var result = await _userManager.CreateAsync(user, request.Password);
            if (!result.Succeeded)
                throw new Exception("Something happened when creating your account. Try again!");

            return (true, "Creating your account successfully!");
        }

        public async Task<(bool isIdentical, UserProfileResponse response)> GetUserProfile(
            string id, string token = "")
        {
            if (!string.IsNullOrEmpty(token))
            {
                var isIdentical = CheckIsIdentical(id, token);
                if (!isIdentical) return (false, null);
            }

            var user = await _userManager.FindByIdAsync(id);
            if (user == null) return (true, null);

            var response = new UserProfileResponse
            {
                Id = user.Id,
                AvatarUrl = user.AvatarUrl,
                Email = user.Email,
                UserName = user.UserName
            };

            return (true, response);
        }

        public async Task<UserProfileResponse> GetUserById(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            var response = new UserProfileResponse
            {
                Id = user.Id,
                AvatarUrl = user.AvatarUrl,
                Email = user.Email,
                UserName = user.UserName
            };

            return response;
        }

        private async Task<JwtSecurityToken> GenerateTokenAsync(ApplicationUser user)
        {
            var userClaims = await _userManager.GetClaimsAsync(user);

            var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim("uid", user.Id)
                }
                .Union(userClaims);

            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

            var jwtSecurityToken = new JwtSecurityToken(
                _jwtSettings.Issuer,
                _jwtSettings.Audience,
                claims,
                expires: DateTime.UtcNow.AddMinutes(_jwtSettings.DurationInMinutes),
                signingCredentials: signingCredentials);

            return jwtSecurityToken;
        }

        private bool CheckIsIdentical(string id, string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var payload = handler.ReadJwtToken(token);
            var userId = payload.Claims.FirstOrDefault(c => c.Type == "uid")?.Value;
            return userId != null && userId == id;
        }
    }
}