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
import { useFetchNextPage } from "../../hooks/useFetchNextPage";

/** Constants */
import { ITEMS_PER_PAGE, MAX_PAGES } from "../../constants";

/** Styles */
import StyledSection from "../../components/shared/styled/StyledSection";

const StyledPageContentContainer = styled.div`
  ${StyledSection}
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
  allMdx: {
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
  const { posts, postCount, allTopics } = data.allMdx;
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
        <Topics topics={getTopics(allTopics)} section="build/f" />
      </section>

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
    </StyledPageContentContainer>
  );
};

export const query = graphql`
  {
    allMdx(
      sort: { frontmatter: { date: DESC } }
      limit: 9
      filter: {
        internal: { contentFilePath: { regex: "/^.*/content/blog/.*?$/" } }
      }
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
