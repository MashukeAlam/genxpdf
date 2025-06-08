
// src/pages/MyFiles.jsx
import React, { useEffect, useState } from "react";
import { fetchAllDocuments } from "../common/services.js/file_services";
import TopBar from "./TopBar";

export default function MyFiles() {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAllDocuments()
            .then(setDocuments)
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <TopBar />
            <div className="min-h-screen p-8 bg-gray-50">
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-4">My Files</h2>
                    {loading && <p>Loading documents...</p>}
                    {error && <p className="text-red-600">{error.message}</p>}
                    {!loading && !error && documents.length === 0 && <p>No files found.</p>}
                    <ul className="space-y-4">
                        {documents.map((doc, i) => (
                            <li key={i} className="border p-4 rounded-lg shadow-sm">
                                {/* <p><strong>File Name:</strong> {doc.file_name}</p>
              <p><strong>Pages:</strong> {doc.pages}</p> */}
                                <p><strong>Language:</strong> {doc.to}</p>
                                {doc.file && (
                                    <p>
                                        <a
                                            href={doc.file}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            File Link
                                        </a>
                                    </p>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
} 
