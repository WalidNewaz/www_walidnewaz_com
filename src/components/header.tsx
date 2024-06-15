import * as React from "react"
import { Link } from "gatsby"

/** Constants */
const HEADER_CLASSES = `
  global-header
  bg-surface-1
  width-full
  z-3
  border-block-end-black
  border-block-end-solid
  border-thin
  position-fixed`;

const Header: React.FC = () => {
  return (
    <header className={HEADER_CLASSES}>
      <nav className="margin-inline-auto">
        <ul className="margin-block-2 list-none flex width-full">
          <li className="padding-inline-5">
            <Link to="/" className="margin-5 text-decoration-none">Home</Link>
          </li>
          <li>
            <Link to="/about" className="margin-5 text-decoration-none">About</Link>
          </li>
          <li>
            <Link to="/blog" className="margin-5 text-decoration-none">Blog</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header