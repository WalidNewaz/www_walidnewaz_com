import { css } from "styled-components";

const StyledList = css`
  li {
    color: var(--text1);
    font-family: var(--fontFamily-sans);
  }

  li::before {
    content: "";
    display: inline-block;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 8px solid var(--text1); /* Color of your triangle */
    border-radius: 3px; /* Adjust for desired rounding */
    margin-right: 0.5em;
    margin-top: -0.25em; /* Adjust to align with text */
    vertical-align: middle; /* Align with text */
  }
`;

export default StyledList;
