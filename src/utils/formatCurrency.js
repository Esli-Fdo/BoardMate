/**
 * Format an amount as Sri Lankan Rupees (LKR) with standard comma separators.
 * Example: 18000 -> "Rs. 18,000"
 */
export function formatCurrency(amount, prefix = 'Rs. ') {
  if (amount === undefined || amount === null) return '';
  const num = typeof amount === 'number' ? amount : Number(amount);
  if (isNaN(num)) return `${prefix}${amount}`;
  return `${prefix}${num.toLocaleString('en-US')}`;
}

export default formatCurrency;
