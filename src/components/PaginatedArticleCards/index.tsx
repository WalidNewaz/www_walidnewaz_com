import React from "react";

/** Component */
import ArticlePostCardGroup from "../ArticlePostCardGroup";
import Pagination from "../Pagination";

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
  postHeroes?: any[];
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
  postHeroes,
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
        postHeroes={postHeroes}
      />
    </section>
  );

  return (
    <section>
      <h2>{heading}</h2>
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
    </section>
  );
};

export default PaginatedArticleCards;
