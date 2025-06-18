import * as React from "react";

/**
 * Pill component to display topics
 */
const Pill: React.FC<{
  section?: string;
  topic: string;
  count?: number;
  currentTopic?: string;
  className?: string;
  style?: React.CSSProperties;
}> = ({
  section = "blog",
  topic,
  count = 0,
  currentTopic,
  className = "",
  style,
}) => {
  const topicText = `${topic} ${count > 0 ? `(${count})` : ""}`;
  return topic === currentTopic ? (
    <div
      key={topic}
      className={`pill margin-block-0 bg-surface-1 border-color-surface4 ${className}`}
      style={style}
    >
      <strong className="text-surface-3">{topicText}</strong>
    </div>
  ) : (
    <div
      key={`topic-${topic}`}
      className={`pill margin-block-0  ${className}`}
      style={style}
    >
      <a
        href={`/${section}/${topic !== "All" ? `${encodeURIComponent(topic)}/` : ""}`}
        className="text-decoration-none"
      >
        {topicText}
      </a>
    </div>
  );
};

export default Pill;
