import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, Users, PlusCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import Card from "../../components/common/Card";
import Loader from "../../components/common/Loader";
import { getMyJobs } from "../../services/jobService";
import { getCompanyApplications } from "../../services/applicationService";

const CompanyDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [jobsRes, appsRes] = await Promise.all([
          getMyJobs(),
          getCompanyApplications(),
        ]);
        setJobs(jobsRes.data.jobs);
        setApplications(appsRes.data.applications);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader />
      </div>
    );
  }

  const stats = [
    { label: "Total Jobs Posted", value: jobs.length, icon: Briefcase, to: "/company/jobs" },
    {
      label: "Approved Jobs",
      value: jobs.filter((j) => j.status === "approved").length,
      icon: CheckCircle2,
      to: "/company/jobs",
    },
    { label: "Total Applicants", value: applications.length, icon: Users, to: "/company/applicants" },
    {
      label: "Shortlisted",
      value: applications.filter((a) => a.status === "shortlisted").length,
      icon: Users,
      to: "/company/applicants",
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card flex flex-wrap items-center justify-between gap-4 rounded-2xl p-6"
      >
        <div>
          <h2 className="font-display text-xl font-bold text-white">Recruiter Overview</h2>
          <p className="mt-1 text-sm text-white/50">
            Manage your job postings and review applicants.
          </p>
        </div>
        <Link to="/company/jobs/create">
          <button className="inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-medium text-white shadow-glow-sm transition hover:shadow-glow-purple">
            <PlusCircle size={16} /> Post a Job
          </button>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.label} to={stat.to}>
            <Card hover className="h-full">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500/15 text-accent-300">
                  <stat.icon size={20} />
                </div>
                <ArrowRight size={16} className="text-white/30" />
              </div>
              <p className="mt-4 text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-white/50">{stat.label}</p>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <h3 className="mb-4 font-display text-lg font-semibold text-white">Recent Jobs</h3>
        {jobs.length === 0 ? (
          <p className="text-sm text-white/50">
            You haven't posted any jobs yet.{" "}
            <Link to="/company/jobs/create" className="text-accent-400 hover:underline">
              Post your first job
            </Link>
          </p>
        ) : (
          <div className="space-y-3">
            {jobs.slice(0, 5).map((job) => (
              <div
                key={job._id}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-white">{job.title}</p>
                  <p className="text-xs text-white/40">{job.location}</p>
                </div>
                <span
                  className={`text-xs capitalize ${
                    job.status === "approved"
                      ? "text-green-400"
                      : job.status === "pending"
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {job.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default CompanyDashboard;