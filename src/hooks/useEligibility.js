import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function useEligibility(filters = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEligibility = async () => {
    setLoading(true);
    setError(null);

    let query = supabase
      .from("eligibility_mapping")
      .select(`
        is_eligible,
        citizens (
          name,
          gender,
          state,
          occupation,
          ward_id,
          disability
        ),
        government_schemes (
          scheme_code,
          scheme_name,
          department
        )
      `)
      .eq("is_eligible", true);

    // Dynamic filters (governance-grade)
    if (filters.state) {
      query = query.eq("citizens.state", filters.state);
    }
    if (filters.gender) {
      query = query.eq("citizens.gender", filters.gender);
    }
    if (filters.occupation) {
      query = query.eq("citizens.occupation", filters.occupation);
    }

    // Dynamic filters (supports Segments)
    if (filters.scheme_code) {
      query = query.eq(
        "government_schemes.scheme_code",
        filters.scheme_code
      );
    }

    if (filters.state) {
      query = query.eq("citizens.state", filters.state);
    }

    if (filters.gender) {
      query = query.eq("citizens.gender", filters.gender);
    }

    if (filters.occupation) {
      query = query.eq("citizens.occupation", filters.occupation);
    }

    if (filters.ward_id) {
      query = query.eq("citizens.ward_id", filters.ward_id);
    }

    if (filters.disability !== undefined && filters.disability !== "") {
      query = query.eq(
        "citizens.disability",
        filters.disability === "true"
      );
    }


    const { data, error } = await query;

    if (error) {
      setError(error.message);
    } else {
      setData(data);
    }

    setLoading(false);
  };



  useEffect(() => {
    fetchEligibility();
  }, [JSON.stringify(filters)]);

  return { data, loading, error, refetch: fetchEligibility };
}
