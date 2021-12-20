using System;
using System.Threading.Tasks;
using DevToClone.Backend.Application.Contracts.Authentication;
using DevToClone.Backend.Application.Models.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DevToClone.Backend.API.Controllers
{
    [ApiController]
    [Route("users")]
    public class UsersController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;

        public UsersController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService ??
                                     throw new ArgumentNullException(nameof(authenticationService));
        }

        [Authorize]
        [HttpGet("{id:guid}")]
        public async Task<ActionResult<UserProfileResponse>> GetUserProfile(
            [FromRoute] Guid id)
        {
            var success = Request.Headers.TryGetValue("Authorization",
                out var token);
            if (!success) return BadRequest();

            var (isIdentical, profile) = await _authenticationService.GetUserProfile(
                id.ToString(),
                token.ToString().Split(" ")[1]);

            if (!isIdentical) return BadRequest();
            if (profile == null) return NotFound();

            return Ok(profile);
        }
    }
}