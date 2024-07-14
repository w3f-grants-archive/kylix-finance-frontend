import { Sidebar, SocialMedia } from "~/types";
import { Icons, sidebarIcons } from "../svgs";

const socialMediaLinks: Array<SocialMedia> = [
  {
    name: "X",
    link: "https://x.com/",
    icon: Icons.Twitter,
  },
  {
    name: "Linkedin",
    link: "linkedin.com",
    icon: Icons.Linkedin,
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/",
    icon: Icons.Instagram,
  },
  {
    name: "Discord",
    link: "https://discord.com/",
    icon: Icons.Discord,
  },
];
const sidebar: Array<Sidebar> = [
  {
    heading: "MAIN",
    items: [
      {
        name: "Dashboard",
        href: "/dashboard",
        icon: sidebarIcons.Dashboard,
      },
      {
        name: "Portfolio",
        icon: sidebarIcons.Wallet,
        items: [
          {
            name: "Account",
            href: "/portfolio/account",
          },
          {
            name: "PnL",
            href: "/portfolio/pnl",
          },
        ],
      },
      {
        name: "Market",
        href: "/market",
        icon: sidebarIcons.Market,
      },
      {
        name: "Swap",
        icon: sidebarIcons.Swap,
        items: [],
      },
      {
        name: "Cross Swap",
        href: "/cross-swap",
        icon: sidebarIcons.CrossSwap,
      },
      {
        name: "Pools",
        href: "/pools",
        icon: sidebarIcons.Pool,
      },
      {
        name: "Liquidations",
        href: "/liquidations",
        icon: sidebarIcons.Liquidations,
      },
      {
        name: "Staking",
        href: "/staking",
        icon: sidebarIcons.Staking,
      },
      {
        name: "Governance",
        href: "/governance",
        icon: sidebarIcons.Governance,
      },
    ],
  },
  {
    heading: "SETTINGS",
    items: [
      {
        name: "Notification",
        href: "/settings/notification",
        icon: sidebarIcons.Notification,
      },
      {
        name: "Settings",
        icon: sidebarIcons.Settings,
        items: [],
      },
    ],
  },
];

export { socialMediaLinks, sidebar };
