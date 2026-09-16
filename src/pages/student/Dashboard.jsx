import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, FileText, Briefcase, ClipboardList, ArrowRight } from "lucide-react";
import Card from "../../components/common/Card";
import Loader from "../../components/common/Loader";
import { getMyProfile } from "../../services/studentService";
import { getMyApplications } from "../../services/applicationService";

const StudentDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [profileRes, appsRes] = await Promise.all([
          getMyProfile(),
          getMyApplications(),
        ]);
        setProfile(profileRes.data.profile);
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

  const completion = profile?.profileCompletion || 0;

  const stats = [
    {
      label: "Profile Completion",
      value: `${completion}%`,
      icon: User,
      to: "/student/profile",
    },
    {
      label: "Applications Sent",
      value: applications.length,
      icon: ClipboardList,
      to: "/student/applications",
    },
    {
      label: "Shortlisted",
      value: applications.filter((a) => a.status === "shortlisted").length,
      icon: Briefcase,
      to: "/student/applications",
    },
    {
      label: "Resume Status",
      value: profile?.resume?.url ? "Uploaded" : "Missing",
      icon: FileText,
      to: "/student/resume",
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-6"
      >
        <h2 className="font-display text-xl font-bold text-white">
          Welcome back, {profile?.fullName || "Student"} 👋
        </h2>
        <p className="mt-1 text-sm text-white/50">
          Here's a quick overview of your placement journey.
        </p>

        {completion < 100 && (
          <div className="mt-4">
            <div className="mb-1.5 flex justify-between text-xs text-white/50">
              <span>Profile completion</span>
              <span>{completion}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-brand-gradient transition-all duration-700"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>
        )}
      </motion.div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Link key={stat.label} to={stat.to}>
            <Card hover className="h-full">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/15 text-primary-300">
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
        <h3 className="mb-4 font-display text-lg font-semibold text-white">
          Recent Applications
        </h3>
        {applications.length === 0 ? (
          <p className="text-sm text-white/50">
            You haven't applied to any jobs yet.{" "}
            <Link to="/student/jobs" className="text-accent-400 hover:underline">
              Browse jobs
            </Link>
          </p>
        ) : (
          <div className="space-y-3">
            {applications.slice(0, 5).map((app) => (
              <div
                key={app._id}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-white">{app.job?.title}</p>
                  <p className="text-xs text-white/40">{app.job?.location}</p>
                </div>
                <span className="text-xs capitalize text-accent-300">{app.status}</span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default StudentDashboard;