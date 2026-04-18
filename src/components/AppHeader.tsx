import { useNavigate } from "react-router-dom";
import { LogIn, LogOut, History as HistoryIcon, ArrowLeft } from "lucide-react";
import { useRepairUser } from "../hooks/useRepairUser";

interface AppHeaderProps {
  backLabel?: string;
  backTo?: string;
}

export function AppHeader({ backLabel, backTo }: AppHeaderProps) {
  const navigate = useNavigate();
  const { loginWithRedirect, logout, name, picture, isAuthenticated, isLoading } = useRepairUser();

  return (
    <header className="flex justify-between items-center mb-8 bg-surface p-4 rounded-2xl shadow-sm border border-border-subtle">
      <div className="flex items-center gap-3">
        <img
          src="/logo-mark.png"
          alt=""
          className="w-12 h-12 object-contain"
        />
        <h1 className="text-xl font-black tracking-tight text-white">
          Repair Before Replace
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {backLabel && backTo ? (
          <button
            onClick={() => navigate(backTo)}
            className="text-slate-400 hover:text-primary-400 transition-colors font-bold text-sm flex items-center gap-1"
          >
            <ArrowLeft size={16} /> {backLabel}
          </button>
        ) : isAuthenticated ? (
          <>
            <button
              onClick={() => navigate("/history")}
              className="text-slate-300 hover:text-primary-400 flex items-center gap-1 text-sm font-bold transition-colors"
            >
              <HistoryIcon size={16} /> History
            </button>
            <div className="flex items-center gap-3 ml-2 pl-4 border-l border-border-subtle">
              <img src={picture} alt={name} className="w-8 h-8 rounded-full border border-slate-200" />
              <button
                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                className="text-sm font-bold text-slate-400 hover:text-danger-500 transition-colors flex items-center gap-1"
              >
                <LogOut size={16} />
              </button>
            </div>
          </>
        ) : (
          <button
            onClick={() => loginWithRedirect()}
            disabled={isLoading}
            className="bg-primary-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-primary-700 transition-all shadow-md shadow-primary-500/20 flex items-center gap-2 disabled:opacity-50"
          >
            <LogIn size={16} /> Sign In
          </button>
        )}
      </div>
    </header>
  );
}
