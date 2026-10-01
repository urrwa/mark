import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { MeetMarkSection } from './components/MeetMarkSection';
import { ThreePillarsSection } from './components/ThreePillarsSection';
import { AIChatSection } from './components/AIChatSection';
import { AIContentSection } from './components/AIContentSection';
import { SnapSellJourneySection } from './components/SnapSellJourneySection';
import { ConnectedJourneySection } from './components/ConnectedJourneySection';
import { ExpertTeamSection } from './components/ExpertTeamSection';
import { GlobalOpportunitiesSection } from './components/GlobalOpportunitiesSection';
import { ProfessionalProductionsSection } from './components/ProfessionalProductionsSection';
import { GrowthPotentialSection } from './components/GrowthPotentialSection';
import { FinalCTASection } from './components/FinalCTASection';
import { ApplicationFormSection } from './components/ApplicationFormSection';
import { FooterSection } from './components/FooterSection';
import { LegalModal, LegalTab } from './components/LegalModal';
import { DeveloperCompanionModal } from './components/DeveloperCompanionModal';
import { CookieConsentBanner } from './components/CookieConsentBanner';

export default function App() {
  const [legalModalOpen, setLegalModalOpen] = useState<boolean>(false);
  const [legalTab, setLegalTab] = useState<LegalTab>('privacy');
  const [companionOpen, setCompanionOpen] = useState<boolean>(false);
  const [cookieSettingsForceOpen, setCookieSettingsForceOpen] = useState<boolean>(false);

  const handleOpenLegal = (tab: LegalTab) => {
    setLegalTab(tab);
    setLegalModalOpen(true);
  };

  const handleOpenPrivacy = () => {
    handleOpenLegal('privacy');
  };

  return (
    <div className="min-h-screen bg-[#050706] text-[#F4F7F5] selection:bg-[#00C875] selection:text-[#050706]">
      {/* 1. Header & Navigation */}
      <Navigation onOpenCompanion={() => setCompanionOpen(true)} />

      {/* Main Content Sections (1-13 in exact requested sequence) */}
      <main id="main-content">
        {/* Section 1 — Hero */}
        <HeroSection />

        {/* Section 2 — The Current Struggle */}
        <ProblemSection />

        {/* Section 3 — Meet Mark */}
        <MeetMarkSection />

        {/* Section 4 — The Complete System */}
        <ThreePillarsSection />

        {/* Section 5 — Pillar One: AI Chat Support */}
        <AIChatSection />

        {/* Section 6 — Pillar Two: AI Content Creation */}
        <AIContentSection />

        {/* Section 7 — Pillar Three: SnapSell Direct Sales */}
        <SnapSellJourneySection />

        {/* Section 8 — The Connected Journey */}
        <ConnectedJourneySection />

        {/* Section 9 — Mark and The Expert Team */}
        <ExpertTeamSection />

        {/* Section 10 — Global Creator Lifestyle */}
        <GlobalOpportunitiesSection />

        {/* Section 11 — Professional Productions */}
        <ProfessionalProductionsSection />

        {/* Section 12 — Growth Potential */}
        <GrowthPotentialSection />

        {/* Section 13 — Final CTA */}
        <FinalCTASection />

        {/* The Academy Application Form */}
        <ApplicationFormSection onOpenPrivacy={handleOpenPrivacy} />
      </main>

      {/* Footer */}
      <FooterSection
        onOpenLegalModal={handleOpenLegal}
        onOpenCookieSettings={() => setCookieSettingsForceOpen(true)}
        onOpenCompanion={() => setCompanionOpen(true)}
      />

      {/* Modals & Overlays */}
      <LegalModal
        isOpen={legalModalOpen}
        activeTab={legalTab}
        onClose={() => setLegalModalOpen(false)}
        onSelectTab={(tab) => setLegalTab(tab)}
      />

      <DeveloperCompanionModal
        isOpen={companionOpen}
        onClose={() => setCompanionOpen(false)}
      />

      <CookieConsentBanner
        forceOpen={cookieSettingsForceOpen}
        onCloseSettings={() => setCookieSettingsForceOpen(false)}
        onOpenPrivacy={handleOpenPrivacy}
      />
    </div>
  );
}
