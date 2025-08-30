"use client"

import { useState } from "react"
import { Shield } from "lucide-react"
import allProducts from "../data/products.js"
import CustomerInfo from "../components/CustomerInfo.jsx"
import DeliveryInfo from "../components/DeliveryInfo.jsx"
import ReviewSection from "../components/ReviewSection.jsx"
import PaymentModal from "../components/PaymentModal.jsx"
import OrderSummary from "../components/OrderSummary.jsx"

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState("customer")
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    whatsappUpdates: false,
  })

  const handleFormSubmit = (data) => {
    setFormData({ ...formData, ...data })
    if (currentStep === "customer") setCurrentStep("delivery")
    else if (currentStep === "delivery") setCurrentStep("review")
    else if (currentStep === "review") setShowPaymentModal(true)
  }

  const handleBack = () => {
    if (currentStep === "delivery") setCurrentStep("customer")
    else if (currentStep === "review") setCurrentStep("delivery")
  }

 return (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
    {/* Progress Steps */}
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4">
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Stepper Section */}
        <div className="flex items-center space-x-8">
          {/* Step 1 */}
          <div className={`flex items-center space-x-2 ${
            currentStep === "customer"
              ? "text-blue-600 dark:text-blue-400"
              : currentStep === "delivery" || currentStep === "review"
              ? "text-green-600 dark:text-green-400"
              : "text-gray-400"
          }`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
              currentStep === "customer"
                ? "bg-blue-600 dark:bg-blue-500 text-white"
                : currentStep === "delivery" || currentStep === "review"
                ? "bg-green-600 dark:bg-green-500 text-white"
                : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
            }`}>
              1
            </div>
            <span className="text-sm font-medium">Customer Info</span>
          </div>

          {/* Step 2 */}
          <div className={`flex items-center space-x-2 ${
            currentStep === "delivery"
              ? "text-blue-600 dark:text-blue-400"
              : currentStep === "review"
              ? "text-green-600 dark:text-green-400"
              : "text-gray-400"
          }`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
              currentStep === "delivery"
                ? "bg-blue-600 dark:bg-blue-500 text-white"
                : currentStep === "review"
                ? "bg-green-600 dark:bg-green-500 text-white"
                : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
            }`}>
              2
            </div>
            <span className="text-sm font-medium">Delivery Info</span>
          </div>

          {/* Step 3 */}
          <div className={`flex items-center space-x-2 ${
            currentStep === "review"
              ? "text-blue-600 dark:text-blue-400"
              : "text-gray-400"
          }`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
              currentStep === "review"
                ? "bg-blue-600 dark:bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
            }`}>
              3
            </div>
            <span className="text-sm font-medium">Review & Pay</span>
          </div>
        </div>

        {/* Secure Checkout */}
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
          <Shield className="w-4 h-4" />
          <span className="text-sm">Secure Checkout</span>
        </div>
      </div>
    </div>

    {/* Main Content */}
    <div className="container mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2">
          {currentStep === "customer" && (
            <CustomerInfo onSubmit={handleFormSubmit} initialData={formData} />
          )}
          {currentStep === "delivery" && (
            <DeliveryInfo onSubmit={handleFormSubmit} onBack={handleBack} initialData={formData} />
          )}
          {currentStep === "review" && (
            <ReviewSection onSubmit={handleFormSubmit} onBack={handleBack} formData={formData} />
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <OrderSummary />
        </div>
      </div>
    </div>

    {/* WhatsApp Float Button */}
    <div className="fixed bottom-6 right-6">
      <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-green-600 transition-colors">
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967..." />
        </svg>
      </div>
    </div>
  </div>
);

}
