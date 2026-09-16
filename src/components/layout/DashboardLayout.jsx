import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

const DashboardLayout = ({ links, roleLabel, title, children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-base-950">
      <Sidebar links={links} roleLabel={roleLabel} />

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 md:hidden" onClick={() => setMobileOpen(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <Sidebar links={links} roleLabel={roleLabel} />
          </div>
        </div>
      )}

      <div className="md:pl-64">
        <Topbar title={title} onMenuClick={() => setMobileOpen(true)} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;