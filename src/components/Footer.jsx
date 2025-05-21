import React from 'react';

export default function Footer() {
  return (
    <>
    <footer id="footer" className="footer-area pt-120 pl-20 full-width-footer">
      <div className="full-width-container">
        <div className="footer-widget pb-10">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-8">
              <div
                className="footer-about mt-50 wow fadeIn"
                data-wow-duration="1s"
                data-wow-delay="0.2s"
              >
                <a className="logo" href="javascript:void(0)">
                  <img src="assets/images/logo/company-logo.png" alt="logo" />
                </a>
                <p className="text">
                  Experience the power of technology with TechX where possibilities become realities.
                </p>
                <ul className="social">
                  <li>
                    <a href="javascript:void(0)">
                      <i className="lni lni-facebook-filled"></i>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      <i className="lni lni-twitter-filled"></i>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      <i className="lni lni-instagram-filled"></i>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      <i className="lni lni-linkedin-original"></i>
                    </a>
                  </li>
                </ul>
              </div>
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
                      <a href="https://techxfuture.com/privacy-policy/">Privacy Policy</a>
                    </li>
                    <li>
                      <a href="http://techxfuture.com/terms-conditions/">Terms of Service</a>
                    </li>
                  </ul>
                </div>
              </div>
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
                  <li>+91 70100 89010</li>
                  <li>info@techxfuture.com</li>
                  <li>Chennai, Tamilnadu, India</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="row">
            <div className="col-lg-12">
              <div className="copyright d-sm-flex justify-content-between">
                <div className="copyright-content"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="particles-2" />
    </footer>
    <a href="#" className="back-to-top">
        {" "}
        <i className="lni lni-chevron-up"> </i>{" "}
      </a>
    </>
  );
}