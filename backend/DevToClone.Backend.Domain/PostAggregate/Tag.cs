using System.Collections.Generic;
using DevToClone.Backend.Domain.Common;

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

        public string Name { get; private set; }
    }
}