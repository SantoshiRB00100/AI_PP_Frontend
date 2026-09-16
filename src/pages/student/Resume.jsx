import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, Sparkles, FileText, CheckCircle2, AlertTriangle } from "lucide-react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import {
  getMyProfile,
  uploadResume,
  analyzeResume,
  getResumeAnalysis,
} from "../../services/studentService";

const StudentResume = () => {
  const [resume, setResume] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const profileRes = await getMyProfile();
        setResume(profileRes.data.profile.resume);

        try {
          const analysisRes = await getResumeAnalysis();
          setAnalysis(analysisRes.data.resumeAnalysis);
        } catch {
          // No analysis yet — that's fine
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const res = await uploadResume(file);
      setResume(res.data.resume);
      setFile(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload resume.");
    } finally {
      setUploading(false);
    }
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    setError("");
    try {
      const res = await analyzeResume();
      setAnalysis(res.data.aiAnalysis);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to analyze resume.");
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <Card>
        <h3 className="mb-4 font-display text-lg font-semibold text-white">Resume</h3>

        {resume?.url ? (
          <div className="mb-4 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
            <FileText className="text-accent-400" size={20} />
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{resume.fileName}</p>
              <p className="text-xs text-white/40">Currently uploaded</p>
            </div>
            <CheckCircle2 className="text-green-400" size={20} />
          </div>
        ) : (
          <p className="mb-4 text-sm text-white/50">No resume uploaded yet.</p>
        )}

        <form onSubmit={handleUpload} className="flex flex-col gap-3 sm:flex-row">
          <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 bg-white/[0.02] px-4 py-3 text-sm text-white/60 transition hover:border-accent-400/50">
            <UploadCloud size={18} />
            {file ? file.name : "Choose a PDF file"}
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
          <Button type="submit" loading={uploading} disabled={!file}>
            Upload
          </Button>
        </form>
      </Card>

      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-white">AI Resume Analysis</h3>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleAnalyze}
            loading={analyzing}
            disabled={!resume?.url}
          >
            <Sparkles size={16} /> Analyze with AI
          </Button>
        </div>

        {!analysis ? (
          <p className="text-sm text-white/50">
            {resume?.url
              ? "Run AI analysis to get feedback on your resume."
              : "Upload a resume first to enable AI analysis."}
          </p>
        ) : (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gradient text-xl font-bold text-white shadow-glow-sm">
                {analysis.overallScore}
              </div>
              <div>
                <p className="text-sm font-medium text-white">Overall Score</p>
                <p className="text-xs text-white/50">{analysis.summary}</p>
              </div>
            </div>

            {analysis.strengths?.length > 0 && (
              <div>
                <p className="mb-2 text-sm font-semibold text-green-300">Strengths</p>
                <ul className="space-y-1 text-sm text-white/60">
                  {analysis.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-green-400" /> {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {analysis.weaknesses?.length > 0 && (
              <div>
                <p className="mb-2 text-sm font-semibold text-yellow-300">Weaknesses</p>
                <ul className="space-y-1 text-sm text-white/60">
                  {analysis.weaknesses.map((w, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <AlertTriangle size={14} className="mt-0.5 shrink-0 text-yellow-400" /> {w}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {analysis.improvementSuggestions?.length > 0 && (
              <div>
                <p className="mb-2 text-sm font-semibold text-accent-300">Suggestions</p>
                <ul className="list-inside list-disc space-y-1 text-sm text-white/60">
                  {analysis.improvementSuggestions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default StudentResume;