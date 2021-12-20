using FluentAssertions;
using System;
using Xunit;

namespace DevToClone.Backend.Domain.PostAggregate
{
    public class CommentUnitTests
    {
        [Fact]
        public void Creation_ShouldReturnExpectedComment()
        {
            var content = "This post is really useful!";
            var userId = Guid.NewGuid().ToString();

            var comment = new Comment(content, userId);

            comment.Content.Should().Be(content);
            comment.UserId.Should().Be(userId);
        }
    }
}