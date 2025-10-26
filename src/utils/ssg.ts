/**
 * Utility functions for static site generation (SSG)
 * using GatsbyJS.
 */

import { Actions } from "gatsby";
import * as path from "path";

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
  templateType,
  srcType = "MarkdownRemark",
}: {
  topic: string | null;
  index: number;
  postsPerPage: number;
  actions: Actions;
  section?: string;
  templateType?: string;
  srcType?: string;
}) => {
  const { createPage } = actions;
  const topicPathStr = topic ? `${topic}/` : "";
  const currentPage = index + 1;
  const pagePath =
    index === 0
      ? `/${section}/f/${topicPathStr}`
      : `/${section}/f/${topicPathStr}${currentPage}`;
  if (templateType === undefined) {
    console.error("pagePath:", pagePath);
    throw new Error("templateType is required to create topic pages");
  }
  createPage({
    path: pagePath,
    component: path.resolve(`./src/templates/${templateType}/${srcType}.tsx`),
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
  srcType = "MarkdownRemark",
}: {
  topic: string;
  numPages: number;
  postsPerPage: number;
  actions: Actions;
  section?: string;
  srcType?: string;
}) => {
  if (numPages > 1) {
    Array.from({ length: numPages }).forEach((_, i) => {
      createPageTopics({
        topic,
        index: i,
        postsPerPage,
        actions,
        section,
        templateType: `${section}Topics`,
        srcType,
      });
    });
  } else {
    createPageTopics({
      topic,
      index: 0,
      postsPerPage,
      actions,
      section,
      templateType: `${section}Topics`,
      srcType,
    });
  }
};
