"use client";
import { ListItem, notify } from "~/components";
import { Form } from "./Form";
import { useState } from "react";
import { useBorrow } from "~/hooks/chain/useBorrow";
import { useParams } from "next/navigation";
import { parseUnit, useBalance, useMetadata } from "@repo/onchain-utils";
import { useQuickBorrow } from "~/hooks/chain/useQuickBorrow";
import { useAssetPrice } from "~/hooks/chain/useAssetPrice";
import { useGetEstimateCollateralAmount } from "~/hooks/chain/useGetEstimateCollateralAmount";
const BASE_ASSET_ID = "21";
const items: Array<ListItem> = [
  {
    label: "Available to borrow",
    value: "$100",
    valueClassName: "!text-[#4E5B72]",
  },
  {
    label: "Borrow Apy",
    value: "6.4 %",
    kylixValue: "%4",
    valueClassName: "!text-[#4E5B72]",
  },
  {
    label: "Borrowed",
    value: "$64",
    valueClassName: "!text-[#4E5B72]",
  },
  {
    label: "Interest",
    value: "$ 24",
    kylixValue: "12",
    tooltipTitle: "Interest tooltip title.",
    action: {
      title: "Claim",
      onClick: () => {},
    },
    valueClassName: "!text-primary-500",
  },
];

export const Borrow = () => {
  const [value, setValue] = useState("");
  const params = useParams();
  const supplyTokenId = params["market-id"] as string;
  const { mutate, isPending } = useQuickBorrow();
  const { assetMetaData: borrowAssetMetaData } = useMetadata(BASE_ASSET_ID);
  const { assetMetaData: supplyAssetMetaData } = useMetadata(supplyTokenId);
  const { formattedBalance: supplyAssetBalance } = useBalance({
    assetId: BASE_ASSET_ID,
  });
  const { balance: borrowAssetBalance } = useBalance({
    assetId: supplyTokenId,
  });

  const { formattedEstimateCollateral: minCollateralRatio } =
    useGetEstimateCollateralAmount({
      borrowAsset: "1",
      borrowAssetAmount: parseUnit(1, borrowAssetMetaData?.decimals).toString(),
      collateralAsset: BASE_ASSET_ID,
      collateralDecimals: supplyAssetMetaData?.decimals,
    });

  const max = (
    Number(supplyAssetBalance || 1) / Number(minCollateralRatio || 1)
  ).toString();

  const onclick = () => {
    if (!value || !borrowAssetMetaData?.decimals || !borrowAssetBalance) return;
    const borrowValue = parseUnit(
      value,
      borrowAssetMetaData?.decimals
    ).toString();

    mutate(
      {
        borrowPoolId: BASE_ASSET_ID.toString(),
        borrowValue,
        supplyPoolId: supplyTokenId,
      },
      {
        onSuccess: ({ blockNumber }) => {
          setValue("");

          notify({
            type: "success",
            title: "Borrow Successful",
            message: "Transaction completed on block " + blockNumber,
          });
        },
      }
    );
  };

  const items: Array<ListItem> = [
    {
      label: "Available to borrow",
      value: "$" + max,
      valueClassName: "!text-[#4E5B72]",
    },
    {
      label: "Borrow Apy",
      value: "6.4 %",
      kylixValue: "%4",
      valueClassName: "!text-[#4E5B72]",
    },
    {
      label: "Borrowed",
      value: "$64",
      valueClassName: "!text-[#4E5B72]",
    },
    {
      label: "Interest",
      value: "$ 24",
      kylixValue: "12",
      tooltipTitle: "Interest tooltip title.",
      action: {
        title: "Claim",
        onClick: () => {},
      },
      valueClassName: "!text-primary-500",
    },
  ];
  return (
    <Form
      assetId={BASE_ASSET_ID}
      items={items}
      decimals={borrowAssetMetaData?.decimals}
      setValue={setValue}
      value={value}
      submitButton={{
        onclick,
        content: "Borrow",
      }}
      isSubmitting={isPending}
      balance={borrowAssetBalance?.toString()}
      symbol={borrowAssetMetaData?.symbol}
      onMaxClick={() => {}}
    />
  );
};

export default Borrow;
