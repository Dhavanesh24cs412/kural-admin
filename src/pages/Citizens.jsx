// src/pages/Citizens.jsx
import { useEffect, useState } from "react";
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

  useEffect(() => {
    loadCitizens();
  }, [page]);

  async function loadCitizens(filterColumn, filterValue) {
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
  }

  function handleSearch() {
    if (!searchColumn || !searchValue.trim()) return;
    setPage(1);
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

      {loading ? (
        <div className="text-sm text-slate-500">Loading citizens…</div>
      ) : (
        <>
          <DataTable columns={columns} rows={rows} />

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
        </>
      )}
    </div>
  );
}
