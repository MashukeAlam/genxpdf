import React from "react";
import { useQrScanner } from "../QrScannerContext";
import { QrReader } from "@blackbox-vision/react-qr-reader";

export default function QrScannerModal() {
  const {
    isOpen,
    modalRef,
    qrText,
    setQrText,
    setIsOpen,
  } = useQrScanner();

  const handleResult = (result, error) => {
    if (!!result) {
      setQrText(result?.text || result); // sometimes result is a string
    }

    if (!!error) {
      console.error("QR Scan Error:", error);
    }
  };

  return (
    <div
      className="modal fade"
      tabIndex="-1"
      ref={modalRef}
      aria-labelledby="qrModalLabelScanner"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-3">
          <div className="modal-header">
            <h5 className="modal-title" id="qrModalLabelScanner">
              Scan QR Code
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setIsOpen(false)}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3 text-center">
              <QrReader
                constraints={{
                  video: {
                    facingMode: "environment", // Use back camera if available
                    width: { ideal: 1280 }, // Ideal width of the video stream
                    height: { ideal: 720 }, // Ideal height of the video stream
                  },
                }}
                onResult={handleResult}
                containerStyle={{
                  width: "100%",
                  height: "auto",
                  backgroundColor: "black", // Ensure a visible background
                }}
                videoStyle={{ width: "100%" }}
              />
            </div>
            <div>
              <label>Scanned Result:</label>
              <input
                type="text"
                className="form-control"
                value={qrText}
                readOnly
              />
            </div>
          </div>
          <div className="modal-footer d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
