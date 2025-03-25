import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (cateogries: string[]) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        "https://localhost:5000/Books/BookCategories"
      );
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((c) => c !== target.value)
      : [...selectedCategories, target.value];

    setSelectedCategories(updatedCategories);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-15">
          <div className="card shadow-sm p-3">
            <h5 className="mb-3">Category Types</h5>
            <div className="filter-box">
              {categories.map((c) => (
                <div className="form-check mb-2" key={c}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={c}
                    value={c}
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label" htmlFor={c}>
                    {c}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryFilter;
