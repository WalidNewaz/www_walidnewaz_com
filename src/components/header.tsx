import * as React from "react"
import { Link } from "gatsby"
import styled from 'styled-components';

const StyledSiteHeader = styled.header`
  background-color: var(--surface1);
  display: block;
  width: 100%;
  z-index: 10;
  border-bottom-color: hsl(var(--heading2));
  border-bottom-width: 1px;
  border-bottom-style: solid;
  position: fixed;
  transition: background-color 300ms linear;
`

const Nav = styled.nav`
  width: 80%;

  ul {
    list-style: none;
    padding: 0;
    width: 100%;
    max-width: var(--maxWidth-wrapper);
  }

  ul li {
    display: inline-block;
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