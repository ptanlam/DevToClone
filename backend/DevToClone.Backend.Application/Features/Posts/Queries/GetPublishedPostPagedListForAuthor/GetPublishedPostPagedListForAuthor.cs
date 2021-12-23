using DevToClone.Backend.Application.Features.Posts.Queries.GetPostPagedList;
using DevToClone.Backend.Application.Models.Authentication;
using DevToClone.Backend.Application.Responses;
using MediatR;

namespace DevToClone.Backend.Application.Features.Posts.Queries.GetPublishedPostPagedListForAuthor
{
    public class GetPublishedPostPagedListForAuthor : IRequest<PagedList<PostListVm>>
    {
        public UserProfileResponse Author { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
}