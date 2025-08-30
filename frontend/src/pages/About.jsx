export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 transition-colors duration-300">
      <div className="container max-w-auto mx-auto px-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95 border border-gray-200 dark:border-gray-700">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-4">
              About Sushman Gift Gallery
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="prose max-w-none">
            {/* Welcome Section */}
            <div className="mb-12 text-center">
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
                Welcome to <span className="font-semibold text-purple-600 dark:text-purple-400">Sushman Gift Gallery</span>, 
                your premier destination for unique and thoughtful gifts that create lasting memories.
              </p>
            </div>
            
            {/* Story Section */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mr-4 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">📖</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Our Story</h2>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-xl border-l-4 border-blue-500">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  Founded with a passion for bringing joy through carefully curated gifts, Sushman Gift Gallery has been serving customers with exceptional products and services. We believe that every gift tells a story and creates lasting memories that connect hearts across distances.
                </p>
              </div>
            </div>
            
            {/* Mission Section */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-4 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🎯</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Our Mission</h2>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border-l-4 border-green-500">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  To provide high-quality, unique gifts that help our customers express their feelings and create memorable moments for their loved ones. We strive to offer exceptional customer service and ensure every purchase is a delightful experience.
                </p>
              </div>
            </div>
            
            {/* Products Section */}
            <div className="mb-12">
              <div className="flex items-center mb-8">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mr-4 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🎁</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">What We Offer</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: "🎉", text: "Return Gifts for all occasions" },
                  { icon: "🪔", text: "Diwali and Festival Special Items" },
                  { icon: "🖼️", text: "Picture Frames and Wall Decor" },
                  { icon: "📦", text: "Combo Gifts and Packages" },
                  { icon: "🛏️", text: "Cushions and Home Accessories" },
                  { icon: "📸", text: "Cutout Standees and Custom Items" },
                  { icon: "💳", text: "Digital Wallets and Gift Cards" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 group">
                    <span className="text-2xl mr-3 group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Why Choose Us Section */}
            <div className="mb-8">
              <div className="flex items-center mb-8">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-4 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">⭐</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Why Choose Us</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border border-blue-200 dark:border-blue-700">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                    <span className="text-white text-2xl">🔒</span>
                  </div>
                  <h3 className="font-bold text-xl text-gray-800 dark:text-gray-100 mb-3">Secure Payments</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Safe and secure payment options with encrypted transactions for your complete peace of mind</p>
                </div>
                
                <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border border-green-200 dark:border-green-700">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                    <span className="text-white text-2xl">🚚</span>
                  </div>
                  <h3 className="font-bold text-xl text-gray-800 dark:text-gray-100 mb-3">Shipping in India</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Fast and reliable delivery across India with real-time tracking and careful packaging</p>
                </div>
                
                <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border border-purple-200 dark:border-purple-700">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                    <span className="text-white text-2xl">💎</span>
                  </div>
                  <h3 className="font-bold text-xl text-gray-800 dark:text-gray-100 mb-3">Great Value & Quality</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Premium quality products at competitive prices with satisfaction guaranteed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}