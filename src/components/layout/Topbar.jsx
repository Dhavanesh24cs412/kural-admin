// src/components/layout/Topbar.jsx
export default function Topbar() {
  return (
    <div className="h-14 px-6 flex items-center justify-between bg-white border-b border-slate-200">
      
      {/* Context */}
      <div className="text-sm text-slate-700">
        National Governance Console
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-4 text-sm">
        <span className="text-slate-600">English</span>

        <span className="px-2 py-1 border border-slate-300 rounded text-xs text-slate-700">
          Policy Officer
        </span>

        <span className="text-red-600 cursor-default">
          Logout
        </span>
      </div>
    </div>
  );
}
