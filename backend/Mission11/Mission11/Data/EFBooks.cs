using System.Collections.Generic;
using System.Linq;

namespace Mission11.Data
{
    public class EFBooks : BooksInterface
    {
        private readonly BookstoreContext _context;

        public EFBooks(BookstoreContext context)
        {
            _context = context;
        }

        public IEnumerable<Book> GetBooks()
        {
            return _context.Books.ToList();
        }

        public Book? GetBookById(int bookId)
        {
            return _context.Books.Find(bookId);
        }

        public void AddBook(Book book)
        {
            _context.Books.Add(book);
            _context.SaveChanges();
        }

        public void UpdateBook(Book book)
        {
            _context.Books.Update(book);
            _context.SaveChanges();
        }

        public void DeleteBook(int bookId)
        {
            var book = _context.Books.Find(bookId);
            if (book != null)
            {
                _context.Books.Remove(book);
                _context.SaveChanges();
            }
        }
    }
}
