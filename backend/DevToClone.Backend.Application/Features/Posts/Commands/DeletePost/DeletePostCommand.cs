using DevToClone.Backend.Domain.PostAggregate;
using MediatR;

namespace DevToClone.Backend.Application.Features.Posts.Commands.DeletePost
{
    public class DeletePost : IRequest
    {
        public Post Post { get; set; }
    }
}