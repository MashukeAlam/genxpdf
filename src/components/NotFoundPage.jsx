import React from 'react';

const NotFoundPage = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e1b4b, #3b0764, #831843)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          maxWidth: '32rem',
          padding: '0 1rem',
          zIndex: 10,
        }}
      >
        {/* 404 Illustration with Color Stroke */}
        <div style={{ position: 'relative' }}>
          <h1
            style={{
              fontSize: '9rem',
              fontWeight: 800,
              background: 'linear-gradient(90deg, #22d3ee, #ec4899, #facc15)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              animation: 'pulse 3s ease-in-out infinite',
              letterSpacing: '0.2rem',
            }}
          >
            404
          </h1>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: -10,
              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
              opacity: 0.5,
              filter: 'blur(20px)',
            }}
          ></div>
        </div>

        {/* Message with Enhanced Typography */}
        <h2
          style={{
            fontSize: '2.5rem',
            fontWeight: 600,
            background: 'linear-gradient(180deg, #ffffff, #d1d5db)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            letterSpacing: '0.05rem',
          }}
        >
          Page Not Found
        </h2>
        <p
          style={{
            color: '#e5e7eb',
            fontSize: '1.125rem',
            lineHeight: '1.75',
          }}
        >
          Oops! The page you're looking for has vanished or never existed.
        </p>

        {/* Back to Home Button with Colorful Hover */}
        <a
          href="/"
          style={{
            display: 'inline-block',
            background: 'linear-gradient(90deg, #06b6d4, #ec4899)',
            color: '#ffffff',
            fontWeight: 500,
            padding: '0.75rem 2rem',
            borderRadius: '9999px',
            textDecoration: 'none',
            transition: 'all 0.3s ease-in-out',
            transform: 'scale(1)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'linear-gradient(90deg, #0891b2, #db2777)';
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'linear-gradient(90deg, #06b6d4, #ec4899)';
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
          }}
        >
          Return to Home
        </a>
      </div>

      {/* Decorative Colorful Elements */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '20rem',
          height: '20rem',
          background: 'linear-gradient(135deg, #22d3ee, #2563eb)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          opacity: 0.2,
          animation: 'float 6s ease-in-out infinite',
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '20rem',
          height: '20rem',
          background: 'linear-gradient(135deg, #ec4899, #7c3aed)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          opacity: 0.2,
          animation: 'float-slow 8s ease-in-out infinite',
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '10rem',
          background: 'linear-gradient(0deg, rgba(157, 23, 77, 0.5), transparent)',
        }}
      ></div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(20px) translateX(-10px); }
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;