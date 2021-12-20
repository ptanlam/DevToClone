namespace DevToClone.Backend.Domain.PostAggregate
{
    public class Comment
    {
        public Comment(string content, string userId)
        {
            Content = content;
            UserId = userId;
        }

        public string Content { get; private set; }
        public string UserId { get; private set; }
    }
}