import React from "react";

/** Components */
import { FaBars } from "react-icons/fa6";

/** Types */
import { clickHandler } from "../../../types";

/** Constants */
const HAMBURGER_MENU_CLASSES = `
  ham-menu
  flex visible md:hidden`;

interface HamburgerMenuProps {
  isOpen: boolean;
  onClick: clickHandler;
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, onClick }) => (
  <div id="ham-menu" className={HAMBURGER_MENU_CLASSES}>
    <button onClick={onClick} aria-label="Toggle menu">
      <span className="hamburger-label">Open main menu</span>
      <FaBars
        style={{ color: "var(--text1)" }}
        aria-label="Toggle icon"
      />
    </button>
  </div>
);
