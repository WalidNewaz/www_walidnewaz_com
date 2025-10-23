import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";

/** Components */
import Seo from "../../components/seo";
import HeroImage from "../../components/article/HeroImage";
import TutorialTOC from "../../components/tutorial/TutorialTOC";
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


interface PublishedInfoProps {
  publishedDate: string;
}

const PublishedWrapper = styled.section`
  margin-top: 1rem;
  padding: 0.5rem 1.5rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 0.9rem;
  color: var(--text-muted, #666);
  font-family: var(--fontFamily-sans);

  span.label {
    color: var(--text-muted, #6c757d);
    margin-right: 0.25rem;
    font-weight: 800;
  }

  @media (max-width: 768px) {
    justify-content: center;
    text-align: center;
  }

  @media (prefers-color-scheme: dark) {
    color: var(--text-muted-dark, #aaa);

    span.label {
      color: var(--text-muted-dark, #888);
    }
  }
`;

const CourseDetailsSection: React.FC<{ course: any }> = ({ course }) => {
  const details = [
    { label: "Collections", value: course.frontmatter.collections?.join(", ") || "N/A" },
    { label: "Difficulty", value: course.frontmatter.difficulty || "N/A" },
    { label: "Audience", value: course.frontmatter.audience || "N/A" },
    { label: "Required Courses", value: course.frontmatter.required_courses?.join(", ") || "N/A" },
    { label: "Draft", value: course.frontmatter.draft || "No" },
    { label: "Featured", value: course.frontmatter.featured || "No" },
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

const PublishedInfo: React.FC<PublishedInfoProps> = ({ publishedDate }) => {
  return (
    <PublishedWrapper>
      <span className="label">Published:</span>
      <span>{publishedDate}</span>
    </PublishedWrapper>
  );
};


const TutorialIntroTemplate: React.FC<{
  data: any;
  children: React.ReactNode;
}> = ({
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
        section="build"
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
        }
        fields {
          slug
        }
      }
    }
  }
`;
