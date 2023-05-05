import * as React from "react"
// import { Link } from "gatsby"
import Header from "./header"
import Footer from "./footer"

declare var __PATH_PREFIX__: string

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  // if (isRootPath) {
  //   header = (
  //     <h1 className="main-heading">
  //       <Link to="/">{title}</Link>
  //     </h1>
  //   )
  // } else {
  //   header = (
  //     <Link className="header-link-home" to="/">
  //       {title}
  //     </Link>
  //   )
  // }

  // header = <Header title ={title} />;

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
