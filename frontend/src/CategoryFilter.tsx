import { useEffect, useState } from "react";

function CategoryFilter() {
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
  });

  return (
    <div>
      <h5>Category Types</h5>
      <div>
        {categories.map((c) => (
          <div key={c}>
            <input type="checkbox" id={c} value={c} />
            <label htmlFor={c}>{c}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
