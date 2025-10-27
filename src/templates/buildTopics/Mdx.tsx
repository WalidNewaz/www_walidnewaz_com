/**
 * This file contains all logic to render individual pages
 * that filter based on the selected topic. The URL path
 * to this page follows the following pattern:
 *
 * /build/{topic}
 *
 * Currently there is no pagination support.
 */

import React from "react";
import { graphql, PageProps } from "gatsby";
import styled from "styled-components";

/** Components */
import Seo from "../../components/seo";
import Topics from "../../components/Topics";
import TutorialCards from "../../components/tutorial/TutorialCards";

/** Interfaces */
import { AllTopics } from "../../interfaces";

/** Utilities */
import { getTopics } from "../../utils/posts";

/** Constants */
import { ITEMS_PER_PAGE, MAX_PAGES } from "../../constants";

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
 * Page template for displaying all posts for a selected topic
 * @param params
 * @returns
 */
const BlogTopicPage: React.FC<PageProps<any, PageContext>> = ({
  data,
  pageContext,
}) => {
  const { tutorials, allTopics } = data.allMdx;
  const { tutorialHeroes } = data.allFile;
  const { topic: currentTopic } = pageContext || { topic: "" };

  return (
    <StyledTutorialsContainer>
      <section className="flex flex-column wrap flex-start">
        <h2>Build</h2>
        <p className="text-2">
          In this section you'll find step-by-step guides to mastering modern
          programming languages and frameworks. These tutorials are designed for
          developers who already know how to code, but want to level up in
          Python, JavaScript, TypeScript, or Rust. Each series focuses on
          practical, project-driven learning, helping you get productive quickly
          while also filling in conceptual gaps.
        </p>
        <p className="text-2">
          These tutorials are written from the perspective of a fellow learner,
          and I hope they serve as helpful stepping stones for anyone on a
          similar path. A basic understanding of programming — preferably with
          JavaScript or Python — will be useful as you follow along.
        </p>
      </section>

      <section className="blog-posts col flex wrap">
        <h2>Topics:</h2>
        <Topics topics={getTopics(allTopics)} currentTopic={currentTopic} section="build/f" />
      </section>

      <section className="blog-posts col flex wrap pb-12">
        <TutorialCards
          tutorials={tutorials}
          tutorialHeroes={tutorialHeroes}
          section="build"
        />
      </section>
    </StyledTutorialsContainer>
  );
};

// Queries the build directory for selected topics
export const pageQuery = graphql`
  query ($topic: String, $skip: Int, $limit: Int) {
    allMdx(
      sort: { frontmatter: { date: DESC } }
      filter: {
        frontmatter: { tags: { eq: $topic } }
        internal: {
          contentFilePath: {
            regex: "/[/]content[/]build[/][^/]+[/]index.mdx?$/"
          }
        }
      }
      limit: $limit
      skip: $skip
    ) {
      tutorials: nodes {
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          pathDate: date(formatString: "/YYYY/MM/DD")
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
    allFile(filter: { relativePath: { regex: ".*/hero-image.png$/" } }) {
      tutorialHeroes: nodes {
        id
        relativeDirectory
        childImageSharp {
          gatsbyImageData
        }
      }
    }      
  }
`;

export default BlogTopicPage;

export const Head: React.FC = () => <Seo title="All build posts" />;
