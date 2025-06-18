import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import styled from "styled-components";

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

const HeroImage: React.FC<{
  image: any;
  title: string;
}> = ({ image, title }) =>
  image ? (
    <GatsbyImage
      image={image.childImageSharp.gatsbyImageData}
      alt={title}
      className="hero"
    />
  ) : null;

const StyledCardText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--spacing-5);
  min-height: 12rem;
`;

const ArticlePostCard: React.FC<{
  title: string;
  image: any;
  postDate?: string;
  slug: string;
  readTime?: string;
  tags: Array<string>;
  className?: string;
}> = ({ title, image, postDate, slug, readTime, tags, className = "" }) => {
  return (
    <article
      className={`card bg-surface-3 rad-shadow ${className}`}
      itemScope
      itemType="http://schema.org/Article"
    >
      <HeroImage {...{ image, title }} />
      <StyledCardText>
        <div className="text">
          <div className="flex flex-row space-between w-100 h-100">
            {postDate && (
              <p
                className="text-2 margin-bottom-3"
                style={{
                  fontFamily: "var(--fontFamily-sans)",
                  fontSize: "var(--fontSize-1)",
                }}
              >
                {postDate}
              </p>
            )}
            {readTime && (
              <p
                className="flex-end text-2 margin-bottom-3"
                style={{
                  fontFamily: "var(--fontFamily-sans)",
                  fontSize: "var(--fontSize-1)",
                }}
              >
                {readTime}
              </p>
            )}
          </div>
          <h3 className="heading padding-0 margin-0 margin-bottom-3">
            {title}
          </h3>
        </div>
        <div className="tags">
          <Tags tags={[tags[tags.length - 1]]} />
        </div>
      </StyledCardText>
      <a href={slug} itemProp="url">
        <div className="overlay"></div>
      </a>
    </article>
  );
};

export default ArticlePostCard;
