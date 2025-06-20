import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { PDFDocument } from "pdf-lib";
import TopBar from "./TopBar";
import Footer from "./Footer";
import { featurePaths } from "../common/breadcrumb_paths";
import { uploadGenericDocument } from "../common/services.js/upload_generic";

export default function PdfMerge() {
  const [files, setFiles] = useState([]);
  const [mergedFileUrl, setMergedFileUrl] = useState("");
  const [mergedBlob, setMergedBlob] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
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
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      (file) => file.type === "application/pdf"
    );
    if (droppedFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
      setMergedFileUrl("");
    } else {
      alert("Please drop valid PDF files.");
    }
  };

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files).filter(
      (file) => file.type === "application/pdf"
    );
    if (selectedFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
      setMergedFileUrl("");
    } else {
      alert("Please select valid PDF files.");
    }
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setMergedFileUrl("");
  };

  const handleSubmit = async () => {
    if (files.length < 2) {
      alert("Please upload at least two PDF files to merge.");
      return;
    }

    setLoading(true);
    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(
          pdf,
          pdf.getPageIndices()
        );

        copiedPages.forEach((page) => {
          mergedPdf.addPage(page);
        });
      }

      const mergedBytes = await mergedPdf.save();
      const blob = new Blob([mergedBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      setMergedBlob(blob);
      setMergedFileUrl(url);
    } catch (error) {
      alert("Error merging PDFs. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!mergedFileUrl) return;

    setDownloadLoading(true);
    try {
      const file = new File([mergedBlob], "merged_output.pdf", { type: "application/pdf" });

      // Upload the file
      const uploadResponse = await uploadGenericDocument(file, 1, "merged_output.pdf");
      console.log("Uploaded merged file:", uploadResponse);

      const a = document.createElement("a");
      a.href = mergedFileUrl;
      a.download = "merged_output.pdf";
      a.click();
    } catch (error) {
      alert("Error downloading PDF. Please try again.");
      console.error(error);
    } finally {
      setDownloadLoading(false);
    }
  };

  return (
    <>
      <div className="bg-[url('assets/images/header/banner-bg.svg')] flex-col bg-cover bg-center min-h-screen flex items-center justify-center p-8 overflow-hidden">
        <TopBar breadcrumb={true} breadcrumbPaths={[...featurePaths, {label: 'PDF Merge', path: '/ocr'}]}/>
        <div className="bg-white/70 backdrop-blur-md border border-blue-200/30 rounded-2xl p-8 max-w-lg w-full shadow-lg">
          <h1 className="text-2xl font-bold text-blue-900 mb-4 text-center">
            PDF Merge
          </h1>
          <div
            className={`border-2 border-dashed rounded-lg p-6 mb-4 text-center ${
              isDragging ? "border-blue-500 bg-blue-100/50" : "border-blue-300"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <p className="text-gray-700 mb-2">
              {files.length > 0
                ? `${files.length} PDF${files.length > 1 ? "s" : ""} selected`
                : "Drag and drop PDF files here"}
            </p>
            <input
              type="file"
              accept="application/pdf"
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
                Selected Files:
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
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 mb-4 flex items-center justify-center"
            disabled={files.length < 2 || loading}
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
              <>Merge PDFs</>
            )}
          </button>
          {mergedFileUrl && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Merged PDF:
              </h3>
              <p className="text-gray-700 text-sm bg-white/50 p-4 rounded-lg">
                Your PDFs have been merged successfully.
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
                  <>Download Merged PDF</>
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
        <br />
      </div>
      <Footer />
    </>
  );
}