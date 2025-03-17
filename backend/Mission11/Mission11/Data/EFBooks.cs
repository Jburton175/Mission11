namespace Mission11.Data
{
    public class EFBooks : BooksInterface
    {

        private BookstoreContext _context;

        public EFBooks(BookstoreContext temp)
        {
            _context = temp;
        }

        public List<Book> Books => _context.Books.ToList();

    }
}
