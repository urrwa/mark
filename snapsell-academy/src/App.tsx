import React, { useState } from 'react';
import IntroLoader from './components/IntroLoader';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import { MeetMarkSection } from './components/MeetMarkSection';
import { ProblemSection } from './components/ProblemSection';
import { ThreePillarsSection } from './components/ThreePillarsSection';
import PartnershipSection from './components/PartnershipSection';
import { ProfessionalProductionsSection } from './components/ProfessionalProductionsSection';
import { FAQSection } from './components/FAQSection';
import ApplicationFormSection from './components/ApplicationFormSection';
import FooterSection from './components/FooterSection';

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
            <HeroSection />
            <ProblemSection />
            <MeetMarkSection />
            <ThreePillarsSection />
            <PartnershipSection />
            <ProfessionalProductionsSection />
            <FAQSection />
            <ApplicationFormSection />
          </main>
          <FooterSection />
        </div>
      </div>
    </>
  );
}
