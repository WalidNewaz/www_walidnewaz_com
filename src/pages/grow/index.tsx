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
`;

/**
 *
 * @param props
 * @returns
 */
const TutorialsPage: React.FC<PageProps<any>> = ({ data }) => {
  const tutorials = data.allMarkdownRemark.nodes;
  const tutorialHeroes = data.allTutorialHeroes.nodes;

  return (
    <StyledTutorialsContainer>
      <section className="flex flex-column wrap flex-start">
        <h2>Grow</h2>
        <p className="text-2">
          This section is focused on evergreen skills that help developers
          transition into senior and architect roles. These guides cover
          computer science fundamentals, design patterns, debugging, testing,
          and developer career growth. The content here is language-agnostic and
          intended to give you tools you can use for the rest of your career.
        </p>
      </section>

      {
        tutorials.length === 0 && (
          <section className="blog-posts col flex wrap">
            <h2>No tutorials found.</h2>
            <p className="text-2">
              It seems we couldn't find any tutorials at the moment. Please
              check back later for updates!
            </p>
          </section>
        )
      }

      <section className="blog-posts col flex wrap pb-12">
        {tutorials.map((tutorial: any) => {
          const seriesDir = tutorial.fields.slug
            .split("/")
            .filter((str: string) => str !== "")[0]; // e.g. react-native
          const heroImagePattern =
            tutorial.frontmatter.hero_image ||
            tutorialHeroes.find((hero: any) => {
              return hero.relativeDirectory === seriesDir;
            });
          return (
            <ArticlePostCard
              key={tutorial.id}
              // postDate={tutorial.frontmatter.date}
              // readTime={tutorial.frontmatter.read_time}
              title={tutorial.frontmatter.series}
              image={heroImagePattern}
              slug={`/tutorials${tutorial.fields.slug}`}
              tags={[
                tutorial.frontmatter.tags[tutorial.frontmatter.tags.length - 1],
              ]}
              className="col-4"
            />
          );
        })}
      </section>
    </StyledTutorialsContainer>
  );
};

export const query = graphql`
  {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: {
        fileAbsolutePath: {
          regex: "/[/]content[/]tutorials[/][^/]+[/]index.mdx?$/"
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
