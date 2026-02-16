// src/pages/Schemes.jsx
import { useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";

import PageHeader from "../components/common/PageHeader";

const SEARCH_COLUMNS = [
  { value: "scheme_id", label: "Scheme ID" },
  { value: "scheme_code", label: "Scheme Code" },
  { value: "scheme_name", label: "Scheme Name" },
  { value: "department", label: "Department" },
  { value: "regional_scope", label: "Scope" },
];
const PAGE_SIZE = 25;

export default function Schemes() {
  const [rows, setRows] = useState([]);
  const [selectedScheme, setSelectedScheme] = useState(null);

  const [searchColumn, setSearchColumn] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  const loadSchemes = useCallback(async (filterColumn, filterValue) => {
    setLoading(true);

    let query = supabase
      .from("government_schemes")
      .select("*", { count: "exact" })
      .order("scheme_id", { ascending: true });


    if (filterColumn && filterValue) {
      // regional_scope can be array or text
      if (filterColumn === "regional_scope") {
        query = query.ilike("regional_scope", `%${filterValue}%`);
      } else {
        query = query.ilike(filterColumn, `%${filterValue}%`);
      }
    }
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;


    const { data, count } = await query.range(from, to);

    setRows(data || []);
    setTotalPages(Math.ceil((count || 0) / PAGE_SIZE));
    setLoading(false);
  }, [page]);

  useEffect(() => {
    loadSchemes();
  }, [loadSchemes]);


  function handleSearch() {
    if (!searchColumn || !searchValue.trim()) return;
    setPage(1);
    loadSchemes(searchColumn, searchValue.trim());
  }


  function resetSearch() {
    setSearchColumn("");
    setSearchValue("");
    setPage(1);
    loadSchemes();
  }

  return (
    <div className="relative">
      <PageHeader
        title="Government Schemes"
        subtitle="Registered welfare schemes"
      />

      {/* SEARCH BAR */}
      <div className="flex items-center gap-3 mb-6 bg-white p-4 rounded-md border border-slate-200 shadow-sm">
        <div className="flex-1 max-w-xs">
          <select
            value={searchColumn}
            onChange={(e) => setSearchColumn(e.target.value)}
            className="w-full h-10 rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all font-body bg-slate-50"
          >
            <option value="">Select Filter Column</option>
            {SEARCH_COLUMNS.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 max-w-sm">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            disabled={!searchColumn}
            placeholder={
              searchColumn ? `Search by ${SEARCH_COLUMNS.find(c => c.value === searchColumn)?.label}...` : "Select a column first"
            }
            className="w-full h-10 rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all font-body disabled:bg-slate-100 disabled:text-slate-400"
          />
        </div>

        <button
          onClick={handleSearch}
          disabled={!searchColumn || !searchValue}
          className="h-10 px-6 bg-accent text-white font-bold rounded-md hover:bg-accent/90 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed font-sans tracking-wide text-sm uppercase"
        >
          Search
        </button>

        <button
          onClick={resetSearch}
          className="h-10 px-4 text-slate-500 font-bold hover:text-primary transition-colors text-sm uppercase tracking-wide"
        >
          Reset
        </button>
      </div>

      {/* TABLE */}
      <div className="border border-slate-200 rounded-md overflow-hidden bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider font-sans">Scheme ID</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider font-sans">Code</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider font-sans">Scheme Name</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider font-sans">Department</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider font-sans">Scope</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider font-sans">Income Limit</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider font-sans">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-slate-500 font-medium">
                  Loading schemes data...
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row.scheme_id}
                  className="hover:bg-slate-50 transition-colors duration-150 group"
                >
                  <td className="px-6 py-4 font-mono text-slate-600">{row.scheme_id}</td>
                  <td className="px-6 py-4 font-mono font-medium text-primary">{row.scheme_code}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{row.scheme_name}</td>
                  <td className="px-6 py-4 text-slate-600">{row.department}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                      {Array.isArray(row.regional_scope)
                        ? row.regional_scope.join(", ")
                        : row.regional_scope ?? "—"}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-600">{row.income_limit}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedScheme(row)}
                      className="text-accent font-bold text-xs uppercase tracking-wide hover:underline"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* PAGINATION */}
      <div className="flex items-center justify-end gap-3 mt-6 text-sm">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="h-9 px-4 border border-slate-300 rounded-md font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>

        <span className="text-slate-600 font-medium font-mono">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="h-9 px-4 border border-slate-300 rounded-md font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>


      {/* RIGHT SLIDE-IN PANEL */}
      <div
        className={[
          "fixed top-0 right-0 h-full w-[450px] bg-white border-l border-slate-200 z-50 shadow-2xl",
          "transform transition-transform duration-300 ease-in-out font-sans",
          selectedScheme ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {selectedScheme && (
          <div className="h-full flex flex-col">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <div className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">
                {selectedScheme.scheme_code}
              </div>
              <div className="text-xl font-bold text-primary leading-tight">
                {selectedScheme.scheme_name}
              </div>
              <div className="text-sm text-slate-500 mt-3 font-body leading-relaxed">
                {selectedScheme.scheme_description || "No description provided."}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <Detail label="Department" value={selectedScheme.department} />
                <Detail label="Regional Scope" value={selectedScheme.regional_scope} />
                <Detail label="Income Limit" value={selectedScheme.income_limit} />
                <Detail label="Age Range" value={`${selectedScheme.min_age ?? 0} - ${selectedScheme.max_age ?? 'N/A'}`} />
                <Detail label="Gender" value={selectedScheme.gender} />
                <Detail label="Eligible Caste" value={selectedScheme.eligible_caste} />
              </div>
              <Detail
                label="Eligible Occupation"
                value={selectedScheme.eligible_occupation}
              />
              <Detail
                label="Requires Disability"
                value={selectedScheme.requires_disability ? "Yes" : "No"}
              />
              <Detail
                label="Created At"
                value={new Date(
                  selectedScheme.created_at
                ).toLocaleDateString()}
              />
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50">
              <button
                onClick={() => setSelectedScheme(null)}
                className="w-full h-10 border border-slate-300 rounded-md font-bold text-slate-600 hover:bg-white hover:border-slate-400 transition-all uppercase tracking-wide text-xs"
              >
                Close Panel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  const displayValue = Array.isArray(value)
    ? value.join(", ")
    : value ?? "—";

  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-sans mb-1">
        {label}
      </div>
      <div className="text-sm text-slate-800 font-medium font-body leading-relaxed">
        {displayValue}
      </div>
    </div>
  );
}
