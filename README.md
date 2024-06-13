# Walid Newaz's personal blog site

The project was started from a starter offered at the _[official and community-created starters](https://www.gatsbyjs.com/docs/gatsby-starters/)._

## 🚀 Quick start

### **Start developing.**

Navigate into your new site’s directory and start it up.

```shell
cd www_walidnewaz_com/
npm run develop
```

### **Open the source code and start editing!**

Your site is now running at `http://localhost:8000`!

Note: You'll also see a second link: `http://localhost:8000/___graphql`. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby Tutorial](https://www.gatsbyjs.com/docs/tutorial/getting-started/part-4/#use-graphiql-to-explore-the-data-layer-and-write-graphql-queries).

Open the `www_walidnewaz_com` directory in your code editor of choice and edit `src/pages/index.js`. Save your changes and the browser will update in real time!

## 🗒️ Writing Blog Posts

All posts are placed in the `./content/blog` directory. Blog posts are written using [Markdown files](https://www.markdownguide.org/cheat-sheet/).

Each post contains a [Frontmatter](https://mdxjs.com/guides/frontmatter/) formatted content at the top. If a post is `featured`, it should be marked `featured: true`. The date field in the format `YYYY-MM-DD` is required since it allows for the posts to be chronologically ordered on the website.

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a typical Gatsby project.

```shell
    .
    ├── content
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package.json
    └── README.md
```

1. **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.
2. **`/content/blog`**: This directory will contain all the published blog posts.

## 💫 Deploy

Build, Deploy, and Host On AWS S3

The project comes with its deployment scripts. To build and deploy to the correct s3 bucket, run the following:

```shell
cd www_walidnewaz_com/
npm run publish
```
