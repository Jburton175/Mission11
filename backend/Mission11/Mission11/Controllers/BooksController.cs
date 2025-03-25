using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11.Data;

namespace Mission11.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private BooksInterface _repo;

        public BooksController(BooksInterface temp)
        {
            _repo = temp;
        }

        [HttpGet(Name = "GetBooks")]
        public IActionResult Get(int rownum = 5, int pagenum = 1, string sortBy = "title", string sortDirection = "asc", [FromQuery] List<string>? categoryTypes = null)
        {
            var booksQuery = _repo.Books.AsQueryable();

            if (categoryTypes != null && categoryTypes.Any())
            {
                booksQuery = booksQuery.Where(c => categoryTypes.Contains(c.Category));
            }

            if (sortBy == "title")
            {
                booksQuery = sortDirection == "asc"
                    ? booksQuery.OrderBy(b => b.Title)
                    : booksQuery.OrderByDescending(b => b.Title);
            }

            var totalbooks = booksQuery.Count();

            var booklist = booksQuery
                .Skip((pagenum - 1) * rownum)
                .Take(rownum)
                .ToList();

            var returnbooks = new
            {
                books = booklist,
                booksCount = totalbooks
            };

            return Ok(returnbooks);
        }



        [HttpGet("BookCategories")]
    public IActionResult GetBookCategories()
    {
        var categories = _repo.Books
            .Select(b => b.Category)
            .Distinct()
            .ToList();

        return Ok(categories);
    }

    }
}
