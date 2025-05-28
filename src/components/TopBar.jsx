import React from 'react'
import Filler from './Filler'
import Breadcrumb from './Breadcrumbs'

export default function TopBar({breadcrumb, breadcrumbPaths}) {
  return (
    <>
    <div className="navbar-area">
    <div className="container">
      <div className="row">
        <div className="col-lg-12"></div>
  <nav className="navbar navbar-expand-lg flex space-between">
    <div>
      <a className="navbar-brand" href="/">
        <img
          src="assets/images/logo/company-logo.png"
          alt="Logo"
          className="w-32 h-8 mb-4 text-animate"
        />                </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="toggler-icon"> </span>
        <span className="toggler-icon"> </span>
        <span className="toggler-icon"> </span>
      </button>
    </div>
    {breadcrumb ? <></> : 
    <div
      className=" navbar-collapse sub-menu-bar"
      id="navbarSupportedContent"
    >
      <ul id="nav" className="navbar-nav ms-auto">
        <li className="nav-item">
          <a className="page-scroll active" href="#home">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a className="page-scroll" href="#features">
            Features
          </a>
        </li>
        <li className="nav-item">
          <a className="page-scroll" href="#about">
            About
          </a>
        </li>
      </ul>

    </div>
}

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
