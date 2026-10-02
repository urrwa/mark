import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Menu,
  Pause,
  Play,
  Plus,
  X,
} from "lucide-react";
import "./studio.css";

const ease = [0.22, 1, 0.36, 1] as const;
const img = (name: string) => `/media/${name}.webp`;
const navigation = [
  ["Über Mark", "#mark"],
  ["Unterstützung", "#partnerschaft"],
  ["So funktioniert es", "#system"],
  ["Zypern", "#zypern"],
  ["FAQ", "#faq"],
];

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  );
}
function Label({ children, number }: { children: ReactNode; number: string }) {
  return (
    <div className="section-label">
      <span>({children})</span>
      <span>({number})</span>
    </div>
  );
}
function Action({
  children,
  href,
  light = false,
}: {
  children: ReactNode;
  href: string;
  light?: boolean;
}) {
  return (
    <a className={`action ${light ? "action-light" : ""}`} href={href}>
      <span>{children}</span>
      <span className="action-icon">
        <ArrowUpRight size={19} aria-hidden="true" />
      </span>
    </a>
  );
}
function Word({
  value,
  i,
  total,
  progress,
}: {
  value: string;
  i: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const color = useTransform(
    progress,
    [i / total, Math.min(1, (i + 2) / total)],
    ["#747873", "#f5f5f2"],
  );
  return (
    <motion.span aria-hidden="true" style={{ color }}>
      {value}{" "}
    </motion.span>
  );
}
function ScrollText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 50%"],
  });
  const words = text.split(" ");
  return (
    <p ref={ref} className="scroll-copy">
      <span className="sr-only">{text}</span>
      {reduced ? (
        <span aria-hidden="true">{text}</span>
      ) : (
        words.map((word, i) => (
          <Word
            key={i}
            value={word}
            i={i}
            total={words.length}
            progress={scrollYProgress}
          />
        ))
      )}
    </p>
  );
}
function Marquee({
  paused,
  footer = false,
}: {
  paused: boolean;
  footer?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  return (
    <div
      ref={ref}
      className={`marquee ${footer ? "footer-marquee" : ""}`}
      aria-hidden="true"
    >
      <div
        className="marquee-track"
        style={{
          animationPlayState: paused || !visible ? "paused" : "running",
        }}
      >
        {[0, 1].map((n) => (
          <span className="marquee-group" key={n}>
            MARK AUREL<span className="marquee-star">✳</span>CREATOR AGENCY
            <span className="marquee-star">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);
  return (
    <header className="header" ref={menuRef}>
      <a
        className="brand"
        href="#hero"
        aria-label="Mark Aurel Creator Agency – Startseite"
      >
        <span>
          MARK AUREL<span className="brand-dot">✳</span>
        </span>
        <small>
          CREATOR AGENCY <b>× SNAPSELL</b>
        </small>
      </a>
      <nav className="desktop-nav" aria-label="Hauptnavigation">
        {navigation.map(([title, href]) => (
          <a key={href} href={href}>
            {title}
          </a>
        ))}
      </nav>
      <a
        className="header-apply"
        href="#bewerbung"
        onClick={() => setOpen(false)}
      >
        Bewerben <ArrowUpRight size={16} aria-hidden="true" />
      </a>
      <button
        ref={toggle}
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Menü schließen" : "Menü öffnen"}
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      <nav
        id="mobile-nav"
        className="mobile-nav"
        aria-label="Mobile Navigation"
        hidden={!open}
      >
        {navigation.map(([title, href], i) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            <small>0{i + 1}</small>
            {title}
            <ArrowUpRight size={18} />
          </a>
        ))}
      </nav>
    </header>
  );
}
function Hero({
  paused,
  setPaused,
  ready,
}: {
  paused: boolean;
  setPaused: (value: boolean) => void;
  ready: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <section id="hero-content" className="hero">
      <div className="hero-stage">
        <div className="hero-meta">
          <span>MARK AUREL CREATOR AGENCY</span>
          <span>
            <i />
            POWERED BY SNAPSELL
          </span>
        </div>
        <Marquee paused={paused} />
        <motion.img
          className="hero-portrait"
          src={img("mark-cutout")}
          alt="Mark Aurel, Gründer der Creator Agency"
          width="540"
          height="768"
          fetchPriority="high"
          initial={reduced ? false : { opacity: 0, y: 32 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 1.1, ease }}
        />
        <div className="hero-side-note">
          <span>CREATOR.</span>
          <span>MENTOR.</span>
          <span>BRANCHENVERBINDER.</span>
        </div>
        {!reduced && (
          <button
            className="hero-motion"
            onClick={() => setPaused(!paused)}
            aria-label={paused ? "Lauftext fortsetzen" : "Lauftext pausieren"}
          >
            {paused ? <Play size={12} /> : <Pause size={12} />}
            {paused ? "LAUFTEXT STARTEN" : "LAUFTEXT PAUSIEREN"}
          </button>
        )}
        <a className="hero-scroll" href="#realitaet">
          <ArrowDown size={16} /> ENTDECKEN
        </a>
        <span className="hero-signature">
          Persönlich. Professionell.
          <br />
          Mit dir nach vorne.
        </span>
      </div>
      <div className="hero-bottom">
        <h1>
          Dein Talent.
          <br />
          Ein stärkeres
          <br className="mobile-br" /> <span>Creator-Business.</span>
        </h1>
        <p>
          Baue deine Marke mit persönlicher Unterstützung, professioneller
          Content-Hilfe und moderner Technologie auf.
        </p>
        <div className="hero-actions">
          <Action href="#bewerbung">Bewerbung starten</Action>
          <a className="text-link" href="#system">
            So funktioniert es <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

const challenges = [
  [
    "Du erstellst den Content.",
    "Stundenlanges manuelles Planen, Stylen, Shooten und Bearbeiten jedes einzelnen Assets.",
  ],
  [
    "Du beantwortest jede Nachricht.",
    "Rund um die Uhr über verschiedene Zeitzonen hinweg an dein Smartphone gefesselt, um immer dieselben Fragen zu beantworten.",
  ],
  [
    "Du verwaltest mehrere Plattformen.",
    "Unterschiedliche Algorithmen, Paywalls und Vertriebskanäle jonglieren – ohne eine zentrale Schaltstelle.",
  ],
  [
    "Und wertvolle Chancen gehen trotzdem verloren.",
    "Lange Antwortzeiten kosten wertvolle digitale Käufe und Kooperationen.",
  ],
];
function Reality() {
  return (
    <section id="realitaet" className="section reality">
      <Label number="02">Die Creator-Realität</Label>
      <div className="editorial-intro">
        <Reveal>
          <h2>
            Immer noch alles
            <br />
            alleine managen?
          </h2>
        </Reveal>
        <ScrollText text="Der traditionelle Creator-Alltag zwingt dich dazu, zehn Rollen gleichzeitig zu übernehmen – und raubt dir die Energie für das, was wirklich zählt." />
      </div>
      <div className="reality-grid">
        <Reveal className="challenge-list">
          {challenges.map(([title, description], i) => (
            <article key={title}>
              <span className="number">0{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </Reveal>
        <Reveal className="reality-image">
          <img
            src={img("timeline")}
            alt="Timeline einer Videobearbeitung"
            loading="lazy"
          />
          <span>CONTENT. RUND UM DIE UHR.</span>
        </Reveal>
        <Reveal className="reality-image" delay={0.12}>
          <img
            src={img("content-editing")}
            alt="Mark arbeitet am Schnittplatz im Studio"
            loading="lazy"
          />
          <span>ZEIT FÜR EIN BESSERES SYSTEM.</span>
        </Reveal>
      </div>
      <Reveal className="reality-quote">
        <small>DAS ACADEMY-PARADIGMA</small>
        <p>
          „Du musst nicht härter arbeiten.
          <br />
          <span>Du brauchst ein besseres System.“</span>
        </p>
        <ArrowDown size={28} />
      </Reveal>
    </section>
  );
}
function MeetMark() {
  const [active, setActive] = useState(0);
  const roles = [
    {
      role: "Creator.",
      photo: "mark-studio",
      desc: "Creator Erfahrung · Produktionswissen",
      alt: "Mark in seinem Studio, neben Kamera und Schnittplatz",
    },
    {
      role: "Mentor.",
      photo: "mark-mentor",
      desc: "Persönliche Begleitung",
      alt: "Mark bei einem Workshop mit Creatorn",
    },
    {
      role: "Branchenverbinder.",
      photo: "network",
      desc: "Netzwerk · Zusammenarbeit",
      alt: "Mark mit einem Produktionsteam im Studio",
    },
  ];
  return (
    <section id="mark" className="section meet-mark">
      <Label number="03">Lerne Mark kennen</Label>
      <div className="meet-heading">
        <h2>
          Lerne Mark
          <br />
          <span>Aurel kennen.</span>
        </h2>
        <p>Creator. Mentor. Branchenverbinder.</p>
      </div>
      <div className="role-tabs" role="group" aria-label="Marks Rollen">
        {roles.map((role, i) => (
          <button
            key={role.role}
            id={`role-tab-${i}`}
            aria-pressed={active === i}
            aria-controls={`role-panel-${i}`}
            onClick={() => setActive(i)}
          >
            <small>0{i + 1}</small>
            {role.role}
            <ArrowUpRight size={20} />
          </button>
        ))}
      </div>
      {roles.map((role, i) => (
        <div
          key={role.role}
          id={`role-panel-${i}`}
          role="region"
          aria-labelledby={`role-tab-${i}`}
          hidden={active !== i}
          className="meet-panel"
        >
          <img src={img(role.photo)} alt={role.alt} loading="lazy" />
          <div className="meet-panel-caption">
            <span>{role.desc}</span>
            <span>MARK AUREL ↗</span>
          </div>
        </div>
      ))}
      <Reveal className="meet-bio">
        <span className="eyebrow">ERFAHRUNG, DIE VERBINDET.</span>
        <p>
          Mark verbindet langjährige Erfahrung aus Produktionen,
          Creator-Projekten und persönlichen Kontakten mit einem professionellen
          System für Creator-Entwicklung.
        </p>
        <a
          className="round-link"
          href="#partnerschaft"
          aria-label="Mehr über die Zusammenarbeit"
        >
          <ArrowDown />
        </a>
      </Reveal>
    </section>
  );
}

const pillars = [
  {
    title: "POSITIONIERUNG",
    text: "Entwickle deine Identität, deine Zielgruppe und deine Richtung.",
    photo: "positioning",
    thumb: "coaching",
    alt: "Mark und eine Creatorin planen gemeinsam Inhalte",
  },
  {
    title: "CONTENT",
    text: "Erstelle professionelle Inhalte mit Struktur und Planung.",
    photo: "production",
    thumb: "production-detail",
    alt: "Kamera-Team bei einer Produktion mit Mark",
  },
  {
    title: "COMMERCE",
    text: "Verwandle Aufmerksamkeit in digitale Angebote.",
    photo: "commerce",
    thumb: "commerce-detail",
    alt: "Mark zeigt Creatorn digitale Angebote auf einem Smartphone",
  },
];
function PhotoPanel({
  panel,
  index,
}: {
  panel: (typeof pillars)[number];
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  return (
    <article className="photo-panel" ref={ref}>
      <motion.img
        className="panel-background"
        src={img(panel.photo)}
        alt={panel.alt}
        loading="lazy"
        style={{ y: reduced ? 0 : y }}
      />
      <a className="panel-explore" href="#partnerschaft">
        <span>ENTDECKEN</span>
        <ArrowUpRight size={20} />
      </a>
      <span className="panel-number">0{index + 1} / 03</span>
      <Reveal className="panel-card">
        <h3>
          <small>0{index + 1}</small>
          {panel.title}
        </h3>
        <img src={img(panel.thumb)} alt="" loading="lazy" />
        <p>{panel.text}</p>
      </Reveal>
      <span className="panel-footer">
        MARK AUREL CREATOR AGENCY <span>POWERED BY SNAPSELL</span>
      </span>
    </article>
  );
}
function System() {
  return (
    <section id="system" className="system">
      <div className="section system-intro">
        <Label number="04">Das Agentur-System</Label>
        <Reveal className="system-title">
          <span className="eyebrow">DEINE KREATIVITÄT. UNSERE STRUKTUR.</span>
          <h2>
            Ein komplettes System
            <br />
            hinter deinem
            <br />
            <span>Creator-Business.</span>
          </h2>
        </Reveal>
      </div>
      {pillars.map((panel, i) => (
        <PhotoPanel key={panel.title} panel={panel} index={i} />
      ))}
    </section>
  );
}
function Partnership() {
  const groups = [
    [
      "Du erhältst",
      ["Unterstützung", "Content-Hilfe", "Technologie", "Strategie"],
    ],
    [
      "Du bringst ein",
      ["Persönlichkeit", "Content", "Beteiligung", "Freigaben"],
    ],
    [
      "Gemeinsam entwickeln wir",
      [
        "Langfristige Zusammenarbeit",
        "Creator-Wachstum",
        "Professionelle Prozesse",
      ],
    ],
  ] as const;
  return (
    <section id="partnerschaft" className="section partnership light-section">
      <Label number="05">Die Zusammenarbeit</Label>
      <Reveal className="partnership-heading">
        <h2>
          Coaching inklusive.
          <br />
          <span>
            Klare Strukturen
            <br />
            von Anfang an.
          </span>
        </h2>
        <p>
          Persönliche Begleitung.
          <br />
          Ein gemeinsamer Weg.
        </p>
      </Reveal>
      <div className="partnership-grid">
        {groups.map(([title, items], i) => (
          <Reveal key={title} delay={i * 0.08}>
            <small>0{i + 1}</small>
            <h3>{title}</h3>
            <ul>
              {items.map((item) => (
                <li key={item}>
                  <Check size={16} />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
      <div className="partnership-photo">
        <img
          src={img("coaching")}
          alt="Mark im persönlichen Gespräch mit einer Creatorin"
          loading="lazy"
        />
        <span>
          Persönlich.
          <br />
          Von Anfang an.
        </span>
      </div>
    </section>
  );
}
function Team() {
  const team = [
    [
      "Mark",
      "Erfahrung. Guidance. Netzwerk.",
      "mark-portrait",
      "Mark Aurel im Kreativstudio",
    ],
    [
      "Team",
      "Marketing. Technologie. Organisation.",
      "production",
      "Das Produktionsteam bei der Arbeit",
    ],
    [
      "Creator",
      "Identität. Content. Wachstum.",
      "creator",
      "Creatorin plant gemeinsam mit Mark Inhalte",
    ],
  ];
  return (
    <section className="section team">
      <Label number="06">Gemeinsam mehr bewegen</Label>
      <Reveal className="split-heading">
        <h2>
          Mark + Team
          <br />
          <span>+ du.</span>
        </h2>
        <p>
          Gemeinsam → Creator-Business.
          <br />
          Jeder bringt seine Stärke ein.
        </p>
      </Reveal>
      <div className="team-grid">
        {team.map(([title, description, photo, alt], i) => (
          <Reveal className="team-card" key={title} delay={i * 0.08}>
            <div className="team-image">
              <img src={img(photo)} alt={alt} loading="lazy" />
              <span>0{i + 1}</span>
            </div>
            <h3>
              {title}
              <ArrowUpRight size={24} />
            </h3>
            <p>{description}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
const workflow = [
  ["Social Media", "Dein Content. Deine Identität."],
  ["Community", "Verbindungen zu deiner Zielgruppe."],
  ["AI Unterstützung", "Technologie als Unterstützung."],
  ["SnapSell", "Deine digitalen Angebote."],
  ["Verkauf", "Content und Commerce zusammenbringen."],
];
function Workflow() {
  const [active, setActive] = useState(0);
  return (
    <section id="snapsell" className="section workflow light-section">
      <Label number="07">AI + SnapSell</Label>
      <div className="workflow-grid">
        <div>
          <h2>
            Content.
            <br />
            Community.
            <br />
            <span>Commerce.</span>
          </h2>
          <p>
            Persönliche Erfahrung.
            <br />
            Moderne Technologie.
          </p>
          <div className="workflow-image">
            <img
              src={img(active < 2 ? "network" : "commerce-detail")}
              alt={
                active < 2
                  ? "Creator-Netzwerk im Studio"
                  : "Mark erklärt ein digitales Angebot"
              }
              loading="lazy"
            />
          </div>
        </div>
        <div className="workflow-steps">
          {workflow.map(([title, description], i) => (
            <div
              className={`workflow-step ${active === i ? "active" : ""}`}
              key={title}
            >
              <h3>
                <button
                  aria-expanded={active === i}
                  aria-controls={`workflow-${i}`}
                  onClick={() => setActive(i)}
                >
                  <small>0{i + 1}</small>
                  <span>{title}</span>
                  <ArrowUpRight size={22} />
                </button>
              </h3>
              <div id={`workflow-${i}`} hidden={active !== i}>
                <p>{description}</p>
                <span className="workflow-progress" aria-hidden="true" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function Production() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  return (
    <section ref={ref} className="production-section" id="produktion">
      <motion.img
        src={img("production")}
        alt="Filmproduktion mit Mark und einem Kamerateam"
        loading="lazy"
        style={{ scale: reduced ? 1 : scale }}
      />
      <div className="production-overlay" />
      <div className="production-content">
        <Label number="08">Produktion & Content</Label>
        <Reveal>
          <h2>
            Erstelle Content
            <br />
            <em>mit Strategie.</em>
          </h2>
        </Reveal>
        <div className="production-bottom">
          <p>
            Planen. Erstellen.
            <br />
            Veröffentlichen. Wachsen.
          </p>
          <Action href="#bewerbung" light>
            Dein nächster Schritt
          </Action>
        </div>
      </div>
    </section>
  );
}
function Cyprus() {
  return (
    <section id="zypern" className="section cyprus">
      <Label number="09">Zypern Experience</Label>
      <div className="cyprus-grid">
        <Reveal className="cyprus-photo">
          <img
            src={img("workshop")}
            alt="Einblick in die gemeinsame Arbeit im Produktionsstudio"
            loading="lazy"
          />
          <span>EINBLICKE IN UNSERE ZUSAMMENARBEIT</span>
        </Reveal>
        <Reveal className="cyprus-copy">
          <span className="eyebrow">NEUE PERSPEKTIVEN.</span>
          <h2>
            Treffen.
            <br />
            Produzieren.
            <br />
            Verbinden.
            <br />
            <span>In Zypern.</span>
          </h2>
          <div className="cyprus-list">
            <span>
              Training Sessions <ArrowUpRight size={18} />
            </span>
            <span>
              Produktionstage <ArrowUpRight size={18} />
            </span>
            <span>
              Creator Networking <ArrowUpRight size={18} />
            </span>
          </div>
          <p className="fine-print">
            Verfügbare Möglichkeiten hängen von Auswahl, Verfügbarkeit und
            vereinbarten Bedingungen ab.
          </p>
          <a className="text-link" href="#bewerbung">
            Interesse anmelden <ArrowRight size={18} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
const faqs = [
  [
    "Was bietet die Mark Aurel Creator Agency?",
    "Persönliche Unterstützung, professionelle Content-Hilfe und moderne Technologie – als System aus Positionierung, Content und Commerce.",
  ],
  [
    "Ist Coaching in der Zusammenarbeit enthalten?",
    "Ja. Coaching ist inklusive, mit klaren Strukturen von Anfang an. Die konkrete Zusammenarbeit wird gemeinsam vereinbart.",
  ],
  [
    "Wer ist Mark Aurel?",
    "Creator, Mentor und Branchenverbinder. Mark verbindet langjährige Erfahrung aus Produktionen, Creator-Projekten und persönlichen Kontakten mit einem professionellen System für Creator-Entwicklung.",
  ],
  [
    "Gehört ein Aufenthalt auf Zypern dazu?",
    "Möglichkeiten in Zypern hängen von Auswahl, Verfügbarkeit und den vereinbarten Bedingungen ab. Ein Aufenthalt ist nicht automatisch enthalten.",
  ],
  [
    "Wie läuft der nächste Schritt ab?",
    "Bewerben, Gespräch, Vereinbarung, Start. Teile uns mit, wo du stehst und was du aufbauen möchtest.",
  ],
];
function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="section faq light-section">
      <Label number="10">Gut zu wissen</Label>
      <div className="faq-grid">
        <div>
          <h2>
            Deine Fragen.
            <br />
            <span>Klare Antworten.</span>
          </h2>
          <a className="text-link" href="#bewerbung">
            Lass uns sprechen <ArrowUpRight size={18} />
          </a>
        </div>
        <div>
          {faqs.map(([question, answer], i) => (
            <article className="faq-item" key={question}>
              <h3>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-question-${i}`}
                >
                  <span>{question}</span>
                  <Plus className={open === i ? "rotated" : ""} size={22} />
                </button>
              </h3>
              <div
                id={`faq-answer-${i}`}
                role="region"
                aria-labelledby={`faq-question-${i}`}
                hidden={open !== i}
              >
                <p>{answer}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
function Application() {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const endpoint = import.meta.env.VITE_APPLICATION_ENDPOINT?.trim();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!endpoint) {
      setMessage(
        "Das Bewerbungsformular ist noch nicht freigeschaltet. Es wurden keine Daten gesendet.",
      );
      setState("error");
      return;
    }
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data.mk_hp) {
      setState("idle");
      return;
    }
    delete data.mk_hp;
    setState("sending");
    setMessage("");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(20000),
      });
      if (!response.ok) throw new Error("Submission failed");
      setState("success");
      setMessage("Vielen Dank. Deine Bewerbung wurde übermittelt.");
      form.reset();
    } catch {
      setState("error");
      setMessage(
        "Deine Bewerbung konnte nicht übermittelt werden. Bitte versuche es später erneut.",
      );
    }
  };
  return (
    <section id="bewerbung" className="section application">
      <Label number="11">Dein nächster Schritt</Label>
      <Reveal className="application-title">
        <h2>
          Dein nächster Schritt
          <br />
          ist <em>einfach.</em>
        </h2>
        <p>
          Persönlichkeit trifft Möglichkeiten.
          <br />
          Lass uns herausfinden, was wir gemeinsam aufbauen können.
        </p>
      </Reveal>
      <ol className="application-process">
        {["Bewerben", "Gespräch", "Vereinbarung", "Start"].map((step, i) => (
          <li key={step}>
            <small>0{i + 1}</small>
            {step}
            <ArrowUpRight size={20} />
          </li>
        ))}
      </ol>
      <div className="application-grid">
        <div className="application-photo">
          <img
            src={img("mark-portrait")}
            alt="Mark Aurel freut sich auf ein persönliches Gespräch"
            loading="lazy"
          />
          <div>
            <p>
              Dein Talent.
              <br />
              Deine Geschichte.
              <br />
              <span>Unser gemeinsamer Weg.</span>
            </p>
            <small>MARK AUREL · CREATOR AGENCY</small>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="application-form">
          <div className="form-heading">
            <h3>Lass uns kennenlernen.</h3>
            <span>01 — BEWERBUNG</span>
          </div>
          <div className="form-fields">
            <label>
              Name
              <input
                name="name"
                autoComplete="name"
                placeholder="Dein Name"
                required
                maxLength={120}
              />
            </label>
            <label>
              E-Mail
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="du@beispiel.de"
                required
                maxLength={200}
              />
            </label>
            <label>
              Instagram
              <input
                name="instagram"
                placeholder="@dein.profil"
                required
                maxLength={150}
              />
            </label>
            <label>
              Land
              <input
                name="country"
                autoComplete="country-name"
                placeholder="Dein Land"
                required
                maxLength={100}
              />
            </label>
            <label className="full-field">
              Creator-Level
              <select name="level" required defaultValue="">
                <option value="" disabled>
                  Wo stehst du gerade?
                </option>
                <option>Ich stehe am Anfang</option>
                <option>Ich erstelle bereits Content</option>
                <option>Ich habe eine Community</option>
                <option>Ich verdiene mit meinem Content</option>
              </select>
            </label>
            <label className="full-field">
              Dein Ziel
              <textarea
                name="goal"
                rows={3}
                placeholder="Was möchtest du aufbauen?"
                required
                maxLength={2500}
              />
            </label>
          </div>
          <label className="honeypot" aria-hidden="true">
            Company
            <input name="mk_hp" tabIndex={-1} autoComplete="new-password" />
          </label>
          <label className="consent">
            <input type="checkbox" name="consent" required />
            Ich möchte zur Besprechung meiner Bewerbung kontaktiert werden.
          </label>
          {!endpoint && (
            <p className="form-note">
              Bewerbungen werden in Kürze freigeschaltet. Aktuell werden keine
              Daten übermittelt.
            </p>
          )}
          <button
            className="submit-button"
            disabled={state === "sending" || !endpoint}
            type="submit"
          >
            <span>
              {state === "sending" ? "Wird gesendet …" : "Bewerbung senden"}
            </span>
            <ArrowUpRight size={24} />
          </button>
          <p
            className={`form-status ${state}`}
            role="status"
            aria-live="polite"
          >
            {message}
          </p>
        </form>
      </div>
    </section>
  );
}
function LegalDialog({
  kind,
  close,
}: {
  kind: string | null;
  close: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (kind) ref.current?.showModal();
    else ref.current?.close();
  }, [kind]);
  return (
    <dialog
      ref={ref}
      className="legal-dialog"
      aria-labelledby="legal-title"
      onClose={close}
      onClick={(event) => {
        if (event.target === event.currentTarget) ref.current?.close();
      }}
    >
      <div className="legal-dialog-body">
        <button
          className="dialog-close"
          onClick={() => ref.current?.close()}
          aria-label="Schließen"
        >
          <X />
        </button>
        <small>MARK AUREL CREATOR AGENCY</small>
        <h2 id="legal-title">{kind}</h2>
        <p>
          {kind === "Impressum"
            ? "Die verifizierten Anbieter- und Kontaktdaten werden vor der Veröffentlichung ergänzt."
            : "Die vollständigen Datenschutzhinweise werden vor der Freischaltung des Bewerbungsformulars ergänzt."}
        </p>
        <button className="dialog-back" onClick={() => ref.current?.close()}>
          Zurück zur Website <ArrowRight size={18} />
        </button>
      </div>
    </dialog>
  );
}
function Footer({
  paused,
  setPaused,
}: {
  paused: boolean;
  setPaused: (value: boolean) => void;
}) {
  const [legal, setLegal] = useState<string | null>(null);
  const reduced = useReducedMotion();
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <a className="brand footer-brand" href="#hero">
            <span>
              MARK AUREL<span className="brand-dot">✳</span>
            </span>
            <small>CREATOR AGENCY · POWERED BY SNAPSELL</small>
          </a>
          <p>
            Persönliche Erfahrung. Professionelle Produktion.
            <br />
            Moderne Technologie. Für dein Creator-Business.
          </p>
        </div>
        <nav aria-label="Footer Navigation">
          {navigation.map(([title, href]) => (
            <a key={href} href={href}>
              {title}
              <ArrowUpRight size={15} />
            </a>
          ))}
        </nav>
        <div className="footer-contact">
          <span>DEIN TALENT. DEIN NÄCHSTER SCHRITT.</span>
          <a href="#bewerbung">
            Lass uns
            <br />
            sprechen. <ArrowUpRight />
          </a>
        </div>
      </div>
      <Marquee paused={paused} footer />
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Mark Aurel Creator Agency</span>
        <div>
          <button onClick={() => setLegal("Datenschutz")}>Datenschutz</button>
          <button onClick={() => setLegal("Impressum")}>Impressum</button>
          <a href="#bewerbung">Kontakt</a>
        </div>
        {!reduced && (
          <button
            className="motion-control"
            onClick={() => setPaused(!paused)}
            aria-label={paused ? "Lauftext fortsetzen" : "Lauftext pausieren"}
          >
            {paused ? <Play size={13} /> : <Pause size={13} />}
            <span>{paused ? "Lauftext starten" : "Lauftext pausieren"}</span>
          </button>
        )}
        <a href="#hero" className="back-top">
          Nach oben <ArrowUpRight size={16} />
        </a>
      </div>
      <LegalDialog kind={legal} close={() => setLegal(null)} />
    </footer>
  );
}
function Intro({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 1100);
      setCount(Math.round(progress * 100));
      if (progress < 1) frame = requestAnimationFrame(tick);
      else onComplete();
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onComplete]);
  return (
    <motion.div
      className="intro"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.7, ease }}
    >
      <div>
        <span>MARK AUREL</span>
        <small>CREATOR AGENCY × SNAPSELL</small>
      </div>
      <button onClick={onComplete}>
        Überspringen <ArrowUpRight size={16} />
      </button>
      <span className="intro-count" aria-hidden="true">
        {count.toString().padStart(2, "0")}
        <small>%</small>
      </span>
      <p>DEIN TALENT. EIN STÄRKERES CREATOR-BUSINESS.</p>
    </motion.div>
  );
}
export default function StudioPage() {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [intro, setIntro] = useState(() => {
    try {
      return (
        !sessionStorage.getItem("mark-intro-seen") &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    } catch {
      return false;
    }
  });
  const finishIntro = useRef(() => {
    setIntro(false);
    try {
      sessionStorage.setItem("mark-intro-seen", "1");
    } catch {
      /* Storage is optional. */
    }
  }).current;
  useEffect(() => {
    if (reduced) finishIntro();
  }, [reduced, finishIntro]);
  const effectivePaused = paused || !!reduced;
  return (
    <>
      <AnimatePresence>
        {intro && <Intro onComplete={finishIntro} />}
      </AnimatePresence>
      <div className="studio-site" inert={intro}>
        <a className="skip-link" href="#main-content">
          Zum Inhalt
        </a>
        <Header />
        <main id="main-content">
          <div className="hero-overlap" id="hero">
            <Hero
              paused={effectivePaused}
              setPaused={setPaused}
              ready={!intro}
            />
            <Reality />
          </div>
          <MeetMark />
          <System />
          <Partnership />
          <Team />
          <Workflow />
          <Production />
          <Cyprus />
          <FAQ />
          <Application />
        </main>
        <Footer paused={effectivePaused} setPaused={setPaused} />
      </div>
    </>
  );
}
