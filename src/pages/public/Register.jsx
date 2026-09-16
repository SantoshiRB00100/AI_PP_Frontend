import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  GraduationCap,
  Building2,
  FileText,
  BriefcaseBusiness,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import useAuth from "../../hooks/useAuth";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

const Register = () => {
  const [role, setRole] = useState("student");

  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
    companyName: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
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
      await register({
        ...form,
        role,
      });

      setSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07051a] px-4 py-8 text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[20%] top-[-180px] h-[420px] w-[420px] rounded-full bg-purple-600/20 blur-[120px]" />

        <div className="absolute bottom-[-160px] right-[-80px] h-[400px] w-[400px] rounded-full bg-sky-500/10 blur-[120px]" />

        <div className="absolute left-[-100px] top-[45%] h-[280px] w-[280px] rounded-full bg-indigo-600/10 blur-[100px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="relative w-full max-w-md">

          {/* Floating visuals */}
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [-2, 1, -2] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -left-2 top-24 hidden h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] shadow-xl backdrop-blur-xl sm:flex"
          >
            <FileText size={18} className="text-sky-300" />
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0], rotate: [2, -1, 2] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-2 top-36 hidden h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] shadow-xl backdrop-blur-xl sm:flex"
          >
            <BriefcaseBusiness size={18} className="text-purple-300" />
          </motion.div>

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.055] p-6 shadow-2xl backdrop-blur-2xl sm:p-8"
          >
            {/* Shine */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/70 to-transparent" />

            <div className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl" />

            {/* Header */}
            <div className="mb-6 flex flex-col items-center text-center">
              <motion.div
                whileHover={{
                  rotate: -5,
                  scale: 1.05,
                }}
                className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-[20px] border border-white/15 bg-gradient-to-br from-purple-500 via-indigo-500 to-sky-400 shadow-[0_0_45px_rgba(56,189,248,0.25)]"
              >
                <Sparkles size={25} className="text-white" />
              </motion.div>

              <h1 className="text-3xl font-bold tracking-tight">
                Create your account
              </h1>

              <p className="mt-2 max-w-xs text-sm leading-6 text-white/45">
                Build your profile and discover better career opportunities.
              </p>
            </div>

            {/* Role selector */}
            <div className="mb-6">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-white/35">
                I am joining as
              </p>

              <div className="grid grid-cols-2 gap-3">
                {/* Student */}
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setRole("student")}
                  className={`relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 ${
                    role === "student"
                      ? "border-sky-400/50 bg-sky-400/[0.09] shadow-[0_0_25px_rgba(56,189,248,0.10)]"
                      : "border-white/10 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.05]"
                  }`}
                >
                  {role === "student" && (
                    <div className="absolute right-3 top-3">
                      <CheckCircle2
                        size={15}
                        className="text-sky-300"
                      />
                    </div>
                  )}

                  <div
                    className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl ${
                      role === "student"
                        ? "bg-sky-400/15"
                        : "bg-white/5"
                    }`}
                  >
                    <GraduationCap
                      size={19}
                      className={
                        role === "student"
                          ? "text-sky-300"
                          : "text-white/45"
                      }
                    />
                  </div>

                  <div className="text-sm font-semibold text-white/85">
                    Student
                  </div>

                  <div className="mt-1 text-[10px] text-white/35">
                    Find opportunities
                  </div>
                </motion.button>

                {/* Company */}
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setRole("company")}
                  className={`relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 ${
                    role === "company"
                      ? "border-purple-400/50 bg-purple-400/[0.09] shadow-[0_0_25px_rgba(168,85,247,0.10)]"
                      : "border-white/10 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.05]"
                  }`}
                >
                  {role === "company" && (
                    <div className="absolute right-3 top-3">
                      <CheckCircle2
                        size={15}
                        className="text-purple-300"
                      />
                    </div>
                  )}

                  <div
                    className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl ${
                      role === "company"
                        ? "bg-purple-400/15"
                        : "bg-white/5"
                    }`}
                  >
                    <Building2
                      size={19}
                      className={
                        role === "company"
                          ? "text-purple-300"
                          : "text-white/45"
                      }
                    />
                  </div>

                  <div className="text-sm font-semibold text-white/85">
                    Company
                  </div>

                  <div className="mt-1 text-[10px] text-white/35">
                    Hire great talent
                  </div>
                </motion.button>
              </div>
            </div>

            {/* Messages */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
              >
                {error}
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 flex items-center gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300"
              >
                <CheckCircle2 size={16} />
                Account created! Redirecting to login...
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {role === "student" ? (
                <Input
                  label="Full Name"
                  name="fullName"
                  placeholder="John Doe"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                />
              ) : (
                <Input
                  label="Company Name"
                  name="companyName"
                  placeholder="Acme Corporation"
                  value={form.companyName}
                  onChange={handleChange}
                  required
                />
              )}

              <Input
                label="Email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />

              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="At least 6 characters"
                value={form.password}
                onChange={handleChange}
                minLength={6}
                required
              />

              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="pt-1"
              >
                <Button
                  type="submit"
                  className="group w-full !rounded-2xl"
                  loading={loading}
                >
                  <span className="flex items-center justify-center gap-2">
                    Create Account
                    <ArrowRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </Button>
              </motion.div>
            </form>

            {/* Footer */}
            <div className="my-7 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/25">
                PlacementAI
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <p className="text-center text-sm text-white/45">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-sky-300 transition-colors hover:text-sky-200 hover:underline"
              >
                Log in
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;
