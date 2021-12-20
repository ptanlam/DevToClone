using System;
using DevToClone.Backend.Application.Features.Posts.Queries.Shared;

namespace DevToClone.Backend.Application.Features.Posts.Queries.GetPostById
{
    public class PostDetailsVm
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public AuthorDto Author { get; set; }
    }
}