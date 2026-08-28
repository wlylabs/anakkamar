export const FREE_PROJECT_LIMIT = 3;
export const FREE_HABIT_LIMIT = 3;
export const PLUS_PRICE_IDR = 29_000;
export const PLUS_PRODUCT_NAME = "Sejengkal Plus";

export function formatIDR(amount: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(
    amount,
  );
}
