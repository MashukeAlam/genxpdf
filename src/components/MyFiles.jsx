import React, { useEffect, useState } from "react";
import { fetchAllDocuments } from "../common/services.js/file_services";
import TopBar from "./TopBar";
import { getLanguageNameByCode } from "../common/services.js/language";
import Footer from "./Footer";
import { homePath } from "../common/breadcrumb_paths";

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
            <div className="bg-[url('assets/images/header/banner-bg.svg')] bg-cover bg-center min-h-screen flex flex-col items-center justify-center p-6 lg:p-8 overflow-hidden">
                <TopBar breadcrumb={true} breadcrumbPaths={[...homePath, {label: "My Files", href: "/myfiles"}]} />
                <div className="flex-grow w-full max-w-7xl bg-white/80 backdrop-blur-md border border-blue-200/30 rounded-2xl shadow-lg p-6 lg:p-8">
                    <h2 className="text-3xl font-bold text-blue-900 mb-6">My Files</h2>
                    {loading && <p className="text-gray-600 text-center">Loading documents...</p>}
                    {error && <p className="text-red-500 text-center">{error.message}</p>}
                    {!loading && !error && documents.length === 0 && (
                        <p className="text-gray-600 text-center">No files found.</p>
                    )}
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto border-collapse">
                            <thead>
                                <tr className="bg-blue-50/50">
                                    <th className="px-4 py-3 text-left text-sm font-medium text-blue-900">File Name</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-blue-900">Language</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-blue-900">Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documents.map((doc, i) => (
                                    <tr
                                        key={i}
                                        className="border-b border-blue-100/50 hover:bg-blue-50/30 transition-colors"
                                    >
                                        <td className="px-4 py-2.5 text-sm text-gray-700">
                                            {doc.file_name || "Untitled"}
                                        </td>
                                        {/* <td className="px-4 py-2.5 text-sm text-gray-700">
                                            {doc.pages || "N/A"}
                                        </td> */}
                                        <td className="px-4 py-2.5 text-sm text-gray-700">
                                            {doc.to ? getLanguageNameByCode(doc.to) : "N/A"}
                                        </td>
                                        <td className="px-4 py-2.5 text-sm">
                                            {doc.file ? (
                                                <a
                                                    href={doc.file}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                                >
                                                    View File
                                                </a>
                                            ) : (
                                                "N/A"
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}