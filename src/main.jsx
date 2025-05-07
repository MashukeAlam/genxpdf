import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from './components/NotFoundPage.jsx'
import FeatureList from './components/FeatureList.jsx'
import PdfTranslator from './components/PdfTranslator.jsx'
import TextTranslator from './components/TextTranslator.jsx'
import Ocr from './components/Ocr.jsx'
import PdfMerge from './components/PdfMerge.jsx'
import DocumentMaker from './components/DocumentMaker.jsx'
import QrGenerator from './components/QrGenerator.jsx'
import QrScanner from './components/QrScanner.jsx'

const router = createBrowserRouter([
  {path: '/', element: <App />},
  {path: '/features', element: <FeatureList />},
  {path: '/pdf-translator', element: <PdfTranslator />},
  {path: '/text-translator', element: <TextTranslator />},
  {path: '/ocr', element: <Ocr/>},
  {path: '/pdf-merge', element: <PdfMerge/>},
  {path: '/documents-maker', element: <DocumentMaker />},
  {path: '/qr-generator', element: <QrGenerator />},
  {path: '/qr-scanner', element: <QrScanner />},
  {path: '/*', element: <NotFoundPage />}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
