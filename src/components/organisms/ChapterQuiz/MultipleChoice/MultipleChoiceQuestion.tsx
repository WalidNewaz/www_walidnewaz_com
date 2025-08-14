import React from 'react';
import styled from "styled-components";

// Styles
const StyledQuestion = styled.div`
  color: var(--heading2);
  font-size: var(--fontSize-1);
  font-family: var(--fontFamily-sans);
  font-weight: var(--fontWeight-normal);
  line-height: var(--lineHeight-normal);
  padding: 1rem 0 1rem 1rem;
  text-align: left;
`;

const MultipleChoiceQuestion: React.FC<{ question: string }> = ({
  question,
}) => {
  return (
    <StyledQuestion>
      <span className="m-0">{question}</span>
    </StyledQuestion>
  );
};

export default MultipleChoiceQuestion;