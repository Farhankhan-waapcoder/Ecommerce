import React from 'react';

const CardLoader = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm animate-pulse overflow-hidden">
      {/* Image Placeholder */}
      <div className="aspect-square bg-gray-200" />

      {/* Text Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <div className="h-5 w-3/4 bg-gray-200 rounded" />

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="h-4 w-20 bg-gray-200 rounded" />
          <div className="h-4 w-10 bg-gray-200 rounded" />
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between">
          <div className="h-6 w-16 bg-gray-200 rounded" />
          <div className="h-10 w-24 bg-gray-300 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default CardLoader;
