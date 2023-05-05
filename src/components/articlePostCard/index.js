import React from 'react';
import { Link } from "gatsby"
import './style.css'; // Import the CSS file for this component

const Tags = ({ tags }) => tags && tags.length > 0 ? <p className='article-tags'>{tags.join(" • ")}</p> : <p></p>

const ArticlePostCard = ({ title, image, postDate, slug, readTime, tags }) => {
    return (
        <article
            className="card"
            itemScope
            itemType="http://schema.org/Article">
            <img src={image} alt={title} />
            <div className="card-body">
                <div>
                    <div>{postDate}</div>
                    <div className='read-time'>
                        <p>{readTime}</p>
                    </div>
                </div>
                <h3 className="card-title">
                    <Link to={slug} itemProp="url">
                        <span itemProp="headline">{title}</span>
                    </Link>
                </h3>
                <Tags tags={tags} />
            </div>
        </article>
    );
}

export default ArticlePostCard;