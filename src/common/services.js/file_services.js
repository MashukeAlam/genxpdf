// src/services/documentService.js
const API_BASE = import.meta.env.VITE_BACKEND_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export async function fetchAllDocuments() {
  const token = localStorage.getItem("access_token");
  try {
    const response = await fetch(`${API_BASE}/documents`, {
      method: "POST",
      headers: {
        "x-api-key": API_KEY,
        "Authorization": `Bearer ${token}`,
      },
    });

    const json = await response.json();
    if (!response.ok || !json.status) {
      throw new Error(json.message || "Failed to fetch documents");
    }

    console.log(json.data);
    

    return json.data;
  } catch (error) {
    console.error("fetchAllDocuments error:", error);
    throw error;
  }
}
