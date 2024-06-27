import React from 'react';

/** Components */
import FullPaginationStrip from './FullPaginationStrip';
import MiniPaginationStrip from './MiniPaginationStrip';

const PAGINATION_STRIP_CLASSES = `
  pagination-strip
  flex items-center
  justify-between
  border-t border-gray-200
  px-4 py-3 sm:px-6`;

/**
 * The pagination strip that contains both the mini and full pagination strips
 * @param params
 * @returns
 */
const PaginationStrip: React.FC<{
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
}) =>
  totalPages > 1 && (
    <div className={PAGINATION_STRIP_CLASSES}>
      <MiniPaginationStrip
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        itemsCount={itemsCount}
        paginate={paginate}
        pathname={pathname}
        query={query}
      />
      <FullPaginationStrip
        maxPages={maxPages}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        itemsCount={itemsCount}
        paginate={paginate}
        pathname={pathname}
        query={query}
      />
    </div>
  );

export default PaginationStrip;
