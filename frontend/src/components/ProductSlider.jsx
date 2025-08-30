import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from 'lucide-react';

export default function ProductSlider({ products, title, onAddToCart }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const navigate = useNavigate();

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [products.length, isAutoPlay]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    setIsAutoPlay(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
    setIsAutoPlay(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  // 🟡 Swipe handling
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;

    if (distance > 50) {
      // Swipe left
      goToNext();
    } else if (distance < -50) {
      // Swipe right
      goToPrevious();
    }

    // Reset refs
    touchStartX.current = null;
    touchEndX.current = null;
  };

 return (
  <div className="relative mb-12">
    {/* Slider container with touch listeners */}
    <div
      className="relative overflow-hidden rounded-2xl group"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Left Arrow - Inside slider */}
      <button 
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/20 hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      {/* Right Arrow - Inside slider */}
      <button 
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/20 hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-full flex-shrink-0 cursor-pointer"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <div className="relative bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 dark:from-purple-700 dark:via-pink-700 dark:to-red-700 p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="text-white">
                  <h3 className="text-2xl md:text-4xl font-bold mb-4">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-500'}`}
                        />
                      ))}
                    </div>
                    <span className="text-yellow-400 dark:text-yellow-300 font-semibold">{product.rating}</span>
                  </div>
                  <p className="text-3xl font-bold mb-6">{product.price}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                </div>
                <div className="flex justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-2xl shadow-2xl dark:shadow-black/50"
                  />
                </div>
              </div>

              {/* Dots inside the slide */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {products.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      goToSlide(index);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white dark:bg-white/40 dark:hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
}