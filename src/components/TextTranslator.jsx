import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import TopBar from "./TopBar";
import Footer from "./Footer";
import { featurePaths } from "../common/breadcrumb_paths";


export default function TextTranslator() {
  const [file, setFile] = useState(null);
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
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
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "text/plain") {
      setFile(droppedFile);
      setInputText("");
      // Read file content
      const reader = new FileReader();
      reader.onload = (event) => setInputText(event.target.result);
      reader.readAsText(droppedFile);
    } else {
      alert("Please drop a valid text (.txt) file.");
    }
  };

  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "text/plain") {
      setFile(selectedFile);
      setInputText("");
      // Read file content
      const reader = new FileReader();
      reader.onload = (event) => setInputText(event.target.result);
      reader.readAsText(selectedFile);
    } else {
      alert("Please select a valid text (.txt) file.");
    }
  };

  const handleTextInput = (e) => {
    setInputText(e.target.value);
    setFile(null); // Clear file if user types directly
  };

  const handleSubmit = async () => {
    if (!file && !inputText.trim()) {
      alert("Please upload a text file or enter text to translate.");
      return;
    }

    // Simulate API call to dummy endpoint
    try {
      // Mock API response
      const mockResponse = {
        translatedText: `Translated content: ${
          inputText || "Text from " + file.name
        }. This is a mock translation.`,
      };

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setTranslatedText(mockResponse.translatedText);
    } catch (error) {
      alert("Error translating text. Please try again.");
    }
  };

  const handleDownload = () => {
    if (!translatedText) return;

    // Create a downloadable text file
    const blob = new Blob([translatedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "translated_text.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="bg-[url('assets/images/header/banner-bg.svg')] bg-cover bg-center min-h-screen flex flex-col  items-center justify-center p-8 overflow-hidden">
        <TopBar breadcrumb={true} breadcrumbPaths={[...featurePaths, {label: 'Text Translator', path: '/ocr'}]}/>
        <div className="bg-white/70 backdrop-blur-md border border-blue-200/30 rounded-2xl p-8 max-w-lg w-full shadow-lg">
          <h1 className="text-2xl font-bold text-blue-900 mb-4 text-center">
            Text Translator
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
              {file ? file.name : "Drag and drop a text (.txt) file here"}
            </p>
            <input
              type="file"
              accept="text/plain"
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
          <textarea
            className="w-full h-24 p-3 border border-blue-300 rounded-lg mb-4 text-gray-700 focus:outline-none focus:border-blue-500"
            placeholder="Or type your text here..."
            value={inputText}
            onChange={handleTextInput}
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 mb-4"
            disabled={!file && !inputText.trim()}
          >
            Translate Text
          </button>
          {translatedText && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Translated Content:
              </h3>
              <p className="text-gray-700 text-sm bg-white/50 p-4 rounded-lg">
                {translatedText}
              </p>
              <button
                onClick={handleDownload}
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                Download Translation
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
