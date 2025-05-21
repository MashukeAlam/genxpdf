import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import TopBar from "./TopBar";
import Footer from "./Footer";
import Filler from "./Filler";

export default function TextToSpeechTranslator() {
  const [file, setFile] = useState(null);
  const [inputText, setInputText] = useState("");
  const [language, setLanguage] = useState("en-US");
  const [accent, setAccent] = useState("default");
  const [audioUrl, setAudioUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const audioRef = useRef(null);

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
      const reader = new FileReader();
      reader.onload = (event) => setInputText(event.target.result);
      reader.readAsText(selectedFile);
    } else {
      alert("Please select a valid text (.txt) file.");
    }
  };

  const handleTextInput = (e) => {
    setInputText(e.target.value);
    setFile(null);
  };

  const handleSubmit = async () => {
    if (!file && !inputText.trim()) {
      alert("Please upload a text file or enter text to translate.");
      return;
    }

    // Simulate API call to dummy text-to-speech endpoint
    try {
      // Mock API response
      const mockResponse = {
        audioContent: `Mock audio content for: ${
          inputText || "Text from " + file.name
        }. Language: ${language}, Accent: ${accent}.`,
      };

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create a mock audio file (using a text blob as a placeholder)
      const blob = new Blob([mockResponse.audioContent], {
        type: "audio/mpeg",
      });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (error) {
      alert("Error generating audio. Please try again.");
    }
  };

  const handleDownload = () => {
    if (!audioUrl) return;

    const a = document.createElement("a");
    a.href = audioUrl;
    a.download = "translated_audio.mp3";
    a.click();
  };

  return (
    <>
      <div className="bg-[url('assets/images/header/banner-bg.svg')] bg-cover bg-center min-h-screen flex flex-col items-center justify-center p-8 overflow-hidden">
        <TopBar />
        <div className="bg-white/70 backdrop-blur-md border border-blue-200/30 rounded-2xl p-8 max-w-lg w-full shadow-lg">
          <h1 className="text-2xl font-bold text-blue-900 mb-4 text-center">
            Text-to-Speech Translator
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
          <div className="mb-4">
            <label className="block text-sm font-semibold text-blue-900 mb-2">
              Language:
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-2 border border-blue-300 rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
            >
              <option value="en-US">English (US)</option>
              <option value="en-GB">English (UK)</option>
              <option value="es-ES">Spanish</option>
              <option value="fr-FR">French</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-blue-900 mb-2">
              Accent:
            </label>
            <select
              value={accent}
              onChange={(e) => setAccent(e.target.value)}
              className="w-full p-2 border border-blue-300 rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
            >
              <option value="default">Default</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 mb-4"
            disabled={!file && !inputText.trim()}
          >
            Generate Audio
          </button>
          {audioUrl && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Translated Audio:
              </h3>
              <audio
                ref={audioRef}
                controls
                src={audioUrl}
                className="w-full mb-4"
              />
              <button
                onClick={handleDownload}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                Download Audio
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
