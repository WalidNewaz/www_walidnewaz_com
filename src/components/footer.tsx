import * as React from "react"
import styled from 'styled-components';

const StyledFooter = styled.footer`
  text-align: center;
  padding: var(--spacing-20) var(--spacing-0);
`

const Footer: React.FC = () => {
    return (
      <StyledFooter>
        <section className="copyright">Copyright © {new Date().getFullYear()} by Walid Newaz</section>
        <section className="builtwith">Built with <a href="https://www.gatsbyjs.com">Gatsby</a></section>
      </StyledFooter>
    )
}

export default Footer