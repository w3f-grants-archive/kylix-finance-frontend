"use client";
import { Box } from "@mui/material";
import Breadcrumbs from "./Breadcrumbs";
import Heading from "./Heading";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const pathnames = pathname.split("/").filter((x) => x);
  return (
    <Box className={"w-full h-[50px] mt-12 mb-4 flex justify-between"}>
      <Box className="flex flex-col  gap-3">
        <Breadcrumbs pathnames={pathnames} />
        <Heading heading={pathnames[0] ?? ""} />
      </Box>
      <Box className="flex gap-3 h-full items-center text-center">
        <p className="h-full bg-primary-500 px-2 py-1 text-white items-center text-center flex">
          User balance
        </p>
        <p className="h-full bg-primary-500 px-2 py-1 text-white items-center text-center flex">
          Connect
        </p>
      </Box>
    </Box>
  );
};

export default Header;
