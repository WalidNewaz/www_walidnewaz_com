import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import styled from "styled-components";

const StyledGatsbyImage = styled(GatsbyImage)`
  height: 300px;
  border-radius: 0.25rem;
  margin-bottom: 1.25rem;
`;

/**
 * Hero image for blog post
 * @param params
 * @returns
 */
const HeroImage: React.FC<{ post: any; heroImage: any; className: string; }> = ({
  post,
  heroImage,
  className,
}) =>
  !heroImage ? null : (
    <section className={className}>
      <StyledGatsbyImage
        image={heroImage.childImageSharp.gatsbyImageData}
        alt={post.frontmatter.title}
      />
    </section>
  );

export default HeroImage;
