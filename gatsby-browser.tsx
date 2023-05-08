import * as React from 'react'

// custom typefaces
import "@fontsource/montserrat/variable.css"
import "@fontsource/merriweather"
// normalize CSS across browsers
import "./src/normalize.css"
// custom CSS styles
import "./src/style.css"

// Highlighting for code blocks
import "prismjs/themes/prism.css"

import Layout from './src/components/layout'

// Logs when the client route changes
export const onRouteUpdate = ({ location, prevLocation }) => {
    console.log("new pathname", location.pathname)
    console.log("old pathname", prevLocation ? prevLocation.pathname : null)
}

// Wraps every page in a component
export const wrapPageElement = ({ element, props }) => {
    return <Layout {...props}>{element}</Layout>
}