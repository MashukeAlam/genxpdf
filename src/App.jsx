import "./App.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/animate.css";
import "./assets/css/glightbox.min.css";
import "./assets/css/lineicons.css";
import "./assets/css/style.css";
import Preloader from "./components/Preloader";
import Header from "./components/Header";
import Branding from "./components/Branding";
import Features from "./components/Features";
import About from "./components/About";
import { QrGeneratorProvider } from "./components/features/QrGeneratorContext";
import { QrScannerProvider } from "./components/features/QrScannerContext";
import QrGeneratorModal from "./components/features/modals/QrGeneratorModal";
import QrScannerModal from "./components/features/modals/QrScannerModal";
import { IdScannerProvider } from "./components/features/IdScannerContext";
import IdScannerModal from "./components/features/modals/IdScannerModal";
import AuthModal from "./components/features/modals/AuthModal";
import { AuthProvider } from "./components/features/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Showoff from "./components/Showoff";

function App() {
  const googleClientSecret = import.meta.env.VITE_CLIENT_SECRET;
  const googleClientId = import.meta.env.VITE_CLIENT_ID;
  return (
    <>
      <Preloader />
      <GoogleOAuthProvider clientId={googleClientId}>
        <AuthProvider>
          <IdScannerProvider>
            <QrScannerProvider>
              <QrGeneratorProvider>
                <Header />
                <Branding />
                <Features />
                <QrGeneratorModal />
                <QrScannerModal />
                <IdScannerModal />
                <AuthModal />
                <About />
                <Showoff />
              </QrGeneratorProvider>
            </QrScannerProvider>
          </IdScannerProvider>
        </AuthProvider>
      </GoogleOAuthProvider>

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
                  Experience the power of technology with TechX where possibilities become realities.
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
                        <a href="https://techxfuture.com/contact/">Contact</a>
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
                    <li>+91 70100 89010</li>
                    <li>info@techxfuture.com</li>
                    <li>
                    Chennai, Tamilnadu, India
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
