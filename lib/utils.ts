export function formatCurrency(amount: number | null | undefined) {
  if (typeof amount !== 'number') return '$0.00';
  return `$${amount.toFixed(2).toLocaleString()}`;
}
