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
import { useFetchNextPage } from "../../hooks/posts";

/** Utils */
import { getTopics } from "../../utils/posts";

/** Constants */
import { ITEMS_PER_PAGE, MAX_PAGES } from "../../constants";

/** Styles */
const BlogPostContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
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
  const { posts, totalCount } = data.allPosts;
  const postTopics = data.postTopics.group;
  const { topic } = pageContext;
  const currentTopic = topic || "";

  const [currentPage, setCurrentPage] = useState(pageContext.currentPage || 1);
  const fetchNextPage = useFetchNextPage();
  const query = {
    limit: ITEMS_PER_PAGE,
    offset: (currentPage - 1) * ITEMS_PER_PAGE,
  };

  return (
    <BlogPostContainer>
      <Topics topics={getTopics(postTopics)} currentTopic={currentTopic} />
      <PaginatedArticleCards
        posts={posts}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItemsCount={totalCount}
        itemsPerPage={ITEMS_PER_PAGE}
        maxPages={MAX_PAGES}
        fetchNextPage={fetchNextPage}
        showContent={true}
        pathname={`/blog/${currentTopic}`}
        query={query}
      />
    </BlogPostContainer>
  );
};

// Queries the blog directory for selected topics
export const pageQuery = graphql`
  query ($topic: String, $skip: Int, $limit: Int) {
    allPosts: allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: {
        frontmatter: { tags: { eq: $topic } }
        fileAbsolutePath: { regex: "/^.*/content/blog/.*?$/" }
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
      totalCount
    }
    postTopics: allMarkdownRemark(
      limit: 1000
      filter: {
        frontmatter: { tags: { eq: $topic } }
        fileAbsolutePath: { regex: "/^.*/content/blog/.*?$/" }
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
