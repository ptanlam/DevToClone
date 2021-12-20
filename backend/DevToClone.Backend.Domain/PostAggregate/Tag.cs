using DevToClone.Backend.Domain.Common;
using System.Collections.Generic;

namespace DevToClone.Backend.Domain.PostAggregate
{
    public class Tag : BaseEntity<int>
    {
        public Tag(string name)
        {
            Name = name;
        }

        private Tag()
        {
        }

        private readonly List<Post> _posts = new();
        public IReadOnlyList<Post> Posts => _posts.AsReadOnly();

        public string Name { get; private set; }
    }
}