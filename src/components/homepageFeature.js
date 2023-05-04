import * as React from "react"
import Section from './section';
import ArticleWidePostCard from './articleWidePostCard'

import profileImg from "../images/walid-profile.jpeg"

const HomePageFeatures = () => {
    return (
        <section id="homepage-features" className="row">
            <div id="featured-posts" className="column">
                <h2>Featured Posts</h2>
                <ArticleWidePostCard
                    image="https://images.unsplash.com/photo-1683009427540-c5bd6a32abf6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    title="Example Card"
                    postDate="Jan 10, 2022"
                    readTime="3 min"
                    tags={["something", "something"]}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel fermentum sem, quis bibendum quam."
                />
                <ArticleWidePostCard
                    image="https://images.unsplash.com/photo-1683009427540-c5bd6a32abf6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    title="Example Card"
                    postDate="Jan 10, 2022"
                    readTime="3 min"
                    tags={["something", "something"]}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel fermentum sem, quis bibendum quam."
                />
            </div>
            <div id="homepage-profile" className="column">
                <Section
                    title="About Me"
                    img={profileImg}
                    description="I'm Walid Newaz, a software engineer who enjoys writing about learning, programming, the outdoors, and my obeservations."
                    detailLink="#"
                    detailLinkLabel="Read more &gt;"
                />
            </div>
        </section>
    )
}

export default HomePageFeatures