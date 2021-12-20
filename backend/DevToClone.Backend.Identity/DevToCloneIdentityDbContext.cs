using DevToClone.Backend.Identity.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;

namespace DevToClone.Backend.Identity
{
    public class DevToCloneIdentityDbContext :
        IdentityDbContext<ApplicationUser>
    {
        public DevToCloneIdentityDbContext(
            DbContextOptions<DevToCloneIdentityDbContext> options) : base(options)
        {
        }
    }
}