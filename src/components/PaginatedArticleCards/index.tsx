import React from "react";
import styled from "styled-components";

/** Component */
import ArticlePostCardGroup from "../ArticlePostCardGroup";
import Pagination from "../Pagination";

const StyledBlogPostsSection = styled.section`
  width: 100%;
  padding: var(--spacing-4) var(--spacing-2);

  section > h2 {
    margin: 0 1.25rem;
  }

  @media (max-width: 940px) {
    padding: var(--spacing-4) var(--spacing-0);
  }
`;

const StyledHeading = styled.h2`
  margin: 0 1.25rem;
  color: var(--heading2);
  font-family: var(--fontFamily-sans);
  font-weight: var(--fontWeight-bold);
  transition: color 300ms linear;
`;

const PaginatedArticleCards: React.FC<{
  posts: any[];
  heading?: string;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalItemsCount: number;
  itemsPerPage: number;
  maxPages: number;
  fetchNextPage: (pageNumber: number) => void;
  // sortOptions: SortItemType[];
  showContent: boolean;
  pathname: string;
  query?: any; // Query passed to the search
}> = ({
  posts,
  heading = "Posts",
  currentPage,
  setCurrentPage,
  totalItemsCount,
  itemsPerPage,
  maxPages,
  fetchNextPage,
  // sortOptions,
  showContent,
  pathname,
  query,
}) => {
  // Generate content for the current page
  const currentItems = (
    <section className="blog-posts col flex wrap my-6">
      <ArticlePostCardGroup
        posts={posts}
        className={`transition-opacity duration-500 ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      />
    </section>
  );

  return (
    <StyledBlogPostsSection>
      <StyledHeading>{heading}:</StyledHeading>
      <Pagination
        items={currentItems}
        totalItemsCount={totalItemsCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        maxPages={maxPages}
        fetchNextPage={fetchNextPage}
        pathname={pathname}
        query={query}
      />
    </StyledBlogPostsSection>
  );
};

export default PaginatedArticleCards;
