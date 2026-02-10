import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const PAGE_SIZE = 10;

export default function useSchemes(search = "", page = 1) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  const fetchSchemes = async () => {
    setLoading(true);
    setError(null);

    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    let query = supabase
      .from("government_schemes")
      .select("*", { count: "exact" })
      .range(from, to)
      .order("scheme_code", { ascending: true });

    if (search) {
      query = query.ilike("scheme_name", `%${search}%`);
    }

    const { data, error, count } = await query;

    if (error) {
      setError(error.message);
    } else {
      setData(data);
      setTotal(count);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchSchemes();
  }, [search, page]);

  return {
    data,
    loading,
    error,
    total,
    pageSize: PAGE_SIZE,
  };
}
