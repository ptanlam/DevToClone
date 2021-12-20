using AutoMapper;
using DevToClone.Backend.Application.Contracts.Authentication;
using DevToClone.Backend.Application.Contracts.Persistence;
using DevToClone.Backend.Application.Features.Posts.Queries.GetPostPagedList;
using DevToClone.Backend.Application.Features.Posts.Queries.Shared;
using DevToClone.Backend.Domain.PostAggregate;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DevToClone.Backend.Application.Features.Posts.Commands.CreateNewPost
{
    public class CreateNewPostCommandHandler :
        IRequestHandler<CreateNewPostCommand, PostListVm>
    {
        private readonly IPostRepository _postRepository;
        private readonly IMapper _mapper;
        private readonly IAuthenticationService _authenticationService;

        public CreateNewPostCommandHandler(IPostRepository postRepository,
            IMapper mapper, IAuthenticationService authenticationService)
        {
            _postRepository =
                postRepository ?? throw new ArgumentNullException(nameof(postRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _authenticationService =
                authenticationService ?? throw new ArgumentNullException(nameof(authenticationService));
        }

        public async Task<PostListVm> Handle(
            CreateNewPostCommand request, CancellationToken cancellationToken)
        {
            var validator = new CreateNewPostCommandValidator();

            var validationResult = await validator.ValidateAsync(
                request, cancellationToken);
            if (!validationResult.IsValid) return null;

            var author = await _authenticationService.GetUserById(request.AuthorId);
            if (author == null) return null;

            var post = new Post(request.Title, request.Content,
                request.Published, request.AuthorId);

            var postListVm = _mapper.Map<PostListVm>(await _postRepository.AddAsync(post));
            postListVm.Author = _mapper.Map<AuthorDto>(author);

            return postListVm;
        }
    }
}