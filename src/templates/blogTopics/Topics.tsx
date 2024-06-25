import React from "react";

/** Components */
import Pill from "../../components/pill";
import ContentRibbon from "../../components/ContentRibbon/ContentRibbon";

/**
 * Displays the topics for the blog
 * @param params
 * @returns 
 */
const Topics: React.FC<{ topics: any; currentTopic: string }> = ({
  topics,
  currentTopic,
}) => {
  const topicList = Object.keys(topics);
  const linksText = topicList
    .sort()
    .map((topic) => (
      <Pill
        key={topic}
        topic={topic}
        count={topics[topic]}
        currentTopic={currentTopic}
        style={{ margin: "0.25rem" }}
      />
    ));
  const showContent = true;

  return (
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
        <Pill topic="All" style={{ margin: "0.25rem" }} />
        {linksText}
      </ContentRibbon>
    </section>
  );
};

export default Topics;
