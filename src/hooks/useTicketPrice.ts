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
export function useTicketPrice(): ApiHookResult {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `${API_URL}/hotpot_fee`,
    () => fetcher(`${API_URL}/hotpot_fee`)
  );

  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
}
