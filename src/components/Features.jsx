import React from 'react'
import QrGeneratorFeature from './features/QrGeneratorFeature'
import IdScannerFeature from './features/IdScannerFeature'

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

            <IdScannerFeature />
            <QrGeneratorFeature />
          </div>
        </div>
      </section>
      </>
  )
}
