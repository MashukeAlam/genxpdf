import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import TopBar from "./TopBar";
import Footer from "./Footer";
import { featurePaths } from "../common/breadcrumb_paths";
import targetLanguages from "../data/target_languages.json";
import sourceLanguages from "../data/source_languages.json";
import { setRedirectUrl } from "../common/services.js/redirect";
import { useEffect } from "react";

export default function SpeechToTextTranslator() {
    const [transcript, setTranscript] = useState("");
    const [translatedText, setTranslatedText] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [sourceLang, setSourceLang] = useState("en");
    const [targetLang, setTargetLang] = useState("bn");
    const recognitionRef = useRef(null);
    const API_BASE = import.meta.env.VITE_BACKEND_API_BASE_URL;
    const API_KEY = import.meta.env.VITE_API_KEY;
    const token = localStorage.getItem("access_token");
    const [pages, setPages] = useState(null);
    
      useEffect(() => {
        if (localStorage.getItem('access_token')) {
          setPages(JSON.parse(localStorage.getItem("user_data")).pages);
        }
      }, [pages]);

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
            setRedirectUrl('/speech-to-text');
            location.href = '/auth';
            return;
        }

        if (!transcript.trim()) {
            alert("Please record some speech to transcribe and translate.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("source", sourceLang);
            formData.append("target", targetLang);
            formData.append("text", transcript);

            const response = await fetch(`${API_BASE}/translate_text`, {
                method: "POST",
                headers: {
                    "x-api-key": API_KEY,
                    "Authorization": `Bearer ${token}`,
                    // Optional: Try adding these headers if supported by the server
                    "Accept": "application/json",
                },
                body: formData
            });

            const data = await response.json();
            if (data.status) {
                setTranslatedText(data.translated_text);
            } else {
                throw new Error("Translation failed: " + (data.message || "Unknown error"));
            }
        } catch (err) {
            console.error("Translation error:", err);
            alert("Error translating text. Please try again. Details: " + err.message);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(translatedText).then(() => {
            alert("Text copied to clipboard!");
        }, () => {
            alert("Failed to copy text.");
        });
    };

    return (
        <>
            <div className="bg-[url('assets/images/header/banner-bg.svg')] bg-cover bg-center min-h-screen flex flex-col items-center justify-center p-8 overflow-hidden">
                <TopBar pages={pages} breadcrumb={true} breadcrumbPaths={[...featurePaths, { label: 'Speech to Text Translator', path: '/speech-to-text' }]} />
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
                            {sourceLanguages.data.map((lang) => (
                                <option key={lang.code} value={lang.code}>{lang.name}</option>
                            ))}
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
                    {translatedText && (
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold text-blue-900 mb-2">
                                Translated Text:
                            </h3>
                            <textarea
                                className="w-full h-24 p-3 border border-blue-300 rounded-lg mb-4 text-gray-700 focus:outline-none focus:border-blue-500"
                                value={translatedText}
                                readOnly
                            />
                            <button
                                onClick={handleCopy}
                                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                            >
                                Copy Text
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