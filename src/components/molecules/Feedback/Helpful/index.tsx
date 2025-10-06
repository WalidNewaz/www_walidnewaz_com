import React from "react";
import styled from "styled-components";
import { ThumbUp, ThumbDown } from "@mui/icons-material";

const StyledHelpful = styled.div`
  padding: 1rem 1.75rem;
  border-top: 1px solid #ccc;
  margin-top: 2rem;
  font-family: var(--fontFamily-sans);

  .buttons {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }

  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .yes {
    background-color: #4caf50; /* Green */
    color: white;
  }

  .yes:hover {
    background-color: #45a049;
  }

  .no {
    background-color: #f44336; /* Red */
    color: white;
  }

  .no:hover {
    background-color: #da190b;
  }
`;

export type HelpfulProps = {
  helpfulText?: string;
  onYes: () => void;
  onNo: () => void;
  feedbackGiven?: boolean;
};

const Helpful: React.FunctionComponent<HelpfulProps> = ({
  helpfulText,
  onYes,
  onNo,
  feedbackGiven = false,
}) => {
  return !feedbackGiven ? (
    <StyledHelpful>
      <p>{helpfulText || "Was this chapter helpful?"}</p>
      <div className="buttons">
        <button
          className="yes"
          onClick={onYes}
          style={{ display: "flex", alignItems: "center" }}
        >
          <ThumbUp style={{ marginRight: "0.5rem" }} />
          Yes
        </button>
        <button
          className="no"
          onClick={onNo}
          style={{ display: "flex", alignItems: "center" }}
        >
          <ThumbDown style={{ marginRight: "0.5rem" }} />
          <div>No</div>
        </button>
      </div>
    </StyledHelpful>
  ) : null;
};

export default Helpful;
