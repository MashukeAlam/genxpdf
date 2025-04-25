import React, { createContext, useContext, useRef, useState } from "react";

const IdScannerContext = createContext();

export const useIdScanner = () => useContext(IdScannerContext);

export const IdScannerProvider = ({ children }) => {
  const modalRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [capturedFront, setCapturedFront] = useState(null);
  const [capturedBack, setCapturedBack] = useState(null);
  const [stage, setStage] = useState("front"); // 'front' or 'back'
  const [previewImage, setPreviewImage] = useState(null);

  return (
    <IdScannerContext.Provider
      value={{
        modalRef,
        isOpen,
        setIsOpen,
        capturedFront,
        setCapturedFront,
        capturedBack,
        setCapturedBack,
        stage,
        setStage,
        previewImage,
        setPreviewImage,
      }}
    >
      {children}
    </IdScannerContext.Provider>
  );
};
