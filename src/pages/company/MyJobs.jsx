import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Pencil, Trash2, PlusCircle } from "lucide-react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import Badge from "../../components/common/Badge";
import { getMyJobs, deleteJob } from "../../services/jobService";

const STATUS_COLORS = {
  pending: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
  approved: "bg-green-500/15 text-green-300 border-green-500/30",
  rejected: "bg-red-500/15 text-red-300 border-red-500/30",
  closed: "bg-white/10 text-white/50 border-white/20",
};

const CompanyMyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await getMyJobs();
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

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job posting? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await deleteJob(id);
      setJobs(jobs.filter((j) => j._id !== id));
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
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
      <div className="flex justify-end">
        <Link to="/company/jobs/create">
          <Button>
            <PlusCircle size={16} /> Post New Job
          </Button>
        </Link>
      </div>

      {jobs.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No jobs posted yet"
          message="Create your first job posting to start receiving applications."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job, i) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Card hover className="flex h-full flex-col">
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="font-display text-base font-semibold text-white">
                    {job.title}
                  </h3>
                  <Badge className={STATUS_COLORS[job.status]}>{job.status}</Badge>
                </div>
                <p className="mb-3 flex items-center gap-1 text-xs text-white/40">
                  <MapPin size={12} /> {job.location} • {job.jobType}
                </p>
                <p className="mb-4 line-clamp-2 text-sm text-white/60">{job.description}</p>

                <div className="mb-4 flex flex-wrap gap-1.5">
                  {job.requiredSkills?.slice(0, 4).map((skill) => (
                    <span key={skill} className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-white/60">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex gap-2">
                  <Link to={`/company/jobs/${job._id}/edit`} className="flex-1">
                    <Button variant="secondary" className="w-full">
                      <Pencil size={14} /> Edit
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(job._id)}
                    loading={deletingId === job._id}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyMyJobs;