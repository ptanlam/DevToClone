using DevToClone.Backend.Application.Features.Posts.Queries.GetPostPagedList;
using DevToClone.Backend.Application.Responses;
using MediatR;

namespace DevToClone.Backend.Application.Features.Posts.Queries.GetPublishedPostPagedListForAuthor
{
    public class GetPostPagedListForAuthor : IRequest<PagedList<PostListVm>>
    {
        public string AuthorId { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
}