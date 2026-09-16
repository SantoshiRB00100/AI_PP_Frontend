import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, LogOut } from "lucide-react";
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
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient shadow-glow-sm">
            <Sparkles size={18} className="text-white" />
          </div>
          <span className="font-display text-lg font-semibold text-white">
            Placement<span className="text-gradient">AI</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm text-white/70 transition hover:text-white">Features</a>
          <a href="#how-it-works" className="text-sm text-white/70 transition hover:text-white">How It Works</a>
          <a href="#roles" className="text-sm text-white/70 transition hover:text-white">For You</a>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link to={DASHBOARD_PATH[user.role]}>
                <Button variant="secondary" size="sm">Dashboard</Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut size={16} /> Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login"><Button variant="ghost" size="sm">Login</Button></Link>
              <Link to="/register"><Button variant="primary" size="sm">Get Started</Button></Link>
            </>
          )}
        </div>

        <button className="text-white md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/5 bg-base-950/95 md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              <a href="#features" onClick={() => setOpen(false)} className="text-white/70">Features</a>
              <a href="#how-it-works" onClick={() => setOpen(false)} className="text-white/70">How It Works</a>
              <a href="#roles" onClick={() => setOpen(false)} className="text-white/70">For You</a>
              <div className="mt-2 flex flex-col gap-3">
                {user ? (
                  <>
                    <Link to={DASHBOARD_PATH[user.role]}>
                      <Button variant="secondary" className="w-full">Dashboard</Button>
                    </Link>
                    <Button variant="ghost" className="w-full" onClick={handleLogout}>Logout</Button>
                  </>
                ) : (
                  <>
                    <Link to="/login"><Button variant="ghost" className="w-full">Login</Button></Link>
                    <Link to="/register"><Button variant="primary" className="w-full">Get Started</Button></Link>
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