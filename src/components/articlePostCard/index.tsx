import React from 'react';
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const Tags: React.FC<{ tags: Array<string> }> = ({ tags }) => (
    tags && tags.length > 0 ? <ul className='list-none flex flex-row justify-end margin-block-0 gap-1'>{
        tags.map(tag => <li key={tag} className='pill margin-block-0'>{tag}</li>)
    }</ul> : null
)

const HeroImage: React.FC<{
    image,
    title: string
}> = ({ image, title }) => (
    image ? (
        <GatsbyImage
            image={image.childImageSharp.gatsbyImageData}
            alt={title}
            className='hero'
        />
    ) : null
)

const ArticlePostCard: React.FC<{
    title: string,
    image,
    postDate: string,
    slug: string,
    readTime: string,
    tags: Array<string>
}> = ({ title, image, postDate, slug, readTime, tags }) => {
    return (
        <article
            className="card margin-4 surface3 rad-shadow"
            itemScope
            itemType="http://schema.org/Article">
            <HeroImage {...{ image, title }} />
            <div className="padding-5">
                <div className='flex flex-row space-between w-100'>
                    <p className='text-2 margin-bottom-3'>{postDate}</p>
                    <p className='flex-end text-2 margin-bottom-3'>
                        {readTime}
                    </p>
                </div>
                <h3 className="heading padding-0 margin-0 margin-bottom-3">{title}</h3>
                <Tags tags={tags} />
            </div>
            <Link to={slug} itemProp="url">
                <div className="overlay"></div>
            </Link>
        </article>
    );
}

export default ArticlePostCard;