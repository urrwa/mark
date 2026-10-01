import { AIPromptData, ChecklistItem, RequiredAsset } from '../types';

export const CREATOR_STAGES = [
  "Ich bereite mich auf den Start vor",
  "Ich habe angefangen, Content zu erstellen",
  "Ich habe bereits eine Community",
  "Ich verdiene aktuell mit meinem Content",
  "Ich manage mehrere Creator"
];

export const MAIN_GOALS = [
  "Professionelleren Content produzieren",
  "Eine stärkere persönliche Marke aufbauen",
  "Digitale Inhalte direkt verkaufen",
  "Repetitive Konversationen automatisieren",
  "Professionelle Kooperationen finden",
  "Zugang zu internationalen Möglichkeiten erhalten",
  "Ein strukturierteres Creator-Business aufbauen"
];

export const INTERNATIONAL_OPTIONS = [
  { value: "Yes", label: "Ja, ich interessiere mich für internationale Produktionen" },
  { value: "Maybe", label: "Vielleicht, ich benötige zuerst weitere Informationen" },
  { value: "No", label: "Nein, nur Academy-Zugang" }
];

export const REQUIRED_ASSETS: RequiredAsset[] = [
  { id: '1', title: 'Original SnapSell-Logo als SVG oder transparentes PNG', category: 'Asset', status: 'Placeholder In Use', description: 'Vektoremblem und Marken-Wortmarke für Header und Abschnitte' },
  { id: '2', title: 'Hochauflösende Porträtfotos von Mark Aurel', category: 'Asset', status: 'Placeholder In Use', description: 'Studioporträts unter Wahrung von Gesichtszügen, Styling und Proportionen' },
  { id: '3', title: 'Ganzkörperaufnahmen von Mark Aurel', category: 'Asset', status: 'Placeholder In Use', description: 'Stehende Studio- und redaktionelle Kampagnenaufnahmen' },
  { id: '4', title: 'Professionelle Shooting-Fotografien', category: 'Asset', status: 'Placeholder In Use', description: 'Kuratierte redaktionelle Produktionen und Kampagnenbilder' },
  { id: '5', title: 'Freigegebenes Event-Filmmaterial', category: 'Asset', status: 'Pending Client', description: 'Auftritte bei Live-Events, Panels und Performances' },
  { id: '6', title: 'Freigegebene Behind-the-Scenes-Videos', category: 'Asset', status: 'Placeholder In Use', description: 'Kurze atmosphärische Studio-Videoschleifen als Abschnitts-Hintergründe' },
  { id: '7', title: 'SnapSell-Interface-Screenshots', category: 'Technical', status: 'Placeholder In Use', description: 'Echte UI-Aufnahmen des mobilen Checkouts, Paylinks und Dashboards' },
  { id: '8', title: 'Verifizierte SnapSell-Produktinformationen', category: 'Technical', status: 'Pending Client', description: 'Bestätigter Funktionsumfang und exakte Transaktionsmechanismen' },
  { id: '9', title: 'Marks offizielle Biografie', category: 'Legal', status: 'Placeholder In Use', description: 'Verifizierte Referenzen, Produktionen und Meilensteine' },
  { id: '10', title: 'Offizielle Academy-Kontakt-E-Mail', category: 'Legal', status: 'Placeholder In Use', description: 'Dedizierte Adresse für direkte Anfragen und Bewerberkommunikation' },
  { id: '11', title: 'Offizieller SnapSell-Empfehlungslink', category: 'Technical', status: 'Placeholder In Use', description: 'Ambassador-Partner-Weiterleitungs-URL' },
  { id: '12', title: 'Datenschutzerklärung & Nutzungsbedingungen', category: 'Legal', status: 'Placeholder In Use', description: 'DSGVO-konforme Datenschutz- und AGB-Dokumente' },
  { id: '13', title: 'Creator-Vereinbarung & Werbehinweise', category: 'Legal', status: 'Placeholder In Use', description: 'Offizielle Bedingungen für Academy-Teilnahme und Affiliate-Transparenz' },
  { id: '14', title: 'Freigegebener CRM- oder Webhook-Endpunkt', category: 'Technical', status: 'Pending Client', description: 'Webhook-Ziel für eingehende Bewerberdaten' },
  { id: '15', title: 'Verifizierte Analytics-IDs (GA4 / Meta Pixel)', category: 'Technical', status: 'Pending Client', description: 'Tracking-Container für den Produktivbetrieb' },
  { id: '16', title: 'Einwilligungen für vorgestellte Creator', category: 'Legal', status: 'Pending Client', description: 'Freigabeerklärungen aller abgebildeten Models, Darsteller und Creator' },
  { id: '17', title: 'Bestätigte Reise- & Produktionsmöglichkeiten', category: 'Production', status: 'Placeholder In Use', description: 'Termine und Standortvereinbarungen für internationale Kampagnen' }
];

export const QUALITY_CHECKLIST: ChecklistItem[] = [
  { id: 'q1', text: 'Marks Identität wird in jedem Visual und jeder Referenz gewahrt', category: 'identity', verified: true },
  { id: 'q2', text: 'Keinerlei Erwähnung von „OnlyFans“ im gesamten Code und Text', category: 'safety', verified: true },
  { id: 'q3', text: 'Keine expliziten, sexuellen oder plattformunsicheren Bildinhalte', category: 'safety', verified: true },
  { id: 'q4', text: 'Alle 13 Abschnitte sind in der exakt vorgegebenen Reihenfolge vorhanden', category: 'content', verified: true },
  { id: 'q5', text: 'Alle Texte sind kontrastreich, lesbar und WCAG-AA-konform', category: 'content', verified: true },
  { id: 'q6', text: 'Alle primären und sekundären CTAs lösen das korrekte Scrollen/Verhalten aus', category: 'technical', verified: true },
  { id: 'q7', text: 'Das Bewerbungsformular validiert alle Pflichtfelder mit Inline-Meldungen', category: 'form', verified: true },
  { id: 'q8', text: '18+-Altersbestätigung und Datenschutzeinwilligung sind obligatorisch', category: 'form', verified: true },
  { id: 'q9', text: 'Verantwortungsvolle Einkommensformulierung (20.000 $/Monat strikt als ambitioniertes Ziel)', category: 'content', verified: true },
  { id: 'q10', text: 'Reisen und Produktionen klar als auswahl- und bedingungsabhängig gekennzeichnet', category: 'content', verified: true },
  { id: 'q11', text: 'Professionelle Kooperationen werden nicht verfälscht oder garantiert', category: 'content', verified: true },
  { id: 'q12', text: 'SnapSell-Funktionen entsprechen strikt den Vorgaben des Briefings', category: 'technical', verified: true },
  { id: 'q13', text: 'Keine erfundenen Testimonials, Followerzahlen oder Statistiken', category: 'content', verified: true },
  { id: 'q14', text: 'Mobile Layouts ohne horizontalen Überlauf und Touch-Targets >= 44px', category: 'technical', verified: true },
  { id: 'q15', text: 'Keine abgeschnittenen Gesichter oder verdeckten visuellen Schwerpunkte', category: 'identity', verified: true },
  { id: 'q16', text: 'Bilder und UI-Mockups optimiert mit stabilen Fallbacks', category: 'technical', verified: true },
  { id: 'q17', text: 'Hintergrund-Loops berücksichtigen prefers-reduced-motion', category: 'technical', verified: true },
  { id: 'q18', text: 'Vollständige Tastaturnavigation und sichtbare Fokus-Ringe unterstützt', category: 'technical', verified: true },
  { id: 'q19', text: 'Strukturierte Schema.org JSON-LD und vollständige SEO-Meta-Tags eingebettet', category: 'technical', verified: true },
  { id: 'q20', text: 'Analytics-Tracking für zentrale Funnel-Interaktionen vorbereitet', category: 'technical', verified: true },
  { id: 'q21', text: 'Rechtliche Modals für Impressum, Datenschutz, AGB und Creator-Vereinbarung zugänglich', category: 'safety', verified: true },
  { id: 'q22', text: 'Keine privaten API-Schlüssel oder sensiblen Zugangsdaten im clientseitigen Code', category: 'safety', verified: true }
];

export const AI_VISUAL_PROMPTS: AIPromptData[] = [
  {
    id: 'p1',
    sectionNumber: 1,
    sectionName: 'Abschnitt 1 — Hero',
    title: 'Mark Aurel im internationalen Penthouse mit Blick auf die Stadt',
    prompt: 'Create a hyper-realistic cinematic advertising photograph of the real Mark Aurel in a premium international penthouse at night, overlooking a modern illuminated city. Mark stands confidently but naturally, looking toward the camera with a serious, credible and approachable expression. Use his uploaded reference photographs to preserve his exact identity, face, hairstyle, age, skin texture and body proportions. Dress him in a modern fitted black outfit with subtle luxury details. Place three elegant floating smartphone interfaces around him: a natural AI conversation, an AI content-generation workflow and a premium SnapSell digital-product purchase page. Use deep black, charcoal, emerald-green light accents, realistic glass reflections and soft architectural lighting. Premium creator-economy advertising style, realistic camera optics, natural skin, cinematic depth, detailed clothing, high resolution, no artificial plastic skin, no exaggerated muscles, no fantasy effects, no distorted hands, no altered face, no explicit imagery, no visible third-party logos, no fake text inside the interfaces.'
  },
  {
    id: 'p2',
    sectionNumber: 2,
    sectionName: 'Abschnitt 2 — Aktuelle Herausforderung',
    title: 'Creator allein im dunklen Studio mit vielschichtiger Belastung',
    prompt: 'Create a hyper-realistic editorial scene of a modern creator working alone inside a premium dark studio. The creator is surrounded by layered but organized visual representations of unread messages, editing timelines, content calendars, social-media screens and buyer enquiries. The creator appears focused and slightly overwhelmed, never distressed. Use cinematic low-key lighting with restrained emerald accents, realistic workstation details, natural skin and premium fashion styling. The atmosphere should communicate workload, missed opportunities and complexity while remaining aspirational. Dark creator-economy campaign aesthetic, high detail, natural proportions, no fake readable interface text, no explicit content, no chaotic neon cyberpunk look, no generic call-center appearance.'
  },
  {
    id: 'p3',
    sectionNumber: 3,
    sectionName: 'Abschnitt 3 — Lerne Mark kennen',
    title: 'Mark Aurel im High-End-Produktionsstudio',
    prompt: 'Create a premium hyper-realistic portrait of the real Mark Aurel inside a high-end cinematic production studio. Mark stands confidently beside professional lighting and camera equipment while a small creative team prepares a tasteful creator shoot in the softly blurred background. Preserve Mark’s exact facial features and identity using the supplied reference images. His expression is experienced, calm and trustworthy. Wardrobe: sophisticated black jacket or premium dark smart-casual outfit. Lighting: soft key light, subtle emerald rim light and realistic studio ambience. Editorial campaign photography, natural skin texture, authentic production details, shallow depth of field, no artificial face enhancement, no exaggerated luxury, no explicit styling, no distorted people.'
  },
  {
    id: 'p4',
    sectionNumber: 4,
    sectionName: 'Abschnitt 4 — Das Gesamtsystem',
    title: 'Mark zentral mit drei vernetzten, kreisenden Säulen',
    prompt: 'Create a cinematic composite featuring the real Mark Aurel at the center of a premium dark digital environment. Surround him with three clearly separated visual systems: a smartphone showing a natural AI conversation, a creative content interface transforming one portrait into several formats and a SnapSell purchase journey with a product page and payment confirmation. Connect all three systems using refined emerald-green light paths. Use realistic glass interface layers, black and charcoal architecture, metallic silver details and controlled green illumination. Keep Mark realistic and dominant. Premium technology campaign, sophisticated and human, no holographic science-fiction overload, no fake money, no unreadable dense text, no altered identity.'
  },
  {
    id: 'p5',
    sectionNumber: 5,
    sectionName: 'Abschnitt 5 — KI-Chat-Support',
    title: 'Vertikales Smartphone-Mockup mit KI-Qualifizierung & Übergabe',
    prompt: 'Create a premium vertical smartphone mockup floating inside a dark editorial environment. The screen shows a clean, natural creator-to-buyer conversation with an AI-supported reply, interest qualification, an appropriate digital offer and a SnapSell purchase-link preview. Add a clearly visible human-handover indicator. Surround the device with subtle reflections, realistic depth and restrained emerald lighting. The interface must feel modern, private and trustworthy. Do not use real personal information, explicit content, manipulative messages or fake customer claims. Keep interface text minimal and use editable design placeholders.'
  },
  {
    id: 'p6',
    sectionNumber: 6,
    sectionName: 'Abschnitt 6 — KI-Content-Erstellung',
    title: 'Ein freigegebenes Porträt verwandelt sich in fünf Content-Formate',
    prompt: 'Create a clean premium visual transformation showing one approved professional creator portrait becoming five coordinated content formats: a cinematic lifestyle photograph, a vertical travel Reel, an Instagram Story, a talking-head video and a polished campaign visual. Keep the same creator identity, facial features, proportions, styling and brand aesthetic across every output. Use black, charcoal, silver and emerald interface framing. The final composition should demonstrate consistency and scalable production without looking artificial. Hyper-realistic imagery, natural skin and movement, editorial color grading, no duplicated limbs, no changing faces, no unauthorized celebrities, no explicit content and no oversaturated AI appearance.'
  },
  {
    id: 'p7',
    sectionNumber: 7,
    sectionName: 'Abschnitt 7 — SnapSell Direktverkäufe',
    title: 'Mobiles Produkt-Erlebnis in fünf Schritten (Upload bis Auszahlung)',
    prompt: 'Create a premium five-screen mobile product journey on a dark cinematic background. Screen one shows a digital-content upload, screen two shows simple pricing, screen three shows a generated purchase link, screen four shows the link shared through an approved communication channel and screen five shows a successful payment and unlocked digital purchase. Use the original SnapSell logo and brand styling where supplied. Elegant smartphone renders, realistic reflections, black and emerald design, clean UI hierarchy, concise editable text, no fake financial amounts, no third-party trademarks, no explicit thumbnails and no invented platform capabilities.'
  },
  {
    id: 'p8',
    sectionNumber: 8,
    sectionName: 'Abschnitt 8 — Die vernetzte Journey',
    title: 'Creator-Business-Flow in fünf Phasen mit smaragdgrünem Pfad',
    prompt: 'Create a refined creator-business journey using five cinematic scenes connected by one emerald-green pathway: premium content creation, a natural digital conversation, a personalized digital offer, a secure payment confirmation and an organized follow-up dashboard. Use consistent black, charcoal, silver and emerald styling. Make every stage visually distinct while retaining one cohesive premium campaign aesthetic. Human-centered technology, realistic mobile devices and subtle depth, no complicated futuristic graphics, no fake revenue, no explicit imagery.'
  },
  {
    id: 'p9',
    sectionNumber: 9,
    sectionName: 'Abschnitt 9 — Mark & das Expertenteam',
    title: 'Behind-the-Scenes-Produktion mit vielseitigen Spezialisten',
    prompt: 'Create a hyper-realistic behind-the-scenes creator production with the real Mark Aurel standing confidently alongside a diverse professional team. Show a content strategist reviewing a storyboard, an AI specialist working with a clean content interface, a photographer operating a professional camera, a filmmaker adjusting cinematic equipment and a growth manager reviewing a performance dashboard. Place the group in a premium production studio rather than a corporate office. Use natural collaboration, realistic body language, authentic equipment, deep charcoal styling and subtle emerald accents. No stiff poses, no fake team logos, no explicit content, no distorted hands or faces.'
  },
  {
    id: 'p10',
    sectionNumber: 10,
    sectionName: 'Abschnitt 10 — Globaler Creator-Lifestyle',
    title: 'Internationale Creator-Produktionen (Dubai, Zypern, Ibiza)',
    prompt: 'Dubai Prompt: Create a hyper-realistic cinematic creator production in Dubai at golden hour. The real Mark Aurel and a small diverse group of adult creators are participating in a professional rooftop shoot overlooking modern architecture. Show professional cameras, subtle lighting equipment and a creative director at work. Premium black fashion with refined emerald accents, natural confident body language, realistic sunset lighting, international campaign quality, tasteful luxury, no excessive wealth symbols, no private jets, no money, no explicit clothing, no altered faces. Cyprus Prompt: Create a premium cinematic creator shoot on the Cyprus coastline during soft morning light... Ibiza Prompt: Create an editorial creator campaign in Ibiza during blue hour at a modern coastal villa...'
  },
  {
    id: 'p11',
    sectionNumber: 11,
    sectionName: 'Abschnitt 11 — Professionelle Produktionen',
    title: 'Split-Screen-Produktionsprozess vs. polierte Kampagne',
    prompt: 'Create a hyper-realistic behind-the-scenes fashion and creator production inside an architectural studio. Show the real Mark Aurel collaborating with an experienced photographer, filmmaker, creative director and stylist. Include professional cinema cameras, large soft lights, a storyboard monitor and carefully prepared wardrobe. On one side, show the authentic production process; on the other, reveal the polished final campaign image. Premium editorial photography, realistic human interaction, black and silver production styling with subtle emerald accents, highly detailed equipment, natural skin and no explicit imagery.'
  },
  {
    id: 'p12',
    sectionNumber: 12,
    sectionName: 'Abschnitt 12 — Wachstumspotenzial',
    title: 'Dark-Mode-Creator-Business-Dashboard mit abstrakten Trends',
    prompt: 'Create a premium dark-mode creator-business dashboard displayed on a large elegant interface beside the real Mark Aurel. Show progress categories for content consistency, qualified conversations, published offers, completed purchases, returning buyers and collaborations. Use abstract trend lines and percentage-free progress indicators rather than invented financial values. Black and charcoal interface, emerald-green data highlights, metallic silver typography and realistic screen reflections. Sophisticated business-growth visual, no cash imagery, no fake bank balance, no guaranteed-success symbolism and no unreadable clutter.'
  },
  {
    id: 'p13',
    sectionNumber: 13,
    sectionName: 'Abschnitt 13 — Finaler CTA',
    title: 'Filmische Abschlussszene mit Mark und selbstbewussten Creatorn',
    prompt: 'Create a cinematic high-end campaign image featuring the real Mark Aurel with a diverse group of confident adult creators at an international production location during sunset. Mark stands at the center as an experienced guide and industry connector. The creators appear professional, ambitious and individual rather than posed as identical models. Integrate three refined visual symbols representing AI chat, AI content creation and SnapSell direct sales. Use premium black styling, subtle emerald accents, natural warm light and realistic facial detail. Inspirational creator-economy advertising, no explicit outfits, no unrealistic wealth, no artificial faces, no distorted anatomy and no generic corporate composition.'
  }
];

export const DESTINATIONS = [
  {
    id: 'dubai',
    name: 'Dubai, VAE',
    tagline: 'Architektonische Rooftops zur Golden Hour',
    description: 'Kontrastreiche Skyline-Shootings, zeitgenössische Architekturräume und exklusive Penthouse-Studioproduktionen zur Dämmerung.',
    atmosphere: 'Moderne Exklusivität & architektonische Eleganz',
    productionFocus: 'High-Fashion-Editorial, kommerzieller Lifestyle, anspruchsvolle Markenästhetik',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=85',
    alt: 'Filmische Aussicht auf die moderne architektonische Skyline von Dubai zur Golden Hour'
  },
  {
    id: 'cyprus',
    name: 'Zypern-Küste',
    tagline: 'Mediterranes Morgenlicht & naturbelassene Buchten',
    description: 'Natürliche Steinstrukturen, kristallklare Buchten und minimalistische Villen am Meer – perfekt abgestimmt auf organische Creator-Visuals.',
    atmosphere: 'Warmes natürliches Licht & organischer Minimalismus',
    productionFocus: 'Fitness, Wellness-Ästhetik, sonnenverwöhnte filmische Reise-Reels',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=85',
    alt: 'Unberührte Mittelmeerküste auf Zypern im goldenen Morgenlicht'
  },
  {
    id: 'ibiza',
    name: 'Ibiza, Balearische Inseln',
    tagline: 'Küsten-Villen-Kampagnen zur Blauen Stunde',
    description: 'Private Designer-Anwesen, dramatische Küstenklippen und stimmungsvolle Produktionen zur Blauen Stunde mit mobiler Studiobeleuchtung.',
    atmosphere: 'Kreative Exklusivität & Dämmerungs-Cinematics',
    productionFocus: 'Kreativkampagnen, exklusive Lifestyle-Porträts, kollaborative Videoprojekte',
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1200&q=85',
    alt: 'Exklusive Küstenvilla mit Blick auf das Mittelmeer zur Blauen Stunde'
  }
];

// Lightweight event tracker that logs interactions and respects privacy
export const trackEvent = (eventName: string, properties: Record<string, any> = {}) => {
  if (typeof window !== 'undefined') {
    const payload = {
      event: eventName,
      timestamp: new Date().toISOString(),
      path: window.location.pathname,
      ...properties
    };
    // Console log for transparent developer audit
    console.log(`[Academy Analytics Track]`, payload);

    // If window.dataLayer or gtag exists in future
    if ((window as any).dataLayer) {
      (window as any).dataLayer.push(payload);
    }
  }
};
