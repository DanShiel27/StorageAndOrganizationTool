using Microsoft.EntityFrameworkCore;
using StorageAndOrganizationTool.Models.Domain;

namespace StorageAndOrganizationTool.Data
{
    public class InMemoryDbContext : DbContext
    {
        public InMemoryDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Part> Parts { get; set; }
    }
}
