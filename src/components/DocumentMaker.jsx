import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function DocumentMaker() {
  const [files, setFiles] = useState([]);
  const [quality, setQuality] = useState('medium');
  const [layout, setLayout] = useState('single');
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
      ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)
    );
    if (droppedFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
      setGeneratedPdfUrl('');
    } else {
      alert('Please drop valid image files (.png, .jpg, .jpeg).');
    }
  };

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files).filter((file) =>
      ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)
    );
    if (selectedFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
      setGeneratedPdfUrl('');
    } else {
      alert('Please select valid image files (.png, .jpg, .jpeg).');
    }
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setGeneratedPdfUrl('');
  };

  const handleSubmit = async () => {
    if (files.length === 0) {
      alert('Please upload at least one image file.');
      return;
    }

    // Simulate API call to dummy PDF conversion endpoint
    try {
      // Mock API response
      const mockGeneratedFile = {
        fileName: 'converted_document.pdf',
        content: `Mock PDF content generated from ${files.length} images with ${quality} quality and ${layout} layout.`,
      };

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create a downloadable file (mocked as a text file for simplicity)
      const blob = new Blob([mockGeneratedFile.content], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setGeneratedPdfUrl(url);
    } catch (error) {
      alert('Error converting images to PDF. Please try again.');
    }
  };

  const handleDownload = () => {
    if (!generatedPdfUrl) return;

    const a = document.createElement('a');
    a.href = generatedPdfUrl;
    a.download = 'converted_document.pdf';
    a.click();
  };

  return (
    <div
      className="bg-[url('assets/images/header/banner-bg.svg')] bg-cover bg-center min-h-screen flex items-center justify-center p-8 overflow-hidden"
    >
      <div className="bg-white/70 backdrop-blur-md border border-blue-200/30 rounded-2xl p-8 max-w-lg w-full shadow-lg">
        <h1 className="text-2xl font-bold text-blue-900 mb-4 text-center">Documents Maker</h1>
        <div
          className={`border-2 border-dashed rounded-lg p-6 mb-4 text-center ${
            isDragging ? 'border-blue-500 bg-blue-100/50' : 'border-blue-300'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p className="text-gray-700 mb-2">
            {files.length > 0
              ? `${files.length} image${files.length > 1 ? 's' : ''} selected`
              : 'Drag and drop image files here'}
          </p>
          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            multiple
            ref={fileInputRef}
            onChange={handleFileInput}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="text-blue-500 hover:underline"
          >
            Or click to select
          </button>
        </div>
        {files.length > 0 && (
          <div className="mb-4 max-h-24 overflow-y-auto">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">Selected Images:</h3>
            <ul className="text-gray-700 text-sm">
              {files.map((file, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{file.name}</span>
                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-blue-900 mb-2">Quality:</label>
          <select
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            className="w-full p-2 border border-blue-300 rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-blue-900 mb-2">Layout:</label>
          <select
            value={layout}
            onChange={(e) => setLayout(e.target.value)}
            className="w-full p-2 border border-blue-300 rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          >
            <option value="single">Single Page</option>
            <option value="grid">Grid</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 mb-4"
          disabled={files.length === 0}
        >
          Convert to PDF
        </button>
        {generatedPdfUrl && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Generated PDF:</h3>
            <p className="text-gray-700 text-sm bg-white/50 p-4 rounded-lg">
              Your images have been converted to a PDF successfully.
            </p>
            <button
              onClick={handleDownload}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Download PDF
            </button>
          </div>
        )}
        <Link
          to="/"
          className="mt-4 inline-block text-blue-500 hover:underline text-sm text-center w-full"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}