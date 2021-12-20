using DevToClone.Backend.Application.Responses;
using MediatR;
using System.ComponentModel.DataAnnotations;

namespace DevToClone.Backend.Application.Features.Posts.Queries.GetPostPagedList
{
    public class GetPostPagedList : IRequest<PagedList<PostListVm>>
    {
        public int PageNumber { get; init; } = 1;

        [Range(1, 20)]
        public int PageSize { get; init; } = 10;
    }
}