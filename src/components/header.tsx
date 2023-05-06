import * as React from "react"
import { Link } from "gatsby"
import GithubIcon from '../components/icons/github'
import LinkedInIcon from '../components/icons/linkedin'

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
            <div id="social-links">
                <div>
                    <Link to="https://github.com/WalidNewaz" target="_blank">
                        <GithubIcon />
                    </Link>
                </div>
                <div>
                    <Link to="https://www.linkedin.com/in/walid-newaz/" target="_blank">
                        <LinkedInIcon />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header