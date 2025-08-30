import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  Calendar,
  CreditCard,
} from "lucide-react";

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const order = orders.find((o) => o.id.toString() === id);

 if (!order) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center bg-white dark:bg-gray-800 rounded-xl shadow-md border dark:border-gray-700 p-8">
        <Package className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Order Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">The order you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate("/")}
          className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

const { productName, productImage, productPrice, customerInfo, orderDate } = order;

const statusSteps = [
  { name: "Ordered", icon: CheckCircle, completed: true, date: orderDate },
  {
    name: "Packed",
    icon: Package,
    completed: true,
    date: new Date(new Date(orderDate).getTime() + 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    name: "Shipped",
    icon: Truck,
    completed: true,
    date: new Date(new Date(orderDate).getTime() + 48 * 60 * 60 * 1000).toISOString(),
  },
  { name: "Delivered", icon: CheckCircle, completed: false, date: null },
];

return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
    {/* Header */}
    <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 sticky top-0 z-10">
      <div className="container max-w-auto px-6 py-3">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-sm px-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Order #{order.id}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Placed on {new Date(orderDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Body */}
    <div className="container max-w-auto px-6 py-3">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Status */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border dark:border-gray-700">
            <div className="p-4 border-b dark:border-gray-700">
              <h2 className="text-lg font-semibold flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                <Truck className="w-5 h-5" />
                <span>Order Status</span>
              </h2>
            </div>
            <div className="p-4 space-y-6">
              {statusSteps.map((step, index) => {
                const StepIcon = step.icon;
                const isLast = index === statusSteps.length - 1;
                return (
                  <div key={step.name} className="relative">
                    {!isLast && (
                      <div
                        className={`absolute left-6 top-12 w-0.5 h-12 ${
                          step.completed ? "bg-green-400 dark:bg-green-500" : "bg-gray-200 dark:bg-gray-600"
                        }`}
                      />
                    )}
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                          step.completed
                            ? "bg-green-100 dark:bg-green-900/30 border-green-400 dark:border-green-500"
                            : "bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                        }`}
                      >
                        <StepIcon
                          className={`w-5 h-5 ${
                            step.completed ? "text-green-600 dark:text-green-400" : "text-gray-400 dark:text-gray-500"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3
                            className={`font-semibold ${
                              step.completed ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"
                            }`}
                          >
                            {step.name}
                          </h3>
                          {step.completed && step.date && (
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(step.date).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        {step.completed && step.date && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {new Date(step.date).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        )}
                        {!step.completed &&
                          index === statusSteps.findIndex((s) => !s.completed) && (
                            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mt-1">
                              Expected soon
                            </p>
                          )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border dark:border-gray-700">
            <div className="p-4 border-b dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Product Details</h2>
            </div>
            <div className="p-4">
              <div className="flex items-center space-x-6">
                <img
                  src={productImage}
                  alt={productName}
                  className="w-24 h-24 rounded-xl object-cover border-2 border-gray-100 dark:border-gray-600"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{productName}</h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-x-4">
                    <span>
                      Price: <span className="font-semibold text-gray-900 dark:text-white">{productPrice}</span>
                    </span>
                    <span>
                      Quantity: <span className="font-semibold text-gray-900 dark:text-white">1</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Delivery Address */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border dark:border-gray-700">
            <div className="p-4 border-b dark:border-gray-700">
              <h2 className="text-lg font-semibold flex items-center space-x-2 text-red-500 dark:text-red-400">
                <MapPin className="w-5 h-5" />
                <span>Delivery Address</span>
              </h2>
            </div>
            <div className="p-4 space-y-3">
              <p className="font-semibold text-gray-900 dark:text-white">
                {customerInfo.firstName} {customerInfo.lastName}
              </p>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <p>{customerInfo.address}</p>
                <p>
                  {customerInfo.city}, {customerInfo.state}
                </p>
                <p>PIN: {customerInfo.pincode}</p>
              </div>
              <div className="flex items-center space-x-2 pt-2 border-t dark:border-gray-700">
                <Phone className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">+91 {customerInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">{customerInfo.email}</span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border dark:border-gray-700">
            <div className="p-4 border-b dark:border-gray-700">
              <h2 className="text-lg font-semibold flex items-center space-x-2 text-green-600 dark:text-green-400">
                <CreditCard className="w-5 h-5" />
                <span>Order Summary</span>
              </h2>
            </div>
            <div className="p-4 space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium">{productPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600 dark:text-green-400 font-medium">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span className="font-medium">₹0</span>
              </div>
              <div className="border-t dark:border-gray-700 pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-blue-600 dark:text-blue-400">{productPrice}</span>
              </div>
            </div>
          </div>

          {/* Order Info */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border dark:border-gray-700">
            <div className="p-4 border-b dark:border-gray-700">
              <h2 className="text-lg font-semibold flex items-center space-x-2 text-purple-600 dark:text-purple-400">
                <Calendar className="w-5 h-5" />
                <span>Order Information</span>
              </h2>
            </div>
            <div className="p-4 space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex justify-between">
                <span>Order Date</span>
                <span className="font-medium">
                  {new Date(orderDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Payment Method</span>
                <span className="font-medium">Cash on Delivery</span>
              </div>
              <div className="flex justify-between">
                <span>WhatsApp Updates</span>
                <span
                  className={`font-medium ${
                    customerInfo.whatsappUpdates ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {customerInfo.whatsappUpdates ? "Enabled" : "Disabled"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}
