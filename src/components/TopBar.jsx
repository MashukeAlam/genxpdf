import React from 'react'
import Filler from './Filler'
import Breadcrumb from './Breadcrumbs'
import AuthenticationButton from './AuthenticationButton'
import { AuthProvider } from './features/AuthContext'
import AuthModal from './features/modals/AuthModal'

export default function TopBar({ breadcrumb, breadcrumbPaths }) {
  return (
    <>
      <div className="navbar-area pl-[2%] pt-[2%]">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <nav className="navbar flex justify-between items-center">
                <div>
                  <a className="navbar-brand" href="/">
                    <img
                      src="assets/images/logo/company-logo.png"
                      alt="Logo"
                      className="w-32 h-8 mb-4 text-animate"
                    />
                  </a>
                </div>

                <ul id="nav" className="flex flex-row items-center space-x-6 list-none ms-auto mr-5">
                  <li className="nav-item flex items-center">
                    <a className="page-scroll active text-orange-400 hover:text-orange-600" href="/">
                      Home
                    </a>
                  </li>
                  <li className="nav-item flex items-center">
                    <a className="page-scroll text-orange-400 hover:text-orange-600" href="#features">
                      Features
                    </a>
                  </li>
                  <li className="nav-item flex items-center">
                    <a className="page-scroll text-orange-400 hover:text-orange-600" href="#about">
                      About
                    </a>
                  </li>
                </ul>

                <div>
                  <AuthProvider>
                    <AuthenticationButton />
                    <AuthModal />
                  </AuthProvider>
                </div>
              </nav>
              {breadcrumb && (
                <Breadcrumb paths={breadcrumbPaths} />
              )}
            </div>
          </div>
        </div>
      </div>
      <Filler />
    </>
  )
}