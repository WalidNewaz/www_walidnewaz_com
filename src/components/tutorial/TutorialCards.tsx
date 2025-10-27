import React, { useMemo } from "react";

/** Components */
import ArticlePostCard from "../../components/molecules/articlePostCard";

/** Utils */
import { getHeroImageDataInDir } from "../../utils/posts";

const TutorialCards: React.FC<any> = ({
  tutorials,
  tutorialHeroes,
  section = "learn",
}) => {
  return tutorials.map((tutorial: any) => {
    const seriesDir = tutorial?.fields?.slug
      .split("/")
      .filter((str: string) => str !== "")[0]; // e.g. react-native
    
    
    const fallbackImageData = useMemo(
      () => getHeroImageDataInDir(tutorial, tutorialHeroes, seriesDir),
      [tutorialHeroes, seriesDir, tutorial]
    );

    const heroImageData =
      tutorial.frontmatter?.hero_image?.childImageSharp?.gatsbyImageData;

    const image = useMemo(() => {
      return heroImageData || fallbackImageData;
    }, [heroImageData, fallbackImageData]);

    const tags = Array.isArray(tutorial.frontmatter.tags)
      ? [
          String(
            tutorial.frontmatter.tags[tutorial.frontmatter.tags.length - 1]
          ),
        ]
      : [];
    return (
      <ArticlePostCard
        key={tutorial.id}
        title={tutorial.frontmatter.series}
        image={image}
        slug={`/${section}${tutorial.fields.slug}`}
        tags={tags}
        className="col-4"
      />
    );
  });
};

export default TutorialCards;
