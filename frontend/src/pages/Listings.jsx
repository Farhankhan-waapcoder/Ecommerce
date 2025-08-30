import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import ProductSlider from "../components/ProductSlider.jsx";
import CategorySlider from "../components/CategorySlider.jsx";
import ProductCard from "../components/ProductCard.jsx";
import ProductSliderLoader from "../components/skeleton/ProductSliderLoader.jsx";
import { productAPI, categoryAPI } from "../services/Api.js";
import { adminApi } from '../services/Api'; // Import the admin API service

export default function Listings() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  // API data states
  const [topPicks, setTopPicks] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  // Loading states
  const [loadingTopPicks, setLoadingTopPicks] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  
  // Error states
  const [error, setError] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [pageSize] = useState(12);

  // Initialize user and cart on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser.email);
        setIsLoggedIn(true);

        const savedCart = JSON.parse(localStorage.getItem(`cart_${parsedUser.email}`)) || [];
        const guestCart = JSON.parse(localStorage.getItem("cart_guest")) || [];

        // Merge guest cart into user's cart
        const mergedCart = [...savedCart];

        guestCart.forEach((guestItem) => {
          const index = mergedCart.findIndex(item => item.id === guestItem.id);
          if (index !== -1) {
            mergedCart[index].quantity += guestItem.quantity;
          } else {
            mergedCart.push(guestItem);
          }
        });

        localStorage.setItem(`cart_${parsedUser.email}`, JSON.stringify(mergedCart));
        localStorage.removeItem("cart_guest");
        setCartItems(mergedCart);
      } catch (err) {
        console.error("Failed to parse user/cart", err);
        setCurrentUser(null);
        setCartItems([]);
      }
    }
  }, []);

  // Fetch top picks (limited products with high ratings) - only once
  useEffect(() => {
    const fetchTopPicks = async () => {
      try {
        setLoadingTopPicks(true);
        const result = await productAPI.getAllProducts();
        
        if (result.success) {
          // Filter and sort by rating to get top picks
          const topRatedProducts = result.data
            .filter(product => product.rating?.rate >= 4.0)
            .sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
            .slice(0, 5)
            .map(product => ({
              ...product,
              name: product.title, // Map title to name for consistency
              image: product.image,
              price: product.price,
              rating: product.rating?.rate || 0, // Extract the numeric rating
              ratingCount: product.rating?.count || 0, // Extract rating count separately
              originalRating: product.rating // Keep original rating object if needed
            }));
          
          setTopPicks(topRatedProducts);
        } else {
          throw new Error(result.message);
        }
      } catch (err) {
        setError("Failed to load top picks");
        toast.error("Failed to load top picks");
      } finally {
        setLoadingTopPicks(false);
      }
    };

    fetchTopPicks();
  }, []); // Only run once

  // Fetch categories - only once
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        // Fetch all products to extract unique categories
        const result = await adminApi.get('/products?pageNumber=1&pageSize=1000'); // Get all products for categories
        
        if (result.data) {
          // Group products by category for the category slider
          const categoryMap = new Map();
          result.data.forEach(item => {
            if (item.categoryName && item.categoryID) {
              categoryMap.set(item.categoryID, {
                id: item.categoryID,
                name: item.categoryName,
                image: item.categoryImage 
                  ? `https://adminecommerce.waapcoders.in${item.categoryImage}`
                  : '/placeholder-category.jpg'
              });
            }
          });
          
          const uniqueCategories = Array.from(categoryMap.values());
          setCategories(uniqueCategories);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        // Categories are not critical, so we don't show error toast
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []); // Only run once

  // Fetch paginated products
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoadingProducts(true);
        setAllProducts([]);
        setError(null);
        
        // First, get total count of products
        const countResult = await adminApi.get('/products?pageNumber=1&pageSize=1000');
        const totalCount = countResult.data ? countResult.data.length : 0;
        setTotalProducts(totalCount);
        
        // Calculate total pages based on actual product count
        const calculatedPages = Math.ceil(totalCount / pageSize);
        setTotalPages(calculatedPages);
        
        // Now fetch the specific page
        const result = await adminApi.get(`/products?pageNumber=${currentPage}&pageSize=${pageSize}`);
        
        if (result.data) {
          // For pagination, we need to slice the data based on current page
          const startIndex = (currentPage - 1) * pageSize;
          const endIndex = startIndex + pageSize;
          const paginatedData = countResult.data.slice(startIndex, endIndex);
          
          const formattedProducts = paginatedData.map(item => ({
            id: item.productID,
            title: item.productName,
            image: item.productImage 
              ? `https://adminecommerce.waapcoders.in/${item.productImage}`
              : '/placeholder-image.jpg',
            price: parseFloat(item.price),
            category: item.categoryName,
            brand: item.brandName || 'No Brand',
            categoryImage: item.categoryImage 
              ? `https://adminecommerce.waapcoders.in${item.categoryImage}`
              : '/placeholder-category.jpg'
          }));
          setAllProducts(formattedProducts);
        } else {
          setAllProducts([]);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products");
        toast.error("Failed to load products");
        setAllProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchAllProducts();
  }, [currentPage, pageSize]);  

  const handleAddToCart = (product) => {
    const cartKey = isLoggedIn && currentUser ? `cart_${currentUser}` : "cart_guest";
    const existingCart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const existingItemIndex = existingCart.findIndex((item) => item.id === product.id);

    let updatedCart;
    if (existingItemIndex !== -1) {
      updatedCart = existingCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...existingCart, { ...product, quantity: 1 }];
    }

    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
    setCartItems(updatedCart);

    toast.success(`${product.name || product.title} has been added to your cart`);
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      setCurrentPage(newPage);
      setAllProducts([]); // Clear products to show loading state
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Retry function for failed API calls
  const handleRetry = () => {
    window.location.reload();
  };

  // Error boundary component
  if (error && !topPicks.length && !allProducts.length && !categories.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Failed to load products. Please try again.
          </p>
          <button
            onClick={handleRetry}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <main className="container mx-auto px-6 py-3">
        {/* Top Picks Slider */}
        {loadingTopPicks ? (
          <ProductSliderLoader 
            title="Our Top Picks"
          />
        ) : topPicks.length > 0 ? (
          <ProductSlider
            products={topPicks}
            title="Our Top Picks"
            subtitle="Hand-picked premium products with excellent ratings"
            onAddToCart={handleAddToCart}
          />
        ) : (
          <div className="mb-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
              Top Picks Unavailable
            </h3>
            <p className="text-yellow-600 dark:text-yellow-300">
              We're having trouble loading our top picks. Please check back later.
            </p>
          </div>
        )}

        {/* Categories Slider */}
        {loadingCategories ? (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Our Top Picked Categories
            </h2>
            <div className="flex space-x-4 animate-pulse">
              {[...Array(4)].map((_, index) => (
               <div key={index} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 min-w-[200px] cursor-pointer group bg-gray-300 dark:bg-gray-600 rounded-lg h-42"></div>
              ))}
            </div>
          </div>
        ) : categories.length > 0 ? (
          <CategorySlider
            categories={categories}
            title="Our Top Picked Categories"
            subtitle="Explore our diverse range of product categories"
          />
        ) : (
          <div className="mb-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
              Categories Unavailable
            </h3>
            <p className="text-yellow-600 dark:text-yellow-300">
              We're having trouble loading categories. Please check back later.
            </p>
          </div>
        )}

        {/* All Products Grid */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
            Featured Products
          </h2>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            Discover our hand-picked selection of premium items
          </p>
          {totalProducts > 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Showing {((currentPage - 1) * pageSize) + 1}-{Math.min(currentPage * pageSize, totalProducts)} of {totalProducts} products
            </p>
          )}
        </div>

        {loadingProducts ? (
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
        ) : allProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  ...product,
                  name: product.title, // Ensure compatibility with ProductCard component
                  rating: 4, // Default rating since it's not in the API
                  description: `${product.title} - ${product.category}`, // Create a description
                  stock: 10 // Default stock since it's not in the API
                }}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              No Products Available
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We're having trouble loading products. Please try again later.
            </p>
            <button
              onClick={handleRetry}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Refresh Page
            </button>
          </div>
        )}

        {/* Pagination controls */}
        {!loadingProducts && totalPages > 1 && (
          <div className="mt-8 flex justify-center items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Previous
            </button>
            
            {totalPages <= 7 ? (
              // Show all pages if total pages are 7 or less
              [...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPage === index + 1
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {index + 1}
                </button>
              ))
            ) : (
              // Show limited pages with ellipsis for large numbers
              <>
                <button
                  onClick={() => handlePageChange(1)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPage === 1 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  1
                </button>
                
                {currentPage > 3 && <span className="px-2 text-gray-500">...</span>}
                
                {Array.from({ length: 3 }, (_, i) => {
                  const pageNum = Math.max(2, currentPage - 1) + i;
                  if (pageNum > 1 && pageNum < totalPages && pageNum <= currentPage + 1) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          currentPage === pageNum
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  }
                  return null;
                }).filter(Boolean)}
                
                {currentPage < totalPages - 2 && <span className="px-2 text-gray-500">...</span>}
                
                {totalPages > 1 && (
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentPage === totalPages 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {totalPages}
                  </button>
                )}
              </>
            )}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {/* Loading indicator for background updates */}
        {loadingProducts && (
          <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span className="text-sm">Loading products...</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}