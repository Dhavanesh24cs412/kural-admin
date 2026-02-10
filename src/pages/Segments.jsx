// src/pages/Segments.jsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

import PageHeader from "../components/common/PageHeader";
import DataTable from "../components/common/DataTable";

export default function Segments() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [campaignType, setCampaignType] = useState(null);

  const [form, setForm] = useState({
    campaign_name: "",
    state: "",
    district: "",
    scheme_code: "",
  });

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [schemes, setSchemes] = useState([]);


  useEffect(() => {
    loadCampaigns();
    loadStates();
    loadSchemes();
  }, []);

  async function loadCampaigns() {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("campaign_summary_with_audit")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError("Failed to load campaigns");
      setRows([]);
    } else {
      setRows(data || []);
    }

    setLoading(false);
  }


async function loadStates() {
  const { data, error } = await supabase
    .from("citizens")
    .select("state")
    .not("state", "is", null);

  if (!error && data) {
    const uniqueStates = [...new Set(data.map((r) => r.state))];
    setStates(uniqueStates);
  }
}

async function loadDistricts(state) {
  const { data, error } = await supabase
    .from("citizens")
    .select("district")
    .eq("state", state)
    .not("district", "is", null);

  if (!error && data) {
    const uniqueDistricts = [...new Set(data.map((r) => r.district))];
    setDistricts(uniqueDistricts);
  }
}

async function loadSchemes() {
  const { data, error } = await supabase
    .from("government_schemes")
    .select("scheme_code, scheme_name")
    .order("scheme_name");

  if (!error && data) {
    setSchemes(data);
  }
}

  async function createCampaign() {
    if (!form.campaign_name) return;

    const campaignId = crypto.randomUUID();

    const { error: insertError } = await supabase
      .from("campaigns")
      .insert([
        {
          campaign_id: campaignId,
          campaign_name: form.campaign_name,
          campaign_type: campaignType,
          state: campaignType === "GEOGRAPHY" ? form.state || null : null,
          district: campaignType === "GEOGRAPHY" ? form.district || null : null,
          scheme_code: campaignType === "SCHEME" ? form.scheme_code : null,
          status: "CREATED",
          created_by: "admin",
        },
      ]);

    if (insertError) {
      alert("Failed to create campaign");
      return;
    }

    if (campaignType === "GEOGRAPHY") {
      await supabase.rpc("populate_geography_campaign", {
        p_campaign_id: campaignId,
      });
    }

    if (campaignType === "SCHEME") {
      await supabase.rpc("populate_scheme_campaign", {
        p_campaign_id: campaignId,
      });
    }

    setShowModal(false);
    setForm({
      campaign_name: "",
      state: "",
      district: "",
      scheme_code: "",
    });

    loadCampaigns();
  }

  async function deleteCampaign(campaignId) {
  const confirmDelete = window.confirm(
    "Are you sure you want to permanently delete this campaign?"
  );
  if (!confirmDelete) return;

  const { error } = await supabase
    .from("campaigns")
    .delete()
    .eq("campaign_id", campaignId);

  if (error) {
    alert("Failed to delete campaign");
    return;
  }

  loadCampaigns();
}

function startCall(campaignId) {
  alert(
    `Calling engine will be triggered for campaign:\n${campaignId}`
  );
}


  return (
    <div>
      <PageHeader
        title="Campaign Segments"
        subtitle="Immutable citizen batches prepared for AI calling"
      />

      {/* ACTION BAR */}
      <div className="flex gap-2 mb-4">
        <button
          className="px-3 py-1 bg-slate-900 text-white rounded text-sm"
          onClick={() => {
            setCampaignType("GEOGRAPHY");
            setShowModal(true);
          }}
        >
          Create Geography Campaign
        </button>

        <button
          className="px-3 py-1 bg-slate-700 text-white rounded text-sm"
          onClick={() => {
            setCampaignType("SCHEME");
            setShowModal(true);
          }}
        >
          Create Scheme Campaign
        </button>
      </div>

      {loading && <div className="text-sm text-slate-500">Loading campaigns…</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}

      {!loading && !error && (
        <DataTable
          columns={[
            { key: "campaign_name", label: "Campaign" },
            { key: "campaign_type", label: "Type" },
            { key: "state", label: "State" },
            { key: "district", label: "District" },
            { key: "scheme_code", label: "Scheme" },
            { key: "total_citizens", label: "Citizens" },
            { key: "total_schemes", label: "Schemes" },
            { key: "audit_status", label: "Audit" }, 
            { key: "actions", label: "Actions" },
            { key: "status", label: "Status" },
          ]}
          rows={rows.map((r) => ({
            ...r,
            state: r.state || "—",
            district: r.district || "—",
            scheme_code: r.scheme_code || "—",
            audit_status: r.audit_passed === true ? "PASS" : "FAIL",
            actions: (
              <div className="flex gap-2">
                <button
                  className="text-xs text-red-600 underline"
                  onClick={() => deleteCampaign(r.campaign_id)}
                >
                  Delete
                </button>

                <button
                  className={`text-xs underline ${
                    r.audit_passed
                      ? "text-green-600"
                      : "text-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!r.audit_passed}
                  onClick={() => startCall(r.campaign_id)}
                >
                  Call
                </button>
              </div>
            ),
          }))}
        />
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white p-4 rounded w-96">
            <h3 className="font-semibold mb-3">
              Create {campaignType} Campaign
            </h3>

            <input
              className="w-full border p-2 mb-2 text-sm"
              placeholder="Campaign Name"
              value={form.campaign_name}
              onChange={(e) =>
                setForm({ ...form, campaign_name: e.target.value })
              }
            />
            {campaignType === "GEOGRAPHY" && (
              <>
                {/* STATE */}
                <select
                  className="w-full border p-2 mb-2 text-sm"
                  value={form.state}
                  onChange={(e) => {
                    const selectedState = e.target.value;
                    setForm({ ...form, state: selectedState, district: "" });
                    loadDistricts(selectedState);
                  }}
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>

                {/* DISTRICT */}
                <select
                  className="w-full border p-2 mb-2 text-sm"
                  value={form.district}
                  disabled={!form.state}
                  onChange={(e) =>
                    setForm({ ...form, district: e.target.value })
                  }
                >
                  <option value="">Select District</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </>
            )}

            {campaignType === "SCHEME" && (
              <select
                className="w-full border p-2 mb-2 text-sm"
                value={form.scheme_code}
                onChange={(e) =>
                  setForm({ ...form, scheme_code: e.target.value })
                }
              >
                <option value="">Select Scheme</option>
                {schemes.map((s) => (
                  <option key={s.scheme_code} value={s.scheme_code}>
                    {s.scheme_name} ({s.scheme_code})
                  </option>
                ))}
              </select>
            )}
            <div className="flex justify-end gap-2 mt-3">
              <button
                className="text-sm px-3 py-1 border rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="text-sm px-3 py-1 bg-slate-900 text-white rounded"
                onClick={createCampaign}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
