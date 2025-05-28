import React from 'react'
import QrGeneratorFeature from './features/QrGeneratorFeature'
import IdScannerFeature from './features/IdScannerFeature'
import { Link } from 'react-router-dom'

export default function Features() {

  return (
    <>
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
                    <a href="javascript:void(0)">Amazing PDF Translator</a>
                  </h4>
                  <p className="text">
                    Instantly break language barriers in PDFs
                  </p>
                  <Link className="more" to="/pdf-translator">
                    Learn More <i className="lni lni-chevron-right"></i>
                  </Link>
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
                    <a href="javascript:void(0)">OCR (Image to Text)</a>
                  </h4>
                  <p className="text">
                    Capture text effortlessly from any image
                  </p>
                  <Link className="more" to="/ocr">
                    Learn More <i className="lni lni-chevron-right"></i>
                  </Link>
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
                    src="assets/images/services/services-shape-3.svg"
                    alt="shape"
                  />
                  <i className="lni lni-cog"></i>
                </div>
                <div className="services-content mt-30">
                  <h4 className="services-title">
                    <a href="javascript:void(0)">Speedy PDF Merger</a>
                  </h4>
                  <p className="text">
                    Combine PDFs swiftly with intuitive drag-and-drop
                  </p>
                  <Link className="more" to="/pdf-merge">
                    Learn More <i className="lni lni-chevron-right"></i>
                  </Link>
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
                    src="assets/images/services/services-shape-4.svg"
                    alt="shape"
                  />
                  <i className="lni lni-cog"></i>
                </div>
                <div className="services-content mt-30">
                  <h4 className="services-title">
                    <a href="javascript:void(0)">Text-to-Speech Translator</a>
                  </h4>
                  <p className="text">
                    Listen clearly; convert text to speech flawlessly
                  </p>
                  <Link className="more" to="/text-to-speech">
                    Learn More <i className="lni lni-chevron-right"></i>
                  </Link>
                </div>
              </div>
            </div>
            {/* <IdScannerFeature />
            <QrGeneratorFeature /> */}
          </div>
        </div>
      </section>
    </>
  )
}
