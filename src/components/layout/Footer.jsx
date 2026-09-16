import { Briefcase, FileText, GraduationCap, UserCircle2, MapPin, Mail } from "lucide-react";
import { motion } from "framer-motion";

// Floating shiny career icon
const FloatingIcon = ({ Icon, className, delay = 0, duration = 4, size = 38 }) => (
  <motion.div
    className={`pointer-events-none absolute text-cyan-300/70 ${className}`}
    animate={{
      y: [0, -14, 0],
      opacity: [0.55, 0.9, 0.55],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <Icon
      size={size}
      strokeWidth={1.4}
      className="drop-shadow-[0_0_14px_rgba(34,211,238,0.65)]"
    />
  </motion.div>
);

const platformLinks = [
  {
    label: "GitHub",
    href: "#",
    svg: (
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.5 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.21-3.37-1.21-.46-1.19-1.11-1.51-1.11-1.51-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.57 2.34 1.12 2.91.85.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.27 2.75 1.05a9.29 9.29 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.93-2.35 4.8-4.58 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .28.18.6.69.5A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" />
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    svg: (
      <path d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM3.25 8.75h3.5V21h-3.5V8.75zM9.5 8.75h3.35v1.68h.05c.47-.88 1.6-1.8 3.3-1.8 3.53 0 4.18 2.32 4.18 5.34V21h-3.5v-5.63c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21H9.5V8.75z" />
    ),
  },
  {
    label: "WhatsApp",
    href: "#",
    svg: (
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.87.51 3.62 1.4 5.13L2 22l5.13-1.5a9.86 9.86 0 0 0 4.91 1.32h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.8 14.17c-.25.7-1.24 1.28-2.02 1.44-.53.11-1.23.2-3.57-.77-2.99-1.24-4.92-4.27-5.07-4.47-.15-.2-1.22-1.62-1.22-3.1 0-1.47.75-2.19 1.03-2.49.27-.3.6-.37.8-.37.2 0 .4 0 .57.01.19.01.43-.07.67.51.25.6.85 2.07.92 2.22.07.15.12.33.02.53-.1.2-.15.32-.3.5-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.36 1.46.3.15.47.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.73.82 2.03.97.3.15.5.22.57.35.08.13.08.75-.17 1.45z" />
    ),
  },
  {
    label: "Telegram",
    href: "#",
    svg: (
      <path d="M21.05 3.3 2.9 10.4c-1.24.5-1.23 1.19-.23 1.5l4.65 1.45 1.8 5.5c.22.6.38.84.77.84.35 0 .5-.16.7-.36l1.67-1.62 4.7 3.47c.87.48 1.5.23 1.72-.8L22.9 5.1c.3-1.26-.47-1.82-1.85-1.3zM8.68 14.06l9.38-5.9c.44-.27.85-.12.51.18l-7.6 6.88-.3 3.3z" />
    ),
  },
];

const Footer = () => (
  <footer className="relative overflow-hidden border-t border-white/5 bg-gradient-to-b from-[#0a0a1a] to-[#0d0a1f] px-6 py-16">
    {/* Floating background icons */}
    <FloatingIcon Icon={Briefcase} className="left-[6%] top-8" delay={0} duration={5} size={42} />
    <FloatingIcon Icon={FileText} className="left-[24%] top-32" delay={1} duration={4.5} size={34} />
    <FloatingIcon Icon={GraduationCap} className="right-[20%] top-6" delay={0.5} duration={5.5} size={44} />
    <FloatingIcon Icon={UserCircle2} className="right-[7%] top-32" delay={1.5} duration={4} size={38} />
    <FloatingIcon Icon={MapPin} className="left-[46%] top-2" delay={0.8} duration={4.8} size={30} />

    <div className="relative mx-auto max-w-7xl">
      <div className="flex flex-col items-start justify-between gap-10 md:flex-row">
        {/* Brand */}
        <div>
          <span className="font-display text-xl font-semibold tracking-tight text-white">
            Placement<span className="bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent">Connect</span>
          </span>

          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/40">
            A recruitment platform connecting students and recruiters with
            precision matching and streamlined hiring.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-12">
          {/* Platform */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/70">
              Platform
            </h4>

            <ul className="space-y-2.5 text-sm text-white/40">
              <li>
                <a href="#features" className="transition-colors duration-300 hover:text-cyan-300">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="transition-colors duration-300 hover:text-cyan-300">
                  How it Works
                </a>
              </li>
              <li>
                <a href="#roles" className="transition-colors duration-300 hover:text-cyan-300">
                  For You
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/70">
              Company
            </h4>

            <ul className="space-y-2.5 text-sm text-white/40">
              <li>
                <a href="#about" className="transition-colors duration-300 hover:text-cyan-300">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="transition-colors duration-300 hover:text-cyan-300">
                  Contact
                </a>
              </li>
              <li>
                <a href="#privacy" className="transition-colors duration-300 hover:text-cyan-300">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/70">
              Connect
            </h4>

            <div className="flex gap-4">
              {platformLinks.map(({ label, href, svg }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="group rounded-xl border border-white/10 bg-white/[0.06] p-3.5 text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/[0.09] hover:text-cyan-300 hover:shadow-[0_0_18px_rgba(34,211,238,0.35)]"
                >
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                    {svg}
                  </svg>
                </a>
              ))}

              <a
                href="mailto:contact@example.com"
                aria-label="Email"
                className="group rounded-xl border border-white/10 bg-white/[0.06] p-3.5 text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/[0.09] hover:text-cyan-300 hover:shadow-[0_0_18px_rgba(34,211,238,0.35)]"
              >
                <Mail size={22} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 border-t border-white/5 pt-6 text-center text-xs tracking-wide text-white/25">
        © {new Date().getFullYear()} PlacementConnect. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;