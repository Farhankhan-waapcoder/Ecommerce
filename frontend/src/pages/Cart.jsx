import { useState, useEffect } from "react";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      const savedCart = localStorage.getItem(`cart_${parsedUser.email}`);
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch (error) {
          console.error("Failed to parse cart:", error);
          setCartItems([]);
        }
      }
    } else {
      // Load guest cart
      const guestCart = localStorage.getItem("cart_guest");
      if (guestCart) {
        try {
          setCartItems(JSON.parse(guestCart));
        } catch (error) {
          console.error("Failed to parse guest cart:", error);
          setCartItems([]);
        }
      }
    }
    setLoading(false);
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (!loading) {
      const key = user ? `cart_${user.email}` : "cart_guest";
      localStorage.setItem(key, JSON.stringify(cartItems));
    }
  }, [cartItems, user, loading]);

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) return removeFromCart(productId);

    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );

    toast.success("Cart updated");
  };

  const removeFromCart = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    setCartItems(prev => prev.filter(item => item.id !== productId));
    toast(`${item?.name} removed from cart`);
  };

  const clearCart = () => {
    setCartItems([]);
    toast("Cart cleared");
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + (price * item.quantity);
    }, 0).toFixed(2);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 rounded-full mb-4 mx-auto" />
          <p className="text-gray-600 dark:text-gray-300">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-4 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Continue Shopping
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Cart</h1>
          <p className="text-gray-600 dark:text-gray-300">
            {cartItems.length === 0 
              ? "Your cart is empty" 
              : `${getTotalItems()} item${getTotalItems() === 1 ? '' : 's'} in your cart`}
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag size={64} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your cart is empty</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Add items to your cart to see them here.</p>
            <button
              onClick={() => window.history.back()}
              className="bg-blue-600 dark:bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-700 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/20 p-4 sm:p-6 hover:shadow-md dark:hover:shadow-gray-900/30 transition-shadow duration-200"
                >
                  {/* Desktop Layout */}
                  <div className="hidden sm:flex items-center space-x-4">
                    {/* Image */}
                    <div 
                      className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0 cursor-pointer"
                      onClick={() => navigate(`/product/${item.id}`)}
                    >
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <span className="text-2xl">📦</span>
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 cursor-pointer" onClick={() => navigate(`/product/${item.id}`)}>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{item.price} each</p>
                      {item.rating && (
                        <div className="text-yellow-400 text-sm">{'★'.repeat(Math.floor(item.rating))}</div>
                      )}
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center text-gray-900 dark:text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Price + Remove */}
                    <div className="text-right">
                      <p className="font-bold text-gray-900 dark:text-white">
                        ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 mt-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Mobile Layout */}
                  <div className="sm:hidden">
                    <div className="flex justify-between items-start mb-3" >
                      <div className="flex-1" onClick={() => navigate(`/product/${item.id}`)}>
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{item.name}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{item.price} each</p>
                        {item.rating && (
                          <div className="text-yellow-400 text-sm">{'★'.repeat(Math.floor(item.rating))}</div>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 ml-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="flex justify-between items-center">
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-medium text-gray-900 dark:text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      {/* Total Price */}
                      <div className="text-right">
                        <p className="font-bold text-lg text-gray-900 dark:text-white">
                          ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="text-center pt-4">
                <button
                  onClick={clearCart}
                  className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/20 p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Subtotal ({getTotalItems()} items)</span>
                  <span className="font-semibold text-gray-900 dark:text-white">${calculateTotal()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Shipping</span>
                  <span className="text-green-600 dark:text-green-400 font-semibold">Free</span>
                </div>
                <hr className="border-gray-200 dark:border-gray-600" />
                <div className="flex justify-between text-lg font-bold pt-2">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-gray-900 dark:text-white">${calculateTotal()}</span>
                </div>
              </div>

              <button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-600 dark:to-purple-600 text-white py-3 rounded-lg font-semibold hover:scale-[1.02] transition-all duration-200">
                Proceed to Checkout
              </button>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
                Secure checkout with SSL encryption
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}