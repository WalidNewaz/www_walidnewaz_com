import React from "react";
import styled from "styled-components";

// Components
import MultipleChoice from "./MultipleChoice";

// Styles
const StyledQuiz = styled.div`
  font-family: Inter;

  h3 {
    font-size: 2rem;
    padding-inline-start: 1.75rem;
    padding-inline-end: 1.75rem;
  }

  p {
    font-size: 1rem;
    padding-inline-start: 1.75rem;
    padding-inline-end: 1.75rem;
  }

  .multiple-choice-question {
    font-size: 1.2rem;
    padding: 1rem 0;
    background-color: #5f6368;
    color: #fff;
  }
`;

// Types
export type MultipleChoiceType = {
  question: string;
  options: {
    text: string;
    correct: boolean;
    explanation: string;
    correctnessText?: string;
  }[];
};

export type QuizType = {
  topic: string;
  questions: MultipleChoiceType[];
};

/**
 * A chapter quiz component
 * @returns
 */
const ChapterQuiz: React.FC<{ quiz: QuizType }> = ({ quiz }) => {
  return (
    <StyledQuiz>
      <h3>Check your understanding</h3>
      <p>Test your knowledge of {quiz.topic}</p>
      <div className="chapter-assessment">
        {quiz.questions.map((question, index) => (
          <MultipleChoice index={index} key={index} multipleChoice={question} />
        ))}
      </div>
    </StyledQuiz>
  );
};

export default ChapterQuiz;
