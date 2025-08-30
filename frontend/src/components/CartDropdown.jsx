import { useState, useEffect } from "react";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const CartDropdown = ({ isOpen, onClose }) => {
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
  }, [isOpen]);

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

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price);
      return total + (price * item.quantity);
    }, 0).toFixed(2);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    onClose();
  };

  const handleCheckout = () => {
    navigate('/checkout');
    onClose();
  };

  if (!isOpen) return null;

 return (
  <>
    {/* Backdrop */}
    <div className="fixed inset-0 z-40" onClick={onClose}></div>

    {/* Cart Dropdown */}
    <div className="absolute top-full right-0 mt-2 w-96 max-w-[90vw] bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 z-50 max-h-[80vh] overflow-hidden text-gray-800 dark:text-gray-100">
      {loading ? (
        <div className="p-6 text-center">
          <div className="animate-spin h-8 w-8 border-b-2 border-[#007580] rounded-full mx-auto mb-2" />
          <p className="text-gray-600 dark:text-gray-300">Loading cart...</p>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-[#007580] to-[#005a63] text-white rounded-t-xl">
            <h3 className="font-semibold text-lg">Shopping Cart</h3>
            <p className="text-sm opacity-90">
              {cartItems.length === 0
                ? "Your cart is empty"
                : `${getTotalItems()} item${getTotalItems() === 1 ? "" : "s"}`}
            </p>
          </div>

          {cartItems.length === 0 ? (
            <div className="p-6 text-center">
              <ShoppingBag size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-3" />
              <p className="text-gray-600 dark:text-gray-300 mb-4">Your cart is empty</p>
              <button
                onClick={onClose}
                className="bg-[#007580] text-white px-4 py-2 rounded-lg hover:bg-[#005a63] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="max-h-[60vh] overflow-y-auto">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      {/* Product Image */}
                      <div
                        className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0 cursor-pointer"
                        onClick={() => handleProductClick(item.id)}
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <span className="text-lg">📦</span>
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h4
                          className="font-medium text-sm truncate cursor-pointer hover:text-[#007580]"
                          onClick={() => handleProductClick(item.id)}
                        >
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{item.price} each</p>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-6 text-center text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-sm">
                              $
                              {(
                                parseFloat(item.price) * item.quantity
                              ).toFixed(2)}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-b-xl sticky bottom-0">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-lg text-[#007580]">${calculateTotal()}</span>
                </div>

                <button
                  // onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-[#007580] to-[#005a63] text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                >
                  Checkout
                </button>

                <button
                  onClick={() => {
                    navigate("/my-cart");
                    onClose();
                  }}
                  className="w-full mt-2 text-[#007580] hover:text-[#005a63] text-sm font-medium"
                >
                  View Full Cart
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  </>
);
}
export default CartDropdown;