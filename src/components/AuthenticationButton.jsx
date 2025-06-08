import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "./features/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AuthenticationButton() {
  const { setIsOpen } = useAuth();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch {
        localStorage.removeItem("user");
      }
    }

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    setUser(null);
    setDropdownOpen(false);
  };

  return (
    <div className="navbar-btn d-none d-sm-inline-block relative" ref={dropdownRef}>
      {user ? (
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow border focus:outline-none"
          >
            <img
              src={user.image}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium">{user.name}</span>
            <svg
              className={`w-4 h-4 ml-1 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow z-10">
              <button
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => {
                  setDropdownOpen(false);
                  navigate("/profile");
                }}
              >
                Profile
              </button>
              <button
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => {
                  setDropdownOpen(false);
                  navigate("/myfiles");
                }}
              >
                My Files
              </button>
              <button
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          className="main-btn"
          data-scroll-nav={0}
          onClick={() => setIsOpen(true)}
          rel="nofollow"
        >
          Join
        </button>
      )}
    </div>
  );
}
