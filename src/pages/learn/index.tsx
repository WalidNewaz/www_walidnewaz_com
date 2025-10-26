import React from "react";
import { graphql, PageProps } from "gatsby";
import styled from "styled-components";

/** Components */
import Seo from "../../components/seo";
import ArticlePostCard from "../../components/molecules/articlePostCard";
import Topics from "../../components/Topics";

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
 *
 * @param props
 * @returns
 */
const TutorialsPage: React.FC<PageProps<any, PageContext>> = ({ data, pageContext }) => {
  const { tutorials, allTopics } = data?.allMdx || { tutorials: [], allTopics: [] };
  const { tutorialHeroes } = data?.allFile || { tutorialHeroes: [] };

  return (
    <StyledTutorialsContainer>
      <section className="flex flex-column wrap flex-start">
        <h2>Learn</h2>
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
        <Topics topics={getTopics(allTopics)} section="learn/f" />
      </section>

      <section className="blog-posts col flex wrap pb-12">
        {tutorials.map((tutorial: any) => {
          const seriesDir = tutorial.fields.slug
            .split("/")
            .filter((str: string) => str !== "")[0]; // e.g. react-native
          const heroImagePattern = tutorialHeroes.find((hero: any) => {
            console.log({"relativeDirectory": hero.relativeDirectory, "seriesDir": seriesDir});
            return hero.relativeDirectory === seriesDir;
            // return hero.relativeDirectory.startsWith(`${seriesDir}/`);
          });
          console.log("heroImagePattern", heroImagePattern);
          return (
            <ArticlePostCard
              key={tutorial.id}
              title={tutorial.frontmatter.series}
              image={heroImagePattern}
              slug={`/learn${tutorial.fields.slug}`}
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
    allMdx(
      sort: {frontmatter: {date: DESC}}
      filter: {internal: {contentFilePath: {regex: "/[/]content[/]learn[/][^/]+[/]index.mdx?$/"}}}
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
      allTopics: group(field: {frontmatter: {tags: SELECT}}) {
        fieldValue
        totalCount
      }
    }
    allFile(filter: {relativePath: {regex: ".*/hero-image.png$/"}}) {
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

export default TutorialsPage;

export const Head: React.FC = () => <Seo title="Learn Topics" />;
