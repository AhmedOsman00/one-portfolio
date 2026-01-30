/**
 * Formats a number as currency using the Intl.NumberFormat API.
 *
 * @param value - The numeric value to format
 * @param currency - The ISO 4217 currency code (e.g., 'USD', 'EUR', 'GBP'). Defaults to 'USD'.
 * @returns Formatted currency string with compact notation for large values
 *
 * Formatting rules:
 * - Values >= 1M: Compact notation with up to 1 decimal place (e.g., $1.2M)
 * - Values >= 1K: Compact notation with no decimals (e.g., $1K)
 * - Values < 1K: Standard format with no decimals (e.g., $500)
 */
export function formatCurrency(
  value: number,
  currency: string = "USD"
): string {
  const locale = Intl.NumberFormat().resolvedOptions().locale;

  // Determine formatting options based on value size
  let maximumFractionDigits = 0;
  let notation: "standard" | "compact" = "standard";

  if (value >= 1000000) {
    notation = "compact";
    maximumFractionDigits = 1;
  } else if (value >= 1000) {
    notation = "compact";
    maximumFractionDigits = 0;
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    notation,
    compactDisplay: notation === "compact" ? "short" : undefined,
    minimumFractionDigits: 0,
    maximumFractionDigits,
  }).format(value);
}
