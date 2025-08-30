import { useNavigate } from "react-router-dom";
import { Star, ShoppingCart } from 'lucide-react';

export default function ProductCard({ product, onAddToCart }) {
  const navigate = useNavigate();

 return (
  <div
    onClick={() => navigate(`/product/${product.id}`)}
    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl dark:shadow-gray-900/20 dark:hover:shadow-gray-900/30 transition-all duration-300 overflow-hidden group hover:scale-105 cursor-pointer"
  >
    <div className="relative">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
        <Star className="w-4 h-4 text-yellow-400 fill-current" />
        <span className="text-sm font-semibold text-gray-900 dark:text-white">{product.rating}</span>
      </div>
    </div>
    
    <div className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
        {product.name}
      </h3>
      
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">{product.price}</span>
        <button
          onClick={(e) => {
            e.stopPropagation(); // stop click bubbling
            onAddToCart(product);
          }}
          className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl dark:shadow-gray-900/20 dark:hover:shadow-gray-900/30"
        >
          <ShoppingCart className="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
);
}