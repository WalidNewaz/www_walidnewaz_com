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
    margin-top: var(--spacing-4);
    margin-bottom: var(--spacing-4);
  }

  h1 {
    font-size: var(--fontSize-5);

    code {
      font-size: var(--fontSize-4);
    }
  }

  h2 {
    font-size: var(--fontSize-4);

    code {
      font-size: var(--fontSize-3);
    }
  }

  h3 {
    font-size: var(--fontSize-3);

    code {
      font-size: var(--fontSize-2);
    }
  }

  h4 {
    font-size: var(--fontSize-2);

    code {
      font-size: var(--fontSize-1);
    }
  }

  h5 {
    font-size: var(--fontSize-1);
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

  .table-container {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .table-container table {
    width: 100%;
    border-collapse: collapse;
    /* Optional: force scroll if the table is wider than the viewport */
    min-width: 600px;
  }

  .table-container th,
  .table-container td {
    padding: 8px;
    border: 1px solid #ddd;
  }
`;

export default StyledSection;
