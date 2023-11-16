import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { API_URL } from "../constants";

interface WinnersProps {
  chain: "ethereum" | "linea" | "sepolia" | "taiko" | "mantle" | "scroll";
  onSuccess: (data: ApiData) => void;
  onError: (error: ApiError) => void;
  // Add more parameters as needed
}

interface ApiData {
  code: number;
  message: string;
}

interface ApiError {
  // Customize this based on the actual structure of your error object
  message: string;
  code: number;
  // Add other error properties as needed
}

interface ApiHookResult {
  data: ApiData | null;
  error: ApiError | null;
  isIdle: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  isRefetching: boolean;
  refetch: (options: {
    throwOnError: boolean;
    cancelRefetch: boolean;
  }) => Promise<ApiData | null>; // Adjust the Promise type based on your actual return data
  status: "idle" | "error" | "loading" | "success";
}

// Define your custom hook
export function useWinners({
  chain,
  onSuccess,
  onError,
}: WinnersProps): ApiHookResult {
  const [data, setData] = useState<ApiData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isRefetching, setIsRefetching] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [status, setStatus] = useState<
    "idle" | "error" | "loading" | "success"
  >("idle");
  const [isIdle, setIsIdle] = useState<boolean>(true);

  const fetchData: () => Promise<ApiData | null> = async () => {
    let responseData = null;
    setStatus("loading");
    setIsIdle(false);
    try {
      const response: AxiosResponse<ApiData> = await axios.get(
        `${API_URL}/pot/winners?chain=${chain}`
      );
      if (response.data.code == null || response.data.code == 200) {
        setData(response.data);
        onSuccess(response.data);
        setIsSuccess(true);
        setStatus("success");
        responseData = response.data;
      } else {
        setIsError(true);
        setError(response.data);
        onError(response.data);
        setStatus("error");
      }
    } catch (error: any) {
      setIsError(true);
      setError(error.message || { message: "An error occurred", code: 500 });
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
    setIsIdle(true);
    return responseData;
  };
  useEffect(() => {
    fetchData();
  }, [chain, onSuccess, onError]);

  async function refetch(options: {
    throwOnError: boolean;
    cancelRefetch: boolean;
  }): Promise<ApiData | null> {
    if (options.cancelRefetch) return null;
    try {
      setIsRefetching(true);
      const data = await fetchData();
      setIsRefetching(false);
      return data;
    } catch (err) {
      if (options.throwOnError) throw err;
    }
    return null;
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
