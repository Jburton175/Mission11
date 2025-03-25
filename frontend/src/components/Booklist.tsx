import { useEffect, useState } from "react";
import { Book } from "../types/Books";
import "../css/Bookcss.css";
import { useNavigate } from "react-router-dom";

function Booklist({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [rowNum, setRowNum] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("title"); // Default sorting by title
  const [sortDirection, setSortDirection] = useState<string>("asc"); // Default sorting direction is ascending
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      // receives information from the CategoryFilter.tsx to append onto the parameters
      const categoryParams = selectedCategories
        .map((cat) => `categoryTypes=${encodeURIComponent(cat)}`)
        .join("&");

      const response = await fetch(
        `https://localhost:5000/Books?rownum=${rowNum}&pagenum=${pageNum}&sortBy=${sortBy}&sortDirection=${sortDirection}${selectedCategories.length ? "&" + categoryParams : ""}`
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalItems(data.booksCount);
    };

    fetchBooks();
  }, [rowNum, pageNum, totalItems, sortBy, sortDirection, selectedCategories]);

  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / rowNum));
  }, [totalItems, rowNum]);

  // Toggle sort direction for title
  const toggleSortByTitle = () => {
    if (sortBy === "title") {
      // Toggle between ascending and descending order
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy("title");
      setSortDirection("asc"); // Default to ascending when sorting by title
    }
  };

  return (
    <div className="container mt-2">
      <table className="table excel-table">
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
          {books.map((b, index) => (
            <tr
              key={b.bookId}
              className={index % 2 === 0 ? "even-row" : "odd-row"}
            >
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
                  className="btn btn-success"
                  onClick={() => navigate("/cart")}
                >
                  Add to Cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      {/* Pagination Controls */}
      <div className="pagination-container">
        <button
          className={`btn btn-prev-next ${pageNum === 1 ? "btn-disabled" : ""}`}
          disabled={pageNum === 1}
          onClick={() => setPageNum(pageNum - 1)}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            className={`btn ${pageNum === index + 1 ? "btn-secondary" : "btn-outline-primary"}`}
            onClick={() => setPageNum(index + 1)}
            disabled={pageNum === index + 1} // Disable the current page button
          >
            {index + 1}
          </button>
        ))}

        <button
          className={`btn btn-prev-next ${pageNum === totalPages ? "btn-disabled" : ""}`}
          disabled={pageNum === totalPages}
          onClick={() => setPageNum(pageNum + 1)}
        >
          Next
        </button>
      </div>

      {/* Results Per Page Dropdown */}
      <div className="d-flex justify-content-end">
        <label className="me-2 fw-bold">Results per page:</label>
        <select
          className="form-select w-auto"
          value={rowNum}
          onChange={(e) => {
            setRowNum(Number(e.target.value));
            setPageNum(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
    </div>
  );
}

export default Booklist;
