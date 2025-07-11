import "./App.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/animate.css";
import "./assets/css/glightbox.min.css";
import "./assets/css/lineicons.css";
import "./assets/css/style.css";
import Preloader from "./components/Preloader";
import Header from "./components/Header";
import Features from "./components/Features";
import About from "./components/About";
import AuthModal from "./components/features/modals/AuthModal";
import { AuthProvider } from "./components/features/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Showoff from "./components/Showoff";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


function App() {

  const googleClientSecret = import.meta.env.VITE_CLIENT_SECRET;
  const googleClientId = import.meta.env.VITE_CLIENT_ID;

  const location = useLocation();
  const [reloadKey, setReloadKey] = useState(0);

  // Fadeout function to hide preloader
  function fadeout() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500); 
    }
  }

  useEffect(() => {
    // Trigger reload on index route to fix provider initialization
    if (location.pathname === '/' && reloadKey === 0) {
      setReloadKey(1);
    }

    // Run fadeout on every load
    fadeout();
  }, [location.pathname, reloadKey]);

  
  return (
    <>
      <GoogleOAuthProvider clientId={googleClientId}>
        <AuthProvider>
                <Preloader />
                <Header />
                <Features />
                <AuthModal />
                <About />
                <Showoff />
                <Footer />
        </AuthProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
