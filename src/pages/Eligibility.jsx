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
      <div className="flex items-start justify-between mb-8">
        <PageHeader
          title="Eligibility Mapping"
          subtitle="Citizen to scheme eligibility (system evaluated)"
        />

        {/* ELIGIBILITY TOGGLE */}
        <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
          <ToggleButton
            active={filter === "all"}
            onClick={() => setFilter("all")}
            label="All Records"
          />
          <ToggleButton
            active={filter === "eligible"}
            onClick={() => setFilter("eligible")}
            label="Eligible Only"
          />
          <ToggleButton
            active={filter === "not_eligible"}
            onClick={() => setFilter("not_eligible")}
            label="Not Eligible"
          />
        </div>
      </div>

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
        <div className="text-sm text-slate-500 font-medium text-center py-8">
          Loading eligibility data...
        </div>
      ) : (
        <>
          <div className="border border-slate-200 rounded-md overflow-hidden bg-white shadow-sm">
            <DataTable
              columns={[
                { key: "citizen_id", label: "Citizen ID" },
                { key: "citizen_name", label: "Citizen Name" },
                { key: "scheme_count", label: "Eligible Schemes" },
                { key: "actions", label: "Actions" },
              ]}
              rows={rows.map((r) => ({
                citizen_id: <span className="font-mono text-slate-600">{r.citizen_id}</span>,
                citizen_name: <span className="font-medium text-slate-900">{r.citizen_name}</span>,
                scheme_count: <span className="font-mono">{r.eligible_scheme_count}</span>,
                actions: (
                  <button
                    onClick={() => setSelectedCitizen(r)}
                    className="text-accent font-bold text-xs uppercase tracking-wide hover:underline"
                  >
                    View Details
                  </button>
                ),
              }))}
            />
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
        </>
      )}

      {/* RIGHT SLIDE-IN PANEL */}
      <div
        className={[
          "fixed top-0 right-0 h-full w-[500px] bg-white border-l border-slate-200 z-50 shadow-2xl",
          "transform transition-transform duration-300 ease-in-out font-sans",
          selectedCitizen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {selectedCitizen && (
          <div className="h-full flex flex-col">
            {/* HEADER */}
            <div className="border-b border-slate-100 bg-slate-50/50">
              <details className="group" open>
                <summary className="cursor-pointer list-none p-6 outline-none">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">
                        CITIZEN PROFILE
                      </div>
                      <div className="text-xl font-bold text-primary leading-tight">
                        {selectedCitizen.citizen_name}
                      </div>
                      <div className="text-xs font-mono text-slate-500 mt-1">
                        ID: {selectedCitizen.citizen_id}
                      </div>
                    </div>
                    <span className="text-slate-400 transform group-open:rotate-180 transition-transform duration-200">
                      ▼
                    </span>
                  </div>
                </summary>

                {citizenProfile && (
                  <div className="px-6 pb-6 grid grid-cols-2 gap-x-6 gap-y-4 text-xs text-slate-700 border-t border-slate-100 pt-4">
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
                    <Detail label="Created At" value={new Date(citizenProfile.created_at).toLocaleDateString()} />
                  </div>
                )}
              </details>
            </div>


            {/* BODY */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
              <div className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2">
                Evaluation Results
              </div>
              {detailsLoading ? (
                <div className="text-sm text-slate-500 font-medium text-center py-8">
                  Loading scheme details...
                </div>
              ) : citizenDetails.length === 0 ? (
                <div className="text-sm text-slate-500 text-center py-8">No eligibility records found.</div>
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
                      className="border border-slate-200 rounded-lg overflow-hidden group"
                    >
                      <summary className="cursor-pointer px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors flex justify-between items-center outline-none">
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-0.5">
                            {scheme.scheme_code}
                          </div>
                          <div className="text-sm font-bold text-slate-800 font-sans">
                            {scheme.scheme_name}
                          </div>
                        </div>
                        <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full ${scheme.isEligible ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                          }`}>
                          {scheme.isEligible ? "Eligible" : "Not Eligible"}
                        </span>
                      </summary>

                      <div className="p-4 bg-white border-t border-slate-100">
                        {/* Column headers */}
                        <div className="grid grid-cols-4 gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-2 mb-2 font-sans">
                          <div className="col-span-1">Rule</div>
                          <div className="col-span-1">Citizen</div>
                          <div className="col-span-1">Required</div>
                          <div className="col-span-1 text-right">Result</div>
                        </div>
                        {scheme.rules.map((rule) => (
                          <div
                            key={rule.rule_key}
                            className="grid grid-cols-4 gap-2 text-xs items-center py-1.5 border-b border-slate-50 last:border-0"
                          >
                            <div className="text-slate-600 font-medium font-body col-span-1">
                              {rule.rule_label}
                            </div>

                            <div className="col-span-1 text-slate-800 font-mono text-[11px]">
                              {rule.citizen_value ?? "—"}
                            </div>

                            <div className="col-span-1 text-slate-500 font-mono text-[11px]">
                              {rule.scheme_value ?? "—"}
                            </div>

                            <div
                              className={`font-bold text-right col-span-1 ${rule.is_rule_satisfied
                                ? "text-status-success"
                                : "text-status-error"
                                }`}
                            >
                              {rule.is_rule_satisfied ? "PASS" : "FAIL"}
                            </div>
                          </div>
                        ))}
                      </div>
                    </details>
                  ))
              )}
            </div>

            {/* FOOTER */}
            <div className="p-6 border-t border-slate-100 bg-slate-50">
              <button
                onClick={() => {
                  setSelectedCitizen(null);
                  setCitizenDetails([]);
                }}
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

function ToggleButton({ active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className={[
        "px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all duration-200",
        active
          ? "bg-primary text-white shadow-sm"
          : "text-slate-500 hover:text-slate-900 hover:bg-slate-50",
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
      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-sans mb-1">
        {label}
      </div>
      <div className="text-sm text-slate-800 font-medium font-body leading-relaxed">
        {display}
      </div>
    </div>
  );
}
