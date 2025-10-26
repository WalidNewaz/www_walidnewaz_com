import * as React from "react"
import Header from "./Header"
import Footer from "./Footer"
import { BackToTopButton } from "../atoms/BackToTopButton"

declare let __PATH_PREFIX__: string

const Layout: React.FC<{ location, children }> = ({ location, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <Header />
      <main className="margin-inline-auto">
        {children}
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  )
}

export default Layout
