import React from 'react';
import styled from "styled-components";

// Styles
const StyledQuestion = styled.div`
  font-size: 1.2rem;
  padding: 1rem 0 1rem 1rem;
  // background-color: #5f6368;
  color: #fff;
`;

const MultipleChoiceQuestion: React.FC<{ question: string }> = ({
  question,
}) => {
  return (
    <StyledQuestion>
      <h6 className="m-0">{question}</h6>
    </StyledQuestion>
  );
};

export default MultipleChoiceQuestion;