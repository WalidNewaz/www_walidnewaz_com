import React from "react";
import { graphql, PageProps } from "gatsby";
import styled from "styled-components";

/** Components */
import Seo from "../../components/seo";
import ArticlePostCard from "../../components/articlePostCard";

const TutorialsHeading = styled.h2`
  margin: 1rem 1.25rem 0.5rem;
  color: var(--heading2);
  font-family: var(--fontFamily-sans);
  font-weight: var(--fontWeight-bold);
  transition: color 300ms linear;
`;
const StyledParagraph = styled.p`
  margin: 1rem 1.25rem 0.5rem;
  font-family: var(--fontFamily-sans);
`;

/**
 * 
 * @param props
 * @returns 
 */
const TutorialsPage: React.FC<PageProps<any>> = ({ data }) => {
  const tutorials = data.allMarkdownRemark.nodes;
  const firstTutorials = tutorials.reduce((acc: Array<any>, tutorial: any) => {
    return tutorial?.frontmatter?.chapter?.startsWith("1. ")
      ? [...acc, tutorial]
      : acc;
  }, []);

  return (
    <>
      <section className="flex flex-column wrap flex-start">
        <TutorialsHeading>Tutorials</TutorialsHeading>
        <StyledParagraph className="text-2">
          Welcome to the tutorials section of my site! Here, you'll find a
          collection of tutorials documenting the topics I've explored and
          learned throughout my software development journey. These are not
          meant to be exhaustive guides or authoritative references, but rather
          practical, concise introductions designed to help you quickly get
          started with the technologies and concepts I discuss.
        </StyledParagraph>
        <StyledParagraph className="text-2">
          These tutorials are written from the perspective of a fellow learner,
          and I hope they serve as helpful stepping stones for anyone on a
          similar path. A basic understanding of programming — preferably with
          JavaScript — will be useful as you follow along.
        </StyledParagraph>
      </section>

      <section className="blog-posts col flex wrap my-6">
        <TutorialsHeading>Topics:</TutorialsHeading>
      </section>

      <section className="blog-posts col flex wrap my-6 pb-12">
        {firstTutorials.map((tutorial: any) => (
          <ArticlePostCard
            key={tutorial.id}
            // postDate={tutorial.frontmatter.date}
            // readTime={tutorial.frontmatter.read_time}
            title={
              tutorial.frontmatter.series 
            }
            image={tutorial.frontmatter.hero_image}
            slug={`/tutorials${tutorial.fields.slug}`}
            tags={tutorial.frontmatter.tags}
            className="col-4"
          />
        ))}
      </section>
    </>
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
  }
`;

export default TutorialsPage;

export const Head: React.FC = () => <Seo title="Tutorials" />;
