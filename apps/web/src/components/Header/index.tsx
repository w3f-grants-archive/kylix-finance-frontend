"use client";
import { Box, IconButton } from "@mui/material";
import Breadcrumbs from "./Breadcrumbs";
import Heading from "./Heading";
import { usePathname } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import { useSidebarStore } from "~/store";
import { ConnectButton } from "@repo/wallet-modal";
import { useActiveAccount } from "@repo/onchain-utils";
import { useDialogState } from "~/hooks";

const Header = () => {
  const { isMobile, setSidebarOpen } = useSidebarStore();

  const userBalanceDialog = useDialogState("userBalance");

  const { activeAccount } = useActiveAccount();

  const pathname = usePathname();
  const pathnames = pathname.split("/").filter((x) => x);
  return (
    <Box className={"w-full h-[50px] mt-12 mb-4 flex justify-between"}>
      <Box className="flex">
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setSidebarOpen(true)}
            className="self-start"
          >
            <MenuIcon />
          </IconButton>
        )}
        <Box className="flex flex-col items-center  gap-3">
          <Breadcrumbs pathnames={pathnames} />
          <Heading heading={pathnames[0] ?? ""} />
        </Box>
      </Box>
      <Box className="flex gap-3 h-full items-center text-center">
        {/* <p className="h-full bg-primary-500 px-2 py-1 text-white items-center text-center flex">
          User balance
        </p> */}

        <ConnectButton
          address={activeAccount?.address}
          onClickWhenConnected={userBalanceDialog.open}
        />
      </Box>
    </Box>
  );
};

export default Header;
