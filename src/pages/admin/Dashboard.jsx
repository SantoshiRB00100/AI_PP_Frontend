import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ClipboardCheck, ArrowRight } from "lucide-react";
import Card from "../../components/common/Card";
import Loader from "../../components/common/Loader";
import { getPendingJobs } from "../../services/adminService";

const AdminDashboard = () => {
  const [pendingJobs, setPendingJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getPendingJobs();
        setPendingJobs(res.data.jobs);
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

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-6"
      >
        <h2 className="font-display text-xl font-bold text-white">Admin Overview</h2>
        <p className="mt-1 text-sm text-white/50">
          Review and approve job postings submitted by recruiters.
        </p>
      </motion.div>

      <Link to="/admin/pending-jobs">
        <Card hover>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/15 text-yellow-300">
                <ClipboardCheck size={22} />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{pendingJobs.length}</p>
                <p className="text-sm text-white/50">Jobs Pending Approval</p>
              </div>
            </div>
            <ArrowRight size={18} className="text-white/30" />
          </div>
        </Card>
      </Link>
    </div>
  );
};

export default AdminDashboard;