import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  Mail,
  Lock,
  FileText,
  BriefcaseBusiness,
  GraduationCap,
  UserRound,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import useAuth from "../../hooks/useAuth";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

const DASHBOARD_PATH = {
  student: "/student/dashboard",
  company: "/company/dashboard",
  admin: "/admin/dashboard",
};

const floatingItems = [
  {
    icon: FileText,
    text: "Resume",
    className: "left-4 top-20",
    delay: 0,
  },
  {
    icon: BriefcaseBusiness,
    text: "Career",
    className: "right-4 top-28",
    delay: 0.8,
  },
  {
    icon: GraduationCap,
    text: "Skills",
    className: "left-8 bottom-28",
    delay: 1.4,
  },
];

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await login(form.email, form.password);
      navigate(DASHBOARD_PATH[user.role] || "/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07051a] px-4 py-8 text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-180px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-purple-600/20 blur-[120px]" />

        <div className="absolute bottom-[-150px] left-[-100px] h-[350px] w-[350px] rounded-full bg-sky-500/10 blur-[110px]" />

        <div className="absolute right-[-100px] top-[30%] h-[300px] w-[300px] rounded-full bg-indigo-600/10 blur-[100px]" />

        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Main */}
      <div className="relative z-10 flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="relative w-full max-w-md">

          {/* Floating career elements */}
          {floatingItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -8, 0],
                }}
                transition={{
                  opacity: { duration: 0.6, delay: item.delay },
                  scale: { duration: 0.6, delay: item.delay },
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    delay: item.delay,
                    ease: "easeInOut",
                  },
                }}
                className={`absolute ${item.className} hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-2 shadow-2xl backdrop-blur-xl sm:flex`}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-400/10">
                  <Icon size={15} className="text-sky-300" />
                </div>

                <span className="text-[11px] font-medium text-white/60">
                  {item.text}
                </span>
              </motion.div>
            );
          })}

          {/* Main card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.055] p-6 shadow-2xl backdrop-blur-2xl sm:p-8"
          >
            {/* Card shine */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/70 to-transparent" />

            <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-sky-400/10 blur-3xl" />

            {/* Logo */}
            <div className="mb-7 flex flex-col items-center text-center">
              <motion.div
                whileHover={{
                  rotate: 5,
                  scale: 1.05,
                }}
                className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-[20px] border border-white/15 bg-gradient-to-br from-purple-500 via-indigo-500 to-sky-400 shadow-[0_0_45px_rgba(56,189,248,0.25)]"
              >
                <Sparkles size={25} className="text-white" />

                <div className="absolute inset-0 rounded-[20px] bg-white/10" />
              </motion.div>

              <h1 className="text-3xl font-bold tracking-tight">
                Welcome back
              </h1>

              <p className="mt-2 max-w-xs text-sm leading-6 text-white/45">
                Continue your journey toward the right opportunity.
              </p>
            </div>

            {/* Small trust badge */}
            <div className="mb-5 flex items-center justify-center gap-2 text-[11px] text-white/40">
              <ShieldCheck size={14} className="text-sky-300" />
              Secure authentication
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="group">
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="group">
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="pt-1"
              >
                <Button
                  type="submit"
                  className="group relative w-full overflow-hidden !rounded-2xl"
                  loading={loading}
                >
                  <span className="flex items-center justify-center gap-2">
                    Log In
                    <ArrowRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </Button>
              </motion.div>
            </form>

            {/* Divider */}
            <div className="my-7 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/25">
                PlacementAI
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <p className="text-center text-sm text-white/45">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-sky-300 transition-colors hover:text-sky-200 hover:underline"
              >
                Create one
              </Link>
            </p>
          </motion.div>

          {/* Bottom floating avatars */}
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-5 -right-3 hidden h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-sky-400/30 to-purple-500/20 shadow-xl backdrop-blur-xl sm:flex"
          >
            <UserRound size={17} className="text-sky-200" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;

