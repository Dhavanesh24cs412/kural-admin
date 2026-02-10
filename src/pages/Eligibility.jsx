// src/pages/Eligibility.jsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

import PageHeader from "../components/common/PageHeader";
import DataTable from "../components/common/DataTable";

const SEARCH_COLUMNS = [
  { value: "scheme_id", label: "Scheme ID" },
  { value: "scheme_code", label: "Scheme Code" },
  { value: "scheme_name", label: "Scheme Name" },
];
const PAGE_SIZE = 25;


export default function Eligibility() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("all"); // all | eligible | not_eligible
  const [searchColumn, setSearchColumn] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCitizen, setSelectedCitizen] = useState(null);
  const [citizenDetails, setCitizenDetails] = useState([]);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [citizenProfile, setCitizenProfile] = useState(null);



  async function loadEligibility(filterColumn, filterValue) {
    setLoading(true);
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;


    let query = supabase
      .from("citizen_eligibility_summary")
      .select(
        `
      citizen_id,
      citizen_name,
      eligible_scheme_count
      `,
        { count: "exact" }
      )
      .order("citizen_name", { ascending: true });

    if (filter === "eligible") {
      query = query.gt("eligible_scheme_count", 0);
    }

    if (filter === "not_eligible") {
      query = query.eq("eligible_scheme_count", 0);
    }

    // column-scoped search
    if (filterColumn && filterValue) {
      query = query.ilike(filterColumn, `%${filterValue}%`);
    }

    const { data, error, count } = await query.range(from, to);


    if (!error && data) {
      setRows(data || []);
      setTotalPages(Math.ceil((count || 0) / PAGE_SIZE) || 1);
    }

    setLoading(false);
  }
  function handleSearch() {
    if (!searchColumn || !searchValue.trim()) return;
    setPage(1);
  }



  function resetSearch() {
    setSearchColumn("");
    setSearchValue("");
    setPage(1);
  }

  useEffect(() => {
    loadEligibility(searchColumn, searchValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filter]);

  useEffect(() => {
    if (!selectedCitizen) return;

    async function loadCitizenDetails() {
      setDetailsLoading(true);

      let query = supabase
        .from("citizen_scheme_eligibility_explain_rows")
        .select(`
      scheme_id,
      scheme_code,
      scheme_name,
      rule_key,
      rule_label,
      citizen_value,
      scheme_value,
      is_rule_satisfied
    `)
        .eq("citizen_id", selectedCitizen.citizen_id)
        .order("scheme_code")
        .order("rule_key");

      // ✅ keep scheme search consistent
      if (searchColumn && searchValue) {
        query = query.ilike(searchColumn, `%${searchValue}%`);
      }

      const { data, error } = await query;

      if (!error && data) {
        const grouped = {};

        data.forEach((r) => {
          if (!grouped[r.scheme_id]) {
            grouped[r.scheme_id] = {
              scheme_id: r.scheme_id,
              scheme_code: r.scheme_code,
              scheme_name: r.scheme_name,
              rules: [],
            };
          }

          grouped[r.scheme_id].rules.push({
            rule_key: r.rule_key,
            rule_label: r.rule_label,
            citizen_value: r.citizen_value,
            scheme_value: r.scheme_value,
            is_rule_satisfied: r.is_rule_satisfied,
          });
        });

        const schemes = Object.values(grouped).map(scheme => {
          const isEligible = scheme.rules.every(r => r.is_rule_satisfied);
          return { ...scheme, isEligible };
        });

        setCitizenDetails(schemes);
        // ensure stable reference across UI toggles
        setCitizenDetails(prev => schemes);

      }
      else {
        setCitizenDetails([]);
        console.error("Failed to load citizen eligibility details:", error);
      }

      setDetailsLoading(false);
    }

    loadCitizenDetails();
   }, [selectedCitizen, searchColumn, searchValue]);

          useEffect(() => {
          if (!selectedCitizen) return;

          async function loadCitizenProfile() {
            const { data, error } = await supabase
              .from("citizens")
              .select(`
                citizen_id,
                aadhaar_id,
                name,
                dob,
                age,
                gender,
                state,
                district,
                ward_id,
                education_level,
                occupation,
                disability,
                family_count,
                mobile_number,
                income_bracket,
                caste_category,
                created_at
              `)
              .eq("citizen_id", selectedCitizen.citizen_id)
              .single();

            if (!error) setCitizenProfile(data);
            else setCitizenProfile(null);
          }

          loadCitizenProfile();
        }, [selectedCitizen]);


   return (
    <div>
      <div className="flex items-start justify-between mb-4">
        <PageHeader
          title="Eligibility Mapping"
          subtitle="Citizen to scheme eligibility (system evaluated)"
        />

        {/* ELIGIBILITY TOGGLE */}
        <div className="flex items-center bg-slate-200 rounded-md p-1">
          <ToggleButton
            active={filter === "all"}
            onClick={() => setFilter("all")}
            label="All"
          />
          <ToggleButton
            active={filter === "eligible"}
            onClick={() => setFilter("eligible")}
            label="Eligible"
          />
          <ToggleButton
            active={filter === "not_eligible"}
            onClick={() => setFilter("not_eligible")}
            label="Not Eligible"
          />
        </div>
      </div>

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
        <div className="text-sm text-slate-500">
          Loading eligibility data…
        </div>
      ) : (
        <>
          <DataTable
            columns={[
              { key: "citizen_id", label: "Citizen ID" },
              { key: "citizen_name", label: "Citizen Name" },
              { key: "scheme_count", label: "Eligible Schemes" },
              { key: "actions", label: "Actions" },
            ]}
            rows={rows.map((r) => ({
              citizen_id: r.citizen_id,
              citizen_name: r.citizen_name,
              scheme_count: r.eligible_scheme_count,
              actions: (
                <button
                  onClick={() => setSelectedCitizen(r)}
                  className="text-slate-700 underline hover:text-slate-900"
                >
                  View Details
                </button>
              ),
            }))}
          />

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

      {/* RIGHT SLIDE-IN PANEL */}
      <div
        className={[
          "fixed top-0 right-0 h-full w-[460px] bg-white border-l border-slate-200 z-50",
          "transform transition-transform duration-300 ease-in-out",
          selectedCitizen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {selectedCitizen && (
          <div className="h-full flex flex-col">
            {/* HEADER */}
              <div className="border-b border-slate-200 bg-slate-100">
                <details className="p-5">
                  <summary className="cursor-pointer list-none">
                    <div className="text-sm font-semibold text-slate-900">
                      {selectedCitizen.citizen_name}
                    </div>
                    <div className="text-xs text-slate-500">
                      Citizen ID: {selectedCitizen.citizen_id}
                    </div>
                  </summary>

                  {citizenProfile && (
                    <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-slate-700">
                      <Detail label="Aadhaar ID" value={citizenProfile.aadhaar_id} />
                      <Detail label="DOB" value={citizenProfile.dob} />
                      <Detail label="Age" value={citizenProfile.age} />
                      <Detail label="Gender" value={citizenProfile.gender} />
                      <Detail label="State" value={citizenProfile.state} />
                      <Detail label="District" value={citizenProfile.district} />
                      <Detail label="Ward ID" value={citizenProfile.ward_id} />
                      <Detail label="Education" value={citizenProfile.education_level} />
                      <Detail label="Occupation" value={citizenProfile.occupation} />
                      <Detail label="Caste" value={citizenProfile.caste_category} />
                      <Detail label="Income Bracket" value={citizenProfile.income_bracket} />
                      <Detail label="Disability" value={citizenProfile.disability ? "Yes" : "No"} />
                      <Detail label="Family Count" value={citizenProfile.family_count} />
                      <Detail label="Mobile" value={citizenProfile.mobile_number} />
                      <Detail label="Created At" value={citizenProfile.created_at} />
                    </div>
                  )}
                </details>
              </div>


            {/* BODY */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 text-sm">
              {detailsLoading ? (
                <div className="text-slate-500">Loading scheme details…</div>
              ) : citizenDetails.length === 0 ? (
                <div className="text-slate-500">No eligibility records found.</div>
              ) : (
                citizenDetails
                  .filter(scheme => {
                    if (filter === "eligible") return scheme.isEligible === true;
                    if (filter === "not_eligible") return scheme.isEligible === false;
                    return true;
                  })
                  .map((scheme) => (
                    <details
                      key={scheme.scheme_id}
                      open={scheme.isEligible && filter !== "not_eligible"}
                      className="border border-slate-200 rounded-md"
                    >
                      <summary className="cursor-pointer px-4 py-3 bg-slate-50 flex justify-between items-center">
                        <div>
                          <div className="text-xs uppercase text-slate-500">
                            {scheme.scheme_code}
                          </div>
                          <div className="text-sm font-semibold text-slate-900">
                            {scheme.scheme_name}
                          </div>
                        </div>
                        <span className="text-xs text-slate-600">
                          {scheme.isEligible ? "Eligible" : "Not Eligible"}
                        </span>
                      </summary>

                      <div className="p-4 space-y-3">
                        {/* Column headers */}
                        <div className="grid grid-cols-4 gap-2 text-[11px] uppercase tracking-wide text-slate-500 border-b pb-2">
                          <div>Rule</div>
                          <div>Citizen</div>
                          <div>Scheme Requirement</div>
                          <div>Result</div>
                        </div>
                        {scheme.rules.map((rule) => (
                          <div
                            key={rule.rule_key}
                            className="grid grid-cols-4 gap-2 text-xs items-center"
                          >
                            <div className="text-slate-600 col-span-1">
                              {rule.rule_label}
                            </div>

                            <div className="col-span-1">
                              {rule.citizen_value ?? "—"}
                            </div>

                            <div className="col-span-1">
                              {rule.scheme_value ?? "—"}
                            </div>

                            <div
                              className={`font-medium ${rule.is_rule_satisfied
                                  ? "text-green-600"
                                  : "text-red-600"
                                }`}
                            >
                              {rule.is_rule_satisfied ? "✓ Pass" : "✕ Fail"}
                            </div>
                          </div>
                        ))}
                      </div>
                    </details>
                  ))
              )}
            </div>

            {/* FOOTER */}
            <div className="p-4 border-t border-slate-200">
              <button
                onClick={() => {
                  setSelectedCitizen(null);
                  setCitizenDetails([]);
                }}
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

function ToggleButton({ active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className={[
        "px-3 py-1 text-xs font-medium rounded-md transition-all duration-200",
        active
          ? "bg-slate-800 text-white"
          : "text-slate-600 hover:text-slate-800",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function Detail({ label, value }) {
  const display =
    Array.isArray(value) ? value.join(", ") : value ?? "—";

  return (
    <div>
      <div className="uppercase text-[10px] tracking-wide text-slate-500">
        {label}
      </div>
      <div className="mt-0.5 text-slate-800 text-xs">
        {display}
      </div>
    </div>
  );
}
