import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface UseCollegesOptions {
  search?: string;
  states?: string[];
  cities?: string[];
  types?: string[];
  minFees?: number;
  maxFees?: number;
  minNirfRank?: number;
  maxNirfRank?: number;
  sortBy?: string;
  page?: number;
  limit?: number;
}

export function useColleges(options: UseCollegesOptions = {}) {
  const params = new URLSearchParams();
  
  if (options.search) params.set("search", options.search);
  options.states?.forEach((s) => params.append("state", s));
  options.cities?.forEach((c) => params.append("city", c));
  options.types?.forEach((t) => params.append("type", t));
  if (options.minFees) params.set("feesMin", options.minFees.toString());
  if (options.maxFees) params.set("feesMax", options.maxFees.toString());
  if (options.minNirfRank) params.set("nirfMin", options.minNirfRank.toString());
  if (options.maxNirfRank) params.set("nirfMax", options.maxNirfRank.toString());
  if (options.sortBy) params.set("sort", options.sortBy);
  params.set("page", (options.page || 1).toString());
  params.set("limit", (options.limit || 12).toString());

  const { data, error, isLoading, mutate } = useSWR(
    `/api/colleges?${params}`,
    fetcher
  );

  return {
    colleges: data?.colleges || [],
    total: data?.total || 0,
    totalPages: data?.totalPages || 0,
    isLoading,
    error,
    mutate,
  };
}

export function useCollege(slug: string) {
  const { data, error, isLoading } = useSWR(
    slug ? `/api/colleges/${slug}` : null,
    fetcher
  );

  return {
    college: data,
    isLoading,
    error,
  };
}

export function useCompareCollege(ids: string[]) {
  const { data, error, isLoading } = useSWR(
    ids.length > 0 ? `/api/colleges/compare?ids=${ids.join(",")}` : null,
    fetcher
  );

  return {
    colleges: data?.colleges || [],
    aiSummary: data?.aiSummary || "",
    isLoading,
    error,
  };
}
