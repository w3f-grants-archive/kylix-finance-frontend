"use client";
import {
  Collapse,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { SidebarItem } from "~/types";

interface ItemProps {
  data: SidebarItem;
  collapsable?: boolean;
}

export const Item = ({ data, collapsable }: ItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const clickHandler = () => {
    if (collapsable) {
      setIsOpen((o) => !o);
    }
  };

  return (
    <>
      <ListItemButton onClick={clickHandler} className="hover:bg-gray-100">
        <ListItemIcon>{data.icon && <data.icon />}</ListItemIcon>
        <ListItemText primary={data.name} />
        {collapsable ? isOpen ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItemButton>
      {collapsable && (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {data.items?.map((subItem) => (
              <Link
                href={subItem.href || ""}
                key={subItem.name}
                className="pl-12"
              >
                <ListItemButton className="hover:bg-gray-100">
                  <ListItemText primary={subItem.name} />
                </ListItemButton>
              </Link>
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

interface SidebarMenuProps {
  items: SidebarItem[];
}

export const SidebarMenu = ({ items }: SidebarMenuProps) => {
  return (
    <List>
      {items.map((item) => (
        <div key={item.name} className="flex flex-col">
          <Item data={item} collapsable={!!item.items?.length} />
        </div>
      ))}
    </List>
  );
};
