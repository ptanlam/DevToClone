using System;
using System.Text.Json;
using System.Threading.Tasks;
using DevToClone.Backend.Application.Contracts.Authentication;
using DevToClone.Backend.Application.Features.Posts.Queries.GetPostPagedList;
using DevToClone.Backend.Application.Features.Posts.Queries.GetPostPagedListForAuthor;
using DevToClone.Backend.Application.Models.Authentication;
using DevToClone.Backend.Application.Responses;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DevToClone.Backend.API.Controllers
{
    [ApiController]
    [Route("authors")]
    public class AuthorsController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IAuthenticationService _authenticationService;

        public AuthorsController(IMediator mediator, IAuthenticationService authenticationService)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            _authenticationService =
                authenticationService ?? throw new ArgumentNullException(nameof(authenticationService));
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<UserProfileResponse>> GetProfile([FromRoute] Guid id)
        {
            var author = await _authenticationService.GetUserById(id.ToString());
            return author == null ? NotFound() : Ok(author);
        }

        [HttpGet("{id:guid}/posts")]
        public async Task<ActionResult<PagedList<PostListVm>>> GetPostListForAuthor(
            [FromRoute] Guid id, [FromQuery] GetPostPagedList pagedList)
        {
            var postPagedList = await _mediator.Send(new GetPostPagedListForAuthor
            {
                AuthorId = id.ToString(),
                PageNumber = pagedList.PageNumber,
                PageSize = pagedList.PageSize
            });

            if (postPagedList == null) return NotFound();

            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(new
            {
                postPagedList.TotalPage,
                postPagedList.TotalCount,
                postPagedList.PageSize,
                postPagedList.CurrentPage
            }, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            }));

            Response.Headers.Add("Access-Control-Expose-Headers", "X-Pagination");

            return Ok(postPagedList);
        }
    }
}