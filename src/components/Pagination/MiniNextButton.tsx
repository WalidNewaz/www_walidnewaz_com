import React from 'react';
import styled from 'styled-components';

const StyledNavLink = styled.a`
  text-decoration: none;
`;
const StyledSpan = styled.span`
  color: #ccc;
  background-color: #f4f4f4 !important;
`;

/**
 * Next button for mini pagination strip
 * @param params
 * @returns
 */
const MiniNextButton: React.FC<{
  totalPages: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}> = ({ totalPages, currentPage, paginate }) =>
  currentPage < totalPages ? (
    <StyledNavLink
      href="#"
      className={`pill`}
      onClick={(e) => {
        e.preventDefault();
        paginate(currentPage + 1);
      }}
    >
      Next
    </StyledNavLink>
  ) : (
    <StyledSpan className={`pill`}>Next</StyledSpan>
  );

export default MiniNextButton;
