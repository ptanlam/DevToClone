using System;
using DevToClone.Backend.Application.Features.Posts.Queries.Shared;

namespace DevToClone.Backend.Application.Features.Posts.Queries.GetPostPagedList
{
    public class PostListVm
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime CreatedAt { get; set; }
        public AuthorDto Author { get; set; }
        public string Content { get; set; }
    }
}