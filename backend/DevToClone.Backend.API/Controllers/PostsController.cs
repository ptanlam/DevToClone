using System;
using System.Text.Json;
using System.Threading.Tasks;
using DevToClone.Backend.Application.Features.Posts.Commands.CreateNewPost;
using DevToClone.Backend.Application.Features.Posts.Commands.DeletePost;
using DevToClone.Backend.Application.Features.Posts.Commands.UpdatePost;
using DevToClone.Backend.Application.Features.Posts.Queries.GetPostById;
using DevToClone.Backend.Application.Features.Posts.Queries.GetPostPagedList;
using DevToClone.Backend.Application.Responses;
using DevToClone.Backend.Domain.PostAggregate;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace DevToClone.Backend.API.Controllers
{
    [ApiController]
    [Route("posts")]
    public class PostsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public PostsController(IMediator mediator)
        {
            _mediator = mediator ??
                        throw new ArgumentNullException(nameof(mediator));
        }

        [HttpGet]
        [SwaggerOperation(
            Summary = "Get posts",
            Description = "Get posts by conditions",
            OperationId = "Post.List",
            Tags = new[] {"Post"})
        ]
        public async Task<ActionResult<PagedList<PostListVm>>> GetList(
            [FromQuery] GetPostPagedList getPostPagedList)
        {
            var postPagedList = await _mediator.Send(getPostPagedList);

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

        [HttpGet("{id:guid}")]
        [SwaggerOperation(
            Summary = "Get post details",
            Description = "Get post details by id",
            OperationId = "Post.Details",
            Tags = new[] {"Post"})
        ]
        public async Task<ActionResult<PostDetailsVm>> GetById(
            [FromRoute] Guid id)
        {
            var post = await _mediator.Send(new GetPostById
            {
                Id = id
            });
            if (post == null) return NotFound();
            return Ok(post);
        }

        [Authorize]
        [HttpPost]
        [SwaggerOperation(
            Summary = "Create new post",
            Description = "Create new post",
            OperationId = "Post.Create",
            Tags = new[] {"Post"})
        ]
        public async Task<ActionResult<Post>> CreateNewPost(
            [FromBody] CreateNewPostCommand createNewPostCommand)
        {
            var post = await _mediator.Send(createNewPostCommand);
            if (post == null) return BadRequest();
            return Ok(post);
        }

        [Authorize]
        [HttpPatch("{id:guid}")]
        [SwaggerOperation(
            Summary = "Update post",
            Description = "Update post",
            OperationId = "Post.Update",
            Tags = new[] {"Post"})
        ]
        public async Task<ActionResult<Post>> UpdatePost(
            [FromBody] UpdatePostCommand updatePostCommand, [FromRoute] Guid id)
        {
            updatePostCommand.Id = id;
            var updatedPost = await _mediator.Send(updatePostCommand);
            if (updatedPost == null) return NotFound();
            return Ok(updatedPost);
        }

        [Authorize]
        [HttpDelete("{id:guid}")]
        [SwaggerOperation(
            Summary = "Delete post",
            Description = "Delete post",
            OperationId = "Post.Delete",
            Tags = new[] {"Post"})
        ]
        public async Task<ActionResult> DeletePost([FromRoute] DeletePostCommand deletePostCommand)
        {
            var (found, _) = await _mediator.Send(deletePostCommand);
            if (!found) return NotFound();
            return NoContent();
        }
    }
}