import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, GraduationCap, Building2 } from "lucide-react";
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

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register({ ...form, role });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-4 py-10">
      <div className="absolute inset-0 bg-radial-glow" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card relative z-10 w-full max-w-md rounded-2xl p-8"
      >
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient shadow-glow-purple">
            <Sparkles size={22} className="text-white" />
          </div>
          <h1 className="font-display text-2xl font-bold text-white">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-white/50">
            Join PlacementAI as a student or recruiter
          </p>
        </div>

        {/* Role toggle */}
        <div className="mb-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setRole("student")}
            className={`flex flex-col items-center gap-2 rounded-xl border px-4 py-3 transition-all ${
              role === "student"
                ? "border-primary-400/60 bg-primary-500/10 shadow-glow-sm"
                : "border-white/10 bg-white/[0.02] hover:bg-white/5"
            }`}
          >
            <GraduationCap
              size={20}
              className={role === "student" ? "text-primary-300" : "text-white/50"}
            />
            <span className="text-xs font-medium text-white/80">Student</span>
          </button>
          <button
            type="button"
            onClick={() => setRole("company")}
            className={`flex flex-col items-center gap-2 rounded-xl border px-4 py-3 transition-all ${
              role === "company"
                ? "border-accent-400/60 bg-accent-500/10 shadow-glow-cyan"
                : "border-white/10 bg-white/[0.02] hover:bg-white/5"
            }`}
          >
            <Building2
              size={20}
              className={role === "company" ? "text-accent-300" : "text-white/50"}
            />
            <span className="text-xs font-medium text-white/80">Company</span>
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm text-green-300">
            Account created! Redirecting to login...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="Acme Corp"
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

          <Button type="submit" className="w-full" loading={loading}>
            Create Account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-white/50">
          Already have an account?{" "}
          <Link to="/login" className="text-accent-400 hover:underline">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;