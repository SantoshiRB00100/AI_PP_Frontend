import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, IndianRupee, Sparkles, CheckCircle2 } from "lucide-react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import Badge from "../../components/common/Badge";
import { getJobById } from "../../services/jobService";
import { applyForJob, analyzeJobMatch } from "../../services/applicationService";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [applied, setApplied] = useState(false);
  const [aiMatch, setAiMatch] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getJobById(id);
        setJob(res.data.job);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleApply = async () => {
    setApplying(true);
    setMessage("");
    try {
      await applyForJob(id);
      setApplied(true);
      setMessage("Application submitted successfully!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to apply.");
    } finally {
      setApplying(false);
    }
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    setMessage("");
    try {
      const res = await analyzeJobMatch(id);
      setAiMatch(res.data.aiMatch);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to analyze match.");
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!job) return <p className="text-white/60">Job not found.</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {message && (
        <div className="rounded-xl border border-accent-400/30 bg-accent-500/10 px-4 py-3 text-sm text-accent-300">
          {message}
        </div>
      )}

      <Card>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-white">{job.title}</h2>
            <p className="mt-1 flex items-center gap-1 text-sm text-white/50">
              <MapPin size={14} /> {job.location} • {job.jobType}
            </p>
            {(job.salary?.min || job.salary?.max) && (
              <p className="mt-1 flex items-center gap-1 text-sm text-white/50">
                <IndianRupee size={14} />
                {job.salary?.min} - {job.salary?.max}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={handleAnalyze}
              loading={analyzing}
            >
              <Sparkles size={16} /> AI Match
            </Button>
            <Button onClick={handleApply} loading={applying} disabled={applied}>
              {applied ? <><CheckCircle2 size={16} /> Applied</> : "Apply Now"}
            </Button>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <h3 className="mb-2 text-sm font-semibold text-white">Description</h3>
            <p className="whitespace-pre-line text-sm text-white/60">{job.description}</p>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-semibold text-white">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.requiredSkills?.map((skill) => (
                <Badge key={skill} className="border-primary-500/30 bg-primary-500/15 text-primary-300">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {job.minimumCGPA && (
            <p className="text-sm text-white/50">
              Minimum CGPA required: <span className="text-white">{job.minimumCGPA}</span>
            </p>
          )}
        </div>
      </Card>

      {aiMatch && (
        <Card>
          <h3 className="mb-4 font-display text-lg font-semibold text-white">
            AI Match Analysis
          </h3>
          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gradient text-xl font-bold text-white shadow-glow-sm">
              {aiMatch.matchPercentage}%
            </div>
            <p className="text-sm text-white/60">{aiMatch.summary}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-semibold text-green-300">Matched Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {aiMatch.matchedSkills?.map((s) => (
                  <span key={s} className="rounded-full bg-green-500/10 px-2.5 py-1 text-xs text-green-300">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold text-red-300">Missing Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {aiMatch.missingSkills?.map((s) => (
                  <span key={s} className="rounded-full bg-red-500/10 px-2.5 py-1 text-xs text-red-300">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {aiMatch.recommendations?.length > 0 && (
            <div className="mt-4">
              <p className="mb-2 text-sm font-semibold text-accent-300">Recommendations</p>
              <ul className="list-inside list-disc space-y-1 text-sm text-white/60">
                {aiMatch.recommendations.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      )}
    </motion.div>
  );
};

export default JobDetails;