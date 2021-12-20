using System.Threading.Tasks;
using DevToClone.Backend.Application.Models.Authentication;

namespace DevToClone.Backend.Application.Contracts.Authentication
{
    public interface IAuthenticationService
    {
        Task<(bool success, string message, AuthenticationResponse response)> LoginAsync(
            AuthenticationRequest request);

        Task<(bool success, string message)> RegisterAsync(RegistrationRequest request);

        Task<(bool isIdentical, UserProfileResponse response)> GetUserProfile(
            string id, string token = "");

        Task<UserProfileResponse> GetUserById(string id);
    }
}