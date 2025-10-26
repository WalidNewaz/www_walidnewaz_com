import { navigate } from "gatsby";

/**
 * Fetch the next page of posts
 * @param topic
 * @returns 
 */
export const useFetchNextPage = (topic?: string) => {
  const topicPathStr = topic ? `${topic}/` : '';
  return (gotoPageNumber: number) => {
    const currentPage = gotoPageNumber === 1 ? '' : `${gotoPageNumber}`;
    const pagePath = `/blog/${topicPathStr}${currentPage}`;
    navigate(pagePath);
  }
};