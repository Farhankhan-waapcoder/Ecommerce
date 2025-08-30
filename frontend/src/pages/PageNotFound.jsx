import { Link } from "react-router-dom";
import { MoveLeft } from "lucide-react";

const PageNotFound = () => {
   return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="text-center animate-fadeIn">
        <h1 className="text-7xl font-bold text-gray-800 dark:text-gray-200 mb-4">404</h1>
        <p className="text-2xl text-gray-600 dark:text-gray-300 mb-6">Oops! Page not found.</p>
        <p className="text-md text-gray-500 dark:text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300"
        >
          <MoveLeft size={20} />
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
