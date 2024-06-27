import React from 'react';
import styled from 'styled-components';

/** Components */
import FullPrevButton from './FullPrevButton';
import FullNextButton from './FullNextButton';
import PageNumberButtons from './PageNumberButtons';
import PaginationItemsInfo from './PaginationItemsInfo';

const StyledFullPaginationStrip = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 1rem;

  @media screen and (max-width: 480px) {
    display: none;
  }

  nav {
    display: inline-flex;
    flex-wrap: wrap;
    isolation: isolate;
    margin-left: -1px;
    border-radius: 0.375rem;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    background-color: var(--surface2);
  }
`;

/**
 * Full pagination strip
 * @param params
 * @returns
 */
const FullPaginationStrip: React.FC<{
  maxPages: number;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  itemsCount: number;
  paginate: (pageNumber: number) => void;
  pathname: string;
  query?: any; // Query passed to the search
}> = ({
  maxPages,
  currentPage,
  totalPages,
  itemsPerPage,
  itemsCount,
  paginate,
  pathname,
  query,
}) => {
  const startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
  const endPage = Math.min(totalPages, startPage + maxPages - 1);

  return (
    <StyledFullPaginationStrip className="full-pagination-strip">
      <PaginationItemsInfo
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        itemsCount={itemsCount}
      />
      <nav
        className="full-pagination-buttons"
        aria-label="Pagination"
      >
        <FullPrevButton
          startPage={startPage}
          currentPage={currentPage}
          paginate={paginate}
          pathname={pathname}
          itemsPerPage={itemsPerPage}
          query={query}
        />
        <PageNumberButtons
          startPage={startPage}
          endPage={endPage}
          currentPage={currentPage}
          paginate={paginate}
          pathname={pathname}
          itemsPerPage={itemsPerPage}
          query={query}
        />
        <FullNextButton
          endPage={endPage}
          totalPages={totalPages}
          currentPage={currentPage}
          paginate={paginate}
          pathname={pathname}
          itemsPerPage={itemsPerPage}
          query={query}
        />
      </nav>
    </StyledFullPaginationStrip>
  );
};

export default FullPaginationStrip;
