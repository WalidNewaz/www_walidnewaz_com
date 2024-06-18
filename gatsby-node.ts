/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */
import { GatsbyNode, WebpackPlugins } from 'gatsby';
import * as path from 'path';
import { createFilePath } from 'gatsby-source-filesystem';

/**
 * Creates static pages for individual blog posts
 */
const createPostPages = async ({ graphql, actions, reporter }) => {
  // Get all markdown blog posts sorted by date
  const result = await graphql(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: ASC } }, limit: 1000) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            hero_image {
              id
              base
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
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id;
      const nextPostId =
        index === posts.length - 1 ? null : posts[index + 1].id;
      const heroImagePattern = post.frontmatter.hero_image
        ? `${post.fields.slug}${post.frontmatter.hero_image.base}/`
        : null;
      const { pathDate } = post.frontmatter;

      createPage({
        path: `/blog${pathDate}${post.fields.slug}`,
        component: path.resolve(`./src/templates/blog-post.tsx`),
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
          heroImagePattern,
          relatedPosts: post.frontmatter.related || [],
        },
      });
    });
  }
};

interface Topic {
  frontmatter: {
    tags: string[];
    related: string[];
  }
}

/**
 * Creates a list of pages that filter blog posts based on topics
 * @param params
 */
const createTopicsPages = async ({ graphql, actions, reporter }) => {
  // Get all posts and their listed topics
  const result = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
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

  // Aggregate unique topics into an array
  const posts = result.data.allMarkdownRemark.nodes as Topic[];
  const topics: string[] = posts.reduce((topics: string[], post: Topic) => {
    const { tags } = post.frontmatter;
    tags.forEach((tag) => {
      if (!topics.includes(tag)) {
        topics = [...topics, tag];
      }
    });
    return topics;
  }, []);

  // Iterate through the topics and create pages
  const { createPage } = actions;

  if (topics.length > 0) {
    topics.forEach((topic, index) => {
      createPage({
        path: `/blog/${topic}`,
        component: path.resolve(`./src/templates/blog-topic.tsx`),
        context: {
          topic,
        },
      });
    });
  }
};

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
  await createPostPages({ graphql, actions, reporter });
  await createTopicsPages({ graphql, actions, reporter });
};

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
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
exports.createSchemaCustomization = ({ actions }) => {
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
export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  actions,
  stage,
  getConfig,
}) => {
  if (stage === 'build-javascript') {
    const config = getConfig();
    const miniCssExtractPlugin = config.plugins.find(
      (plugin: WebpackPlugins) =>
        plugin.constructor.name === 'MiniCssExtractPlugin',
    );
    // Prevent MiniCssExtractPlugin's default filename hashing error during build
    if (miniCssExtractPlugin) {
      miniCssExtractPlugin.options.ignoreOrder = true;
    }
    actions.replaceWebpackConfig(config);
  }
};
