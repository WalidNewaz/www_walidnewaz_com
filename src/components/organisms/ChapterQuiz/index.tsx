import React from "react";
import styled from "styled-components";

// Components
import MultipleChoice from "./MultipleChoice";

// Styles
const StyledQuiz = styled.div`
  font-family: Inter;

  h3 {
    font-size: 2rem;
    padding-inline-end: 1.75rem;
  }

  h6 {
    font-size: 1.2rem;
    color: #5f6368;
    text-align: left;
    margin: 0.5rem 0;
    line-height: 1.5;
  }

  p {
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
      <p>Test your knowledge of <strong>{quiz.topic}</strong></p>
      <div className="chapter-assessment">
        {quiz.questions.map((question, index) => (
          <MultipleChoice index={index} key={index} multipleChoice={question} />
        ))}
      </div>
    </StyledQuiz>
  );
};

export default ChapterQuiz;
