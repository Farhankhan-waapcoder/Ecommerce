export default function ShippingDelivery() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Shipping & Delivery</h1>
          
          <div className="prose max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Shipping Coverage</h2>
              <p className="text-gray-600 mb-4">
                We currently ship to all states and union territories within India. International shipping is not available at this time.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Delivery Timeline</h2>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h3 className="font-semibold text-blue-800 mb-2">Standard Delivery</h3>
                <ul className="text-blue-700 space-y-1">
                  <li>• Metro Cities: 3-5 business days</li>
                  <li>• Other Cities: 5-7 business days</li>
                  <li>• Remote Areas: 7-10 business days</li>
                </ul>
              </div>
              
              <p className="text-gray-600 mb-4">
                Orders are typically dispatched within 1-2 business days after order confirmation. Delivery times may vary during peak seasons or due to unforeseen circumstances.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Shipping Charges</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order Value</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shipping Charge</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-600">Below ₹500</td>
                      <td className="px-6 py-4 text-sm text-gray-600">₹50</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-600">₹500 - ₹999</td>
                      <td className="px-6 py-4 text-sm text-gray-600">₹30</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-600">₹1000 and above</td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-semibold text-green-600">FREE</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Order Tracking</h2>
              <p className="text-gray-600 mb-4">
                Once your order is shipped, you will receive a tracking number via SMS and email. You can track your package using this number on our website or the courier partner's tracking page.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Delivery Process</h2>
              <ul className="text-gray-600 space-y-2">
                <li>• Our delivery partner will attempt delivery 2-3 times</li>
                <li>• Please ensure someone is available to receive the package</li>
                <li>• Valid ID proof may be required at the time of delivery</li>
                <li>• If delivery fails, the package will be returned to our warehouse</li>
                <li>• Additional charges may apply for re-delivery attempts</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Special Delivery Instructions</h2>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">Fragile Items</h3>
                <p className="text-yellow-700 text-sm">
                  Special care is taken for fragile items. They are packed with extra cushioning and marked appropriately.
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg mt-4">
                <h3 className="font-semibold text-green-800 mb-2">Gift Wrapping</h3>
                <p className="text-green-700 text-sm">
                  Gift wrapping service is available for an additional charge. Please select this option during checkout.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Delivery Issues</h2>
              <p className="text-gray-600 mb-4">
                If you face any issues with delivery, please contact us immediately:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">Email: sushmanugiitgallery@gmail.com</p>
                <p className="text-gray-700">Phone: 7801074907</p>
                <p className="text-gray-700 text-sm mt-2">Customer support hours: 10 AM - 7 PM (Mon-Sat)</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}