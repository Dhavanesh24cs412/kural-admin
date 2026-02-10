// src/pages/Intelligence.jsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

import PageHeader from "../components/common/PageHeader";
import DataTable from "../components/common/DataTable";

export default function Intelligence() {
  const [gapRows, setGapRows] = useState([]);
  const [batchRows, setBatchRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIntelligence();
  }, []);

  async function loadIntelligence() {
    setLoading(true);

    /**
     * GAP LOGIC (read-only, derived):
     * Citizens evaluated but NOT eligible for a scheme
     */
    const { data: gapData } = await supabase
      .from("eligibility_mapping")
      .select("scheme_id, citizen_id")
      .eq("is_eligible", false);

    const gapGrouped = {};
    (gapData || []).forEach((r) => {
      gapGrouped[r.scheme_id] =
        (gapGrouped[r.scheme_id] || 0) + 1;
    });

    setGapRows(
      Object.entries(gapGrouped).map(([scheme_id, count]) => ({
        scheme_id,
        affected_citizens: count,
      }))
    );

    /**
     * OUTBOUND BATCH STRUCTURE
     * Eligible citizens grouped by scheme
     */
    const { data: eligibleData } = await supabase
      .from("eligibility_mapping")
      .select("scheme_id, citizen_id")
      .eq("is_eligible", true);

    const batchGrouped = {};
    (eligibleData || []).forEach((r) => {
      batchGrouped[r.scheme_id] =
        (batchGrouped[r.scheme_id] || 0) + 1;
    });

    setBatchRows(
      Object.entries(batchGrouped).map(([scheme_id, count]) => ({
        scheme_id,
        target_citizens: count,
        batch_status: "Ready",
      }))
    );

    setLoading(false);
  }

  return (
    <div>
      <PageHeader
        title="Governance Intelligence"
        subtitle="Eligibility gaps and outbound readiness (derived)"
      />

      {loading ? (
        <div className="text-sm text-slate-500">
          Computing intelligence…
        </div>
      ) : (
        <>
          <h2 className="text-sm font-semibold text-slate-700 mb-3">
            Eligibility Gaps
          </h2>

          <DataTable
            columns={[
              { key: "scheme_id", label: "Scheme ID" },
              { key: "affected_citizens", label: "Affected Citizens" },
            ]}
            rows={gapRows}
          />

          <div className="h-8" />

          <h2 className="text-sm font-semibold text-slate-700 mb-3">
            Outbound Communication Batches
          </h2>

          <DataTable
            columns={[
              { key: "scheme_id", label: "Scheme ID" },
              { key: "target_citizens", label: "Target Citizens" },
              { key: "batch_status", label: "Batch Status" },
            ]}
            rows={batchRows}
          />
        </>
      )}
    </div>
  );
}
