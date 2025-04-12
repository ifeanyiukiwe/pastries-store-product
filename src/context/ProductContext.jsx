import {
  createContext,
  useState,
  useEffect,
  Children,
} from "react";
import productlist from "../components/ProductList";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await new Promise((resolve) =>
          setTimeout(() => resolve(productlist), 500)
        );
        setProducts(response);
        setFiltered(response);
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
        item.price.toString().includes(lowerQuery) ||
        item.image.toLowerCase().includes(lowerQuery)
    );

    setFiltered(filteredItems);
  };

  return (
    <ProductContext.Provider value={{ filtered, filterProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider  };