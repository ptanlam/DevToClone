using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DevToClone.Backend.Application.Contracts.Persistence;
using Microsoft.EntityFrameworkCore;

namespace DevToClone.Backend.Persistence.Repositories
{
    public class BaseRepository<T> : IAsyncRepository<T>
        where T : class
    {
        protected readonly DevToCloneDbContext Context;

        public BaseRepository(DevToCloneDbContext context)
        {
            Context = context ??
                      throw new ArgumentNullException(nameof(context));
        }

        public virtual async Task<T> GetByIdAsync(Guid id)
        {
            return await Context.Set<T>().FindAsync(id);
        }

        public virtual async Task<IEnumerable<T>> ListAsync(int pageNumber, int pageSize)
        {
            return await Context.Set<T>()
                .Skip(pageNumber * pageSize)
                .Take(10)
                .ToListAsync();
        }

        public virtual async Task<T> AddAsync(T entity)
        {
            var result = await Context.Set<T>().AddAsync(entity);
            await Context.SaveChangesAsync();

            return result.Entity;
        }

        public async Task<T> UpdateAsync(T entity)
        {
            Context.Entry(entity).State = EntityState.Modified;
            await Context.SaveChangesAsync();
            return entity;
        }
    }
}