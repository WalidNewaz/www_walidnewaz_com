import * as React from "react";
import { RenderBodyArgs } from "gatsby";

/** Components */
import Layout from "./src/components/layout";

/** Styles */
import "./src/styles/index.css";

// custom typefaces
import "@fontsource/montserrat"; // Defaults to weight 400
import "@fontsource/merriweather";
// normalize CSS across browsers
import "./src/normalize.css";
// custom CSS styles
import "./src/style.css";
import "./src/styles/index.css";

// Highlighting for code blocks
import "prismjs/themes/prism.css";

/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

/**
 * @type {import('gatsby').GatsbySSR['onRenderBody']}
 */
export const onRenderBody = ({ setHtmlAttributes }: RenderBodyArgs): void => {
  setHtmlAttributes({ lang: `en` });
};

// Wraps every page in a component
export const wrapPageElement: React.FC<{ element; props }> = ({
  element,
  props,
}): React.ReactElement => {
  return <Layout {...props}>{element}</Layout>;
};
