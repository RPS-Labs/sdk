import { API_URL, fetcher } from "../constants";
import useSWR from "swr";
import { useRPSSDK } from "../provider";

interface TradesProps {
  chain: "ethereum" | "linea" | "sepolia" | "taiko" | "mantle" | "scroll";
  // Add more parameters as needed
}

interface ApiHookResult {
  data: any;
  error: any;
  isLoading: boolean;
  isValidating: boolean;
  mutate: (data: any, options: any) => {};
}

// Define your custom hook
export function useTrades({ chain }: TradesProps): ApiHookResult {
  const apiKey = useRPSSDK();

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    [`${API_URL}/trades?chain=${chain}`, apiKey],
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
