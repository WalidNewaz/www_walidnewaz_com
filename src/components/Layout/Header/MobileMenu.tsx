import React from "react";

/** Components */
import { FaXmark } from "react-icons/fa6";

/** Types */
import { clickHandler } from "../../../types";

export const MobileMenu: React.FC<{
  isOpen: boolean;
  onClick: clickHandler;
}> = ({ isOpen, onClick }) => {
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
            className="flex justify-between border-b border-slate-200 pb-4"
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="logo w-full ">
              <span className="text-3xl font-bold text-slate-200 px-4">
                Walid's Blog
              </span>
            </div>
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
                className="icon !text-slate-300 w-7 h-7"
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
            <div style={{ textAlign: "left" }}>
              <a
                href="/"
                className="margin-6 text-decoration-none header-link-home"
              >
                HOME
              </a>
            </div>

            <div style={{ textAlign: "left" }}>
              <a
                href="/tutorials/"
                className="margin-6 text-decoration-none header-link-home"
              >
                LEARN
              </a>
            </div>
            <div style={{ textAlign: "left" }}>
              <a
                href="/tutorials/"
                className="margin-6 text-decoration-none header-link-home"
              >
                BUILD
              </a>
            </div>
            <div style={{ textAlign: "left" }}>
              <a
                href="/tutorials/"
                className="margin-6 text-decoration-none header-link-home"
              >
                GROW
              </a>
            </div>
            <div style={{ textAlign: "left" }}>
              <a
                href="/blog/"
                className="margin-6 text-decoration-none header-link-home"
              >
                JOURNAL
              </a>
            </div>
            <div style={{ textAlign: "left" }}>
              <a
                href="/about/"
                className="margin-6 text-decoration-none header-link-home"
              >
                ABOUT
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
