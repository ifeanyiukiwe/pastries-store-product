import {useContext} from "react"
import { ProductContext } from "../context/ProductContext";

const ProductCard = () => {
  const { filtered } = useContext(ProductContext);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {filtered.map((product) => (
        <div
          key={product.id}
          className="p-4 bg-white shadow rounded-lg text-center"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-40 object-cover rounded"
          />
          <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
          <p className="text-sm">${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
