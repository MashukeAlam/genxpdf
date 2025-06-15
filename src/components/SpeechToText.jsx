import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import Footer from "./Footer";
import { featurePaths } from "../common/breadcrumb_paths";
import targetLanguages from "../data/target_languages.json";
import { setRedirectUrl } from "../common/services.js/redirect";

export default function SpeechToTextTranslator() {
    const [transcript, setTranscript] = useState("");
    const [translatedText, setTranslatedText] = useState("");
    const [translatedFileUrl, setTranslatedFileUrl] = useState("");
    const [sourceLang, setSourceLang] = useState("en-US");
    const [targetLang, setTargetLang] = useState("es-ES");
    const [isRecording, setIsRecording] = useState(false);
    const recognitionRef = useRef(null);
    const navigate = useNavigate();
    const API_BASE = import.meta.env.VITE_BACKEND_API_BASE_URL || "https://api.example.com";
    const API_KEY = import.meta.env.VITE_API_KEY || "your-api-key";
    const token = localStorage.getItem("access_token");

    const startRecognition = () => {
        if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
            alert("Sorry, your browser doesn't support speech recognition.");
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.lang = sourceLang;
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;

        recognitionRef.current.onresult = (event) => {
            let interimTranscript = "";
            let finalTranscript = "";

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcriptPiece = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcriptPiece + " ";
                } else {
                    interimTranscript += transcriptPiece;
                }
            }
            setTranscript(finalTranscript + interimTranscript);
        };

        recognitionRef.current.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            alert("Error during speech recognition: " + event.error);
            stopRecognition();
        };

        recognitionRef.current.onend = () => {
            setIsRecording(false);
        };

        recognitionRef.current.start();
        setIsRecording(true);
    };

    const stopRecognition = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsRecording(false);
        }
    };

    const handleSubmit = async () => {
        if (!token) {
            setRedirectUrl('speech-to-text');
            navigate("/auth");
            return;
        }

        if (!transcript.trim()) {
            alert("Please record some speech to transcribe and translate.");
            return;
        }

        try {
            const textBlob = new Blob([transcript], { type: "text/plain" });
            const uploadFile = new File([textBlob], "transcribed_text.txt", { type: "text/plain" });

            // Upload to /upload
            const uploadData = new FormData();
            uploadData.append("file", uploadFile);
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

            // Translate
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

            setTranslatedFileUrl(translateJson.data.file);
        } catch (err) {
            console.error("Translation error:", err);
            alert("Error translating text. Please try again.");
        }
    };

    const handleDownload = () => {
        if (!translatedFileUrl) return;

        const a = document.createElement("a");
        a.href = translatedFileUrl;
        a.download = "translated_text.txt";
        a.click();
    };

    return (
        <>
            <div className="bg-[url('assets/images/header/banner-bg.svg')] bg-cover bg-center min-h-screen flex flex-col items-center justify-center p-8 overflow-hidden">
                <TopBar breadcrumb={true} breadcrumbPaths={[...featurePaths, { label: 'Speech to Text Translator', path: '/speech-to-text' }]} />
                <div className="bg-white/70 backdrop-blur-md border border-blue-200/30 rounded-2xl p-8 max-w-lg w-full shadow-lg">
                    <h1 className="text-2xl font-bold text-blue-900 mb-4 text-center">
                        Speech-to-Text Translator
                    </h1>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-blue-900 mb-2">
                            Source Language:
                        </label>
                        <select
                            value={sourceLang}
                            onChange={(e) => setSourceLang(e.target.value)}
                            className="w-full p-2 border border-blue-300 rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                            disabled={isRecording}
                        >
                            <option value="en-US">English (US)</option>
                            <option value="en-GB">English (UK)</option>
                            <option value="es-ES">Spanish</option>
                            <option value="fr-FR">French</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-blue-900 mb-2">
                            Target Language:
                        </label>
                        <select
                            value={targetLang}
                            onChange={(e) => setTargetLang(e.target.value)}
                            className="w-full p-2 border border-blue-300 rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                            disabled={isRecording}
                        >
                            {targetLanguages.data.map((lang) => (
                                <option key={lang.code} value={lang.code}>{lang.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-center mb-4">
                        <button
                            onClick={isRecording ? stopRecognition : startRecognition}
                            className={`w-full py-2 rounded-lg transition-colors duration-300 ${isRecording
                                    ? "bg-red-600 hover:bg-red-700 text-white"
                                    : "bg-blue-600 hover:bg-blue-700 text-white"
                                }`}
                        >
                            {isRecording ? "Stop Recording" : "Start Recording"}
                        </button>
                    </div>
                    <textarea
                        className="w-full h-24 p-3 border border-blue-300 rounded-lg mb-4 text-gray-700 focus:outline-none focus:border-blue-500"
                        placeholder="Transcription will appear here..."
                        value={transcript}
                        readOnly
                    />
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 mb-4"
                        disabled={!transcript.trim() || isRecording}
                    >
                        Translate Text
                    </button>
                    {translatedFileUrl && (
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold text-blue-900 mb-2">
                                Translated File:
                            </h3>
                            <button
                                onClick={handleDownload}
                                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                            >
                                Download Translated Text
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