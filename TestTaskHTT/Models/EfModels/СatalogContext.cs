using Microsoft.EntityFrameworkCore;

namespace TestTaskHTT.Models.EfModels
{
    public class СatalogContext : DbContext
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public СatalogContext(DbContextOptions options) : base(options)
        {
        }
    }
}
