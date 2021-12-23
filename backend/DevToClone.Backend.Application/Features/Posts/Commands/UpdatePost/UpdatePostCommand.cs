using System;
using System.Collections.Generic;
using DevToClone.Backend.Domain.PostAggregate;
using MediatR;

namespace DevToClone.Backend.Application.Features.Posts.Commands.UpdatePost
{
    public class UpdatePostCommand : IRequest<Post>
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public bool Published { get; set; }
        public IEnumerable<Tag> Tags { get; set; }
    }
}