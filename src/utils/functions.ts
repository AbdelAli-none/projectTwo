/**
 *
 * @param {string} txt - The input text to be sliced
 * @param {number} max - The maximum length before truncation
 * @returns The sliced text, with an ellipsis (...) appended if truncated
 */

export function txtSlicer(txt: string, max: number = 80) {
  if (txt.length >= max) return `${txt.slice(0, max)}...`;
  return txt;
}

/**
 * 
 * @param {string} price - The price of the product 
 * @returns Add a comma between two or more groups of digits, one of them has three digits regardless the other side
 */

export function addCommaToPrice(price: string) {
  return price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
