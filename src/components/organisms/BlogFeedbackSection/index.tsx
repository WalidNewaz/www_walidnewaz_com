import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

/** Components */
import Helpful from "../../molecules/Feedback/Helpful";
import FeedbackWidget from "../../molecules/Feedback/HelpfulApiWidget";
import Giscus, {
  Mapping,
  BooleanString,
  InputPosition,
  Loading,
} from "@giscus/react";
import { DiscussionEmbed } from "disqus-react";

interface HelpfulConfig {
  helpfulText?: string;
  onYes: () => void;
  onNo: () => void;
  feedbackGiven?: boolean;
}

interface GiscusConfig {
  username: string;
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  mapping: Mapping;
  strict: BooleanString;
  term?: string;
  reactionsEnabled: BooleanString;
  emitMetadata: BooleanString;
  inputPosition: InputPosition;
  theme: string;
  lang: string;
  loading: Loading;
}

interface DisqusConfig {
  shortname: string;
  config: {
    url: string;
    identifier: string;
    title: string;
  };
}

interface BlogFeedbackSectionProps {
  post: any;
  helpfulConfig?: HelpfulConfig;
  giscusConfig?: GiscusConfig;
  disqusConfig?: DisqusConfig;
}

const StyledBlogFeedbackSection = styled.section`
  font-family: var(--fontFamily-sans);

  h2 {
    font-size: var(--fontSize-4);
    font-weight: 600;
    color: var(--heading2);
  }
`;

const HelpfulBlock: React.FC<{ helpfulConfig?: HelpfulConfig }> = ({
  helpfulConfig,
}) => {
  return (
    helpfulConfig && (
      <div
        className="text-right"
        style={{ marginTop: "2rem", textAlign: "right" }}
      >
        <Helpful
          helpfulText={helpfulConfig?.helpfulText}
          onYes={helpfulConfig?.onYes}
          onNo={helpfulConfig?.onNo}
          feedbackGiven={helpfulConfig?.feedbackGiven}
        />
      </div>
    )
  );
};

interface HelpfulBlockApiProps {
  postSlug: string;
  apiUrl: string;
}

const HelpfulBlockApi: React.FC<HelpfulBlockApiProps> = ({
  postSlug,
  apiUrl,
}) => {
  return (
    <div
      className="text-right"
      style={{ marginTop: "2rem", textAlign: "right" }}
    >
      <FeedbackWidget
        postSlug={postSlug}
        apiUrl={apiUrl}
      />
    </div>
  );
};

const GiscusBlock: React.FC<{ giscusConfig?: GiscusConfig }> = ({
  giscusConfig,
}) => {
  return giscusConfig ? (
    <div>
      <Giscus
        id="comments"
        repo={`${giscusConfig.username}/${giscusConfig.repo}`}
        repoId={giscusConfig.repoId}
        category={giscusConfig.category}
        categoryId={giscusConfig.categoryId}
        mapping={giscusConfig.mapping}
        strict={giscusConfig.strict}
        term={giscusConfig.term}
        reactionsEnabled={giscusConfig.reactionsEnabled}
        emitMetadata={giscusConfig.emitMetadata}
        inputPosition={giscusConfig.inputPosition}
        theme={giscusConfig.theme}
        lang={giscusConfig.lang}
        loading={giscusConfig.loading}
      />
    </div>
  ) : null;
};

const DisqusBlock: React.FC<{ disqusConfig?: DisqusConfig }> = ({
  disqusConfig,
}) => {
  return disqusConfig ? (
    <div style={{ marginTop: "2rem" }}>
      <DiscussionEmbed
        shortname={disqusConfig.shortname}
        config={disqusConfig.config}
      />
    </div>
  ) : null;
};

const BlogFeedbackSection: React.FC<BlogFeedbackSectionProps> = ({
  post,
  helpfulConfig,
  giscusConfig,
  disqusConfig,
}) => {
  return (
    <StyledBlogFeedbackSection>
      <h2>Feedback</h2>
      <HelpfulBlock helpfulConfig={helpfulConfig} />
      {/* <HelpfulBlockApi postSlug={post.fields.slug} apiUrl="http://127.0.0.1:8000" /> */}
      <GiscusBlock giscusConfig={giscusConfig} />
      <DisqusBlock disqusConfig={disqusConfig} />
    </StyledBlogFeedbackSection>
  );
};

export default BlogFeedbackSection;
