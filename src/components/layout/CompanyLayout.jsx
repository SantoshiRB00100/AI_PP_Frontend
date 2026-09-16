import { LayoutDashboard, Briefcase, PlusCircle, Users } from "lucide-react";
import DashboardLayout from "./DashboardLayout";

const links = [
  { to: "/company/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/company/jobs", label: "My Jobs", icon: Briefcase },
  { to: "/company/jobs/create", label: "Post a Job", icon: PlusCircle },
  { to: "/company/applicants", label: "Applicants", icon: Users },
];

const CompanyLayout = ({ title, children }) => (
  <DashboardLayout links={links} roleLabel="Recruiter Portal" title={title}>
    {children}
  </DashboardLayout>
);

export default CompanyLayout;