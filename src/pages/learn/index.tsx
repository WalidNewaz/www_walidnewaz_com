import React, { useMemo } from "react";
import { graphql, PageProps } from "gatsby";
import styled from "styled-components";

/** Components */
import Seo from "../../components/seo";
import Topics from "../../components/Topics";
import TutorialCards from "../../components/tutorial/TutorialCards";
import ErrorBoundary from "../../components/shared/ErrorBoundary";

/** Utils */
import { getTopics } from "../../utils/posts";

/** Styles */
import StyledSection from "../../components/shared/styled/StyledSection";

const StyledTutorialsContainer = styled.div`
  ${StyledSection}
`;

type PageContext = {
  topic: string;
  currentPage: number;
};

/**
 * Page for displaying all posts for the Learn page
 * @param props
 * @returns
 */
const TutorialsPage: React.FC<PageProps<any>> = ({ data }) => {
  const tutorials = data?.allMdx?.nodes ?? [];
  const allTopics = data?.allMdx?.allTopics ?? [];
  const tutorialHeroes = data?.allTutorialHeroes?.nodes ?? [];

  return (
    <ErrorBoundary>
      <StyledTutorialsContainer>
        <section className="flex flex-column wrap flex-start">
          <h2>Learn</h2>
          <p className="text-2">
            In this section you'll find step-by-step guides to mastering modern
            programming languages and frameworks. These tutorials are designed
            for developers who already know how to code, but want to level up in
            Python, JavaScript, TypeScript, or Rust. Each series focuses on
            practical, project-driven learning, helping you get productive
            quickly while also filling in conceptual gaps.
          </p>
          <p className="text-2">
            These tutorials are written from the perspective of a fellow
            learner, and I hope they serve as helpful stepping stones for anyone
            on a similar path. A basic understanding of programming — preferably
            with JavaScript or Python — will be useful as you follow along.
          </p>
        </section>

        <section className="blog-posts col flex wrap">
          <h2>Topics:</h2>
          <Topics topics={getTopics(allTopics)} section="learn/f" />
        </section>

        <section className="blog-posts col flex wrap pb-12">
          {tutorials.length > 0 && (
            <TutorialCards
              tutorials={tutorials}
              tutorialHeroes={tutorialHeroes}
            />
          )}
        </section>
      </StyledTutorialsContainer>
    </ErrorBoundary>
  );
};

export const query = graphql`
  {
    allMdx(
      sort: { frontmatter: { date: DESC } }
      filter: {
          internal: {
            contentFilePath: {
              regex: "/[/]content[/]learn[/][^/]+[/]index.mdx?$/"
            }
          }
        }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          pathDate: date(formatString: "/YYYY/MM/DD")
          draft
          title
          series
          part
          chapter
          description
          hero_image {
            id
            base
            childImageSharp {
              gatsbyImageData
            }
          }
          tags
          read_time
        }
        id
      }
      allTopics: group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
    allTutorialHeroes: allFile(
      filter: { relativePath: { regex: ".*/hero-image.png$/" } }
    ) {
      nodes {
        id
        relativeDirectory
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  }
`;

export default TutorialsPage;

export const Head: React.FC = () => <Seo title="Learn Topics" />;
