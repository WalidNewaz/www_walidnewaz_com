import React from 'react';

/** Components */
import PaginationStrip from './PaginationStrip';
import PaginatedItemsPane from './PaginatedItemsPane';

// Define the props for the Pagination component
interface PaginationProps {
  items: React.ReactNode;
  itemsClassName?: string;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalItemsCount: number;
  itemsPerPage: number;
  maxPages: number;
  fetchNextPage: (pageNumber: number) => void;
  pathname: string;
  query?: any; // Query passed to the search
  className?: string;
}

/**
 * Pagination component.
 * Each page is fetched and rendered on demand.
 * `fetchNextPage` is called when the user clicks on a page number.
 * Use this to fetch the next page of items from the server.
 *
 * This component does not restrict how the items on the page are rendered.
 * @param params
 * @returns
 */
const Pagination: React.FC<PaginationProps> = ({
  items,
  itemsClassName,
  currentPage,
  setCurrentPage,
  totalItemsCount,
  itemsPerPage,
  maxPages,
  fetchNextPage,
  pathname,
  query,
  className = '',
}) => {
  const totalPages = Math.ceil(totalItemsCount / itemsPerPage);

  // Change page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    fetchNextPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Add smooth behavior for smooth scrolling
    });
  };

  return (
    <div className={`pagination-container mx-auto my-4 ${className}`}>
      <PaginatedItemsPane items={items} className={itemsClassName} />
      <PaginationStrip
        maxPages={maxPages}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        itemsCount={totalItemsCount}
        paginate={paginate}
        pathname={pathname}
        query={query}
      />
    </div>
  );
};

export default Pagination;
