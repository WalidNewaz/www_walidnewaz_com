import React from "react";
import styled from "styled-components";

interface PublishedInfoProps {
  publishedDate: string;
}

const PublishedWrapper = styled.section`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 0.9rem;
  color: var(--text-muted, #666);
  font-family: var(--fontFamily-sans);

  span.label {
    color: var(--text-muted, #6c757d);
    margin-right: 0.25rem;
    font-weight: 800;
  }

  @media (max-width: 768px) {
    justify-content: center;
    text-align: center;
  }

  @media (prefers-color-scheme: dark) {
    color: var(--text-muted-dark, #aaa);

    span.label {
      color: var(--text-muted-dark, #888);
    }
  }
`;

const PublishedInfo: React.FC<PublishedInfoProps> = ({ publishedDate }) => {
  return (
    <PublishedWrapper>
      {/* <span className="label">Published:</span> */}
      <span>{publishedDate}</span>
    </PublishedWrapper>
  );
};

export default PublishedInfo;