/* eslint-disable no-loops/no-loops */
import React from 'react';

/** Components */
import PaginationButton from './PaginationButton';

/**
 * Display the page number buttons
 * @param params
 * @returns
 */
const PageNumberButtons: React.FC<{
  startPage: number;
  endPage: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
  pathname: string;
  itemsPerPage: number;
  query?: any; // Query passed to the search
}> = ({
  startPage,
  endPage,
  currentPage,
  paginate,
  pathname,
  itemsPerPage,
  query,
}) => {
  const pageNumbers = [];

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(
      <PaginationButton
        key={i}
        index={i}
        currentPage={currentPage}
        paginate={paginate}
        pathname={pathname}
        itemsPerPage={itemsPerPage}
        query={query}
      />,
    );
  }

  return pageNumbers;
};

export default PageNumberButtons;
