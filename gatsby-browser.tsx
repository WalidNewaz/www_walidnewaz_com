/* eslint-disable no-console */
import * as React from "react";
import { Provider } from "./src/components/ui/provider"

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

import Layout from "./src/components/Layout";

type onRouteUpdateParams = {
  location;
  prevLocation;
};

// Logs when the client route changes
export const onRouteUpdate = ({
  location,
  prevLocation,
}: onRouteUpdateParams): void => {
  // console.log("new pathname", location.pathname)
  // console.log("old pathname", prevLocation ? prevLocation.pathname : null)
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
