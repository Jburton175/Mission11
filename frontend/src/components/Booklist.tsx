import { useEffect, useState } from "react";
import { Book } from "../types/Books";
import "../css/Bookcss.css";
import { useNavigate } from "react-router-dom";
import { fetchBooks } from "../api/BooksAPI";
import Pagination from "./Pagination";

function Booklist({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [rowNum, setRowNum] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("title");
  const [sortDirection, setSortDirection] = useState<string>("asc");
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadbooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(
          rowNum,
          pageNum,
          sortBy,
          sortDirection,
          selectedCategories
        );

        setBooks(data.books);
        setTotalItems(data.booksCount);
        setTotalPages(Math.ceil(totalItems / rowNum));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadbooks();
  }, [rowNum, pageNum, totalItems, sortBy, sortDirection, selectedCategories]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  const toggleSortByTitle = () => {
    if (sortBy === "title") {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy("title");
      setSortDirection("asc");
    }
  };

  return (
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
                  className="btn btn-success btn-sm"
                  onClick={() =>
                    navigate(
                      `/addcart/${encodeURIComponent(b.title)}/${b.price}/${b.bookId}`
                    )
                  }
                >
                  Add to Cart
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
  );
}

export default Booklist;
