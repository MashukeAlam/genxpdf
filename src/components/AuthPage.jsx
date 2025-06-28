import React, { useState } from "react";
import TopBar from "./TopBar";
import Footer from "./Footer";
import { useAuth } from "./features/AuthContext";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";

const API_BASE = import.meta.env.VITE_BACKEND_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const GOOGLE_CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    device_token: "web-frontend",
    provider: "email",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await authenticate(form);
  };

  const authenticate = async (formData) => {
    setLoading(true);
    const url = `${API_BASE}/${isSignup ? "signup" : "signin"}`;

    const body = new FormData();
    for (const key in formData) {
      if (isSignup || (!isSignup && ["email", "password", "device_token", "provider"].includes(key))) {
        body.append(key, formData[key]);
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
        localStorage.setItem("expired_at", Date.now() + 60 * 60 * 1000);

        setMessage("Success! You're logged in.");
        setIsError(false);
        const redirect_url = localStorage.getItem("redirect_url");

        if (redirect_url !== undefined) {
          localStorage.setItem("redirect_url", undefined);
          location.href = redirect_url;
          return;
        } else {
          window.location.reload();
        }
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

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);

    console.log(decoded);
    

    const googleForm = {
      name: decoded.name,
      email: decoded.email,
      password: decoded.sub, // not secure, but mimics backend
      password_confirmation: decoded.sub,
      device_token: "web-frontend",
      provider: "google",
    };

    authenticate(googleForm);
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="bg-[url('assets/images/header/banner-bg.svg')] bg-cover bg-center min-h-screen flex flex-col">
        <TopBar />
        <div className="flex-grow flex items-center justify-center p-6 lg:p-8">
          <div className="bg-white/80 backdrop-blur-md border border-blue-200/30 rounded-2xl shadow-lg p-8 w-full max-w-md sm:max-w-lg">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-6 text-center">
              {isSignup ? "Create an Account" : "Welcome Back"}
            </h2>

            {message && (
              <div
                className={`mb-6 text-sm text-center px-4 py-2 rounded ${
                  isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                }`}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {isSignup && (
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-blue-300 rounded-lg px-4 py-2.5"
                  required
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-blue-300 rounded-lg px-4 py-2.5"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full border border-blue-300 rounded-lg px-4 py-2.5"
                required
              />
              {isSignup && (
                <input
                  type="password"
                  name="password_confirmation"
                  placeholder="Confirm Password"
                  value={form.password_confirmation}
                  onChange={handleChange}
                  className="w-full border border-blue-300 rounded-lg px-4 py-2.5"
                  required
                />
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
                disabled={loading}
              >
                {loading ? "Processing..." : isSignup ? "Sign Up" : "Sign In"}
              </button>
            </form>

            {/* Google Login Button */}
            <div className="mt-4 text-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  setMessage("Google login failed");
                  setIsError(true);
                }}
              />
            </div>

            <p className="text-center mt-6 text-sm text-gray-600">
              {isSignup ? (
                <>
                  Already have an account?{" "}
                  <button className="text-blue-600 hover:underline font-medium" onClick={() => setIsSignup(false)}>
                    Sign In
                  </button>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <button className="text-blue-600 hover:underline font-medium" onClick={() => setIsSignup(true)}>
                    Sign Up
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </GoogleOAuthProvider>
  );
}
