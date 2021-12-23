using System;
using System.Collections;
using System.Collections.Generic;
using DevToClone.Backend.Application.Features.Posts.Queries.Shared;
using DevToClone.Backend.Domain.PostAggregate;

namespace DevToClone.Backend.Application.Features.Posts.Queries.GetPostPagedList
{
    public class PostListVm
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime CreatedAt { get; set; }
        public AuthorDto Author { get; set; }
        public string Content { get; set; }
        public bool Published { get; set; }
        public IEnumerable<Tag> Tags { get; set; }
    }
}