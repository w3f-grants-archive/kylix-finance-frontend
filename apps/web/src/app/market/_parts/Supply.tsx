"use client";

import { Typography } from "@mui/material";
import { useGetLendingPools } from "@repo/onchain-utils";
import { Icons } from "~/assets/svgs";
import { Card } from "~/components";
import Skeleton from "~/components/Skeleton";

const Supply = () => {
  const { totalSupply, isLoading } = useGetLendingPools();

  return (
    <Card
      title="Total Supply"
      icon={Icons.WalletFill}
      rightComponent={
        <Typography variant="h5" className="text-primary-800">
          <Skeleton minWidth={80} isLoading={isLoading}>
            {totalSupply !== undefined
              ? `$ ${totalSupply.toLocaleString()}`
              : "Unavailable"}
          </Skeleton>
        </Typography>
      }
    >
      {/* <Typography
        variant="body3"
        className="flex items-center text-primary-800/50"
      >
        <span>Suppliers: </span>
        <span>1,200</span>
      </Typography> */}
    </Card>
  );
};

export default Supply;
