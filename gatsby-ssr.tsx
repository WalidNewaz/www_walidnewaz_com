import * as React from 'react'
import { RenderBodyArgs } from 'gatsby'

/** Components */
import Layout from './src/components/layout'

/** Styles */
import './src/styles/index.css'

/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

/**
 * @type {import('gatsby').GatsbySSR['onRenderBody']}
 */
export const onRenderBody = ({ setHtmlAttributes }: RenderBodyArgs): void => {
  setHtmlAttributes({ lang: `en` })
}

// Wraps every page in a component
export const wrapPageElement: React.FC<{ element, props }> = ({ element, props }): React.ReactElement => {
  return <Layout {...props}>{element}</Layout>
}