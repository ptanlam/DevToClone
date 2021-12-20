using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DevToClone.Backend.Application.Contracts.Persistence;
using DevToClone.Backend.Domain.PostAggregate;
using Microsoft.EntityFrameworkCore;

namespace DevToClone.Backend.Persistence.Repositories
{
    public class PostRepository : BaseRepository<Post>, IPostRepository
    {
        public PostRepository(DevToCloneDbContext context) : base(context)
        {
        }

        public override async Task<IEnumerable<Post>> ListAsync(int pageNumber, int pageSize)
        {
            var postList = await Context.Posts
                .Where(p => p.Published == true)
                .OrderByDescending(p => p.CreatedAt)
                .Skip(pageNumber * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return postList;
        }

        public async Task<IEnumerable<Post>> ListForAuthorAsync(int pageNumber,
            int pageSize, string authorId)
        {
            var postList = await Context.Posts
                .Where(p => p.Published == true && p.AuthorId == authorId)
                .OrderByDescending(p => p.CreatedAt)
                .Skip(pageNumber * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return postList;
        }
    }
}