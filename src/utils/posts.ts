/** Interfaces */
import slugify from "slugify";
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

/**
 * Generates a unique ID for a heading based on its depth and title.
 * @param depth - The depth level of the heading (e.g., 1 for h1, 2 for h2).
 * @param title - The title or text content of the heading.
 * @returns A string representing the unique ID for the heading.
 */
export function makeHeadingId(depth: number, title: string) {
  return `heading-${depth}-${slugify(title.replace(/[:.()]/g, "").toLowerCase())}`;
}

/**
 * fetches hero image data in a given directory
 * @param post 
 * @param allHeroes 
 * @param seriesDir 
 * @returns 
 */
export const getHeroImageDataInDir = (
  post: any,
  allHeroes: any[],
  seriesDir: string
) => {
  return (
    post.frontmatter.hero_image?.childImageSharp?.gatsbyImageData ??
    allHeroes.find((hero: any) => hero.relativeDirectory === seriesDir)
      ?.childImageSharp?.gatsbyImageData
  );
};
