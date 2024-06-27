import React from 'react';
import styled from 'styled-components';

const StyledInfo = styled.div`
  color: var(--color-primary);

  p {
    color: var(--color-primary);
  }
`;

/**
 * The summary info for the items being displayed
 * @param params
 * @returns
 */
const PaginationItemsInfo: React.FC<{
  currentPage: number;
  itemsPerPage: number;
  itemsCount: number;
}> = ({ currentPage, itemsPerPage, itemsCount }) => {
  return (
    <StyledInfo className="pagination-items-info">
      <p className="text-sm text-gray-700">
        Showing{' '}
        <span className="font-medium">
          {(currentPage - 1) * itemsPerPage + 1}
        </span>{' '}
        to{' '}
        <span className="font-medium">
          {Math.min(
            (currentPage - 1) * itemsPerPage + itemsPerPage,
            itemsCount,
          )}
        </span>{' '}
        of <span className="font-medium">{itemsCount}</span> results
      </p>
    </StyledInfo>
  );
};

export default PaginationItemsInfo;
