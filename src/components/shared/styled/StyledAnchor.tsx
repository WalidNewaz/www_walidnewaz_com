import { css } from "styled-components";

const StyledAnchor = css`
  a {
    color: var(--text1);
    font-family: var(--fontFamily-sans);
    text-decoration: underline;
    text-underline-offset: 2px;
    transition: color 300ms linear;
  }
  a:hover {
    color: var(--brand-primary);
    text-decoration: none;
    transition: color 200ms linear,
      text-decoration 200ms linear;
    transition-delay: 100ms;
  }
`;

export default StyledAnchor;
