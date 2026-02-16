// src/pages/Citizens.jsx
import { useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";

import PageHeader from "../components/common/PageHeader";
import DataTable from "../components/common/DataTable";

const SEARCH_COLUMNS = [
  { value: "citizen_id", label: "Citizen ID" },
  { value: "name", label: "Name" },
  { value: "age", label: "Age" },
  { value: "gender", label: "Gender" },
  { value: "state", label: "State" },
  { value: "district", label: "District" },
  { value: "caste_category", label: "Caste Category" },
];

const PAGE_SIZE = 25;

export default function Citizens() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchColumn, setSearchColumn] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadCitizens = useCallback(async (filterColumn, filterValue) => {
    setLoading(true);

    let baseQuery = supabase
      .from("citizens")
      .select(
        `
        citizen_id,
        name,
        age,
        gender,
        state,
        district,
        income_bracket,
        caste_category
      `,
        { count: "exact" }
      );

    // search
    if (filterColumn && filterValue) {
      if (filterColumn === "age") {
        baseQuery = baseQuery.eq(filterColumn, Number(filterValue));
      } else {
        baseQuery = baseQuery.ilike(filterColumn, `%${filterValue}%`);
      }
    }

    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, error, count } = await baseQuery
      .order("citizen_id", { ascending: true })
      .range(from, to);

    if (!error && data) {
      setRows(data);
      setTotalPages(Math.ceil((count || 0) / PAGE_SIZE));
    }

    setLoading(false);
  }, [page]);

  useEffect(() => {
    loadCitizens();
  }, [loadCitizens]);

  function handleSearch() {
    if (!searchColumn || !searchValue.trim()) return;
    setPage(1);
    // pass params directly to avoid closure staleness if needed, 
    // though state updates will trigger re-render and re-fetch via effect if we relied on state.
    // But here we want to force search. 
    // Actually best pattern is to set search state and let effect handle it, 
    // but current logic passes args. 
    // We will keep direct call pattern but use the memoized function.
    loadCitizens(searchColumn, searchValue.trim());
  }

  function resetSearch() {
    setSearchColumn("");
    setSearchValue("");
    setPage(1);
    loadCitizens();
  }

  const columns = [
    { key: "citizen_id", label: "Citizen ID" },
    { key: "name", label: "Name" },
    { key: "age", label: "Age" },
    { key: "gender", label: "Gender" },
    { key: "state", label: "State" },
    { key: "district", label: "District" },
    { key: "income_bracket", label: "Income Bracket" },
    { key: "caste_category", label: "Caste Category" },
  ];

  return (
    <div>
      <PageHeader
        title="Citizens"
        subtitle="Master citizen registry (read-only)"
      />

      {/* SEARCH BAR */}
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

      {loading ? (
        <div className="text-sm text-slate-500">Loading citizens…</div>
      ) : (
        <>
          <DataTable columns={columns} rows={rows} />

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
        </>
      )}
    </div>
  );
}
