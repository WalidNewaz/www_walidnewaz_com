import * as React from 'react';
import { Link } from 'gatsby';

const Pill: React.FC<{
  topic: string;
  count?: number;
  currentTopic?: string;
}> = ({ topic, count = 0, currentTopic }) => {
  const topicText = `${topic} ${count > 0 ? `(${count})` : ''}`;
  return topic === currentTopic ? (
    <li key={topic} className='pill margin-block-0 bg-slate-600'>
      <strong>{topicText}</strong>
    </li>
  ) : (
    <li
      key={`topic-${topic}`}
      className='pill margin-block-0 bg-surface-brand text-surface-2'
    >
      <Link
        to={`/blog/${topic !== 'All' ? topic : ''}`}
        className='text-decoration-none'
      >
        {topicText}
      </Link>
    </li>
  );
};

export default Pill;
