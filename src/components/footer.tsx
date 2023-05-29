import * as React from "react"
import styled from 'styled-components';
import GithubIcon from '../components/icons/github'
import LinkedInIcon from '../components/icons/linkedin'

const StyledFooter = styled.footer`
  text-align: center;
  padding: var(--spacing-20) var(--spacing-0);
`

const Footer: React.FC = () => {
  return (
    <StyledFooter>
      <section className="copyright">Copyright © {new Date().getFullYear()} by Walid Newaz</section>
      <section className="builtwith">Built with <a href="https://www.gatsbyjs.com">Gatsby</a></section>
      <section className="social">
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
      </section>
    </StyledFooter>
  )
}

export default Footer