import {
  fixPrecision,
  formatUnit,
  MetadataResult,
  useActiveAccount,
  useMetadata,
  useProvider,
} from "@repo/onchain-utils";
import {
  LendingLendingPool,
  PRICE_BASE_ASSET_ID,
  queryKeys,
} from "@repo/shared";
import { useQuery } from "@tanstack/react-query";
import { assets } from "~/config";
type Pool = {
  balance: string;
  assetName: string;
  collateralQ: string;
  collateral: boolean;
  utilization: string;
  borrowApy: string;
  supplyApy: string;
  walletBalance: number;
  assetId: number;
  poolId: number;
};

interface PoolsResponse {
  pools: Pool[];
  totalBorrow: string;
  totalSupply: string;
}

export const usePools = () => {
  const { api } = useProvider();
  const { activeAccount } = useActiveAccount();

  const { data, ...rest } = useQuery({
    queryKey: queryKeys.pools({ activeAccount: activeAccount?.address }),
    enabled: !!api,
    queryFn: async () => {
      const pools = await api?.query?.lending?.lendingPoolStorage?.entries();
      if (!pools) return;
      let totalBorrow = BigInt(0);
      let totalSupply = BigInt(0);
      const formattedPools = await Promise.all(
        pools.map(async ([, value]) => {
          const poolData = value.toJSON() as unknown as LendingLendingPool;
          console.log("poolData", poolData);

          const lendTokenId = poolData.lendTokenId;
          const kTokenId = poolData.id;
          const assetMetadata = (
            await api?.query?.assets?.metadata?.(lendTokenId)
          )?.toHuman() as unknown as MetadataResult;
          const baseAssetMetadata = (
            await api?.query?.assets?.metadata?.(PRICE_BASE_ASSET_ID)
          )?.toJSON() as unknown as MetadataResult;
          let balance = "-";
          if (activeAccount?.address) {
            const requestAssetBalance = await api?.query?.assets?.account?.(
              kTokenId,
              activeAccount?.address
            );
            const assetBalance = requestAssetBalance?.toJSON() as unknown as {
              balance: number | null;
            };
            balance = formatUnit(
              assetBalance?.balance || 0,
              Number(assetMetadata.decimals)
            );
          }
          const assetStaticData = assets[lendTokenId.toString()];

          const assetPrice =
            ((
              await api?.query.lending?.assetPrices?.([
                lendTokenId,
                PRICE_BASE_ASSET_ID,
              ])
            )?.toJSON() as number) || 0;

          const assetDecimal = Number(assetMetadata.decimals);
          const calcBorrow =
            BigInt(poolData.borrowedBalance) / BigInt(assetPrice);
          const calcSupply =
            BigInt("0x00000000033b2e3c9fd0772498f5b674") / BigInt(assetPrice);
          const formatBorrowedBalance = formatUnit(calcSupply, assetDecimal);
          const formatReserveBalance = formatUnit(calcBorrow, assetDecimal);

          totalBorrow += BigInt(formatBorrowedBalance);
          totalSupply += BigInt(formatReserveBalance);

          console.log(
            "calcSupply",
            calcBorrow,
            BigInt(poolData.reserveBalance),
            BigInt(assetPrice)
          );
          console.log(totalSupply, calcSupply);

          return {
            assetName: assetMetadata.name,
            collateralQ: assetStaticData?.collateralQ,
            utilization: assetStaticData?.utilization,
            borrowApy: assetStaticData?.borrowApy,
            supplyApy: assetStaticData?.supplyApy,
            assetId: lendTokenId,
            poolId: kTokenId,
            balance,
          };
        })
      );

      return {
        pools: formattedPools,
        totalBorrow: totalBorrow.toString(),
        totalSupply: totalBorrow.toString(),
      } as PoolsResponse;
    },
  });

  return {
    pools: data?.pools,
    totalBorrow: data?.totalBorrow,
    totalSupply: data?.totalSupply,
    ...rest,
  };
};
