import React from "react";
import { useAuth } from "./features/AuthContext";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import AuthenticationButton from "./AuthenticationButton";
import TopBar from "./TopBar";

export default function Header() {
  // const { setIsOpen, username } = useAuth();
  // const [user, setUser] = useState(null);
    // const [dropdownOpen, setDropdownOpen] = useState(false);
    // const dropdownRef = useRef();
  
    // useEffect(() => {
    //   const userData = localStorage.getItem("user");
    //   if (userData) {
    //     try {
    //       setUser(JSON.parse(userData));
    //     } catch {
    //       localStorage.removeItem("user");
    //     }
    //   }
  
    //   const handleClickOutside = (e) => {
    //     if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
    //       setDropdownOpen(false);
    //     }
    //   };
    //   document.addEventListener("mousedown", handleClickOutside);
    //   return () => document.removeEventListener("mousedown", handleClickOutside);
    // }, []);
  
    // const handleLogout = () => {
    //   localStorage.removeItem("user");
    //   localStorage.removeItem("access_token");
    //   setUser(null);
    //   setDropdownOpen(false);
    // };
  

  return (
    <header className="header-area">
      
      <div
        id="home"
        className="header-hero bg_cover"
        style={{ backgroundImage: "url(assets/images/header/banner-bg.svg)" }}
      >
        <TopBar />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="header-hero-content text-center">
                <h3
                  className="header-sub-title wow fadeInUp"
                  data-wow-duration="1.3s"
                  data-wow-delay="0.2s"
                >
                </h3>
                <h2
                  className="header-title wow fadeInUp"
                  data-wow-duration="1.3s"
                  data-wow-delay="0.5s"
                >
                  Your Ultimate Document Toolkit
                  <span className="app-name">Smarter, Faster, Easier!{" "}</span>
                </h2>
                <p
                  className="text wow fadeInUp"
                  data-wow-duration="1.3s"
                  data-wow-delay="0.8s"
                >
                  Translate, Merge, Scan, and Create documents seamlessly inseconds.
                </p>
                <Link
                  to="/features"
                  className="main-btn wow fadeInUp"
                  data-wow-duration="1.3s"
                  data-wow-delay="1.1s"
                >
                  Try Now for Free
                </Link>
              </div>
              {/* header hero content */}
            </div>
          </div>
          {/* row */}
          <div className="row">
            <div className="col-lg-12">
              <div
                className="header-hero-image text-center wow fadeIn"
                data-wow-duration="1.3s"
                data-wow-delay="1.4s"
              >
                <div style={{ height: "400px" }} /> {/* Adjust height as needed */}
              </div>
              {/* header hero image */}
            </div>
          </div>
          {/* row */}
        </div>
        {/* container */}
        {/* container */}
        <div id="particles-1" className="particles" />
      </div>
      {/* header hero */}
    </header>
  );
}
