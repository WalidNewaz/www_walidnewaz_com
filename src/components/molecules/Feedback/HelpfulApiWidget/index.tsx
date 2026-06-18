import React, { useState } from "react";
import styled from "styled-components";

const StyledFeedbackWidget = styled.div`
  margin-top: 2rem;
  text-align: right;

  p {
    font-size: var(--fontSize-2);
    color: var(--text1);
  }

  .buttons {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }

  button {
    padding: 0.5rem 1rem;
    margin-left: 0.5rem;
    border-radius: var(--borderRadius-md);
    border: none;
    background-color: var(--primary1);
    color: var(--text1);
    cursor: pointer;
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

  textarea {
    width: 100%;
    height: 8rem;
    padding: 0.5rem;
    border-radius: var(--borderRadius-md);
    border-color: var(--border1);
    margin-top: var(--spacing-4);
  }

  .submit {
    background-color: var(--surface4);
    color: white;
  }
  .submit:hover {
    background-color: var(--surface3);
  }
`;

/**
 * Feedback widget for API-based feedback submission
 * @param props
 * @returns
 */
export const FeedbackWidget: React.FC<{ postSlug: string; apiUrl: string }> = ({
  postSlug,
  apiUrl,
}) => {
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const [comment, setComment] = useState("");
  const submit = async () => {
    await fetch(`${apiUrl}/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post_slug: postSlug, helpful, comment }),
    });
    setHelpful(null);
    setComment("");
    alert("Thanks for your feedback!");
  };
  
  return (
    <StyledFeedbackWidget>
      <p>Was this helpful?</p>
      <div className="buttons">
        <button className="yes" onClick={() => setHelpful(true)}>
          Yes
        </button>
        <button className="no" onClick={() => setHelpful(false)}>
          No
        </button>
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Leave a comment..."
      />
      <button className="submit" onClick={submit}>Submit</button>
    </StyledFeedbackWidget>
  );
};

export default FeedbackWidget;
