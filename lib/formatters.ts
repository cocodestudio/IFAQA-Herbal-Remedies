/**
 * IFAQA Herbal Remedies Currency & Input Formatter Helpers
 * Currency Standard: Indian Rupee (INR - ₹)
 */

export function formatPriceINR(amount: number): string {
  if (typeof amount !== 'number' || isNaN(amount) || amount < 0) {
    return '₹0';
  }
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
}

export function formatPricePKR(amount: number): string {
  return formatPriceINR(amount);
}

export function formatPriceUSD(amount: number): string {
  return formatPriceINR(amount);
}

export function formatPrice(amount: number, _currency?: string): string {
  return formatPriceINR(amount);
}

export function roundUsdCents(priceUSD: number, quantity: number = 1): number {
  return (Math.round(priceUSD * 100) * quantity) / 100;
}

export function validateE164Phone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return false;
  const cleanPhone = phone.trim().replace(/\s+/g, '');
  return /^\+[1-9]\d{9,14}$/.test(cleanPhone);
}

export function validatePostalCode(code: string): boolean {
  if (!code || typeof code !== 'string') return false;
  return /^[A-Za-z0-9\s-]{3,10}$/.test(code.trim());
}

export function generateOrderNumber(year: number | string = new Date().getFullYear()): string {
  const cleanYear = String(year).replace(/[^0-9]/g, '').slice(0, 4) || String(new Date().getFullYear());
  const randomSuffix = String(Math.floor(1 + Math.random() * 99999)).padStart(5, '0');
  return `IFA${cleanYear}${randomSuffix}`;
}
