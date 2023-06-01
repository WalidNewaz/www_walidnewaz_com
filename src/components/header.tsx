import * as React from "react"
import { Link } from "gatsby"
import styled from 'styled-components';
import GithubIcon from '../components/icons/github'
import LinkedInIcon from '../components/icons/linkedin'

const StyledSiteHeader = styled.header`
  /* display: flex;
  justify-content: space-between; */
  background-color: var(--surface1);
  display: block;
  width: 100%;
  z-index: 10;
  border-bottom: solid 1px rgba(41, 41, 41, 1);
  position: fixed;
  transition: background-color 300ms linear;
`

const Nav = styled.nav`
  width: 80%;
  /* padding: 10px; */
  /* height: 65px; */

  ul {
    list-style: none;
    /* margin: 0; */
    padding: 0;
    width: 100%;
    max-width: var(--maxWidth-wrapper);
    /* margin: 0 var(--spacing-16); */
  }

  ul li {
    display: inline-block;
    /* margin-right: 20px; */
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

const Header: React.FC = () => {
    return (
        <StyledSiteHeader className="global-header">
            <Nav>
                <ul className="margin-block-0">
                    <li className="padding-inline-5">
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/blog">Writing</Link>
                    </li>
                </ul>
            </Nav>
        </StyledSiteHeader>
    )
}

export default Header