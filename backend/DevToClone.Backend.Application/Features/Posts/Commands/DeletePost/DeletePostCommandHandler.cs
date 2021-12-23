using System;
using System.Threading;
using System.Threading.Tasks;
using DevToClone.Backend.Application.Contracts.Persistence;
using MediatR;

namespace DevToClone.Backend.Application.Features.Posts.Commands.DeletePost
{
    public class DeletePostCommandHandler : IRequestHandler<DeletePostCommand, (bool found, bool success)>
    {
        private readonly IPostRepository _postRepository;

        public DeletePostCommandHandler(IPostRepository postRepository)
        {
            _postRepository = postRepository ?? throw new ArgumentNullException(nameof(postRepository));
        }

        public async Task<(bool found, bool success)> Handle(DeletePostCommand request,
            CancellationToken cancellationToken)
        {
            var post = await _postRepository.GetByIdAsync(request.Id);
            if (post == null) return (false, false);

            post.Delete();

            await _postRepository.UpdateAsync(post);
            return (true, true);
        }
    }
}