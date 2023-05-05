import * as React from "react"

const Footer = () => {
    return (
        <footer>
        Copyright © {new Date().getFullYear()} by Walid Newaz | Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    )
}

export default Footer