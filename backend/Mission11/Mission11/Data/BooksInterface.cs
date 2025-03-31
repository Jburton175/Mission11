using System.Collections.Generic;

namespace Mission11.Data
{
    public interface BooksInterface
    {
        IEnumerable<Book> GetBooks();
        Book? GetBookById(int bookId);
        void AddBook(Book book);
        void UpdateBook(Book book);
        void DeleteBook(int bookId);
    }
}
