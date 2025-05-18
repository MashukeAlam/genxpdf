import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode';
import TopBar from './TopBar';
import Footer from './Footer';

export default function QrScanner() {
  const [qrText, setQrText] = useState('');
  const [scannerReady, setScannerReady] = useState(false);
  const scannerRef = useRef(null);
  const scannerRegionRef = useRef(null);

  useEffect(() => {
    setScannerReady(true);

    return () => {
      // Cleanup scanner on unmount
      if (scannerRef.current) {
        scannerRef.current.stop().then(() => {
          scannerRef.current.clear();
        }).catch((err) => {
          console.error('Error stopping scanner:', err);
        });
      }
    };
  }, []);

  useEffect(() => {
    if (!scannerReady) return;

    const html5QrCode = new Html5Qrcode('qr-scanner-region');
    scannerRef.current = html5QrCode;

    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length) {
          const cameraId = devices[0].id;
          html5QrCode
            .start(
              { facingMode: 'environment' },
              {
                fps: 10,
                qrbox: { width: 250, height: 250 },
              },
              (decodedText) => {
                setQrText(decodedText);
                // Stop scanning after successful scan
                html5QrCode.stop().then(() => {
                  html5QrCode.clear();
                }).catch((err) => {
                  console.error('Error stopping scanner:', err);
                });
              },
              (errorMessage) => {
                console.warn('QR decode error:', errorMessage);
              }
            )
            .catch((err) => {
              console.error('Start error:', err);
              alert('Unable to start scanner. Please try again.');
            });
        } else {
          alert('No cameras found.');
        }
      })
      .catch((err) => {
        console.error('Camera error:', err);
        alert('Unable to access camera.');
      });

    return () => {
      // Cleanup scanner on component unmount or re-render
      if (scannerRef.current) {
        scannerRef.current.stop().then(() => {
          scannerRef.current.clear();
        }).catch((err) => {
          console.error('Error stopping scanner:', err);
        });
      }
    };
  }, [scannerReady]);

  const handleStartScanner = () => {
    setQrText('');
    setScannerReady(true);
  };

  return (
    <div
      className="bg-[url('assets/images/header/banner-bg.svg')] bg-cover bg-center min-h-screen flex flex-col  items-center justify-center p-8 overflow-hidden"
    >
      <TopBar />
      <div className="bg-white/70 backdrop-blur-md border border-blue-200/30 rounded-2xl p-8 max-w-lg w-full shadow-lg">
        <h1 className="text-2xl font-bold text-blue-900 mb-4 text-center">QR Scanner</h1>
        <div className="mb-4">
          <div
            id="qr-scanner-region"
            ref={scannerRegionRef}
            className="w-full h-64 bg-black rounded-lg mx-auto"
          ></div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-blue-900 mb-2">Scanned Result:</label>
          <input
            type="text"
            className="w-full p-3 border border-blue-300 rounded-lg text-gray-700 bg-white/50"
            value={qrText}
            readOnly
            placeholder="Scan a QR code to see the result"
          />
        </div>
        <button
          onClick={handleStartScanner}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 mb-4"
          disabled={scannerReady}
        >
          Start Scanning
        </button>
        <Link
          to="/"
          className="mt-4 inline-block text-blue-500 hover:underline text-sm text-center w-full"
        >
          Back to Home
        </Link>
      </div>
      <Footer />
    </div>
  );
}