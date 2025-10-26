import React from "react";
import styled from "styled-components";

import { Badge } from "@chakra-ui/react"

const DetailsGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem 2rem;
  margin: 2rem 0;
  padding: 1.5rem;
  background: var(--surface2, #fafafa);
  border-radius: 0.5rem;
  border: 1px solid var(--border, #eaeaea);
  font-family: var(--fontFamily-sans);

  /* Tablet: 2 columns */
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  /* Mobile: 1 column */
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  @media (prefers-color-scheme: dark) {
    background: var(--surface2, #1a1a1a);
    border-color: var(--border-dark, #333);
  }
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  span.label {
    font-size: var(--fontSize-0);
    color: var(--text-muted, #6c757d);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  span.value {
    font-size: var(--fontSize-1);
    font-weight: 500;
    color: var(--text, #222);
    text-transform: capitalize;
  }

  @media (prefers-color-scheme: dark) {
    span.value {
      color: var(--text-dark, #f2f2f2);
    }
  }
`;

const CourseDetailsSection: React.FC<{ course: any }> = ({ course }) => {
  const details = [
    { label: "Collections", value: course.frontmatter.collections?.join(", ") || "N/A" },
    { label: "Difficulty", value: course.frontmatter.difficulty || "N/A" },
    { label: "Audience", value: course.frontmatter.audience || "N/A" },
    { label: "Required Courses", value: course.frontmatter.required_courses?.join(", ") || "None" },
    { label: "Draft", value: course.frontmatter.draft ? (<Badge variant="solid" colorScheme="red">Yes</Badge>) : <Badge variant="solid" colorScheme="green">No</Badge> },
    { label: "Featured", value: course.frontmatter.featured ? (<Badge variant="solid" colorScheme="green">Yes</Badge>) : <Badge variant="solid" colorScheme="blue">No</Badge> },
  ];

  return (
    <DetailsGrid>
      {details.map((item) => (
        item.value && (
          <DetailItem key={item.label}>
            <span className="label">{item.label}</span>
            <span className="value">{item.value}</span>
          </DetailItem>
        )
      ))}
    </DetailsGrid>
  );
};

export default CourseDetailsSection;