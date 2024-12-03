import React from "react";
import { graphql, PageProps } from "gatsby";
import styled from "styled-components";

/** Components */
import Seo from "../../components/seo";

const TutorialsHeading = styled.h2`
  margin: 1rem 1.25rem 0.5rem;
  color: var(--heading2);
  font-family: var(--fontFamily-sans);
  font-weight: var(--fontWeight-bold);
  transition: color 300ms linear;
`;
const StyledParagraph = styled.p`
  margin: 1rem 1.25rem 0.5rem;
`;

const TutorialsPage: React.FC<PageProps<any>> = () => {
  return (
    <section className="flex flex-column wrap flex-start">
      <TutorialsHeading>Tutorials</TutorialsHeading>
      <StyledParagraph className="text-2">
        Welcome to the tutorials section of my site. The tutorials below
        comprise various topics that have helped me during my software
        development career. They are by no means intended to be comprehensive,
        or authoritative sources of information for each topic; rather they are
        intended to be quick primers that would help you get up to speed in
        using the technology being discussed.
      </StyledParagraph>
      <StyledParagraph className="text-2">
        I assume the reader has some basic knowledge of computer programming,
        preferably using JavaScript.
      </StyledParagraph>
      <TutorialsHeading>Topics:</TutorialsHeading>
    </section>
  );
};

export default TutorialsPage;

export const Head: React.FC = () => <Seo title="Tutorials" />;
