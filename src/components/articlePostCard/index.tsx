import React from 'react';
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import './style.css'; // Import the CSS file for this component

const Tags = ({ tags }) => tags && tags.length > 0 ? <p className='article-tags'>{tags.join(" • ")}</p> : <p></p>

const HeroImage = ({ image, title }) => (
    image ? (
        <GatsbyImage
            image={image.childImageSharp.gatsbyImageData}
            alt={title}
        />
    ) : null
)

const ArticlePostCard = ({ title, image, postDate, slug, readTime, tags }) => {
    return (
        <article
            className="card"
            itemScope
            itemType="http://schema.org/Article">
            <HeroImage {...{image, title}} />
            <div className="card-body">
                <div>
                    <div>{postDate}</div>
                    <div className='read-time'>
                        <p>{readTime}</p>
                    </div>
                </div>
                <h3 className="card-title">
                    <span itemProp="headline">{title}</span>
                </h3>
                <Tags tags={tags} />
            </div>
            <Link to={slug} itemProp="url">
                <div className="overlay"></div>
            </Link>
        </article>
    );
}

export default ArticlePostCard;