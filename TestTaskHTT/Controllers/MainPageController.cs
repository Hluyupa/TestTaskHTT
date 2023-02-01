using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestTaskHTT.Models;
using TestTaskHTT.Models.EfModels;

namespace TestTaskHTT.Controllers
{
    public class MainPageController : Controller
    {
        private readonly СatalogContext _context;
        public MainPageController(СatalogContext catalogContext)
        {
            _context = catalogContext;
        }
        public IActionResult Index()
        {
            return View();
        }

        [Route("[controller]/GetProductsCategories")]
        [HttpGet]
        public async Task<JsonResult> GetProductsCategories()
        {
            var result = await _context.Products.Join(_context.Categories,
                p => p.Category.CategoryId,
                e => e.CategoryId,
                (p, e) => new ProductsCategories { ProductName = p.Name, CategoryName = e.Name }).ToListAsync();
            return Json(result);
        }

        [Route("[controller]/GetCategories")]
        [HttpGet]
        public async Task<JsonResult> GetCategories()
        {
            var categories = await _context.Categories.ToListAsync();
            return Json(categories);
        }

        [Route("[controller]/GetProductsOfCategory/{categoryId}")]
        [HttpGet]
        public async Task<JsonResult> GetProductsOfCategory(int categoryId)
        {
            var products = await _context.Products.Where(p=>p.Category.CategoryId == categoryId).ToListAsync();
            return Json(products);
        }
    }
}
