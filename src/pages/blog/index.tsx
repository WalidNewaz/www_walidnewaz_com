import React, { useState } from "react";
import { graphql, PageProps } from "gatsby";
import styled from "styled-components";

/** Components */
import Seo from "../../components/seo";
import PaginatedArticleCards from "../../components/PaginatedArticleCards";
import Topics from "../../components/Topics";

/** Utils */
import { getTopics } from "../../utils/posts";

/** Hooks */
import { useFetchNextPage } from "../../hooks/posts";

/** Constants */
import { ITEMS_PER_PAGE, MAX_PAGES } from "../../constants";

/** Styles */
import StyledSection from "../../components/shared/styled/StyledSection";

const StyledBlogPage = styled.section`
  ${StyledSection}

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;

  @media (max-width: 940px) {
    padding: var(--spacing-4) var(--spacing-0);
  }
`;

interface Image {
  id: string;
  childImageSharp: {
    gatsbyImageData: any;
  };
}

interface Post {
  excerpt: string;
  fields: {
    slug: string;
  };
  frontmatter: {
    date: string;
    pathDate: string;
    title: string;
    description: string;
    hero_image: Image;
    tags: string[];
    read_time: string;
  };
  headings: {
    value: string;
  }[];
  id: string;
}

interface AggregatedTopic {
  fieldValue: string;
  totalCount: number;
}

interface AllPosts {
  allMarkdownRemark: {
    posts: Post[];
    postCount: number;
    allTopics: AggregatedTopic[];
  };
}

type PageContext = {
  topic: string;
  currentPage: number;
};

/**
 * Main blog page
 * @param params
 * @returns
 */
const BlogPage: React.FC<PageProps<AllPosts, PageContext>> = ({
  data,
  params,
  pageContext,
  pageResources,
  path,
  uri,
  location,
}) => {
  const { posts, postCount, allTopics } = data.allMarkdownRemark;
  const [currentPage, setCurrentPage] = useState(pageContext.currentPage || 1);
  const fetchNextPage = useFetchNextPage();
  const query = {
    limit: ITEMS_PER_PAGE,
    offset: (currentPage - 1) * ITEMS_PER_PAGE,
  };

  return (
    <StyledBlogPage>
      <Topics topics={getTopics(allTopics)} />
      <PaginatedArticleCards
        posts={posts}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItemsCount={postCount}
        itemsPerPage={ITEMS_PER_PAGE}
        maxPages={MAX_PAGES}
        fetchNextPage={fetchNextPage}
        showContent={true}
        pathname={location.pathname}
        query={query}
      />
    </StyledBlogPage>
  );
};

// Queries the blog directory for file names.
// This is the first page of the blog, so we only want to show the 9 most recent posts.
export const query = graphql`
  {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      limit: 9
      filter: { fileAbsolutePath: { regex: "/^.*/content/blog/.*?$/" } }
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
      postCount: totalCount
      allTopics: group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default BlogPage;

export const Head: React.FC = () => <Seo title="All posts" />;
