import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, useReducedMotion } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  MapPin,
  Building2,
  FileText,
  BarChart3,
  CheckCircle2,
  Sparkles,
  Target,
} from "lucide-react";
import Button from "../../components/common/Button";

const VALUE_PROPS = [
  {
    icon: FileText,
    text: "Resume-aware matching, not just keyword search",
  },
  {
    icon: Building2,
    text: "Every listing reviewed before students see it",
  },
  {
    icon: BarChart3,
    text: "One dashboard for every application's status",
  },
];

const HOW_IT_WORKS = [
  {
    n: "01",
    title: "Build your profile",
    body: "Add your education, projects and skills, then upload a resume for AI-backed feedback before you apply anywhere.",
  },
  {
    n: "02",
    title: "Get matched to roles",
    body: "Every approved opening is scored against your actual resume, so you know where you stand before a recruiter does.",
  },
  {
    n: "03",
    title: "Track it in one place",
    body: "Applications, shortlists and interview stages update automatically as recruiters move you through their pipeline.",
  },
];

// Reusable slow-drifting background icon, used to add ambient motion to a section
const FloatingIcon = ({ Icon, className, delay = 0, duration = 6, size = 26, opacity = "text-primary-300/20" }) => (
  <motion.div
    className={`pointer-events-none absolute ${opacity} ${className}`}
    animate={{
      y: [0, -16, 0],
      opacity: [0.15, 0.35, 0.15],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <Icon size={size} strokeWidth={1.3} />
  </motion.div>
);

// Wraps a section so its content slides in from below as it enters the viewport
const SlideInSection = ({ children, className, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const FloatingCluster = () => {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-60, 60], [4, -4]);
  const rotateY = useTransform(x, [-60, 60], [-4, 4]);

  const handleMouseMove = (e) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const floatLoop = (delay, distance = 10) =>
    reduceMotion
      ? {}
      : {
          animate: { y: [0, -distance, 0] },
          transition: { duration: 5 + delay, repeat: Infinity, ease: "easeInOut", delay },
        };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative mx-auto flex w-full max-w-sm flex-col items-center gap-5 py-4 lg:h-[440px] lg:max-w-none lg:items-stretch lg:py-0"
    >
      {/* Ambient floating icons drifting behind the card cluster */}
      <FloatingIcon Icon={Sparkles} className="left-[-6%] top-2 lg:left-[2%]" delay={0.2} duration={6} size={20} />
      <FloatingIcon Icon={Target} className="right-[2%] top-1/2 lg:right-[-4%]" delay={1.2} duration={7} size={22} />

      <motion.div style={{ rotateX, rotateY }} className="contents lg:[transform-style:preserve-3d]">
        {/* Resume card — paper toned, sits front-left */}
        <motion.div
          {...floatLoop(0, 8)}
          initial={{ opacity: 0, y: 24, rotate: 0 }}
          whileInView={{ opacity: 1, y: 0, rotate: -6 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-20 w-full max-w-[260px] rotate-0 rounded-2xl bg-paper p-5 text-base-950 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] lg:absolute lg:left-2 lg:top-6 lg:-rotate-6"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-sm font-semibold text-white">
              AS
            </div>
            <div>
              <p className="text-sm font-semibold">Aisha Sharma</p>
              <p className="text-xs text-base-950/50">B.Tech, Computer Science</p>
            </div>
          </div>
          <div className="mt-4 space-y-1.5">
            <div className="h-1.5 w-full rounded-full bg-base-950/10" />
            <div className="h-1.5 w-4/5 rounded-full bg-base-950/10" />
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {["React", "Node.js", "SQL"].map((s) => (
              <span
                key={s}
                className="rounded-full bg-primary-600/10 px-2.5 py-1 text-[11px] font-medium text-primary-700"
              >
                {s}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Match score chip */}
        <motion.div
          {...floatLoop(1, 9)}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="relative z-30 -mt-3 ml-auto w-fit rounded-2xl border border-white/10 bg-base-800/90 px-4 py-3 shadow-glow-sm backdrop-blur-md lg:absolute lg:right-4 lg:top-0 lg:mt-0"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-400/15 text-sm font-bold text-accent-300">
              92
            </div>
            <div>
              <p className="text-xs font-medium text-white">Match score</p>
              <p className="text-[11px] text-white/40">Frontend Engineer</p>
            </div>
          </div>
        </motion.div>

        {/* Job card — dark glass, sits behind-right */}
        <motion.div
          {...floatLoop(0.6, 10)}
          initial={{ opacity: 0, y: 24, rotate: 0 }}
          whileInView={{ opacity: 1, y: 0, rotate: 4 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="glass-card relative z-10 w-full max-w-[270px] rotate-0 rounded-2xl p-5 lg:absolute lg:bottom-6 lg:right-0 lg:rotate-4"
        >
          <div className="flex items-start justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-white/70">
              <Briefcase size={16} />
            </div>
            <span className="rounded-full border border-green-500/30 bg-green-500/10 px-2 py-0.5 text-[11px] text-green-300">
              Approved
            </span>
          </div>
          <p className="mt-3 text-sm font-semibold text-white">Frontend Engineer</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-white/40">
            <MapPin size={12} /> Bengaluru · Full Time
          </p>
          <p className="mt-3 text-xs text-white/50">₹8L – ₹14L per annum</p>
        </motion.div>

        {/* Small graduation badge */}
        <motion.div
          {...floatLoop(1.4, 7)}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
          className="relative z-30 -mt-2 flex h-11 w-11 items-center justify-center self-start rounded-full border border-white/10 bg-base-800/90 text-primary-300 shadow-glow-sm backdrop-blur-md lg:absolute lg:bottom-24 lg:left-0 lg:mt-0"
        >
          <GraduationCap size={18} />
        </motion.div>
      </motion.div>
    </div>
  );
};

const Home = () => (
  <div>
    {/* HERO */}
    <section className="relative overflow-hidden border-b border-white/5 px-6 pb-20 pt-14 lg:pb-28 lg:pt-20">
      <div
        className="pointer-events-none absolute -right-40 top-10 h-[420px] w-[420px] rounded-full opacity-30 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.5) 0%, rgba(34,211,238,0.25) 55%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="font-serif-display text-[2.5rem] leading-[1.08] text-white sm:text-5xl lg:text-[3.35rem]">
            Built for the leap
            <br />
            between college and career.
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-white/55">
            PlacementAI pairs verified student profiles with real openings,
            scores the fit against your actual resume, and gets recruiters to
            the right shortlist faster.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link to="/register">
              <Button size="lg">Create your profile</Button>
            </Link>
            <Link to="/register">
              <Button variant="secondary" size="lg">
                Post a role instead
              </Button>
            </Link>
          </div>

          <p className="mt-5 text-sm text-white/40">
            Already using PlacementAI?{" "}
            <Link to="/login" className="text-accent-400 hover:underline">
              Log in
            </Link>
          </p>

          <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:gap-8">
            {VALUE_PROPS.map((v, i) => (
              <motion.div
                key={v.text}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.12, ease: "easeOut" }}
                className="flex items-start gap-2.5"
              >
                <v.icon size={16} className="mt-0.5 shrink-0 text-accent-400" />
                <span className="text-sm text-white/60">{v.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: floating cluster */}
        <FloatingCluster />
      </div>
    </section>

    {/* FEATURES */}
    <section id="features" className="relative overflow-hidden border-b border-white/5 px-6 py-20">
      <FloatingIcon Icon={FileText} className="left-[4%] top-10" delay={0} duration={6.5} size={28} />
      <FloatingIcon Icon={BarChart3} className="right-[6%] top-16" delay={1} duration={5.5} size={24} />
      <FloatingIcon Icon={CheckCircle2} className="left-[48%] top-0" delay={2} duration={7} size={20} />

      <div className="relative mx-auto max-w-6xl">
        <SlideInSection>
          <h2 className="max-w-lg font-serif-display text-3xl text-white">
            Everything both sides need, nothing they don't.
          </h2>
        </SlideInSection>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            {
              icon: FileText,
              title: "AI resume review",
              body: "Get a section-by-section breakdown of your resume — strengths, gaps and what to fix before you apply.",
            },
            {
              icon: BarChart3,
              title: "Fit scoring, not guesswork",
              body: "Every application is scored against the job's actual requirements, for the student and the recruiter alike.",
            },
            {
              icon: CheckCircle2,
              title: "Admin-reviewed listings",
              body: "Every job is checked before it goes live, so students only see roles that are real and current.",
            },
          ].map((f, i) => (
            <SlideInSection key={f.title} delay={i * 0.15} className="glass-card rounded-2xl p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/15 text-primary-300">
                <f.icon size={18} />
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">{f.body}</p>
            </SlideInSection>
          ))}
        </div>
      </div>
    </section>

    {/* HOW IT WORKS */}
    <section id="how-it-works" className="relative overflow-hidden border-b border-white/5 px-6 py-20">
      <FloatingIcon Icon={Sparkles} className="right-[4%] top-8" delay={0.5} duration={6} size={22} />
      <FloatingIcon Icon={Target} className="left-[8%] top-20" delay={1.5} duration={7} size={24} />

      <div className="relative mx-auto max-w-6xl">
        <SlideInSection>
          <h2 className="max-w-lg font-serif-display text-3xl text-white">
            From blank profile to first offer.
          </h2>
        </SlideInSection>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {HOW_IT_WORKS.map((step, i) => (
            <SlideInSection key={step.n} delay={i * 0.15}>
              <span className="font-serif-display text-4xl text-primary-400/70">
                {step.n}
              </span>
              <h3 className="mt-3 text-base font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">{step.body}</p>
            </SlideInSection>
          ))}
        </div>
      </div>
    </section>

    {/* ROLES */}
    <section id="roles" className="relative overflow-hidden px-6 py-20">
      <FloatingIcon Icon={GraduationCap} className="left-[6%] top-6" delay={0} duration={6} size={26} />
      <FloatingIcon Icon={Briefcase} className="right-[8%] top-24" delay={1} duration={6.5} size={24} />

      <div className="relative mx-auto max-w-6xl">
        <SlideInSection>
          <h2 className="max-w-lg font-serif-display text-3xl text-white">
            Whichever side of the table you're on.
          </h2>
        </SlideInSection>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <SlideInSection className="glass-card rounded-2xl p-8" delay={0}>
            <GraduationCap size={22} className="text-primary-300" />
            <h3 className="mt-4 text-lg font-semibold text-white">For students</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/50">
              Build one profile, get resume feedback, and apply to
              admin-approved roles that actually match your skills.
            </p>
            <Link to="/register" className="mt-5 inline-block">
              <Button variant="secondary">Create your profile</Button>
            </Link>
          </SlideInSection>

          <SlideInSection className="glass-card rounded-2xl p-8" delay={0.15}>
            <Briefcase size={22} className="text-accent-300" />
            <h3 className="mt-4 text-lg font-semibold text-white">For recruiters</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/50">
              Post a role, let AI shortlist against your requirements, and
              move candidates through your pipeline without spreadsheets.
            </p>
            <Link to="/register" className="mt-5 inline-block">
              <Button variant="secondary">Post a role</Button>
            </Link>
          </SlideInSection>
        </div>
      </div>
    </section>
  </div>
);

export default Home;