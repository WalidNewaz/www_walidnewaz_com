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
 * Previous button for mini pagination strip
 * @param params
 * @returns
 */
const MiniPrevButton: React.FC<{
  currentPage: number;
  paginate: (pageNumber: number) => void;
  pathname: string;
  query?: any; // Query passed to the search
}> = ({ currentPage, paginate, pathname, query }) =>
  currentPage > 1 ? (
    <StyledNavLink
      href="#"
      className={`pill`}
      onClick={(e) => {
        e.preventDefault();
        paginate(currentPage - 1);
      }}
    >
      Previous
    </StyledNavLink>
  ) : (
    <StyledSpan className={`pill`}>Previous</StyledSpan>
  );

export default MiniPrevButton;
