import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";
import * as htmlToImage from "html-to-image";
import TopBar from "./TopBar";
import Footer from "./Footer";
import { featurePaths } from "../common/breadcrumb_paths";
import { uploadNonPdfDocument } from "../common/services.js/upload_non_pdf";
import { useEffect } from "react";


export default function QrGenerator() {
  const [qrText, setQrText] = useState("Hello, QR!");
  const [color, setColor] = useState("#000000");
  const [logo, setLogo] = useState(null);
  const qrRef = useRef(null);
  const logoInputRef = useRef(null);
  const [pages, setPages] = useState(null);
  
    useEffect(() => {
      if (localStorage.getItem('access_token')) {
        setPages(JSON.parse(localStorage.getItem("user_data")).pages);
      }
    }, [pages]);

  const handleGenerate = () => {
    if (!qrText.trim()) {
      alert("Please enter text for the QR code.");
      return;
    }
    // QR code is generated automatically via the QRCode component
  };

  const handleDownload = async () => {
    if (!qrRef.current) return;

    try {
      const dataUrl = await htmlToImage.toBlob(qrRef.current);
      const file = new File([dataUrl], "qr-code.png", { type: "image/png" });

      // Upload to /documents/create
      const response = await uploadNonPdfDocument(file, 1, `${qrText} QR Code`);

      // Trigger download
      const blobUrl = URL.createObjectURL(dataUrl);
      const link = document.createElement("a");
      link.download = "qr-code.png";
      link.href = blobUrl;
      link.click();
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Failed to process QR code:", err);
      alert("Error processing QR code. Please try again.");
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file && ["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
      const reader = new FileReader();
      reader.onload = (event) => setLogo(event.target.result);
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file (.png, .jpg, .jpeg).");
    }
  };

  const handleRemoveLogo = () => {
    setLogo(null);
    logoInputRef.current.value = "";
  };

  return (
    <>
      <div className="bg-[url('assets/images/header/banner-bg.svg')] bg-cover bg-center min-h-screen flex flex-col items-center justify-center p-8 overflow-hidden">
        <TopBar pages={pages} breadcrumb={true} breadcrumbPaths={[...featurePaths, { label: 'QR Generator', path: '/ocr' }]} />
        <div className="bg-white/70 backdrop-blur-md border border-blue-200/30 rounded-2xl p-8 max-w-lg w-full shadow-lg">
          <h1 className="text-2xl font-bold text-blue-900 mb-4 text-center">
            QR Generator
          </h1>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-blue-900 mb-2">
              QR Code Text:
            </label>
            <input
              type="text"
              className="w-full p-3 border border-blue-300 rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              value={qrText}
              onChange={(e) => setQrText(e.target.value)}
              placeholder="Enter text or URL"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-blue-900 mb-2">
              QR Code Color:
            </label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full h-10 border border-blue-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-blue-900 mb-2">
              Logo (Optional):
            </label>
            <div className="flex items-center">
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                ref={logoInputRef}
                onChange={handleLogoUpload}
                className="hidden"
              />
              <button
                onClick={() => logoInputRef.current.click()}
                className="text-blue-500 hover:underline"
              >
                {logo ? "Change Logo" : "Upload Logo"}
              </button>
              {logo && (
                <button
                  onClick={handleRemoveLogo}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  Remove Logo
                </button>
              )}
            </div>
          </div>
          <div className="flex justify-center mb-4">
            <div ref={qrRef} className="relative bg-white p-4 rounded-lg">
              <QRCode value={qrText} size={200} fgColor={color} />
              {logo && (
                <img
                  src={logo}
                  alt="Logo"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12"
                />
              )}
            </div>
          </div>
          <button
            onClick={handleDownload}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 mb-4"
            disabled={!qrText.trim()}
          >
            Download QR Code
          </button>
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
