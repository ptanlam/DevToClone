using DevToClone.Backend.Application;
using DevToClone.Backend.Application.Contracts.Authentication;
using DevToClone.Backend.Application.Models.Authentication;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace DevToClone.Backend.API.Controllers
{
    [ApiController]
    [Route("")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;

        public AuthenticationController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService ??
                throw new ArgumentNullException(nameof(authenticationService));
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthenticationResponse>> Login(
            [FromBody] AuthenticationRequest request)
        {
            var (success, message, response) = await _authenticationService
                .LoginAsync(request);
            if (!success) return BadRequest(new { message });
            return Ok(response);
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] RegistrationRequest request)
        {
            var (success, message) = await _authenticationService.RegisterAsync(request);
            if (!success) return BadRequest(new { message });
            return Ok();
        }
    }
}