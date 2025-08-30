import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Package, Trash2, AlertCircle } from "lucide-react";
import { ShoppingBag, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(data);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Packed":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };
  
  const getRandomStatus = () => {
    const statuses = ["Ordered", "Packed", "Shipped", "Delivered"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  const handleCancelOrder = (orderId) => {
    const updatedOrders = orders.filter(order => order.id !== orderId);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setShowDeleteConfirm(null);
    
    toast.success("cancelled");
  };

if (orders.length === 0) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Icon with gradient background */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50 shadow-lg">
            <Package className="w-12 h-12 text-blue-600 dark:text-blue-400" />
          </div>
          {/* Floating decoration */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-80 animate-pulse"></div>
          <div className="absolute -bottom-1 -left-3 w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full opacity-60 animate-pulse delay-700"></div>
        </div>

        {/* Content */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            No orders yet
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            When you place your first order, it will appear here. Start exploring our amazing collection of products!
          </p>
          
          {/* Features list */}
          <div className="grid grid-cols-1 gap-3 mb-8 text-sm">
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Free delivery on orders above ₹500</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Easy returns & exchanges</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>24/7 customer support</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-600 dark:hover:to-indigo-600 transition-all duration-200 inline-flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <ShoppingBag className="w-5 h-5" />
              Start Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/categories"
              className="bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-xl hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 inline-flex items-center justify-center gap-2 font-medium border border-gray-200/50 dark:border-gray-600/50 backdrop-blur-sm hover:shadow-lg"
            >
              Browse Categories
            </Link>
          </div>
        </div>

        {/* Popular categories suggestion */}
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Popular categories:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Electronics', 'Fashion', 'Home & Garden', 'Sports'].map((category) => (
              <Link
                key={category}
                to={`/category/${category.toLowerCase()}`}
                className="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 bg-white/60 dark:bg-gray-800/60 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

return (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
    {/* Header */}
    <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
      <div className="container max-w-auto px-6 py-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Your Orders</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">{orders.length} order{orders.length !== 1 ? 's' : ''} found</p>
      </div>
    </div>

    <div className="container max-w-auto px-6 py-3">
      <div className="space-y-4">
        {orders.map((order) => {
          const status = getRandomStatus();
          
          return (
            <div key={order.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 hover:shadow-md dark:hover:shadow-gray-900/20 transition-shadow overflow-hidden">
              <div className="p-4 sm:p-6">
                {/* Order Header - Mobile First */}
                <div className="mb-4">
                  {/* Mobile Layout */}
                  <div className="sm:hidden">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Order ID</p>
                        <p className="font-medium text-sm text-gray-900 dark:text-white">#{order.id}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                          {status}
                        </span>
                        {status === "Ordered" && (
                          <button
                            onClick={() => setShowDeleteConfirm(order.id)}
                            className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Cancel Order"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Order placed</p>
                        <p className="font-medium text-gray-900 dark:text-white">{new Date(order.orderDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Total</p>
                        <p className="font-medium text-gray-900 dark:text-white">₹{order.productPrice}</p>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden sm:flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Order placed</p>
                        <p className="font-medium text-gray-900 dark:text-white">{new Date(order.orderDate).toLocaleDateString()}</p>
                      </div>
                      <div className="border-l border-gray-200 dark:border-gray-600 pl-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                        <p className="font-medium text-gray-900 dark:text-white">₹{order.productPrice}</p>
                      </div>
                      <div className="border-l border-gray-200 dark:border-gray-600 pl-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Order ID</p>
                        <p className="font-medium text-gray-900 dark:text-white">#{order.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                        {status}
                      </span>
                      {status === "Ordered" && (
                        <button
                          onClick={() => setShowDeleteConfirm(order.id)}
                          className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Cancel Order"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <Link
                  to={`/order/${order.id}`}
                  className="flex items-start space-x-3 sm:space-x-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg p-3 sm:p-4 -m-3 sm:-m-4 transition-colors"
                >
                  <img 
                    src={order.productImage} 
                    alt={order.productName} 
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover border dark:border-gray-600 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm sm:text-base line-clamp-2">{order.productName}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1 sm:mb-2">
                      Delivered to: {order.customerInfo.firstName} {order.customerInfo.lastName}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 truncate">
                      {order.customerInfo.city}, {order.customerInfo.state}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">₹{order.productPrice}</p>
                    <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mt-1">View Details →</p>
                  </div>
                </Link>

                {/* Action Buttons */}
                <div className="mt-4 pt-4 border-t dark:border-gray-600">
                  {/* Mobile Layout */}
                  <div className="sm:hidden">
                    <div className="flex flex-col space-y-2">
                      <Link
                        to={`/order/${order.id}`}
                        className="w-full px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm font-medium text-center"
                      >
                        Track Order
                      </Link>
                      {status === "Delivered" && (
                        <Link
                          to={`/product/${order.id}`}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium text-center"
                        >
                          Buy Again
                        </Link>
                      )}
                    </div>
                    {status !== "Delivered" && status !== "Shipped" && (
                      <p className="text-xs text-gray-600 dark:text-gray-400 text-center mt-3">
                        Need help? <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">Contact Support</a>
                      </p>
                    )}
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden sm:flex items-center justify-between">
                    <div className="flex space-x-3">
                      <Link
                        to={`/order/${order.id}`}
                        className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm font-medium"
                      >
                        Track Order
                      </Link>
                      {status === "Delivered" && (
                        <Link
                          to={`/product/${order.id}`}
                          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
                        >
                          Buy Again
                        </Link>
                      )}
                    </div>
                    {status !== "Delivered" && status !== "Shipped" && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Need help? <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">Contact Support</a>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>

    {/* Delete Confirmation Modal */}
    {showDeleteConfirm && (
      <div className="fixed inset-0 bg-white/30 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6 border dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Cancel Order</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Order #{showDeleteConfirm}</p>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Are you sure you want to cancel this order? This action cannot be undone.
          </p>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowDeleteConfirm(null)}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              Keep Order
            </button>
            <button
              onClick={() => handleCancelOrder(showDeleteConfirm)}
              className="flex-1 px-4 py-2 bg-red-600 dark:bg-red-500 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-colors font-medium"
            >
              Cancel Order
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
}