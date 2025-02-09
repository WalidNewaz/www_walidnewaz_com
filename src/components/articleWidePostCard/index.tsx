import React from "react";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import styled from "styled-components";

/** Utils */
import { abbreviate } from "../../utils/string";

/** Constants */
const ARTICLE_HEADING = `
  heading
  padding-0 margin-0 margin-bottom-3
  leading-5 lg:leading-6
  text-lg lg:text-xl
`;
const ARTICLE_DESCRIPTION = `
  text-2
  margin-bottom-3
  !leading-5 lg:!leading-6
`;

const Tags: React.FC<{ tags: Array<string> }> = ({ tags }) =>
  tags && tags.length > 0 ? (
    <ul className="list-none flex flex-row justify-end margin-block-0 gap-1">
      {tags.map((tag) => (
        <li key={tag} className="pill margin-block-0">
          {tag}
        </li>
      ))}
    </ul>
  ) : null;

// Create a styled component
const StyledImage = styled(GatsbyImage)`
  max-width: 15rem;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const HeroImage: React.FC<{
  image;
  title: string;
}> = ({ image, title }) =>
  image ? (
    <StyledImage
      image={image.childImageSharp.gatsbyImageData}
      alt={title}
      className="hero"
    />
  ) : null;

const ArticleWidePostCard: React.FC<{
  title: string;
  image;
  description: string;
  postDate: string;
  slug: string;
  readTime: string;
  tags: Array<string>;
}> = ({ image, title, description, postDate, slug, readTime, tags }) => {
  return (
    <article className="card wide bg-surface-1 margin-5 rad-shadow">
      <HeroImage {...{ image, title }} />
      <div
        className="flex padding-5"
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div className="text">
          <div className="flex flex-row space-between w-100">
            <p
              className="text-2 margin-bottom-3"
              style={{
                fontFamily: "var(--fontFamily-sans)",
                fontSize: "var(--fontSize-1)",
              }}
            >
              {postDate}
            </p>
            <p
              className="flex-end text-2 margin-bottom-3"
              style={{
                fontFamily: "var(--fontFamily-sans)",
                fontSize: "var(--fontSize-1)",
              }}
            >
              {readTime}
            </p>
          </div>
          <h3 className={ARTICLE_HEADING}>{abbreviate(title, 30)}</h3>
          <p
            className={ARTICLE_DESCRIPTION}
            style={{
              fontFamily: "var(--fontFamily-sans)",
              fontSize: "var(--fontSize-1)",
            }}
          >
            {description}
          </p>
        </div>
        <div className="tags">
          <Tags tags={tags} />
        </div>
      </div>
      <a href={slug} itemProp="url">
        <div className="overlay"></div>
      </a>
    </article>
  );
};

export default ArticleWidePostCard;
