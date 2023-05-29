import * as React from "react"
import { Link } from "gatsby"
import styled from 'styled-components';
import GithubIcon from '../components/icons/github'
import LinkedInIcon from '../components/icons/linkedin'

const StyledSiteHeader = styled.header`
  display: flex;
  justify-content: space-between;
`

const Nav = styled.nav`
  width: 80%;
  /* padding: 10px; */
  /* height: 65px; */

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  ul li {
    display: inline-block;
    margin-right: 20px;
  }

  ul li:last-child {
    margin-right: 0;
  }

  ul li a {
    color: #333;
    display: block;
    padding: 10px;
    text-decoration: none;
  }

  ul li a:hover {
    color: #fff;
  }

  ul li a:hover {
    background-color: #4f5969;
    font-weight: bold;
  }
`

const StyledSocialSection = styled.section`
  display: flex;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  ul li {
    display: inline-block;
    margin-right: 20px;
    padding: 30px 15px 10px 15px;
  }
`

const Header: React.FC = () => {
    return (
        <StyledSiteHeader className="global-header">
            <Nav>
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
            </Nav>
            {/* <StyledSocialSection className="header-social">
                <ul>
                    <li>
                        <a href="https://github.com/WalidNewaz" target="_blank" rel="noreferrer">
                            <GithubIcon />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/walid-newaz/" target="_blank" rel="noreferrer">
                            <LinkedInIcon />
                        </a>

                    </li>
                </ul>
            </StyledSocialSection> */}
        </StyledSiteHeader>
    )
}

export default Header