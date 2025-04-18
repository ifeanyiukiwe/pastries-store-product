import { createContext, useState, useEffect } from "react";
import productlist from "../components/ProductList"; // Assuming you have a static product list

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : {};
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Simulating API call with a delay (you can replace this with an actual API call)
        const response = await new Promise((resolve) =>
          setTimeout(() => resolve(productlist), 500)
        );
        setProducts(response);
        setFiltered(response); // Set filtered products initially as all products
      } catch (error) {
        console.log("Failed to fetch product", error);
      }
    };

    fetchProducts();
  }, []);

  const filterProducts = (query) => {
    const lowerQuery = query.toLowerCase();
    const filteredItems = products.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerQuery) ||
        item.categories.toLowerCase().includes(lowerQuery) ||
        item.price.toString().includes(lowerQuery)
    );
    setFiltered(filteredItems);
  };

  const addToCart = (product) => {
    setCart((prev) => ({
      ...prev,
      [product.id]: {
        ...product,
        quantity: (prev[product.id]?.quantity || 0) + 1,
      },
    }));
  };

  // This function ensures quantity can't go below 1
  const handleQuantityChange = (id, amount) => {
    setCart((prev) => {
      const currentQuantity = prev[id]?.quantity || 0;
      const updatedQuantity =
        amount < 0
          ? Math.max(currentQuantity + amount, 1)
          : currentQuantity + amount;

      if (updatedQuantity <= 0) {
        // Do not update the cart if quantity is zero or less
        return prev;
      }

      return {
        ...prev,
        [id]: {
          ...prev[id],
          quantity: updatedQuantity,
        },
      };
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest; // Remove product by id
    });
  };

  const totalItems = Object.keys(cart).length;

  return (
    <ProductContext.Provider
      value={{
        filtered,
        filterProducts,
        cart,
        addToCart,
        handleQuantityChange, // The corrected quantity change handler
        removeFromCart,
        totalItems,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
