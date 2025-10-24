import React from "react";
import { graphql, PageProps } from "gatsby";

/** Components */
import Seo from "../components/seo";
import HomePageFeatures from "../components/page/home/HomePageFeatures";
import HomePageMorePosts from "../components/MorePosts";
import HomePageMoreTutorials from "../components/MoreTutorials";

/**
 * This is the homepage of the blog
 * @param params
 * @returns
 */
const Index: React.FC<PageProps<any>> = ({ data }) => {
  const featuredPosts = data.featuredPosts.nodes;
  const profileImg = data.profilePhotos;

  const posts = data.allPosts.nodes;
  const postCount = data.postCount.totalCount;

  // const tutorials = data.allTutorials.nodes;
  // const tutorialsCount = data.tutorialsCount.totalCount;
  // const tutorialHeroes = data.allTutorialHeroes.nodes;

  return (
    <>
      <HomePageFeatures featuredPosts={featuredPosts} profileImg={profileImg} />
      <>
        <HomePageMorePosts posts={posts} />
        {postCount > 9 && (
          <div
            className="flex align-center justify-center"
            style={{ margin: "1.5rem" }}
          >
            <a href="/blog" className="pill">
              View More Posts
            </a>
          </div>
        )}
      </>
    </>
  );
};

export default Index;

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head: React.FC = () => <Seo title="Home" />;

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    featuredPosts: allMdx(
      filter: {
        frontmatter: { featured: { eq: true } }
        internal: { contentFilePath: { regex: "/^.*/content/blog/.*?$/" } }
      }
      limit: 2
    ) {
      nodes {
        id
        excerpt
        fields {
          slug
        }
        frontmatter {
          image: hero_image {
            id
            base
            childImageSharp {
              gatsbyImageData
            }
          }
          postDate: date(formatString: "MMMM DD, YYYY")
          pathDate: date(formatString: "/YYYY/MM/DD")
          readTime: read_time
          title
          tags
        }
      }
    }
    allPosts: allMdx(
      sort: { frontmatter: { date: DESC } }
      limit: 9
      filter: {
        internal: { contentFilePath: { regex: "/^.*/content/blog/.*?$/" } }
      }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          pathDate: date(formatString: "/YYYY/MM/DD")
          title
          description
          hero_image {
            id
            base
            childImageSharp {
              gatsbyImageData
            }
          }
          tags
          read_time
        }
        id
      }
    }
    postCount: allMdx(
      sort: { frontmatter: { date: DESC } }
      limit: 9
      filter: {
        internal: { contentFilePath: { regex: "/^.*/content/blog/.*?$/" } }
      }
    ) {
      totalCount
    }
    profilePhotos: file(relativePath: { regex: "/walid-profile.jpeg/" }) {
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`;
