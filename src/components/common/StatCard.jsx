// src/components/common/StatCard.jsx
export default function StatCard({ label, value, trend }) {
  return (
    <div className="border border-slate-200 rounded-md p-5 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-sans mb-2">
        {label}
      </div>
      <div className="text-2xl font-bold text-primary font-sans leading-none">
        {value}
      </div>
      {trend && (
        <div className="mt-2 text-xs font-medium text-status-success flex items-center">
          <span className="mr-1">▲</span> {trend}
        </div>
      )}
    </div>
  );
}
