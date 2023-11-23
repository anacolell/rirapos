import { WineTasting } from "../context/cartContext";
import { Wine } from "../pages/saleDetail";

export const createSale = async (
  winesInCart: Wine[],
  wineTastings: WineTasting[],
  discount: string,
  discountDifference: number,
  subtotal: number,
  total: number,
  comment: string
) => {
  try {
    const response = await fetch("http://localhost:5000/sales", {
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
