import { useParams,useNavigate } from "react-router-dom"
import { useState } from "react"
import allProducts from "../data/products.js";
export default function OrderSummary() {
  const { id } = useParams()
  const productId = parseInt(id)
  const product = allProducts.find((item) => item.id === productId)
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("")

  const handleApplyCoupon = () => {
    console.log("Applying coupon:", couponCode)
  }

  if (!product) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
        <p className="text-red-500">Product not found.</p>
      </div>
    )
  }

return (
  <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-8">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h3>

    <div className="space-y-3 mb-4">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600 dark:text-gray-300">Subtotal (1 item)*</span>
        <span className="text-gray-900 dark:text-white">{product.price}</span>
      </div>
    </div>

    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Enter Coupon/Discount Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
        <button
          onClick={handleApplyCoupon}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          APPLY
        </button>
      </div>
    </div>

    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
      <div className="flex justify-between text-lg font-semibold">
        <span className="text-gray-900 dark:text-white">Order Total</span>
        <span className="text-gray-900 dark:text-white">{product.price}</span>
      </div>
    </div>

    {/* Payment Security Icons */}
    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
      <div className="flex flex-wrap items-center justify-center gap-2 opacity-60">
        <div className="text-xs bg-gray-100 dark:bg-gray-800 dark:text-white px-2 py-1 rounded">PCI DSS</div>
        <div className="text-xs bg-gray-100 dark:bg-gray-800 dark:text-white px-2 py-1 rounded">MasterCard</div>
        <div className="text-xs bg-gray-100 dark:bg-gray-800 dark:text-white px-2 py-1 rounded">RuPay</div>
        <div className="text-xs bg-gray-100 dark:bg-gray-800 dark:text-white px-2 py-1 rounded">VISA</div>
        <div className="text-xs bg-gray-100 dark:bg-gray-800 dark:text-white px-2 py-1 rounded">SafeKey</div>
        <div className="text-xs bg-gray-100 dark:bg-gray-800 dark:text-white px-2 py-1 rounded">UPI</div>
      </div>
      <div className="flex items-center justify-center mt-2 text-xs text-gray-500 dark:text-gray-400">
        <span>🚚 FASTER DELIVERY</span>
      </div>
    </div>
  </div>
)

}
