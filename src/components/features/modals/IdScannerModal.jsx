import React, { useRef, useEffect } from "react";
import { useIdScanner } from "../../IdScannerContext";

export default function IdScannerModal() {
  const {
    isOpen,
    modalRef,
    setIsOpen,
    stage,
    setStage,
    capturedFront,
    setCapturedFront,
    capturedBack,
    setCapturedBack,
    previewImage,
    setPreviewImage,
  } = useIdScanner();

  const videoRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {    
    let stream;
  
    const startCamera = async () => {      
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
  
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (err) {
        console.error("Camera access denied or error starting camera:", err);
      }
    };
  
    const stopCamera = () => {      
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => {
          track.stop()
        });
      }
    };
  
    if (isOpen && !previewImage) {
      startCamera();
    } else {
      stopCamera();
    }
  
    return () => {
      stopCamera();
    };
  }, [isOpen, previewImage]);

  const captureImage = () => {    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/jpeg");
    setPreviewImage(dataUrl);
  };

  const confirmImage = () => {
    if (stage === "front") {
      setCapturedFront(previewImage);
      setStage("back");
    } else {
      setCapturedBack(previewImage);
      setStage("front");
    }
    setPreviewImage(null);
  };

  const cancelPreview = () => {
    setPreviewImage(null);
  };

  const createFinalImage = () => {
    const canvas = document.createElement("canvas");
    const img1 = new Image();
    const img2 = new Image();
    img1.src = capturedFront;
    img2.src = capturedBack;

    img1.onload = () => {
      img2.onload = () => {
        canvas.width = Math.max(img1.width, img2.width);
        canvas.height = img1.height + img2.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img1, 0, 0);
        ctx.drawImage(img2, 0, img1.height);

        const merged = canvas.toDataURL("image/jpeg");
        const link = document.createElement("a");
        link.href = merged;
        link.download = "id_card.jpg";
        link.click();
        setCapturedFront(null);
        setCapturedBack(null);
        setPreviewImage(null);
      };
    };

  };

  return (
    <div
      className={`modal fade ${isOpen ? "show d-block" : ""}`}
      tabIndex="-1"
      ref={modalRef}
      aria-hidden={!isOpen}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content p-3">
          <div className="modal-header">
            <h5 className="modal-title">Scan {stage === "front" ? "Front" : "Back"} of ID</h5>
            <button className="btn-close" onClick={() => setIsOpen(false)}></button>
          </div>
          <div className="modal-body text-center">
            {previewImage ? (
              <>
                <img src={previewImage} alt="Preview" className="img-fluid mb-2" />
                <div>
                  <button className="btn btn-success me-2" onClick={confirmImage}>✔ Confirm</button>
                  <button className="btn btn-danger" onClick={cancelPreview}>✖ Retake</button>
                </div>
              </>
            ) : (
              <>
                <video ref={videoRef} className="w-100 mb-2" />
                <button className="btn btn-primary" onClick={captureImage}>Capture</button>
              </>
            )}
          </div>
          {capturedFront && capturedBack && (
            <div className="modal-footer d-flex justify-content-between">
              <span>Both sides captured!</span>
              <button className="btn btn-success" onClick={createFinalImage}>Save ID Image</button>
            </div>
          )}
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
      </div>
    </div>
  );
}
