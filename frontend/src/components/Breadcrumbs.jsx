// src/components/Breadcrumbs.jsx
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
const Breadcrumbs = () => {
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="text-sm text-gray-600 my-4">
      <ul className="flex flex-wrap items-center space-x-2">
        <li>
          <Link to="/" className="text-blue-600 hover:underline">Home</Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={name} className="flex items-center">
              <span className="mx-1"><ChevronRight size={14} /></span>
              {isLast ? (
                <span className="text-gray-500">{decodeURIComponent(name)}</span>
              ) : (
                <Link to={routeTo} className="text-blue-600 hover:underline">
                  {decodeURIComponent(name)}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
