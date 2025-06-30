import React, { useState, useEffect } from "react";
import TopBar from "./TopBar";
import Footer from "./Footer";
import { homePath } from "../common/breadcrumb_paths";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_BASE = import.meta.env.VITE_BACKEND_API_BASE_URL;

export default function AboutModern() {
  const [appDetails, setAppDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pages, setPages] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setPages(JSON.parse(localStorage.getItem("user_data")).pages);
    }
  }, []);

  useEffect(() => {
    const fetchAboutData = async () => {
      const formData = new FormData();
      formData.append("platform", "about");

      try {
        const res = await fetch(`${API_BASE}/settings`, {
          method: "POST",
          headers: {
            "x-api-key": API_KEY,
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: formData,
        });

        const data = await res.json();
        console.log("About fetch response:", data);
        if (data.status && data.data) {
          setAppDetails(data.data);
        } else {
          setError(data.message || "No about information available");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching about information");
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  return (
    <>
      <div className="bg-[url('assets/images/header/banner-bg.svg')] bg-cover bg-center min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
        <TopBar
          pages={pages}
          breadcrumb={true}
          breadcrumbPaths={[...homePath, { label: "About", href: "/about" }]}
        />
        <div className="flex-grow w-full max-w-3xl bg-white/80 backdrop-blur-md border border-blue-200/30 rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 mt-4">
          <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">About</h2>
          {loading ? (
            <p className="text-center text-sm text-gray-600">Loading...</p>
          ) : error ? (
            <p className="text-center text-sm text-red-500">{error}</p>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="hidden text-xl font-semibold text-blue-900">App Details</h3>
                <div className="hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-blue-900">App Name</p>
                    <p className="text-gray-700">{appDetails.app_name || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-900">Timezone</p>
                    <p className="text-gray-700">{appDetails.timezone || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-900">Language</p>
                    <p className="text-gray-700">{appDetails.language || "N/A"}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-900 mb-1">About</p>
                  <div
                    className="w-full border border-blue-300 rounded-lg px-4 py-2.5 text-gray-700 bg-gray-50 min-h-[100px]"
                    dangerouslySetInnerHTML={{ __html: appDetails.about || "No about information available" }}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-900">Contact Us</h3>
                <div>
                  <p className="text-sm font-medium text-blue-900">Email</p>
                  <p className="text-gray-700">{appDetails.contact_us || "N/A"}</p>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-900">Social Media</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-blue-900">Facebook</p>
                    <a
                      href={appDetails.facebook || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-gray-700"
                    >
                      {appDetails.facebook || "N/A"}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-900">Instagram</p>
                    <a
                      href={appDetails.instagram || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-gray-700"
                    >
                      {appDetails.instagram || "N/A"}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-900">Telegram</p>
                    <a
                      href={appDetails.telegram || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-gray-700"
                    >
                      {appDetails.telegram || "N/A"}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-900">YouTube</p>
                    <a
                      href={appDetails.youtube || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-gray-700"
                    >
                      {appDetails.youtube || "N/A"}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}