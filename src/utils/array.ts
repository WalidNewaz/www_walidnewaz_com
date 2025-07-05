/**
 * Utils for array
 */


/**
 * Shuffle an array
 * @param array
 * @returns 
 */
export function shuffleArray<T>(array: T[]): T[] {
  // Create a copy of the array to avoid modifying the original array
  const result = array.slice();

  for (let i = result.length - 1; i > 0; i--) {
      // Generate a random index before the current element
      const j = Math.floor(Math.random() * (i + 1));

      // Swap the current element with the element at the random index
      [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}
