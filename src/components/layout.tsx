import * as React from "react"
import Header from "./header"
import Footer from "./footer"

declare var __PATH_PREFIX__: string

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">
        <Header />
      </header>
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
