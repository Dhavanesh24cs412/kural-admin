// src/components/layout/Sidebar.jsx
import NavItem from "../navigation/NavItem";

export default function Sidebar() {
  return (
    <div className="h-full bg-primary text-white flex flex-col border-r border-slate-800">
      <div className="px-6 py-6 border-b border-white/10">
        <div className="text-sm font-bold tracking-widest uppercase text-white/90 font-sans">
          KURAL
        </div>
        <div className="text-[10px] text-slate-400 mt-1 font-mono tracking-tight">
          GOVERNANCE INTELLIGENCE
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        <NavItem to="/" label="Dashboard" />
        <NavItem to="/citizens" label="Citizens" />
        <NavItem to="/schemes" label="Schemes" />
        <NavItem to="/eligibility" label="Eligibility" />
        <NavItem to="/segments" label="Segments" />
        <NavItem to="/intelligence" label="Intelligence" />
      </nav>

      <div className="px-6 py-4 border-t border-white/10">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-status-success animate-pulse"></div>
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
            System Online
          </div>
        </div>
      </div>
    </div>
  );
}
