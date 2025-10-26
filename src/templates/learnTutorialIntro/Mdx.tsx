import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";

/** Components */
import Seo from "../../components/seo";
import HeroImage from "../../components/article/HeroImage";
import TutorialTOC from "../../components/tutorial/TutorialTOC";
import CourseDetailsSection from "../../components/tutorial/CourseDetailsSection";
import PublishedInfo from "../../components/tutorial/PublishedInfo";
import { MDXProvider } from "@mdx-js/react";
import { MDXComponents } from "../../components/mdx/MDXComponents";

/** Utils */
import { formatPublishedDate } from "../../utils/dates";

/** Styles */
import StyledSection from "../../components/shared/styled/StyledSection";
import StyledAnchor from "../../components/shared/styled/StyledAnchor";
import StyledList from "../../components/shared/styled/StyledList";

const StyledTutorialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: var(--spacing-6);

  @media screen and (max-width: 480px) {
  }
`;

const StyledArticleBody = styled.section`
  ${StyledSection}
  ${StyledAnchor}
  ${StyledList}

  ul, ol {
    list-style-position: inside;
    margin-top: var(--spacing-2);
    margin-bottom: var(--spacing-2);
    padding-left: var(--spacing-2);
  }

  grid-column: span 12;

  @media screen and (min-width: 800px) and (max-width: 975px) {
    grid-column: span 12;
  }

  @media screen and (min-width: 480px) and (max-width: 800px) {
    grid-column: span 12;
  }

  @media screen and (max-width: 480px) {
    grid-column: span 12;
  }
`;

const TutorialIntroTemplate: React.FC<any> = ({
  data: { seriesIntro, allSeriesPosts, allTutorialHeroes },
  children,
}) => {
  const seriesDir = seriesIntro.fields.slug
    .split("/")
    .filter((str: string) => str !== "")[0]; // e.g. react-native
  const heroImagePattern = allTutorialHeroes.nodes.find((hero: any) => {
    return hero.relativeDirectory === seriesDir;
  });
  const filteredSeriesPosts = allSeriesPosts.nodes.filter((post: any) => {
    return post.frontmatter.chapter !== null;
  });

  return (
    <>
      <article
        className="tutorial-chapter"
        itemScope
        itemType="http://schema.org/Article"
      >
        <HeroImage
          {...{ post: seriesIntro, heroImage: heroImagePattern }}
          className="article-hero-img"
        />
        <StyledTutorialGrid>
          <StyledArticleBody>
            <h1
              style={{
                borderBottom: "1px solid #a0a0a0",
                paddingBottom: "1rem",
              }}
            >
              {seriesIntro.frontmatter.title}
            </h1>
            <CourseDetailsSection course={seriesIntro} />
            <PublishedInfo
              publishedDate={formatPublishedDate(seriesIntro.frontmatter.date)}
            />

            <h3>Course Overview</h3>
            <MDXProvider components={MDXComponents}>{children}</MDXProvider>

            <h3>Course Contents</h3>
          </StyledArticleBody>
        </StyledTutorialGrid>
      </article>
      <TutorialTOC
        post={seriesIntro}
        allSeriesPosts={{ nodes: filteredSeriesPosts }}
        seriesIntro={seriesIntro}
        isIntro={true}
        section="learn"
      />
    </>
  );
};

export const Head: React.FC<{ data: any }> = ({ data: { seriesIntro } }) => {
  return (
    <Seo
      title={seriesIntro.frontmatter.title}
      description={seriesIntro.frontmatter.description || seriesIntro.excerpt}
    />
  );
};

export default TutorialIntroTemplate;

export const pageQuery = graphql`
  query TutorialIntroBySlug(
    $id: String!
    $series: String
    $heroImagePattern: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    seriesIntro: mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        series
        part
        chapter
        description
        date(formatString: "MMMM DD, YYYY")
        read_time
        collections
        required_courses
        difficulty
        audience
        featured
        tags
        draft
      }
      tableOfContents
      fields {
        slug
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
    heroImage: file(relativePath: { regex: $heroImagePattern }) {
      childImageSharp {
        gatsbyImageData
      }
    }
    allSeriesPosts: allMdx(
      sort: { frontmatter: { date: ASC } }
      filter: { frontmatter: { series: { eq: $series } } }
    ) {
      nodes {
        frontmatter {
          series
          part
          chapter
          tags
          title
          description
          pathDate: date(formatString: "/YYYY/MM/DD")
        }
        fields {
          slug
        }
      }
    }
  }
`;
