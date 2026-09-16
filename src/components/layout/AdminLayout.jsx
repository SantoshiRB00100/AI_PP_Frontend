import { LayoutDashboard, ClipboardCheck } from "lucide-react";
import DashboardLayout from "./DashboardLayout";

const links = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/pending-jobs", label: "Pending Jobs", icon: ClipboardCheck },
];

const AdminLayout = ({ title, children }) => (
  <DashboardLayout links={links} roleLabel="Admin Portal" title={title}>
    {children}
  </DashboardLayout>
);

export default AdminLayout;