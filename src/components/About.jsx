import React from "react";
import { useQrGenerator } from "./features/QrGeneratorContext";
import { useQrScanner } from "./features/QrScannerContext";
import { useIdScanner } from "./features/IdScannerContext";

export default function About() {
  const { setIsOpen: setGeneratorIsOpen } = useQrGenerator();
  const { setIsOpen: setScannerIsOpen } = useQrScanner();
  const { setIsOpen: setIdScannerIsOpen } = useIdScanner();

  return (
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
                  Whether you're merging PDFs, generating or scanning QR codes,
                  or converting images to documents — Genx PDF handles it all in
                  a few clicks. Designed to be intuitive for beginners and
                  efficient for power users.
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

      <div id="idscan" className="about-area pt-70">
        <div className="container">
          <div className="row flex-lg-row-reverse">
            <div className="col-lg-6">
              <div
                className="about-content mt-50 wow fadeInLeftBig"
                data-wow-duration="1s"
                data-wow-delay="0.5s"
              >
                <div className="section-title">
                  <div className="line" />
                  <h3 className="title">
                  Scan IDs in <span>Seconds</span>
                  </h3>
                </div>
                <p className="text">
                Capture both sides, verify instantly, and export a single image — all from your browser.
                </p>
                <a
                  className="main-btn"
                  onClick={() => setIdScannerIsOpen(true)}
                >
                  Scan ID
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
                  src="assets/images/about/about1.svg"
                  alt="QR Code Generator"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="about-shape-1">
          <img src="assets/images/about/about-shape-1.svg" alt="shape" />
        </div>
      </div>


      <div id="qr" className="about-area pt-70">
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
                    QR Code <span>Generator</span>
                  </h3>
                </div>
                <p className="text">
                  Create high-quality QR codes in seconds. Customize, download,
                  and use them for links, text, or any information you need to
                  encode.
                </p>
                <a
                  className="main-btn"
                  onClick={() => setGeneratorIsOpen(true)}
                >
                  Generate Now
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
                  src="assets/images/about/about2.svg"
                  alt="QR Code Generator"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="about-shape-1">
          <img src="assets/images/about/about-shape-1.svg" alt="shape" />
        </div>
      </div>

      <div className="about-area pt-70">
        <div className="container">
          <div className="row flex-lg-row-reverse">
            <div className="col-lg-6">
              <div
                className="about-content mt-50 wow fadeInRightBig"
                data-wow-duration="1s"
                data-wow-delay="0.5s"
              >
                <div className="section-title">
                  <div className="line" />
                  <h3 className="title">
                    QR Code <span>Scanner</span>
                  </h3>
                </div>
                <p className="text">
                  Instantly scan QR codes using your camera. Works directly in
                  your browser with no need to download any app or plugin.
                </p>
                <a onClick={() => setScannerIsOpen(true)} className="main-btn">
                  Scan Now
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="about-image text-center mt-50 wow fadeInLeftBig"
                data-wow-duration="1s"
                data-wow-delay="0.5s"
              >
                <img
                  src="assets/images/about/about3.svg"
                  alt="QR Code Scanner"
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
  );
}
