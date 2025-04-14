import React, { useState } from "react";

const SideCart = ({
  cart,
  onClose,
  handleQuantityChange,
  removeFromCart,
  resetCart,
}) => {
  const [showModal, setShowModal] = useState(false);

  const total = Object.values(cart).reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleConfirmOrder = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetCart(); // Reset the cart when the modal is closed
    onClose(); // Optionally close cart too
  };

  return (
    <>
      {/* SideCart Panel */}
      <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 p-4 overflow-y-auto transition-transform duration-300">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-red-500 text-lg font-bold hover:text-red-700"
          >
            ✖
          </button>
        </div>

        {/* Empty Cart */}
        {Object.values(cart).length === 0 ? (
          <div className="text-gray-500 text-center mt-10">
            No items in cart.
          </div>
        ) : (
          <>
            {/* Items in Cart */}
            {/* Scrollable Product List */}
            <div className="max-h-[60vh] overflow-y-auto pr-1">
              {Object.values(cart).map((item) => (
                <div
                  key={item.id}
                  className="border-b py-3 flex items-start justify-between gap-4 relative"
                >
                  {/* Left Column: Image + Details */}
                  <div className="flex flex-col gap-1 w-full">
                    <img
                      src={item.img?.thumbnail || item.image}
                      alt={item.name}
                      className="w-full max-w-[80px] h-[80px] object-cover rounded border"
                    />

                    <h3 className="font-semibold text-sm mt-2">{item.name}</h3>
                    <p className="text-xs text-gray-500">
                      {item.categories || "Category"}
                    </p>
                    <p className="text-sm">${item.price.toFixed(2)}</p>

                    {/* Quantity Control */}
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="bg-gray-200 w-7 h-7 rounded hover:bg-gray-300 text-lg"
                      >
                        -
                      </button>
                      <span className="font-medium">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="bg-gray-200 w-7 h-7 rounded hover:bg-gray-300 text-lg"
                      >
                        +
                      </button>
                    </div>

                    <p className="text-sm text-gray-700 mt-1">
                      Subtotal: ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Right Side: Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-sm text-red-500 hover:text-red-700 absolute top-0 right-0"
                  >
                    ✖
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="mt-6 border-t pt-4">
              <h4 className="font-bold text-lg">
                Order Total: ${total.toFixed(2)}
              </h4>
              <button
                onClick={handleConfirmOrder}
                className="mt-4 bg-[#8b4513] text-white w-full cursor-pointer py-2 rounded hover:bg-[#a05a28] transition-colors"
              >
                Confirm Order
              </button>
            </div>
          </>
        )}
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center pointer-events-none">
          <div className="bg-white w-[90%] max-w-md p-6 rounded shadow-lg pointer-events-auto">
            <h2 className="text-xl font-bold mb-4 text-center">
              Order Summary
            </h2>
            <ul className="space-y-2 max-h-60 overflow-y-auto">
              {Object.values(cart).map((item) => (
                <li key={item.id} className="flex justify-between text-sm">
                  <img
                    src={item.img?.thumbnail || item.image}
                    alt={item.name}
                    className="w-full max-w-[80px] h-[80px] object-cover rounded border"
                  />
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 border-t pt-2 text-right font-bold text-lg">
              Total: ${total.toFixed(2)}
            </div>

            <p className="text-center text-green-600 font-semibold mt-4">
              Thanks for shopping with us! 🛍️
            </p>

            <button
              onClick={closeModal}
              className="mt-6 bg-[#8b4513] text-white w-full py-2 rounded cursor-pointer hover:bg-[#a05a28] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SideCart;
