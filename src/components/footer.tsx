import * as React from "react"

const Footer: React.FC = () => {
    return (
      <>
        Copyright © {new Date().getFullYear()} by Walid Newaz | Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </>
    )
}

export default Footer