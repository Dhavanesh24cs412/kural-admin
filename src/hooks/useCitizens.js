import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const PAGE_SIZE = 10;

export default function useCitizens(search = "", page = 1) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  const fetchCitizens = async () => {
    setLoading(true);
    setError(null);

    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    let query = supabase
      .from("citizens")
      .select("*", { count: "exact" })
      .range(from, to)
      .order("created_at", { ascending: false });

    if (search) {
      query = query.ilike("name", `%${search}%`);
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
    fetchCitizens();
  }, [search, page]);

  return {
    data,
    loading,
    error,
    total,
    pageSize: PAGE_SIZE,
  };
}
