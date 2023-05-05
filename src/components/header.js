import * as React from "react"
import { Link } from "gatsby"

const Header = () => {
    return (
        <div id="site-header">
            <div id="main-menu">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/">Writing</Link>
                        </li>
                        <li>
                            <Link to="/">Contact</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Header