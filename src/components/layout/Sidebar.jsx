// src/components/layout/Sidebar.jsx
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="h-full bg-slate-900 text-slate-100 flex flex-col border-r border-slate-800">
      <div className="px-6 py-5 border-b border-slate-800">
        <div className="text-sm font-semibold tracking-wide">KURAL</div>
        <div className="text-xs text-slate-400 mt-1">
          Government Intelligence Platform
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 text-sm">
        <NavItem to="/dashboard" label="Dashboard" />
        <NavItem to="/citizens" label="Citizens" />
        <NavItem to="/schemes" label="Schemes" />
        <NavItem to="/eligibility" label="Eligibility" />
        <NavItem to="/segments" label="Segments"/>
        <NavItem to="/intelligence" label="Intelligence"/>
      </nav>

      <div className="px-6 py-4 border-t border-slate-800 text-xs text-slate-400">
        Session: Active
      </div>
    </div>
  );
}

function NavItem({ to, label, disabled }) {
  if (disabled) {
    return (
      <div className="px-3 py-2 rounded-md text-slate-600 cursor-not-allowed">
        {label}
      </div>
    );
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "px-3 py-2 rounded-md block",
          isActive
            ? "bg-slate-800 text-slate-100"
            : "text-slate-400 hover:text-slate-200",
        ].join(" ")
      }
    >
      {label}
    </NavLink>
  );
}
