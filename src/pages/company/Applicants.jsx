import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Sparkles, Mail, Phone } from "lucide-react";
import Card from "../../components/common/Card";
import { Select } from "../../components/common/Input";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import Badge from "../../components/common/Badge";
import {
  getCompanyApplications,
  updateApplicationStatus,
  aiShortlistApplicants,
} from "../../services/applicationService";
import { getMyJobs } from "../../services/jobService";
import { APPLICATION_STATUS, APPLICATION_STATUS_COLORS } from "../../utils/constants";

const CompanyApplicants = () => {
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [shortlisting, setShortlisting] = useState(false);
  const [message, setMessage] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const [appsRes, jobsRes] = await Promise.all([
        getCompanyApplications(),
        getMyJobs(),
      ]);
      setApplications(appsRes.data.applications);
      setJobs(jobsRes.data.jobs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleStatusChange = async (applicationId, status) => {
    setUpdatingId(applicationId);
    try {
      await updateApplicationStatus(applicationId, status);
      setApplications((prev) =>
        prev.map((a) => (a.applicationId === applicationId ? { ...a, status } : a))
      );
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleAiShortlist = async () => {
    if (!selectedJob) {
      setMessage("Select a job first to run AI shortlisting.");
      return;
    }
    setShortlisting(true);
    setMessage("");
    try {
      const res = await aiShortlistApplicants(selectedJob);
      setMessage(
        `Shortlisted ${res.data.shortlistedCount} of ${res.data.totalApplications} applicants (threshold: ${res.data.threshold}%).`
      );
      load();
    } catch (err) {
      setMessage(err.response?.data?.message || "AI shortlisting failed.");
    } finally {
      setShortlisting(false);
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
    <div className="space-y-6">
      <Card>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <Select
              label="Run AI Shortlist for Job"
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
            >
              <option value="">Select a job</option>
              {jobs.map((job) => (
                <option key={job._id} value={job._id}>{job.title}</option>
              ))}
            </Select>
          </div>
          <Button onClick={handleAiShortlist} loading={shortlisting}>
            <Sparkles size={16} /> AI Shortlist
          </Button>
        </div>
        {message && <p className="mt-3 text-sm text-accent-300">{message}</p>}
      </Card>

      {applications.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No applicants yet"
          message="Once students apply to your jobs, they'll show up here."
        />
      ) : (
        <div className="space-y-4">
          {applications.map((app, i) => (
            <motion.div
              key={app.applicationId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
            >
              <Card>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-base font-semibold text-white">
                      {app.student?.fullName}
                    </h3>
                    <p className="mt-1 text-xs text-white/50">
                      Applied for <span className="text-white/70">{app.job?.title}</span>
                    </p>
                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-white/40">
                      {app.student?.phone && (
                        <span className="flex items-center gap-1">
                          <Phone size={12} /> {app.student.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge className={APPLICATION_STATUS_COLORS[app.status]}>{app.status}</Badge>
                    <Select
                      value={app.status}
                      onChange={(e) => handleStatusChange(app.applicationId, e.target.value)}
                      className="w-40"
                    >
                      {Object.values(APPLICATION_STATUS)
                        .filter((s) => s !== "applied")
                        .map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                    </Select>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                    <p className="mb-1 text-xs font-semibold text-white/50">Rule-Based Match</p>
                    <p className="text-lg font-bold text-white">
                      {app.ruleBasedMatch?.matchPercentage ?? 0}%
                    </p>
                  </div>
                  {app.aiMatch?.matchPercentage !== undefined && (
                    <div className="rounded-xl border border-accent-400/20 bg-accent-500/5 p-3">
                      <p className="mb-1 text-xs font-semibold text-accent-300">AI Match</p>
                      <p className="text-lg font-bold text-white">{app.aiMatch.matchPercentage}%</p>
                    </div>
                  )}
                </div>

                {app.student?.skills?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {app.student.skills.map((skill) => (
                      <span key={skill} className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-white/60">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyApplicants;