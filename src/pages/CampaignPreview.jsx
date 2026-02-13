// src/pages/CampaignPreview.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import PageHeader from "../components/common/PageHeader";

export default function CampaignPreview() {
  const { campaignId } = useParams();

  const [campaign, setCampaign] = useState(null);
  const [citizens, setCitizens] = useState([]);
  const [schemesByCitizen, setSchemesByCitizen] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (campaignId) loadPreview();
  }, [campaignId]);

  async function loadPreview() {
    setLoading(true);
    setError(null);

    // 1️⃣ Campaign meta
    const { data: campaignData, error: campaignError } =
      await supabase
        .from("campaigns")
        .select("*")
        .eq("campaign_id", campaignId)
        .single();

    if (campaignError || !campaignData) {
      setError("Campaign not found");
      setLoading(false);
      return;
    }

    // 2️⃣ Citizens in campaign
    const { data: citizenData, error: citizenError } =
      await supabase
        .from("campaign_citizens")
        .select("citizen_id, citizen_name, mobile_number, state, district")
        .eq("campaign_id", campaignId)
        .order("citizen_name");

    if (citizenError) {
      setError("Failed to load citizens");
      setLoading(false);
      return;
    }

    // 3️⃣ Schemes per citizen
    const { data: schemeData } =
      await supabase
        .from("campaign_citizen_schemes")
        .select("citizen_id, scheme_name")
        .eq("campaign_id", campaignId);

    const grouped = {};
    (schemeData || []).forEach((row) => {
      if (!grouped[row.citizen_id]) {
        grouped[row.citizen_id] = [];
      }
      grouped[row.citizen_id].push(row.scheme_name);
    });

    setCampaign(campaignData);
    setCitizens(citizenData || []);
    setSchemesByCitizen(grouped);
    setLoading(false);
  }

  if (loading) {
    return <div className="text-sm text-slate-500">Loading preview…</div>;
  }

  if (error) {
    return <div className="text-sm text-red-600">{error}</div>;
  }

  return (
    <div>
      <PageHeader
        title={`Campaign: ${campaign.campaign_name}`}
        subtitle="Citizens and schemes in this immutable batch"
      />

      <div className="bg-white rounded shadow p-4">
        <div className="text-sm text-slate-500 mb-3">
          Type: {campaign.campaign_type} | Status: {campaign.status}
        </div>

        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b bg-slate-50">
              <th className="text-left p-2">Citizen</th>
              <th className="text-left p-2">Mobile</th>
              <th className="text-left p-2">State</th>
              <th className="text-left p-2">District</th>
              <th className="text-left p-2">Eligible Schemes</th>
            </tr>
          </thead>
          <tbody>
            {citizens.map((citizen) => (
              <tr key={citizen.citizen_id} className="border-b">
                <td className="p-2">{citizen.citizen_name}</td>
                <td className="p-2">{citizen.mobile_number}</td>
                <td className="p-2">{citizen.state}</td>
                <td className="p-2">{citizen.district}</td>
                <td className="p-2">
                  {(schemesByCitizen[citizen.citizen_id] || []).join(", ") || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {citizens.length === 0 && (
          <div className="text-sm text-slate-500 mt-3">
            No citizens in this campaign.
          </div>
        )}
      </div>
    </div>
  );
}
