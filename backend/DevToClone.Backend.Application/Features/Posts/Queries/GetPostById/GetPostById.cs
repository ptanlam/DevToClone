using MediatR;
using System;

namespace DevToClone.Backend.Application.Features.Posts.Queries.GetPostById
{
    public class GetPostById : IRequest<PostDetailsVm>
    {
        public Guid Id { get; set; }
    }
}