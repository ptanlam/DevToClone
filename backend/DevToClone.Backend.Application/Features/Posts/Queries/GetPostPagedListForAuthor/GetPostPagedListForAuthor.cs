using DevToClone.Backend.Application.Features.Posts.Queries.GetPostPagedList;
using DevToClone.Backend.Application.Models.Authentication;
using DevToClone.Backend.Application.Responses;
using MediatR;

namespace DevToClone.Backend.Application.Features.Posts.Queries.GetPostPagedListForAuthor
{
    public class GetPostPagedListForAuthor : IRequest<PagedList<PostListVm>>
    {
        public UserProfileResponse Author { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
}