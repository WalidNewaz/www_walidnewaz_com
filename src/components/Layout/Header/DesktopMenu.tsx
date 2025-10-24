import React from "react";
import { useLocation } from "@reach/router"; // works with Gatsby router

/** Constants */
import menuItems from "./menu_items.json";
const DESKTOP_MENU_CLASSES = `
  desktop-menu
  margin-block-2
  list-none
  flex
  width-full
  justify-end`;

export const DesktopMenu: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (link: string) => {
    if (link === "/") return currentPath === "/";
    return currentPath.startsWith(link);
  };

  return (
    <ul className={DESKTOP_MENU_CLASSES}>
      {menuItems
        .filter((item) => item.label !== "Home")
        .map((item) => (
          <li key={item.label}>
            <a
              href={item.link}
              className={`text-decoration-none ${
                isActive(item.link)
                  ? "text-primary font-bold border-b-2 border-primary"
                  : "text-muted hover:text-primary transition-colors"
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
    </ul>
  );
};
