/* eslint-disable no-undef */
/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

import * as dotenv from "dotenv";

/** Utils */
import { getGtagForEnv } from "./src/utils/gtag";
import { remark } from "remark";

dotenv.config();

/** Constants */
const GATSBY_ACTIVE_ENV = process.env.GATSBY_ACTIVE_ENV || "development";

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `walid newaz`,
    author: {
      name: `Walid Newaz`,
      summary: `who lives and works in Denver building useful things.`,
    },
    description: `A personal blog of a curious software developer.`,
    siteUrl: `https://www.walidnewaz.com/`,
    social: {
      linkedin: `https://www.linkedin.com/in/walid-newaz/`,
    },
  },
  plugins: [
    `gatsby-plugin-postcss`,
    getGtagForEnv(GATSBY_ACTIVE_ENV),
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        excludes: ["/confirm-subscription/"],
      },
    },
    `gatsby-plugin-image`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`],
        mdxOptions: {
          remarkPlugins: [
            {
              resolve: `gatsby-remark-vscode`,
              options: {
                theme: {
                  default: "Solarized Light",
                  dark: "Solarized Dark",
                },
              },
            },
            // `gatsby-remark-prismjs`,
          ],
          rehypePlugins: [],
        },
      },
      gatsbyRemarkPlugins: [
        {
          resolve: "gatsby-remark-graph",
          options: {
            // this is the language in your code-block that triggers mermaid parsing
            language: "mermaid", // default
            theme: "default", // could also be dark, forest, or neutral
          },
        },
        // Add custom plugins here
        {
          resolve: `gatsby-remark-header-ids`,
          options: {
            // Options here
          },
        },
        {
          resolve: `gatsby-remark-wrap-tables`,
          options: {
            containerClass: "table-container",
          },
        },
        `gatsby-remark-katex`,
        {
          resolve: `gatsby-remark-images`,
          options: {
            maxWidth: 630,
          },
        },
        {
          resolve: `gatsby-remark-responsive-iframe`,
          options: {
            wrapperStyle: `margin-bottom: 1.0725rem`,
          },
        },
        {
          resolve: `gatsby-remark-vscode`,
          options: {
            theme: {
              default: "Solarized Light",
              dark: "Solarized Dark",
            },
          },
        },
        `gatsby-remark-prismjs`,
      ],
    },
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `learn`,
        path: `${__dirname}/content/learn`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `build`,
        path: `${__dirname}/content/build`,
      },
    },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `grow`,
    //     path: `${__dirname}/content/grow`,
    //   },
    // },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `journal`,
    //     path: `${__dirname}/content/journal`,
    //   },
    // },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        plugins: [
          {
            resolve: "gatsby-remark-graph",
            options: {
              // this is the language in your code-block that triggers mermaid parsing
              language: "mermaid", // default
              theme: "default", // could also be dark, forest, or neutral
            },
          },
          // Add custom plugins here
          {
            resolve: `gatsby-remark-header-ids`,
            options: {
              // Options here
            },
          },
          {
            resolve: `gatsby-remark-wrap-tables`,
            options: {
              containerClass: "table-container",
            },
          },
          `gatsby-remark-katex`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              theme: {
                default: "Solarized Light",
                dark: "Solarized Dark",
              },
            },
          },
          `gatsby-remark-prismjs`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map((node) => {
                const absPath = node.fileAbsolutePath;
                const slug = node.fields.slug;
                const prefixPath = absPath.substring(0, absPath.indexOf(slug));
                // console.log(prefixPath);
                const paths = prefixPath.split("/");
                const lastPath = paths.pop();
                // console.log(lastPath);

                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + `/${lastPath}` + slug,
                  guid: site.siteMetadata.siteUrl + `/${lastPath}` + slug,
                  // custom_elements: [{ "content:encoded": node.html }],
                });
              });
            },
            query: `{
              allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
                nodes {
                  excerpt
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    date
                  }
                  fileAbsolutePath
                }
              }
            }`,
            output: "/rss.xml",
            title: "Walid's Tech Blog",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Walid's Blog`,
        short_name: `Walid Newaz`,
        description:
          "Personal blog and technical documentation for web application development.",
        start_url: `/`,
        background_color: `#ffffff`,
        categories: ["Personal Blog", "Tech blog"],
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        theme_color: `#ffd900`,
        display: `minimal-ui`,
        orientation: "portrait",
        icon: `src/images/android-chrome-512x512.png`, // This path is relative to the root of the site.
      },
    },
    // `gatsby-plugin-offline`
  ],
};
