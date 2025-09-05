import React from "react";

/** Constants */
import menuItems from "./menu_items.json";
const DESKTOP_MENU_CLASSES = `
  desktop-menu
  margin-block-2
  list-none
  flex
  width-full
  justify-end`;

export const DesktopMenu: React.FC = () => (
  <ul className={DESKTOP_MENU_CLASSES}>
    {menuItems
      .filter((item) => item.lable !== "Home")
      .map((item) => (
        <li key={item.lable} className="padding-inline-5">
          <a href={item.link} className="text-decoration-none">
            {item.lable}
          </a>
        </li>
      ))}
  </ul>
);
