import React from 'react'
import FeatureCard from './FeatureCard';

export default function FeatureList() {
    const features = [
        { id: 1, name: 'PDF Translator', description: 'Translates the content in a PDF', path: '/pdf-translator' },
        { id: 2, name: 'Text Translator', description: 'Adding a text translator alongside the existing document translator.', path: '/text-translator' },
        { id: 3, name: 'OCR (Image to Text)', description: 'Extracting text from images, fitting well with the app\'s purpose.', path: '/ocr' },
        { id: 4, name: 'PDF Merge', description: 'Managing documents efficiently with a drag-and-drop interface.', path: '/pdf-merge' },
        { id: 5, name: 'Documents Maker', description: 'Converts images to PDF with options for layouts and quality selection.', path: '/documents-maker' },
        { id: 6, name: 'QR Generator', description: 'Generates QR codes with customization options (color, logo insertion).', path: '/qr-generator' },
        { id: 7, name: 'QR Scanner', description: 'Supports scanning all QR types, including URLs, contacts, and Wi-Fi codes.', path: '/qr-scanner' },
        { id: 8, name: 'Text-to-Speech Translator', description: 'Supports multiple languages and accents for text-to-speech translation.', path: '/text-to-speech' },
      ];

  return (
    <div
      id="home"
      className="header-hero bg-[url('assets/images/header/banner-bg.svg')] bg-cover bg-center min-h-screen flex flex-col items-center p-8"
    >
      <h1 className="text-4xl font-bold text-white text-center mb-12">Feature Showcase</h1>
      <div className="flex flex-col items-center">
        {features.map(feature => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </div>
    </div>
  )
}