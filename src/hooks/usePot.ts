import { API_URL, fetcher } from "../constants";
import useSWR from "swr";

interface ApiHookResult {
  data: any;
  error: any;
  isLoading: boolean;
  isValidating: boolean;
  mutate: (data: any, options: any) => {};
}

// Define your custom hook
export function usePot(): ApiHookResult {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `${API_URL}/potInfo`,
    () => fetcher(`${API_URL}/potInfo`)
  );

  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
}
