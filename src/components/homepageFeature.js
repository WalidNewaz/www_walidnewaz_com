import * as React from "react"
import Section from './section';
import ArticleWidePostCard from './articleWidePostCard'

const FeaturedPosts = ({ posts }) => (
    posts.map(post => <ArticleWidePostCard
        key={post.id}
        image={post.image}
        title={post.title}
        postDate={post.postDate}
        readTime={post.readTime}
        tags={post.tags}
        description={post.description}
    />)
)

const EmptyPosts = () => <p>No fatured posts yet.</p>

const HomePageFeatures = ({ featuredPosts, profile }) => {
    return (
        <section id="homepage-features" className="row">
            <div id="featured-posts" className="column">
                <h2>Featured Posts</h2>
                {
                    !featuredPosts || featuredPosts.length == 0 ? <EmptyPosts /> : <FeaturedPosts posts={featuredPosts} />
                }
            </div>
            <div id="homepage-profile" className="column">
                <Section
                    title="About Me"
                    img={profile.image}
                    description={profile.description}
                    detailLink={profile.detailLink}
                    detailLinkLabel={profile.detailLinkLabel}
                />
            </div>
        </section>
    )
}

export default HomePageFeatures