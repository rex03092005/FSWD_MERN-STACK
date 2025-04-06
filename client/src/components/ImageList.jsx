import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

function ImageList() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`${config.apiBaseUrl}/api/images`);
      setImages(response.data.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching images');
      setLoading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading images...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {images.map((image) => (
        <div key={image.filename} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 truncate">
              {image.filename}
            </h3>
            <div className="mt-2 space-y-1">
              <p className="text-sm text-gray-600">
                Size: {formatFileSize(image.size)}
              </p>
              <p className="text-sm text-gray-600">
                Created: {new Date(image.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="mt-4">
              <a
                href={`${config.apiBaseUrl}${image.url}`}
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                download
              >
                Download
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ImageList; 