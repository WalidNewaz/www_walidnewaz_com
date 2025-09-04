import React from "react";

/** Constants */
const DESKTOP_MENU_CLASSES = `
  desktop-menu
  margin-block-2
  list-none
  flex
  width-full
  justify-end`;

export const DesktopMenu: React.FC = () => (
  <ul className={DESKTOP_MENU_CLASSES}>
    <li className="padding-inline-5">
      <a href="/tutorials/" className="margin-5 text-decoration-none">
        Learn
      </a>
    </li>
    <li className="padding-inline-5">
      <a href="/tutorials/" className="margin-5 text-decoration-none">
        Build
      </a>
    </li>
    <li className="padding-inline-5">
      <a href="/tutorials/" className="margin-5 text-decoration-none">
        Grow
      </a>
    </li>
    <li>
      <a href="/blog/" className="margin-5 text-decoration-none">
        Journal
      </a>
    </li>
    {/* <li>
      <a href="/tutorials/" className="margin-5 text-decoration-none">
        Tutorials
      </a>
    </li> */}
    <li>
      <a href="/about/" className="margin-5 text-decoration-none">
        About
      </a>
    </li>
  </ul>
);