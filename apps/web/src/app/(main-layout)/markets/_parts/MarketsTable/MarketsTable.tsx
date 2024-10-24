"use client";

import { Box, Switch, Typography } from "@mui/material";
import { Asset, KylixChip } from "~/components";
import { TableActions } from "../TableActions";
import { useMemo } from "react";
import { Table } from "@repo/ui";
import { useGetLendingPools } from "~/hooks/chain/useGetLendingPools";
import { formatUnit } from "@repo/onchain-utils";

const placeholderData = Array.from({ length: 5 }).map(() => ({
  asset: "",
  borrowRate: "",
  collateral: false,
  collateralQ: "",
  id: 0,
  supplyRate: "",
  utilization: "",
  walletBalance: "0",
}));

type TableData = typeof placeholderData;

type MarketsTableUIProps = {
  searchQuery?: string;
};

const MarketsTableUI = ({ searchQuery = "" }: MarketsTableUIProps) => {
  const { data, isLoading } = useGetLendingPools();

  const transformedData = useMemo(() => {
    return data?.assets
      ?.filter((pool) => {
        if (!searchQuery) return pool;
        const poolName = pool.asset?.toLowerCase() || "";
        return poolName.includes(searchQuery);
      })
      .map((item) => {
        return {
          asset: item.asset,
          collateralQ: `%${item.collateral_q}`,
          collateral: false,
          utilization: `%${formatUnit(item.utilization, item.asset_decimals)}`,
          borrowRate: `%${item.borrow_apy}`,
          supplyRate: `%${item.supply_apy}`,
          walletBalance: formatUnit(
            item.user_asset_balance.toString(),
            item.asset_decimals
          ),
          id: item.id,
        };
      });
  }, [data, searchQuery]);

  return (
    <Table<TableData[number]>
      placeholderLength={5}
      hiddenTHeads={["actions"]}
      headers={{
        asset: "Asset",
        collateralQ: "Collateral Q",
        utilization: "Utilization",
        borrowRate: "Borrow Rate",
        supplyRate: "Supply Rate",
        collateral: "Collateral",
        walletBalance: "Wallet Balance",
        actions: "",
      }}
      isLoading={isLoading}
      rowSpacing="11px"
      components={{
        asset: (item) => (
          <Asset helperText={item.asset} label={item.asset.toString()} />
        ),
        collateralQ: (item) => (
          <Typography variant="subtitle1" className="pl-4">
            {item.collateralQ}
          </Typography>
        ),
        utilization: (item) => (
          <Typography variant="subtitle1" className="pl-4">
            {item.utilization}
          </Typography>
        ),
        borrowRate: (item) => (
          <Box className="flex flex-col pl-4">
            <Typography variant="subtitle1">{item.borrowRate}</Typography>
            <KylixChip />
          </Box>
        ),
        supplyRate: (item) => (
          <Box className="flex flex-col pl-4">
            <Typography variant="subtitle1">{item.supplyRate}</Typography>
            <KylixChip />
          </Box>
        ),
        collateral: (item) => (
          <Switch className="pl-4" checked={item.collateral} />
        ),
        walletBalance: (item) => (
          <Typography variant="subtitle1" className="pl-4">
            {item.walletBalance === "-"
              ? "-"
              : Number(item.walletBalance).toLocaleString()}
          </Typography>
        ),
        actions: (item) => <TableActions assetId={item.id} />,
      }}
      data={transformedData || []}
      defaultSortKey="asset"
      tableName="markets"
      hasPagination={false}
    />
  );
};

export default MarketsTableUI;
