import { Sparkles, Mail, ExternalLink } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-white/5 bg-base-950 px-6 py-12">
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient">
              <Sparkles size={16} className="text-white" />
            </div>

            <span className="font-display text-lg font-semibold text-white">
              Placement<span className="text-gradient">AI</span>
            </span>
          </div>

          <p className="mt-3 max-w-xs text-sm text-white/50">
            An AI-powered placement and recruitment platform connecting
            students and recruiters intelligently.
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-12">
          {/* Platform */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">
              Platform
            </h4>

            <ul className="space-y-2 text-sm text-white/50">
              <li>
                <a
                  href="#features"
                  className="transition hover:text-accent-400"
                >
                  Features
                </a>
              </li>

              <li>
                <a
                  href="#how-it-works"
                  className="transition hover:text-accent-400"
                >
                  How it Works
                </a>
              </li>

              <li>
                <a
                  href="#roles"
                  className="transition hover:text-accent-400"
                >
                  For You
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">
              Connect
            </h4>

            <div className="flex gap-3">
              {/* GitHub */}
              <a
                href="#"
                aria-label="GitHub"
                className="rounded-lg bg-white/5 p-2 text-xs font-semibold text-white/60 transition hover:text-accent-400"
              >
                GH
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                aria-label="LinkedIn"
                className="rounded-lg bg-white/5 p-2 text-xs font-semibold text-white/60 transition hover:text-accent-400"
              >
                in
              </a>

              {/* Email */}
              <a
                href="#"
                aria-label="Email"
                className="rounded-lg bg-white/5 p-2 text-white/60 transition hover:text-accent-400"
              >
                <Mail size={16} />
              </a>

              {/* External Link */}
              <a
                href="#"
                aria-label="External link"
                className="rounded-lg bg-white/5 p-2 text-white/60 transition hover:text-accent-400"
              >
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 border-t border-white/5 pt-6 text-center text-xs text-white/30">
        Built as a Final Year Project — AI-Powered Placement & Recruiter
        Portal
      </div>
    </div>
  </footer>
);

export default Footer;


