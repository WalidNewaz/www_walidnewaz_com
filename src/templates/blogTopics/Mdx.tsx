/**
 * This file contains all logic to render individual pages
 * that filter based on the selected topic. The URL path
 * to this page follows the following pattern:
 *
 * /blog/{topic}
 *
 * Currently there is no pagination support.
 */

import React, { useState } from "react";
import { graphql, PageProps } from "gatsby";
import styled from "styled-components";

/** Components */
import Seo from "../../components/seo";
import PaginatedArticleCards from "../../components/PaginatedArticleCards";
import Topics from "../../components/Topics";

/** Interfaces */
import { AllTopics } from "../../interfaces";

/** Hooks */
import { useFetchNextPage } from "../../hooks/useFetchNextPage";

/** Utils */
import { getTopics } from "../../utils/posts";

/** Constants */
import { ITEMS_PER_PAGE, MAX_PAGES } from "../../constants";

/** Styles */
import StyledSection from "../../components/shared/styled/StyledSection";

const StyledPageContentContainer = styled.div`
  ${StyledSection}
`;

type PostTopic = {
  frontmatter: {
    tags: string[];
  };
};

type AllPosts = {
  allPosts: {
    posts: {
      excerpt: string;
      fields: {
        slug: string;
      };
      frontmatter: {
        date: string;
        pathDate: string;
        title: string;
        description: string;
        hero_image: {
          id: string;
          childImageSharp: {
            gatsbyImageData: any;
          };
        };
        tags: string[];
        read_time: string;
      };
      headings: {
        value: string;
      }[];
      id: string;
    }[];
    totalCount: number;
    allTopics: {
      fieldValue: string;
      totalCount: number;
    }[];
  };
  postTopics: AllTopics;
};

type PageContext = {
  topic: string;
  currentPage: number;
};

/**
 * Page template for displaying all posts for a selected topic
 * @param params
 * @returns
 */
const BlogTopicPage: React.FC<PageProps<AllPosts, PageContext>> = ({
  data,
  pageContext,
}) => {
  const { posts, totalCount, allTopics } = data.allPosts;
  const postTopics = data.postTopics.group;
  const { topic: currentTopic } = pageContext || { topic: "" };

  const [currentPage, setCurrentPage] = useState(pageContext.currentPage || 1);
  const fetchNextPage = useFetchNextPage();
  const query = {
    limit: ITEMS_PER_PAGE,
    offset: (currentPage - 1) * ITEMS_PER_PAGE,
  };

  return (
    <StyledPageContentContainer>
      <section className="flex flex-column wrap flex-start">
        <h2>Blog</h2>
        <p className="text-2">
          This section contains my personal blog posts on software development,
          and other topics, sometimes even outside of tech. Feel free to explore
          the articles and share your thoughts in the comments!
        </p>
      </section>

      {posts.length === 0 && (
        <section className="blog-posts flex flex-column wrap flex-start">
          <h2>No posts found.</h2>
          <p className="text-2">
            It seems we couldn't find any posts at the moment. Please check back
            later for updates!
          </p>
        </section>
      )}

      <section className="blog-posts col flex wrap">
        <h2>Topics:</h2>
        <Topics
          topics={getTopics(allTopics)}
          currentTopic={currentTopic}
          section="blog/f"
        />
      </section>

      <PaginatedArticleCards
        posts={posts}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItemsCount={totalCount}
        itemsPerPage={ITEMS_PER_PAGE}
        maxPages={MAX_PAGES}
        fetchNextPage={fetchNextPage}
        showContent={true}
        pathname={`/blog/${currentTopic}/`}
        query={query}
      />
    </StyledPageContentContainer>
  );
};

// Queries the blog directory for selected topics
export const pageQuery = graphql`
  query ($topic: String, $skip: Int, $limit: Int) {
    allPosts: allMdx(
      sort: { frontmatter: { date: DESC } }
      filter: {
        frontmatter: { tags: { eq: $topic } }
        internal: {
          contentFilePath: {
            regex: "/^.*/content/blog/.*?$/"
          }
        }
      }
      limit: $limit
      skip: $skip
    ) {
      posts: nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          pathDate: date(formatString: "/YYYY/MM/DD")
          title
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
      totalCount
      allTopics: group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
    postTopics: allMdx(
      limit: 1000
      filter: {
        frontmatter: { tags: { eq: $topic } }
        internal: {
          contentFilePath: {
            regex: "/^.*/content/blog/.*?$/"
          }
        }
      }
    ) {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default BlogTopicPage;

export const Head: React.FC = () => <Seo title="All posts" />;
