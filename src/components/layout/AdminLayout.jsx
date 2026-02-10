// src/components/layout/AdminLayout.jsx
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen w-screen bg-slate-100 text-slate-900">
      
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0">
        <Sidebar />
      </aside>

      {/* Main Area */}
      <section className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <header className="flex-shrink-0">
          <Topbar />
        </header>

        {/* Content Frame */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </section>
    </div>
  );
}
