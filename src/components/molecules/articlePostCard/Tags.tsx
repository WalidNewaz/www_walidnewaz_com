import React from "react";
import * as styles from "./ArticlePostCard.module.css";

type TagsProps = {
  tags: readonly string[];
};

const Tags: React.FC<TagsProps> = ({ tags }) => {
  if (tags.length === 0) {
    return null;
  }

  return (
    <ul className={styles.tagList} aria-label="Article topics">
      {tags.map((tag) => (
        <li
          key={tag}
          className={`${styles.tag} pill margin-block-0`}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
};

export default Tags;