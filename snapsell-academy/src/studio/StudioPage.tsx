import { useLanguage, LanguageSwitch } from "./Language";
import {
  Children,
  cloneElement,
  isValidElement,
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
  useSpring,
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
  ["About Mark", "#mark"],
  ["Support", "#partnerschaft"],
  ["How it works", "#system"],
  ["Cyprus", "#zypern"],
  ["FAQ", "#faq"],
];

function ImageReveal({
  children,
  className,
  delay,
}: {
  children: ReactNode;
  className: string;
  delay: number;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  // Observe the unclipped frame: a fully clipped target never intersects.
  const visible = useInView(frame, {
    once: true,
    amount: 0.16,
    margin: "0px 0px -35px 0px",
  });
  return (
    <div ref={frame} className={className}>
      <motion.div
        className="image-reveal-content"
        initial={reduced ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
        animate={{
          clipPath: visible || reduced
            ? "inset(0% 0% 0% 0%)"
            : "inset(100% 0% 0% 0%)",
        }}
        transition={{ duration: reduced ? 0 : 1.05, ease, delay: reduced ? 0 : delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "rise",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "rise" | "image" | "card";
}) {
  const reduced = useReducedMotion();
  if (variant === "image") {
    return <ImageReveal className={className} delay={delay}>{children}</ImageReveal>;
  }
  const hidden =
    variant === "card"
        ? { opacity: 0, y: 90, rotate: 2, scale: 0.96 }
        : { opacity: 0, y: 65 };
  return (
    <motion.div
      className={className}
      initial={reduced ? false : hidden}
      whileInView={{
        opacity: 1,
        y: 0,
        rotate: 0,
        scale: 1,
        clipPath: "inset(0% 0% 0% 0%)",
      }}
      viewport={{ once: true, amount: 0.16, margin: "0px 0px -35px 0px" }}
      transition={{
        duration: reduced ? 0 : 1.05,
        ease,
        delay: reduced ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
}
function AnimatedHeading({
  children,
  as = "h2",
  ready = true,
}: {
  children: ReactNode;
  as?: "h1" | "h2";
  ready?: boolean;
}) {
  const reduced = useReducedMotion();
  let index = 0;
  const textContent = (nodes: ReactNode): string =>
    Children.toArray(nodes)
      .map((node) => {
        if (typeof node === "string" || typeof node === "number")
          return String(node);
        if (isValidElement<{ children?: ReactNode }>(node))
          return node.type === "br" ? " " : textContent(node.props.children);
        return "";
      })
      .join("")
      .replace(/\s+/g, " ")
      .trim();
  const split = (nodes: ReactNode): ReactNode =>
    Children.map(nodes, (node) => {
      if (typeof node === "string")
        return node.split(/(\s+)/).map((word, i) => {
          if (!word.trim()) return word;
          const order = index++;
          return (
            <span
              className="heading-word-mask"
              aria-hidden="true"
              key={`${order}-${i}`}
            >
              <motion.span
                variants={{
                  hidden: { y: "115%", rotate: 5 },
                  visible: {
                    y: 0,
                    rotate: 0,
                    transition: {
                      duration: 0.95,
                      delay: Math.min(order * 0.055, 0.45),
                      ease,
                    },
                  },
                }}
              >
                {word}
              </motion.span>
            </span>
          );
        });
      if (isValidElement<{ children?: ReactNode }>(node) && node.type !== "br")
        return cloneElement(node, {}, split(node.props.children));
      return node;
    });
  const Heading = as === "h1" ? motion.h1 : motion.h2;
  return (
    <Heading
      aria-label={textContent(children)}
      initial={reduced ? false : "hidden"}
      whileInView={ready ? "visible" : "hidden"}
      viewport={{ once: false, amount: 0.45, margin: "0px 0px -25px 0px" }}
    >
      {reduced ? children : split(children)}
    </Heading>
  );
}
function Label({ children, number }: { children: ReactNode; number: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="section-label"
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: reduced ? 0 : 0.7, ease }}
    >
      <span>({children})</span>
      <span>({number})</span>
      <motion.i
        aria-hidden="true"
        className="section-rule"
        initial={reduced ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: reduced ? 0 : 1.1, ease }}
      />
    </motion.div>
  );
}
function Expand({
  open,
  children,
  id,
  labelledBy,
}: {
  open: boolean;
  children: ReactNode;
  id: string;
  labelledBy?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      id={id}
      role={labelledBy ? "region" : undefined}
      aria-labelledby={labelledBy}
      aria-hidden={!open}
      inert={!open}
      initial={false}
      animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
      transition={{ duration: reduced ? 0 : 0.45, ease }}
      className="expand-panel"
    >
      {children}
    </motion.div>
  );
}
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 30 });
  return (
    <motion.div
      className="scroll-progress"
      aria-hidden="true"
      style={{ scaleX: reduced ? scrollYProgress : progress }}
    />
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
  const opacity = useTransform(
    progress,
    [i / total, Math.min(1, (i + 2) / total)],
    [0.25, 1],
  );
  return (
    <motion.span aria-hidden="true" style={{ opacity, color: "#f5f5f2" }}>
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
  const { t } = useLanguage();
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
        aria-label={t("Mark Aurel Creator Agency – Home")}
      >
        <span>
          MARK AUREL<span className="brand-dot">✳</span>
        </span>
        <small>
          CREATOR AGENCY <b>× SNAPSELL</b>
        </small>
      </a>
      <nav className="desktop-nav" aria-label={t("Main navigation")}>
        {navigation.map(([title, href]) => (
          <a key={href} href={href}>
            {t(title)}
          </a>
        ))}
      </nav>
      <LanguageSwitch />
      <a
        className="header-apply"
        href="#bewerbung"
        onClick={() => setOpen(false)}
      >
        {t("Apply")} <ArrowUpRight size={16} aria-hidden="true" />
      </a>
      <button
        ref={toggle}
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? t("Close menu") : t("Open menu")}
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      <nav
        id="mobile-nav"
        className="mobile-nav"
        aria-label={t("Mobile Navigation")}
        hidden={!open}
      >
        {navigation.map(([title, href], i) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            <small>0{i + 1}</small>
            {t(title)}
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
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const stageY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  return (
    <section id="hero-content" className="hero" ref={heroRef}>
      <motion.div className="hero-stage" style={{ y: reduced ? 0 : stageY }}>
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
          alt={t("Mark Aurel, founder of the Creator Agency")}
          width="540"
          height="768"
          fetchPriority="high"
          initial={reduced ? false : { opacity: 0, y: 85, scale: 0.94 }}
          animate={
            ready
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 85, scale: 0.94 }
          }
          transition={{ duration: reduced ? 0 : 1.5, ease }}
        />
        <div className="hero-side-note">
          <span>CREATOR.</span>
          <span>MENTOR.</span>
          <span>{t("INDUSTRY CONNECTOR.")}</span>
        </div>
        {!reduced && (
          <button
            className="hero-motion"
            onClick={() => setPaused(!paused)}
            aria-label={
              paused ? t("Resume scrolling text") : t("Pause scrolling text")
            }
          >
            {paused ? <Play size={12} /> : <Pause size={12} />}
            {paused ? t("RESUME TEXT") : t("PAUSE TEXT")}
          </button>
        )}
        <a className="hero-scroll" href="#realitaet">
          <ArrowDown size={16} /> {t("EXPLORE")}
        </a>
        <span className="hero-signature">
          {t("Personal. Professional.")}
          <br />
          {t("Moving forward with you.")}
        </span>
      </motion.div>
      <div className="hero-bottom">
        <AnimatedHeading as="h1" ready={ready}>
          {t("Your talent.")}
          <br />
          {t("A stronger")}
          <br className="mobile-br" /> <span>{t("Creator Business.")}</span>
        </AnimatedHeading>
        <p>
          {t("Build your brand with personal support, professional content guidance, and modern technology.")}
        </p>
        <div className="hero-actions">
          <Action href="#bewerbung">{t("Start your application")}</Action>
          <a className="text-link" href="#system">
            {t("How it works")} <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

const challenges = [
  [
    "You create the content.",
    "Hours spent planning, styling, shooting, and editing every individual piece of content.",
  ],
  [
    "You answer every message.",
    "Tied to your phone around the clock, across time zones, answering the same questions again and again.",
  ],
  [
    "You manage multiple platforms.",
    "Juggling different algorithms, paywalls, and sales channels without one central place to manage it all.",
  ],
  [
    "And valuable opportunities still slip away.",
    "Slow responses can cost you valuable digital sales and collaborations.",
  ],
];
function Reality() {
  const { t } = useLanguage();
  return (
    <section id="realitaet" className="section reality">
      <Label number="02">{t("The creator reality")}</Label>
      <div className="editorial-intro">
        <Reveal>
          <AnimatedHeading>
            {t("Still managing everything")}
            <br />
            {t("alone?")}
          </AnimatedHeading>
        </Reveal>
        <ScrollText text={t("The everyday demands of being a creator force you to juggle ten roles at once, draining your energy for what really matters.")} />
      </div>
      <div className="reality-grid">
        <Reveal className="challenge-list">
          {challenges.map(([title, description], i) => (
            <article key={title}>
              <span className="number">0{i + 1}</span>
              <div>
                <h3>{t(title)}</h3>
                <p>{t(description)}</p>
              </div>
            </article>
          ))}
        </Reveal>
        <Reveal className="reality-image" variant="image" delay={0.12}>
          <img
            src={img("timeline")}
            alt={t("A video editing timeline")}
            loading="lazy"
          />
          <span>{t("CONTENT. AROUND THE CLOCK.")}</span>
        </Reveal>
        <Reveal className="reality-image" variant="image" delay={0.28}>
          <img
            src={img("content-editing")}
            alt={t("Mark working at an editing desk in the studio")}
            loading="lazy"
          />
          <span>{t("TIME FOR A BETTER SYSTEM.")}</span>
        </Reveal>
      </div>
      <Reveal className="reality-quote">
        <small>{t("THE ACADEMY APPROACH")}</small>
        <p>
          {t("“You don’t need to work harder.")}
          <br />
          <span>{t("You need a better system.”")}</span>
        </p>
        <ArrowDown size={28} />
      </Reveal>
    </section>
  );
}
function MeetMark() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const roles = [
    {
      role: "Creator.",
      photo: "mark-studio",
      desc: t("Creator experience · Production expertise"),
      alt: t("Mark in his studio beside a camera and editing desk"),
    },
    {
      role: "Mentor.",
      photo: "mark-mentor",
      desc: t("Personal guidance"),
      alt: t("Mark leading a workshop with creators"),
    },
    {
      role: t("Industry connector."),
      photo: "network",
      desc: t("Network · Collaboration"),
      alt: t("Mark with a production team in the studio"),
    },
  ];
  return (
    <section id="mark" className="section meet-mark">
      <Label number="03">{t("About Mark")}</Label>
      <div className="meet-heading">
        <AnimatedHeading>
          {t("Meet Mark")}
          <br />
          <span>{t("Aurel.")}</span>
        </AnimatedHeading>
        <p>{t("Creator. Mentor. Industry connector.")}</p>
      </div>
      <div className="role-tabs" role="group" aria-label={t("Mark’s roles")}>
        {roles.map((role, i) => (
          <button
            key={role.role}
            id={`role-tab-${i}`}
            aria-pressed={active === i}
            aria-controls={`role-panel-${i}`}
            onClick={() => setActive(i)}
          >
            <small>0{i + 1}</small>
            {t(role.role)}
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
          <img src={img(role.photo)} alt={t(role.alt)} loading="lazy" />
          <div className="meet-panel-caption">
            <span>{t(role.desc)}</span>
            <span>MARK AUREL ↗</span>
          </div>
        </div>
      ))}
      <Reveal className="meet-bio">
        <span className="eyebrow">{t("EXPERIENCE THAT CONNECTS.")}</span>
        <p>
          {t("Mark brings together years of experience in production, creator projects, and industry relationships with a professional system for creator development.")}
        </p>
        <a
          className="round-link"
          href="#partnerschaft"
          aria-label={t("More about working together")}
        >
          <ArrowDown />
        </a>
      </Reveal>
    </section>
  );
}

const pillars = [
  {
    title: "POSITIONING",
    text: "Define your identity, understand your audience, and find your direction.",
    photo: "positioning",
    thumb: "coaching",
    alt: "Mark and a creator planning content together",
  },
  {
    title: "CONTENT",
    text: "Create professional content with a clear structure and plan.",
    photo: "production",
    thumb: "production-detail",
    alt: "A camera crew working on a production with Mark",
  },
  {
    title: "COMMERCE",
    text: "Turn attention into digital products and offers.",
    photo: "commerce",
    thumb: "commerce-detail",
    alt: "Mark showing creators digital offers on a smartphone",
  },
];
function PhotoPanel({
  panel,
  index,
}: {
  panel: (typeof pillars)[number];
  index: number;
}) {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 30,
  });
  const y = useTransform(smoothProgress, [0, 1], ["-8%", "8%"]);
  const cardY = useTransform(smoothProgress, [0.1, 0.5, 1], [120, 0, -45]);
  const cardScale = useTransform(smoothProgress, [0.1, 0.5], [0.9, 1]);
  return (
    <article className="photo-panel" ref={ref}>
      <motion.img
        className="panel-background"
        src={img(panel.photo)}
        alt={t(panel.alt)}
        loading="lazy"
        style={{ y: reduced ? 0 : y }}
      />
      <a
        className="panel-explore"
        href="#partnerschaft"
        aria-label={t(`Explore ${panel.title.toLowerCase()} support`)}
      >
        <span>{t("EXPLORE")}</span>
        <ArrowUpRight size={20} />
      </a>
      <span className="panel-number">0{index + 1} / 03</span>
      <motion.div
        className="panel-card"
        style={{ y: reduced ? 0 : cardY, scale: reduced ? 1 : cardScale }}
      >
        <h3>
          <small>0{index + 1}</small>
          {t(panel.title)}
        </h3>
        <img src={img(panel.thumb)} alt="" loading="lazy" />
        <p>{t(panel.text)}</p>
      </motion.div>
      <span className="panel-footer">
        MARK AUREL CREATOR AGENCY <span>POWERED BY SNAPSELL</span>
      </span>
    </article>
  );
}
function System() {
  const { t } = useLanguage();
  return (
    <section id="system" className="system">
      <div className="section system-intro">
        <Label number="04">{t("The agency system")}</Label>
        <Reveal className="system-title">
          <span className="eyebrow">{t("YOUR CREATIVITY. OUR STRUCTURE.")}</span>
          <AnimatedHeading>
            {t("A complete system")}
            <br />
            {t("behind your")}
            <br />
            <span>{t("Creator Business.")}</span>
          </AnimatedHeading>
        </Reveal>
      </div>
      {pillars.map((panel, i) => (
        <PhotoPanel key={panel.title} panel={panel} index={i} />
      ))}
    </section>
  );
}
function Partnership() {
  const { t } = useLanguage();
  const groups = [
    [t("You receive"), [t("Support"), t("Content support"), t("Technology"), t("Strategy")]],
    [t("You bring"), [t("Personality"), "Content", t("Participation"), t("Approvals")]],
    [
      t("Together, we build"),
      [t("Long-term collaboration"), t("Creator growth"), t("Professional processes")],
    ],
  ] as const;
  return (
    <section id="partnerschaft" className="section partnership light-section">
      <Label number="05">{t("The partnership")}</Label>
      <Reveal className="partnership-heading">
        <AnimatedHeading>
          {t("Coaching included.")}
          <br />
          <span>
            {t("A clear structure")}
            <br />
            {t("from day one.")}
          </span>
        </AnimatedHeading>
        <p>
          {t("Personal guidance.")}
          <br />{t("A shared path forward.")}
        </p>
      </Reveal>
      <div className="partnership-grid">
        {groups.map(([title, items], i) => (
          <Reveal key={title} variant="card" delay={i * 0.15}>
            <small>0{i + 1}</small>
            <h3>{t(title)}</h3>
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
          alt={t("Mark in a one-to-one conversation with a creator")}
          loading="lazy"
        />
        <span>
          {t("Personal.")}
          <br />
          {t("From day one.")}
        </span>
      </div>
    </section>
  );
}
function Team() {
  const { t } = useLanguage();
  const team = [
    [
      "Mark",
      t("Experience. Guidance. Connections."),
      "mark-portrait",
      t("Mark Aurel in a creative studio"),
    ],
    [
      "Team",
      t("Marketing. Technology. Operations."),
      "production",
      t("The production team at work"),
    ],
    [
      "Creator",
      t("Identity. Content. Growth."),
      "creator",
      t("A creator planning content with Mark"),
    ],
  ];
  return (
    <section className="section team">
      <Label number="06">{t("Stronger together")}</Label>
      <Reveal className="split-heading">
        <AnimatedHeading>
          Mark + Team
          <br />
          <span>{t("+ you.")}</span>
        </AnimatedHeading>
        <p>
          {t("Together → Your creator business.")}
          <br />
          {t("Everyone brings their own strengths.")}
        </p>
      </Reveal>
      <div className="team-grid">
        {team.map(([title, description, photo, alt], i) => (
          <Reveal
            className="team-card"
            key={title}
            variant="card"
            delay={i * 0.18}
          >
            <div className="team-image">
              <img src={img(photo)} alt={t(alt)} loading="lazy" />
              <span>0{i + 1}</span>
            </div>
            <h3>
              {t(title)}
              <ArrowUpRight size={24} />
            </h3>
            <p>{t(description)}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
const workflow = [
  ["Social Media", "Your content. Your identity."],
  ["Community", "Connections with your audience."],
  ["AI Support", "Technology that supports you."],
  ["SnapSell", "Your digital products and offers."],
  ["Sales", "Bringing content and commerce together."],
];
function Workflow() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  return (
    <section id="snapsell" className="section workflow light-section">
      <Label number="07">{t("AI + SnapSell")}</Label>
      <div className="workflow-grid">
        <div>
          <AnimatedHeading>
            {t("Content.")}
            <br />
            {t("Community.")}
            <br />
            <span>{t("Commerce.")}</span>
          </AnimatedHeading>
          <p>
            {t("Personal experience.")}
            <br />
            {t("Modern technology.")}
          </p>
          <div className="workflow-image">
            <AnimatePresence initial={false}>
              <motion.img
                key={active}
                src={img(active < 2 ? "network" : "commerce-detail")}
                initial={reduced ? false : { opacity: 0, scale: 1.12 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.65, ease }}
                alt={
                  active < 2
                    ? t("Creators networking in the studio")
                    : t("Mark explaining a digital offer")
                }
                loading="lazy"
              />
            </AnimatePresence>
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
                  <span>{t(title)}</span>
                  <ArrowUpRight size={22} />
                </button>
              </h3>
              <Expand id={`workflow-${i}`} open={active === i}>
                <p>{t(description)}</p>
                <span className="workflow-progress" aria-hidden="true" />
              </Expand>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function Production() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const nearby = useInView(ref, { once: true, margin: "400px" });
  const visible = useInView(ref, { amount: 0.15 });
  const [playPreference, setPlayPreference] = useState<boolean | null>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const enabled = playPreference ?? !reduced;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const syncPlayback = () => {
      if (enabled && visible && !document.hidden) {
        void video.play().catch(() => {
          // Keep the poster and manual play control when autoplay is blocked.
        });
      } else {
        video.pause();
      }
    };
    syncPlayback();
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, [enabled, visible, nearby, failed]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    setPlayPreference(!playing);
    if (playing) video.pause();
    else void video.play().catch(() => {});
  };

  return (
    <section ref={ref} className="production-section" id="produktion">
      <motion.div
        className="production-media"
        style={{ scale: reduced ? 1 : scale }}
      >
        <img
          src={img("mark-production-poster")}
          alt={t("Mark working with a camera crew on a content production")}
          loading="lazy"
        />
        {nearby && !failed && (
          <video
            ref={videoRef}
            id="mark-production-video"
            src="/media/mark-production-loop.mp4"
            poster={img("mark-production-poster")}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onError={() => {
              setFailed(true);
              setPlaying(false);
            }}
          />
        )}
      </motion.div>
      <div className="production-overlay" />
      <div className="production-content">
        <div className="production-top">
          <Label number="08">{t("Production & content")}</Label>
          {nearby && !failed && (
            <button
              type="button"
              className="production-playback"
              aria-controls="mark-production-video"
              aria-label={playing ? t("Pause film") : t("Play film")}
              onClick={togglePlayback}
            >
              {playing ? (
                <Pause size={16} aria-hidden="true" />
              ) : (
                <Play size={16} aria-hidden="true" />
              )}
              <span>{playing ? t("Pause film") : t("Play film")}</span>
            </button>
          )}
        </div>
        <Reveal>
          <AnimatedHeading>
            {t("Create content")}
            <br />
            <em>{t("with a strategy.")}</em>
          </AnimatedHeading>
        </Reveal>
        <div className="production-bottom">
          <p>
            {t("Plan. Create.")}
            <br />
            {t("Publish. Grow.")}
          </p>
          <Action href="#bewerbung" light>
            {t("Your next step")}
          </Action>
        </div>
      </div>
    </section>
  );
}
function Cyprus() {
  const { t } = useLanguage();
  return (
    <section id="zypern" className="section cyprus">
      <Label number="09">{t("Cyprus Experience")}</Label>
      <div className="cyprus-grid">
        <Reveal className="cyprus-photo" variant="image">
          <img
            src={img("workshop")}
            alt={t("A glimpse of our work together in the production studio")}
            loading="lazy"
          />
          <span>{t("A GLIMPSE OF OUR WORK TOGETHER")}</span>
        </Reveal>
        <Reveal className="cyprus-copy">
          <span className="eyebrow">{t("NEW PERSPECTIVES.")}</span>
          <AnimatedHeading>
            {t("Meet.")}
            <br />
            {t("Create.")}
            <br />
            {t("Connect.")}
            <br />
            <span>{t("In Cyprus.")}</span>
          </AnimatedHeading>
          <div className="cyprus-list">
            <span>
              {t("Training Sessions")} <ArrowUpRight size={18} />
            </span>
            <span>
              {t("Production days")} <ArrowUpRight size={18} />
            </span>
            <span>
              {t("Creator Networking")} <ArrowUpRight size={18} />
            </span>
          </div>
          <p className="fine-print">
            {t("Opportunities depend on selection, availability, and the agreed terms.")}
          </p>
          <a className="text-link" href="#bewerbung">
            {t("Register your interest")} <ArrowRight size={18} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
const faqs = [
  [
    "What does the Mark Aurel Creator Agency offer?",
    "Personal support, professional content guidance, and modern technology, brought together in a system built around positioning, content, and commerce.",
  ],
  [
    "Is coaching included in the partnership?",
    "Yes. Coaching is included, with a clear structure from day one. We agree on the details of the partnership together.",
  ],
  [
    "Who is Mark Aurel?",
    "A creator, mentor, and industry connector. Mark brings years of production experience, creator projects, and industry relationships into a professional system for creator development.",
  ],
  [
    "Is a stay in Cyprus included?",
    "Opportunities in Cyprus depend on selection, availability, and the agreed terms. A stay is not automatically included.",
  ],
  [
    "What happens next?",
    "Apply, have a conversation, agree on the details, and get started. Tell us where you are now and what you want to build.",
  ],
];
function FAQ() {
  const { t } = useLanguage();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="section faq light-section">
      <Label number="10">{t("Good to know")}</Label>
      <div className="faq-grid">
        <div>
          <AnimatedHeading>
            {t("Your questions.")}
            <br />
            <span>{t("Clear answers.")}</span>
          </AnimatedHeading>
          <a className="text-link" href="#bewerbung">
            {t("Let’s talk")} <ArrowUpRight size={18} />
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
                  <span>{t(question)}</span>
                  <Plus className={open === i ? "rotated" : ""} size={22} />
                </button>
              </h3>
              <Expand
                id={`faq-answer-${i}`}
                labelledBy={`faq-question-${i}`}
                open={open === i}
              >
                <p>{t(answer)}</p>
              </Expand>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
function Application() {
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const endpoint = import.meta.env.VITE_APPLICATION_ENDPOINT?.trim();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!endpoint) {
      setMessage(
        "Applications are not open yet. No information has been sent.",
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
      setMessage("Thank you. Your application has been submitted.");
      form.reset();
    } catch {
      setState("error");
      setMessage(
        "Your application could not be submitted. Please try again later.",
      );
    }
  };
  return (
    <section id="bewerbung" className="section application">
      <Label number="11">{t("Your next step")}</Label>
      <Reveal className="application-title">
        <AnimatedHeading>
          {t("Your next step")}
          <br />
          {t("is")} <em>{t("simple.")}</em>
        </AnimatedHeading>
        <p>
          {t("Personality meets opportunity.")}
          <br />
          {t("Let’s discover what we can build together.")}
        </p>
      </Reveal>
      <ol className="application-process">
        {[t("Apply"), t("Conversation"), t("Agreement"), "Start"].map((step, i) => (
          <motion.li
            key={step}
            initial={reduced ? false : { opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: reduced ? 0 : 0.7,
              delay: reduced ? 0 : i * 0.12,
              ease,
            }}
          >
            <small>0{i + 1}</small>
            {step}
            <ArrowUpRight size={20} />
          </motion.li>
        ))}
      </ol>
      <div className="application-grid">
        <div className="application-photo">
          <img
            src={img("mark-portrait")}
            alt={t("Mark Aurel, ready for a personal conversation")}
            loading="lazy"
          />
          <div>
            <p>
              {t("Your talent.")}
              <br />
              {t("Your story.")}
              <br />
              <span>{t("Our shared journey.")}</span>
            </p>
            <small>MARK AUREL · CREATOR AGENCY</small>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="application-form">
          <div className="form-heading">
            <h3>{t("Let’s get to know you.")}</h3>
            <span>{t("01 — APPLICATION")}</span>
          </div>
          <div className="form-fields">
            <label>
              Name
              <input
                name="name"
                autoComplete="name"
                placeholder={t("Your name")}
                required
                maxLength={120}
              />
            </label>
            <label>
              {t("Email")}
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder={t("you@example.com")}
                required
                maxLength={200}
              />
            </label>
            <label>
              Instagram
              <input
                name="instagram"
                placeholder={t("@your.profile")}
                required
                maxLength={150}
              />
            </label>
            <label>
              {t("Country")}
              <input
                name="country"
                autoComplete="country-name"
                placeholder={t("Your country")}
                required
                maxLength={100}
              />
            </label>
            <label className="full-field">
              {t("Creator level")}
              <select name="level" required defaultValue="">
                <option value="" disabled>
                  {t("Where are you right now?")}
                </option>
                <option value="I’m just getting started">{t("I’m just getting started")}</option>
                <option value="I already create content">{t("I already create content")}</option>
                <option value="I have a community">{t("I have a community")}</option>
                <option value="I earn money from my content">{t("I earn money from my content")}</option>
              </select>
            </label>
            <label className="full-field">
              {t("Your goal")}
              <textarea
                name="goal"
                rows={3}
                placeholder={t("What would you like to build?")}
                required
                maxLength={2500}
              />
            </label>
          </div>
          <label className="honeypot" aria-hidden="true">
            {t("Company")}
            <input name="mk_hp" tabIndex={-1} autoComplete="new-password" />
          </label>
          <label className="consent">
            <input type="checkbox" name="consent" required />{t("I would like to be contacted to discuss my application.")}
          </label>
          {!endpoint && (
            <p className="form-note">
              {t("Applications will open soon. No information is being submitted at this time.")}
            </p>
          )}
          <button
            className="submit-button"
            disabled={state === "sending" || !endpoint}
            type="submit"
          >
            <span>
              {state === "sending" ? t("Sending …") : t("Submit application")}
            </span>
            <ArrowUpRight size={24} />
          </button>
          <p
            className={`form-status ${state}`}
            role="status"
            aria-live="polite"
          >
            {t(message)}
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
  const { t } = useLanguage();
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
          aria-label={t("Close")}
        >
          <X />
        </button>
        <small>MARK AUREL CREATOR AGENCY</small>
        <h2 id="legal-title">{t(kind ?? "")}</h2>
        <p>
          {kind === "Legal notice"
            ? t("Verified business and contact details will be added before launch.")
            : t("The full privacy policy will be added before applications open.")}
        </p>
        <button className="dialog-back" onClick={() => ref.current?.close()}>
          {t("Back to the website")} <ArrowRight size={18} />
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
  const { t } = useLanguage();
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
            {t("Personal experience. Professional production.")}
            <br />
            {t("Modern technology. For your creator business.")}
          </p>
        </div>
        <nav aria-label={t("Footer Navigation")}>
          {navigation.map(([title, href]) => (
            <a key={href} href={href}>
              {t(title)}
              <ArrowUpRight size={15} />
            </a>
          ))}
        </nav>
        <div className="footer-contact">
          <span>{t("YOUR TALENT. YOUR NEXT STEP.")}</span>
          <a href="#bewerbung">
            {t("Let’s")}
            <br />
            {t("talk.")} <ArrowUpRight />
          </a>
        </div>
      </div>
      <Marquee paused={paused} footer />
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Mark Aurel Creator Agency</span>
        <div>
          <button onClick={() => setLegal("Privacy policy")}>
            {t("Privacy policy")}
          </button>
          <button onClick={() => setLegal("Legal notice")}>{t("Legal notice")}</button>
          <a href="#bewerbung">{t("Contact")}</a>
        </div>
        {!reduced && (
          <button
            className="motion-control"
            onClick={() => setPaused(!paused)}
            aria-label={
              paused ? t("Resume scrolling text") : t("Pause scrolling text")
            }
          >
            {paused ? <Play size={13} /> : <Pause size={13} />}
            <span>
              {paused ? t("Resume scrolling text") : t("Pause scrolling text")}
            </span>
          </button>
        )}
        <a href="#hero" className="back-top">
          {t("Back to top")} <ArrowUpRight size={16} />
        </a>
      </div>
      <LegalDialog kind={legal} close={() => setLegal(null)} />
    </footer>
  );
}
function Intro({ onComplete }: { onComplete: () => void }) {
  const { t } = useLanguage();
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
        {t("Skip intro")} <ArrowUpRight size={16} />
      </button>
      <span className="intro-count" aria-hidden="true">
        {count.toString().padStart(2, "0")}
        <small>%</small>
      </span>
      <p>{t("YOUR TALENT. A STRONGER CREATOR BUSINESS.")}</p>
    </motion.div>
  );
}
export default function StudioPage() {
  const { t } = useLanguage();
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
        <ScrollProgress />
        <a className="skip-link" href="#main-content">
          {t("Skip to content")}
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
