import { css } from "styled-components";

const StyledAnchor = css`
  a {
    color: var(--text1);
    font-family: var(--fontFamily-sans);
    text-decoration: underline;
    text-underline-offset: 2px;
    transition: color 300ms linear;
  }
`;

export default StyledAnchor;
