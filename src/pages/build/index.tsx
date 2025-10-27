import React from "react";
import { graphql, PageProps } from "gatsby";
import styled from "styled-components";

/** Components */
import Seo from "../../components/seo";
import Topics from "../../components/Topics";
import TutorialCards from "../../components/tutorial/TutorialCards";

/** Utils */
import { getTopics } from "../../utils/posts";

/** Styles */
import StyledSection from "../../components/shared/styled/StyledSection";

const StyledPageContentContainer = styled.div`
  ${StyledSection}
`;

/**
 *
 * @param props
 * @returns
 */
const TutorialsPage: React.FC<PageProps<any>> = ({ data }) => {
  const tutorials = data.allMdx.nodes;
  const { allTopics } = data.allMdx;
  const tutorialHeroes = data.allTutorialHeroes.nodes;

  return (
    <StyledPageContentContainer>
      <section className="flex flex-column wrap flex-start">
        <h2>Build</h2>
        <p className="text-2">
          Build section of this site is about creating software that lasts. Here
          you'll find tutorials and essays on workflow engines, system design,
          distributed systems, and architectural patterns. The goal is to move
          beyond syntax and into design: how to structure systems that are
          reliable, scalable, and maintainable.
        </p>
      </section>

      {tutorials.length === 0 && (
        <section className="blog-posts col flex wrap">
          <h2>No tutorials found.</h2>
          <p className="text-2">
            It seems we couldn't find any tutorials at the moment. Please check
            back later for updates!
          </p>
        </section>
      )}

      <section className="blog-posts col flex wrap">
        <h2>Topics:</h2>
        <Topics topics={getTopics(allTopics)} section="build/f" />
      </section>

      <section className="blog-posts col flex wrap pb-12">
        <TutorialCards
          tutorials={tutorials}
          tutorialHeroes={tutorialHeroes}
          section="build"
        />
      </section>
    </StyledPageContentContainer>
  );
};

export const query = graphql`
  {
    allMdx(
      sort: { frontmatter: { date: DESC } }
      filter: {
          internal: {
            contentFilePath: {
              regex: "/[/]content[/]build[/][^/]+[/]index.mdx?$/"
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

export const Head: React.FC = () => <Seo title="Build Tutorials" />;
