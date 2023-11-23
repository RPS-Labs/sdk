import {
  createContext,
  useContext,
  PropsWithChildren,
  createElement,
} from "react";

export type RPSSDKContextProps = string | null;

export const RPSSDKContext = createContext<RPSSDKContextProps | undefined>(
  undefined
);
export const RPSSDKConfig = ({
  children,
  apiKey,
}: PropsWithChildren<{ apiKey: RPSSDKContextProps }>) => {
  apiKeyInSdk = apiKey;
  return createElement(RPSSDKContext.Provider, {
    children,
    value: apiKey,
  });
};
let apiKeyInSdk: RPSSDKContextProps | undefined;
export const useRPSSDK = (): RPSSDKContextProps => {
  const apiKey = apiKeyInSdk;

  if (apiKey === undefined) {
    throw new Error("useRPSSDK must be used within an RPSSDKConfig");
  }

  return apiKey;
};
export const useConfig = () => {
  const config = useContext(RPSSDKContext);
  if (!config)
    throw new Error(
      [
        "`useConfig` must be used within `RPSSDKConfig`.\n",
        "Read more: https://rpslabs.io/react/RPSSDKConfig",
      ].join("\n")
    );
  return config;
};
