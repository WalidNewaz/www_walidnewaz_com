import React from 'react';
import './style.css'; // Import the CSS file for this component

const Tags = ({ tags }) => tags && tags.length > 0 ? <p className='article-tags'>{ tags.join(" • ") }</p> : <p></p>

const ArticleWidePostCard = ({ image, title, description, postDate, readTime, tags }) => {
  return (
    <div className="wide-card">
      <img src={image} alt={title} />
      <div className="wide-card-body">
        <div>
            <div>{postDate}</div>
            <div>
                <p className='read-time'>{readTime}</p>
            </div>
        </div>
        <h3 className="wide-card-title">{title}</h3>
        <p className="wide-card-text">{description}</p>
        <Tags tags={tags} />
      </div>
      <div className="overlay"></div>
    </div>
  );
}

export default ArticleWidePostCard;