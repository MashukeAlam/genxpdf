import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import TopBar from "./TopBar";
import Footer from "./Footer";
import { featurePaths } from "../common/breadcrumb_paths";
import sourceLanguages from "../data/source_languages.json";
import targetLanguages from "../data/target_languages.json";
import { fetchAllDocuments } from "../common/services.js/file_services";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_BASE = "https://awaitanthony.com/genuityx/api/v1";

export default function PdfTranslator() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [translatedUrl, setTranslatedUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("fr");
  const [sourceList, setSourceList] = useState([]);
  const [targetList, setTargetList] = useState([]);
  const fileInputRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    setSourceList(sourceLanguages.data);
    setTargetList(targetLanguages.data);
  }, []);

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
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
    } else {
      alert("Please drop a valid PDF file.");
    }
  };

  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload a PDF file first.");
      return;
    }

    setLoading(true);
    setTranslatedUrl("");

    try {
      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("pages", "1");

      const uploadRes = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        headers: {
          "x-api-key": API_KEY,
          Authorization: `Bearer ${token}`,
        },
        body: uploadData,
      });

      const uploadJson = await uploadRes.json();
      if (!uploadRes.ok || !uploadJson.status) throw new Error("Upload failed");

      const {
        input_container_name,
        input_container,
        output_container_name,
        output_container,
        file_name,
      } = uploadJson.data;

      const translateData = new FormData();
      translateData.append("input_container_name", input_container_name);
      translateData.append("input_container", input_container);
      translateData.append("output_container_name", output_container_name);
      translateData.append("output_container", output_container);
      translateData.append("file_name", file_name);
      translateData.append("source", sourceLang);
      translateData.append("target", targetLang);
      translateData.append("pages", "1");

      const translateRes = await fetch(`${API_BASE}/translate`, {
        method: "POST",
        headers: {
          "x-api-key": API_KEY,
          Authorization: `Bearer ${token}`,
        },
        body: translateData,
      });

      const translateJson = await translateRes.json();
      if (!translateRes.ok || !translateJson.status) throw new Error("Translation failed");

      setTranslatedUrl(translateJson.data.file || "Output file is now available in output container.");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-[url('assets/images/header/banner-bg.svg')] bg-cover bg-center min-h-screen flex flex-col items-center justify-center p-8 overflow-hidden">
        <TopBar breadcrumb={true} breadcrumbPaths={[...featurePaths, { label: "PDF Translator", path: "/ocr" }]} />
        <div className="bg-white/70 backdrop-blur-md border border-blue-200/30 rounded-2xl p-8 max-w-lg w-full shadow-lg">
          <h1 className="text-2xl font-bold text-blue-900 mb-4 text-center">
            PDF Translator
          </h1>

          <div className="flex gap-4 mb-4">
            <select
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              className="flex-1 border border-blue-300 rounded p-2"
            >
              {sourceList.map((lang) => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="flex-1 border border-blue-300 rounded p-2"
            >
              {targetList.map((lang) => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
          </div>

          <div
            className={`border-2 border-dashed rounded-lg p-6 mb-4 text-center ${
              isDragging ? "border-blue-500 bg-blue-100/50" : "border-blue-300"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <p className="text-gray-700 mb-2">
              {file ? file.name : "Drag and drop a PDF file here"}
            </p>
            <input
              type="file"
              accept="application/pdf"
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
            disabled={!file || loading}
          >
            {loading ? "Translating..." : "Translate PDF"}
          </button>

          {translatedUrl && (
            <div className="mt-4 text-center">
              <p className="text-green-600 text-sm mb-2">Translation completed!</p>
              <a
                href={translatedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View Translated PDF
              </a>
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