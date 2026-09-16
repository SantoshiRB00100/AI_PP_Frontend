import { LogOut, Menu } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Topbar = ({ title, onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/5 bg-base-950/80 px-6 py-4 backdrop-blur-lg">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="text-white/70 md:hidden">
          <Menu size={22} />
        </button>
        <h1 className="font-display text-lg font-semibold text-white">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-white">{user?.email}</p>
          <p className="text-xs capitalize text-white/40">{user?.role}</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gradient text-sm font-semibold text-white">
          {user?.email?.[0]?.toUpperCase()}
        </div>
        <button
          onClick={handleLogout}
          className="rounded-lg bg-white/5 p-2 text-white/60 transition hover:bg-red-500/15 hover:text-red-300"
          title="Logout"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};

export default Topbar;