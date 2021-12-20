using DevToClone.Backend.Domain.PostAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DevToClone.Backend.Persistence.Configurations
{
    public class PostConfiguration : IEntityTypeConfiguration<Post>
    {
        public void Configure(EntityTypeBuilder<Post> builder)
        {
            builder.Property(p => p.Title)
                .IsRequired()
                .HasMaxLength(250);

            builder.Property(p => p.AuthorId)
                .IsRequired()
                .HasMaxLength(450);

            builder.HasMany(p => p.Tags);
        }
    }
}