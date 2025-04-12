import { useState } from "react";
import shopbag from "/assets/images/shopping-bag.png";
import { ProductProvider, useProduct } from "./context/ProductContext";
import ProductCard from "./components/ProductCard";
import "./App.css";

function App() {
  const SearchInput = () => {
    const { filterProducts } = useProduct();

    const handleSearch = (e) => {
      filterProducts(e.target.value);
    };
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
