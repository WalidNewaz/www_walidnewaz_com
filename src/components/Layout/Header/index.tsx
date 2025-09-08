import React, { useState } from "react";

/** Components */
import { HomeIcon } from "@heroicons/react/24/solid";
import { HamburgerMenu } from "./HamburgerMenu";
import { DesktopMenu } from "./DesktopMenu";
import { MobileMenu } from "./MobileMenu";

/** Constants */
const HEADER_CLASSES = `
  global-header
  bg-surface-1
  width-full
  z-3
  position-fixed`;

const Header: React.FC = () => {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuIsOpen(!mobileMenuIsOpen);
  };

  return (
    <header className={HEADER_CLASSES}>
      <nav className="flex justify-between margin-inline-auto">
        <div className="logo w-full ">
          <a href="/" className="flex gap-2">
            <HomeIcon className="icon w-[1.85rem] h-[1.85rem] mt-auto mb-auto" />
            Walid's Blog
          </a>
        </div>
        <DesktopMenu />
        <HamburgerMenu
          isOpen={mobileMenuIsOpen}
          onClick={handleMobileMenuToggle}
        />
        <MobileMenu
          isOpen={mobileMenuIsOpen}
          onClick={handleMobileMenuToggle}
        />
      </nav>
    </header>
  );
};

export default Header;
