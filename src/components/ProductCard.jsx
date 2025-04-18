import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const ProductCard = () => {
  const { filtered, cart, addToCart, handleQuantityChange } =
    useContext(ProductContext);

  return (
    <div className="main">
      {filtered.map((product) => {
        const cartItem = cart[product.id];

        return (
          <div key={product.id} className="product-card">
            <picture>
              <source
                srcSet={product.img?.desktop}
                media="(min-width: 1024px)"
              />
              <source srcSet={product.img?.tablet} media="(min-width: 768px)" />
              <source srcSet={product.img?.mobile} media="(max-width: 767px)" />
              <img
                src={product.img?.thumbnail || product.image}
                alt={product.name}
                className="w-full h-auto object-cover rounded"
              />
            </picture>
            <p>{product.categories}</p>
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <small className="text-sm">${product.price.toFixed(2)}</small>

            <div className="cart">
              {cartItem ? (
                <div className="border-2 border-[#e9bc49]  hover:bg-[#f4e8d6] rounded-full flex justify-center items-center py-2 px-3 cursor-pointer gap-x-3 text-xs font-bold">
                  <button
                    className="bg-gray-200 px-2 rounded"
                    onClick={() => handleQuantityChange(product.id, -1)}
                  >
                    -
                  </button>
                  <span className="font-semibold">{cartItem.quantity}</span>
                  <button
                    className="bg-gray-200 px-2 rounded"
                    onClick={() => handleQuantityChange(product.id, 1)}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  className="border-2 border-[#e9bc49] bg-[#f4e8d6] text-gray-700  hover:bg-[#aea391] rounded-full flex justify-center items-center py-2 px-3 cursor-pointer gap-x-3 text-xs font-bold"
                  onClick={() => addToCart(product)}
                >
                  <ShoppingCartIcon className="w-4 h-4 text-gray-700" /> Add to
                  Cart
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductCard;
