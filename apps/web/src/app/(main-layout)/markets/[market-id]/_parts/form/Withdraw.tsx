"use client";
import { ListItem, notify, TokenIcon } from "~/components";
import { Form } from "./Form";
import { useState } from "react";
import { useParams } from "next/navigation";
import {
  formatUnit,
  parseUnit,
  useBalance,
  useMetadata,
} from "@repo/onchain-utils";
import { useWithdraw } from "~/hooks/chain/useWithdraw";
import { usePool } from "~/hooks/chain/usePool";
import { Box, Typography } from "@mui/material";
import ValueItemWrapper from "./ValueItemWrapper";

export const Withdraw = () => {
  const params = useParams();
  const lendTokenId = params["market-id"] as string;
  const [value, setValue] = useState("");
  const { assetMetaData } = useMetadata(lendTokenId);
  const { mutate, isPending } = useWithdraw();
  const { pool } = usePool({
    assetId: lendTokenId,
  });
  const { formattedBalance, isLoading: isBalanceLoading } = useBalance({
    assetId: pool?.id,
    customDecimals: assetMetaData?.decimals,
    enabled: !!assetMetaData && !!pool,
  });
  const supplyRate = formatUnit(pool?.supplyRate || 0, 4);

  const handleClick = () => {
    mutate(
      {
        asset: lendTokenId,
        balance: parseUnit(value, Number(assetMetaData?.decimals) || 18),
      },
      {
        onSuccess: ({ blockNumber }) => {
          setValue("");
          notify({
            type: "success",
            title: "Success",
            message: "Transaction completed on block " + blockNumber,
          });
        },
      }
    );
  };

  const onMaxClick = () => formattedBalance && setValue(formattedBalance);
  const items: Array<ListItem> = [
    {
      label: "Available to withdraw",
      value: (
        <ValueItemWrapper
          value={Number(formattedBalance || 0).toLocaleString()}
          iconName={assetMetaData?.symbol}
          iconHeight={20}
          iconWidth={20}
        />
      ),
      valueClassName: "!text-[#4E5B72]",
    },
    {
      label: "Supply APY",
      value: "%" + supplyRate,
      kylixValue: "%0",
      valueClassName: "!text-[#4E5B72]",
    },
    {
      label: "Supplied",
      value: (
        <ValueItemWrapper
          value={Number(formattedBalance || 0).toLocaleString()}
          iconName={assetMetaData?.symbol}
          iconHeight={20}
          iconWidth={20}
        />
      ),
      valueClassName: "!text-[#4E5B72]",
    },
    {
      label: "Interest",
      value: "$0",
      kylixValue: "0",
      tooltipTitle: "Interest tooltip title.",
      action: {
        title: "Claim",
        onClick: () => {},
        disabled: true,
      },
      valueClassName: "!text-primary-500",
    },
  ];
  return (
    <Form
      assetId={lendTokenId}
      items={items}
      decimals={Number(assetMetaData?.decimals) || 18}
      setValue={setValue}
      value={value}
      submitButton={{
        onclick: handleClick,
        content: "Withdraw",
      }}
      isSubmitting={isPending}
      isMaxLoading={isBalanceLoading}
      onMaxClick={onMaxClick}
      balance={formattedBalance}
      symbol={assetMetaData?.symbol}
    />
  );
};

export default Withdraw;
