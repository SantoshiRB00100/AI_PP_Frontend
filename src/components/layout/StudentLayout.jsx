import { LayoutDashboard, User, Briefcase, FileText, ClipboardList } from "lucide-react";
import DashboardLayout from "./DashboardLayout";

const links = [
  { to: "/student/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/student/profile", label: "My Profile", icon: User },
  { to: "/student/resume", label: "Resume & AI Analysis", icon: FileText },
  { to: "/student/jobs", label: "Browse Jobs", icon: Briefcase },
  { to: "/student/applications", label: "My Applications", icon: ClipboardList },
];

const StudentLayout = ({ title, children }) => (
  <DashboardLayout links={links} roleLabel="Student Portal" title={title}>
    {children}
  </DashboardLayout>
);

export default StudentLayout;