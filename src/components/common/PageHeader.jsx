// src/components/common/PageHeader.jsx
export default function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-8 border-b border-slate-100 pb-4">
      <h1 className="text-2xl font-bold text-primary font-sans tracking-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="text-sm text-slate-500 mt-1 font-body">
          {subtitle}
        </p>
      )}
    </div>
  );
}
