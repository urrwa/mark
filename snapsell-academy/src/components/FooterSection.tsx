import React from 'react';

const FooterSection: React.FC = () => {
  return (
    <footer
      style={{ backgroundColor: '#050505' }}
      className="w-full"
    >
      <div
        style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        className="w-full"
      />

      <div
        style={{
          paddingTop: 'clamp(5rem, 10vw, 10rem)',
          paddingBottom: '3rem',
        }}
        className="px-6 md:px-12 lg:px-20"
      >
        <div className="mb-6">
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(4rem, 12vw, 11rem)',
              lineHeight: 0.85,
              color: '#ffffff',
              letterSpacing: '-0.02em',
            }}
          >
            MARK AUREL
          </h2>
        </div>

        <div className="mb-3">
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 400,
              fontSize: '1.2rem',
              letterSpacing: '0.2em',
              color: '#A5A5A5',
              textTransform: 'uppercase',
            }}
          >
            CREATOR AGENCY
          </p>
        </div>

        <div className="mb-16">
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 400,
              fontSize: '0.85rem',
              color: '#00D084',
            }}
          >
            Powered by SnapSell
          </p>
        </div>

        <div
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
          className="w-full mb-6"
        />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 400,
              fontSize: '0.78rem',
              color: '#A5A5A5',
            }}
          >
            © 2024 Mark Aurel Creator Agency
          </p>

          <a
            href="https://www.instagram.com/mark_aurel.official"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 400,
              fontSize: '0.78rem',
              color: '#A5A5A5',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = '#00D084';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = '#A5A5A5';
            }}
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
