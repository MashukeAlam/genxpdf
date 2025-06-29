import React, { useState } from 'react';
import Filler from './Filler';
import Breadcrumb from './Breadcrumbs';
import AuthenticationButton from './AuthenticationButton';
import { AuthProvider } from './features/AuthContext';
import AuthModal from './features/modals/AuthModal';
import PageCount from './PageCount';

export default function TopBar({ breadcrumb, breadcrumbPaths, pages }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="navbar-area pl-[4%] pr-[4%] pt-[2%]">
        <div className="container mx-auto">
          <div className="row">
            <div className="col-lg-12">
              <nav className="navbar flex justify-between items-center">
                <div>
                  <a className="navbar-brand" href="/">
                    <img
                      src="assets/images/logo/company-logo.png"
                      alt="Logo"
                      className="w-24 h-6 md:w-32 md:h-8 mb-2 md:mb-4 text-animate"
                    />
                  </a>
                </div>

                <div className=" flex items-center space-x-2 md:space-x-4">
                  

                  {/* Desktop Navigation */}
                  <ul
                    id="nav"
                    className="hidden md:flex flex-row items-center gap-4 list-none mr-4"
                  >
                    <li className="nav-item flex items-center">
                      <a
                        className="page-scroll text-orange-400 hover:text-orange-600"
                        href="/"
                      >
                        Home
                      </a>
                    </li>
                    <li className="nav-item flex items-center">
                      <a
                        className="page-scroll text-orange-400 hover:text-orange-600"
                        href="/features"
                      >
                        Features
                      </a>
                    </li>
                    <li className="nav-item flex items-center">
                      <a
                        className="page-scroll text-orange-400 hover:text-orange-600"
                        href="#about"
                      >
                        About
                      </a>
                    </li>
                  </ul>

                  {/* Authentication Button and Page Count */}
                  <div className="flex items-center space-x-2 md:space-x-4">
                    <AuthProvider>
                      <AuthenticationButton />
                      <AuthModal />
                    </AuthProvider>
                    {pages && !isNaN(pages) && <PageCount pages={pages} />}
                  </div>

                  {/* Hamburger Menu Button for Mobile */}
                  <button
                    className="hamburger md:hidden flex items-center text-orange-400 focus:outline-none p-2"
                    onClick={toggleMenu}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                      ></path>
                    </svg>
                  </button>
                </div>


                {/* Mobile Navigation Menu */}
                <div
                  className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${
                    isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                  } transition-transform duration-300 ease-in-out md:hidden z-50`}
                >
                  <div className="flex justify-end p-4">
                    <button
                      onClick={toggleMenu}
                      className="text-orange-400 focus:outline-none"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <ul className="flex flex-col space-y-4 p-4 list-none">
                    <li className="nav-item">
                      <a
                        className="page-scroll text-orange-400 hover:text-orange-600 text-lg"
                        href="/"
                        onClick={toggleMenu}
                      >
                        Home
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="page-scroll text-orange-400 hover:text-orange-600 text-lg"
                        href="#features"
                        onClick={toggleMenu}
                      >
                        Features
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="page-scroll text-orange-400 hover:text-orange-600 text-lg"
                        href="#about"
                        onClick={toggleMenu}
                      >
                        About
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
              {breadcrumb && <Breadcrumb paths={breadcrumbPaths} />}
            </div>
          </div>
        </div>
      </div>
      <Filler />
    </>
  );
}