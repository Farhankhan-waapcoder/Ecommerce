"use client"

import { X, ArrowLeft, CreditCard, Smartphone, Building, Wallet } from "lucide-react"

export default function PaymentModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
  <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-pop">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <button onClick={onClose} className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Store Info */}
        <div className="flex items-center space-x-3 p-4 border-b border-gray-200">
          <div className="w-12 h-12 bg-amber-800 rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 bg-amber-400 rounded"></div>
          </div>
          <span className="font-semibold text-gray-900">SUSHMANU GIFT GALLERY</span>
        </div>

        {/* Payment Method Title */}
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment method</h2>

          {/* Scan & Pay */}
          <div className="mb-6">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 border-2 border-gray-300 rounded flex items-center justify-center">
                  <div className="w-3 h-3 border border-gray-400"></div>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">Scan & Pay</span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">2x FASTER</span>
                  </div>
                  <p className="text-sm text-gray-600">Scan and pay with any UPI app</p>
                </div>
              </div>
              <div className="text-gray-400">›</div>
            </div>
          </div>

          {/* Payment Options */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900">Payment options</h3>

            {/* UPI */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-6 h-6 text-gray-600" />
                <div>
                  <div className="font-medium">UPI</div>
                  <p className="text-sm text-gray-600">PhonePe, Gpay, Amazon Pay, BHIM & more</p>
                </div>
              </div>
              <div className="text-gray-400">›</div>
            </div>

            {/* Credit/Debit Cards */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center space-x-3">
                <CreditCard className="w-6 h-6 text-gray-600" />
                <div>
                  <div className="font-medium">Credit / Debit Cards</div>
                  <p className="text-sm text-gray-600">RuPay, VISA, Master Card & more</p>
                </div>
              </div>
              <div className="text-gray-400">›</div>
            </div>

            {/* Net Banking */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center space-x-3">
                <Building className="w-6 h-6 text-gray-600" />
                <div>
                  <div className="font-medium">Net Banking</div>
                  <p className="text-sm text-gray-600">Select from a list of banks</p>
                </div>
              </div>
              <div className="text-gray-400">›</div>
            </div>

            {/* Wallets */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center space-x-3">
                <Wallet className="w-6 h-6 text-gray-600" />
                <div>
                  <div className="font-medium">Wallets</div>
                </div>
              </div>
              <div className="text-gray-400">›</div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Summary</span>
            <span className="text-xl font-semibold">₹1,100.00</span>
          </div>
        </div>

        {/* Powered by */}
        <div className="text-center py-3 text-xs text-gray-500 border-t border-gray-200">
          ⚡ Powered by <span className="font-medium">instamojo</span>
        </div>
      </div>
    </div>
  )
}
