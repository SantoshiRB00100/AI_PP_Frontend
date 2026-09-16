import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import Button from "../../components/common/Button";

const Home = () => (
  <div className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
    <div className="absolute inset-0 bg-radial-glow" />

    <div className="relative z-10 flex flex-col items-center">
      <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-accent-300">
        <Sparkles size={14} /> AI-Powered Placement & Recruiter Portal
      </span>

      <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
        Where Talent Meets{" "}
        <span className="text-gradient">Opportunity</span>, Intelligently
      </h1>

      <p className="mt-6 max-w-xl text-base text-white/60 sm:text-lg">
        An AI-driven placement platform that matches students and recruiters
        using smart resume analysis and job-fit scoring.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Link to="/register">
          <Button size="lg">
            Get Started <ArrowRight size={18} />
          </Button>
        </Link>
        <Link to="/login">
          <Button variant="secondary" size="lg">
            Log In
          </Button>
        </Link>
      </div>
    </div>
  </div>
);

export default Home;