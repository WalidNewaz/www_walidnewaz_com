import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import styled from "styled-components"

import Seo from "../components/seo"

const StyledAboutSection = styled.section`
  padding: var(--spacing-4);
  
  img {
    width: 1112px;
    margin: 0;
    padding: 0;
  }

  h2 {
    margin: var(--spacing-0) var(--spacing-0) var(--spacing-6) var(--spacing-0);
  }

  p {
    margin-bottom: var(--spacing-5);
    font-family: var(--fontFamily-sans);
  }

  ul {
    margin-left: var(--spacing-12);
  }

  li {
    color: var(--text1);
    font-family: var(--fontFamily-sans);
  }
`

// Create a styled component
const StyledImage = styled(GatsbyImage)`
  float: left;
  margin-right: 1rem;
  margin-bottom: 2rem;
  border-radius: 0.25rem;

  @media (max-width: 768px) {
    min-height: 20rem;
  }
`;

const About: React.FC<{ data }> = ({ data }) => {
  const banner = data.bannerFile;

  return (
    <StyledAboutSection>
      <article>
        <StyledImage
          image={banner.childImageSharp.gatsbyImageData}
          alt="Walid Newaz"
        />
        <h2>Welcome! Thanks for visiting.</h2>

        <p>Hello and welcome to my page! My name is Walid Newaz.
          I am a software engineer who loves learning, and sharing my thoughts about software
          and the world.</p>

        <p>My fascination with programming started with BASIC in 6th grade.
          I was fascinated with the small programs that we were able to create even with such a simple language,
          that a 6th grader could understand. Later on I picked up Pascal and C which allowed me to write
          programs to record interesting data as files in my computer. I knew that I&apos;d barely scratched the surface.</p>

        <p>In college I learned more about computer systems and programming. I was exposed to many tools
          and practices in the world of software engineering.</p>

        <p>I have spent my career delivering fast, reliable, and maintainable software applications. As
          a programmer I have primarily worked on JavaScript, Java, and Python. I am focused on maintainability,
          flexibility of software architecture, and providing a cutting endge user experience.
        </p>

        <p>Some of the notable things I&apos;ve worked on over the years include:</p>
        <ul>
          <li>Lead capture system</li>
          <li>User survey capture system</li>
          <li>User portal</li>
          <li>Static websites</li>
          <li>Coupon management system</li>
          <li>API workflow management system</li>
          <li>Team travel app</li>
        </ul>

        <p>My current interests are in program comprehension, software portability, and A.I. driven software
          development. I am also interested in developing user-friendly applications that scale.
        </p>

        <p>When I&apos;m not writing code you can often find me cooking, hiking in the Colorado Front Range with my dog, or traveling.
          I love music, art, books and podcasts.</p>

        <p>Feel free to reach out to me if you&apos;d like to share ideas, collaborate, or go on adventures together.</p>
      </article>
    </StyledAboutSection>
  )
}

export default About

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head: React.FC = () => <Seo title="About Walid" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    bannerFile: file(relativePath: {regex: "/about_banner.jpeg/"}) {
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`