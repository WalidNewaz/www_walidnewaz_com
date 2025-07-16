/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
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
import { createFilePath } from "gatsby-source-filesystem";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

/** Interfaces */
import { AggregatedTopic } from "./src/interfaces";

/** Constants */
import { ITEMS_PER_PAGE } from "./src/constants";

/**
 * Creates static pages for individual tutorial chapters
 */
const createTutorialChapterPages = async ({
  graphql,
  actions,
  reporter,
}: {
  graphql: any;
  actions: Actions;
  reporter: Reporter;
}) => {
  // Get all markdown tutorial chapters sorted by date
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { frontmatter: { date: ASC } }
        limit: 1000
        filter: { fileAbsolutePath: { regex: "/^.*/content/tutorials/.*?$/" } }
      ) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            series
            part
            chapter
            hero_image {
              id
              base
              childImageSharp {
                gatsbyImageData
              }
            }
            pathDate: date(formatString: "/YYYY/MM/DD")
            related
            has_quiz
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading the tutorial chapters`,
      result.errors
    );
    return;
  }

  const { createPage } = actions;
  const seriesChapters = result.data.allMarkdownRemark.nodes.reduce(
    (acc: any, article: any) => {
      const { series } = article.frontmatter;
      if (Object.hasOwn(acc, series)) {
        const currChapters = [...acc[series], article];
        return {
          ...acc,
          [series]: currChapters,
        };
      } else {
        acc[series] = [article];
      }
      return acc;
    },
    {}
  );
  // reporter.info(`Series Chapters: ${JSON.stringify(seriesChapters)}`);

  if (Object.keys(seriesChapters).length > 0) {
    Object.keys(seriesChapters).map((series: string, seriesIndex: number) => {
      reporter.info(`Creating pages for series: ${series}`);
      const chapters = seriesChapters[series];
      return chapters.map((chapter: any, index: number) => {
        reporter.info(
          `Creating page for chapter: ${chapter.frontmatter.chapter}`
        );
        const previousPostId = index === 0 ? null : chapters[index - 1].id;
        const nextPostId =
          index === chapters.length - 1 ? null : chapters[index + 1].id;

        const seriesDir = chapter.fields.slug.split("/").filter((str: string) => str !== "")[0]; // e.g. react-native

        // TODO: Use hero image file from the main series folder
        // e.g. /content/tutorials/react-native/hero_image.png
        // Currently, it uses the hero image from the chapter folder
        // e.g. /content/tutorials/react-native/getting-started/hero_image.png
        // This is to ensure that the hero image is always available
        // for the chapter page, even if the series folder doesn't have a hero image
        const heroImagePattern = chapter.frontmatter.hero_image
          ? `${chapter.fields.slug}${chapter.frontmatter.hero_image.base}/`
          : `${seriesDir}/hero-image.png/`;
        // reporter.info(`Hero Image Pattern for ${chapter.frontmatter.chapter}: ${heroImagePattern}`);

        const quizFilePath = chapter.frontmatter.has_quiz
          ? `./content/tutorials${chapter.fields.slug}chapter-quiz.json`
          : null;

        // console.log(`Quiz File Path for ${chapter.frontmatter.chapter}:`, quizFilePath);

        // Load the quiz data if it exists
        let quizData = null;
        if (quizFilePath && fs.existsSync(quizFilePath)) {
          try {
            const quizContent = fs.readFileSync(quizFilePath, "utf-8");
            quizData = JSON.parse(quizContent);
            // reporter.info(
            //   `Loaded quiz data for chapter ${chapter.frontmatter.chapter}`
            // );
            // reporter.info(`Quiz Data: ${JSON.stringify(quizData)}`);
          } catch (error) {
            reporter.warn(
              `Failed to load quiz data for chapter ${chapter.frontmatter.chapter}: ${error}`
            );
          }
        }


        createPage({
          path: `/tutorials${chapter.fields.slug}`,
          component: path.resolve(`./src/templates/tutorialChapter/index.tsx`),
          context: {
            id: chapter.id,
            previousPostId,
            nextPostId,
            series: chapter.frontmatter.series,
            heroImagePattern,
            related: chapter.frontmatter.related || [],
            ...(quizData && { quiz: quizData }),
          },
        });
      });
    });
  }
};

/**
 * Creates static pages for individual blog posts
 */
const createBlogPostPages = async ({
  graphql,
  actions,
  reporter,
}: {
  graphql: any;
  actions: Actions;
  reporter: Reporter;
}) => {
  // Get all markdown blog posts sorted by date
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { frontmatter: { date: ASC } }
        limit: 1000
        filter: { fileAbsolutePath: { regex: "/^.*/content/blog/.*?$/" } }
      ) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            series
            title
            hero_image {
              id
              base
              childImageSharp {
                gatsbyImageData
              }
            }
            pathDate: date(formatString: "/YYYY/MM/DD")
            related
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    );
    return;
  }

  const { createPage } = actions;
  const posts = result.data.allMarkdownRemark.nodes;

  if (posts.length > 0) {
    posts.forEach((post: any, index: number) => {
      reporter.info(`Creating page for blog post: ${post.frontmatter.title}`);
      const previousPostId = index === 0 ? null : posts[index - 1].id;
      const nextPostId =
        index === posts.length - 1 ? null : posts[index + 1].id;
      const heroImagePattern = post.frontmatter.hero_image
        ? `${post.fields.slug}${post.frontmatter.hero_image.base}/`
        : null;
      const { pathDate } = post.frontmatter;

      createPage({
        path: `/blog${pathDate}${post.fields.slug}`,
        component: path.resolve(`./src/templates/blogPost/index.tsx`),
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
          series: post.frontmatter.series,
          heroImagePattern,
          related: post.frontmatter.related || [],
        },
      });
    });
  }
};

/**
 * Creates a single posts page based on the topic and index
 * @param params
 */
const createPageTopics = async ({
  topic,
  index,
  postsPerPage,
  actions,
}: {
  topic: string | null;
  index: number;
  postsPerPage: number;
  actions: Actions;
}) => {
  const { createPage } = actions;
  const topicPathStr = topic ? `${topic}/` : "";
  const currentPage = index + 1;
  const pagePath =
    index === 0
      ? `/blog/${topicPathStr}`
      : `/blog/${topicPathStr}${currentPage}`;
  createPage({
    path: pagePath,
    component: path.resolve(`./src/templates/blogTopics/index.tsx`),
    context: {
      ...(topic && { topic }),
      currentPage,
      limit: postsPerPage,
      skip: index * postsPerPage,
    },
  });
};

// Create paginated topic pages
const createTopicsPagesWithToicFilter = async ({
  topic,
  numPages,
  postsPerPage,
  actions,
}: {
  topic: string;
  numPages: number;
  postsPerPage: number;
  actions: Actions;
}) => {
  if (numPages > 1) {
    Array.from({ length: numPages }).forEach((_, i) => {
      createPageTopics({
        topic,
        index: i,
        postsPerPage,
        actions,
      });
    });
  } else {
    createPageTopics({
      topic,
      index: 0,
      postsPerPage,
      actions,
    });
  }
};

/**
 * Creates a list of pages that filter blog posts based on topics
 * @param params
 */
const createTopicsPages = async ({
  graphql,
  actions,
  reporter,
}: {
  graphql: any;
  actions: Actions;
  reporter: Reporter;
}) => {
  // Get all posts and their listed topics
  const result = await graphql(`
    {
      postCount: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/^.*/content/blog/.*?$/" } }
      ) {
        totalCount
      }
      allTopics: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/^.*/content/blog/.*?$/" } }
      ) {
        group(field: { frontmatter: { tags: SELECT } }) {
          fieldValue
          totalCount
        }
      }
      allMarkdownRemark(
        limit: 1000
        filter: { fileAbsolutePath: { regex: "/^.*/content/blog/.*?$/" } }
      ) {
        nodes {
          frontmatter {
            tags
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    );
    return;
  }

  const postCount = result.data.postCount.totalCount;
  const postsPerPage = ITEMS_PER_PAGE;
  const numPages = Math.ceil(postCount / postsPerPage);
  const allTopics: AggregatedTopic[] = result.data.allTopics.group;

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
    createTopicsPagesWithToicFilter({
      topic: topic.fieldValue,
      numPages,
      postsPerPage,
      actions,
    });
  });
};

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({
  graphql,
  actions,
  reporter,
}: CreatePagesArgs) => {
  await createTutorialChapterPages({ graphql, actions, reporter });
  await createBlogPostPages({ graphql, actions, reporter });
  await createTopicsPages({ graphql, actions, reporter });
};

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = ({ node, actions, getNode }: CreateNodeArgs) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
exports.createSchemaCustomization = ({
  actions,
}: CreateSchemaCustomizationArgs) => {
  const { createTypes } = actions;

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Social {
      linkedin: String
    }

    type Author {
      name: String
      summary: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `);
};

/**
 * Webpack configuration for Gatsby
 * @param params
 */
export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({
  actions,
  stage,
  getConfig,
}) => {
  if (stage === "build-javascript") {
    const config = getConfig();

    for (const plugin of config.plugins) {
      // Match by constructor type (not just name)
      if (plugin instanceof MiniCssExtractPlugin) {
        // This cast is safe — options is mutable
        (plugin as any).options.ignoreOrder = true;
      }
    }

    actions.replaceWebpackConfig(config);
  }
};
