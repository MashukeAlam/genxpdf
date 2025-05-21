import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Tesseract from "tesseract.js";
import TopBar from "./TopBar";
import Footer from "./Footer";

export default function Ocr() {
  const [file, setFile] = useState(null);
  const [ocrText, setOcrText] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const worker = useRef(null);

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
    const droppedFile = e.dataTransfer.files[0];
    if (
      droppedFile &&
      ["image/png", "image/jpeg", "image/jpg"].includes(droppedFile.type)
    ) {
      setFile(droppedFile);
      setOcrText("");
    } else {
      alert("Please drop a valid image file (.png, .jpg, .jpeg).");
    }
  };

  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      ["image/png", "image/jpeg", "image/jpg"].includes(selectedFile.type)
    ) {
      setFile(selectedFile);
      setOcrText("");
    } else {
      alert("Please select a valid image file (.png, .jpg, .jpeg).");
    }
  };

  // const tesseractWorker = async () => {
  //   createWorker({
  //     langPath: path.join(__dirname, 'public', 'assets', 'lang-data'),
  //     logger: m => console.log(m),
      
  //   });
  // }

  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload an image file first.");
      return;
    }

    try {
      const result = await Tesseract.recognize(file, 'eng', {
        logger: m => {
          setStatus(m.status);
          if (m.status === 'recognizing text') {
            setProgress(Math.floor(m.progress * 100));
          }
        }
      });

      setStatus('Done');
      setOcrText(result.data.text);
    } catch (error) {
      setStatus('Error');
      alert("Error processing OCR. Please try again.");
    }
  };

  const handleDownload = () => {
    if (!ocrText) return;

    // Create a downloadable text file
    const blob = new Blob([ocrText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ocr_result.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="bg-[url('assets/images/header/banner-bg.svg')] bg-cover bg-center min-h-screen flex flex-col  items-center justify-center p-8 overflow-hidden">
        <TopBar />
        <div className="bg-white/70 backdrop-blur-md border border-blue-200/30 rounded-2xl p-8 max-w-lg w-full shadow-lg">
          <h1 className="text-2xl font-bold text-blue-900 mb-4 text-center">
            OCR (Image to Text)
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
              {file ? file.name : "Drag and drop an image file here"}
            </p>
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg"
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
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 mb-4"
            disabled={!file}
          >
            Process OCR
          </button>

          {status && status != '' && <p>Status: {status}</p>}
          {status && status != '' && status === 'recognizing text' && <progress value={progress} max="100">{progress}%</progress>}
      

          {ocrText && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Extracted Text:
              </h3>
              <textarea
                className="w-full h-24 p-3 border border-blue-300 rounded-lg mb-4 text-gray-700 bg-white/50"
                value={ocrText}
                readOnly
              />
              <button
                onClick={handleDownload}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                Download Text
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
