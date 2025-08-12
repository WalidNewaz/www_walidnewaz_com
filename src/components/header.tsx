import React, { useState } from "react";

/** Components */
import { FaBars, FaXmark } from "react-icons/fa6";
import { HomeIcon } from "@heroicons/react/24/solid";

/** Constants */
const HEADER_CLASSES = `
  global-header
  bg-surface-1
  width-full
  z-3
  position-fixed`;
const HAMBURGER_MENU_CLASSES = `
  ham-menu
  flex visible md:hidden`;
const DESKTOP_MENU_CLASSES = `
  desktop-menu
  margin-block-2
  list-none
  flex
  width-full
  justify-end`;

type clickHandler =
  | ((
      event: React.MouseEvent<
        HTMLAnchorElement | HTMLButtonElement | HTMLDivElement
      >
    ) => void)
  | (() => Promise<void>)
  | (() => void)
  | undefined;

interface HamburgerMenuProps {
  isOpen: boolean;
  onClick: clickHandler;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, onClick }) => (
  <div id="ham-menu" className={HAMBURGER_MENU_CLASSES}>
    <button onClick={onClick} aria-label="Toggle menu">
      <span className="hamburger-label">Open main menu</span>
      <FaBars
        // className={`icon ${isOpen ? "text-indigo-600" : "text-slate-100"}`}
        style={{ color: "var(--text1)" }}
        aria-label="Toggle icon"
      />
    </button>
  </div>
);

const DesktopMenu: React.FC = () => (
  <ul className={DESKTOP_MENU_CLASSES}>
    {/* <li className="padding-inline-5">
      <a href="/" className="margin-5 text-decoration-none">
        Home
      </a>
    </li> */}
    <li>
      <a href="/about/" className="margin-5 text-decoration-none">
        About
      </a>
    </li>
    <li>
      <a href="/blog/" className="margin-5 text-decoration-none">
        Blog
      </a>
    </li>
    <li>
      <a href="/tutorials/" className="margin-5 text-decoration-none">
        Tutorials
      </a>
    </li>
  </ul>
);

const MobileMenu: React.FC<{ isOpen: boolean; onClick: clickHandler }> = ({
  isOpen,
  onClick,
}) => {
  return (
    isOpen && (
      <div className="mobile-menu-container" data-testid="mobile-menu">
        <div
          style={{
            height: "100%",
          }}
        >
          <div
            id="logo-close"
            className="mb-8 flex justify-between"
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div></div>
            <button
              className="top-2 right-2 text-slate-200"
              onClick={onClick}
              data-testid="mobile-toggle-menu"
              style={{
                paddingTop: "0.5rem",
              }}
            >
              <span className="hamburger-label">Close main menu</span>
              <FaXmark
                className="icon !text-slate-300"
                style={{ margin: "0.125rem" }}
              />
            </button>
          </div>

          <div
            style={{
              height: "100%",
              paddingTop: "4rem",
              display: "flex",
              flexDirection: "column",
              gap: "4.5rem",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <a
                href="/"
                className="margin-6 text-decoration-none header-link-home"
              >
                Home
              </a>
            </div>
            <div style={{ textAlign: "center" }}>
              <a
                href="/about/"
                className="margin-6 text-decoration-none header-link-home"
              >
                About
              </a>
            </div>
            <div style={{ textAlign: "center" }}>
              <a
                href="/blog/"
                className="margin-6 text-decoration-none header-link-home"
              >
                Blog
              </a>
            </div>
            <div style={{ textAlign: "center" }}>
              <a
                href="/tutorials/"
                className="margin-6 text-decoration-none header-link-home"
              >
                Tutorials
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

const Header: React.FC = () => {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuIsOpen(!mobileMenuIsOpen);
  };

  return (
    <header className={HEADER_CLASSES}>
      <nav className="flex justify-between margin-inline-auto">
        
        {/* Mobile Menu */}
        <div className="logo w-full ">
          <a href="/" className="flex gap-2">
            {/* WalidNewaz.com */}
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
