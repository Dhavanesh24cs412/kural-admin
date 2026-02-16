// src/pages/Segments.jsx
import { useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";

import PageHeader from "../components/common/PageHeader";
import DataTable from "../components/common/DataTable";
import { Link } from "react-router-dom";


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


  const loadStates = useCallback(async () => {
    const { data, error } = await supabase
      .from("citizens")
      .select("state")
      .not("state", "is", null);

    if (!error && data) {
      const uniqueStates = [...new Set(data.map((i) => i.state))];
      setStates(uniqueStates);
    }
  }, []);

  const loadSchemes = useCallback(async () => {
    const { data, error } = await supabase
      .from("government_schemes")
      .select("scheme_code, scheme_name")
      .order("scheme_name");

    if (!error && data) {
      setSchemes(data);
    }
  }, []);

  const loadCampaigns = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("campaigns")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError("Failed to load campaigns.");
    } else {
      setRows(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadCampaigns();
    loadStates();
    loadSchemes();
  }, [loadCampaigns, loadStates, loadSchemes]);

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
      <div className="flex gap-4 mb-8">
        <button
          className="h-10 px-6 bg-primary text-white font-bold rounded-md hover:bg-primary/90 transition-all shadow-sm font-sans tracking-wide text-xs uppercase flex items-center gap-2"
          onClick={() => {
            setCampaignType("GEOGRAPHY");
            setShowModal(true);
          }}
        >
          <span>+</span> Create Geography Campaign
        </button>

        <button
          className="h-10 px-6 bg-white border border-slate-300 text-slate-700 font-bold rounded-md hover:bg-slate-50 transition-all shadow-sm font-sans tracking-wide text-xs uppercase flex items-center gap-2"
          onClick={() => {
            setCampaignType("SCHEME");
            setShowModal(true);
          }}
        >
          <span>+</span> Create Scheme Campaign
        </button>
      </div>

      {loading && <div className="text-sm text-slate-500 font-medium text-center py-8">Loading campaigns...</div>}
      {error && <div className="text-sm text-status-error font-medium text-center py-8">{error}</div>}

      {!loading && !error && (
        <div className="border border-slate-200 rounded-md overflow-hidden bg-white shadow-sm">
          <DataTable
            columns={[
              {
                key: "campaign_name",
                label: "Campaign",
                render: (row) => (
                  <Link
                    to={`/campaigns/${row.campaign_id}`}
                    className="text-accent font-bold hover:underline text-sm font-sans"
                  >
                    {row.campaign_name}
                  </Link>
                ),
              },
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
              campaign_type: <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">{r.campaign_type}</span>,
              state: r.state || "—",
              district: r.district || "—",
              scheme_code: r.scheme_code ? <span className="font-mono text-primary font-medium">{r.scheme_code}</span> : "—",
              total_citizens: <span className="font-mono">{r.total_citizens}</span>,
              total_schemes: <span className="font-mono">{r.total_schemes}</span>,
              audit_status: (
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${r.audit_passed ? "bg-green-100 text-status-success" : "bg-red-100 text-status-error"
                  }`}>
                  {r.audit_passed === true ? "PASS" : "FAIL"}
                </span>
              ),
              status: <span className="font-mono text-xs text-slate-500">{r.status}</span>,
              actions: (
                <div className="flex gap-3">
                  <button
                    className="text-xs text-status-error font-bold uppercase tracking-wide hover:underline"
                    onClick={() => deleteCampaign(r.campaign_id)}
                  >
                    Delete
                  </button>

                  <button
                    className={`text-xs font-bold uppercase tracking-wide hover:underline ${r.audit_passed
                      ? "text-accent"
                      : "text-slate-300 cursor-not-allowed"
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
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-primary/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl w-[480px] overflow-hidden border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-bold text-primary text-sm uppercase tracking-wider font-sans">
                Create {campaignType} Campaign
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">Campaign Name</label>
                <input
                  className="w-full h-10 rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all font-body placeholder:text-slate-400"
                  placeholder="e.g. Q4 Outreach - Farmers"
                  value={form.campaign_name}
                  onChange={(e) =>
                    setForm({ ...form, campaign_name: e.target.value })
                  }
                />
              </div>

              {campaignType === "GEOGRAPHY" && (
                <div className="grid grid-cols-2 gap-4">
                  {/* STATE */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">State</label>
                    <div className="relative">
                      <select
                        className="w-full h-10 rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all font-body appearance-none bg-white"
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
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-500 text-xs">▼</div>
                    </div>
                  </div>

                  {/* DISTRICT */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">District</label>
                    <div className="relative">
                      <select
                        className="w-full h-10 rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all font-body appearance-none bg-white disabled:bg-slate-50 disabled:text-slate-400"
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
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-500 text-xs">▼</div>
                    </div>
                  </div>
                </div>
              )}

              {campaignType === "SCHEME" && (
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">Target Scheme</label>
                  <div className="relative">
                    <select
                      className="w-full h-10 rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all font-body appearance-none bg-white"
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
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-500 text-xs">▼</div>
                  </div>
                </div>
              )}
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button
                className="h-9 px-4 border border-slate-300 rounded-md font-bold text-slate-600 hover:bg-white hover:border-slate-400 transition-all uppercase tracking-wide text-xs"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="h-9 px-6 bg-primary text-white font-bold rounded-md hover:bg-primary/90 transition-all shadow-sm uppercase tracking-wide text-xs"
                onClick={createCampaign}
              >
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
