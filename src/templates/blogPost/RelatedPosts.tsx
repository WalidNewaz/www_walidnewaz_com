import React from "react";

/** Components */
import MorePosts from "../../components/MorePosts";

/**
 * Displays posts related to the current post
 * @param params
 * @returns 
 */
const RelatedPosts: React.FC<{ posts: any[] }> = ({ posts }) =>
  posts.length > 0 && (
    <>
      <MorePosts posts={posts} heading={`You may also like`} />
    </>
  );

export default RelatedPosts;
