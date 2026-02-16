// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

import PageHeader from "../components/common/PageHeader";
import StatCard from "../components/common/StatCard";
import DataTable from "../components/common/DataTable";

export default function Dashboard() {
  const [stats, setStats] = useState({
    citizens: "—",
    schemes: "—",
    eligibility: "—",
    gaps: "—",
    segments: "—",
  });

  const [recentEligibility, setRecentEligibility] = useState([]);

  useEffect(() => {
    async function loadDashboard() {
      const [
        citizensRes,
        schemesRes,
        eligibilityRes,
      ] = await Promise.all([
        supabase
          .from("citizens")
          .select("*", { count: "exact", head: true }),

        supabase
          .from("government_schemes")
          .select("*", { count: "exact", head: true }),

        supabase
          .from("eligibility_mapping")
          .select("*", { count: "exact", head: true }),
      ]);

      setStats({
        citizens: citizensRes.count ?? 0,
        schemes: schemesRes.count ?? 0,
        eligibility: eligibilityRes.count ?? 0,
        gaps: "—",
        segments: "—",
      });

      const { data } = await supabase
        .from("eligibility_mapping")
        .select("citizen_id, scheme_id, is_eligible, evaluated_at")
        .order("evaluated_at", { ascending: false })
        .limit(5);

      setRecentEligibility(
        (data || []).map((r) => ({
          citizen_id: r.citizen_id,
          scheme_id: r.scheme_id,
          is_eligible: r.is_eligible ? "Eligible" : "Not Eligible",
          evaluated_at: new Date(r.evaluated_at).toLocaleDateString(),
        }))
      );
    }
    loadDashboard();
  }, []);

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="National-level governance overview and system status"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatCard label="Total Citizens" value={stats.citizens} />
        <StatCard label="Active Schemes" value={stats.schemes} />
        <StatCard label="Eligibility Evaluated" value={stats.eligibility} />
        <StatCard label="Policy Gaps Identified" value={stats.gaps} />
        <StatCard label="Citizen Segments" value={stats.segments} />
      </div>

      <h2 className="text-lg font-bold text-primary font-sans mb-4 tracking-tight">
        Recent Eligibility Evaluations
      </h2>

      <DataTable
        columns={[
          { key: "citizen_id", label: "Citizen ID" },
          { key: "scheme_id", label: "Scheme ID" },
          { key: "is_eligible", label: "Result" },
          { key: "evaluated_at", label: "Evaluated On" },
        ]}
        rows={recentEligibility}
      />
    </div>
  );
}
