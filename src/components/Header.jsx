import React from "react";
import { useAuth } from "./features/AuthContext";

export default function Header() {
  const {setIsOpen, username} = useAuth();
  return (
    <header className="header-area">
      <div className="navbar-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand" href="index.html">
                  <img src="assets/images/logo/logo.svg" alt="Logo" />
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="toggler-icon"> </span>
                  <span className="toggler-icon"> </span>
                  <span className="toggler-icon"> </span>
                </button>
                <div
                  className="collapse navbar-collapse sub-menu-bar"
                  id="navbarSupportedContent"
                >
                  <ul id="nav" className="navbar-nav ms-auto">
                    <li className="nav-item">
                      <a className="page-scroll active" href="#home">
                        Home
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="page-scroll" href="#features">
                        Features
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="page-scroll" href="#about">
                        About
                      </a>
                    </li>
                  </ul>
                </div>
                {/* navbar collapse */}
                <div className="navbar-btn d-none d-sm-inline-block">
                  {username.current ? (
                    <a
                    className="main-btn"
                    data-scroll-nav={0}
                    rel="nofollow"
                  >
                    {username.current}
                  </a>
                  ) : (
                    <a
                    className="main-btn"
                    data-scroll-nav={0}
                    onClick={() => setIsOpen(true)}
                    rel="nofollow"
                  >
                    Join
                  </a>
                  )}
                  
                </div>
              </nav>
              {/* navbar */}
            </div>
          </div>
          {/* row */}
        </div>
        {/* container */}
      </div>
      {/* navbar area */}
      <div
        id="home"
        className="header-hero bg_cover"
        style={{ backgroundImage: "url(assets/images/header/banner-bg.svg)" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="header-hero-content text-center">
                <h3
                  className="header-sub-title wow fadeInUp"
                  data-wow-duration="1.3s"
                  data-wow-delay="0.2s"
                >
                  Powerful. Simple. Seamless.
                </h3>
                <h2
                  className="header-title wow fadeInUp"
                  data-wow-duration="1.3s"
                  data-wow-delay="0.5s"
                >
                  Your Documents, Done Right — with{" "}
                  <span className="app-name">Genx PDF</span>
                </h2>
                <p
                  className="text wow fadeInUp"
                  data-wow-duration="1.3s"
                  data-wow-delay="0.8s"
                >
                  Create, convert, and organize PDFs faster than ever. One app
                  to handle all your document needs with ease and elegance.
                </p>
                <a
                onClick={() => {
                  const target = document.getElementById("features");
                  if (target) target.scrollIntoView({ behavior: "smooth" });
                }}
                  className="main-btn wow fadeInUp"
                  data-wow-duration="1.3s"
                  data-wow-delay="1.1s"
                >
                  Get Started
                </a>
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
                <img src="assets/images/header/header-hero.png" alt="hero" />
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
