import { API_URL, fetcher } from "../constants";
import useSWR from "swr";
import { useRPSSDK } from "../provider";
interface LeaderBoardProps {
  chain: "ethereum" | "linea" | "sepolia" | "taiko" | "mantle" | "scroll";
}

interface ApiHookResult {
  data: any;
  error: any;
  isLoading: boolean;
  isValidating: boolean;
  mutate: (data: any, options: any) => {};
}

// Define your custom hook
export function useLeaderBoard({ chain }: LeaderBoardProps): ApiHookResult {
  const apiKey = useRPSSDK();
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    [`${API_URL}/pot/latest_raffle?chain=${chain}`, apiKey],
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
