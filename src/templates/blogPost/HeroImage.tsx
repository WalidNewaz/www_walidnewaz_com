import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";

/**
 * Hero image for blog post
 * @param params
 * @returns
 */
const HeroImage: React.FC<{ post: any; heroImage: any }> = ({
  post,
  heroImage,
}) =>
  !heroImage ? null : (
    <GatsbyImage
      image={heroImage.childImageSharp.gatsbyImageData}
      alt={post.frontmatter.title}
      style={{ height: "300px", marginBottom: "25px", borderRadius: "0.25rem" }}
    />
  );

export default HeroImage;
