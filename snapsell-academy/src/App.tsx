import React, { useState } from 'react';
import IntroLoader from './components/IntroLoader';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';

export default function App() {
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <>
      <IntroLoader onComplete={() => setLoaderDone(true)} />
      <div
        style={{
          opacity: loaderDone ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      >
        <div className="min-h-screen bg-[#050505] text-[#F5F5F2] selection:bg-[#00D084] selection:text-[#050505]">
          <Navigation />
          <main id="main-content">
            {/* Sticky wrapper: hero stays pinned while Section 2 scrolls over it */}
            <div style={{ position: "sticky", top: 0, zIndex: 0 }}>
              <HeroSection />
            </div>
            <ProblemSection />
          </main>
        </div>
      </div>
    </>
  );
}
