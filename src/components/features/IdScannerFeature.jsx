import React from "react";

function IdScannerCard() {
  return (
    <div
      className="col-lg-3 col-md-7 col-sm-8"
      onClick={() => {
        const target = document.getElementById("idscan");
        if (target) target.scrollIntoView({ behavior: "smooth" });
      }}
      style={{ cursor: "pointer" }}
    >
      <div className="single-services text-center mt-30 wow fadeIn">
        <div className="services-icon">
          <img
            className="shape"
            src="assets/images/services/services-shape.svg"
            alt="shape"
          />
          <img
            className="shape-1"
            src="assets/images/services/services-shape-4.svg"
            alt="shape"
          />
          <i className="lni lni-bolt"></i>
        </div>
        <div className="services-content mt-30">
          <h4 className="services-title">
            <a>Combine PDFs swiftly with intuitive drag-and-drop</a>
          </h4>
          <p className="text">
            Effortlessly scan, convert, merge, and create — from ID cards to
            multi-page PDFs
          </p>
          <a className="more">
            Learn More <i className="lni lni-chevron-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function IdScannerFeature() {
  return (
    <>
      <IdScannerCard />
    </>
  );
}
