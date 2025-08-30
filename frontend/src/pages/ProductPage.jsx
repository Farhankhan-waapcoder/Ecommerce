import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import SimilarProducts from '../components/SimilarProducts.jsx';
import { Star, Heart, ShoppingCart, Minus, Plus, Truck, Shield, RotateCcw, ArrowLeft, Loader2, Upload, X, Share2, Facebook, Instagram, Twitter, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { productAPI } from '../services/Api.js';
import ProductLoader from '../components/skeleton/ProductLoader.jsx';
import { Link } from 'react-router-dom';
import { adminApi } from '../services/Api.js';
const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  
  // New customization states
  const [selectedSize, setSelectedSize] = useState('190 ml');
  const [selectedColor, setSelectedColor] = useState('white');
  const [selectedStyle, setSelectedStyle] = useState('2-sided');
  const [selectedDelivery, setSelectedDelivery] = useState('Standard');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [activeTab, setActiveTab] = useState('browse');
  const fileInputRef = useRef(null);
  
  // API states
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Initialize user state
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser.email);
        setIsLoggedIn(true);
        
        const savedCart = JSON.parse(localStorage.getItem(`cart_${parsedUser.email}`)) || [];
        setCartItems(savedCart);
      } catch (err) {
        console.error("Failed to parse user data", err);
        setCurrentUser(null);
        setCartItems([]);
      }
    } else {
      const guestCart = JSON.parse(localStorage.getItem("cart_guest")) || [];
      setCartItems(guestCart);
    }
  }, []);

  function formatCurrency(amount) {
    // Use the user's browser locale by default
    const locale = navigator.language || 'en-US';

    // Mapping locales to common currencies — you can expand this if needed
    const localeCurrencyMap = {
      'en-IN': 'INR',   // India
      'hi-IN': 'INR',   // Hindi India
      'en-US': 'USD',   // USA
      'en-GB': 'GBP',   // UK
      'fr-FR': 'EUR',   // France
      'de-DE': 'EUR',   // Germany
      // add more mappings as per your needs
    };

    // Find a currency based on locale prefix
    let currency = 'USD'; // Default fallback currency
    for (const [key, value] of Object.entries(localeCurrencyMap)) {
      if(locale.startsWith(key)) {
        currency = value;
        break;
      }
    }

    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
  }

  // Fetch product data from API
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError("Product ID not found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const response = await adminApi.get(`/productdetails/?productId=${id}`);
        if (response.data.success) {
          const apiProduct = response.data.data;
          
          // Transform API data to match component structure
          const transformedProduct = {
            id: apiProduct.productID,
            name: apiProduct.productName,
            brand: apiProduct.brandName || "Premium Brand",
            price: formatCurrency(apiProduct.price),
            originalPrice: formatCurrency(apiProduct.price * 1.2), // 20% markup for original price
            discount: "20% off", // Static discount
            rating: 4.5, // Static rating
            reviews: 123, // Static review count
            stock: apiProduct.stock ?? true, // Default to true if stock is not provided
            category: apiProduct.categoryName,
            description: apiProduct.description || "No description available",
            images: apiProduct.images.map(image => 
              `https://adminecommerce.waapcoders.in${image}`
            ),
            features: [
              "Premium Quality",
              "Custom Design",
              "Durable Material",
              "Perfect Gift Option",
              "Satisfaction Guaranteed"
            ],
            categoryID: apiProduct.categoryID,
            brandID: apiProduct.brandID
          };
          
          setProduct(transformedProduct);
        } else {
          throw new Error('Failed to fetch product');
        }
      } catch (err) {
        setError("Failed to load product details");
        toast.error("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Customization options
  const sizeOptions = [
    { value: '190 ml', label: '190 ml' },
    { value: '325 ml', label: '325 ml' },
    { value: '450 ml', label: '450 ml' }
  ];

  const colorOptions = [
    { value: 'white', label: 'White', color: '#ffffff', border: '#e5e5e5' },
    { value: 'black', label: 'Black', color: '#000000' },
    { value: 'green', label: 'Green', color: '#22c55e' },
    { value: 'blue', label: 'Blue', color: '#3b82f6' },
    { value: 'red', label: 'Red', color: '#ef4444' },
    { value: 'pink', label: 'Pink', color: '#ec4899' },
    { value: 'orange', label: 'Orange', color: '#f97316' },
    { value: 'yellow', label: 'Yellow', color: '#eab308' },
    { value: 'navy', label: 'Navy', color: '#1e40af' }
  ];

  const styleOptions = [
    { value: '2-sided', label: '2-sided' },
    { value: 'wraparound', label: 'Wraparound' }
  ];

  const deliveryOptions = [
    { value: 'Standard', label: 'Standard' },
    { value: 'Same Day Delivery (Mumbai)', label: 'Same Day Delivery (Mumbai)' }
  ];

  const quantityPricing = [
    { qty: 1, price: 300, originalPrice: 300, savings: 0 },
    { qty: 2, price: 540, originalPrice: 600, savings: 10 },
    { qty: 3, price: 750, originalPrice: 900, savings: 16 },
    { qty: 4, price: 1000, originalPrice: 1200, savings: 16 },
    { qty: 5, price: 1250, originalPrice: 1500, savings: 16, recommended: true }
  ];

  const handleQuantityChange = (change) => {
    setQuantity(Math.max(1, Math.min(product?.stock || 1, quantity + change)));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeUploadedImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const handleAddToCart = () => {
    toast.success(`${quantity} ${quantity > 1 ? 'items' : 'item'} added to cart`);
  };
  
  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  const handleBackToProducts = () => {
    navigate(-1);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  const getZoomPopupPosition = () => {
    const popupSize = 256;
    const margin = 16;
    
    let position = {
      top: margin,
      left: margin,
      right: 'auto',
      bottom: 'auto'
    };

    if (zoomPosition.x < 50) {
      position.right = margin;
      position.left = 'auto';
    }
    
    if (zoomPosition.y < 30) {
      position.bottom = margin;
      position.top = 'auto';
    }

    return position;
  };

  const getCurrentPricing = () => {
    return quantityPricing.find(p => p.qty === quantity) || quantityPricing[0];
  };

  // Loading state
  if (loading) {
    return <ProductLoader/>;
  }

  // Error state
  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 dark:text-red-400 text-2xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            Product Not Found
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            {error || "The product you're looking for doesn't exist or has been removed."}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleBackToProducts}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentPricing = getCurrentPricing();

  const generateShareLinks = (product) => {
    const currentUrl = window.location.href;
    const text = `Check out ${product.name} - ${product.description}`;
    
    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(text)}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + currentUrl)}`,
      instagram: `https://www.instagram.com/share?url=${encodeURIComponent(currentUrl)}`
    };
  };

  const ShareButtons = () => {
    const shareLinks = generateShareLinks(product);

    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Share2 className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          <span className="font-medium text-slate-800 dark:text-slate-200">Share this product</span>
        </div>
        
        <div className="flex gap-3">
          <a
            href={shareLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
          >
            <Send className="w-5 h-5 text-white" />
          </a>
          
          <a
            href={shareLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <Facebook className="w-5 h-5 text-white" />
          </a>
          
          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-black hover:bg-gray-800 transition-colors"
          >
            <Twitter className="w-5 h-5 text-white" />
          </a>
          
          <a
            href={shareLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-500 hover:opacity-90 transition-opacity"
          >
            <Instagram className="w-5 h-5 text-white" />
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-6 py-4">
        {/* Back Button */}
            {/* Breadcrumb */}
      <nav className="text-sm mb-4 text-slate-500 dark:text-slate-400 space-x-1">
        <Link to="/" className="hover:underline text-blue-600 dark:text-blue-400">
          Home
        </Link>
        <span>&gt;</span>
        <Link
          to={`/categories/${product.categoryID}`}
          className="hover:underline text-blue-600 dark:text-blue-400 capitalize"
        >
          {product.category}
        </Link>
        <span>&gt;</span>
        <span className="text-slate-700 dark:text-slate-200">
          {product.name}
        </span>
      </nav>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-120px)]">
          {/* Left Side - Static Product Images */}
          <div className="relative">
            <div className="sticky top-0">
              <div className="flex gap-4">
                {/* Thumbnail Images Sidebar */}
                <div className="flex flex-col gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative overflow-hidden rounded-xl transition-all duration-200 border-2 ${
                        selectedImageIndex === index 
                          ? 'border-blue-500 dark:border-blue-400 shadow-lg scale-105' 
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:scale-105 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-16 h-16 lg:w-20 lg:h-20 object-cover"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop';
                        }}
                      />
                    </button>
                  ))}
                </div>

                {/* Main Image Container */}
                <div className="flex-1">
                  <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-lg group">
                    <div 
                      className="relative w-full h-96 lg:h-[500px] overflow-hidden cursor-crosshair"
                      onMouseMove={handleMouseMove}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <img
                        src={product.images[selectedImageIndex]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop';
                        }}
                      />
                      
                      {/* Zoom Indicator Overlay */}
                      {isZoomed && (
                        <div 
                          className="absolute border-2 border-white dark:border-slate-300 shadow-lg pointer-events-none"
                          style={{
                            width: '100px',
                            height: '100px',
                            left: `${zoomPosition.x}%`,
                            top: `${zoomPosition.y}%`,
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: 'rgba(255, 255, 255, 0.3)',
                          }}
                        />
                      )}
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={handleToggleWishlist}
                      className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-sm transition-all duration-200 z-20 ${
                        isWishlisted 
                          ? 'bg-red-100 dark:bg-red-900/50 text-red-500 dark:text-red-400 scale-110' 
                          : 'bg-white/80 dark:bg-slate-800/80 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-slate-800 hover:scale-110'
                      }`}
                    >
                      <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>

                    {/* Smart Positioned Zoom Popup */}
                    {isZoomed && (
                      <div 
                        className="absolute w-64 h-64 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border-4 border-white dark:border-slate-700 overflow-hidden z-30 pointer-events-none"
                        style={getZoomPopupPosition()}
                      >
                        <div
                          className="w-full h-full bg-no-repeat"
                          style={{
                            backgroundImage: `url(${uploadedImage || product.images[selectedImageIndex]})`,
                            backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                            backgroundSize: '300%',
                          }}
                        />
                        <div className="absolute bottom-2 left-2 bg-black/70 dark:bg-slate-900/80 text-white text-xs px-2 py-1 rounded">
                          Zoom: 3x
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Scrollable Content */}
          <div className="overflow-y-auto pr-4 space-y-6 hide-scrollbar">
            {/* Product Info */}
            <div>
              <span className="inline-block text-sm bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full px-3 py-1 mb-3 font-medium">
                {product.category}
              </span>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-3 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-semibold text-slate-700 dark:text-slate-300">by {product.brand}</span>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">{renderStars(product.rating)}</div>
                <span className="text-sm text-slate-600 dark:text-slate-400">{product.rating.toFixed(1)}</span>
                <span className="text-sm text-slate-500 dark:text-slate-500">({product.reviews} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl font-bold text-slate-800 dark:text-slate-200">{product.price}</span>
                <span className="text-xl text-slate-400 dark:text-slate-500 line-through">{product.originalPrice}</span>
                <span className="bg-red-500 dark:bg-red-600 text-white px-2 py-1 rounded-full text-sm font-semibold">
                  {product.discount}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Free delivery on orders above $50</p>
            </div>

            {/* Share Buttons */}
            <ShareButtons />

            {/* Stock */}
            <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <div className="w-3 h-3 rounded-full bg-green-500 dark:bg-green-400 animate-pulse" />
              <span className="font-medium text-green-700 dark:text-green-300">
                In Stock ({product.stock} available)
              </span>
            </div>

            {/* Size Selection */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Size</h3>
              <div className="grid grid-cols-2 gap-3">
                {sizeOptions.map((size) => (
                  <button
                    key={size.value}
                    onClick={() => setSelectedSize(size.value)}
                    className={`p-3 rounded-lg border-2 text-center font-medium transition-all ${
                      selectedSize === size.value
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Inside Color Selection */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Inside Color</h3>
              <div className="flex flex-wrap gap-3">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`w-10 h-10 rounded-full border-4 transition-all ${
                      selectedColor === color.value
                        ? 'border-blue-500 scale-110 shadow-lg'
                        : 'border-gray-300 dark:border-gray-500 hover:scale-105'
                    }`}
                    style={{ 
                      backgroundColor: color.color,
                      borderColor: color.border || color.color
                    }}
                    title={color.label}
                  />
                ))}
              </div>
            </div>

            {/* Style Selection */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Style</h3>
              <div className="grid grid-cols-2 gap-3">
                {styleOptions.map((style) => (
                  <button
                    key={style.value}
                    onClick={() => setSelectedStyle(style.value)}
                    className={`p-3 rounded-lg border-2 text-center font-medium transition-all ${
                      selectedStyle === style.value
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Delivery Speed */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Delivery Speed</h3>
              <div className="space-y-2">
                {deliveryOptions.map((delivery) => (
                  <button
                    key={delivery.value}
                    onClick={() => setSelectedDelivery(delivery.value)}
                    className={`w-full p-3 rounded-lg border-2 text-left font-medium transition-all ${
                      selectedDelivery === delivery.value
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {delivery.label}
                  </button>
                ))}
              </div>
            </div>
            {/* Quantity Selection with Pricing */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Quantity</h3>
              <div className="space-y-3">
                {quantityPricing.map((pricing) => (
                  <button
                    key={pricing.qty}
                    onClick={() => setQuantity(pricing.qty)}
                    className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                      quantity === pricing.qty
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-slate-800 dark:text-slate-200">{pricing.qty}</span>
                      {pricing.recommended && (
                        <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full text-xs font-medium">
                          Recommended
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-800 dark:text-slate-200">₹{pricing.price}.00</div>
                      {pricing.savings > 0 && (
                        <div className="text-xs text-gray-500">
                          <span className="line-through">₹{pricing.originalPrice}.00</span>
                          <span className="text-green-600 dark:text-green-400 ml-1">{pricing.savings}% savings</span>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Current Selection Summary */}
              <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
                <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                  {quantity} starting at ₹{currentPricing.price}.00
                </div>
                <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                  Free shipping by 6 August to 110001
                </div>
              </div>
            </div>

            {/* Design Upload Section */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
              <div className="flex gap-4 mb-4">
                <button
                  onClick={() => setActiveTab('browse')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === 'browse'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Browse designs
                </button>
                <button
                  onClick={() => setActiveTab('upload')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === 'upload'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Upload design
                </button>
              </div>

              {activeTab === 'browse' && (
                <div className="text-center py-8">
                  <div className="text-slate-500 dark:text-slate-400 mb-2">Choose one of our templates</div>
                  <button className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                    Browse Templates
                  </button>
                </div>
              )}

              {activeTab === 'upload' && (
                <div>
                  {!uploadedImage ? (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
                    >
                      <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                      <div className="text-slate-700 dark:text-slate-300 font-medium mb-2">
                        Have a design? Upload and edit it
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        Click to upload or drag and drop your image
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        src={uploadedImage}
                        alt="Uploaded design"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        onClick={removeUploadedImage}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="mt-3 text-center">
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Change Image
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 sticky bottom-0 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg">
              <button className="flex items-center justify-center gap-3 flex-1 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-800 dark:hover:to-indigo-800 transition-all duration-200 hover:scale-[1.02]">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="h-14 px-8 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-200">
                Buy Now
              </button>
            </div>

            {/* Product Features */}
            <div className="bg-white dark:bg-slate-800 shadow-sm rounded-xl p-6">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Product Features</h3>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-slate-600 dark:text-slate-400">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Shipping Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                <Truck className="w-6 h-6 text-green-600 dark:text-green-400" />
                <div>
                  <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">Free Shipping</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">On orders over ₹50</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">100% Satisfaction</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Guaranteed</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                <RotateCcw className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <div>
                  <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">Easy Returns</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">30-day policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
         {/* <SimilarProducts name={product.category}/> */}
      </div>
    </div>
  );
};

export default ProductDetails;