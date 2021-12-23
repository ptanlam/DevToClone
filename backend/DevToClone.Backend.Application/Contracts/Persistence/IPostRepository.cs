using System.Collections.Generic;
using System.Threading.Tasks;
using DevToClone.Backend.Domain.PostAggregate;

namespace DevToClone.Backend.Application.Contracts.Persistence
{
    public interface IPostRepository : IAsyncRepository<Post>
    {
        Task<IEnumerable<Post>> ListByConditionsAsync(int pageNumber, int pageSize, string term);
        Task<IEnumerable<Post>> ListForAuthorAsync(int pageNumber, int pageSize, string authorId);
        Task<IEnumerable<Post>> PublishedListForAuthorAsync(int pageNumber, int pageSize, string authorId);
    }
}