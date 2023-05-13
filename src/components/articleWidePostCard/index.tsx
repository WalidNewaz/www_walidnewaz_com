import React from 'react';
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import './style.css'; // Import the CSS file for this component

const Tags = ({ tags }) => tags && tags.length > 0 ? <p className='article-tags'>{tags.join(" • ")}</p> : <p></p>

const ArticleWidePostCard = ({ image, title, description, postDate, slug, readTime, tags }) => {
  return (
    <div className="wide-card">
      <GatsbyImage
        image={image.childImageSharp.gatsbyImageData}
        alt={title}
      />
      <div className="wide-card-body">
        <div>
          <div>{postDate}</div>
          <div>
            {readTime}
          </div>
        </div>
        <h3 className="wide-card-title">{title}</h3>
        <p className="wide-card-text">{description}</p>
        <Tags tags={tags} />
      </div>
      <Link to={slug} itemProp="url">
        <div className="overlay"></div>
      </Link>
    </div>
  );
}

export default ArticleWidePostCard;