import React from "react";
import { graphql, PageProps } from "gatsby";
import styled from "styled-components";

/** Components */
import Seo from "../../components/seo";
import ArticlePostCard from "../../components/molecules/articlePostCard";

/** Styles */
import StyledSection from "../../components/shared/styled/StyledSection";

const StyledTutorialsContainer = styled.div`
  ${StyledSection}
`

/**
 * 
 * @param props
 * @returns 
 */
const TutorialsPage: React.FC<PageProps<any>> = ({ data }) => {
  const tutorials = data.allMarkdownRemark.nodes;
  const tutorialHeroes = data.allTutorialHeroes.nodes;
  const firstTutorials = tutorials.reduce((acc: Array<any>, tutorial: any) => {
    return tutorial?.frontmatter?.chapter?.startsWith("1. ")
      ? [...acc, tutorial]
      : acc;
  }, []);

  return (
    <StyledTutorialsContainer>
      <section className="flex flex-column wrap flex-start">
        <h2>Tutorials</h2>
        <p className="text-2">
          Welcome to the tutorials section of my site! Here, you'll find a
          collection of tutorials documenting the topics I've explored and
          learned throughout my software development journey. These are not
          meant to be exhaustive guides or authoritative references, but rather
          practical, concise introductions designed to help you quickly get
          started with the technologies and concepts I discuss.
        </p>
        <p className="text-2">
          These tutorials are written from the perspective of a fellow learner,
          and I hope they serve as helpful stepping stones for anyone on a
          similar path. A basic understanding of programming — preferably with
          JavaScript — will be useful as you follow along.
        </p>
      </section>

      <section className="blog-posts col flex wrap">
        <h2>Topics:</h2>
      </section>

      <section className="blog-posts col flex wrap pb-12">
        {firstTutorials.map((tutorial: any) => {
          const seriesDir = tutorial.fields.slug.split("/").filter((str: string) => str !== "")[0]; // e.g. react-native
          const heroImagePattern = tutorial.frontmatter.hero_image || tutorialHeroes.find((hero: any) => {
            return hero.relativeDirectory === seriesDir;
          });
          return (
          <ArticlePostCard
            key={tutorial.id}
            // postDate={tutorial.frontmatter.date}
            // readTime={tutorial.frontmatter.read_time}
            title={
              tutorial.frontmatter.series 
            }
            image={heroImagePattern}
            slug={`/tutorials${tutorial.fields.slug}`}
            tags={tutorial.frontmatter.tags}
            className="col-4"
          />
        )})}
      </section>
    </StyledTutorialsContainer>
  );
};

export const query = graphql`
  {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { fileAbsolutePath: { regex: "/.*/content/tutorials/.*/" } }
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
        headings(depth: h1) {
          value
        }
        id
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

export const Head: React.FC = () => <Seo title="Tutorials" />;
