import React, { useState } from "react";
import { useAuth } from "../AuthContext";

const API_BASE = "https://awaitanthony.com/genuityx/api/v1";
const API_KEY = import.meta.env.VITE_API_KEY;

export default function AuthModal() {
  const { isOpen, setIsOpen, modalRef, username, profilePicture, setCurrentUser } = useAuth();
  
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    device_token: "web-frontend",
    provider: "email"
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url = `${API_BASE}/${isSignup ? "signup" : "signin"}`;

    const body = new FormData();
    for (const key in form) {
      if (isSignup || (!isSignup && ["email", "password", "device_token", "provider"].includes(key))) {
        body.append(key, form[key]);
      }
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "x-api-key": API_KEY,
        },
        body,
      });
      const data = await res.json();

      if (res.ok && data.status) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.data));
        localStorage.setItem("expired_at", Date.now() + (60 * 60 * 1000));
        
        if (setCurrentUser) setCurrentUser(data.data);
        setMessage("Success! You're logged in.");
        setIsError(false);
        setTimeout(() => setIsOpen(false), 1500);
        window.location.reload();
      } else {
        setMessage(data.message || "Authentication failed");
        setIsError(true);
      }
    } catch (err) {
      console.error("Auth error:", err);
      setMessage("Something went wrong.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "flex" : "hidden"} items-center justify-center bg-black bg-opacity-50`}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {isSignup ? "Create an account" : "Welcome back"}
        </h2>
        {message && (
          <div className={`mb-4 text-sm text-center px-4 py-2 rounded ${isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          {isSignup && (
            <input
              type="password"
              name="password_confirmation"
              placeholder="Confirm Password"
              value={form.password_confirmation}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </div>
            ) : (
              <>{isSignup ? "Sign Up" : "Sign In"}</>
            )}
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          {isSignup ? (
            <>Already have an account? <button className="text-blue-600" onClick={() => setIsSignup(false)}>Sign In</button></>
          ) : (
            <>Don't have an account? <button className="text-blue-600" onClick={() => setIsSignup(true)}>Sign Up</button></>
          )}
        </p>
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
          onClick={() => setIsOpen(false)}
        >
          ×
        </button>
      </div>
    </div>
  );
}