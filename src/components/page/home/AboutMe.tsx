import * as React from "react";
import { GatsbyImage } from "gatsby-plugin-image";

/**
 * Renders the About Me section of the homepage
 * @param params
 * @returns
 */
const AboutMe: React.FC<{ profileImg }> = ({ profileImg }) => {
  return (
    <article className="about inline-flex margin-5 bg-surface-2">
      <GatsbyImage
        image={profileImg.childImageSharp.gatsbyImageData}
        alt="Walid Newaz"
        className="hero margin-5"
      />
      <section
        className="padding-inline-5"
        style={{
          fontFamily: "var(--fontFamily-sans)",
          fontSize: "var(--fontSize-1)",
        }}
      >
        <p className="margin-block-0">
          Hi, I&apos;m Walid Newaz, a software engineer who enjoys writing and
          learning about software programming, the outdoors, and common
          observations.
        </p>
        <p className="padding-block-5 margin-block-0">
          <a href="/about">Read more about me &gt;</a>
        </p>
      </section>
    </article>
  );
};

export default AboutMe;
