using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DevToClone.Backend.Application.Contracts.Persistence
{
    public interface IAsyncRepository<T>
    {
        Task<T> GetByIdAsync(Guid id);

        Task<IEnumerable<T>> ListAsync(int pageNumber, int pageSize);

        Task<T> AddAsync(T entity);
        Task<T> UpdateAsync(T entity);
    }
}