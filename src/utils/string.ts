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
 * Wraps sections of text between backticks (`) with <code> tags.
 *
 * @param {string} inputString The string to process.
 * @returns {string} The processed string with backtick-enclosed text wrapped in <code> tags.
 */
export function wrapBackticksInCodeTags(inputString: string): string {
  // Use a regular expression to find text between backticks.
  // The 'g' flag ensures that all occurrences are replaced, not just the first one.
  // The '`([^`]+)`' regex pattern captures the content between the backticks.
  // The '([^`]+)' part is a capturing group that matches one or more characters that are not a backtick.
  return inputString.replace(/`([^`]+)`/g, '<code class="language-text">$1</code>');
}