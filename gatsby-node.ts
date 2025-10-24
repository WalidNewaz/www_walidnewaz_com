/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */
import {
  GatsbyNode,
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

/** Utility Functions */
import {
  createPageTopics,
  createTopicsPagesWithTopicFilter,
} from "./src/utils/ssg";

/** Interfaces */
import { AggregatedTopic } from "./src/interfaces";

/** Constants */
import { ITEMS_PER_PAGE } from "./src/constants";

/** Section: Tutorials */

/**
 * Creates static pages for tutorial intros
 * @param params
 * @returns 
 */
const createTutorialIntroPages = async ({
  graphql,
  actions,
  reporter,
}: {
  graphql: any;
  actions: Actions;
  reporter: Reporter;
}) => {
  // Get all tutorial series intros
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { frontmatter: { date: ASC } }
        limit: 1000
        filter: {
          fileAbsolutePath: {
            regex: "/[/]content[/]tutorials[/][^/]+[/]index.mdx?$/"
          }
        }
      ) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            series
            hero_image {
              id
              base
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading the tutorial intros`,
      result.errors
    );
    return;
  }

  const tutorials = result.data.allMarkdownRemark.nodes;

  if (tutorials.length === 0) {
    reporter.info(`No tutorial intros found.`);
    return;
  }

  const { createPage } = actions;

  tutorials.forEach((tutorial: any, index: number) => {
    reporter.info(
      `Creating page for tutorial intro: ${tutorial.frontmatter.series}`
    );
    const seriesDir = tutorial.fields.slug
      .split("/")
      .filter((str: string) => str !== "")[0]; // e.g. react-native

    const heroImagePattern = tutorial.frontmatter.hero_image
      ? `${tutorial.fields.slug}${tutorial.frontmatter.hero_image.base}/`
      : `${seriesDir}/hero-image.png/`;

    createPage({
      path: `/tutorials${tutorial.fields.slug}`,
      component: path.resolve(`./src/templates/tutorialIntro/MarkdownRemark.tsx`),
      context: {
        id: tutorial.id,
        series: tutorial.frontmatter.series,
        heroImagePattern,
      },
    });
  });
};

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
        filter: {
          fileAbsolutePath: {
            regex: "/[\\\\/]content[\\\\/]tutorials[\\\\/](?![^\\\\/]+[\\\\/]index.mdx?$).+.(md|mdx)$/"
          }
        }
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

        const seriesDir = chapter.fields.slug
          .split("/")
          .filter((str: string) => str !== "")[0]; // e.g. react-native

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

        const { createPage } = actions;
        createPage({
          path: `/tutorials${chapter.fields.slug}`,
          component: path.resolve(`./src/templates/tutorialChapter/MarkdownRemark.tsx`),
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

/** Section: Learn */

/**
 * Creates static pages for the learn tutorial intros
 * @param params
 * @returns 
 */
const createLearnTutorialIntroPages = async ({
  graphql,
  actions,
  reporter,
}: {
  graphql: any;
  actions: Actions;
  reporter: Reporter;
}) => {
  // Get all tutorial series intros
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { frontmatter: { date: ASC } }
        limit: 1000
        filter: {
          fileAbsolutePath: {
            regex: "/[/]content[/]learn[/][^/]+[/]index.mdx?$/"
          }
        }
      ) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            series
            hero_image {
              id
              base
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading the tutorial intros`,
      result.errors
    );
    return;
  }

  const tutorials = result.data.allMarkdownRemark.nodes;

  if (tutorials.length === 0) {
    reporter.info(`No learn tutorial intros found.`);
    return;
  }

  const { createPage } = actions;

  tutorials.forEach((tutorial: any, index: number) => {
    reporter.info(
      `Creating page for tutorial intro: ${tutorial.frontmatter.series}`
    );
    const seriesDir = tutorial.fields.slug
      .split("/")
      .filter((str: string) => str !== "")[0]; // e.g. react-native

    const heroImagePattern = tutorial.frontmatter.hero_image
      ? `${tutorial.fields.slug}${tutorial.frontmatter.hero_image.base}/`
      : `${seriesDir}/hero-image.png/`;

    createPage({
      path: `/learn${tutorial.fields.slug}`,
      component: path.resolve(`./src/templates/learnTutorialIntro/MarkdownRemark.tsx`),
      context: {
        id: tutorial.id,
        series: tutorial.frontmatter.series,
        heroImagePattern,
      },
    });
  });
};

/**
 * Creates static pages for individual tutorial chapters
 */
const createLearnTutorialChapterPages = async ({
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
        filter: {
          fileAbsolutePath: {
            regex: "/[\\\\/]content[\\\\/]learn[\\\\/](?![^\\\\/]+[\\\\/]index.mdx?$).+.(md|mdx)$/"
          }
        }
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

        const seriesDir = chapter.fields.slug
          .split("/")
          .filter((str: string) => str !== "")[0]; // e.g. react-native

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
          ? `./content/learn${chapter.fields.slug}chapter-quiz.json`
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

        const { createPage } = actions;
        createPage({
          path: `/learn${chapter.fields.slug}`,
          component: path.resolve(
            `./src/templates/learnTutorialChapter/MarkdownRemark.tsx`
          ),
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
 * Creates a list of pages that filter learn posts based on topics
 * @param params
 */
const createLearnTopicsPages = async ({
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

  const postCount = result.data.postSummary.totalCount;
  const postsPerPage = ITEMS_PER_PAGE;
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
        section: "learn",
        templateType: `learnTopics`,
        srcType: "MarkdownRemark",
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
      section: "learn",
      srcType: "MarkdownRemark",
    });
  });
};

/** Section: Build */

/**
 * Creates static pages for the build tutorial intros
 * @param params
 * @returns 
 */
const createBuildTutorialIntroPages = async ({
  graphql,
  actions,
  reporter,
}: {
  graphql: any;
  actions: Actions;
  reporter: Reporter;
}) => {
  // Get all tutorial series intros
  const result = await graphql(`
    {
      allMdx(
        sort: { frontmatter: { date: ASC } }
        limit: 1000
        filter: {
          internal: {
            contentFilePath: {
              regex: "/[/]content[/]build[/][^/]+[/]index.mdx?$/"
            }
          }
        }
      ) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            series
            hero_image {
              id
              base
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          internal {
            type
            contentFilePath
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading the build tutorial intros`,
      result.errors
    );
    return;
  }

  const tutorials = result.data.allMdx.nodes;

  if (tutorials.length === 0) {
    reporter.warn(`No build tutorial intros found.`);
    return;
  }

  const { createPage } = actions;

  tutorials.forEach((tutorial: any, index: number) => {
    // reporter.info(
    //   `Creating page for build tutorial intro: ${tutorial.frontmatter.series}`
    // );
    const seriesDir = tutorial.fields.slug
      .split("/")
      .filter((str: string) => str !== "")[0]; // e.g. react-native

    const heroImagePattern = tutorial.frontmatter.hero_image
      ? `${tutorial.fields.slug}${tutorial.frontmatter.hero_image.base}/`
      : `${seriesDir}/hero-image.png/`;

    const postTemplate = path.resolve(
      `./src/templates/buildTutorialIntro/${tutorial.internal.type}.tsx`
    );
    const postComponent =
      tutorial.internal.type === "Mdx"
        ? `${postTemplate}?__contentFilePath=${tutorial.internal.contentFilePath}`
        : postTemplate;

    createPage({
      path: `/build${tutorial.fields.slug}`,
      component: postComponent,
      context: {
        id: tutorial.id,
        series: tutorial.frontmatter.series,
        heroImagePattern,
      },
    });
  });
};

const getChaptersBySeries = (nodes: any[]) =>
  nodes.reduce((acc: any, chapter: any) => {
    const { series } = chapter.frontmatter;
    if (Object.hasOwn(acc, series)) {
      const currChapters = [...acc[series], chapter];
      return {
        ...acc,
        [series]: currChapters,
      };
    } else {
      acc[series] = [chapter];
    }
    return acc;
  }, {});

const getChapterHeroImagePattern = (chapter: any, reporter: Reporter) => {
  const seriesDir = chapter.fields.slug
    .split("/")
    .filter((str: string) => str !== "")[0]; // e.g. react-native

  let heroImagePattern = "";
  if (chapter.frontmatter.hero_image) {
    heroImagePattern = `${chapter.fields.slug}${chapter.frontmatter.hero_image.base}/`;
  } else {
    heroImagePattern = `${seriesDir}/hero-image.png/`;
  }
  // reporter.info(`Hero Image Pattern for ${chapter.frontmatter.chapter}: ${heroImagePattern}`);
  return heroImagePattern;
};

const getPrevPostId = (currIndex: number, chapters: any[]) => {
  if (currIndex === 0) {
    return null;
  }
  return chapters[currIndex - 1].id;
};

const getNextPostId = (currIndex: number, chapters: any[]) => {
  if (currIndex === chapters.length - 1) {
    return null;
  }
  return chapters[currIndex + 1].id;
};

const getTemplatePath = (templateType: string, srcType: string) => {
  return path.resolve(`./src/templates/${templateType}/${srcType}.tsx`);
};

const getTemplateComponent = (templateType: string, chapter: any) => {
  const postTemplate = getTemplatePath(templateType, chapter.internal.type);
  return chapter.internal.type === "Mdx"
    ? `${postTemplate}?__contentFilePath=${chapter.internal.contentFilePath}`
    : postTemplate;
};

const getQuizData = (chapter: any, section: string, reporter: Reporter) => {
  const quizFilePath = chapter.frontmatter.has_quiz
    ? `./content/${section}${chapter.fields.slug}chapter-quiz.json`
    : null;

  // Load the quiz data if it exists
  let quizData = null;
  if (quizFilePath && fs.existsSync(quizFilePath)) {
    try {
      const quizContent = fs.readFileSync(quizFilePath, "utf-8");
      quizData = JSON.parse(quizContent);
    } catch (error) {
      reporter.warn(
        `Failed to load quiz data for chapter ${chapter.frontmatter.chapter}: ${error}`
      );
    }
  }
  return quizData;
};

export const CHAPTER_FIELDS = `
  id
  fields {
    slug
  }
  frontmatter {
    series
    part
    chapter
    has_quiz
  }
  internal {
    type
    contentFilePath
  }
`;

export const INDEX_FIELDS = `
  id
  fields {
    slug
  }
  frontmatter {
    date(formatString: "MMMM DD, YYYY")
    title
    series
  }
  internal {
    type
    contentFilePath
  }
`;

const getAllChapters = (siteSection: string) => `
  allChapters: allMdx(
        sort: { frontmatter: { date: ASC } }
        limit: 1000
        filter: {
          internal: {
            contentFilePath: {
              regex: "/.*?/content/${siteSection}/(?![^/]+[/]index.mdx$).+.mdx$/"
            }
          }
        }
      ) {
        nodes {
          ${CHAPTER_FIELDS}
        }
      }
`;

const getAllIndexes = (siteSection: string) => `
  allIndexes: allMdx(
        sort: { frontmatter: { date: ASC } }
        limit: 1000
        filter: {
          internal: {
            contentFilePath: {
              regex: "/[/]content[/]${siteSection}[/][^/]+[/]index.mdx$/"
            }
          }
        }
      ) {
        nodes {
          ${INDEX_FIELDS}
        }
      }
`;


/**
 * Creates static pages for individual build tutorial chapters
 */
const createBuildTutorialChapterPages = async ({
  graphql,
  actions,
  reporter,
}: {
  graphql: any;
  actions: Actions;
  reporter: Reporter;
}) => {
  // Get all build tutorial chapters sorted by date
  const result = await graphql(`
    {
      ${getAllChapters("build")}
      ${getAllIndexes("build")}
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading the build tutorial chapters`,
      result.errors
    );
    return;
  }

  const { nodes: allChapters } = result.data.allChapters;
  const seriesChapters = getChaptersBySeries(allChapters);
  const { nodes: allIndexes } = result.data.allIndexes;

  // reporter.info(`All Indexes: ${JSON.stringify(allIndexes)}`);
  // reporter.info(`Series Chapters: ${JSON.stringify(seriesChapters)}`);

  if (Object.keys(seriesChapters).length > 0) {
    Object.keys(seriesChapters).map((series: string, seriesIndex: number) => {
      reporter.info(`Creating pages for series: ${series}`);
      const seriesIntro = allIndexes.find((index: any) => index.frontmatter.series === series) || {};
      // reporter.info(`Series Index Slug for ${series}: ${JSON.stringify(seriesIntro)}`);
      const chapters = seriesChapters[series];
      return chapters.map((chapter: any, index: number) => {
        // reporter.info(
        //   `Creating page for build chapter: ${chapter.frontmatter.chapter}`
        // );

        const pagePath = `/build${chapter.fields.slug}`;
        const postComponent = getTemplateComponent("buildTutorialChapter", chapter);
        const chapterId = chapter.id;
        const previousPostId = getPrevPostId(index, chapters);
        const nextPostId = getNextPostId(index, chapters);
        const series = chapter.frontmatter.series;
        const heroImagePattern = getChapterHeroImagePattern(chapter, reporter);
        const quizData = getQuizData(chapter, "build", reporter);

        const { createPage } = actions;
        createPage({
          path: pagePath,
          component: postComponent,
          context: {
            id: chapterId,
            previousPostId: previousPostId,
            nextPostId: nextPostId,
            series: series,
            heroImagePattern: heroImagePattern,
            ...(quizData && { quiz: quizData }),
            seriesIntro: seriesIntro,
          },
        });
      });
    });
  }
};

const getAllTopicsPages = (siteSection: string) => `
  postSummary: allMdx(
      filter: {
        internal: {
          contentFilePath: {
            regex: "/^.*/content/${siteSection}/.*?$/"
          }
        }
      }
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
    }
`;

/**
 * Creates a list of pages that filter build posts based on topics
 * @param params
 */
const createBuildTopicsPages = async ({
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
      ${getAllTopicsPages("build")}
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your build posts`,
      result.errors
    );
    return;
  }

  const postCount = result.data.postSummary.totalCount;
  const postsPerPage = ITEMS_PER_PAGE;
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
        section: "build",
        templateType: `buildTopics`,
        srcType: "Mdx",
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
      section: "build",
      srcType: "Mdx",
    });
  });
};

/** Section: Journal/Blog */

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
        component: path.resolve(`./src/templates/blogPost/MarkdownRemark.tsx`),
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
 * Creates a list of pages that filter blog posts based on topics
 * @param params
 */
const createBlogTopicsPages = async ({
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

  const postCount = result.data.postSummary.totalCount;
  const postsPerPage = ITEMS_PER_PAGE;
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
      section: "blog",
      srcType: "MarkdownRemark",
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
  await createTutorialIntroPages({ graphql, actions, reporter });
  await createTutorialChapterPages({ graphql, actions, reporter });

  // Learn Section
  await createLearnTutorialIntroPages({ graphql, actions, reporter });
  await createLearnTutorialChapterPages({ graphql, actions, reporter });
  await createLearnTopicsPages({ graphql, actions, reporter });

  // Build Section
  await createBuildTutorialIntroPages({ graphql, actions, reporter });
  await createBuildTutorialChapterPages({ graphql, actions, reporter });
  await createBuildTopicsPages({ graphql, actions, reporter });

  // Blog/Journal Section
  await createBlogPostPages({ graphql, actions, reporter });
  await createBlogTopicsPages({ graphql, actions, reporter });
};

/**
 * Add custom fields to GraphQL nodes
 * 
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = ({ node, actions, getNode }: CreateNodeArgs) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark` || node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
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

export const createSchemaCustomization = ({
  actions,
}: CreateSchemaCustomizationArgs) => {
  const { createTypes } = actions;
  
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

    interface MarkdownOrMdx @nodeInterface {
      id: ID!
      frontmatter: Frontmatter
      fields: Fields
    }

    type MarkdownRemark implements Node & MarkdownOrMdx {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Mdx implements Node & MarkdownOrMdx {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      featured: Boolean
      date: Date @dateformat
      series: String
      part: String
      chapter: String
      title: String
      description: String
      has_quiz: Boolean
      tags: [String]
      hero_image: File @fileByRelativePath
      pathDate: Date @dateformat
      related: [String]
      collections: [String]
      required_courses: [String]
      difficulty: String
      audience: String
      series: String
    }

    type Fields {
      slug: String
    }

    type File implements Node {
      absolutePath: String
      childImageSharp: ImageSharp
    }
  `);
};
