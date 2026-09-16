import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ClipboardList, MapPin } from "lucide-react";
import Card from "../../components/common/Card";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import Badge from "../../components/common/Badge";
import { getMyApplications } from "../../services/applicationService";
import { APPLICATION_STATUS_COLORS } from "../../utils/constants";

const StudentApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getMyApplications();
        setApplications(res.data.applications);
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

  if (applications.length === 0) {
    return (
      <EmptyState
        icon={ClipboardList}
        title="No applications yet"
        message="Browse jobs and apply to see them here."
      />
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((app, i) => (
        <motion.div
          key={app._id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.03 }}
        >
          <Card>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-base font-semibold text-white">
                  {app.job?.title}
                </h3>
                <p className="mt-1 flex items-center gap-1 text-xs text-white/40">
                  <MapPin size={12} /> {app.job?.location} • {app.job?.jobType}
                </p>
              </div>
              <Badge className={APPLICATION_STATUS_COLORS[app.status]}>
                {app.status}
              </Badge>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                <p className="mb-1 text-xs font-semibold text-white/50">Rule-Based Match</p>
                <p className="text-lg font-bold text-white">{app.matchPercentage}%</p>
              </div>
              {app.aiMatch?.matchPercentage !== undefined && (
                <div className="rounded-xl border border-accent-400/20 bg-accent-500/5 p-3">
                  <p className="mb-1 text-xs font-semibold text-accent-300">AI Match</p>
                  <p className="text-lg font-bold text-white">{app.aiMatch.matchPercentage}%</p>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default StudentApplications;