import * as React from "react";
import { Link } from "gatsby";

import * as styles from "./Pill.module.css";

type PillProps = {
  section?: string;
  topic: string;
  count?: number;
  currentTopic?: string;
  className?: string;
  style?: React.CSSProperties;
};

function joinClassNames(
  ...classNames: Array<string | false | null | undefined>
): string {
  return classNames.filter(Boolean).join(" ");
}

/**
 * Pill component used to display a selectable topic.
 */
const Pill: React.FC<PillProps> = ({
  section = "blog",
  topic,
  count = 0,
  currentTopic,
  className = "",
  style,
}) => {
  const topicText = count > 0 ? `${topic} (${count})` : topic;
  const isActive = topic === currentTopic;

  const baseSection = section.endsWith("/f")
    ? section.slice(0, -2)
    : section;

  const destination =
    topic === "All"
      ? `/${baseSection}/`
      : `/${section}/${encodeURIComponent(topic)}/`;

  if (isActive) {
    return (
      <div
        className={joinClassNames(
          styles.pill,
          "pill",
          "margin-block-0",
          "bg-surface-1",
          "border-color-surface4",
          className,
        )}
        style={style}
        aria-current="page"
      >
        <strong
          className={joinClassNames(
            styles.activeText,
            "text-surface-3",
          )}
        >
          {topicText}
        </strong>
      </div>
    );
  }

  return (
    <div
      className={joinClassNames(
        styles.pill,
        "pill",
        "margin-block-0",
        className,
      )}
      style={style}
    >
      <Link className={styles.link} to={destination}>
        {topicText}
      </Link>
    </div>
  );
};

export default Pill;