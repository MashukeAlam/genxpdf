import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[url('assets/images/header/banner-bg.svg')] bg-cover bg-center pt-12 pb-6 px-4 sm:px-6 relative">
      <div className="absolute inset-0 bg-blue-900/30"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="flex flex-col items-center md:items-start">
            <a href="/" className="mb-4">
              <img
                src="assets/images/logo/company-logo.png"
                alt="TechX Logo"
                className="h-12 w-auto"
              />
            </a>
            <p className="text-white text-sm md:text-left mb-4">
              Experience the power of technology with TechX where possibilities become realities.
            </p>
            <div className="flex space-x-4">
              <a
                href="mailto:info@techxfuture.com"
                className="text-white hover:text-blue-400 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-center md:text-left">
              <li>
                <a
                  href="https://techxfuture.com/privacy-policy/"
                  className="text-white hover:text-blue-400 text-sm transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="http://techxfuture.com/terms-conditions/"
                  className="text-white hover:text-blue-400 text-sm transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-2 text-center md:text-left">
              <li className="text-white text-sm">+91 70100 89010</li>
              <li className="text-white text-sm">info@techxfuture.com</li>
              <li className="text-white text-sm">Chennai, Tamilnadu, India</li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 pt-6 border-t border-white/30">
          <p className="text-white text-sm text-center">
            © {new Date().getFullYear()} TechX. All rights reserved.
          </p>
        </div>
      </div>

      {/* Back to Top Button */}
      <a
        href="#"
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-20"
      >
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 4l-8 8h6v8h4v-8h6l-8-8z" />
        </svg>
      </a>

      {/* Particles Background (kept as a placeholder, assuming CSS handles it) */}
      <div id="particles-2" className="absolute inset-0 pointer-events-none" />
    </footer>
  );
}