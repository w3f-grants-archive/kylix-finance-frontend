"use client";

import { useProvider } from "./useProvider";
import { useMetadata } from "./useMetadata";
import { formatUnit } from "../utils";
import { skipToken, useQuery } from "@tanstack/react-query";
import { queryKeys } from "@repo/shared";
import { useActiveAccount } from "./useActiveAccount";
interface Props {
  accountAddress?: string;
  assetId?: number | string;
}

const useBalance = ({ accountAddress, assetId }: Props = {}) => {
  const { api } = useProvider();

  const { activeAccount } = useActiveAccount();
  const address = accountAddress ?? activeAccount?.address;
  const { data: assetMetaData } = useMetadata(assetId);

  const enabled = !!api && !!address;

  const { data, ...rest } = useQuery({
    queryKey: queryKeys.balance({ address, assetId }),
    queryFn: enabled
      ? async () => {
          if (!api || !address) {
            throw new Error("API provider or account address is missing.");
          }

          if (!api.query?.system?.account) {
            throw new Error(
              "API provider is not initialized properly or does not support account querying."
            );
          }

          let decimals = 12;
          let freeBalance: string;

          if (assetId) {
            if (!assetMetaData?.decimals) {
              throw new Error("Asset metadata is missing.");
            }
            decimals = Number(assetMetaData?.decimals);

            const assetBalance = await api?.query?.assets?.account?.(
              assetId,
              address
            );
            freeBalance = BigInt(
              (assetBalance?.toJSON() as any)?.balance
            ).toString();
          } else {
            const result = await api.query.system.account(address);
            const data = result.toJSON() as any;
            freeBalance = data.data.free;
          }

          const freeBalanceBigInt = BigInt(freeBalance);
          return formatUnit(freeBalanceBigInt.toString(), decimals);
        }
      : skipToken,
  });

  return {
    balance: data,
    ...rest,
  };
};

export { useBalance };
