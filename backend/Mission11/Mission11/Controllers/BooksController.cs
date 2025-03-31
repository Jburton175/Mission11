using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11.Data;
using System.Collections.Generic;
using System.Linq;

namespace Mission11.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly BooksInterface _repo;

        public BooksController(BooksInterface repo)
        {
            _repo = repo;
        }

        [HttpGet(Name = "GetBooks")]
        public IActionResult Get(int rownum = 5, int pagenum = 1, string sortBy = "title", string sortDirection = "asc", [FromQuery] List<string>? categoryTypes = null)
        {
            var booksQuery = _repo.GetBooks().AsQueryable();

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

            return Ok(new { books = booklist, booksCount = totalbooks });
        }

        [HttpGet("BookCategories")]
        public IActionResult GetBookCategories()
        {
            var categories = _repo.GetBooks()
                .Select(b => b.Category)
                .Distinct()
                .ToList();

            return Ok(categories);
        }

        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _repo.AddBook(newBook);
            return Ok(newBook);
        }

        [HttpPut("UpdateBook/{bookId}")]
        public IActionResult UpdateBook(int bookId, [FromBody] Book updateBook)
        {
            var existingBook = _repo.GetBookById(bookId);
            if (existingBook == null)
            {
                return NotFound(new { message = "Book not found" });
            }

            existingBook.Title = updateBook.Title;
            existingBook.Author = updateBook.Author;
            existingBook.Publisher = updateBook.Publisher;
            existingBook.Isbn = updateBook.Isbn;
            existingBook.Classification = updateBook.Classification;
            existingBook.Category = updateBook.Category;
            existingBook.PageCount = updateBook.PageCount;
            existingBook.Price = updateBook.Price;

            _repo.UpdateBook(existingBook);
            return Ok(existingBook);
        }

        [HttpDelete("DeleteBook/{bookId}")]
        public IActionResult DeleteBook(int bookId)
        {
            var existingBook = _repo.GetBookById(bookId);
            if (existingBook == null)
            {
                return NotFound(new { message = "Book not found" });
            }

            _repo.DeleteBook(bookId);
            return Ok(existingBook);
        }
    }
}
