using System;
using System.Threading;
using System.Threading.Tasks;
using DevToClone.Backend.Application.Contracts.Persistence;
using DevToClone.Backend.Domain.PostAggregate;
using MediatR;

namespace DevToClone.Backend.Application.Features.Posts.Commands.UpdatePost
{
    public class UpdatePostCommandHandler : IRequestHandler<UpdatePostCommand, Post>
    {
        private readonly IPostRepository _postRepository;

        public UpdatePostCommandHandler(IPostRepository postRepository)
        {
            _postRepository = postRepository ?? throw new ArgumentNullException(nameof(postRepository));
        }

        public async Task<Post> Handle(UpdatePostCommand request, CancellationToken cancellationToken)
        {
            var post = await _postRepository.GetByIdAsync(request.Id);
            if (post == null) return null;

            post.UpdateTitle(request.Title);
            post.UpdateContent(request.Content);
            post.UpdatePublished(request.Published);
            post.UpdateTags(request.Tags);

            await _postRepository.UpdateAsync(post);

            return post;
        }
    }
}