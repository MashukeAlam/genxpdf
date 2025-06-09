const API_BASE = import.meta.env.VITE_BACKEND_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export async function uploadGenericDocument(file, pages = 1, file_name = "Untitled") {
  const accessToken = localStorage.getItem("access_token");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("pages", pages);
  formData.append("title", file_name)

  try {
    const response = await fetch(`${API_BASE}/documents/create`, {
      method: "POST",
      headers: {
        "x-api-key": API_KEY,
        "Authorization": `Bearer ${accessToken}`,
      },
      body: formData,
    });

    const result = await response.json();
    console.log("Non-PDF Upload Response:", result);
    return result;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
}
