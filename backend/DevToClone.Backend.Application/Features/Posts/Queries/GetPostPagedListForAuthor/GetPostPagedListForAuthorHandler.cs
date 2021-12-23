using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using DevToClone.Backend.Application.Contracts.Persistence;
using DevToClone.Backend.Application.Features.Posts.Queries.GetPostPagedList;
using DevToClone.Backend.Application.Features.Posts.Queries.Shared;
using DevToClone.Backend.Application.Responses;
using MediatR;

namespace DevToClone.Backend.Application.Features.Posts.Queries.GetPostPagedListForAuthor
{
    public class GetPostPagedListForAuthorHandler : IRequestHandler<GetPostPagedListForAuthor, PagedList<PostListVm>>
    {
        private readonly IPostRepository _postRepository;
        private readonly IMapper _mapper;

        public GetPostPagedListForAuthorHandler(IPostRepository postRepository, IMapper mapper)
        {
            _postRepository = postRepository ?? throw new ArgumentNullException(nameof(postRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<PagedList<PostListVm>> Handle(GetPostPagedListForAuthor request,
            CancellationToken cancellationToken)
        {
            var postList =
                await _postRepository.ListForAuthorAsync(request.PageNumber, request.PageSize,
                    request.Author.Id);

            var postListVms = new List<PostListVm>();

            var authorDto = _mapper.Map<AuthorDto>(request.Author);
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