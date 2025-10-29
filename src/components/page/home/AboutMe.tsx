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
          Hi, I'm Walid Newaz — a full-stack developer documenting my journey
          toward AI software engineering. I build tutorials, developer tools,
          and workflow systems that bridge web development and applied AI — one
          project, one lesson at a time.
        </p>
        <p className="padding-block-5 margin-block-0 text-center">
          Connect with me on{" "}
          <a href="https://www.linkedin.com/in/walid-newaz" className="underline">LinkedIn</a> and{" "}
          <a href="https://github.com/walidnewaz" className="underline">GitHub</a>.<br />
          <a href="/about" className="underline">Read more about me &gt;</a>
        </p>
      </section>
    </article>
  );
};

export default AboutMe;
