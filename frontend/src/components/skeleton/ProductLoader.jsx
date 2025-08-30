import React from 'react';

const ProductLoader = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-6 py-8">
        {/* Back Button Skeleton */}
        <div className="w-40 h-6 mb-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Images Skeleton */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-20 h-20 rounded-xl bg-slate-200 dark:bg-slate-700 animate-pulse" />
              ))}
            </div>
            <div className="flex-1 space-y-4">
              <div className="relative w-full h-96 lg:h-[500px] rounded-2xl bg-slate-200 dark:bg-slate-700 animate-pulse" />
            </div>
          </div>

          {/* Right: Info Skeleton */}
          <div className="space-y-6">
            <div>
              <div className="w-28 h-6 rounded-full bg-blue-200 dark:bg-blue-900 animate-pulse mb-3" />
              <div className="h-8 w-3/4 bg-slate-200 dark:bg-slate-700 rounded mb-2 animate-pulse" />
              <div className="h-5 w-1/2 bg-slate-200 dark:bg-slate-700 rounded mb-2 animate-pulse" />
              <div className="flex gap-2 mb-4">
                <div className="h-5 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                <div className="h-5 w-10 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
              </div>
            </div>

            <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4 space-y-2 animate-pulse">
              <div className="h-8 w-1/3 bg-slate-300 dark:bg-slate-700 rounded" />
              <div className="h-5 w-2/3 bg-slate-200 dark:bg-slate-600 rounded" />
            </div>

            <div className="h-10 w-1/2 bg-green-100 dark:bg-green-800 rounded-xl animate-pulse" />

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm animate-pulse space-y-2">
              <div className="h-5 w-1/3 bg-slate-200 dark:bg-slate-600 rounded" />
              <div className="h-4 w-full bg-slate-100 dark:bg-slate-700 rounded" />
              <div className="h-4 w-5/6 bg-slate-100 dark:bg-slate-700 rounded" />
              <div className="h-4 w-4/6 bg-slate-100 dark:bg-slate-700 rounded" />
            </div>

            <div className="h-14 w-full bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductLoader;
