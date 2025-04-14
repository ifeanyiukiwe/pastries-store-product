import { createContext, useState, useEffect } from "react";
import productlist from "../components/ProductList"; // Assuming you have a static product list

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [cart, setCart] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false); // For SideCart visibility

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
        quantity: (prev[product.id]?.quantity || 0) + 1, // Add 1 to the quantity of the product
      },
    }));
  };

  const handleQuantityChange = (id, amount) => {
    setCart((prev) => {
      const updatedQuantity = (prev[id]?.quantity || 0) + amount;
      if (updatedQuantity <= 0) {
        // If quantity is 0 or less, remove the product from the cart
        const { [id]: _, ...rest } = prev;
        return rest;
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

  const totalItems = Object.values(cart).reduce(
    (acc, item) => acc + item.quantity,
    0
  ); // Calculate the total number of items in the cart

  return (
    <ProductContext.Provider
      value={{
        filtered,
        filterProducts,
        cart,
        addToCart,
        handleQuantityChange,
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
