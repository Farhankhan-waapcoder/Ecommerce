export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 transition-colors duration-300">
      <div className="container max-w-auto mx-auto px-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95 border border-gray-200 dark:border-gray-700">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
              Privacy Policy
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Last updated: January 2025
            </p>
          </div>
          
          <div className="prose max-w-none space-y-8">
            
            {/* Introduction */}
            <section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl border-l-4 border-blue-500">
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                At <span className="font-semibold text-blue-600 dark:text-blue-400">Sushman Gift Gallery</span>, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or make a purchase.
              </p>
            </section>
            
            {/* Information We Collect */}
            <section>
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-4 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">📊</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Information We Collect</h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-200 dark:border-green-700">
                  <h3 className="text-xl font-semibold text-green-700 dark:text-green-300 mb-4 flex items-center">
                    <span className="mr-2">👤</span> Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "Name and contact information (email, phone number)",
                      "Billing and shipping addresses", 
                      "Payment information (processed securely through payment gateways)",
                      "Order history and preferences"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start p-3 bg-white dark:bg-gray-800 rounded-lg">
                        <span className="text-green-500 mr-2 mt-1">•</span>
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700">
                  <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-4 flex items-center">
                    <span className="mr-2">🔍</span> Automatically Collected Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "IP address and browser information",
                      "Website usage data and navigation patterns",
                      "Device information and operating system", 
                      "Cookies and similar tracking technologies"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start p-3 bg-white dark:bg-gray-800 rounded-lg">
                        <span className="text-blue-500 mr-2 mt-1">•</span>
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
            
            {/* How We Use Your Information */}
            <section>
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-4 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🎯</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">How We Use Your Information</h2>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Process and fulfill your orders",
                    "Send order confirmations and shipping updates",
                    "Provide customer support and respond to inquiries",
                    "Improve our website and services",
                    "Send promotional emails (with your consent)",
                    "Prevent fraud and ensure website security",
                    "Comply with legal obligations"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start p-3 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow">
                      <span className="text-purple-500 mr-2 mt-1">•</span>
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            
            {/* Information Sharing */}
            <section>
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mr-4 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🤝</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Information Sharing</h2>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-6 rounded-xl border border-orange-200 dark:border-orange-700">
                <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
                  We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
                </p>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    "Trusted service providers who assist in operating our website and conducting business",
                    "Payment processors for secure transaction processing",
                    "Shipping companies for order delivery",
                    "When required by law or to protect our rights",
                    "With your explicit consent"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <span className="text-orange-500 mr-2 mt-1">•</span>
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            
            {/* Data Security */}
            <section>
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mr-4 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🔒</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Data Security</h2>
              </div>
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 p-6 rounded-xl border border-cyan-200 dark:border-cyan-700">
                <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
                  We implement appropriate security measures to protect your personal information:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "SSL encryption for data transmission",
                    "Secure servers and databases",
                    "Regular security audits and updates",
                    "Limited access to personal information",
                    "Secure payment processing through trusted gateways"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <span className="text-cyan-500 mr-2 mt-1">•</span>
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            
            {/* Cookies Policy */}
            <section>
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mr-4 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🍪</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Cookies Policy</h2>
              </div>
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-6 rounded-xl border border-yellow-200 dark:border-yellow-700">
                <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
                  We use cookies to enhance your browsing experience. Cookies help us:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {[
                    "Remember your preferences and shopping cart",
                    "Analyze website traffic and usage patterns",
                    "Provide personalized content and recommendations",
                    "Improve website functionality"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <span className="text-yellow-500 mr-2 mt-1">•</span>
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm bg-white dark:bg-gray-800 p-4 rounded-lg">
                  You can choose to disable cookies in your browser settings, but this may affect website functionality.
                </p>
              </div>
            </section>
            
            {/* Your Rights */}
            <section>
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-4 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">⚖️</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Your Rights</h2>
              </div>
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-indigo-200 dark:border-indigo-700">
                <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">You have the right to:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Access your personal information",
                    "Update or correct your information",
                    "Request deletion of your data",
                    "Opt-out of marketing communications",
                    "Withdraw consent for data processing"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <span className="text-indigo-500 mr-2 mt-1">•</span>
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            
            {/* Additional Sections in Compact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Data Retention */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-700">
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 bg-green-500 rounded-full mr-3 flex items-center justify-center">
                    <span className="text-white text-xs">📅</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Data Retention</h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  We retain your personal information only as long as necessary for the purposes outlined in this policy or as required by law. Order information is typically retained for accounting and legal compliance purposes.
                </p>
              </div>
              
              {/* Children's Privacy */}
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 p-6 rounded-xl border border-pink-200 dark:border-pink-700">
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 bg-pink-500 rounded-full mr-3 flex items-center justify-center">
                    <span className="text-white text-xs">👶</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Children's Privacy</h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
                </p>
              </div>
              
            </div>
            
            {/* Updates to Policy */}
            <section className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800/50 dark:to-slate-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 bg-gray-500 rounded-full mr-3 flex items-center justify-center">
                  <span className="text-white text-xs">🔄</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Updates to This Policy</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
              </p>
            </section>
            
            {/* Contact Us */}
            <section>
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mr-4 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">📞</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Contact Us</h2>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700">
                <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
                  If you have any questions about this Privacy Policy or how we handle your personal information, please contact us:
                </p>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-inner border border-gray-200 dark:border-gray-600">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="text-blue-500 mr-3">📧</span>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">sushmanugiitgallery@gmail.com</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-500 mr-3">📱</span>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">7801074907</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-purple-500 mr-3">📍</span>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">sushmanugiitgallery</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}