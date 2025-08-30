export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 transition-colors duration-300">
      <div className="container max-w-auto mx-auto px-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95 border border-gray-200 dark:border-gray-700">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent mb-4">
              Terms & Conditions
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-teal-600 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Please read these terms carefully before using our services
            </p>
          </div>
          
          <div className="prose max-w-none space-y-8">
            
            {/* General Terms */}
            <section>
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-4 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">📋</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">General Terms</h2>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700">
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </div>
            </section>
            
            {/* Use License */}
            <section>
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-4 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">📜</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Use License</h2>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-700">
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">
                  Permission is granted to temporarily download one copy of the materials on Sushman Gift Gallery's website for personal, non-commercial transitory viewing only.
                </p>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 border-purple-500">
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    ⚠️ This license shall automatically terminate if you violate any of these restrictions.
                  </p>
                </div>
              </div>
            </section>
            
            {/* Product Information */}
            <section>
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-4 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🎁</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Product Information</h2>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: "📝", text: "We strive to provide accurate product descriptions and images" },
                    { icon: "🎨", text: "Colors may vary slightly due to monitor settings" },
                    { icon: "📦", text: "Product availability is subject to stock" },
                    { icon: "💰", text: "Prices are subject to change without notice" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-all duration-200">
                      <span className="text-2xl mr-3 mt-1">{item.icon}</span>
                      <span className="text-gray-700 dark:text-gray-300">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            
            {/* Order Acceptance */}
            <section>
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mr-4 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">✅</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Order Acceptance</h2>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-6 rounded-xl border border-orange-200 dark:border-orange-700">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-orange-500 rounded-full mr-4 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xl">📋</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    Your order is an offer to buy a product. All orders are subject to acceptance by us, and we will confirm such acceptance by sending you an order acknowledgment email.
                  </p>
                </div>
              </div>
            </section>
            
            {/* Payment Terms */}
            <section>
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mr-4 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">💳</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Payment Terms</h2>
              </div>
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 p-6 rounded-xl border border-cyan-200 dark:border-cyan-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: "⏰", text: "All payments must be made at the time of ordering" },
                    { icon: "💳", text: "We accept major credit cards, debit cards, and digital wallets" },
                    { icon: "🇮🇳", text: "All prices are in Indian Rupees (INR)" },
                    { icon: "📊", text: "Applicable taxes will be added to your order" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-all duration-200">
                      <span className="text-2xl mr-3 mt-1">{item.icon}</span>
                      <span className="text-gray-700 dark:text-gray-300">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            
            {/* Shipping & Delivery */}
            <section>
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-green-500 rounded-full mr-4 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🚚</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Shipping & Delivery</h2>
              </div>
              <div className="bg-gradient-to-r from-teal-50 to-green-50 dark:from-teal-900/20 dark:to-green-900/20 p-6 rounded-xl border border-teal-200 dark:border-teal-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: "🇮🇳", text: "We ship across India" },
                    { icon: "⏱️", text: "Delivery times vary based on location" },
                    { icon: "💵", text: "Shipping charges are calculated separately" },
                    { icon: "📍", text: "Risk of loss passes to you upon delivery" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-all duration-200">
                      <span className="text-2xl mr-3 mt-1">{item.icon}</span>
                      <span className="text-gray-700 dark:text-gray-300">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            
            {/* Compact Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Limitation of Liability */}
              <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-red-200 dark:border-red-700">
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 bg-red-500 rounded-full mr-3 flex items-center justify-center">
                    <span className="text-white text-xs">⚠️</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Limitation of Liability</h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  In no event shall Sushman Gift Gallery or its suppliers be liable for any damages arising out of the use or inability to use the materials on this website.
                </p>
              </div>
              
              {/* Privacy */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-indigo-200 dark:border-indigo-700">
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 bg-indigo-500 rounded-full mr-3 flex items-center justify-center">
                    <span className="text-white text-xs">🔒</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Privacy</h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.
                </p>
              </div>
              
            </div>
            
            {/* Contact Information */}
            <section>
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full mr-4 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">📞</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Contact Information</h2>
              </div>
              <div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-violet-200 dark:border-violet-700">
                <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
                  If you have any questions about these Terms & Conditions, please contact us:
                </p>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-inner border border-gray-200 dark:border-gray-600">
                  <div className="space-y-4">
                    <div className="flex items-center p-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg">
                      <span className="text-blue-500 mr-4 text-xl">📧</span>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                        <p className="text-gray-700 dark:text-gray-300 font-medium">sushmanugiitgallery@gmail.com</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg">
                      <span className="text-green-500 mr-4 text-xl">📱</span>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                        <p className="text-gray-700 dark:text-gray-300 font-medium">7801074907</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Legal Notice */}
            <div className="mt-12 p-6 bg-gradient-to-r from-gray-100 to-slate-100 dark:from-gray-800 dark:to-slate-800 rounded-xl border border-gray-300 dark:border-gray-600">
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  <span className="font-semibold">Legal Notice:</span> These terms and conditions are subject to change without prior notice. 
                  Continued use of this website constitutes acceptance of any modifications.
                </p>
                <div className="mt-4 flex justify-center">
                  <div className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-xs font-medium">
                    Last Updated: January 2025
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
