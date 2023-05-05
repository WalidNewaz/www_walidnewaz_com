import * as React from "react"
import { Link } from "gatsby"
import ArticlePostCard from "./articlePostCard"


const HomePageMorePosts = ({ posts }) => {
    // const posts = data.allMarkdownRemark.nodes

    // if (posts.length === 0) {
    //     return (
    //         <Layout location={location} title={siteTitle}>
    //             {/* <Bio /> */}
    //             <p>
    //                 No blog posts found. Add markdown posts to "content/blog" (or the
    //                 directory you specified for the "gatsby-source-filesystem" plugin in
    //                 gatsby-config.js).
    //             </p>
    //         </Layout>
    //     )
    // }

    return (
        <section id="more-posts" className="row">
            <h2>More Posts</h2>
            <div id="posts">
            {
                posts.map(post => <ArticlePostCard
                    key={post.id}
                    postDate={post.frontmatter.post_date}
                    readTime={post.frontmatter.read_time}
                    title ={post.frontmatter.title || post.fields.slug}
                    image={post.frontmatter.hero_image}
                    description={post.frontmatter.description || post.excerpt}
                    slug={post.fields.slug}
                    tags={post.frontmatter.tags} />
                )
            }
            </div>

            

            {/* <ol style={{ listStyle: `none` }}>
                {posts.map(post => {
                    const title = post.frontmatter.title || post.fields.slug

                    return (
                        <li key={post.fields.slug}>
                            <article
                                className="post-list-item"
                                itemScope
                                itemType="http://schema.org/Article"
                            >
                                <header>
                                    <h2>
                                        <Link to={post.fields.slug} itemProp="url">
                                            <span itemProp="headline">{title}</span>
                                        </Link>
                                    </h2>
                                    <small>{post.frontmatter.date}</small>
                                </header>
                                <section>
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: post.frontmatter.description || post.excerpt,
                                        }}
                                        itemProp="description"
                                    />
                                </section>
                            </article>
                        </li>
                    )
                })}
            </ol> */}
        </section>
    )
}


export default HomePageMorePosts