import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const ProductCard = () => {
  const { filtered, cart, addToCart, handleQuantityChange } =
    useContext(ProductContext);

  return (
    <div className="main grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filtered.map((product) => {
        const cartItem = cart[product.id]; // ✅ Fix: get cart item for current product

        return (
          <div
            key={product.id}
            className="p-4 bg-white shadow rounded-lg text-left h-auto"
          >
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
              <div className="qt-ct">
                {cartItem ? (
                  <div className=" btn quantity-controls flex items-center gap-2">
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
                  <button className="btn" onClick={() => addToCart(product)}>
                    <ShoppingCartIcon className="w-4 h-4 text-gray-700" /> Add
                    To Cart
                  </button>
                )}
              </div>
            </picture>

            <p>{product.categories}</p>
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <small className="text-sm">${product.price.toFixed(2)}</small>
          </div>
        );
      })}
    </div>
  );
};

export default ProductCard;
