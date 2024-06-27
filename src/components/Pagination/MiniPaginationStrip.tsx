import React from "react";
import styled from "styled-components";

import PaginationItemsInfo from "./PaginationItemsInfo";
import MiniPrevButton from "./MiniPrevButton";
import MiniNextButton from "./MiniNextButton";

const StyledMiniPagination = styled.div`
  display: none;

  @media screen and (max-width: 480px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`;
const StyledMiniPaginationStrip = styled.div`
  display: flex;
  flex: 1 1 0%;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

/**
 * Mini pagination strip displayed on mobile
 * @returns
 */
const MiniPaginationStrip: React.FC<{
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  itemsCount: number;
  paginate: (pageNumber: number) => void;
  pathname: string;
  query?: any;
}> = ({
  currentPage,
  totalPages,
  itemsPerPage,
  itemsCount,
  paginate,
  pathname,
  query,
}) => {
  return (
    <>
      <StyledMiniPagination className="mini-pagination">
        <div className="mini-pagination-info my-4 mx-auto">
          <PaginationItemsInfo
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            itemsCount={itemsCount}
          />
        </div>
        <StyledMiniPaginationStrip className="mini-pagination-strip">
          <MiniPrevButton currentPage={currentPage} paginate={paginate} pathname={pathname} query={query} />
          <MiniNextButton
            totalPages={totalPages}
            currentPage={currentPage}
            paginate={paginate}
          />
        </StyledMiniPaginationStrip>
      </StyledMiniPagination>
    </>
  );
};

export default MiniPaginationStrip;
