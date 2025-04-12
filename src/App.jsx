import { useContext } from "react";
// import shopbag from "/assets/images/shopping-bag.png";
import shopbag from "./component/assets/images/shopping-bag.png";
import { ProductContext } from "./context/ProductContext";
import ProductCard from "./components/ProductCard";
import "./App.css";

function App() {
  const { filterProducts } = useContext(ProductContext);

  // const SearchInput = () => {};
  const handleSearch = (e) => {
    filterProducts(e.target.value);
  };
  
  return (
    <>
      <div className="bg-[#fcf8f5]">
        <div className="header">
          <h1>Dessert</h1>
          <div>
            <input
              type="text"
              placeholder="Search Products..."
              onChange={handleSearch}
            />
          </div>
          <div>
            <img src={shopbag} alt="shopping bag" width="40px" />
          </div>
        </div>
        {/* <SearchInput /> */}
        <ProductCard />
      </div>
    </>
  );
}

export default App;
