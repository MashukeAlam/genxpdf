import { StrictMode, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider, useLocation, Route, Routes } from 'react-router-dom';
import NotFoundPage from './components/NotFoundPage.jsx';
import FeatureList from './components/FeatureList.jsx';
import PdfTranslator from './components/PdfTranslator.jsx';
import TextTranslator from './components/TextTranslator.jsx';
import Ocr from './components/Ocr.jsx';
import PdfMerge from './components/PdfMerge.jsx';
import DocumentMaker from './components/DocumentMaker.jsx';
import QrGenerator from './components/QrGenerator.jsx';
import QrScanner from './components/QrScanner.jsx';
import TextToSpeechTranslator from './components/TextToSpeechTranslator.jsx';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// Transition Wrapper Component
const TransitionWrapper = () => {
  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.pathname}
        classNames="page"
        timeout={300}
        nodeRef={nodeRef}
      >
        <div ref={nodeRef} className="absolute inset-0">
          <Routes location={location}>
            <Route path="/" element={<App />} />
            <Route path="/features" element={<FeatureList />} />
            <Route path="/pdf-translator" element={<PdfTranslator />} />
            <Route path="/text-translator" element={<TextTranslator />} />
            <Route path="/ocr" element={<Ocr />} />
            <Route path="/pdf-merge" element={<PdfMerge />} />
            <Route path="/documents-maker" element={<DocumentMaker />} />
            <Route path="/qr-generator" element={<QrGenerator />} />
            <Route path="/qr-scanner" element={<QrScanner />} />
            <Route path="/text-to-speech" element={<TextToSpeechTranslator />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

// Router Setup
const router = createBrowserRouter([
  {
    path: '*',
    element: <TransitionWrapper />,
  },
]);

// Render Application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);