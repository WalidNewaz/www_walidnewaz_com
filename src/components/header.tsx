import * as React from "react"
import { Link } from "gatsby"
import GithubIcon from '../components/icons/github'
import LinkedInIcon from '../components/icons/linkedin'

const Header: React.FC = () => {
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
                            <Link to="/blog">Writing</Link>
                        </li>
                        {/* <li>
                            <Link to="/">Contact</Link>
                        </li> */}
                    </ul>
                </nav>
            </div>
            <div id="social-links">
                <div>
                    <a href="https://github.com/WalidNewaz" target="_blank" rel="noreferrer">
                        <GithubIcon />
                    </a>
                </div>
                <div>
                    <a href="https://www.linkedin.com/in/walid-newaz/" target="_blank" rel="noreferrer">
                        <LinkedInIcon />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Header