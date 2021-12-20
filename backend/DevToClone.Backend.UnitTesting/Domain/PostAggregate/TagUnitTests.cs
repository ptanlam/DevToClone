using FluentAssertions;
using Xunit;

namespace DevToClone.Backend.Domain.PostAggregate
{
    public class TagUnitTests
    {
        [Fact]
        public void Creation_ShouldReturnExpectedTag()
        {
            var name = "ReactJS";

            var tag = new Tag(name);

            tag.Name.Should().Be(name);
            tag.Posts.Should().BeEmpty();
        }
    }
}