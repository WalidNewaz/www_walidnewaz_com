import React from "react";
import qs from "qs";
import styled from "styled-components";

import { BsChevronLeft } from "react-icons/bs";

const StyledNavLink = styled.a`
  display: inline-flex;
  position: relative;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  align-items: center;
  border-top-left-radius: 0.375rem;
  border-bottom-left-radius: 0.375rem;
  box-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width))
    var(--tw-ring-color);
  --tw-ring-inset: inset;
  --ring-color: #d1d5db;
  color: #9ca3af;

  &:hover {
    background-color: #f9fafb;
  }
`;
const StyledSpan = styled.span`
  display: inline-flex;
  position: relative;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  align-items: center;
  border-top-left-radius: 0.375rem;
  border-bottom-left-radius: 0.375rem;
  box-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width))
    var(--tw-ring-color);
  --tw-ring-inset: inset;
  --ring-color: #d1d5db;
  color: #e5e7eb;
`;
const StyledScreenReaderText = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;
const StyledIconDisabled = styled(BsChevronLeft)`
  height: 1.25rem;
  width: 1.25rem;
  color: #9ca3af;
`;
const StyledIconActive = styled(BsChevronLeft)`
  height: 1.25rem;
  width: 1.25rem;
`;


/**
 * Previous button for pull pagination strip
 * @param params
 * @returns
 */
const FullPrevButton: React.FC<{
  startPage: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
  pathname: string;
  itemsPerPage: number;
  query?: any; // Query passed to the search
}> = ({ startPage, currentPage, paginate, pathname, itemsPerPage, query }) => {
  const { offset, ...rest } = query;
  return startPage > 1 ? (
    <StyledNavLink
      key="backward"
      href="#"
      onClick={(e) => {
        e.preventDefault();
        paginate(currentPage - 1);
      }}
    >
      <StyledScreenReaderText>
        Previous
      </StyledScreenReaderText>
      <StyledIconActive aria-hidden />
    </StyledNavLink>
  ) : (
    <StyledSpan>
      <StyledScreenReaderText>
        Previous
      </StyledScreenReaderText>
      <StyledIconDisabled aria-hidden />
    </StyledSpan>
  );
};

export default FullPrevButton;
