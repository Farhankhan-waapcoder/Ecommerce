import React, { useEffect, useState } from "react";
import { categoryAPI } from "../services/Api.js";
import { useNavigate } from "react-router-dom";

export default function SimilarProducts({ name }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formattedName = name.charAt(0).toLowerCase() + name.slice(1);
        const response = await categoryAPI.getProductsByCategory(formattedName);
        setProducts(response.slice(0, 5)); // only top 5
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };

    fetchData();
  }, [name]);

  return (
    <div className="my-8">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">Similar Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-2 hover:shadow-md transition dark:bg-gray-800 dark:border-gray-700"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-32 object-contain mb-2"
            />
            <p className="text-sm dark:text-gray-300">{product.title.slice(0, 40)}...</p>
          </div>
        ))}
      </div>
      <div className="text-right mt-4">
        <button
          onClick={() =>
            navigate(`/categories/${name.charAt(0).toLowerCase() + name.slice(1)}`)
          }
          className="text-blue-600 hover:underline text-sm"
        >
          View More
        </button>
      </div>
    </div>
  );
}
