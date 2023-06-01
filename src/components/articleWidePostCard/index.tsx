import React from 'react';
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const Tags: React.FC<{ tags: Array<string>}> = ({ tags }) => (
  tags && tags.length > 0 ? <ul className='list-none flex flex-row justify-end margin-block-0'>{
    tags.map(tag => <li key={tag} className='pill margin-block-0'>{tag}</li>)
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
    <article className="wide-card surface1 margin5 rad-shadow">
        <GatsbyImage
          image={image.childImageSharp.gatsbyImageData}
          alt={title}
          className="wide-card-heading"
        />
      <div className="padding5 wide-card-body">
        <div className='flex flex-row space-between w-100'>
          <p className='text-2 margin-bottom-3'>{postDate}</p>
          <p className='flex-end text-2 margin-bottom-3'>
            {readTime}
          </p>
        </div>
        <h3 className="heading padding0 margin0 margin-bottom-3">{title}</h3>
        <p className='margin-bottom-3'>{description}</p>
        <Tags tags={tags} />        
      </div>
      <Link to={slug} itemProp="url">
        <div className="overlay"></div>
      </Link>
    </article>
  );
}

export default ArticleWidePostCard;