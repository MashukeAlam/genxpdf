import React, { useEffect } from "react";
import CountUp from "react-countup";

export default function Showoff() {
  return (
    <>
      {/*====== VIDEO COUNTER PART START ======*/}
      <section id="facts" className="video-counter pt-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 order-lg-last">
              <div
                className="counter-wrapper mt-50 wow fadeIn"
                data-wow-duration="1s"
                data-wow-delay="0.8s"
              >
                <div className="counter-content">
                  <div className="section-title">
                    <div className="line" />
                    <h3 className="title">
                      Why Thousands <span> Choose Us!</span>
                    </h3>
                  </div>
                  <p className="text">
                    Trusted by countless users, our tools transform everyday
                    tasks into extraordinary outcomes. Be part of the
                    success—your journey begins here!
                  </p>
                </div>
                <div className="row no-gutters">
                  <div className="col-4">
                    <div className="single-counter counter-color-1 d-flex align-items-center justify-content-center">
                      <div className="counter-items text-center">
                        <CountUp start={0} end={125} duration={2} separator=",">
                          {({ countUpRef }) => (
                            <span
                              className="count text-uppercase"
                              ref={countUpRef}
                            />
                          )}
                        </CountUp>
                        <p className="text">Documents Transformed</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="single-counter counter-color-2 d-flex align-items-center justify-content-center">
                      <div className="counter-items text-center">
                        <CountUp start={0} end={20} duration={2} separator=",">
                          {({ countUpRef }) => (
                            <span
                              className="count text-uppercase"
                              ref={countUpRef}
                            />
                          )}
                        </CountUp>
                        <p className="text">Satisfied Users</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="single-counter counter-color-3 d-flex align-items-center justify-content-center">
                      <div className="counter-items text-center">
                        <CountUp start={0} end={4.9} duration={2} separator=",">
                          {({ countUpRef }) => (
                            <span
                              className="count text-uppercase"
                              ref={countUpRef}
                            />
                          )}
                        </CountUp>
                        <p className="text">User Rating</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="video-content mt-50 wow fadeIn"
                data-wow-duration="1s"
                data-wow-delay="0.5s"
              >
                <img
                  className="dots"
                  src="assets/images/video/dots.svg"
                  alt="dots"
                />
                <div className="video-wrapper">
                  <div className="video-image">
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
                  <div className="video-icon">
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== VIDEO COUNTER PART ENDS ======*/}
    </>
  );
}
