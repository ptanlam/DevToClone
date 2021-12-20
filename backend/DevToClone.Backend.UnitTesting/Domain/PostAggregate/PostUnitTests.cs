using FluentAssertions;
using System;
using Xunit;

namespace DevToClone.Backend.Domain.PostAggregate
{
    public class PostUnitTests
    {
        [Fact]
        public void Creation_ShouldReturnExpectedPost()
        {
            var title = "Post title";
            var content = "Extremely long content";
            var published = true;
            var authorId = Guid.NewGuid().ToString();

            var post = new Post(title, content, published, authorId);

            post.Title.Should().Be(title);
            post.Content.Should().Be(content);
            post.Published.Should().Be(published);
            post.Tags.Should().BeEmpty();
            post.AuthorId.Should().Be(authorId);
        }
    }
}