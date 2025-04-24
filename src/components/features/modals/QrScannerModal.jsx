import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useQrScanner } from "../QrScannerContext";

export default function QrScannerModal() {
  const {
    isOpen,
    modalRef,
    qrText,
    setQrText,
    setIsOpen,
  } = useQrScanner();

  const scannerRef = useRef(null);
  const [scannerReady, setScannerReady] = useState(false);

  useEffect(() => {
    // Only start when the modal is open
    if (!isOpen) {
      setScannerReady(false);
      return;
    };

    setScannerReady(true);
  }, [isOpen]);

  useEffect(() => {
    if (!scannerReady || !isOpen) return;

    const html5QrCode = new Html5Qrcode("qr-scanner-region");
    scannerRef.current = html5QrCode;

    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length) {
          const cameraId = devices[0].id;
          html5QrCode
            .start(
              cameraId,
              {
                fps: 10,
                qrbox: 250,
              },
              (decodedText) => {
                setQrText(decodedText);
              },
              (errorMessage) => {
                console.warn("QR decode error:", errorMessage);
              }
            )
            .catch((err) => {
              console.error("Start error:", err);
            });
        } else {
          alert("No cameras found.");
        }
      })
      .catch((err) => {
        console.error("Camera error:", err);
        alert("Unable to access camera.");
      });

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().then(() => {
          scannerRef.current.clear();
        });
      }
    };
  }, [scannerReady, setQrText]);

  return (
    <div
      className={`modal fade ${isOpen ? "show d-block" : ""}`}
      tabIndex="-1"
      ref={modalRef}
      aria-labelledby="qrModalLabelScanner"
      aria-hidden={!isOpen}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
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
              <div
                id="qr-scanner-region"
                style={{
                  width: "100%",
                  height: "300px",
                  backgroundColor: "black",
                }}
              ></div>
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
