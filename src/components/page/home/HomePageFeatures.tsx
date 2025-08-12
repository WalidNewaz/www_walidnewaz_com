import * as React from 'react';
import styled from 'styled-components';

/** Components */
import FeaturedPosts from './FeaturedPosts';
import AboutMe from './AboutMe';

const StyledHomePageFeaturesSection = styled.section`
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;

  h1, h2, h3, h4, h5, h6 {
    color: var(--heading2);
    font-family: var(--fontFamily-sans);
    font-weight: var(--fontWeight-bold);
    transition: color 300ms linear;
    line-height: var(--lineHeight-normal);
  }
  
  h1 {
    font-size: var(--fontSize-5);
  }

  h2 {
    font-size: var(--fontSize-4);
  }

  h3 {
    font-size: var(--fontSize-3);
  }

  .featured-posts.col {
    width: 100%;
    flex: 65%;
  }

  .featured-posts h2 {
    margin: 0 1.25rem;
  }

  .profile.col {
    flex: 30%;
  }

  .profile h2 {
    margin: 0 1.25rem;
  }
`;

/**
 * Renders the top of the index page containing the featured posts and
 * short bio.
 * @param params
 * @returns
 */
const HomePageFeatures: React.FC<{ featuredPosts; profileImg }> = ({
  featuredPosts,
  profileImg,
}) => {
  return (
    <StyledHomePageFeaturesSection className='margin-0 padding-0'>
      <section className='featured-posts col'>
        <h2>Featured Posts</h2>
        <FeaturedPosts posts={featuredPosts} />
      </section>
      <section className='profile col'>
        <h2>About Me</h2>
        <AboutMe profileImg={profileImg} />
      </section>
    </StyledHomePageFeaturesSection>
  );
};

export default HomePageFeatures;
