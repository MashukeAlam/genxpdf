import React, { createContext, useContext, useRef, useState, useEffect } from "react";

const QrScannerContext = createContext();

export function useQrScanner() {
  const context = useContext(QrScannerContext);
  if (!context) throw new Error("useQrScanner must be used within QrScannerProvider");
  return context;
}

export function QrScannerProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [qrText, setQrText] = useState("Hello, QR!");
  const qrRef = useRef();
const modalRef = useRef(null);
  const bootstrapModalRef = useRef(null);

  const handleDownload = () => {
    if (!qrRef.current) return;
    htmlToImage
      .toPng(qrRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "qr-code.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Failed to download QR code:", err);
      });
  };

  useEffect(() => {
    console.log(9090, qrRef, modalRef);
    
    if (!modalRef.current) return;
    const bootstrap = window.bootstrap;
    if (!bootstrap) return;

    if (!bootstrapModalRef.current) {
      bootstrapModalRef.current = new bootstrap.Modal(modalRef.current);
    }

    const modalEl = modalRef.current;

    const handleHide = () => {
      setIsOpen(false); // Update state when modal is hidden (including backdrop)
    };

    modalEl.addEventListener('hidden.bs.modal', handleHide);

    if (isOpen) bootstrapModalRef.current.show();
    else bootstrapModalRef.current.hide();

    // Cleanup on unmount
    return () => {
      modalEl.removeEventListener('hidden.bs.modal', handleHide);
    };
  }, [isOpen]);


  return (
    <QrScannerContext.Provider
      value={{
        isOpen,
        setIsOpen,
        qrText,
        setQrText,
        qrRef,
        modalRef,
        handleDownload,
      }}
    >
      {children}
    </QrScannerContext.Provider>
  );
}
