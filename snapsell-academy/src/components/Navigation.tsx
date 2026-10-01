import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles, ShieldCheck } from 'lucide-react';
import { trackEvent } from '../data/academyData';

interface NavigationProps {
  onOpenCompanion?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenCompanion }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = ['hero', 'system', 'ai-content', 'snapsell', 'opportunities', 'about-mark', 'apply'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Das System', href: '#system', id: 'system' },
    { label: 'KI-Content', href: '#ai-content', id: 'ai-content' },
    { label: 'SnapSell', href: '#snapsell', id: 'snapsell' },
    { label: 'Chancen', href: '#opportunities', id: 'opportunities' },
    { label: 'Über Mark', href: '#about-mark', id: 'about-mark' },
    { label: 'Bewerben', href: '#apply', id: 'apply' },
  ];

  const handleNavClick = (label: string, href: string) => {
    trackEvent('Navigation Link Clicked', { label, href });
    setMobileMenuOpen(false);
  };

  const handleCtaClick = () => {
    trackEvent('Navigation CTA Clicked', { source: 'header' });
    const el = document.getElementById('apply');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#101310]/85 backdrop-blur-md border-b border-[#171B18] shadow-lg shadow-black/40 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Top-left corner strictly kept empty and clean */}
          <div className="hidden lg:block lg:flex-1 shrink-0" aria-hidden="true" />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center justify-center gap-1 xl:gap-2 bg-[#171B18]/70 border border-[#171B18] px-3.5 xl:px-4 py-1.5 rounded-full backdrop-blur-md shadow-xs shrink-0">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => handleNavClick(link.label, link.href)}
                className={`px-3.5 py-1.5 text-xs xl:text-sm font-medium rounded-full transition-all duration-200 whitespace-nowrap flex items-center justify-center leading-none ${
                  activeSection === link.id
                    ? 'text-[#F4F7F5] bg-[#101310] border border-[#00C875]/40 shadow-xs'
                    : 'text-[#99A49F] hover:text-[#F4F7F5] hover:bg-[#101310]/50'
                }`}
              >
                <span className="whitespace-nowrap">{link.label}</span>
              </a>
            ))}
          </nav>

            {/* Right Action: Companion Toolkit & Primary CTA */}
          <div className="hidden lg:flex lg:flex-1 items-center justify-end gap-3 shrink-0">
            {onOpenCompanion && (
              <button
                type="button"
                onClick={onOpenCompanion}
                className="hidden xl:flex items-center gap-1.5 text-xs text-[#99A49F] hover:text-[#00C875] bg-[#171B18]/70 border border-[#171B18] hover:border-[#00C875]/40 px-3.5 py-2 rounded-full transition-colors cursor-pointer whitespace-nowrap leading-none shrink-0"
                title="KI-Visual-Prompts, erforderliche Client-Assets und Pre-Launch-Checkliste anzeigen"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#00C875] shrink-0" />
                <span className="whitespace-nowrap">Client- & Dev-Specs</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleCtaClick}
              className="relative group overflow-hidden rounded-full bg-[#00C875] px-5 py-2.5 text-xs xl:text-sm font-bold text-[#050706] shadow-sm hover:shadow-md hover:shadow-[#00C875]/30 transition-all duration-200 cursor-pointer active:scale-95 whitespace-nowrap shrink-0 flex items-center justify-center"
            >
              <span className="relative z-10 flex items-center gap-1.5 tracking-wider uppercase font-heading whitespace-nowrap leading-none">
                DER ACADEMY BEITRETEN
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </span>
              <div className="absolute inset-0 bg-[#24E68A] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </button>
          </div>

          {/* Mobile Menu Trigger & Quick Action */}
          <div className="flex items-center gap-2.5 lg:hidden ml-auto">
            <button
              type="button"
              onClick={handleCtaClick}
              className="bg-[#00C875] hover:bg-[#24E68A] text-[#050706] font-heading font-bold text-xs px-4 py-2 rounded-full tracking-wider uppercase whitespace-nowrap transition-colors flex items-center gap-1"
            >
              <span>BEITRETEN</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#99A49F] hover:text-[#F4F7F5] bg-[#171B18] border border-[#171B18] rounded-xl flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Navigationsmenü umschalten"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#F4F7F5]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#050706]/95 backdrop-blur-xl pt-24 px-6 lg:hidden flex flex-col justify-between pb-8">
          <div className="space-y-4">
            <div className="text-xs uppercase tracking-widest text-[#99A49F] font-semibold mb-2">
              Navigation
            </div>
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => handleNavClick(link.label, link.href)}
                className="block text-lg font-heading font-semibold text-[#F4F7F5] hover:text-[#00C875] py-2 border-b border-[#171B18] transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
            {onOpenCompanion && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCompanion();
                }}
                className="w-full mt-4 flex items-center justify-between text-sm text-[#99A49F] bg-[#171B18] border border-[#171B18] p-3 rounded-xl cursor-pointer"
              >
                <span className="flex items-center gap-2 whitespace-nowrap">
                  <Sparkles className="w-4 h-4 text-[#00C875] shrink-0" />
                  Client- & Dev-Specs
                </span>
                <span className="text-xs text-[#00C875] whitespace-nowrap">Ansehen</span>
              </button>
            )}
          </div>

          <div className="space-y-3 pt-6">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                handleCtaClick();
              }}
              className="w-full py-3.5 bg-[#00C875] hover:bg-[#24E68A] text-[#050706] font-heading font-bold text-sm tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors whitespace-nowrap"
            >
              <span>DER ACADEMY BEITRETEN</span>
              <ArrowUpRight className="w-4 h-4 shrink-0" />
            </button>
            <div className="flex items-center justify-center gap-2 text-xs text-[#99A49F]">
              <ShieldCheck className="w-4 h-4 text-[#00C875] shrink-0" />
              <span className="whitespace-nowrap">18+ Verifiziertes Creator-Programm • Bewerbungsbasiert</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
