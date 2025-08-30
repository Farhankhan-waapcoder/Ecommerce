import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Star } from 'lucide-react';

export default function Footer() {
  return (
  <footer className="bg-white dark:bg-gray-900 transition-colors duration-300 pt-7" >
    {/* Newsletter Section */}
    <div className="bg-gradient-to-br from-purple-500 to-pink-100 dark:from-purple-600 dark:to-purple-800 text-black dark:text-white py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-0 sm:px-1 lg:px-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold mb-2">Sign up to our news & offers</h3>
            <p className="text-purple-100 dark:text-purple-200">
              Be the first to know about exclusive offers, new services, couriers, tools and more!
            </p>
          </div>
          <div className="flex w-full md:w-auto max-w-md">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-300" />
              <input
                type="email"
                placeholder="email@address.com"
                className="w-full pl-12 pr-4 py-3 rounded-l-lg border-0 focus:outline-none focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
              />
            </div>
            <button className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white px-6 py-3 rounded-r-lg font-semibold transition-colors duration-200">
              ✓ Sign up
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Main Footer Content */}
    <div className="py-12">
      <div className="container mx-auto px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Trust Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-300">sushmanugiitgallery</h2>
              
              {/* Trustpilot-style rating */}
              <div className="bg-green-500 dark:bg-green-600 text-white p-3 rounded-lg mb-4 transition-colors duration-300">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold">Trustpilot</span>
                </div>
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm">Trustscore 4.9 | 9,200 reviews</p>
              </div>
            </div>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 transition-colors duration-300">Company</h3>
            <div className="space-y-2">
              <Link to="/about" className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                About us
              </Link>
              <Link to="/reviews" className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                Reviews
              </Link>
              <Link to="/privacy" className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                Privacy policy
              </Link>
              <Link to="/cookies" className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                Cookie policy
              </Link>
              <Link to="/terms-conditions" className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                Terms & conditions
              </Link>
              <Link to="/acceptable-use" className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                Acceptable use policy
              </Link>
              <Link to="/sitemap" className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                Sitemap
              </Link>
            </div>
          </div>

          {/* Shipping Services Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 transition-colors duration-300">Shipping services</h3>
            <div className="space-y-2">
              <Link to="/ship-package" className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                Ship a package
              </Link>
              <Link to="/track-package" className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                Track a package
              </Link>
              <Link to="/shipping-delivery" className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                Domestic shipping
              </Link>
              <Link to="/international-shipping" className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                International shipping
              </Link>
              <Link to="/bulk-shipping" className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                Bulk shipping
              </Link>
              <Link to="/couriers" className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                Couriers
              </Link>
              <Link to="/delivery-services" className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                Delivery services
              </Link>
            </div>
          </div>

          {/* Customers Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 transition-colors duration-300">Customers</h3>
            <div className="space-y-2">
              <Link to="/login" className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                Log in
              </Link>
              <Link to="/register" className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                Register
              </Link>
              <Link to="/contact" className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                Contact us
              </Link>
              <Link to="/support" className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                Support hub
              </Link>
              <Link to="/preferences" className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                Preferences
              </Link>
            </div>
            
            {/* Contact Information */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">sushmanugiitgallery@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">7801074907</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">sushmanugiitgallery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center mb-3 transition-colors duration-300">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 21l3-3 3 3" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800 dark:text-white text-sm transition-colors duration-300">SHIPPING TO</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-300">OVER 200 COUNTRIES</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center mb-3 transition-colors duration-300">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800 dark:text-white text-sm transition-colors duration-300">100% SECURE</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-300">CHECKOUT</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center mb-3 transition-colors duration-300">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800 dark:text-white text-sm transition-colors duration-300">OUTSTANDING</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-300">WORLDWIDE SUPPORT</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center mb-3 transition-colors duration-300">
                <Star className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="font-semibold text-gray-800 dark:text-white text-sm transition-colors duration-300">OVER 9,000</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-300">GENUINE REVIEWS</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
               <img
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzAwNTJGRiIvPgo8cGF0aCBkPSJNNyA5SDE3VjE1SDdWOVoiIGZpbGw9IndoaXRlIi8+CjxyZWN0IHg9IjciIHk9IjkiIHdpZHRoPSIxMCIgaGVpZ2h0PSI2IiBmaWxsPSIjRkY1NTU1Ii8+CjwvcmVnPgo8L3N2Zz4K"
                alt="US Flag"
                className="w-6 h-6"
              />
                <span className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-300">United States</span>
              </div>
              <span className="text-gray-400 dark:text-gray-500 text-sm transition-colors duration-300">Copyright © 2009-2024 | All Rights Reserved</span>
            </div>
            
            {/* Payment Methods */}
            <div className="flex items-center gap-2">
              <div className="bg-white dark:bg-gray-800  rounded px-2 py-1 transition-colors duration-300">
                <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">VISA</span>
              </div>
              <div className="bg-white dark:bg-gray-800  rounded px-2 py-1 transition-colors duration-300">
                <div className="flex">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full -ml-1"></div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800  rounded px-2 py-1 transition-colors duration-300">
                <span className="text-blue-600 dark:text-blue-400 font-bold text-xs">PayPal</span>
              </div>
              <div className="bg-white dark:bg-gray-800  rounded px-2 py-1 transition-colors duration-300">
                <div className="flex">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full -ml-1"></div>
                </div>
              </div>
              <div className="bg-black dark:bg-gray-700 text-white rounded px-2 py-1 transition-colors duration-300">
                <span className="text-xs font-semibold">Apple Pay</span>
              </div>
              <div className="bg-black dark:bg-gray-700 text-white rounded px-2 py-1 transition-colors duration-300">
                <span className="text-xs font-semibold">G Pay</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
}