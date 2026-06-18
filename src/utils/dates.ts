/**
 * Converts an ISO date string (e.g. "2024-01-01") into
 * a human-readable format (e.g. "January 1, 2024").
 *
 * If the input is invalid, returns the original string.
 */
export function formatPublishedDate(dateString: string): string {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString; // invalid input fallback

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
