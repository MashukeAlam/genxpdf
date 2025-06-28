import { useEffect, useState } from "react";
import TopBar from "./TopBar";
import Footer from "./Footer";
import { featurePaths } from "../common/breadcrumb_paths";
import { fetchAndStoreUser } from "../common/services.js/fetch_user_data";

const features = [
  {
    id: 1,
    name: "PDF Translator",
    description: "Effortlessly translate PDF documents into multiple languages.",
    path: "/pdf-translator",
  },
  {
    id: 2,
    name: "Text Translator",
    description: "Translate text instantly with support for diverse languages.",
    path: "/speech-to-text",
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
    description: "Combine multiple PDFs seamlessly with a drag-and-drop interface.",
    path: "/pdf-merge",
  },
  {
    id: 5,
    name: "Document Maker",
    description: "Convert images to PDFs with customizable layouts and quality.",
    path: "/documents-maker",
  },
  {
    id: 7,
    name: "QR Scanner",
    description: "Scan QR codes effortlessly, including URLs and contacts.",
    path: "/qr-scanner",
  },
];

export default function DownloadPage() {
  const [downloadLink, setDownloadLink] = useState("#download-link");

  useEffect(() => {
    const link = localStorage.getItem("download_link");
    if (link) {
      setDownloadLink(link);
      localStorage.removeItem("download_link");
    }
  }, []);

  const [pages, setPages] = useState(null);

  useEffect(() => {
    fetchAndStoreUser();
    if (localStorage.getItem('access_token')) {
      setPages(JSON.parse(localStorage.getItem("user_data")).pages);
    }
  }, [pages]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div
        id="download"
        className="header-hero bg-[url('assets/images/header/banner-bg.svg')] bg-cover bg-center min-h-[100vh] flex flex-col items-center p-8 relative overflow-hidden"
      >
        <TopBar pages={pages} breadcrumb={true} breadcrumbPaths={[...featurePaths, { label: "Download", path: "/ocr" }]} />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 to-transparent"></div>

        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-400 text-center mb-8 relative z-10 drop-shadow-lg mt-16">
          Your File is Ready!
        </h1>
        <p className="text-lg md:text-xl text-white text-center mb-12 relative z-10 max-w-2xl">
          Get started with our powerful tools for productivity and creativity. Available for all major platforms.
        </p>

        <a
          href={downloadLink}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-4 px-8 rounded-full text-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
        >
          Download Now
        </a>

        <div className="relative z-10 mt-16 w-full max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-8">
            Explore Our Features
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {features.map((feature) => (
              <a
                key={feature.id}
                href={feature.path}
                className="bg-white/90 backdrop-blur-sm p-4 rounded-lg text-center text-blue-900 font-bold text-sm hover:bg-white/70 hover:text-blue-700 transition-all duration-200"
              >
                {feature.name}
              </a>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}