import * as React from "react";

const Pill: React.FC<{
  topic: string;
  count?: number;
  currentTopic?: string;
  className?: string;
  style?: React.CSSProperties;
}> = ({ topic, count = 0, currentTopic, className = "", style }) => {
  const topicText = `${topic} ${count > 0 ? `(${count})` : ""}`;
  return topic === currentTopic ? (
    <div
      key={topic}
      className={`pill margin-block-0 bg-slate-600 ${className}`}
      style={style}
    >
      <strong>{topicText}</strong>
    </div>
  ) : (
    <div
      key={`topic-${topic}`}
      className={`pill margin-block-0 bg-surface-brand text-surface-2 ${className}`}
      style={style}
    >
      <a
        href={`/blog/${topic !== "All" ? encodeURIComponent(topic) : ""}`}
        className="text-decoration-none"
      >
        {topicText}
      </a>
    </div>
  );
};

export default Pill;
