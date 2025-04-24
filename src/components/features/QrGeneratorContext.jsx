import React, { createContext, useContext, useRef, useState, useEffect } from "react";
import * as htmlToImage from "html-to-image";

const QrGeneratorContext = createContext();

export function useQrGenerator() {
  const context = useContext(QrGeneratorContext);
  if (!context) throw new Error("useQrGenerator must be used within QrGeneratorProvider");
  return context;
}

export function QrGeneratorProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [qrText, setQrText] = useState("Hello, QR!");
  const modalRef = useRef(null);
  const bootstrapModalRef = useRef(null);
  const qrRef = useRef();

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
    <QrGeneratorContext.Provider
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
    </QrGeneratorContext.Provider>
  );
}
