import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { adminApi } from '../services/Api';
import { Filter, X, Grid, List } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import HorizontalProductCard from '../components/HorizontalProductCard.jsx';
import { Link } from "react-router-dom";
export default function Category() {
  const { name } = useParams();
  const [categoryData, setCategoryData] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [filters, setFilters] = useState({
    brands: [],
    priceRange: [0, 2000],
    rating: 0,
    inStock: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch category data and filter products
  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true);
      setError('');
      
      try {
        const response = await adminApi.get('/menu');
        
        if (response.data) {
          // Find the matching category (case-insensitive)
          const category = response.data.find(
            cat => cat.categoryName.toLowerCase() === name.replace(/-/g, ' ').toLowerCase()
          );

          if (category) {
            setCategoryData(category);
            
            // Extract and validate products from the category's brands
            const categoryProducts = category.brands
              .flatMap(brand => 
                brand.products
                  // Filter out invalid products
                  .filter(product => 
                    product.productID && 
                    product.productName && 
                    product.productImage && 
                    product.price
                  )
                  .map(product => ({
                    id: product.productID,
                    title: product.productName,
                    price: parseFloat(product.price),
                    image: `https://adminecommerce.waapcoders.in${product.productImage}`, // Add base URL
                    brand: brand.brandName || "Generic",
                    category: category.categoryName,
                    rating: Math.floor(Math.random() * 5) + 1,
                    stock: 10
                  }))
              )
              .filter(Boolean); // Remove any undefined entries
            
            setProducts(categoryProducts);
            setFilteredProducts(categoryProducts);
          } else {
            setError('Category not found');
          }
        }
      } catch (error) {
        setError('Failed to fetch category data');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [name]);

  // Get unique brands from the category's products
  const uniqueBrands = [...new Set(products.map(p => p.brand).filter(Boolean))];

  // Filter logic
  useEffect(() => {
    let filtered = [...products];

    if (filters.brands.length > 0) {
      filtered = filtered.filter(p => filters.brands.includes(p.brand));
    }

    filtered = filtered.filter(p => 
      p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    if (filters.rating > 0) {
      filtered = filtered.filter(p => p.rating >= filters.rating);
    }

    if (filters.inStock) {
      filtered = filtered.filter(p => p.stock > 0);
    }

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    setFilteredProducts(filtered);
  }, [filters, sortBy, products]);

  const handleBrandChange = (brand) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
  };

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    setFilters(prev => ({
      ...prev,
      priceRange: [prev.priceRange[0], value]
    }));
  };

  const handleRatingChange = (rating) => {
    setFilters(prev => ({
      ...prev,
      rating: prev.rating === rating ? 0 : rating
    }));
  };

  const clearFilters = () => {
    setFilters({
      brands: [],
      priceRange: [0, 2000],
      rating: 0,
      inStock: false
    });
  };

  const handleAddToCart = (product) => {
    console.log('Added to cart:', product);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* Category Header Section */}
      <div className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-40 py-4">
        <div className="max-w-auto mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
                {name?.replace('-', ' ')} Products
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {loading ? 'Loading...' : `${filteredProducts.length} products found`}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow-sm text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
                  <Grid className="w-4 h-4" />
                </button>
                <button onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow-sm text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
                  <List className="w-4 h-4" />
                </button>
              </div>

              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name: A to Z</option>
              </select>

              <button onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="lg:hidden bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
       {/* Breadcrumb Section */}
        <nav className="text-sm mb-4 text-slate-500 dark:text-slate-400 space-x-1 px-6 py-4">
          <Link to="/" className="hover:underline text-blue-600 dark:text-blue-400">
            Home
          </Link>
          <span>&gt;</span>
          <span className="text-slate-700 dark:text-slate-200">
            {categoryData?.categoryName || name.replace(/-/g, ' ')}
          </span>
        </nav>
      <div className="max-w-auto mx-auto px-6 py-3">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80">
            <FilterSidebar filters={filters} setFilters={setFilters} uniqueBrands={uniqueBrands} />
          </div>

          {/* Mobile Filter */}
          {isFilterOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50 dark:bg-opacity-60">
              <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 overflow-y-auto">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
                    <button onClick={() => setIsFilterOpen(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <FilterSidebar filters={filters} setFilters={setFilters} uniqueBrands={uniqueBrands} />
                </div>
              </div>
            </div>
          )}

          {/* Product Listing */}
          <div className="flex-1">
            {loading ?(
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-300 dark:bg-gray-600 h-64 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        )  : error ? (
              <div className="text-center py-12 text-red-600 dark:text-red-400">{error}</div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No products found</h3>
                <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters</p>
              </div>
            ) : (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredProducts.map(product =>
                  viewMode === 'grid'
                    ? <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                    : <HorizontalProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
