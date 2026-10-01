import React, { useState, useEffect } from 'react';
import { MessageSquare, Bot, User, CheckCheck, ArrowRight, ShieldCheck, UserCheck, Sparkles, RefreshCw } from 'lucide-react';
import { trackEvent } from '../data/academyData';

export const AIChatSection: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  // Scripted conversation steps representing realistic creator workflow
  const conversationSteps = [
    {
      sender: 'buyer',
      text: 'Hey Mark! Fand deine Story aus Zypern mega. Gibt es das komplette High-Res-Fotoset und das Behind-the-Scenes irgendwo?',
      time: '10:42',
      type: 'question'
    },
    {
      sender: 'ai',
      badge: 'KI-Chat-Assistent',
      text: 'Hey Alex! Freut mich, dass dir die Zypern-Kampagne gefällt. Ja, das exklusive 4K-Master-Set und die komplette 18-minütige Videodokumentation sind gerade heute online gegangen.',
      time: '10:42',
      type: 'natural_response'
    },
    {
      sender: 'ai',
      badge: 'Interessen-Qualifizierung',
      text: 'Suchst du nur nach dem fotografischen Editorial-Bildband oder nach dem Komplettpaket inklusive Kamera-LUTs & Videoarchiv?',
      time: '10:43',
      type: 'qualification'
    },
    {
      sender: 'buyer',
      text: 'Definitiv das Komplettpaket inklusive Videoarchiv!',
      time: '10:43',
      type: 'buyer_selection'
    },
    {
      sender: 'ai',
      badge: 'SnapSell-Angebotslink',
      text: 'Hier ist dein direkter Zugang auf SnapSell. Sofortiger Download und dauerhafter Streaming-Zugang zur Mediathek:',
      paylink: {
        title: 'Zypern Editorial Master-Archiv',
        price: '$59.00',
        actionText: 'Sofort auf SnapSell freischalten ⚡'
      },
      time: '10:44',
      type: 'offer_delivery'
    },
    {
      sender: 'system',
      badge: 'Übergabe an Menschen bereit',
      text: 'Individuelle Anfrage erkannt oder Käufer fragt nach hochpreisiger Zusammenarbeit? Die Konversation wird nahtlos an Mark oder das Management übergeben.',
      time: '10:45',
      type: 'handover'
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < conversationSteps.length - 1 ? prev + 1 : 0));
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, conversationSteps.length]);

  const handleStepClick = (stepIndex: number) => {
    setIsAutoPlaying(false);
    setCurrentStep(stepIndex);
    trackEvent('AI Chat Simulation Step Clicked', { step: stepIndex });
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsAutoPlaying(true);
  };

  return (
    <section
      id="ai-chat"
      className="relative py-24 sm:py-32 bg-[#050706] border-t border-[#171B18] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Copy & Capabilities (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171B18] border border-[#00C875]/30 text-[#00C875] text-xs font-semibold tracking-wider uppercase mb-4 w-fit">
              <Bot className="w-3.5 h-3.5 text-[#00C875]" />
              SÄULE EINS
            </div>

            {/* Headline */}
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#F4F7F5] tracking-tight leading-[1.05] mb-6">
              ERREICHBAR BLEIBEN, OHNE DEN GANZEN TAG ONLINE ZU SEIN
            </h2>

            {/* Main Benefit Callout */}
            <div className="inline-block p-3 rounded-xl bg-[#101310] border border-[#00C875]/40 text-[#00C875] font-heading font-bold text-xs sm:text-sm tracking-wide uppercase mb-8">
              MEHR KONVERSATIONEN. WENIGER REPETITIVE NACHRICHTEN.
            </div>

            {/* Capabilities List */}
            <div className="space-y-3 mb-8">
              <p className="text-sm font-semibold text-[#F4F7F5] uppercase tracking-wider mb-2">
                Dein KI-Assistent kann:
              </p>
              
              {[
                'Häufige Fragen zu deinem Content und Zeitplan beantworten',
                'Käuferinteressen erfassen und hochpreisige Anfragen vorqualifizieren',
                'Passende Angebote und digitale Bundles empfehlen',
                'SnapSell-Kauf-Links direkt im Chat bereitstellen',
                'Automatisch bei nicht abgeschlossenen Checkouts nachhaken',
                'Wichtige Konversationen an dich oder dein Team übergeben'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-[#99A49F]">
                  <div className="w-5 h-5 rounded-full bg-[#171B18] border border-[#00C875]/40 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCheck className="w-3 h-3 text-[#00C875]" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Ethical Framing Note */}
            <div className="p-4 rounded-xl bg-[#101310] border border-[#171B18] flex items-center gap-3 text-xs text-[#99A49F]">
              <ShieldCheck className="w-5 h-5 text-[#00C875] shrink-0" />
              <span>
                <strong>Transparent & verantwortungsbewusst:</strong> Entwickelt als KI-unterstützte Kommunikation mit klarer Übergabe an Menschen – niemals täuschende Imitation.
              </span>
            </div>

          </div>

          {/* Right Column: Interactive Smartphone Mockup (6 cols) */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            {/* Device Container */}
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] rounded-[40px] border-[6px] border-[#171B18] bg-[#101310] shadow-2xl shadow-black/80 overflow-hidden">
              
              {/* Phone Speaker & Camera Notch */}
              <div className="bg-[#171B18] py-2 px-6 flex items-center justify-between">
                <span className="text-[10px] text-[#99A49F] font-mono">10:44</span>
                <div className="w-16 h-4 bg-[#050706] rounded-full mx-auto" />
                <div className="flex items-center gap-1 text-[10px] text-[#99A49F]">
                  <span>5G</span>
                  <div className="w-3.5 h-2 border border-[#99A49F] rounded-xs relative">
                    <div className="w-2 h-1 bg-[#00C875] absolute top-0.5 left-0.5" />
                  </div>
                </div>
              </div>

              {/* Chat Header */}
              <div className="p-3 bg-[#171B18]/80 border-b border-[#171B18] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#00C875]">
                    <img
                      src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&q=80"
                      alt="Mark Aurel assistant"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#00C875] border-2 border-[#101310]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#F4F7F5] flex items-center gap-1">
                      Mark Aurel Studio
                      <span className="text-[9px] bg-[#00C875]/20 text-[#00C875] px-1 rounded">KI</span>
                    </div>
                    <div className="text-[10px] text-[#00C875] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00C875] animate-pulse" />
                      Sofortiger KI-Concierge aktiv
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="p-1.5 rounded-lg bg-[#101310] text-[#99A49F] hover:text-[#00C875] transition-colors"
                  title="Sequenz wiederholen"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Chat Messages Body */}
              <div className="p-4 space-y-3 min-h-[380px] max-h-[420px] overflow-y-auto bg-[#050706]">
                {conversationSteps.slice(0, currentStep + 1).map((msg, index) => {
                  if (msg.sender === 'buyer') {
                    return (
                      <div key={index} className="flex justify-end">
                        <div className="max-w-[82%] bg-[#171B18] text-[#F4F7F5] rounded-2xl rounded-tr-xs p-3 text-xs border border-[#171B18]">
                          <p>{msg.text}</p>
                          <div className="text-[9px] text-[#99A49F] text-right mt-1">{msg.time}</div>
                        </div>
                      </div>
                    );
                  }

                  if (msg.sender === 'system') {
                    return (
                      <div key={index} className="p-2.5 rounded-xl bg-[#101310] border border-[#00C875]/30 text-center animate-fade-in">
                        <div className="inline-flex items-center gap-1 text-[10px] font-bold text-[#00C875] uppercase tracking-wider mb-1">
                          <UserCheck className="w-3 h-3" />
                          {msg.badge}
                        </div>
                        <p className="text-[10px] text-[#99A49F] leading-tight">{msg.text}</p>
                      </div>
                    );
                  }

                  return (
                    <div key={index} className="flex justify-start">
                      <div className="max-w-[85%] bg-[#101310] border border-[#171B18] text-[#F4F7F5] rounded-2xl rounded-tl-xs p-3 text-xs shadow-md">
                        {msg.badge && (
                          <div className="text-[9px] font-bold text-[#00C875] uppercase tracking-wider mb-1 flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5" />
                            {msg.badge}
                          </div>
                        )}
                        <p className="text-[#F4F7F5]/95">{msg.text}</p>

                        {/* Embedded SnapSell Card preview */}
                        {msg.paylink && (
                          <div className="mt-2.5 p-2.5 rounded-xl bg-[#171B18] border border-[#00C875]/40 flex items-center justify-between">
                            <div>
                              <div className="text-[11px] font-bold text-[#F4F7F5]">{msg.paylink.title}</div>
                              <div className="text-[10px] text-[#00C875] font-bold">{msg.paylink.price}</div>
                            </div>
                            <span className="text-[9px] font-bold bg-[#00C875] text-[#050706] px-2 py-1 rounded-full whitespace-nowrap">
                              {msg.paylink.actionText}
                            </span>
                          </div>
                        )}

                        <div className="text-[9px] text-[#99A49F] mt-1">{msg.time}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chat Input Bar */}
              <div className="p-3 bg-[#101310] border-t border-[#171B18] flex items-center gap-2">
                <div className="flex-1 bg-[#050706] rounded-full px-3 py-1.5 text-xs text-[#99A49F] border border-[#171B18]">
                  KI antwortet sofort...
                </div>
                <div className="w-7 h-7 rounded-full bg-[#00C875] flex items-center justify-center text-[#050706]">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

            </div>

            {/* Interactive Timeline Stepper */}
            <div className="flex items-center gap-1.5 mt-4">
              {conversationSteps.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleStepClick(i)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    currentStep === i ? 'w-6 bg-[#00C875]' : 'w-2 bg-[#171B18] hover:bg-[#99A49F]'
                  }`}
                  aria-label={`Zu Konversationsschritt ${i + 1} springen`}
                />
              ))}
            </div>

            <div className="text-[11px] text-[#99A49F] mt-2">
              Schritt {currentStep + 1} von {conversationSteps.length}:{' '}
              <span className="text-[#F4F7F5] font-medium">
                {conversationSteps[currentStep].badge || 'Käuferanfrage'}
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
