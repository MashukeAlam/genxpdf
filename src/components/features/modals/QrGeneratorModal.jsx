import React, { createContext, useContext, useRef, useState, useMemo, useEffect } from "react";
import QRCode from "react-qr-code";
import { useQrGenerator } from "../QrGeneratorContext"; // Correct hook import

export default function QrGeneratorModal() {

  const { isOpen, modalRef, qrText, setQrText, qrRef, handleDownload, setIsOpen } = useQrGenerator();

  return (
    <div
    className="modal fade"
    tabIndex="-1"
    ref={modalRef}
    aria-labelledby="qrModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content p-3">
        <div className="modal-header">
          <h5 className="modal-title" id="qrModalLabel">
            Generate QR Code
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setIsOpen(false)}
          ></button>
        </div>
        <div className="modal-body">
          <input
            type="text"
            className="form-control mb-3"
            value={qrText}
            onChange={(e) => setQrText(e.target.value)}
            placeholder="Enter text"
          />
          <div className="d-flex justify-content-center bg-light p-3 rounded">
            <div ref={qrRef}>
              <QRCode value={qrText} />
            </div>
          </div>
        </div>
        <div className="modal-footer d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>

          <button
      type="button"
      className="btn btn-primary"
      onClick={handleDownload}
    >
      Download QR Code
    </button>
        </div>
      </div>
    </div>
  </div>

  )
}
