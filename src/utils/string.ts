/**
 * Contains all string utilities
 */

/**
 * Abbreviate a string, adding ellipsis if it's too long
 * @param str
 */
export const abbreviate = (str: string, length = 20) =>
    str.length > length ? str.slice(0, length) + '...' : str;

/**
 * Wraps text between backticks with <code> tags and HTML-escapes the content.
 * Ensures things like `<ScrollView>` show up literally in the browser.
 */
export function wrapBackticksInCodeTags(inputString: string): string {
  const escapeHtml = (s: string) =>
    s
      .replace(/&/g, '&amp;')   // escape & first
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  const escapedString = escapeHtml(inputString);
  const wrappedString = escapedString
      .replace(/`([^`]+)`/g, '<code class="language-text">$1</code>');

  return wrappedString
}