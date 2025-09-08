import * as React from "react";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import styled from "styled-components";

import Seo from "../components/seo";

const StyledAboutSection = styled.section`
  padding: var(--spacing-4);

  img {
    width: 1112px;
    margin: 0;
    padding: 0;
  }

  h2 {
    margin: var(--spacing-0) var(--spacing-0) var(--spacing-6) var(--spacing-0);
    font-size: var(--fontSize-4);
  }

  p {
    margin-bottom: var(--spacing-5);
    font-family: var(--fontFamily-sans);
  }

  ul {
    margin-left: var(--spacing-1);
  }

  li {
    color: var(--text1);
    font-family: var(--fontFamily-sans);
  }

  ul li::before {
    content: "";
    display: inline-block;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 8px solid var(--text1); /* Color of your triangle */
    border-radius: 3px; /* Adjust for desired rounding */
    margin-right: 0.5em;
    margin-top: -0.25em; /* Adjust to align with text */
    vertical-align: middle; /* Align with text */
  }
`;

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
        <h2>Welcome — I'm Walid Newaz</h2>

        <p>
          I'm a <strong>software engineer and builder</strong> with 15+ years of
          experience creating applications across the web stack. My journey
          started back in 6th grade with BASIC, where even the smallest programs
          felt like magic. From there I picked up Pascal and C, writing programs
          to capture and store data, and I knew I had only scratched the surface
          of what software could do.
        </p>

        <p>
          Over the years I've delivered fast, reliable, and maintainable
          applications for web, backend, and API-driven platforms. My core
          experience has been in
          <strong>JavaScript/TypeScript (React, Node.js)</strong> and expanded
          into
          <strong>Python</strong> for backend services, automation, and AI
          projects. I care deeply about{" "}
          <strong>architecture, maintainability, and user experience</strong>.
        </p>

        <p>Some of the systems I've built include:</p>
        <ul>
          <li>Lead capture and survey systems</li>
          <li>User portals and static websites</li>
          <li>Coupon and promotions management</li>
          <li>Workflow and API orchestration platforms</li>
          <li>Team travel planning applications</li>
        </ul>

        <p>
          Today, my focus is shifting toward{" "}
          <strong>AI application engineering</strong>: building with{" "}
          <strong>Python, FastAPI, LangChain, and custom GPTs</strong> to create
          workflow engines, RAG chatbots, and agentic systems. I'm especially
          interested in{" "}
          <strong>
            program comprehension, software portability, and AI-driven
            development workflows
          </strong>{" "}
          that help engineers and organizations scale.
        </p>

        <p>
          Outside of code, I'm usually{" "}
          <strong>hiking the Colorado Front Range with my dog</strong>,
          experimenting in the kitchen, or exploring new places. I'm a big fan
          of music, art, books, and podcasts that expand perspective.
        </p>

        <p>
          This site documents how I <em>learn</em>, <em>build</em>, and{" "}
          <em>grow</em> as I transition deeper into AI and workflow platforms.
          If you'd like to share ideas, collaborate on projects, or just
          connect, I'd love to hear from you.
        </p>
      </article>
    </StyledAboutSection>
  );
};

export default About;

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head: React.FC = () => <Seo title="About Walid" />;

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    bannerFile: file(relativePath: { regex: "/about_banner.jpeg/" }) {
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`;
