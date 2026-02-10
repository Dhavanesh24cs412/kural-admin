// src/pages/Schemes.jsx
import { useEffect, useState } from "react";
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


useEffect(() => {
  loadSchemes();
}, [page]);


  async function loadSchemes(filterColumn, filterValue) {
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

  }

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
      <div className="flex items-center gap-3 mb-4">
        <select
          value={searchColumn}
          onChange={(e) => setSearchColumn(e.target.value)}
          className="border border-slate-300 rounded-md px-2 py-1 text-sm bg-white"
        >
          <option value="">Select column</option>
          {SEARCH_COLUMNS.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          disabled={!searchColumn}
          placeholder={
            searchColumn ? "Enter search value" : "Select column first"
          }
          className="border border-slate-300 rounded-md px-3 py-1 text-sm disabled:bg-slate-100"
        />

        <button
          onClick={handleSearch}
          disabled={!searchColumn || !searchValue}
          className="px-3 py-1 text-sm border border-slate-300 rounded-md hover:bg-slate-100 disabled:opacity-50"
        >
          Search
        </button>

        <button
          onClick={resetSearch}
          className="px-3 py-1 text-sm text-slate-600 underline"
        >
          Reset
        </button>
      </div>

      {/* TABLE */}
      <div className="border border-slate-200 rounded-md overflow-hidden bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-2 text-left">Scheme ID</th>
              <th className="px-4 py-2 text-left">Code</th>
              <th className="px-4 py-2 text-left">Scheme Name</th>
              <th className="px-4 py-2 text-left">Department</th>
              <th className="px-4 py-2 text-left">Scope</th>
              <th className="px-4 py-2 text-left">Income Limit</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-3 text-slate-500">
                  Loading schemes…
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row.scheme_id}
                  className="border-b border-slate-100 last:border-0 bg-[#EDF0F3]"
                >
                  <td className="px-4 py-2">{row.scheme_id}</td>
                  <td className="px-4 py-2">{row.scheme_code}</td>
                  <td className="px-4 py-2">{row.scheme_name}</td>
                  <td className="px-4 py-2">{row.department}</td>
                  <td className="px-4 py-2">
                    {Array.isArray(row.regional_scope)
                      ? row.regional_scope.join(", ")
                      : row.regional_scope ?? "—"}
                  </td>
                  <td className="px-4 py-2">{row.income_limit}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => setSelectedScheme(row)}
                      className="text-slate-700 underline hover:text-slate-900"
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
    <div className="flex items-center justify-end gap-3 mt-4 text-sm">
      <button
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        disabled={page === 1}
        className="px-3 py-1 border border-slate-300 rounded-md disabled:opacity-50"
      >
        Previous
      </button>

      <span className="text-slate-600">
        Page {page} of {totalPages}
      </span>

      <button
        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
        disabled={page === totalPages}
        className="px-3 py-1 border border-slate-300 rounded-md disabled:opacity-50"
      >
        Next
      </button>
    </div>


      {/* RIGHT SLIDE-IN PANEL */}
      <div
        className={[
          "fixed top-0 right-0 h-full w-[420px] bg-white border-l border-slate-200 z-40",
          "transform transition-transform duration-300 ease-in-out",
          selectedScheme ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {selectedScheme && (
          <div className="h-full flex flex-col">
            <div className="p-5 border-b border-slate-200 bg-stone-200">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                {selectedScheme.scheme_code}
              </div>
              <div className="text-lg font-semibold text-slate-900 mt-1">
                {selectedScheme.scheme_name}
              </div>
              <div className="text-sm font-semibold text-slate-500 mt-2">
                {selectedScheme.scheme_description || "—"}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4 text-sm">
              <Detail label="Department" value={selectedScheme.department} />
              <Detail label="Regional Scope" value={selectedScheme.regional_scope} />
              <Detail label="Income Limit" value={selectedScheme.income_limit} />
              <Detail label="Minimum Age" value={selectedScheme.min_age} />
              <Detail label="Maximum Age" value={selectedScheme.max_age} />
              <Detail label="Gender" value={selectedScheme.gender} />
              <Detail label="Eligible Caste" value={selectedScheme.eligible_caste} />
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

            <div className="p-4 border-t border-slate-200">
              <button
                onClick={() => setSelectedScheme(null)}
                className="w-full py-2 text-sm border border-slate-300 rounded-md hover:bg-slate-100"
              >
                Close
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
      <div className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className="mt-1 text-slate-800">
        {displayValue}
      </div>
    </div>
  );
}
