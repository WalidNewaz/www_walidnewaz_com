import React from "react";
import styled from "styled-components";

/* Utils */
import { wrapBackticksInCodeTags } from "../../../../utils/string";

// Styles
const StyledQuestion = styled.div`
  color: var(--heading2);
  font-size: var(--fontSize-1);
  font-family: var(--fontFamily-sans);
  font-weight: var(--fontWeight-normal);
  line-height: var(--lineHeight-normal);
  padding: 1rem 0 1rem 1rem;
  text-align: left;
  white-space: break-spaces;
  overflow-wrap: anywhere;

  code {
    white-space: break-spaces;
    overflow-wrap: anywhere;
  }
`;

const MultipleChoiceQuestion: React.FC<{ question: string }> = ({
  question,
}) => {
  return (
    <StyledQuestion dangerouslySetInnerHTML={{ __html: wrapBackticksInCodeTags(question) }} />
  );
};

export default MultipleChoiceQuestion;
