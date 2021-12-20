using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using DevToClone.Backend.Application.Contracts.Authentication;
using DevToClone.Backend.Application.Contracts.Persistence;
using DevToClone.Backend.Application.Features.Posts.Queries.Shared;
using MediatR;

namespace DevToClone.Backend.Application.Features.Posts.Queries.GetPostById
{
    public class GetPostByIdHandler : IRequestHandler<GetPostById, PostDetailsVm>
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly IMapper _mapper;
        private readonly IPostRepository _postRepository;

        public GetPostByIdHandler(IPostRepository postRepository,
            IMapper mapper, IAuthenticationService authenticationService)
        {
            _postRepository = postRepository ??
                              throw new ArgumentNullException(nameof(postRepository));

            _mapper = mapper ??
                      throw new ArgumentNullException(nameof(mapper));

            _authenticationService = authenticationService ??
                                     throw new ArgumentNullException(nameof(authenticationService));
        }

        public async Task<PostDetailsVm> Handle(
            GetPostById request, CancellationToken cancellationToken)
        {
            var post = await _postRepository.GetByIdAsync(request.Id);
            if (post == null) return null;

            var (_, author) = await _authenticationService.GetUserProfile(
                post.AuthorId);

            var postDetails = _mapper.Map<PostDetailsVm>(post);
            postDetails.Author = _mapper.Map<AuthorDto>(author);

            return postDetails;
        }
    }
}