/* eslint-disable no-undef */
/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

import * as dotenv from 'dotenv';

/** Utils */
import { getGtagForEnv } from './src/utils/gtag';

dotenv.config();

/** Constants */
const GATSBY_ACTIVE_ENV = process.env.GATSBY_ACTIVE_ENV || 'development';

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
    getGtagForEnv(GATSBY_ACTIVE_ENV),
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-image`,
    `gatsby-transformer-json`,
    // `gatsby-plugin-mdx`,
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
        name: `tutorials`,
        path: `${__dirname}/content/tutorials`,
      },
    },
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
        plugins: [
          {
            resolve: `gatsby-remark-header-ids`,
            options: {
              // Options here
            }
          },
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
                default: 'Monokai Dimmed',
                dark: 'Monokai Dimmed'
              }
            }
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
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `{
              allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
                nodes {
                  excerpt
                  html
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    date
                  }
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
        "description": "Personal blog and technical documentation for web application development.",
        start_url: `/`,
        background_color: `#ffffff`,
        "categories": ["Personal Blog", "Tech blog"],
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        theme_color: `#ffd900`,
        display: `minimal-ui`,
        "orientation": "portrait",
        icon: `src/images/android-chrome-512x512.png`, // This path is relative to the root of the site.
      },
    },
    // `gatsby-plugin-offline`
  ],
}
