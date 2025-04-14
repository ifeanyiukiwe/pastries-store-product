import { useContext } from "react";
import shopbag from "../src/components/assets/images/shopping-bag.png";
import { ProductContext } from "./context/ProductContext";
import ProductCard from "./components/ProductCard";
import SideCart from "./components/SideCart";
import Footer from "./components/Footer"; // ✅ Import the Footer component
import "./App.css";

function App() {
  const {
    filterProducts,
    cart,
    isCartOpen,
    setIsCartOpen,
    handleQuantityChange,
    removeFromCart,
    totalItems,
  } = useContext(ProductContext);

  const handleSearch = (e) => {
    filterProducts(e.target.value);
  };

  const handleRefreshPage = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="bg-[#fff] min-h-screen flex flex-col justify-between">
        {/* Header */}
        <div className="header fixed top-0 w-full z-50 bg-white flex justify-between items-center p-5 shadow-md">
          <h1
            className="text-xl font-bold text-[#8b4513] cursor-pointer"
            onClick={handleRefreshPage}
          >
            Dessert
          </h1>

          <div>
            <input
              type="text"
              placeholder="Search Products..."
              onChange={handleSearch}
              className="border-2 border-[#8b4513] rounded-full p-1 px-2.5"
            />
          </div>

          {/* Hamburger / Shopbag */}
          <div className="relative">
            {isCartOpen ? (
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-2xl font-bold"
              >
                &#9776;
              </button>
            ) : (
              <>
                <img
                  src={shopbag}
                  alt="shopping bag"
                  width="40px"
                  className="cursor-pointer"
                  onClick={() => setIsCartOpen(true)}
                />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {totalItems}
                  </span>
                )}
              </>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div
          className={`pt-24 pb-10 flex-grow ${
            isCartOpen ? "flex flex-col gap-4" : ""
          }`}
        >
          <ProductCard isCartOpen={isCartOpen} />
        </div>

        {/* SideCart */}
        {isCartOpen && (
          <SideCart
            cart={cart}
            onClose={() => setIsCartOpen(false)}
            handleQuantityChange={handleQuantityChange}
            removeFromCart={removeFromCart}
          />
        )}

        {/* ✅ Footer */}
        <Footer />
      </div>
    </>
  );
}

export default App;
