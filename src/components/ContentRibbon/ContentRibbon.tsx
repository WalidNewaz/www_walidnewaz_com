import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import * as styles from "./ContentRibbon.module.css";
import ContentRibbonProps from "./ContentRibbon.interface";

const SCROLL_DISTANCE = 200;

const ContentRibbon: React.FC<ContentRibbonProps> = ({
  children,
  className = "",
  scrollContainerClassName = "",
}) => {
  const ribbonRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const element = ribbonRef.current;

    if (!element) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = element;
    const remainingDistance = scrollWidth - clientWidth - scrollLeft;

    setCanScrollLeft(scrollLeft > 1);
    setCanScrollRight(remainingDistance > 1);
  }, []);

  useEffect(() => {
    updateScrollState();

    const element = ribbonRef.current;

    if (!element || typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver(updateScrollState);
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [children, updateScrollState]);

  const scrollBy = (distance: number) => {
    ribbonRef.current?.scrollBy({
      left: distance,
      behavior: "smooth",
    });
  };

  return (
    <div className={`${styles.contentRibbon} ${className}`.trim()}>
      <div
        ref={ribbonRef}
        className={
          `${styles.ribbonScrollContainer} ${scrollContainerClassName}`.trim()
        }
        onScroll={updateScrollState}
      >
        {children}
      </div>

      {canScrollLeft && (
        <button
          type="button"
          className={`${styles.scrollButton} ${styles.scrollLeft}`}
          onClick={() => scrollBy(-SCROLL_DISTANCE)}
          data-testid="scroll-left-button"
          aria-label="Scroll left"
        >
          <BsChevronLeft aria-hidden="true" />
        </button>
      )}

      {canScrollRight && (
        <button
          type="button"
          className={`${styles.scrollButton} ${styles.scrollRight}`}
          onClick={() => scrollBy(SCROLL_DISTANCE)}
          data-testid="scroll-right-button"
          aria-label="Scroll right"
        >
          <BsChevronRight aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default ContentRibbon;