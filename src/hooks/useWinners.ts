import { API_URL, fetcher } from "../constants";
import useSWR from "swr";
import { useRPSSDK } from "../provider";

interface WinnersProps {
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

export function useWinners({ chain }: WinnersProps): ApiHookResult {
  const apiKey = useRPSSDK();

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    [`${API_URL}/pot/winners?chain=${chain}`, apiKey],
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
