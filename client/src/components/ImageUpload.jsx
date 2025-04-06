import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import config from '../config';

function ImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append('image', file);
    });

    setUploading(true);
    setMessage(null);

    try {
      const response = await axios.post(`${config.apiBaseUrl}/api/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage({
        type: 'success',
        text: 'Image uploaded and compressed successfully!'
      });
      console.log('Upload successful:', response.data);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Error uploading image'
      });
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    }
  });

  return (
    <div className="max-w-xl mx-auto p-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'}`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-500">Drop the images here...</p>
        ) : (
          <div>
            <p className="text-gray-600">Drag and drop images here, or click to select files</p>
            <p className="text-sm text-gray-500 mt-2">Supported formats: JPEG, PNG, GIF</p>
          </div>
        )}
      </div>

      {uploading && (
        <div className="mt-4 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Uploading and compressing...</p>
        </div>
      )}

      {message && (
        <div className={`mt-4 p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message.text}
        </div>
      )}
    </div>
  );
}

export default ImageUpload; 