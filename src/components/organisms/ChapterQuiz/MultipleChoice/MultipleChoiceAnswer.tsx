import React, { useState, useRef } from "react";
import styled from "styled-components";

// Components
import Checkbox from "@mui/joy/Checkbox";
import Done from "@mui/icons-material/Done";
import NotInterested from "@mui/icons-material/NotInterested";

/* Utils */
import { wrapBackticksInCodeTags } from "../../../../utils/string";

// Styles
const StyledAnswer = styled.div`
  border-bottom: 1px solid #dadce0;

  a {
    text-decoration: none !important;
    color: inherit;
    white-space: break-spaces;
    overflow-wrap: anywhere;
  }

  a:not([clicked]):hover {
    cursor: pointer;
  }

  .multiple-choice-option {
    padding: 16px 24px;
    display: flex;
    justify-content: space-between;
  }

  .multiple-choice-option p {
    color: var(--brand-text);
    font-size: var(--fontSize-1);
    font-family: var(--fontFamily-sans);
    font-weight: var(--fontWeight-normal);
    line-height: var(--lineHeight-normal);
    margin: 0;
    padding: 0;
  }

  .multiple-choice-explanation,
  .multiple-choice-correctness {
    margin: 0;
    padding-block-start: 0.75rem;
    padding-block-end: 0.75rem;
    padding-inline-start: 1.75rem;
    padding-inline-end: 1.75rem;
  }

  .multiple-choice-explanation {
    font-size: var(--fontSize-1);
    line-height: var(--lineHeight-normal);
    color: var(--brand-text);
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
          <p translate="no" dir="ltr" dangerouslySetInnerHTML={{ __html: wrapBackticksInCodeTags(optionText) }} />
          <Checkbox
            checked={checked}
            disabled={disabled}
            style={
              checked
                ? { display: "none" }
                : {
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }
            }
          />
          <div
            style={
              checked && correct
                ? {
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    color: "green",
                  }
                : {
                    display: "none",
                  }
            }
          >
            <Done />
          </div>
          <div
            style={
              checked && !correct
                ? {
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    color: "red",
                  }
                : {
                    display: "none",
                  }
            }
          >
            <NotInterested />
          </div>
        </div>
      </a>
      <div style={{ display: checked ? "block" : "none" }}>
        <p
          className="multiple-choice-explanation"
          dangerouslySetInnerHTML={{
            __html: wrapBackticksInCodeTags(explanationText),
          }}
        />
        <p
          className="multiple-choice-correctness"
          style={{
            color: correct ? "green" : "red",
          }}
        >
          {correctnessText}
        </p>
      </div>
    </StyledAnswer>
  );
};

export default MultipleChoiceAnswer;
