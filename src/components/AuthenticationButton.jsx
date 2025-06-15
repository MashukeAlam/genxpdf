import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "./features/AuthContext";
import { useNavigate } from "react-router-dom";
import AuthModal from "./features/modals/AuthModal";

export default function AuthenticationButton() {
  const { setIsOpen } = useAuth();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const expiredAt = localStorage.getItem("expired_at");

    if (expiredAt && expiredAt < Date.now()) {
      handleLogout();
    }

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

  const toggleModal = () => {
    setIsOpen(true);
  }

  return (
    <div className="navbar-btn d-sm-inline-block relative" ref={dropdownRef}>
      {user ? (
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white rounded-full shadow border focus:outline-none w-full sm:w-auto"
          >
            <img
              src={user.image}
              alt={user.name}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
            />
            <span className="text-xs sm:text-sm font-medium truncate max-w-[120px] sm:max-w-[150px]">
              {user.name}
            </span>
            <svg
              className={`w-3 h-3 sm:w-4 sm:h-4 ml-1 transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-full sm:w-44 bg-white border rounded-lg shadow-lg z-10">
              <button
                className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-100 transition-colors"
                onClick={() => {
                  setDropdownOpen(false);
                  navigate("/profile");
                }}
              >
                Profile
              </button>
              <button
                className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-100 transition-colors"
                onClick={() => {
                  setDropdownOpen(false);
                  navigate("/myfiles");
                }}
              >
                My Files
              </button>
              <button
                className="w-full text-left px-4 py-2.5 text-sm bg-red-500 text-white hover:bg-red-600 transition-colors"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (<>
        <button
          className="main-btn px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
          data-scroll-nav={0}
          onClick={() => setIsOpen(true)}
          rel="nofollow"
        >
          Join
        </button>
        </>
      )}
    </div>
  );
}