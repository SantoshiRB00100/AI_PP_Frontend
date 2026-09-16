import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Briefcase, Search } from "lucide-react";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import { Select } from "../../components/common/Input";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import Badge from "../../components/common/Badge";
import { getApprovedJobs } from "../../services/jobService";
import { JOB_TYPES } from "../../utils/constants";

const StudentJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ location: "", jobType: "", skill: "" });

  const fetchJobs = async (params = {}) => {
    setLoading(true);
    try {
      const res = await getApprovedJobs(params);
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

  const handleFilter = (e) => {
    e.preventDefault();
    const cleaned = Object.fromEntries(
      Object.entries(filters).filter(([, v]) => v)
    );
    fetchJobs(cleaned);
  };

  return (
    <div className="space-y-6">
      <Card>
        <form onSubmit={handleFilter} className="grid grid-cols-1 gap-3 sm:grid-cols-4">
          <Input
            placeholder="Location"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          />
          <Select
            value={filters.jobType}
            onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
          >
            <option value="">All Job Types</option>
            {JOB_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </Select>
          <Input
            placeholder="Skill (e.g. React)"
            value={filters.skill}
            onChange={(e) => setFilters({ ...filters, skill: e.target.value })}
          />
          <Button type="submit">
            <Search size={16} /> Search
          </Button>
        </form>
      </Card>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader />
        </div>
      ) : jobs.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No jobs found"
          message="Try adjusting your filters or check back later."
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
                  <Badge className="border-primary-500/30 bg-primary-500/15 text-primary-300">
                    {job.jobType}
                  </Badge>
                </div>
                <p className="mb-3 flex items-center gap-1 text-xs text-white/40">
                  <MapPin size={12} /> {job.location}
                </p>
                <p className="mb-4 line-clamp-2 text-sm text-white/60">{job.description}</p>

                <div className="mb-4 flex flex-wrap gap-1.5">
                  {job.requiredSkills?.slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-white/60"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-auto">
                  <Link to={`/student/jobs/${job._id}`}>
                    <Button variant="secondary" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentJobs;