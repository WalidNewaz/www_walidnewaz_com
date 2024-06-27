/** Interfaces */
import { Topic, AggregatedTopic } from "../interfaces";

/**
 * Extracts a list of topics from all posts
 * @param posts
 */
export const getTopics = (topics: AggregatedTopic[]) =>
  topics.reduce((acc: Topic, topic) => {
    acc[topic.fieldValue] = topic.totalCount;

    return acc;
  }, {});

/**
 * Returns the next page link
 * @param pathname
 * @param query 
 * @param index 
 * @returns 
 */
export const getPageLink = (pathname: string, query: any, index: number) => {
  const pageIndex = index < 2 ? "" : index;
  return pathname.endsWith("/")
    ? `${pathname}${pageIndex}`
    : `${pathname}/${pageIndex}`;
};
