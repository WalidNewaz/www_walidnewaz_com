import React, { useState, useRef } from "react";
import styled from "styled-components";

// Components
import Checkbox from "@mui/joy/Checkbox";
import Done from "@mui/icons-material/Done";
import NotInterested from "@mui/icons-material/NotInterested";

// Styles
const StyledAnswer = styled.div`
  border-bottom: 1px solid #dadce0;

  a:not([clicked]):hover {
    cursor: pointer;
  }

  .multiple-choice-option {
    padding: 16px 24px;
    display: flex;
    justify-content: space-between;
  }

  code {
    padding-top: 0.25rem;
    font: 500 90% / 1em;
    font-family: Roboto Mono, monospace;
    color: #37474f;
  }

  .multiple-choice-explanation,
  .multiple-choice-correctness {
    margin: 0;
    padding-block-start: 0.75rem;
    padding-block-end: 0.75rem;
    padding-inline-start: 1.75rem;
    padding-inline-end: 1.75rem;
  }
`;

/**
 * A multiple choice answer component
 * @param params
 * @returns
 */
const MultipleChoiceAnswer: React.FC<{
  index: number;
  optionText: string;
  correct: boolean;
  explanationText: string;
  correctnessText: string;
  addAnswer: (index: number, correct: boolean) => void;
}> = ({
  index,
  optionText,
  correct,
  explanationText,
  correctnessText,
  addAnswer,
}) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);
  const toggleCheck = () => {
    if (!disabled) {
      setChecked((isChecked) => !isChecked);
      setDisabled(true);
      anchorRef.current?.setAttribute("clicked", "true");
      answerRef.current?.setAttribute("correct", "true");
      addAnswer(index, correct);
    }
  };
  return (
    <StyledAnswer
      className="multiple-choice-answer"
      role="button"
      tabIndex={index}
      ref={answerRef}
      style={{
        backgroundColor: !checked ? "#fff" : correct ? "#f0f9f4" : "#fef9f8",
      }}
    >
      <a onClick={toggleCheck} ref={anchorRef}>
        <div className="multiple-choice-option">
          <code translate="no" dir="ltr">
            {optionText}
          </code>
          <Checkbox
            checked={checked}
            disabled={disabled}
            style={{ display: checked ? "none" : "block" }}
          />
          <Done
            style={{
              display: checked && correct ? "block" : "none",
              color: "green",
            }}
          />
          <NotInterested
            style={{
              display: checked && !correct ? "block" : "none",
              color: "red",
            }}
          />
        </div>
      </a>
      <div style={{ display: checked ? "block" : "none" }}>
        <p className="multiple-choice-explanation">{explanationText}</p>
        <p className="multiple-choice-correctness"
          style={{
            color: correct ? "green" : "red",
          }}
        >{correctnessText}</p>
      </div>
    </StyledAnswer>
  );
};

export default MultipleChoiceAnswer;
