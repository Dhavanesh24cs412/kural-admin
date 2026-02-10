// src/pages/Segments.jsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

import PageHeader from "../components/common/PageHeader";
import DataTable from "../components/common/DataTable";

export default function Segments() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSegments();
  }, []);

  async function loadSegments() {
    setLoading(true);

    // Derived aggregation from eligibility_mapping
    const { data, error } = await supabase
      .from("eligibility_mapping")
      .select("scheme_id, is_eligible")
      .eq("is_eligible", true);

    if (!error && data) {
      const grouped = {};

      data.forEach((r) => {
        grouped[r.scheme_id] = (grouped[r.scheme_id] || 0) + 1;
      });

      setRows(
        Object.entries(grouped).map(([scheme_id, count]) => ({
          scheme_id,
          eligible_citizens: count,
        }))
      );
    }

    setLoading(false);
  }

  return (
    <div>
      <PageHeader
        title="Citizen Segments"
        subtitle="Derived groups based on eligibility outcomes"
      />

      {loading ? (
        <div className="text-sm text-slate-500">Loading segments…</div>
      ) : (
        <DataTable
          columns={[
            { key: "scheme_id", label: "Scheme ID" },
            { key: "eligible_citizens", label: "Eligible Citizens" },
          ]}
          rows={rows}
        />
      )}
    </div>
  );
}
