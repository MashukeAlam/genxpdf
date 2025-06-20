import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { PDFDocument, rgb } from "pdf-lib";
import TopBar from "./TopBar";
import Footer from "./Footer";
import { featurePaths } from "../common/breadcrumb_paths";
import { uploadGenericDocument } from "../common/services.js/upload_generic";
import { setDownloadFileLink } from "../common/services.js/download_file_link";

export default function DocumentMaker() {
  const API_BASE = import.meta.env.VITE_BACKEND_API_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("access_token");


  const [files, setFiles] = useState([]);
  const [quality, setQuality] = useState("medium");
  const [layout, setLayout] = useState("single");
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [preparedBlob, setPreparedBlob] = useState(null);
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
      ["image/png", "image/jpeg", "image/jpg"].includes(file.type)
    );
    if (droppedFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
      setGeneratedPdfUrl("");
    } else {
      alert("Please drop valid image files (.png, .jpg, .jpeg).");
    }
  };

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files).filter((file) =>
      ["image/png", "image/jpeg", "image/jpg"].includes(file.type)
    );
    if (selectedFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
      setGeneratedPdfUrl("");
    } else {
      alert("Please select valid image files (.png, .jpg, .jpeg).");
    }
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setGeneratedPdfUrl("");
  };

  const handleSubmit = async () => {
    if (!token) {
      setRedirectUrl('/documents-maker');
      location.href = '/auth';
      return;
    }

    if (files.length === 0) {
      alert("Please upload at least one image file.");
      return;
    }

    setLoading(true);
    try {
      const pdfDoc = await PDFDocument.create();

      for (let file of files) {
        const imgBytes = await file.arrayBuffer();
        let img;
        let dims;

        // Detect image type and embed
        if (file.type === "image/jpeg" || file.type === "image/jpg") {
          img = await pdfDoc.embedJpg(imgBytes);
        } else if (file.type === "image/png") {
          img = await pdfDoc.embedPng(imgBytes);
        } else {
          alert(`Unsupported file type: ${file.type}`);
          continue;
        }

        dims = img.scale(1); // 100% scale

        const page = pdfDoc.addPage([dims.width, dims.height]);
        page.drawImage(img, {
          x: 0,
          y: 0,
          width: dims.width,
          height: dims.height,
        });
      }

      const pdfBytes = await pdfDoc.save();

      // Create blob and trigger download
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      setPreparedBlob(blob);

      const url = URL.createObjectURL(blob);
      setGeneratedPdfUrl(url);
    } catch (error) {
      console.error(error);
      alert("Error creating PDF");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!generatedPdfUrl) return;

    setDownloadLoading(true);
    try {
      const file = new File([preparedBlob], "Prepared Document.pdf", { type: "application/pdf" });
      const uploadResponse = await uploadGenericDocument(file, 1, "Prepared Document.pdf");


      const a = document.createElement("a");
      a.href = generatedPdfUrl;
      a.download = "converted_document.pdf";
      a.click();
      setDownloadFileLink(generatedPdfUrl);
      // location.href = '/download';
    } catch (error) {
      console.error(error);
      alert("Error downloading PDF");
    } finally {
      setDownloadLoading(false);
    }
  };

  return (
    <>
      <div className="bg-[url('assets/images/header/banner-bg.svg')] bg-cover bg-center min-h-screen flex flex-col items-center justify-center p-8 overflow-hidden">
        <TopBar breadcrumb={true} breadcrumbPaths={[...featurePaths, { label: 'Document Maker', path: '/ocr' }]} />
        <div className="bg-white/70 backdrop-blur-md border border-blue-200/30 rounded-2xl p-8 max-w-lg w-full shadow-lg">
          <h1 className="text-2xl font-bold text-blue-900 mb-4 text-center">
            Documents Maker
          </h1>
          <div
            className={`border-2 border-dashed rounded-lg p-6 mb-4 text-center ${isDragging ? "border-blue-500 bg-blue-100/50" : "border-blue-300"}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <p className="text-gray-700 mb-2">
              {files.length > 0
                ? `${files.length} image${files.length > 1 ? "s" : ""} selected`
                : "Drag and drop image files here"}
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
              <h3 className="text-sm font-semibold text-blue-900 mb-2">
                Selected Images:
              </h3>
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
            <label className="block text-sm font-semibold text-blue-900 mb-2">
              Quality:
            </label>
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
            <label className="block text-sm font-semibold text-blue-900 mb-2">
              Layout:
            </label>
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
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 mb-4 flex items-center justify-center"
            disabled={files.length === 0 || loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </div>
            ) : (
              <>Convert to PDF</>
            )}
          </button>
          {generatedPdfUrl && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Generated PDF:
              </h3>
              <p className="text-gray-700 text-sm bg-white/50 p-4 rounded-lg">
                Your images have been converted to a PDF successfully.
              </p>
              <button
                onClick={handleDownload}
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center"
                disabled={downloadLoading}
              >
                {downloadLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  <>Download PDF</>
                )}
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
      <Footer />
    </>
  );
}