using System;

namespace DevToClone.Backend.Application.Features.Posts.Queries.Shared
{
    public class AuthorDto
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string AvatarUrl { get; set; }
    }
}