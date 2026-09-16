import { NavLink } from "react-router-dom";
import { Sparkles } from "lucide-react";

const Sidebar = ({ links, roleLabel }) => (
  <aside className="fixed left-0 top-0 hidden h-screen w-64 flex-col border-r border-white/5 bg-base-900/60 backdrop-blur-lg md:flex">
    <div className="flex items-center gap-2 px-6 py-6">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient shadow-glow-sm">
        <Sparkles size={18} className="text-white" />
      </div>
      <div>
        <p className="font-display text-sm font-semibold text-white">
          Placement<span className="text-gradient">AI</span>
        </p>
        <p className="text-xs text-white/40">{roleLabel}</p>
      </div>
    </div>

    <nav className="flex-1 space-y-1 px-4">
      {links.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-primary-500/15 text-white shadow-glow-sm"
                : "text-white/50 hover:bg-white/5 hover:text-white"
            }`
          }
        >
          <Icon size={18} />
          {label}
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default Sidebar;