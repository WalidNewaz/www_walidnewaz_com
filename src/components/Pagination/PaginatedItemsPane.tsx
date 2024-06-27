import React from 'react';

/**
 * Display the items for the current page
 * @param params
 * @returns
 */
const PaginatedItemsPane: React.FC<{
  items: React.ReactNode;
  className?: string;
}> = ({ items, className }) => <div className={className}>{items}</div>;

export default PaginatedItemsPane;
