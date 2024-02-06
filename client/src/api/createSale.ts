import { Wine, WineTasting } from "../types/types";
import { API_URL } from "./config";

export const createSale = async (
  winesInCart: Wine[],
  wineTastings: WineTasting[],
  discount: string,
  discountDifference: number,
  subtotal: number,
  total: number,
  comment: string,
  isBusiness: boolean
) => {
  try {
    const response = await fetch(`${API_URL}/sales`, {
      method: "POST",
      body: JSON.stringify({
        wines: winesInCart,
        wineTastings: wineTastings,
        discount: discount,
        discountDifference: discountDifference,
        subtotal: subtotal,
        total: total,
        comment: comment,
        date: new Date(),
        isBusiness: isBusiness,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    response.json();
  } catch (error) {
    console.error("Error creating sale");
    throw error;
  }
};
