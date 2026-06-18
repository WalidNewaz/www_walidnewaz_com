import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { FiArrowUp } from "react-icons/fi";

// --- Animations ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;
const fadeOut = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(10px); }
`;

// --- Styled Components ---
const Button = styled.button<{ $visible: boolean }>`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;

  width: 3rem;
  height: 3rem;
  border: none;
  border-radius: 50%;
  background: var(--accent, #0070f3);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  animation: ${({ $visible }) => ($visible ? fadeIn : fadeOut)} 0.3s ease forwards;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: var(--accent-hover, #0059c1);
    transform: translateY(-3px);
  }

  @media (max-width: 768px) {
    bottom: 1.25rem;
    right: 1.25rem;
    width: 2.75rem;
    height: 2.75rem;
  }

  @media (prefers-color-scheme: dark) {
    background: var(--accent, #3ea6ff);
    color: #111;
  }
`;

// --- Component ---
export const BackToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const halfPage = window.innerHeight / 2;
      setVisible(scrollTop > halfPage);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Display the scroll-to-top button by default if the page is already scrolled
  useEffect(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const halfPage = window.innerHeight / 2;
    setVisible(scrollTop > halfPage);
  }, []);

  return (
    <Button
      onClick={scrollToTop}
      aria-label="Back to top"
      $visible={visible}
      title="Back to top"
    >
      <FiArrowUp size={20} />
    </Button>
  );
};
