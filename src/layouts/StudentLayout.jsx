import { NavLink,useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  FileText,
  Briefcase,
  ClipboardList,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

function StudentLayout({ children, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/login");
};

  const navigation = [
    {
      name: "Dashboard",
      path: "/student/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "My Profile",
      path: "/student/profile",
      icon: User,
    },
    {
      name: "Resume & AI Analysis",
      path: "/student/resume",
      icon: FileText,
    },
    {
      name: "Browse Jobs",
      path: "/student/jobs",
      icon: Briefcase,
    },
    {
      name: "My Applications",
      path: "/student/applications",
      icon: ClipboardList,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0618] text-white">
      {/* Mobile Header */}
      <header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-[#0b0618]/90 px-4 backdrop-blur-xl lg:hidden">
        <h1 className="text-lg font-bold">
          <span className="text-sky-400">AI</span> Placement
        </h1>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-lg p-2 text-white hover:bg-white/10"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-white/10 bg-[#100821]/95 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center border-b border-white/10 px-6">
          <div>
            <h1 className="text-xl font-bold">
              <span className="text-sky-400">AI</span> Placement
            </h1>
            <p className="mt-1 text-xs text-white/40">Student Portal</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600/40 to-sky-500/30 text-sky-300 shadow-lg shadow-sky-500/10"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-white/10 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/60 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="min-h-screen lg:ml-72">
        {/* Desktop Top Bar */}
        <header className="hidden h-20 items-center justify-between border-b border-white/10 bg-[#0b0618]/80 px-8 backdrop-blur-xl lg:flex">
          <div>
            <p className="text-sm text-white/40">Student Portal</p>
            <h2 className="text-2xl font-semibold">{title}</h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-sky-400 font-bold">
              S
            </div>

            <div>
              <p className="text-sm font-medium">Student</p>
              <p className="text-xs text-white/40">Welcome back</p>
            </div>
          </div>
        </header>

        {/* Mobile Title */}
        <div className="px-4 pb-4 pt-20 lg:hidden">
          <p className="text-sm text-white/40">Student Portal</p>
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>

        {/* Page Content */}
        <section className="p-4 sm:p-6 lg:p-8">
          {children}
        </section>
      </main>
    </div>
  );
}

export default StudentLayout;