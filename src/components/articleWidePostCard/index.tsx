import React from 'react';
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import './style.css'; // Import the CSS file for this component

const Tags: React.FC<{ tags: Array<string>}> = ({ tags }) => (
  tags && tags.length > 0 ? <ul className='tags'>{
    tags.map(tag => <li key={tag}>{tag}</li>)
    }</ul> : null
)

const ArticleWidePostCard: React.FC<{
  title: string,
  image,
  description: string,
  postDate: string,
  slug: string,
  readTime: string,
  tags: Array<string>
}> = ({ image, title, description, postDate, slug, readTime, tags }) => {
  return (
    <article className="wide-card">
        <GatsbyImage
          image={image.childImageSharp.gatsbyImageData}
          alt={title}
        />
      <div className="wide-card-body">
        <div>
          <div>{postDate}</div>
          <div className='read-time'>
            {readTime}
          </div>
        </div>
        <h3 className="heading remove-padding thin-margin">{title}</h3>
        <p className="wide-card-text">{description}</p>
        <Tags tags={tags} />        
      </div>
      <Link to={slug} itemProp="url">
        <div className="overlay"></div>
      </Link>
    </article>
  );
}

export default ArticleWidePostCard;