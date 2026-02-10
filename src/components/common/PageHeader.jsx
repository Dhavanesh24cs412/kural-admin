// src/components/common/PageHeader.jsx
export default function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h1 className="text-xl font-semibold text-slate-900">
        {title}
      </h1>
      {subtitle && (
        <p className="text-sm text-slate-500 mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
}
