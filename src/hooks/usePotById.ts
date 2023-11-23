import { API_URL, fetcher } from "../constants";
import useSWR from "swr";
import { useRPSSDK } from "../provider";

interface PotByIdProps {
  chain: "ethereum" | "linea" | "sepolia" | "taiko" | "mantle" | "scroll";
  user: string;
  potId: string;
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
export function usePotById({
  chain,
  user,
  potId,
}: PotByIdProps): ApiHookResult {
  const apiKey = useRPSSDK();

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    [`${API_URL}/user/${user}/pot/${potId}?chain=${chain}`, apiKey],
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
