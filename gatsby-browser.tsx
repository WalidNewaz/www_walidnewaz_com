/* eslint-disable no-console */
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

type onRouteUpdateParams = {
    location, prevLocation
}

// Logs when the client route changes
export const onRouteUpdate = ({ location, prevLocation }: onRouteUpdateParams): void => {
    // console.log("new pathname", location.pathname)
    // console.log("old pathname", prevLocation ? prevLocation.pathname : null)
}

type wrapPageElementParams = {
    element, props
}

// Wraps every page in a component
export const wrapPageElement: React.FC<{ element, props }> = ({ element, props }: wrapPageElementParams): React.ReactElement => {
    return <Layout {...props}>{element}</Layout>
}