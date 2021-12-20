using DevToClone.Backend.Domain.Common;
using DevToClone.Backend.Domain.PostAggregate;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DevToClone.Backend.Persistence
{
    public class DevToCloneDbContext : DbContext
    {
        public DevToCloneDbContext(DbContextOptions<DevToCloneDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(DevToCloneDbContext).Assembly);
        }

        public DbSet<Post> Posts { get; set; }
        public DbSet<Tag> Tags { get; set; }

        public override Task<int> SaveChangesAsync(
            CancellationToken cancellationToken = default)
        {
            foreach (var entry in ChangeTracker.Entries<AuditableEntity>())
            {
                switch (entry.State)
                {
                    case EntityState.Modified:
                        entry.Entity.UpdatedAt = DateTime.UtcNow;
                        break;

                    case EntityState.Added:
                        entry.Entity.CreatedAt = DateTime.UtcNow;
                        break;

                    default:
                        break;
                }
            }

            return base.SaveChangesAsync(cancellationToken);
        }
    }
}