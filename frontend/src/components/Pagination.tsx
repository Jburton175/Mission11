interface PaginationProps {
  currentPage: number;
  totalPages: number;
  rowNum: number;
  onPageChange: (newPage: number) => void;
  onRowNumChange: (newSize: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  rowNum,
  onPageChange,
  onRowNumChange,
}: PaginationProps) => {
  return (
    <div>
      {/* Pagination Controls */}
      <nav aria-label="Page navigation example" className="mt-3">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage - 1)}
            >
              Previous
            </button>
          </li>

          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index + 1}
              className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => onPageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}

          <li
            className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
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
            onRowNumChange(Number(e.target.value));
            onPageChange(1);
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
};

export default Pagination;
