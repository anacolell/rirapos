import { v4 as uuidv4 } from "uuid";

export function formatPrice(price: number) {
  return price && (Math.round(price * 100) / 100).toFixed(2);
}

export function generateUniqueId() {
  return uuidv4();
}

export function calculateDiscount(price: number, discount: number) {
  return (price * discount) / 100;
}
