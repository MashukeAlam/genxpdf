import { useEffect, useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import QRCode from "react-qr-code";
import "./App.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/animate.css";
import "./assets/css/glightbox.min.css";
import "./assets/css/lineicons.css";
import "./assets/css/style.css";



function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [qrText, setQrText] = useState("Hello, QR!");
  const modalRef = useRef(null);
  const bootstrapModalRef = useRef(null);
  const qrRef = useRef();
  
  const handleDownload = () => {
      if (!qrRef.current) return;
      htmlToImage
        .toPng(qrRef.current)
        .then((dataUrl) => {
            const link = document.createElement("a");
            link.download = "qr-code.png";
            link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
          console.error("Failed to download QR code:", err);
        });
    };

  useEffect(() => {
    if (!modalRef.current) return;
    const bootstrap = window.bootstrap;
    if (!bootstrap) return;

    if (!bootstrapModalRef.current) {
      bootstrapModalRef.current = new bootstrap.Modal(modalRef.current);
    }

    if (isOpen) {
      bootstrapModalRef.current.show();
    } else {
      bootstrapModalRef.current.hide();
    }
  }, [isOpen]);

  return (
    <>
      <div className="preloader">
        <div className="loader">
          <div className="spinner">
            <div className="spinner-container">
              <div className="spinner-rotator">
                <div className="spinner-left">
                  <div className="spinner-circle" />
                </div>
                <div className="spinner-right">
                  <div className="spinner-circle" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*====== PRELOADER PART ENDS ======*/}
      {/*====== HEADER PART START ======*/}
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
                      <li className="nav-item">
                        <a className="page-scroll" href="#facts">
                          Why
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* navbar collapse */}
                  <div className="navbar-btn d-none d-sm-inline-block">
                    <a
                      className="main-btn"
                      data-scroll-nav={0}
                      href="https://uideck.com/templates/basic/"
                      rel="nofollow"
                    >
                      Download Now
                    </a>
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
                    href="javascript:void(0)"
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
      {/*====== HEADER PART ENDS ======*/}
      {/*====== BRAND PART START ======*/}
      <div className="brand-area pt-90">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="
          brand-logo
          d-flex
          align-items-center
          justify-content-center justify-content-md-between
        "
              >
                <div
                  className="single-logo mt-30 wow fadeIn"
                  data-wow-duration="1s"
                  data-wow-delay="0.2s"
                >
                  <img src="assets/images/brands/uideck.svg" alt="brand" />
                </div>
                {/* single logo */}
                <div
                  className="single-logo mt-30 wow fadeIn"
                  data-wow-duration="1.5s"
                  data-wow-delay="0.2s"
                >
                  <img src="assets/images/brands/ayroui.svg" alt="brand" />
                </div>
                {/* single logo */}
                <div
                  className="single-logo mt-30 wow fadeIn"
                  data-wow-duration="1.5s"
                  data-wow-delay="0.3s"
                >
                  <img src="assets/images/brands/graygrids.svg" alt="brand" />
                </div>
                {/* single logo */}
                <div
                  className="single-logo mt-30 wow fadeIn"
                  data-wow-duration="1.5s"
                  data-wow-delay="0.4s"
                >
                  <img src="assets/images/brands/lineicons.svg" alt="brand" />
                </div>
                {/* single logo */}
                <div
                  className="single-logo mt-30 wow fadeIn"
                  data-wow-duration="1.5s"
                  data-wow-delay="0.5s"
                >
                  <img
                    src="assets/images/brands/ecommerce-html.svg"
                    alt="brand"
                  />
                </div>
                {/* single logo */}
              </div>
              {/* brand logo */}
            </div>
          </div>
          {/* row */}
        </div>
        {/* container */}
      </div>
      {/*====== BRAND PART ENDS ======*/}
      {/*====== FEATURES SECTION START ======*/}
      <section id="features" className="services-area pt-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="section-title text-center pb-40">
                <div className="line m-auto" />
                <h3 className="title">
                  Unlock Seamless Document Translation,
                  <span> Tailored for simplicity and speed!</span>
                </h3>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-3 col-md-7 col-sm-8">
              <div
                className="single-services text-center mt-30 wow fadeIn"
                data-wow-duration="1s"
                data-wow-delay="0.2s"
              >
                <div className="services-icon">
                  <img
                    className="shape"
                    src="assets/images/services/services-shape.svg"
                    alt="shape"
                  />
                  <img
                    className="shape-1"
                    src="assets/images/services/services-shape-1.svg"
                    alt="shape"
                  />
                  <i className="lni lni-world"></i>
                </div>
                <div className="services-content mt-30">
                  <h4 className="services-title">
                    <a href="javascript:void(0)">Global Reach</a>
                  </h4>
                  <p className="text">
                    Translate PDFs into over 100+ languages with ease. Break
                    barriers and communicate globally with just a tap.
                  </p>
                  <a className="more" href="javascript:void(0)">
                    Learn More <i className="lni lni-chevron-right"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-7 col-sm-8">
              <div
                className="single-services text-center mt-30 wow fadeIn"
                data-wow-duration="1s"
                data-wow-delay="0.5s"
              >
                <div className="services-icon">
                  <img
                    className="shape"
                    src="assets/images/services/services-shape.svg"
                    alt="shape"
                  />
                  <img
                    className="shape-1"
                    src="assets/images/services/services-shape-2.svg"
                    alt="shape"
                  />
                  <i className="lni lni-cog"></i>
                </div>
                <div className="services-content mt-30">
                  <h4 className="services-title">
                    <a href="javascript:void(0)">Smart & Accurate</a>
                  </h4>
                  <p className="text">
                    Powered by cutting-edge AI, enjoy translations that preserve
                    meaning, formatting, and context.
                  </p>
                  <a className="more" href="javascript:void(0)">
                    Learn More <i className="lni lni-chevron-right"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-7 col-sm-8">
              <div
                className="single-services text-center mt-30 wow fadeIn"
                data-wow-duration="1s"
                data-wow-delay="0.8s"
              >
                <div className="services-icon">
                  <img
                    className="shape"
                    src="assets/images/services/services-shape.svg"
                    alt="shape"
                  />
                  <img
                    className="shape-1"
                    src="assets/images/services/services-shape-4.svg"
                    alt="shape"
                  />
                  <i className="lni lni-bolt-alt"></i>
                </div>
                <div className="services-content mt-30">
                  <h4 className="services-title">
                    <a href="javascript:void(0)">Handle All Document Needs</a>
                  </h4>
                  <p className="text">
                    Effortlessly scan, convert, merge, and create — from ID
                    cards to multi-page PDFs
                  </p>
                  <a className="more" href="javascript:void(0)">
                    Learn More <i className="lni lni-chevron-right"></i>
                  </a>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-7 col-sm-8"
              onClick={() => setIsOpen(true)}
              style={{ cursor: "pointer" }}
            >
              <div
                className="single-services text-center mt-30 wow fadeIn"
                data-wow-duration="1s"
                data-wow-delay="0.8s"
              >
                <div className="services-icon">
                  <img
                    className="shape"
                    src="assets/images/services/services-shape.svg"
                    alt="shape"
                  />
                  <img
                    className="shape-1"
                    src="assets/images/services/services-shape-3.svg"
                    alt="shape"
                  />
                  <i className="lni lni-bolt-alt"></i>
                </div>
                <div className="services-content mt-30">
                  <h4 className="services-title">
                    <a onClick={() => setIsOpen(true)}>QR Code with Ease</a>
                  </h4>
                  <p className="text">
                    Generate QR Code or Scan them right on this webpage
                    instantly, it doesn't get any fluent
                  </p>
                  <a className="more" onClick={() => setIsOpen(true)}>
                    Learn More <i className="lni lni-chevron-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== FEATURES SECTION ENDS ======*/}

      {/* Modal for QR Code. */}
      <div
        className="modal fade"
        tabIndex="-1"
        ref={modalRef}
        aria-labelledby="qrModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-3">
            <div className="modal-header">
              <h5 className="modal-title" id="qrModalLabel">
                Generate QR Code
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setIsOpen(false)}
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control mb-3"
                value={qrText}
                onChange={(e) => setQrText(e.target.value)}
                placeholder="Enter text"
              />
              <div className="d-flex justify-content-center bg-light p-3 rounded">
                <div ref={qrRef}>
                  <QRCode value={qrText} />
                </div>
              </div>
            </div>
            <div className="modal-footer d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>

              <button
          type="button"
          className="btn btn-primary"
          onClick={handleDownload}
        >
          Download QR Code
        </button>
            </div>
          </div>
        </div>
      </div>

      <section id="about">
        {/*====== ABOUT PART START ======*/}
        <div className="about-area pt-70">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div
                  className="about-content mt-50 wow fadeInLeftBig"
                  data-wow-duration="1s"
                  data-wow-delay="0.5s"
                >
                  <div className="section-title">
                    <div className="line" />
                    <h3 className="title">
                      All-in-One <span>Document Toolkit</span>
                    </h3>
                  </div>
                  {/* section title */}
                  <p className="text">
                    Say goodbye to switching between apps. With{" "}
                    <strong>Genx PDF</strong>, you can translate PDFs or plain
                    text, convert documents to PDF, extract text using OCR, and
                    even create ID cards — all from one sleek, easy-to-use
                    platform.
                  </p>
                  <a href="javascript:void(0)" className="main-btn">
                    Try it Free
                  </a>
                </div>
                {/* about content */}
              </div>
              <div className="col-lg-6">
                <div
                  className="about-image text-center mt-50 wow fadeInRightBig"
                  data-wow-duration="1s"
                  data-wow-delay="0.5s"
                >
                  <img
                    src="assets/images/about/about1.svg"
                    alt="All-in-One Toolkit"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="about-shape-1">
            <img src="assets/images/about/about-shape-1.svg" alt="shape" />
          </div>
        </div>

        {/*====== ABOUT PART START ======*/}
        <div className="about-area pt-70">
          <div className="about-shape-2">
            <img src="assets/images/about/about-shape-2.svg" alt="shape" />
          </div>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 order-lg-last">
                <div
                  className="about-content ms-lg-auto mt-50 wow fadeInLeftBig"
                  data-wow-duration="1s"
                  data-wow-delay="0.5s"
                >
                  <div className="section-title">
                    <div className="line" />
                    <h3 className="title">
                      Modern Simplicity <span>with Powerful Features</span>
                    </h3>
                  </div>
                  <p className="text">
                    Whether you're merging PDFs, generating or scanning QR
                    codes, or converting images to documents — Genx PDF handles
                    it all in a few clicks. Designed to be intuitive for
                    beginners and efficient for power users.
                  </p>
                  <a href="javascript:void(0)" className="main-btn">
                    Try it Free
                  </a>
                </div>
              </div>
              <div className="col-lg-6 order-lg-first">
                <div
                  className="about-image text-center mt-50 wow fadeInRightBig"
                  data-wow-duration="1s"
                  data-wow-delay="0.5s"
                >
                  <img
                    src="assets/images/about/about2.svg"
                    alt="Modern Simplicity"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*====== ABOUT PART START ======*/}
        <div className="about-area pt-70">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div
                  className="about-content mt-50 wow fadeInLeftBig"
                  data-wow-duration="1s"
                  data-wow-delay="0.5s"
                >
                  <div className="section-title">
                    <div className="line" />
                    <h3 className="title">
                      Built for <span>Productivity and Speed</span>
                    </h3>
                  </div>
                  <p className="text">
                    Genx PDF is crafted for everyday users, students,
                    professionals, and teams. It brings together the essential
                    tools you need — without the clutter. Everything runs fast,
                    smooth, and online — no installation required.
                  </p>
                  <a href="javascript:void(0)" className="main-btn">
                    Try it Free
                  </a>
                </div>
              </div>
              <div className="col-lg-6">
                <div
                  className="about-image text-center mt-50 wow fadeInRightBig"
                  data-wow-duration="1s"
                  data-wow-delay="0.5s"
                >
                  <img
                    src="assets/images/about/about3.svg"
                    alt="Built for Productivity"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="about-shape-1">
            <img src="assets/images/about/about-shape-1.svg" alt="shape" />
          </div>
        </div>
      </section>

      {/*====== VIDEO COUNTER PART ENDS ======*/}
      {/*====== FOOTER PART START ======*/}
      <footer id="footer" className="footer-area pt-120">
        <div className="container">
          <div
            className="subscribe-area wow fadeIn"
            data-wow-duration="1s"
            data-wow-delay="0.5s"
          >
            <div className="row">
              <div className="col-lg-6">
                <div className="subscribe-content mt-45">
                  <h2 className="subscribe-title">
                    Subscribe Our Newsletter <span>get reguler updates</span>
                  </h2>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="subscribe-form mt-50">
                  <form action="#">
                    <input type="text" placeholder="Enter eamil" />
                    <button className="main-btn">Subscribe</button>
                  </form>
                </div>
              </div>
            </div>
            {/* row */}
          </div>
          {/* subscribe area */}
          <div className="footer-widget pb-100">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-8">
                <div
                  className="footer-about mt-50 wow fadeIn"
                  data-wow-duration="1s"
                  data-wow-delay="0.2s"
                >
                  <a className="logo" href="javascript:void(0)">
                    <img src="assets/images/logo/logo.svg" alt="logo" />
                  </a>
                  <p className="text">
                    Lorem ipsum dolor sit amet consetetur sadipscing elitr,
                    sederfs diam nonumy eirmod tempor invidunt ut labore et
                    dolore magna aliquyam.
                  </p>
                  <ul className="social">
                    <li>
                      <a href="javascript:void(0)">
                        <i className="lni lni-facebook-filled"> </i>
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">
                        <i className="lni lni-twitter-filled"> </i>
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">
                        <i className="lni lni-instagram-filled"> </i>
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">
                        <i className="lni lni-linkedin-original"> </i>
                      </a>
                    </li>
                  </ul>
                </div>
                {/* footer about */}
              </div>
              <div className="col-lg-5 col-md-7 col-sm-12">
                <div className="footer-link d-flex mt-50 justify-content-sm-between">
                  <div
                    className="link-wrapper wow fadeIn"
                    data-wow-duration="1s"
                    data-wow-delay="0.4s"
                  >
                    <div className="footer-title">
                      <h4 className="title">Quick Link</h4>
                    </div>
                    <ul className="link">
                      <li>
                        <a href="javascript:void(0)">Road Map</a>
                      </li>
                      <li>
                        <a href="javascript:void(0)">Privacy Policy</a>
                      </li>
                      <li>
                        <a href="javascript:void(0)">Refund Policy</a>
                      </li>
                      <li>
                        <a href="javascript:void(0)">Terms of Service</a>
                      </li>
                      <li>
                        <a href="javascript:void(0)">Pricing</a>
                      </li>
                    </ul>
                  </div>
                  {/* footer wrapper */}
                  <div
                    className="link-wrapper wow fadeIn"
                    data-wow-duration="1s"
                    data-wow-delay="0.6s"
                  >
                    <div className="footer-title">
                      <h4 className="title">Resources</h4>
                    </div>
                    <ul className="link">
                      <li>
                        <a href="javascript:void(0)">Home</a>
                      </li>
                      <li>
                        <a href="javascript:void(0)">Page</a>
                      </li>
                      <li>
                        <a href="javascript:void(0)">Portfolio</a>
                      </li>
                      <li>
                        <a href="javascript:void(0)">Blog</a>
                      </li>
                      <li>
                        <a href="javascript:void(0)">Contact</a>
                      </li>
                    </ul>
                  </div>
                  {/* footer wrapper */}
                </div>
                {/* footer link */}
              </div>
              <div className="col-lg-3 col-md-5 col-sm-12">
                <div
                  className="footer-contact mt-50 wow fadeIn"
                  data-wow-duration="1s"
                  data-wow-delay="0.8s"
                >
                  <div className="footer-title">
                    <h4 className="title">Contact Us</h4>
                  </div>
                  <ul className="contact">
                    <li>+809272561823</li>
                    <li>info@gmail.com</li>
                    <li>www.yourweb.com</li>
                    <li>
                      123 Stree New York City , United <br />
                      States Of America 750.
                    </li>
                  </ul>
                </div>
                {/* footer contact */}
              </div>
            </div>
            {/* row */}
          </div>
          {/* footer widget */}
          <div className="footer-copyright">
            <div className="row">
              <div className="col-lg-12">
                <div className="copyright d-sm-flex justify-content-between">
                  <div className="copyright-content">
                    <p className="text">
                      Designed and Developed by
                      <a href="https://uideck.com" rel="nofollow">
                        UIdeck
                      </a>
                    </p>
                  </div>
                  {/* copyright content */}
                </div>
                {/* copyright */}
              </div>
            </div>
            {/* row */}
          </div>
          {/* footer copyright */}
        </div>
        {/* container */}
        <div id="particles-2" />
      </footer>
      {/*====== FOOTER PART ENDS ======*/}
      {/*====== BACK TOP TOP PART START ======*/}
      <a href="#" className="back-to-top">
        {" "}
        <i className="lni lni-chevron-up"> </i>{" "}
      </a>
      {/*====== BACK TOP TOP PART ENDS ======*/}
      {/*====== Javascript Files ======*/}
    </>
  );
}

export default App;
