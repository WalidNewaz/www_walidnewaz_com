/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Seo: React.FC<{
  description?: string,
  title?: string,
  children?
}> = ({ description, title, children }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            social {
              linkedin
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title

  return (
    <>
      <html lang="en" className="site-theme" />
      <title>{defaultTitle ? `${title} | ${defaultTitle}` : title}</title>
      <meta name="description" content={metaDescription} />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <script type="text/javascript" src="https://app.mailjet.com/pas-nc-pop-in-v1.js"></script>
      <script type="text/javascript" src="https://f.convertkit.com/ckjs/ck.5.js"></script>
      <meta
        name="twitter:creator"
        content={site.siteMetadata?.social?.twitter || ``}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />

      <link rel="icon" href="/favicon.ico" sizes="any"></link>
      <link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>

      <link rel="preconnect" href="https://fonts.gstatic.com"></link>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@400&family=Crimson+Pro&&family=Montserrat&family=Playfair&display=swap" rel="stylesheet"></link>
      <link rel="stylesheet" href="/dark.css" media="(prefers-color-scheme: dark)" />
      <link
        rel="stylesheet"
        href="/light.css"
        media="(prefers-color-scheme: light)"
      />
      {children}
    </>
  )
}

export default Seo
