
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductSliderLoader () {
  return (
    <div className="relative mb-12">
      {/* Slider container */}
      <div className="relative overflow-hidden rounded-2xl group">
        {/* Left Arrow - Disabled state */}
        <button 
          disabled
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-white/20 dark:border-white/10 opacity-50"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        {/* Right Arrow - Disabled state */}
        <button 
          disabled
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-white/20 dark:border-white/10 opacity-50"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Loading Slide */}
        <div className="w-full flex-shrink-0">
          <div className="relative bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 dark:from-purple-700 dark:via-pink-700 dark:to-red-700 p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="text-white">
                {/* Product name skeleton */}
                <div className="mb-4">
                  <div className="h-8 md:h-12 bg-white/20 dark:bg-white/15 rounded-lg animate-pulse mb-2"></div>
                  <div className="h-6 md:h-8 bg-white/20 dark:bg-white/15 rounded-lg animate-pulse w-3/4"></div>
                </div>
                
                {/* Rating skeleton */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-5 h-5 bg-white/20 dark:bg-white/15 rounded animate-pulse"
                      />
                    ))}
                  </div>
                  <div className="w-8 h-5 bg-white/20 dark:bg-white/15 rounded animate-pulse"></div>
                </div>

                {/* Price skeleton */}
                <div className="h-10 bg-white/20 dark:bg-white/15 rounded-lg animate-pulse mb-6 w-32"></div>

                {/* Button skeleton */}
                <div className="inline-flex items-center gap-2 bg-white/20 dark:bg-white/15 px-6 py-3 rounded-full animate-pulse">
                  <div className="w-5 h-5 bg-white/30 dark:bg-white/20 rounded"></div>
                  <div className="w-20 h-6 bg-white/30 dark:bg-white/20 rounded"></div>
                </div>
              </div>

              {/* Image skeleton */}
              <div className="flex justify-center">
                <div className="w-64 h-64 md:w-80 md:h-80 bg-white/20 dark:bg-white/15 rounded-2xl animate-pulse shadow-2xl dark:shadow-black/50"></div>
              </div>
            </div>

            {/* Dots skeleton */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === 0 ? 'bg-white scale-125' : 'bg-white/50'
                  } animate-pulse`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};