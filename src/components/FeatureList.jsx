import React from "react";
import FeatureCard from "./FeatureCard";
import Header from "./Header";
import { AuthProvider } from "./features/AuthContext";
import TopBar from "./TopBar";
import Footer from "./Footer";

export default function FeatureList() {
  const features = [
    {
      id: 1,
      name: "PDF Translator",
      description:
        "Effortlessly translate PDF documents into multiple languages.",
      path: "/pdf-translator",
    },
    {
      id: 2,
      name: "Text Translator",
      description:
        "Translate text instantly with support for diverse languages.",
      path: "/text-translator",
    },
    {
      id: 3,
      name: "OCR (Image to Text)",
      description: "Extract text from images with high accuracy.",
      path: "/ocr",
    },
    {
      id: 4,
      name: "PDF Merge",
      description:
        "Combine multiple PDFs seamlessly with a drag-and-drop interface.",
      path: "/pdf-merge",
    },
    {
      id: 5,
      name: "Document Maker",
      description:
        "Convert images to PDFs with customizable layouts and quality.",
      path: "/documents-maker",
    },
    {
      id: 6,
      name: "QR Generator",
      description: "Create custom QR codes with colors and logos.",
      path: "/qr-generator",
    },
    {
      id: 7,
      name: "QR Scanner",
      description: "Scan QR codes effortlessly, including URLs and contacts.",
      path: "/qr-scanner",
    },
    {
      id: 8,
      name: "Text-to-Speech",
      description: "Transform text into speech with multilingual support.",
      path: "/text-to-speech",
    },
  ];

  return (
    <>
      <div
        id="home"
        className="header-hero bg-[url('assets/images/header/banner-bg.svg')] bg-cover bg-center min-h-screen flex flex-col items-center p-8 relative overflow-hidden"
      >
        <TopBar />

        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 to-transparent"></div>
        <br></br>
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-400 text-center mb-12 relative z-10 drop-shadow-lg">
          Discover Our Features
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`card-animate delay-${index * 100}`}
            >
              <FeatureCard feature={feature} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
