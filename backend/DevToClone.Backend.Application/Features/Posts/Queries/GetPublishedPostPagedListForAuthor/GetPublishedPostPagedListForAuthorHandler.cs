using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using DevToClone.Backend.Application.Contracts.Authentication;
using DevToClone.Backend.Application.Contracts.Persistence;
using DevToClone.Backend.Application.Features.Posts.Queries.GetPostPagedList;
using DevToClone.Backend.Application.Features.Posts.Queries.Shared;
using DevToClone.Backend.Application.Responses;
using MediatR;

namespace DevToClone.Backend.Application.Features.Posts.Queries.GetPublishedPostPagedListForAuthor
{
    public class GetPostPagedListForAuthorHandler : IRequestHandler<GetPublishedPostPagedListForAuthor, PagedList<PostListVm>>
    {
        private readonly IPostRepository _postRepository;
        private readonly IMapper _mapper;
        private readonly IAuthenticationService _authenticationService;

        public GetPostPagedListForAuthorHandler(IPostRepository postRepository, IMapper mapper,
            IAuthenticationService authenticationService)
        {
            _postRepository = postRepository ?? throw new ArgumentNullException(nameof(postRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _authenticationService =
                authenticationService ?? throw new ArgumentNullException(nameof(authenticationService));
        }

        public async Task<PagedList<PostListVm>> Handle(Queries.GetPublishedPostPagedListForAuthor.GetPublishedPostPagedListForAuthor request,
            CancellationToken cancellationToken)
        {
            var (_, profile) = await _authenticationService.GetUserProfile(
                request.AuthorId);
            if (profile == null) return null;
            var authorDto = _mapper.Map<AuthorDto>(profile);

            var postList =
                await _postRepository.PublishedListForAuthorAsync(request.PageNumber, request.PageSize,
                    request.AuthorId);

            var postListVms = new List<PostListVm>();

            foreach (var post in postList)
            {
                var postListVm = _mapper.Map<PostListVm>(post);
                postListVm.Author = authorDto;
                postListVms.Add(postListVm);
            }

            return new PagedList<PostListVm>(postListVms,
                postListVms.Count, request.PageNumber, request.PageSize);
        }
    }
}