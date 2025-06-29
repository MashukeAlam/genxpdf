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
    const [pages, setPages] = useState(null);

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            setPages(JSON.parse(localStorage.getItem("user_data")).pages);
        }
    }, []);

    useEffect(() => {
        fetchAllDocuments()
            .then(setDocuments)
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <div className="bg-[url('assets/images/header/banner-bg.svg')] bg-cover bg-center min-h-screen flex flex-col items-center justify-start p-4 sm:p-6 lg:p-8 overflow-hidden">
                <TopBar pages={pages} breadcrumb={true} breadcrumbPaths={[...homePath, { label: "My Files", href: "/myfiles" }]} />
                <div className="flex-grow w-full max-w-4xl bg-white/80 backdrop-blur-md border border-blue-200/30 rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 mt-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4 sm:mb-6">My Files</h2>
                    {loading && <p className="text-gray-600 text-center text-sm sm:text-base">Loading documents...</p>}
                    {error && <p className="text-red-500 text-center text-sm sm:text-base">{error.message}</p>}
                    {!loading && !error && documents.length === 0 && (
                        <p className="text-gray-600 text-center text-sm sm:text-base">No files found.</p>
                    )}
                    <div className="overflow-x-auto">
                        <div className="hidden md:block">
                            <table className="w-full table-auto border-collapse">
                                <thead>
                                    <tr className="bg-blue-50/50">
                                        <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-blue-900">File Name</th>
                                        <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-blue-900">Language</th>
                                        <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-blue-900">Link</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {documents.map((doc, i) => (
                                        <tr
                                            key={i}
                                            className="border-b border-blue-100/50 hover:bg-blue-50/30 transition-colors"
                                        >
                                            <td className="px-4 py-2.5 text-xs sm:text-sm text-gray-700">
                                                {doc.title || "Untitled"}
                                            </td>
                                            <td className="px-4 py-2.5 text-xs sm:text-sm text-gray-700">
                                                {doc.to ? getLanguageNameByCode(doc.to) : "N/A"}
                                            </td>
                                            <td className="px-4 py-2.5 text-xs sm:text-sm">
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
                        <div className="md:hidden flex flex-col gap-4">
                            {documents.map((doc, i) => (
                                <div
                                    key={i}
                                    className="border border-blue-100/50 rounded-lg p-4 bg-white hover:bg-blue-50/30 transition-colors"
                                >
                                    <div className="flex flex-col gap-2">
                                        <div>
                                            <span className="text-xs font-medium text-blue-900">File Name:</span>
                                            <p className="text-sm text-gray-700">{doc.title || "Untitled"}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs font-medium text-blue-900">Language:</span>
                                            <p className="text-sm text-gray-700">
                                                {doc.to ? getLanguageNameByCode(doc.to) : "N/A"}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-xs font-medium text-blue-900">Link:</span>
                                            <p className="text-sm">
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
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}