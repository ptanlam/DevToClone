using System;
using System.Collections.Generic;

namespace DevToClone.Backend.Application.Responses
{
    public class PagedList<T> : List<T>
    {
        public PagedList(IEnumerable<T> items, int count, int pageNumber, int pageSize)
        {
            TotalCount = count;
            PageSize = pageSize;
            CurrentPage = pageNumber;
            TotalPage = (int) Math.Ceiling(count / (double) pageSize);
            AddRange(items);
        }

        public int TotalCount { get; }
        public int TotalPage { get; }
        public int CurrentPage { get; }
        public int PageSize { get; }
    }
}