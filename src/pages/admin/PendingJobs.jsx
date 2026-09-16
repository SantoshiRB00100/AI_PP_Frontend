import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ClipboardCheck, MapPin, Check, X } from "lucide-react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import { getPendingJobs, approveJob, rejectJob } from "../../services/adminService";

const AdminPendingJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actingId, setActingId] = useState(null);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await getPendingJobs();
      setJobs(res.data.jobs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleApprove = async (id) => {
    setActingId(id);
    try {
      await approveJob(id);
      setJobs(jobs.filter((j) => j._id !== id));
    } catch (err) {
      console.error(err);
    } finally {
      setActingId(null);
    }
  };

  const handleReject = async (id) => {
    setActingId(id);
    try {
      await rejectJob(id);
      setJobs(jobs.filter((j) => j._id !== id));
    } catch (err) {
      console.error(err);
    } finally {
      setActingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <EmptyState
        icon={ClipboardCheck}
        title="No pending jobs"
        message="All caught up! New job postings will appear here for review."
      />
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job, i) => (
        <motion.div
          key={job._id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.03 }}
        >
          <Card>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-display text-base font-semibold text-white">
                  {job.title}
                </h3>
                <p className="mt-1 flex items-center gap-1 text-xs text-white/40">
                  <MapPin size={12} /> {job.location} • {job.jobType}
                </p>
                <p className="mt-1 text-xs text-white/40">
                  Posted by: {job.company?.email}
                </p>
                <p className="mt-3 line-clamp-2 text-sm text-white/60">{job.description}</p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {job.requiredSkills?.map((skill) => (
                    <span key={skill} className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-white/60">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => handleApprove(job._id)}
                  loading={actingId === job._id}
                  className="border-green-500/30 hover:border-green-400/50"
                >
                  <Check size={16} className="text-green-400" /> Approve
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleReject(job._id)}
                  loading={actingId === job._id}
                >
                  <X size={16} /> Reject
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default AdminPendingJobs;