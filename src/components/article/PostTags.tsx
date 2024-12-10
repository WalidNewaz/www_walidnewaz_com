import React from "react";

/** Components */
import Pill from "../pill";
import ContentRibbon from "../ContentRibbon/ContentRibbon";

/**
 * Component used to display the blog post tags
 * @param params
 * @returns
 */
const PostTags: React.FC<{ tags: string[] }> = ({ tags }) => {
  const showContent = true;
  const linksText = tags
    .sort()
    .map((topic) => (
      <Pill key={topic} topic={topic} style={{ margin: "0.25rem" }} />
    ));
  return (
    tags && (
      <section
        className="border-color-heading2 border-block-end-dashed border-thin"
        style={{ width: "100%", paddingBottom: "1rem" }}
      >
        <ContentRibbon
          className={`transition-opacity duration-500 h-[28rem] md:h-[20rem] lg:h-[21rem] dt_small:h-[22rem] ${
            showContent ? "opacity-100" : "opacity-0"
          }`}
          scrollContainerClassName="h-[28rem] md:h-[20rem] lg:h-[21rem] dt_small:h-[22rem] gap-6"
        >
          {linksText}
        </ContentRibbon>
      </section>
    )
  );
};

export default PostTags;
