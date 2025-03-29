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
  const [sortBy, setSortBy] = useState<string>("title");
  const [sortDirection, setSortDirection] = useState<string>("asc");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
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
          {books.map((b, index) => (
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

      {/* Pagination Controls */}
      <nav aria-label="Page navigation example" className="mt-3">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${pageNum === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setPageNum(pageNum - 1)}
            >
              Previous
            </button>
          </li>

          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index + 1}
              className={`page-item ${pageNum === index + 1 ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setPageNum(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}

          <li
            className={`page-item ${pageNum === totalPages ? "disabled" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => setPageNum(pageNum + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>

      {/* Results Per Page Dropdown */}
      <div className="d-flex justify-content-end align-items-center mt-3">
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
