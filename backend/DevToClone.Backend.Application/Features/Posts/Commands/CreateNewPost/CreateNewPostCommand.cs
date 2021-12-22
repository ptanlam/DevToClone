using System.Collections.Generic;
using DevToClone.Backend.Application.Features.Posts.Queries.GetPostPagedList;
using DevToClone.Backend.Domain.PostAggregate;
using MediatR;

namespace DevToClone.Backend.Application.Features.Posts.Commands.CreateNewPost
{
    public class CreateNewPostCommand : IRequest<PostListVm>
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public bool Published { get; set; }
        public string AuthorId { get; set; }
        public IEnumerable<Tag> Tags { get; set; }
    }
}