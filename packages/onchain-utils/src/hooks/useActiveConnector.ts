"use client";

import { queryKeys, useAccountStore, wallets } from "@repo/shared";
import { skipToken, useQuery } from "@tanstack/react-query";

export const useActiveConnector = () => {
  const { connectorId } = useAccountStore();

  const { data, ...rest } = useQuery({
    queryKey: queryKeys.connector,
    queryFn: connectorId
      ? () => {
          const activeConnector = wallets.find(
            (wallet) => wallet.id === connectorId
          );

          return activeConnector;
        }
      : skipToken,
    refetchIntervalInBackground: true,
    refetchInterval: 30,
    refetchOnWindowFocus: "always",
    refetchOnMount: "always",
  });

  return {
    ...rest,
    connector: data,
  };
};
