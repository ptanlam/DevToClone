using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using DevToClone.Backend.Application.Contracts.Authentication;
using DevToClone.Backend.Application.Contracts.Persistence;
using DevToClone.Backend.Application.Features.Posts.Queries.Shared;
using DevToClone.Backend.Application.Responses;
using MediatR;

namespace DevToClone.Backend.Application.Features.Posts.Queries.GetPostPagedList
{
    public class GetPostPagedListHandler :
        IRequestHandler<GetPostPagedList, PagedList<PostListVm>>
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly IMapper _mapper;
        private readonly IPostRepository _postRepository;

        public GetPostPagedListHandler(IPostRepository postRepository,
            IAuthenticationService authenticationService,
            IMapper mapper)
        {
            _postRepository = postRepository ?? throw new ArgumentNullException(nameof(postRepository));
            _authenticationService =
                authenticationService ?? throw new ArgumentNullException(nameof(authenticationService));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<PagedList<PostListVm>> Handle(
            GetPostPagedList request, CancellationToken cancellationToken)
        {
            var postList = await _postRepository.ListAsync(
                request.PageNumber, request.PageSize);

            var postListVms = new List<PostListVm>();

            foreach (var post in postList)
            {
                var (_, profile) = await _authenticationService.GetUserProfile(
                    post.AuthorId);

                var postListVm = _mapper.Map<PostListVm>(post);
                postListVm.Author = _mapper.Map<AuthorDto>(profile);

                postListVms.Add(postListVm);
            }

            return new PagedList<PostListVm>(postListVms,
                postListVms.Count, request.PageNumber, request.PageSize);
        }
    }
}