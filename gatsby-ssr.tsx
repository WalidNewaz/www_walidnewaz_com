import * as React from "react";
import { RenderBodyArgs } from "gatsby";

/** Components */
import Layout from "./src/components/Layout";
import { Provider } from "./src/components/ui/provider"

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

type wrapPageElementParams = {
  element: React.ReactNode;
  props: any;
};

// Wraps every page in a component
export const wrapPageElement: React.FC<wrapPageElementParams> = ({
  element,
  props,
}): React.ReactElement => {
  return <Provider><Layout {...props}>{element}</Layout></Provider>;
};
