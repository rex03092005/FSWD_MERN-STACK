import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-gray-800">
            Image Compression App
          </Link>
          <div className="flex space-x-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
            >
              Upload
            </Link>
            <Link
              to="/images"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
            >
              Images
            </Link>
            <Link
              to="/analytics"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
            >
              Analytics
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 