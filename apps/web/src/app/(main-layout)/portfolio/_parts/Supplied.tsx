"use client";

import { Box, Button, Switch, Typography } from "@mui/material";
import { formatBigNumbers, formatUnit } from "@repo/onchain-utils";
import { Table } from "@repo/ui";
import { Asset, notify } from "~/components";
import { useDisableAsCollateral } from "~/hooks/chain/useDisableAsCollateral";
import { useEnableAsCollateral } from "~/hooks/chain/useEnableAsCollateral";
import { useGetAssetWiseSupplies } from "~/hooks/chain/useGetAssetWiseSupplies";

const Supplied = () => {
  const {
    data: assetWiseSupplies,
    isLoading,
    isFetched,
  } = useGetAssetWiseSupplies();
  const { mutate: enableAsCollateralMutate, isPending: isEnableAsCollateral } =
    useEnableAsCollateral();
  const {
    mutate: disableAsCollateralMutate,
    isPending: isDisableAsCollateral,
  } = useDisableAsCollateral();
  const supplies:
    | TableData
    | {
        asset: string;
        apy: string;
        balance: string;
        supplied: string;
        collateral: boolean;
        assetId: number;
      }[]
    | undefined = assetWiseSupplies?.suppliedAssets.map?.((item) => ({
    apy: item.apy,
    asset: item.assetSymbol,
    assetId: item.assetId,
    balance: formatBigNumbers(formatUnit(item.balance, item.decimals), 4),
    supplied: formatBigNumbers(formatUnit(item.supplied, item.decimals), 4),
    collateral: item.collateral,
  }));
  const handleCollateralClick = (state: boolean, assetId: string | number) => {
    if (state) {
      disableAsCollateralMutate(
        {
          assetId,
        },
        {
          onSuccess: ({ blockNumber }) => {
            notify({
              type: "success",
              title: "Success",
              message: "Transaction completed on block " + blockNumber,
            });
          },
          onError: ({ message, name }) => {
            notify({
              type: "error",
              title: name,
              message: message,
            });
          },
        }
      );
    } else {
      enableAsCollateralMutate(
        {
          assetId,
        },
        {
          onSuccess: ({ blockNumber }) => {
            notify({
              type: "success",
              title: "Success",
              message: "Transaction completed on block " + blockNumber,
            });
          },
          onError: ({ message, name }) => {
            notify({
              type: "error",
              title: name,
              message: message,
            });
          },
        }
      );
    }
  };
  return (
    <Table<TableData[number]>
      isLoading={isLoading}
      isFetched={isFetched}
      placeholderLength={3}
      tCellClassnames={"!p-3"}
      rowSpacing="10px"
      hasPagination={false}
      defaultSortKey="asset"
      headers={{
        asset: "Asset",
        balance: "Balance",
        apy: "APY",
        supplied: "Supplied",
        collateral: "Collateral",
        actions: "Action",
      }}
      hiddenTHeads={["actions", "assetId"]}
      tableName="supply"
      components={{
        asset: (item) => <Asset label={item.asset} helperText="" />,
        apy: (item) => <Typography variant="subtitle1">{item.apy}</Typography>,
        balance: (item) => (
          <Typography variant="subtitle1">{item.balance}</Typography>
        ),
        supplied: (item) => (
          <Typography variant="subtitle1">{item.supplied}</Typography>
        ),
        collateral: (item) => (
          <Switch
            checked={item.collateral}
            onChange={() =>
              handleCollateralClick(item.collateral, item.assetId)
            }
          />
        ),
        actions: () => (
          <Box className="flex justify-end gap-6 items-center">
            <Box className="flex justify-end gap-1 items-center">
              <Button variant="contained">
                <Typography variant="subtitle1" fontWeight={600}>
                  Withdraw
                </Typography>
              </Button>
              <Button variant="outlined">
                <Typography
                  className="!text-primary-500"
                  variant="subtitle1"
                  fontWeight={600}
                >
                  Supply
                </Typography>
              </Button>
            </Box>
          </Box>
        ),
      }}
      data={supplies || []}
    />
  );
};

export default Supplied;

// TODO: remove any
type TableData = {
  asset: string;
  apy: string;
  balance: string;
  supplied: string;
  collateral: boolean;
  assetId: number;
}[];
