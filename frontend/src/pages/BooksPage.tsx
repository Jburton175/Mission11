import "../css/App.css";
import Booklist from "../components/Booklist";
import CategoryFilter from "../components/CategoryFilter";
import { useState } from "react";

function App() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-2">
            <CategoryFilter
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
          <div className="col-md-10">
            <Booklist selectedCategories={selectedCategories} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
