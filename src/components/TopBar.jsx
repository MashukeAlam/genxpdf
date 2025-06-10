import React from 'react'
import Filler from './Filler'
import Breadcrumb from './Breadcrumbs'
import AuthenticationButton from './AuthenticationButton'
import { AuthProvider } from './features/AuthContext'
import AuthModal from './features/modals/AuthModal'

export default function TopBar({ breadcrumb, breadcrumbPaths }) {
  return (
    <>
      <div className="navbar-area pl-[2%]">
        <div className="container">
          <div className="row">
            <div className="col-lg-12"></div>
            <nav className="navbar flex space-between">
              <div>
                <a className="navbar-brand" href="/">
                  <img
                    src="assets/images/logo/company-logo.png"
                    alt="Logo"
                    className="w-32 h-8 mb-4 text-animate"
                  />                </a>

              </div>

              <div>
                <AuthProvider>
                  <AuthenticationButton />
                  <AuthModal />
                </AuthProvider>
              </div>

            </nav>
            {breadcrumb ?

              <Breadcrumb paths={breadcrumbPaths} />
              : null}
          </div>
        </div>
      </div>
      <Filler />
    </>
  )
}
