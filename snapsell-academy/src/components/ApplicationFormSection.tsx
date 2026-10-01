import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle, Loader2, ArrowRight, UserCheck, Sparkles } from 'lucide-react';
import { CREATOR_STAGES, MAIN_GOALS, INTERNATIONAL_OPTIONS, trackEvent } from '../data/academyData';
import { ApplicationFormData, TrackingParams } from '../types';

interface ApplicationFormSectionProps {
  onOpenPrivacy?: () => void;
}

export const ApplicationFormSection: React.FC<ApplicationFormSectionProps> = ({ onOpenPrivacy }) => {
  const [formData, setFormData] = useState<ApplicationFormData>({
    firstName: '',
    email: '',
    socialHandle: '',
    creatorStage: '',
    contentType: '',
    mainGoal: '',
    internationalInterest: 'Yes',
    isEighteenPlus: false,
    privacyConsent: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [honeypot, setHoneypot] = useState<string>(''); // anti-bot field
  const [trackingParams, setTrackingParams] = useState<TrackingParams>({
    landingPageVersion: '1.0.0-pro',
    timestamp: new Date().toISOString()
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      setTrackingParams({
        utm_source: urlParams.get('utm_source') || 'direct',
        utm_medium: urlParams.get('utm_medium') || 'web',
        utm_campaign: urlParams.get('utm_campaign') || 'academy_launch',
        utm_content: urlParams.get('utm_content') || 'main_cta',
        referrer: document.referrer || 'direct',
        landingPageVersion: '1.0.0-pro',
        timestamp: new Date().toISOString()
      });
    }
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Vorname ist erforderlich.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-Mail-Adresse ist erforderlich.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Bitte gib eine gültige E-Mail-Adresse ein.';
    }

    if (!formData.socialHandle.trim()) {
      newErrors.socialHandle = 'Dein Social-Media-Handle oder Portfolio-Link ist erforderlich.';
    }

    if (!formData.creatorStage) {
      newErrors.creatorStage = 'Bitte wähle deinen aktuellen Creator-Status aus.';
    }

    if (!formData.contentType.trim()) {
      newErrors.contentType = 'Bitte gib deinen primären Content-Bereich an.';
    }

    if (!formData.mainGoal) {
      newErrors.mainGoal = 'Bitte wähle dein geschäftliches Hauptziel aus.';
    }

    if (!formData.isEighteenPlus) {
      newErrors.isEighteenPlus = 'Du musst bestätigen, dass du mindestens 18 Jahre alt bist.';
    }

    if (!formData.privacyConsent) {
      newErrors.privacyConsent = 'Du musst den Datenschutzbestimmungen zustimmen, um deine Bewerbung abzuschicken.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error for that field immediately upon user typing/selecting
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }

    trackEvent('Application Form Field Edited', { field: name });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Bot trap detection
    if (honeypot) {
      console.warn('Spam submission intercepted.');
      return;
    }

    if (!validate()) {
      trackEvent('Application Form Error', { errors });
      return;
    }

    setIsSubmitting(true);
    trackEvent('Application Form Started', { stage: formData.creatorStage, goal: formData.mainGoal });

    try {
      // Simulate real CRM/Webhook dispatch with UTM tracking & safety payload
      const payload = {
        applicant: formData,
        tracking: trackingParams,
        sourceUrl: window.location.href,
        submittedAt: new Date().toISOString()
      };

      // Simulated network latency
      await new Promise((resolve) => setTimeout(resolve, 1200));

      console.log('[SnapSell Academy CRM Submission Payload]', payload);
      setIsSubmitted(true);
      trackEvent('Application Form Completed', { applicantEmail: formData.email });
    } catch (err) {
      console.error('Submission error:', err);
      setErrors({ form: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="apply"
      className="relative py-24 sm:py-32 bg-[#101310] border-t border-[#171B18] overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171B18] border border-[#00C875]/30 text-[#00C875] text-xs font-semibold tracking-wider uppercase mb-4">
            <UserCheck className="w-3.5 h-3.5 text-[#00C875]" />
            ACADEMY-BEWERBUNG
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#F4F7F5] tracking-tight leading-[1.05] mb-4">
            FÜR ACADEMY-ZUGANG BEWERBEN
          </h2>

          <p className="text-base text-[#99A49F] leading-relaxed">
            Teile uns mit, wo du aktuell stehst und was du aufbauen möchtest. Jede Bewerbung wird individuell geprüft.
          </p>
        </div>

        {/* The Form or Success State Box */}
        <div className="rounded-3xl bg-[#050706] border-2 border-[#171B18] p-6 sm:p-10 shadow-2xl relative">
          
          {isSubmitted ? (
            /* Success State */
            <div className="py-12 px-4 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#00C875]/20 border-2 border-[#00C875] flex items-center justify-center mx-auto text-[#00C875]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-heading font-bold text-[#00C875] uppercase tracking-widest">
                  Bewerbungsbestätigung
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#F4F7F5]">
                  DEINE BEWERBUNG WURDE ERFOLGREICH ÜBERMITTELT
                </h3>
              </div>

              <p className="text-sm sm:text-base text-[#99A49F] max-w-lg mx-auto leading-relaxed">
                Vielen Dank für deine Bewerbung bei Mark Aurels SnapSell Academy. Deine Angaben werden sorgfältig geprüft, und unser Team meldet sich bei dir, wenn dein Profil zu den verfügbaren Programmen oder Creator-Möglichkeiten passt.
              </p>

              <div className="p-4 rounded-xl bg-[#101310] border border-[#171B18] max-w-md mx-auto text-left text-xs text-[#99A49F] space-y-1">
                <div><strong className="text-[#F4F7F5]">Bewerber:</strong> {formData.firstName} ({formData.email})</div>
                <div><strong className="text-[#F4F7F5]">Status:</strong> {formData.creatorStage}</div>
                <div><strong className="text-[#F4F7F5]">Hauptziel:</strong> {formData.mainGoal}</div>
                <div><strong className="text-[#F4F7F5]">Tracking-Referenz:</strong> {trackingParams.utm_source} • {trackingParams.utm_campaign}</div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs text-[#00C875] hover:underline font-semibold cursor-pointer"
                >
                  Eine weitere Anfrage senden oder Angaben bearbeiten
                </button>
              </div>
            </div>
          ) : (
            /* Application Form */
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              
              {/* Honeypot Spam Protection (Hidden) */}
              <input
                type="text"
                name="website_honeypot"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Form General Error Alert */}
              {errors.form && (
                <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errors.form}</span>
                </div>
              )}

              {/* Row 1: First Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-xs font-semibold text-[#F4F7F5] uppercase tracking-wider mb-2">
                    Vorname <span className="text-[#00C875]">*</span>
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="z. B. Elena"
                    className={`w-full bg-[#101310] rounded-xl px-4 py-3.5 text-sm text-[#F4F7F5] border transition-colors outline-none focus:border-[#00C875] ${
                      errors.firstName ? 'border-rose-500' : 'border-[#171B18]'
                    }`}
                  />
                  {errors.firstName && (
                    <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-[#F4F7F5] uppercase tracking-wider mb-2">
                    E-Mail-Adresse <span className="text-[#00C875]">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="elena@beispiel.de"
                    className={`w-full bg-[#101310] rounded-xl px-4 py-3.5 text-sm text-[#F4F7F5] border transition-colors outline-none focus:border-[#00C875] ${
                      errors.email ? 'border-rose-500' : 'border-[#171B18]'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Social Media Handle & Primary Content Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="socialHandle" className="block text-xs font-semibold text-[#F4F7F5] uppercase tracking-wider mb-2">
                    Social-Media-Handle oder Profillink <span className="text-[#00C875]">*</span>
                  </label>
                  <input
                    id="socialHandle"
                    name="socialHandle"
                    type="text"
                    value={formData.socialHandle}
                    onChange={handleInputChange}
                    placeholder="@handle oder Profil-URL"
                    className={`w-full bg-[#101310] rounded-xl px-4 py-3.5 text-sm text-[#F4F7F5] border transition-colors outline-none focus:border-[#00C875] ${
                      errors.socialHandle ? 'border-rose-500' : 'border-[#171B18]'
                    }`}
                  />
                  {errors.socialHandle && (
                    <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.socialHandle}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contentType" className="block text-xs font-semibold text-[#F4F7F5] uppercase tracking-wider mb-2">
                    Content-Bereich / Art des Contents <span className="text-[#00C875]">*</span>
                  </label>
                  <input
                    id="contentType"
                    name="contentType"
                    type="text"
                    value={formData.contentType}
                    onChange={handleInputChange}
                    placeholder="z. B. Lifestyle, Fitness, Modeling, Performance"
                    className={`w-full bg-[#101310] rounded-xl px-4 py-3.5 text-sm text-[#F4F7F5] border transition-colors outline-none focus:border-[#00C875] ${
                      errors.contentType ? 'border-rose-500' : 'border-[#171B18]'
                    }`}
                  />
                  {errors.contentType && (
                    <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.contentType}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 3: Current Creator Stage Dropdown */}
              <div>
                <label htmlFor="creatorStage" className="block text-xs font-semibold text-[#F4F7F5] uppercase tracking-wider mb-2">
                  Aktueller Creator-Status <span className="text-[#00C875]">*</span>
                </label>
                <select
                  id="creatorStage"
                  name="creatorStage"
                  value={formData.creatorStage}
                  onChange={handleInputChange}
                  className={`w-full bg-[#101310] rounded-xl px-4 py-3.5 text-sm text-[#F4F7F5] border transition-colors outline-none focus:border-[#00C875] ${
                    errors.creatorStage ? 'border-rose-500' : 'border-[#171B18]'
                  }`}
                >
                  <option value="" disabled>Wähle deinen aktuellen Status...</option>
                  {CREATOR_STAGES.map((stage, idx) => (
                    <option key={idx} value={stage}>
                      {stage}
                    </option>
                  ))}
                </select>
                {errors.creatorStage && (
                  <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.creatorStage}
                  </p>
                )}
              </div>

              {/* Row 4: Main Business Goal Dropdown */}
              <div>
                <label htmlFor="mainGoal" className="block text-xs font-semibold text-[#F4F7F5] uppercase tracking-wider mb-2">
                  Geschäftliches Hauptziel <span className="text-[#00C875]">*</span>
                </label>
                <select
                  id="mainGoal"
                  name="mainGoal"
                  value={formData.mainGoal}
                  onChange={handleInputChange}
                  className={`w-full bg-[#101310] rounded-xl px-4 py-3.5 text-sm text-[#F4F7F5] border transition-colors outline-none focus:border-[#00C875] ${
                    errors.mainGoal ? 'border-rose-500' : 'border-[#171B18]'
                  }`}
                >
                  <option value="" disabled>Wähle dein primäres Ziel...</option>
                  {MAIN_GOALS.map((goal, idx) => (
                    <option key={idx} value={goal}>
                      {goal}
                    </option>
                  ))}
                </select>
                {errors.mainGoal && (
                  <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.mainGoal}
                  </p>
                )}
              </div>

              {/* Row 5: International Production Interest */}
              <div>
                <label className="block text-xs font-semibold text-[#F4F7F5] uppercase tracking-wider mb-2">
                  Möchtest du für ausgewählte internationale Produktionen berücksichtigt werden?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {INTERNATIONAL_OPTIONS.map((opt) => (
                    <label
                      key={opt.value}
                      className={`p-3.5 rounded-xl border flex items-center gap-2.5 cursor-pointer text-xs transition-colors ${
                        formData.internationalInterest === opt.value
                          ? 'bg-[#171B18] border-[#00C875] text-[#F4F7F5]'
                          : 'bg-[#101310] border-[#171B18] text-[#99A49F] hover:text-[#F4F7F5]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="internationalInterest"
                        value={opt.value}
                        checked={formData.internationalInterest === opt.value}
                        onChange={handleInputChange}
                        className="accent-[#00C875]"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Mandatory Checkboxes */}
              <div className="pt-2 space-y-3 border-t border-[#171B18]">
                {/* 18+ Confirmation */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer text-xs text-[#99A49F]">
                    <input
                      type="checkbox"
                      name="isEighteenPlus"
                      checked={formData.isEighteenPlus}
                      onChange={handleInputChange}
                      className="mt-0.5 accent-[#00C875] w-4 h-4 rounded-xs cursor-pointer"
                    />
                    <span>
                      <strong className="text-[#F4F7F5]">Altersbestätigung:</strong> Ich bestätige, dass ich mindestens 18 Jahre alt bin. <span className="text-[#00C875]">*</span>
                    </span>
                  </label>
                  {errors.isEighteenPlus && (
                    <p className="mt-1 ml-7 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.isEighteenPlus}
                    </p>
                  )}
                </div>

                {/* Privacy Policy Consent */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer text-xs text-[#99A49F]">
                    <input
                      type="checkbox"
                      name="privacyConsent"
                      checked={formData.privacyConsent}
                      onChange={handleInputChange}
                      className="mt-0.5 accent-[#00C875] w-4 h-4 rounded-xs cursor-pointer"
                    />
                    <span>
                      Ich stimme der Verarbeitung meiner Bewerbungsdaten gemäß der{' '}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          if (onOpenPrivacy) onOpenPrivacy();
                        }}
                        className="text-[#00C875] underline hover:text-[#24E68A]"
                      >
                        Datenschutzerklärung
                      </button>
                      {' '}zu. <span className="text-[#00C875]">*</span>
                    </span>
                  </label>
                  {errors.privacyConsent && (
                    <p className="mt-1 ml-7 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.privacyConsent}
                    </p>
                  )}
                </div>
              </div>

              {/* Primary Form Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-8 bg-[#00C875] hover:bg-[#24E68A] text-[#050706] font-heading font-bold text-sm tracking-wider uppercase rounded-full shadow-lg shadow-[#00C875]/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>BEWERBUNG WIRD ÜBERMITTELT...</span>
                    </>
                  ) : (
                    <>
                      <span>JETZT BEWERBEN</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Form Disclosure Permanently Visible */}
              <div className="pt-2 text-[11px] text-[#99A49F] text-center leading-relaxed">
                Bewerbungen werden individuell geprüft. Der Zugang zur Academy, professionelle Produktionen, internationale Reisen und weitere Möglichkeiten hängen von der Eignung, Verfügbarkeit, den Kampagnenanforderungen und dem gewählten Service-Level ab. Die Teilnahme garantiert kein bestimmtes finanzielles Ergebnis.
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
