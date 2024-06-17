import React, { useRef, useState, useEffect } from 'react';
import './ContentRibbon.css';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import ContentRibbonProps from './ContentRibbon.interface';

/**
 * A scrollable container that creates scroll buttons if the content in
 * the children nodes happen to overflow the size of the container as
 * displayed.
 *
 * @param children Any number of React nodes
 * @returns A JSX component that wraps the children with a scrollable container.
 */
const ContentRibbon: React.FC<ContentRibbonProps> = ({
  children,
  className = '',
  scrollContainerClassName = '',
}) => {
  const ribbonRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showScrollRight, setShowScrollRight] = useState(false);

  useEffect(() => {
    if (ribbonRef.current) {
      ribbonRef.current.addEventListener('scroll', handleScroll);
      handleScroll();
    }
    return () => {
      if (ribbonRef.current) {
        ribbonRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const handleScroll = () => {
    if (ribbonRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ribbonRef.current;
      setScrollPosition(scrollLeft);
      setShowScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const handleScrollLeft = () => {
    if (ribbonRef.current) {
      ribbonRef.current.scrollLeft -= 200; // Adjust scroll distance as needed
      handleScroll();
    }
  };

  const handleScrollRight = () => {
    if (ribbonRef.current) {
      ribbonRef.current.scrollLeft += 200; // Adjust scroll distance as needed
      handleScroll();
    }
  };

  return (
    <div className={`content-ribbon ${className}`}>
      <div
        className={`ribbon-scroll-container ${scrollContainerClassName}`}
        ref={ribbonRef}
      >
        {children}
      </div>
      {scrollPosition > 0 && (
        <button
          className='scroll-button scroll-left left-1'
          onClick={handleScrollLeft}
          data-testid='scroll-left-button'
          style={{ left: '0.25rem' }}
        >
          <BsChevronLeft
            className='w-6 h-6'
            style={{ marginInline: '0.35rem', marginTop: '0.25rem' }}
          />
        </button>
      )}
      {showScrollRight && (
        <button
          className='scroll-button scroll-right right-1'
          onClick={handleScrollRight}
          data-testid='scroll-right-button'
          style={{ right: '0.25rem' }}
        >
          <BsChevronRight
            className='w-6 h-6'
            style={{ marginInline: '0.35rem', marginTop: '0.25rem' }}
          />
        </button>
      )}
    </div>
  );
};

export default ContentRibbon;
