// src/components/layout/Topbar.jsx
export default function Topbar() {
  return (
    <div className="h-16 px-8 flex items-center justify-between bg-white border-b border-slate-200 shadow-sm">

      {/* Context */}
      <div className="text-sm font-semibold text-slate-700 font-sans tracking-tight">
        / National Governance Console / Overview
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-6 text-sm">
        <div className="flex items-center space-x-2 text-slate-500 font-medium">
          <span>EN</span>
        </div>

        <div className="h-4 w-px bg-slate-200"></div>

        <span className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs font-bold text-slate-700 uppercase tracking-wide">
          Policy Officer
        </span>

        <span className="text-status-error font-medium cursor-pointer hover:underline text-xs uppercase tracking-wide">
          Logout
        </span>
      </div>
    </div>
  );
}
