import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, Star } from 'lucide-react';
import toast from 'react-hot-toast';

export default function WishList() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadWishlistAndCart = () => {
      try {
        const storedUser = localStorage.getItem("user");
        
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setCurrentUser(parsedUser.email);
          setIsLoggedIn(true);
          
          // Load user-specific wishlist and cart
          const userWishlist = JSON.parse(localStorage.getItem(`wishlist_${parsedUser.email}`)) || [];
          const userCart = JSON.parse(localStorage.getItem(`cart_${parsedUser.email}`)) || [];
          
          setWishlistItems(userWishlist);
          setCartItems(userCart);
        } else {
          // Load guest wishlist and cart
          const guestWishlist = JSON.parse(localStorage.getItem("wishlist_guest")) || [];
          const guestCart = JSON.parse(localStorage.getItem("cart_guest")) || [];
          
          setWishlistItems(guestWishlist);
          setCartItems(guestCart);
        }
      } catch (error) {
        console.error("Error loading wishlist:", error);
        setWishlistItems([]);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadWishlistAndCart();
  }, []);

  const handleRemoveFromWishlist = (productId) => {
    const wishlistKey = isLoggedIn && currentUser ? `wishlist_${currentUser}` : "wishlist_guest";
    const updatedWishlist = wishlistItems.filter(item => item.id !== productId);
    
    localStorage.setItem(wishlistKey, JSON.stringify(updatedWishlist));
    setWishlistItems(updatedWishlist);
    
    const removedProduct = wishlistItems.find(item => item.id === productId);
    toast.success(`${removedProduct?.name} removed from wishlist`);
  };

  const handleAddToCart = (product) => {
    const cartKey = isLoggedIn && currentUser ? `cart_${currentUser}` : "cart_guest";
    const existingCart = [...cartItems];
    
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
    
    toast.success(`${product.name} added to cart`);
  };

  const handleMoveToCart = (product) => {
    handleAddToCart(product);
    handleRemoveFromWishlist(product.id);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-slate-400">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100 mb-2">My Wishlist</h1>
          <p className="text-gray-600 dark:text-slate-400">
            {wishlistItems.length > 0 
              ? `You have ${wishlistItems.length} item${wishlistItems.length > 1 ? 's' : ''} in your wishlist`
              : 'Your wishlist is empty'
            }
          </p>
        </div>

        {/* Wishlist Content */}
        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-6">
              <Heart className="w-24 h-24 text-gray-300 dark:text-slate-600 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-slate-100 mb-2">Your wishlist is empty</h2>
              <p className="text-gray-600 dark:text-slate-400 mb-6">Start adding products you love to keep track of them</p>
              <button
                onClick={() => navigate('/')}
                className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((product) => (
              <div key={product.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg dark:shadow-slate-900/30 overflow-hidden hover:shadow-xl dark:hover:shadow-slate-900/50 transition-shadow duration-300">
                {/* Product Image */}
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                    onClick={() => handleProductClick(product.id)}
                  />
                  <button
                    onClick={() => handleRemoveFromWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full hover:bg-red-50 dark:hover:bg-red-900/50 hover:text-red-500 dark:hover:text-red-400 transition-all duration-200"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4 text-gray-600 dark:text-slate-300" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="mb-2">
                    <span className="text-xs bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 px-2 py-1 rounded">
                      {product.category}
                    </span>
                  </div>
                  
                  <h3 
                    className="font-semibold text-gray-900 dark:text-slate-100 mb-1 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2"
                    onClick={() => handleProductClick(product.id)}
                  >
                    {product.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 dark:text-slate-400 mb-2">by {product.brand}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex items-center">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-slate-500">({product.rating})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{product.price}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      product.stock > 0 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                        : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                    }`}>
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <button
                      onClick={() => handleMoveToCart(product)}
                      disabled={product.stock === 0}
                      className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                        product.stock === 0
                          ? 'bg-gray-200 dark:bg-slate-700 text-gray-400 dark:text-slate-500 cursor-not-allowed'
                          : 'bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-800'
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Move to Cart
                    </button>
                    
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                      className={`w-full py-2 px-4 rounded-lg border transition-colors ${
                        product.stock === 0
                          ? 'border-gray-200 dark:border-slate-600 text-gray-400 dark:text-slate-500 cursor-not-allowed'
                          : 'border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                      }`}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        {wishlistItems.length > 0 && (
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                wishlistItems.forEach(product => {
                  if (product.stock > 0) {
                    handleAddToCart(product);
                  }
                });
                toast.success('Available items added to cart');
              }}
              className="bg-green-600 dark:bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-700 dark:hover:bg-green-800 transition-colors"
            >
              Add All Available to Cart
            </button>
            
            <button
              onClick={() => {
                const wishlistKey = isLoggedIn && currentUser ? `wishlist_${currentUser}` : "wishlist_guest";
                localStorage.setItem(wishlistKey, JSON.stringify([]));
                setWishlistItems([]);
                toast.success('Wishlist cleared');
              }}
              className="bg-red-600 dark:bg-red-700 text-white px-6 py-3 rounded-lg hover:bg-red-700 dark:hover:bg-red-800 transition-colors"
            >
              Clear Wishlist
            </button>
          </div>
        )}
      </div>
    </div>
  );
}