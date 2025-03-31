import { useEffect, useState } from "react";
import { Book } from "../types/Books";
import { deleteBook, fetchBooks } from "../api/BooksAPI";
import Pagination from "../components/Pagination";
import NewBook from "../components/NewBook";
import EditBook from "../components/EditBook";

const Admin = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<string>("title");
  const [sortDirection, setSortDirection] = useState<string>("asc");
  const [rowNum, setRowNum] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [showForm, setShowForm] = useState(false);
  const [editingBooks, setEditingBooks] = useState<Book | null>(null);

  useEffect(() => {
    const loadbooks = async () => {
      try {
        const data = await fetchBooks(
          rowNum,
          pageNum,
          sortBy,
          sortDirection,
          [] // no categories added on this page
        );
        setBooks(data.books);
        setTotalItems(data.booksCount);
        setTotalPages(Math.ceil(totalItems / rowNum));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadbooks();
  }, [rowNum, pageNum, totalItems, sortBy, sortDirection]);

  const toggleSortByTitle = () => {
    if (sortBy === "title") {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy("title");
      setSortDirection("asc");
    }
  };

  const handleDelete = async (bookId: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (!confirmDelete) return;

    try {
      await deleteBook(bookId);
      setBooks(books.filter((b) => b.bookId !== bookId));
    } catch (error) {
      alert("Failed to delete book. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      <h1>Admin</h1>
      {!showForm && (
        <button
          className="btn btn-success mb-3"
          onClick={() => setShowForm(true)}
        >
          Add Project
        </button>
      )}

      {editingBooks && (
        <EditBook
          book={editingBooks}
          onSuccess={() => {
            setEditingBooks(null);
            fetchBooks(rowNum, pageNum, sortBy, sortDirection, []).then(
              (data) => setBooks(data.books)
            );
          }}
          onCancel={() => setEditingBooks(null)}
        />
      )}

      {showForm && (
        <NewBook
          onSuccess={() => {
            setShowForm(false);
            fetchBooks(rowNum, pageNum, sortBy, sortDirection, []).then(
              (data) => setBooks(data.books)
            );
          }}
          onCancel={() => setShowForm(false)}
        />
      )}
      <div className="container mt-4">
        {/* added bootstrap to make the table dark mode and striped - https://getbootstrap.com/docs/5.0/content/tables/*/}
        <table className="table table-dark table-striped table-hover">
          <thead>
            <tr>
              <th
                className="sortable"
                onClick={toggleSortByTitle}
                style={{ cursor: "pointer" }}
              >
                Title{" "}
                {sortBy === "title" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th>Author</th>
              <th>Publisher</th>
              <th>ISBN</th>
              <th>Classification</th>
              <th>Category</th>
              <th>Page Count</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {books.map((b) => (
              <tr key={b.bookId}>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.publisher}</td>
                <td>{b.isbn}</td>
                <td>{b.classification}</td>
                <td>{b.category}</td>
                <td>{b.pageCount}</td>
                <td>${b.price.toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm w-100 mb-1"
                    onClick={() => setEditingBooks(b)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-success btn-sm w-100"
                    onClick={() => handleDelete(b.bookId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          currentPage={pageNum}
          totalPages={totalPages}
          rowNum={rowNum}
          onPageChange={setPageNum}
          onRowNumChange={(newRowNum) => {
            setRowNum(newRowNum);
            setPageNum(1);
          }}
        />
      </div>
    </div>
  );
};

export default Admin;
