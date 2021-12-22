using System;
using System.Collections.Generic;
using DevToClone.Backend.Application.Features.Posts.Queries.Shared;
using DevToClone.Backend.Domain.PostAggregate;

namespace DevToClone.Backend.Application.Features.Posts.Queries.GetPostById
{
    public class PostDetailsVm
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public AuthorDto Author { get; set; }
        public IEnumerable<Tag> Tags { get; set; }
    }
}