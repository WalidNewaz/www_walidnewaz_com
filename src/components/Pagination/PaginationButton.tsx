import React from "react";
import styled from "styled-components";

const StyledCurrentItem = styled.span`
  display: inline-flex;
  position: relative;
  z-index: 10;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  align-items: center;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
  font-family: merriweather;
  color: #ffffff;
  background-color: var(--text2);
`;
const StyledButton = styled.a`
  display: inline-flex;
  position: relative;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  align-items: center;
  box-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width))
    var(--tw-ring-color);
  --tw-ring-inset: inset;
  --ring-color: #d1d5db;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
  font-family: merriweather;
  color: var(--text2);
  text-decoration: none;

  :hover {
    background-color: #f9fafb;
  }
`;

const getPageLink = (pathname: string, query: any, index: number) => {
  const { offset, limit } = query;
  const pageIndex = index < 2 ? '' : index;
  return pathname.endsWith("/")
    ? `${pathname}${pageIndex}`
    : `${pathname}/${pageIndex}`;
};

/**
 * A single pagination button
 * @param params
 * @returns
 */
const PaginationButton: React.FC<{
  index: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
  pathname: string;
  itemsPerPage: number;
  query?: any; // Query passed to the search
}> = ({ index, currentPage, pathname, query }) => {
  return currentPage === index ? (
    <StyledCurrentItem key={index}>{index}</StyledCurrentItem>
  ) : (
    <StyledButton
      key={index}
      href={getPageLink(pathname, query, index).replace(/\/\//g, "/")}
    >
      {index}
    </StyledButton>
  );
};

export default PaginationButton;
