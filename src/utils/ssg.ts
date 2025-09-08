/**
 * Utility functions for static site generation (SSG)
 * using GatsbyJS.
 */

import {
  GatsbyNode,
  WebpackPlugins,
  CreatePagesArgs,
  CreateNodeArgs,
  CreateSchemaCustomizationArgs,
  Actions,
  Reporter,
} from "gatsby";
import * as path from "path";
import * as fs from "fs";

import { AggregatedTopic } from "../interfaces";

/**
 * Creates a single posts page based on the topic and index
 * @param params
 */
export const createPageTopics = async ({
  topic,
  index,
  postsPerPage,
  actions,
  section = "blog",
}: {
  topic: string | null;
  index: number;
  postsPerPage: number;
  actions: Actions;
  section?: string;
}) => {
  const { createPage } = actions;
  const topicPathStr = topic ? `${topic}/` : "";
  const currentPage = index + 1;
  const pagePath =
    index === 0
      ? `/${section}/f/${topicPathStr}`
      : `/${section}/f/${topicPathStr}${currentPage}`;
  createPage({
    path: pagePath,
    component: path.resolve(`./src/templates/${section}Topics/index.tsx`),
    context: {
      ...(topic && { topic }),
      currentPage,
      limit: postsPerPage,
      skip: index * postsPerPage,
    },
  });
};

// Create paginated topic pages
export const createTopicsPagesWithTopicFilter = async ({
  topic,
  numPages,
  postsPerPage,
  actions,
  section = "blog",
}: {
  topic: string;
  numPages: number;
  postsPerPage: number;
  actions: Actions;
  section?: string;
}) => {
  if (numPages > 1) {
    Array.from({ length: numPages }).forEach((_, i) => {
      createPageTopics({
        topic,
        index: i,
        postsPerPage,
        actions,
        section,
      });
    });
  } else {
    createPageTopics({
      topic,
      index: 0,
      postsPerPage,
      actions,
      section,
    });
  }
};

const QUERIES = {
  BLOG: `
  {
       postSummary: allMarkdownRemark(
         filter: { fileAbsolutePath: { regex: "/^.*/content/blog/.*?$/" } }
       ) {
         totalCount
         allTopics: group(field: { frontmatter: { tags: SELECT } }) {
           fieldValue
           totalCount
         }
         blogPosts: nodes {
           frontmatter {
             tags
           }
         }
       }`,
  LEARN: `{
       postSummary: allMarkdownRemark(
         filter: { fileAbsolutePath: { regex: "/^.*/content/learn/.*?$/" } }
       ) {
         totalCount
         allTopics: group(field: { frontmatter: { tags: SELECT } }) {
           fieldValue
           totalCount
         }
         blogPosts: nodes {
           frontmatter {
             tags
           }
         }
       }`,
};

/**
 * Creates a list of pages that filter posts based on topics
 * @param params
 */
export const createSectionTopicsPages = async ({
  graphql,
  actions,
  reporter,
  postsPerPage = 10,
  section = "blog",
}: {
  graphql: any;
  actions: Actions;
  reporter: Reporter;
  postsPerPage?: number;
  section?: string;
}) => {
  // Get all posts and their listed topics
  type MyObjectKeys = keyof typeof QUERIES;
  const queryName: MyObjectKeys = (section.toUpperCase() ||
    "BLOG") as MyObjectKeys;
  if (!QUERIES[queryName]) {
    reporter.panicOnBuild(
      `There was an error loading your ${section} posts. Section not recognized.`
    );
    return;
  }
  const result = await graphql(QUERIES[queryName]);

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your ${section} posts`,
      result.errors
    );
    return;
  }

  const postCount = result.data.postSummary.totalCount;
  const numPages = Math.ceil(postCount / postsPerPage);
  const allTopics: AggregatedTopic[] = result.data.postSummary.allTopics;

  // Create paginated pages for all posts
  if (numPages > 1) {
    Array.from({ length: numPages }).forEach((_, i) => {
      createPageTopics({
        topic: null,
        index: i,
        postsPerPage,
        actions,
      });
    });
  }

  // Create paginated topic pages
  allTopics.forEach((topic) => {
    const numPages = Math.ceil(topic.totalCount / postsPerPage);
    createTopicsPagesWithTopicFilter({
      topic: topic.fieldValue,
      numPages,
      postsPerPage,
      actions,
    });
  });
};
