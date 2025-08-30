import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Grid, List, Filter, X } from "lucide-react";

import allProducts from "../data/products";
import ProductCard from "../components/ProductCard";
import HorizontalProductCard from "../components/HorizontalProductCard";
import FilterSidebar from "../components/FilterSidebar";

export default function Search() {
  const { query } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("featured");

  const [filters, setFilters] = useState({
    brands: [],
    priceRange: [0, 2000],
    rating: 0,
    inStock: false,
  });

  const uniqueBrands = [
    ...new Set(allProducts.map((product) => product.brand)),
  ];

  useEffect(() => {
    const matched = allProducts.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setProducts(matched);
  }, [query]);

  useEffect(() => {
    let filtered = [...products];

    // Brand filter
    if (filters.brands.length > 0) {
      filtered = filtered.filter((p) => filters.brands.includes(p.brand));
    }

    // Price filter
    filtered = filtered.filter((p) => {
      const price = parseFloat(p.price.replace("$", ""));
      return (
        price >= filters.priceRange[0] && price <= filters.priceRange[1]
      );
    });

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter((p) => p.rating >= filters.rating);
    }

    // Stock filter
    if (filters.inStock) {
      filtered = filtered.filter((p) => p.stock > 0);
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort(
          (a, b) =>
            parseFloat(a.price.replace("$", "")) -
            parseFloat(b.price.replace("$", ""))
        );
        break;
      case "price-high":
        filtered.sort(
          (a, b) =>
            parseFloat(b.price.replace("$", "")) -
            parseFloat(a.price.replace("$", ""))
        );
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [filters, sortBy, products]);

  const handleAddToCart = (product) => {
    console.log("Add to cart:", product);
  };

return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 shadow-sm dark:shadow-slate-900/30 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100 capitalize">
                Search Results for "{query}"
              </h1>
              <p className="text-gray-600 dark:text-slate-400 mt-1">
                {filteredProducts.length} products found
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* View Toggle */}
              <div className="hidden sm:flex items-center bg-gray-100 dark:bg-slate-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-white dark:bg-slate-600 shadow-sm text-gray-900 dark:text-slate-100"
                      : "hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-slate-300"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-white dark:bg-slate-600 shadow-sm text-gray-900 dark:text-slate-100"
                      : "hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-slate-300"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-lg px-3 py-2 text-sm focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-purple-500 dark:focus:border-purple-400"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name: A to Z</option>
              </select>

              {/* Mobile Filter Button */}
              <button
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden bg-purple-600 dark:bg-purple-700 text-white p-2 rounded-lg hover:bg-purple-700 dark:hover:bg-purple-800 transition-colors"
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              uniqueBrands={uniqueBrands}
            />
          </div>

          {/* Mobile Filter */}
          {isFilterOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-70">
              <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-slate-800 overflow-y-auto">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">Filters</h3>
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300 rounded-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <FilterSidebar
                    filters={filters}
                    setFilters={setFilters}
                    uniqueBrands={uniqueBrands}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Products */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 dark:text-slate-400">Try adjusting your filters</p>
              </div>
            ) : (
              <div
                className={`${
                  viewMode === "grid"
                    ? "grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                    : "space-y-4"
                }`}
              >
                {filteredProducts.map((product) =>
                  viewMode === "grid" ? (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  ) : (
                    <HorizontalProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}