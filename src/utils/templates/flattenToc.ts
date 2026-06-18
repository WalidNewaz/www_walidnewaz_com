import { makeHeadingId } from "../posts";

/**
 * Recursively flattens a nested "items" JSON into a flat heading list.
 * @param {Object} toc - The root TOC JSON object containing "items".
 * @returns {Array} - Flattened list of heading objects with depth, id, and value.
 */
export function flattenToc(toc) {
  const result = [];

  function traverse(items, depth = 1) {
    for (const item of items) {
      // Extract a normalized ID from the URL (remove leading #, replace non-alphanumerics)
      const id = item.url
        ? makeHeadingId(depth, item.title)
        : null;

      // Push the current item
      result.push({
        depth,
        id,
        value: item.title
      });

      // Recursively process children
      if (item.items && item.items.length > 0) {
        traverse(item.items, depth + 1);
      }
    }
  }

  if (toc.items) {
    traverse(toc.items);
  }

  return result;
}