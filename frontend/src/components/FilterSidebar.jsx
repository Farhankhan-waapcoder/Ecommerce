import { Star } from "lucide-react";
import PropTypes from "prop-types";

export default function FilterSidebar({ filters, setFilters, uniqueBrands = [] }) {
  // Add validation for uniqueBrands
  const validBrands = uniqueBrands.filter(brand => 
    brand && typeof brand === 'string'
  );

  const handleBrandChange = (brand) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand],
    }));
  };

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    setFilters((prev) => ({
      ...prev,
      priceRange: [prev.priceRange[0], value],
    }));
  };

  const handleRatingChange = (rating) => {
    setFilters((prev) => ({
      ...prev,
      rating: prev.rating === rating ? 0 : rating,
    }));
  };

  const clearFilters = () => {
    setFilters({
      brands: [],
      priceRange: [0, 2000],
      rating: 0,
      inStock: false,
    });
  };

return (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 h-fit top-6 text-gray-900 dark:text-gray-100">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-semibold">Filters</h3>
      <button
        onClick={clearFilters}
        className="text-purple-600 hover:text-purple-700 dark:hover:text-purple-400 text-sm font-medium"
      >
        Clear All
      </button>
    </div>

    {/* Brand Filter */}
    <div className="mb-6">
      <h4 className="font-medium mb-3">Brands</h4>
      <div className="space-y-2">
        {validBrands.length > 0 ? (
          validBrands.map((brand) => (
            <label key={brand} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
                className="rounded border-gray-300 dark:border-gray-600 text-purple-600 focus:ring-purple-500"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                {brand}
              </span>
            </label>
          ))
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No brands available
          </p>
        )}
      </div>
    </div>

    {/* Price Filter */}
    <div className="mb-6">
      <h4 className="font-medium mb-3">Price Range</h4>
      <div className="space-y-2">
        <input
          type="range"
          min="0"
          max="2000"
          value={filters.priceRange[1]}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>$0</span>
          <span>${filters.priceRange[1]}</span>
        </div>
      </div>
    </div>

    {/* Rating Filter */}
    <div className="mb-6">
      <h4 className="font-medium mb-3">Rating</h4>
      <div className="space-y-2">
        {[4, 4.5, 5].map((rating) => (
          <button
            key={rating}
            onClick={() => handleRatingChange(rating)}
            className={`flex items-center w-full text-left p-2 rounded-lg transition-colors ${
              filters.rating === rating
                ? "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm">{rating}+ stars</span>
            </div>
          </button>
        ))}
      </div>
    </div>

    {/* In Stock Filter */}
    <div className="mb-6">
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={filters.inStock}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              inStock: e.target.checked,
            }))
          }
          className="rounded border-gray-300 dark:border-gray-600 text-purple-600 focus:ring-purple-500"
        />
        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">In Stock Only</span>
      </label>
    </div>
  </div>
);
}

// Add PropTypes for better type checking
FilterSidebar.propTypes = {
  filters: PropTypes.shape({
    brands: PropTypes.arrayOf(PropTypes.string),
    priceRange: PropTypes.arrayOf(PropTypes.number),
    rating: PropTypes.number,
    inStock: PropTypes.bool
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
  uniqueBrands: PropTypes.arrayOf(PropTypes.string)
};
