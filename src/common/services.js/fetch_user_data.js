export async function fetchAndStoreUser() {
  const token = localStorage.getItem("access_token");
  if (!token) return null;

  const formData = new FormData();

  const res = await fetch("https://awaitanthony.com/genuityx/api/v1/user", {
    method: "POST",
    headers: {
      "x-api-key": import.meta.env.VITE_API_KEY,
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();
  if (res.ok && data.status !== false) {
    localStorage.setItem("user_data", JSON.stringify(data.data));
    return data.data;
  } else {
    console.error("Failed to fetch user data:", data.message);
    return null;
  }
}
