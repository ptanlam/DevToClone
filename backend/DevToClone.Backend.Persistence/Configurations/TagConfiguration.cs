using DevToClone.Backend.Domain.PostAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DevToClone.Backend.Persistence.Configurations
{
    public class TagConfiguration : IEntityTypeConfiguration<Tag>
    {
        public void Configure(EntityTypeBuilder<Tag> builder)
        {
            builder.Property(t => t.Name)
                .IsRequired()
                .HasMaxLength(250);

            builder.HasIndex(t => t.Name);
        }
    }
}