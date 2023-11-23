import { API_URL, fetcher } from "../constants";
import useSWR from "swr";
import { useRPSSDK } from "../provider";

interface ApiHookResult {
  data: any;
  error: any;
  isLoading: boolean;
  isValidating: boolean;
  mutate: (data: any, options: any) => {};
}

// Define your custom hook
export function useTicketPrice(): ApiHookResult {
  const apiKey = useRPSSDK();
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    [`${API_URL}/hotpot_fee`, apiKey],
    ([url, apiKey]) => fetcher(url, apiKey ?? "")
  );

  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
}
