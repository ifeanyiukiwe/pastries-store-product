import { useContext } from "react";
import shopbag from "../src/components/assets/images/shopping-bag.png";
import shopcart from "../src/components/assets/images/shopping-cart.png";
import { ProductContext } from "./context/ProductContext";
import ProductCard from "./components/ProductCard";
import SideCart from "./components/SideCart";
import Footer from "./components/Footer";
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
    loading,
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
        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#8b4513] border-opacity-50 mb-4"></div>
              <p className="text-[#8b4513] font-bold text-xl">
                Loading products...
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="header fixed top-0 w-full z-50 bg-white p-5 sm:px-20 shadow-md">
              <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1
                  className="text-[60px] bounce-in-left sm:animate-bounce sm:text-xl sm:mr-96 font-extrabold text-[#8b4513] cursor-pointer sm:order-1"
                  onClick={handleRefreshPage}
                >
                  Dessert
                </h1>

                <div className="w-full flex justify-center items-center gap-4 sm:hidden">
                  <input
                    type="text"
                    placeholder="Search Products..."
                    onChange={handleSearch}
                    className="border-2 border-[#8b4513] rounded-full p-1 px-2 w-full"
                  />
                  <div className="relative">
                    <img
                      src={shopcart}
                      alt="shopcart"
                      className="cursor-pointer w-[40px]"
                      onClick={() => setIsCartOpen(true)}
                    />
                    {totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {totalItems}
                      </span>
                    )}
                  </div>
                </div>

                <div className="hidden sm:flex sm:order-2 flex-1 justify-between items-center gap-4">
                  <div className="w-60 flex justify-center">
                    <input
                      type="text"
                      placeholder="Search Products..."
                      onChange={handleSearch}
                      className="border-2 border-[#8b4513] rounded-full p-1 px-2 w-full max-w-md"
                    />
                  </div>

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
                          className="cursor-pointer w-[50px] hidden sm:block"
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
              </div>
            </div>

            <div
              className={`pt-24 pb-10 flex-grow ${
                isCartOpen ? "flex flex-col gap-4" : ""
              }`}
            >
              <ProductCard isCartOpen={isCartOpen} />
            </div>

            {isCartOpen && (
              <SideCart
                cart={cart}
                onClose={() => setIsCartOpen(false)}
                handleQuantityChange={handleQuantityChange}
                removeFromCart={removeFromCart}
              />
            )}

            <Footer />
          </>
        )}
      </div>
    </>
  );
}

export default App;
