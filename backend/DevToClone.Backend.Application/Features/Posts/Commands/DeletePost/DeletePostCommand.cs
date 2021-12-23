using System;
using DevToClone.Backend.Domain.PostAggregate;
using MediatR;

namespace DevToClone.Backend.Application.Features.Posts.Commands.DeletePost
{
    public class DeletePostCommand : IRequest<(bool found, bool success)>
    {
        public Guid Id { get; set; }
    }
}