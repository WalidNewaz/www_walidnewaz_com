import { css } from "styled-components";

const StyledSection = css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--heading2);
    font-family: var(--fontFamily-sans);
    font-weight: var(--fontWeight-bold);
    transition: color 300ms linear;
    line-height: var(--lineHeight-normal);
    margin-top: var(--spacing-6);
    margin-bottom: var(--spacing-4);
  }

  h1 {
    font-size: var(--fontSize-5);
  }

  h2 {
    font-size: var(--fontSize-4);
  }

  h3 {
    font-size: var(--fontSize-2);
  }

  pre[class*="grvsc-container"] {
    margin-bottom: var(--spacing-6);
  }

  p {
    margin-bottom: var(--spacing-6);
  }

  img {
    border-radius: 0.25rem;
  }
`;

export default StyledSection;
