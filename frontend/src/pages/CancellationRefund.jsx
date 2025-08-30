export default function CancellationRefund() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Cancellation & Refund Policy</h1>
          
          <div className="prose max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Order Cancellation</h2>
              
              <h3 className="text-lg font-medium text-gray-600 mb-2">Before Shipment</h3>
              <p className="text-gray-600 mb-4">
                You can cancel your order before it has been shipped. Once cancelled, we will process your refund within 3-5 business days to the original payment method.
              </p>
              
              <h3 className="text-lg font-medium text-gray-600 mb-2">After Shipment</h3>
              <p className="text-gray-600 mb-4">
                Orders cannot be cancelled once they have been shipped. However, you may return the items as per our return policy.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Return Policy</h2>
              <ul className="text-gray-600 space-y-2">
                <li>• Items must be returned within 7 days of delivery</li>
                <li>• Products should be in original condition with tags and packaging</li>
                <li>• Customized or personalized items are not eligible for return</li>
                <li>• Return shipping costs will be borne by the customer unless the item is damaged or defective</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Refund Process</h2>
              <p className="text-gray-600 mb-4">
                Once we receive and inspect the returned item, we will notify you about the approval or rejection of your refund. If approved:
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Refunds will be processed within 5-7 business days</li>
                <li>• The refund will be credited to your original payment method</li>
                <li>• Bank processing times may vary (2-10 business days)</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Damaged or Defective Items</h2>
              <p className="text-gray-600 mb-4">
                If you receive a damaged or defective item:
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Contact us within 24 hours of delivery</li>
                <li>• Provide photos of the damaged item and packaging</li>
                <li>• We will arrange for immediate replacement or full refund</li>
                <li>• No return shipping costs will be charged</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Contact for Returns</h2>
              <p className="text-gray-600">
                For any return or refund queries, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <p className="text-gray-700">Email: sushmanugiitgallery@gmail.com</p>
                <p className="text-gray-700">Phone: 7801074907</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}