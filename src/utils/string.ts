/**
 * Contains all string utilities
 */

/**
 * Abbreviate a string, adding ellipsis if it's too long
 * @param str
 */
export const abbreviate = (str: string, length = 20) =>
    str.length > length ? str.slice(0, length) + '...' : str;