import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  BriefcaseBusiness,
  LogOut,
} from "lucide-react";

import useAuth from "../../hooks/useAuth";
import Button from "../common/Button";

const DASHBOARD_PATH = {
  student: "/student/dashboard",
  company: "/company/dashboard",
  admin: "/admin/dashboard",
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-base-950/70 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* ================= LOGO ================= */}
        <Link
          to="/"
          className="group flex items-center gap-2.5"
        >
          {/* Minimal career symbol */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.25 }}
            className="relative flex h-8 w-8 items-center justify-center"
          >
            {/* Soft glow */}
            <div className="absolute inset-0 rounded-full bg-sky-400/10 blur-md transition-all duration-500 group-hover:bg-sky-400/20" />

            <BriefcaseBusiness
              size={20}
              strokeWidth={1.7}
              className="relative z-10 text-sky-300/90 transition-all duration-500 group-hover:text-sky-200"
            />
          </motion.div>

          {/* Text logo */}
          <motion.span
            whileHover={{ y: -1 }}
            transition={{ duration: 0.2 }}
            className="relative font-display text-[19px] font-semibold tracking-tight"
          >
            {/* Placement */}
            <span className="text-white transition-colors duration-300 group-hover:text-white">
              Placement
            </span>

            {/* AI */}
            <span className="relative ml-[1px] bg-gradient-to-r from-sky-300 via-cyan-200 to-sky-400 bg-clip-text text-transparent">
              AI

              {/* subtle reflection */}
              <span
                className="pointer-events-none absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-gradient-to-r from-transparent via-sky-300/50 to-transparent opacity-60 blur-[2px]"
              />
            </span>

            {/* refined glow */}
            <motion.span
              className="pointer-events-none absolute inset-0 -z-10 bg-sky-400/10 blur-xl"
              animate={{
                opacity: [0.15, 0.3, 0.15],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.span>
        </Link>

        {/* ================= DESKTOP NAV ================= */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm text-white/70 transition hover:text-white"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-sm text-white/70 transition hover:text-white"
          >
            How It Works
          </a>

          <a
            href="#roles"
            className="text-sm text-white/70 transition hover:text-white"
          >
            For You
          </a>
        </nav>

        {/* ================= DESKTOP ACTIONS ================= */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link to={DASHBOARD_PATH[user.role]}>
                <Button variant="secondary" size="sm">
                  Dashboard
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>

              <Link to="/register">
                <Button variant="primary" size="sm">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* ================= MOBILE MENU BUTTON ================= */}
        <button
          className="text-white transition-colors hover:text-sky-300 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
              ease: "easeInOut",
            }}
            className="overflow-hidden border-t border-white/5 bg-base-950/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">

              <a
                href="#features"
                onClick={() => setOpen(false)}
                className="text-white/70 transition hover:text-sky-300"
              >
                Features
              </a>

              <a
                href="#how-it-works"
                onClick={() => setOpen(false)}
                className="text-white/70 transition hover:text-sky-300"
              >
                How It Works
              </a>

              <a
                href="#roles"
                onClick={() => setOpen(false)}
                className="text-white/70 transition hover:text-sky-300"
              >
                For You
              </a>

              <div className="mt-2 flex flex-col gap-3">
                {user ? (
                  <>
                    <Link
                      to={DASHBOARD_PATH[user.role]}
                      onClick={() => setOpen(false)}
                    >
                      <Button
                        variant="secondary"
                        className="w-full"
                      >
                        Dashboard
                      </Button>
                    </Link>

                    <Button
                      variant="ghost"
                      className="w-full"
                      onClick={() => {
                        setOpen(false);
                        handleLogout();
                      }}
                    >
                      <LogOut size={16} />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setOpen(false)}
                    >
                      <Button
                        variant="ghost"
                        className="w-full"
                      >
                        Login
                      </Button>
                    </Link>

                    <Link
                      to="/register"
                      onClick={() => setOpen(false)}
                    >
                      <Button
                        variant="primary"
                        className="w-full"
                      >
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
