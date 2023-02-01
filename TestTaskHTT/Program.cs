using Microsoft.EntityFrameworkCore;
using System.Data.Common;
using TestTaskHTT.Models.EfModels;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<ÑatalogContext>(options => options.UseSqlServer(@"Server=DESKTOP-0C45IC7\SQLEXPRESS;Database=CatalogDB;Trusted_Connection=True;TrustServerCertificate=True;"));

var app = builder.Build();
app.UseStaticFiles();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=MainPage}/{Action=Index}");
app.Run();
