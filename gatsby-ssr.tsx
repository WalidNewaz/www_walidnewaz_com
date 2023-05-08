import * as React from 'react'

import Layout from './src/components/layout'

/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

/**
 * @type {import('gatsby').GatsbySSR['onRenderBody']}
 */
export const onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: `en` })
}

// Wraps every page in a component
export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}