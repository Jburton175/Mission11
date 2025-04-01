import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/CategoryFilter.css";

function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        "https://mission13.azurewebsites.net/Books/BookCategories"
      );
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedCategories(selectedOptions);
  }

  return (
    // class from bootstrap that gives the filter a multi select rather than a checkbox - https://getbootstrap.com/docs/5.0/forms/select/
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card shadow-sm p-3">
            <h5 className="mb-3">Category Types</h5>

            <div className="filter-box">
              <select
                multiple
                className="form-select tall-select" // Custom class for height
                aria-label="Category selection"
                value={selectedCategories}
                onChange={handleSelectChange}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryFilter;
