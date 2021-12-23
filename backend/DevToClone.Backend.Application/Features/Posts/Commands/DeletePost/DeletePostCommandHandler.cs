using System.Threading;
using System.Threading.Tasks;
using MediatR;

namespace DevToClone.Backend.Application.Features.Posts.Commands.DeletePost
{
    public class DeletePostHandler : IRequestHandler<DeletePostCommand>
    {
        public Task<Unit> Handle(DeletePostCommand request, CancellationToken cancellationToken)
        {
            throw new System.NotImplementedException();
        }
    }
}