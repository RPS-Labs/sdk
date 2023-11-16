import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { API_URL } from "../constants";

interface LeaderBoardProps {
  chain: "mainnet" | "goerli" | "sepolia";
  onSuccess: (data: ApiData) => void;
  onError: (error: ApiError) => void;
  // Add more parameters as needed
}

interface ApiData {
  code: number;
  formatted: string;
  symbol: string;
  value: bigint;
}

interface ApiError {
  // Customize this based on the actual structure of your error object
  message: string;
  // Add other error properties as needed
}

interface ApiHookResult {
  data?: ApiData;
  error?: ApiError;
  isIdle: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  isFetched: boolean;
  isFetchedAfterMount: boolean;
  isRefetching: boolean;
  refetch: (options: {
    throwOnError: boolean;
    cancelRefetch: boolean;
  }) => Promise<ApiData>; // Adjust the Promise type based on your actual return data
  status: "idle" | "error" | "loading" | "success";
}

// Define your custom hook
export function useLeaderBoard({ chain }: LeaderBoardProps): ApiHookResult {
  const [data, setData] = useState<ApiData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isRefetching, setIsRefetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<
    "idle" | "error" | "loading" | "success"
  >("idle");
  const [isIdle, setIsIdle] = useState<boolean>(true);

  const fetchData = async () => {
    setStatus("loading");
    setIsIdle(false);
    try {
      const response: AxiosResponse<ApiData> = await axios.get(
        `${API_URL}/pot/latest_raffle?chain=${chain}`
      );
      if (response.data.code) setData(response.data);

      setIsSuccess(true);
      setStatus("success");
    } catch (error: any) {
      setIsError(true);
      setError(error.message || "An error occurred");
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
    setIsIdle(true);
  };
  useEffect(() => {
    fetchData();
  }, [chain]);

  async function refetch() {
    setIsRefetching(true);
    await fetchData();
    setIsRefetching(false);
  }

  return {
    data,
    isError,
    isLoading,
    isSuccess,
    error,
    refetch,
    isRefetching,
    isIdle,
    status,
  };
}
