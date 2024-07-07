"use client";

import { Box, Drawer, Link } from "@mui/material";
import { sidebar, socialMediaLinks } from "~/assets/data";
import Image from "next/image";
import { SidebarMenu } from "./Item";

const Sidebar = () => {
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      className="w-[290px] h-screen"
      open
      PaperProps={{
        component: "div",
        className: "w-[inherit] bg-[inherit] !bg-[inherit] !border-none",
      }}
    >
      <div className="flex flex-col items-center justify-between h-[inherit] pb-6 w-full">
        <div className="flex flex-col w-full">
          <div className="w-full h-full bg-primary-500 flex flex-col justify-center items-center py-10 px-16">
            <Image
              src="kylix-logo.svg"
              alt="kylix-logo"
              width={155}
              height={117}
              draggable="false"
            />
          </div>
          <div className="flex flex-col">
            {sidebar.map((section) => {
              return (
                <div key={section.heading} className="text-black flex flex-col">
                  <p>{section.heading}</p>
                  <SidebarMenu items={section.items} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center">
            {socialMediaLinks.map(({ icon: Icon, link }) => (
              <Link key={link} href={link}>
                <Icon className="text-primary-500 w-10 h-10" />
              </Link>
            ))}
          </div>
          <p className="text-primary-300 font-medium text-xs leading-5 tracking-[-2%] select-none">
            <span>&#169;</span>
            <span>KYLIX Version 1.0</span>
          </p>
        </div>
      </div>
    </Drawer>
  );
};
export default Sidebar;
