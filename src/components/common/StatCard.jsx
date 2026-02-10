// src/components/common/StatCard.jsx
export default function StatCard({ label, value }) {
  return (
    <div className="border border-slate-200 rounded-md px-4 py-3 bg-white">
      <div className="text-xs text-slate-500 uppercase tracking-wide">
        {label}
      </div>
      <div className="mt-1 text-lg font-semibold text-slate-900">
        {value}
      </div>
    </div>
  );
}
